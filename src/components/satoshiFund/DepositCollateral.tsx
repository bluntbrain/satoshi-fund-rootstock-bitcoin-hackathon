import React, { useState } from "react";
import { ethers } from "ethers";
import { Button } from "../satoshiFund/Button";
import Input from "../satoshiFund/Input";
import { useWriteContract } from "wagmi";
import { SATOSHI_FUND_ADDRESS } from "@/lib/utils/constants";
import SATOSHI_FUND_ABI from "@/contracts/abi/SatoshiFund.json";
import { useToast } from "@/components/ui/use-toast";
import { waitForTransactionReceipt } from "wagmi/actions";
import { rainbowkitConfig } from "@/config/rainbowkitConfig";

const DepositCollateral: React.FC = () => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { writeContractAsync } = useWriteContract();

  const handleDeposit = async () => {
    if (!amount) return;

    setLoading(true);
    try {
      const parsedAmount = ethers.parseUnits(amount, 18);
      console.log("ABI:", SATOSHI_FUND_ABI);
      const txHash = await writeContractAsync({
        abi: SATOSHI_FUND_ABI,
        address: SATOSHI_FUND_ADDRESS,
        functionName: "depositCollateral",
        args: [parsedAmount],
      });

      await waitForTransactionReceipt(rainbowkitConfig, {
        confirmations: 1,
        hash: txHash,
      });

      toast({
        title: "Collateral deposited successfully",
        description: "Your collateral has been updated.",
      });

      setAmount("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to deposit collateral",
        variant: "destructive",
      });
      console.error("Error depositing collateral:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Input
        label="Collateral Amount (SBTC)"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount to deposit"
        step="0.001"
        disabled={loading}
      />
      <Button onClick={handleDeposit} disabled={loading}>
        {loading ? "Processing..." : "Deposit Collateral"}
      </Button>
    </div>
  );
};

export default DepositCollateral;
