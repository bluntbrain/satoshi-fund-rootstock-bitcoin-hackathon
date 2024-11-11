import React, { useState } from "react";
import { Button } from "../Button";
import Input from "../Input";
import { DollarSign, AlertTriangle } from "lucide-react";
import { formatCurrency } from "@/lib/utils/format";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;

    try {
      // await repayLoan(amount);
      setAmount("");
      onSuccess?.();
    } catch (err) {
      console.error("Error repaying loan:", err);
    } finally {
      setLoading(false);
    }
  };

  const isValidAmount = Number(amount) >= totalDue;

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

      {amount && !isValidAmount && (
        <div className="flex items-center space-x-2 text-accent-red">
          <AlertTriangle size={16} />
          <span className="text-sm">
            Amount must be at least {formatCurrency(totalDue)}
          </span>
        </div>
      )}

      {/* {error && (
        <div className="p-4 bg-accent-red/10 rounded-lg">
          <p className="text-accent-red text-sm">{error}</p>
        </div>
      )} */}

      <Button
        type="submit"
        disabled={loading || !isValidAmount || !amount}
        className="w-full"
      >
        {loading ? "Processing..." : "Confirm Repayment"}
      </Button>
    </form>
  );
};

export default RepayLoanForm;
