import React from "react";
import { Card } from "../components/satoshiFund/Card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const loanData = [
  { month: "Jan", totalLoans: 150000, activeLoans: 120000, repaidLoans: 30000 },
  { month: "Feb", totalLoans: 180000, activeLoans: 140000, repaidLoans: 40000 },
  { month: "Mar", totalLoans: 220000, activeLoans: 170000, repaidLoans: 50000 },
];

const collateralData = [
  { month: "Jan", btcPrice: 42000, tvl: 10.2, utilizationRate: 75 },
  { month: "Feb", btcPrice: 44000, tvl: 11.5, utilizationRate: 80 },
  { month: "Mar", btcPrice: 45000, tvl: 12.5, utilizationRate: 85 },
];

const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Analytics</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-bold mb-6">Loan Volume</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={loanData}>
                <XAxis dataKey="month" stroke="#4B5563" />
                <YAxis stroke="#4B5563" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "none",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="activeLoans" fill="#3B82F6" />
                <Bar dataKey="repaidLoans" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-bold mb-6">Platform Metrics</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={collateralData}>
                <XAxis dataKey="month" stroke="#4B5563" />
                <YAxis stroke="#4B5563" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "none",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="tvl"
                  stroke="#3B82F6"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="utilizationRate"
                  stroke="#10B981"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <h3 className="text-lg font-medium mb-2">Total Value Locked</h3>
          <p className="text-3xl font-bold text-accent-blue">$12.5M</p>
          <p className="text-sm text-gray-400">+15% from last month</p>
        </Card>

        <Card>
          <h3 className="text-lg font-medium mb-2">Active Loans</h3>
          <p className="text-3xl font-bold text-accent-green">156</p>
          <p className="text-sm text-gray-400">+23 new loans this month</p>
        </Card>

        <Card>
          <h3 className="text-lg font-medium mb-2">Average LTV</h3>
          <p className="text-3xl font-bold text-accent-yellow">65%</p>
          <p className="text-sm text-gray-400">-2% from last month</p>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
