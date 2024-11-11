import { Bitcoin, DollarSign, Percent } from "lucide-react";

export default function AccountSummary() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total RBTC Balance</p>
            <p className="text-2xl font-bold text-gray-900">2.5 RBTC</p>
          </div>
          <Bitcoin className="w-8 h-8 text-orange-500" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Collateralized Amount</p>
            <p className="text-2xl font-bold text-gray-900">1.8 RBTC</p>
          </div>
          <DollarSign className="w-8 h-8 text-blue-500" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Outstanding Loans</p>
            <p className="text-2xl font-bold text-gray-900">25,000 RDOC</p>
          </div>
          <DollarSign className="w-8 h-8 text-green-500" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Current LTV Ratio</p>
            <p className="text-2xl font-bold text-gray-900">65%</p>
          </div>
          <Percent className="w-8 h-8 text-purple-500" />
        </div>
      </div>
    </div>
  );
}
