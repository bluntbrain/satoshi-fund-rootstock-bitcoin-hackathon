import React, { useState } from "react";
import MarketOverview from "../components/satoshiFund/Dashboard/MarketOverview";
import LoanActivity from "../components/satoshiFund/Dashboard/LoanActivity";
import CollateralHealth from "../components/satoshiFund/Dashboard/CollateralHealth";
import QuickActions from "../components/satoshiFund/Dashboard/QuickActions";
import DepositCollateral from "../components/satoshiFund/DepositCollateral";
import { Card } from "../components/satoshiFund/Card";
import { useAccount, useReadContract } from "wagmi";
import { SATOSHI_FUND_ADDRESS } from "@/lib/utils/constants";
import SATOSHI_FUND_ABI from "@/contracts/abi/SatoshiFund.json";
import Navbar from "@/components/Navbar";
import AccountOverview from "@/components/satoshiFund/Dashboard/AccountOverview";
import { Loan } from "@/lib/types";

const Dashboard: React.FC = () => {
  const { address } = useAccount();
  const [showDeposit, setShowDeposit] = useState(false);

  const handleAddCollateralClick = () => {
    setShowDeposit(!showDeposit);
  };

  const { data: collateralBalance, isLoading: isCollateralLoading } =
    useReadContract({
      address: SATOSHI_FUND_ADDRESS,
      abi: SATOSHI_FUND_ABI,
      functionName: "collateralBalances",
      args: [address],
    }) as { data: bigint; isLoading: boolean };

  const { data: loanDetails, isLoading: isLoanLoading } = useReadContract({
    address: SATOSHI_FUND_ADDRESS,
    abi: SATOSHI_FUND_ABI,
    functionName: "getLoanDetails",
    args: [address],
  }) as {
    data: {
      principal: bigint;
      collateral: bigint;
      active: boolean;
    };
    isLoading: boolean;
  };

  // Transform the data to match the expected Loan type
  const formattedLoanDetails: Loan = {
    id: "0", // Add appropriate value
    collateralAmount: Number(loanDetails?.collateral || 0n),
    principalAmount: Number(loanDetails?.principal || 0n),
    interestRate: 0, // Add appropriate value
    startDate: new Date(), // Add appropriate value
    dueDate: new Date(), // Add appropriate value
    status: loanDetails?.active ? "active" : "paid",
    ltv: 0,
    interestAccrued: 0,
  };

  return (
    <div className="space-y-6 w-full max-w-[1200px] mx-auto">
      <div className="flex justify-between items-center mt-4">
        <Navbar />
      </div>

      <QuickActions onAddCollateralClick={handleAddCollateralClick} />
      {showDeposit && (
        <Card hover={false} gradient={false}>
          <h2 className="text-xl font-bold mb-4">Deposit Collateral</h2>
          <DepositCollateral />
        </Card>
      )}
      <AccountOverview
        collateralBalance={collateralBalance}
        loanDetails={formattedLoanDetails}
        isLoading={isCollateralLoading || isLoanLoading}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MarketOverview />
        </div>
        <div>
          <CollateralHealth />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LoanActivity />
        </div>
        <div>
          <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
            <h2 className="text-xl font-bold mb-4">Need Help?</h2>
            <p className="text-gray-400 mb-4">
              Learn more about how to use our platform effectively.
            </p>
            <a
              href="#"
              className="text-accent-blue hover:text-accent-blue-dark"
            >
              View Documentation →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
