import React from "react";
import { AlertTriangle, CheckCircle } from "lucide-react";

const Notifications: React.FC = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Notifications</h2>
      <div className="space-y-4">
        <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="text-accent-yellow mt-1" size={24} />
            <div>
              <h3 className="font-medium">Collateral Ratio Warning</h3>
              <p className="text-gray-400 mt-1">
                Your loan #1234 is approaching the minimum collateral ratio.
                Consider adding more collateral.
              </p>
              <p className="text-sm text-gray-500 mt-2">2 hours ago</p>
            </div>
          </div>
        </div>

        <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
          <div className="flex items-start space-x-4">
            <CheckCircle className="text-accent-green mt-1" size={24} />
            <div>
              <h3 className="font-medium">Loan Approved</h3>
              <p className="text-gray-400 mt-1">
                Your loan request for $25,000 has been approved and funded.
              </p>
              <p className="text-sm text-gray-500 mt-2">1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
