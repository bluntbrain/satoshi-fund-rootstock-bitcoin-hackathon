import React, { useState } from "react";
import { Button } from "../Button";
import Input from "../Input";
import { Bitcoin } from "lucide-react";
import { useWriteContract } from "wagmi";
import { SATOSHI_FUND_ADDRESS } from "@/lib/utils/constants";
import SATOSHI_FUND_ABI from "@/contracts/abi/SatoshiFund.json";
import { useToast } from "@/components/ui/use-toast";
import { ethers } from "ethers";
import { waitForTransactionReceipt } from "wagmi/actions";
import { rainbowkitConfig } from "@/config/rainbowkitConfig";

interface TopUpCollateralFormProps {
  loanId: string;
  currentCollateral: number;
  currentLTV: number;
  onSuccess?: () => void;
}

const TopUpCollateralForm: React.FC<TopUpCollateralFormProps> = ({
  loanId,
  currentCollateral,
  currentLTV,
  onSuccess,
}) => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const { writeContractAsync } = useWriteContract();

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("Topping up collateral", loanId);
    e.preventDefault();
    if (!amount) return;

    setLoading(true);
    try {
      const txHash = await writeContractAsync({
        abi: SATOSHI_FUND_ABI,
        address: SATOSHI_FUND_ADDRESS,
        functionName: "depositCollateral",
        args: [ethers.parseUnits(amount, 18)],
      });

      await waitForTransactionReceipt(rainbowkitConfig, {
        confirmations: 1,
        hash: txHash,
      });

      toast({
        title: "Collateral Added Successfully",
        description: "Your collateral has been topped up.",
      });

      setAmount("");
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add collateral",
        variant: "destructive",
      });
      console.error("Error adding collateral:", error);
    } finally {
      setLoading(false);
    }
  };

  const newLTV =
    currentLTV * (currentCollateral / (currentCollateral + Number(amount)));
  const isValidAmount = Number(amount) > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 bg-dark-700 rounded-lg space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-400">Current Collateral</span>
          <span>{currentCollateral} RBTC</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Current LTV</span>
          <span
            className={`${
              currentLTV > 140 ? "text-accent-red" : "text-accent-green"
            }`}
          >
            {currentLTV.toFixed(2)}%
          </span>
        </div>
        {amount && (
          <div className="border-t border-dark-600 pt-2 flex justify-between font-medium">
            <span>New LTV</span>
            <span
              className={`${
                newLTV > 140 ? "text-accent-red" : "text-accent-green"
              }`}
            >
              {newLTV.toFixed(2)}%
            </span>
          </div>
        )}
      </div>

      <Input
        label="Additional Collateral (BTC)"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount to add"
        step="0.001"
        icon={<Bitcoin className="text-accent-blue" size={20} />}
        disabled={loading}
      />

      <Button
        type="submit"
        disabled={loading || !isValidAmount}
        className="w-full"
      >
        {loading ? "Processing..." : "Add Collateral"}
      </Button>
    </form>
  );
};

export default TopUpCollateralForm;
