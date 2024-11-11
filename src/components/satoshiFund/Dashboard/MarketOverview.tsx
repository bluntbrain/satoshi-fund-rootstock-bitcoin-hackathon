import React, { useState } from "react";
import { Card } from "../Card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useHistoricalBitcoinData } from "@/lib/utils/api";
import { formatCurrency } from "@/lib/utils/format";

const MarketOverview: React.FC = () => {
  const [timeframe, setTimeframe] = useState(7);
  const { data, loading } = useHistoricalBitcoinData(timeframe);

  interface TooltipProps {
    active?: boolean;
    payload?: {
      value: number;
      payload: {
        date: string;
      };
    }[];
  }

  const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dark-800 p-3 rounded-lg border border-dark-600">
          <p className="text-gray-400">{payload[0].payload.date}</p>
          <p className="text-white font-medium">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="h-[400px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Bitcoin Price</h2>
        <select
          className="bg-dark-700 border border-dark-600 rounded-lg px-3 py-1.5 text-sm text-white"
          value={timeframe}
          onChange={(e) => setTimeframe(Number(e.target.value))}
        >
          <option value={7}>Last 7 days</option>
          <option value={30}>Last 30 days</option>
          <option value={90}>Last 90 days</option>
        </select>
      </div>

      <div className="h-[300px]">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <div className="animate-pulse text-gray-400">
              Loading chart data...
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis
                dataKey="date"
                stroke="#4B5563"
                tickFormatter={(value) => value.split("/")[1]}
              />
              <YAxis
                stroke="#4B5563"
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={false}
                animationDuration={1000}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
};

export default MarketOverview;
