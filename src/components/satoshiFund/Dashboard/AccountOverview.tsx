import React from "react";
import { Bitcoin, DollarSign, Percent } from "lucide-react";
import { ethers } from "ethers";
import { Loan } from "@/lib/types";

interface AccountOverviewProps {
  collateralBalance: bigint;
  loanDetails: Loan;
  isLoading: boolean;
}

const AccountOverview: React.FC<AccountOverviewProps> = ({
  collateralBalance,
  loanDetails,
  isLoading,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
        <div className="flex items-center space-x-3 mb-4">
          <Bitcoin className="text-accent-blue" size={24} />
          <h3 className="text-lg font-medium"> Collateral Balance</h3>
        </div>
        <p className="text-2xl font-bold">
          {isLoading ? "Loading..." : ethers.formatEther(collateralBalance)}{" "}
          RBTC
        </p>
        <p className="text-sm text-gray-400 mt-1">≈ $100,000 USD</p>
      </div>

      <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
        <div className="flex items-center space-x-3 mb-4">
          <DollarSign className="text-accent-green" size={24} />
          <h3 className="text-lg font-medium">Active Loans</h3>
        </div>
        <p className="text-2xl font-bold">
          {isLoading ? "Loading..." : loanDetails.active ? "1" : "0"} RBTC
        </p>
        <p className="text-sm text-gray-400 mt-1">
          {/* {isLoading ? "Loading..."  : activeLoans} active loan */}
        </p>
      </div>

      <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
        <div className="flex items-center space-x-3 mb-4">
          <Percent className="text-accent-yellow" size={24} />
          <h3 className="text-lg font-medium">Current LTV</h3>
        </div>
        <p className="text-2xl font-bold">
          {/* {isLoading ? "Loading..." : currentLTV}% */}
        </p>
        <p className="text-sm text-gray-400 mt-1">Healthy ratio</p>
      </div>
    </div>
  );
};

export default AccountOverview;
