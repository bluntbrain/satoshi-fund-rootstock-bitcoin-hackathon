import React, { useState } from "react";
import { Button } from "./Button";
import Input from "./Input";
import { Bitcoin, DollarSign, AlertTriangle } from "lucide-react";
import { formatCurrency } from "@/lib/utils/format";
import { useAccount, useWriteContract } from "wagmi";
import { parseEther } from "viem";
import { SATOSHI_FUND_ADDRESS } from "@/lib/utils/constants";
import { useToast } from "@/components/ui/use-toast";
import SATOSHI_FUND_ABI from "@/contracts/abi/SatoshiFund.json";
import { rainbowkitConfig } from "@/config/rainbowkitConfig";
import { waitForTransactionReceipt } from "wagmi/actions";

const RequestLoanForm: React.FC = () => {
  const { address } = useAccount();
  const { toast } = useToast();
  const [collateral, setCollateral] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [btcPrice, setBtcPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [requestData, setRequestData] = useState<`0x${string}` | null>(null);

  const { writeContractAsync } = useWriteContract();

  const calculateLTV = () => {
    return 150;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setBtcPrice(20000);
    e.preventDefault();
    if (!address || !collateral || !loanAmount || !btcPrice) return;

    try {
      // convert values to contract format
      // const collateralInWei = parseEther(collateral);
      const loanAmountInWei = parseEther(loanAmount);
      const btcPriceInWei = parseEther(btcPrice.toString());
      const collateralizationRatio = 150;
      const interestRatePerDay = 1;

      const txHash = await writeContractAsync({
        abi: SATOSHI_FUND_ABI,
        address: SATOSHI_FUND_ADDRESS,
        functionName: "requestLoan",
        args: [
          loanAmountInWei,
          btcPriceInWei,
          collateralizationRatio,
          interestRatePerDay,
        ],
      });

      await waitForTransactionReceipt(rainbowkitConfig, {
        confirmations: 1,
        hash: txHash,
      });

      toast({
        title: "Success",
        description: "Loan request submitted successfully!",
      });

      setRequestData(txHash);
      setIsSuccess(true);

      // Reset form
      setCollateral("");
      setLoanAmount("");
    } catch (error) {
      console.error("Error requesting loan:", error);
      toast({
        title: "Error",
        description: "Failed to submit loan request",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const ltv = calculateLTV();
  const isLTVSafe = ltv <= 150;

  // add logging
  console.log("[RequestLoanForm] Submitting loan request:", {
    collateral,
    loanAmount,
    btcPrice,
    collateralizationRatio: 150,
    interestRatePerDay: 120,
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      <div>
        <Input
          label="Collateral Amount (BTC)"
          type="number"
          value={collateral}
          onChange={(e) => setCollateral(e.target.value)}
          placeholder="0.00"
          step="0.001"
          icon={<Bitcoin className="text-accent-blue" size={20} />}
          disabled={loading}
          helper="Enter the amount of BTC you want to use as collateral"
        />
        {btcPrice && collateral && (
          <p className="text-sm text-gray-400 mt-1">
            ≈ {formatCurrency(Number(collateral) * btcPrice)}
          </p>
        )}
      </div>

      <div>
        <Input
          label="Loan Amount (USD)"
          type="number"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          placeholder="0.00"
          step="100"
          icon={<DollarSign className="text-accent-green" size={20} />}
          disabled={loading}
          helper="Enter the amount you want to borrow in USD"
        />
      </div>

      {ltv > 0 && (
        <div
          className={`p-4 rounded-lg ${
            isLTVSafe ? "bg-accent-green/10" : "bg-accent-red/10"
          }`}
        >
          <div className="flex items-center space-x-2">
            {!isLTVSafe && (
              <AlertTriangle className="text-accent-red" size={20} />
            )}
            <p className={isLTVSafe ? "text-accent-green" : "text-accent-red"}>
              Loan-to-Value Ratio: {ltv.toFixed(2)}%
            </p>
          </div>
          {!isLTVSafe && (
            <p className="text-sm text-accent-red mt-1">
              LTV must be below 150% to proceed
            </p>
          )}
        </div>
      )}

      <Button
        type="submit"
        disabled={
          loading || !isLTVSafe || !address || !collateral || !loanAmount
        }
        className="w-full"
      >
        {loading ? "Processing..." : "Request Loan"}
      </Button>

      {isSuccess && (
        <p className="text-sm text-accent-green text-center">
          Transaction confirmed! View on explorer:{" "}
          <a
            href={`https://explorer.testnet.rsk.co/tx/${requestData}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {requestData?.slice(0, 6)}...{requestData?.slice(-4)}
          </a>
        </p>
      )}
    </form>
  );
};

export default RequestLoanForm;
