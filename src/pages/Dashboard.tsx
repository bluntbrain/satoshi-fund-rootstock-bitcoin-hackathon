import React from "react";
import AccountOverview from "../components/satoshiFund/Dashboard/AccountOverview";
import MarketOverview from "../components/satoshiFund/Dashboard/MarketOverview";
import LoanActivity from "../components/satoshiFund/Dashboard/LoanActivity";
import CollateralHealth from "../components/satoshiFund/Dashboard/CollateralHealth";
import QuickActions from "../components/satoshiFund/Dashboard/QuickActions";
import { useAccount } from "wagmi";

const Dashboard: React.FC = () => {
  const { address } = useAccount();
  return (
    <div className="space-y-6 w-full max-w-[1200px] mx-auto">
      <div className="flex justify-between items-center mt-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">Welcome, {address}</p>
        </div>
      </div>

      <QuickActions />
      <AccountOverview />

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
