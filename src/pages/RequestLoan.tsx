import React, { useState } from "react";
import { Button } from "../components/satoshiFund/Button";
import Input from "../components/satoshiFund/Input";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { SATOSHI_FUND_ADDRESS } from "@/lib/utils/constants";
import SATOSHI_FUND_ABI from "@/contracts/abi/SatoshiFund.json";
import { useToast } from "@/components/ui/use-toast";
import { ethers } from "ethers";
import { waitForTransactionReceipt } from "wagmi/actions";
import { rainbowkitConfig } from "@/config/rainbowkitConfig";

interface LoanDetails {
  active: boolean;
}

const RequestLoan: React.FC = () => {
  const { address } = useAccount();
  const [loanAmount, setLoanAmount] = useState("");
  const [btcPriceUSD, setBtcPriceUSD] = useState("");
  const [collateralizationRatio, setCollateralizationRatio] = useState("");
  const [interestRatePerDay, setInterestRatePerDay] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const { data: loanDetails, isLoading: isLoanLoading } = useReadContract({
    address: SATOSHI_FUND_ADDRESS,
    abi: SATOSHI_FUND_ABI,
    functionName: "getLoanDetails",
    args: [address],
  }) as { data: LoanDetails; isLoading: boolean };

  const { writeContractAsync } = useWriteContract();

  const handleRequestLoan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !loanAmount ||
      !btcPriceUSD ||
      !collateralizationRatio ||
      !interestRatePerDay
    )
      return;

    if (loanDetails?.active) {
      toast({
        title: "Active Loan Exists",
        description:
          "You already have an active loan. Please repay it before requesting a new one.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const txHash = await writeContractAsync({
        abi: SATOSHI_FUND_ABI,
        address: SATOSHI_FUND_ADDRESS,
        functionName: "requestLoan",
        args: [
          ethers.parseUnits(loanAmount, 18),
          ethers.parseUnits(btcPriceUSD, 18),
          ethers.parseUnits(collateralizationRatio, 18),
          ethers.parseUnits(interestRatePerDay, 18),
        ],
      });

      await waitForTransactionReceipt(rainbowkitConfig, {
        confirmations: 1,
        hash: txHash,
      });

      toast({
        title: "Loan Requested Successfully",
        description: "Your loan request has been submitted.",
      });

      setLoanAmount("");
      setBtcPriceUSD("");
      setCollateralizationRatio("");
      setInterestRatePerDay("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to request loan",
        variant: "destructive",
      });
      console.error("Error requesting loan:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-3xl font-bold text-white mb-6">Request Loan</h1>
      <form onSubmit={handleRequestLoan} className="space-y-4">
        <Input
          label="Loan Amount (USDT)"
          type="number"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          placeholder="Enter loan amount"
          step="0.01"
          disabled={loading}
        />
        <Input
          label="BTC Price (USD)"
          type="number"
          value={btcPriceUSD}
          onChange={(e) => setBtcPriceUSD(e.target.value)}
          placeholder="Enter current BTC price"
          step="0.01"
          disabled={loading}
        />
        <Input
          label="Collateralization Ratio (%)"
          type="number"
          value={collateralizationRatio}
          onChange={(e) => setCollateralizationRatio(e.target.value)}
          placeholder="Enter collateralization ratio"
          step="1"
          disabled={loading}
        />
        <Input
          label="Interest Rate Per Day (%)"
          type="number"
          value={interestRatePerDay}
          onChange={(e) => setInterestRatePerDay(e.target.value)}
          placeholder="Enter interest rate per day"
          step="0.01"
          disabled={loading}
        />
        <Button
          type="submit"
          disabled={loading || isLoanLoading}
          className="w-full"
        >
          {loading ? "Processing..." : "Request Loan"}
        </Button>
      </form>
    </div>
  );
};

export default RequestLoan;
