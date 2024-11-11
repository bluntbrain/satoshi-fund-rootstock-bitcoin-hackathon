import React from 'react';
import { Bitcoin, DollarSign, Percent } from 'lucide-react';

const AccountOverview: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
        <div className="flex items-center space-x-3 mb-4">
          <Bitcoin className="text-accent-blue" size={24} />
          <h3 className="text-lg font-medium">BTC Balance</h3>
        </div>
        <p className="text-2xl font-bold">2.5 BTC</p>
        <p className="text-sm text-gray-400 mt-1">≈ $100,000 USD</p>
      </div>

      <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
        <div className="flex items-center space-x-3 mb-4">
          <DollarSign className="text-accent-green" size={24} />
          <h3 className="text-lg font-medium">Active Loans</h3>
        </div>
        <p className="text-2xl font-bold">$25,000</p>
        <p className="text-sm text-gray-400 mt-1">1 active loan</p>
      </div>

      <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
        <div className="flex items-center space-x-3 mb-4">
          <Percent className="text-accent-yellow" size={24} />
          <h3 className="text-lg font-medium">Current LTV</h3>
        </div>
        <p className="text-2xl font-bold">25%</p>
        <p className="text-sm text-gray-400 mt-1">Healthy ratio</p>
      </div>
    </div>
  );
};

export default AccountOverview;