import React, { useState, useEffect } from "react";
import { Button } from "../components/satoshiFund/Button";
import Input from "../components/satoshiFund/Input";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { SATOSHI_FUND_ADDRESS } from "@/lib/utils/constants";
import abi from "@/contracts/abi/SatoshiFund.json";
import { useToast } from "@/components/ui/use-toast";
import { ethers } from "ethers";
import { waitForTransactionReceipt } from "wagmi/actions";
import { rainbowkitConfig } from "@/config/rainbowkitConfig";
import axios from "axios";

interface LoanDetails {
  active: boolean;
}

const RequestLoan: React.FC = () => {
  const { address } = useAccount();
  const [loanAmount, setLoanAmount] = useState("");
  const [btcPriceUSD, setBtcPriceUSD] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const { data: loanDetails, isLoading: isLoanLoading } = useReadContract({
    address: SATOSHI_FUND_ADDRESS,
    abi: abi,
    functionName: "getLoanDetails",
    args: [address],
  }) as { data: LoanDetails; isLoading: boolean };

  const { writeContractAsync } = useWriteContract();

  useEffect(() => {
    const fetchBtcPrice = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
        );
        setBtcPriceUSD(response.data.bitcoin.usd.toString());
      } catch (error) {
        console.error("Error fetching BTC price:", error);
      }
    };

    fetchBtcPrice();
  }, []);

  const handleRequestLoan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loanAmount || !btcPriceUSD) return;

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
        abi: abi,
        address: SATOSHI_FUND_ADDRESS,
        functionName: "requestLoan",
        args: [
          ethers.parseUnits(loanAmount, 18),
          ethers.parseUnits(btcPriceUSD, 18),
          ethers.parseUnits("150", 18),
          ethers.parseUnits("1", 18),
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
          type="text"
          value={btcPriceUSD}
          readOnly
          disabled
        />
        <Input
          label="Collateralization Ratio (%)"
          type="text"
          value="150"
          readOnly
          disabled
        />
        <Input
          label="Interest Rate Per Day (%)"
          type="text"
          value="1"
          readOnly
          disabled
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
