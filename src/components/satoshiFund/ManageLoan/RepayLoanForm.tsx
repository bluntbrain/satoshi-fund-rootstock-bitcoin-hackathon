import React, { useState } from "react";
import { Button } from "../Button";
import Input from "../Input";
import { DollarSign, AlertTriangle } from "lucide-react";
import { formatCurrency } from "@/lib/utils/format";
import { useWriteContract } from "wagmi";
import { SATOSHI_FUND_ADDRESS } from "@/lib/utils/constants";
import SATOSHI_FUND_ABI from "@/contracts/abi/SatoshiFund.json";
import { useToast } from "@/components/ui/use-toast";
import { ethers } from "ethers";
import { waitForTransactionReceipt } from "wagmi/actions";
import { rainbowkitConfig } from "@/config/rainbowkitConfig";

interface RepayLoanFormProps {
  loanId: string;
  principal: number;
  interestAccrued: number;
  onSuccess?: () => void;
}

const RepayLoanForm: React.FC<RepayLoanFormProps> = ({
  loanId,
  principal,
  interestAccrued,
  onSuccess,
}) => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const totalDue = principal + interestAccrued;
  const { toast } = useToast();

  const { writeContractAsync } = useWriteContract();

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("Repaying loan", loanId);
    e.preventDefault();
    if (!amount) return;

    if (Number(amount) < totalDue) {
      toast({
        title: "Insufficient Amount",
        description: `Amount must be at least ${formatCurrency(totalDue)}`,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const txHash = await writeContractAsync({
        abi: SATOSHI_FUND_ABI,
        address: SATOSHI_FUND_ADDRESS,
        functionName: "repayLoan",
        args: [ethers.parseUnits(amount, 18)],
      });

      await waitForTransactionReceipt(rainbowkitConfig, {
        confirmations: 1,
        hash: txHash,
      });

      toast({
        title: "Loan Repaid Successfully",
        description: "Your loan has been repaid.",
      });

      setAmount("");
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to repay loan",
        variant: "destructive",
      });
      console.error("Error repaying loan:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 bg-dark-700 rounded-lg space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-400">Principal</span>
          <span>{formatCurrency(principal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Interest Accrued</span>
          <span>{formatCurrency(interestAccrued)}</span>
        </div>
        <div className="border-t border-dark-600 pt-2 flex justify-between font-medium">
          <span>Total Due</span>
          <span>{formatCurrency(totalDue)}</span>
        </div>
      </div>

      <Input
        label="Repayment Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount to repay"
        icon={<DollarSign className="text-accent-green" size={20} />}
        disabled={loading}
      />

      {amount && Number(amount) < totalDue && (
        <div className="flex items-center space-x-2 text-accent-red">
          <AlertTriangle size={16} />
          <span className="text-sm">
            Amount must be at least {formatCurrency(totalDue)}
          </span>
        </div>
      )}

      <Button
        type="submit"
        disabled={loading || Number(amount) < totalDue || !amount}
        className="w-full"
      >
        {loading ? "Processing..." : "Confirm Repayment"}
      </Button>
    </form>
  );
};

export default RepayLoanForm;
