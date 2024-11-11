import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import Input from "./Input";
import { Bitcoin, DollarSign, AlertTriangle } from "lucide-react";
import { formatCurrency } from "@/lib/utils/format";
import { useAccount } from "wagmi";

const RequestLoanForm: React.FC = () => {
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const [collateral, setCollateral] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [btcPrice, setBtcPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      // const price = await getBTCPrice();
      // if (price) setBtcPrice(price);
    };
    fetchPrice();
    const interval = setInterval(fetchPrice, 60000);
    return () => clearInterval(interval);
  }, [getBTCPrice]);

  const calculateLTV = () => {
    if (!btcPrice || !collateral || !loanAmount) return 0;
    const collateralValue = Number(collateral) * btcPrice;
    return (Number(loanAmount) / collateralValue) * 100;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address || !collateral || !loanAmount) return;

    try {
      // const txHash = await requestLoan(collateral, loanAmount);
      // console.log('Loan requested:', txHash);
      // Reset form
      setCollateral("");
      setLoanAmount("");
    } catch (err) {
      console.error("Error requesting loan:", err);
    } finally {
      setLoading(false);
    }
  };

  const ltv = calculateLTV();
  const isLTVSafe = ltv <= 150;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      {/* {error && (
        <div className="p-4 bg-accent-red/10 rounded-lg">
          <p className="text-accent-red text-sm">{error}</p>
        </div>
      )} */}

      <Button
        type="submit"
        disabled={
          loading || !isLTVSafe || !address || !collateral || !loanAmount
        }
        className="w-full"
      >
        {loading ? "Processing..." : "Request Loan"}
      </Button>
    </form>
  );
};

export default RequestLoanForm;
