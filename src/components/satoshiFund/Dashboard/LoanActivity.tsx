import React from "react";
import { Card } from "../Card";
import { ArrowUpRight, ArrowDownRight, Clock } from "lucide-react";
import { formatCurrency } from "@/lib/utils/format";

const activities = [
  {
    id: 1,
    type: "borrow",
    amount: 50000,
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    status: "completed",
    collateral: 2.5,
    interestRate: "1.2%",
  },
  {
    id: 2,
    type: "repay",
    amount: 25000,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    status: "completed",
    collateral: 1.25,
    interestRate: "1.2%",
  },
  {
    id: 3,
    type: "borrow",
    amount: 35000,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    status: "completed",
    collateral: 1.75,
    interestRate: "1.2%",
  },
  {
    id: 4,
    type: "topup",
    amount: 15000,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    status: "completed",
    collateral: 0.75,
    interestRate: "1.2%",
  },
  {
    id: 5,
    type: "borrow",
    amount: 20000,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    status: "completed",
    collateral: 1.0,
    interestRate: "1.2%",
  },
];

const LoanActivity: React.FC = () => {
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    if (diff < 1000 * 60 * 60) {
      // Less than 1 hour
      const minutes = Math.floor(diff / (1000 * 60));
      return `${minutes} minutes ago`;
    } else if (diff < 1000 * 60 * 60 * 24) {
      // Less than 1 day
      const hours = Math.floor(diff / (1000 * 60 * 60));
      return `${hours} hours ago`;
    } else {
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    }
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Recent Activity</h2>
        <button className="text-accent-blue hover:text-accent-blue-dark text-sm transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between p-4 bg-dark-700 rounded-lg hover:bg-dark-600 transition-colors group"
          >
            <div className="flex items-center space-x-4">
              <div
                className={`p-2 rounded-full transition-colors ${
                  activity.type === "borrow"
                    ? "bg-accent-blue/20 text-accent-blue group-hover:bg-accent-blue/30"
                    : activity.type === "repay"
                    ? "bg-accent-green/20 text-accent-green group-hover:bg-accent-green/30"
                    : "bg-accent-purple/20 text-accent-purple group-hover:bg-accent-purple/30"
                }`}
              >
                {activity.type === "borrow" ? (
                  <ArrowUpRight size={20} />
                ) : (
                  <ArrowDownRight size={20} />
                )}
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <p className="font-medium capitalize">{activity.type}</p>
                  <span className="text-sm text-gray-400">
                    {activity.collateral} BTC @ {activity.interestRate}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-400">
                  <Clock size={14} />
                  <span>{formatDate(activity.timestamp)}</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p
                className={`font-medium ${
                  activity.type === "borrow"
                    ? "text-accent-blue"
                    : activity.type === "repay"
                    ? "text-accent-green"
                    : "text-accent-purple"
                }`}
              >
                {activity.type === "borrow" ? "+" : "-"}
                {formatCurrency(activity.amount)}
              </p>
              <p
                className={`text-sm capitalize ${
                  activity.status === "pending"
                    ? "text-accent-yellow"
                    : "text-gray-400"
                }`}
              >
                {activity.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default LoanActivity;
