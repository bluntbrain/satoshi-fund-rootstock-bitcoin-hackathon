import React from "react";
import { Card } from "../components/satoshiFund/Card";
import RequestLoanForm from "../components/satoshiFund/RequestLoanForm";

const RequestLoan: React.FC = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-white">Request Loan</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <RequestLoanForm />
        </Card>

        <Card>
          <h3 className="text-xl font-bold mb-4">Loan Terms</h3>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-br from-dark-700 to-dark-600 rounded-lg">
              <p className="text-sm text-gray-400">Maximum LTV Ratio</p>
              <p className="text-lg font-medium">150%</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-dark-700 to-dark-600 rounded-lg">
              <p className="text-sm text-gray-400">Interest Rate</p>
              <p className="text-lg font-medium">1% per day</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-dark-700 to-dark-600 rounded-lg">
              <p className="text-sm text-gray-400">Liquidation Threshold</p>
              <p className="text-lg font-medium">110% LTV</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-dark-700 to-dark-600 rounded-lg">
              <p className="text-sm text-gray-400">Minimum Collateral</p>
              <p className="text-lg font-medium">0.01 BTC</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RequestLoan;
