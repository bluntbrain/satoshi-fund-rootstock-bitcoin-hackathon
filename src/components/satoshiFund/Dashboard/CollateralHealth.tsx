import React from "react";
import { Card } from "../Card";
import { AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";
import { CollateralRatioIndicator } from "../CollateralRatioIndicator";
import { formatCurrency } from "@/lib/utils/format";
import { useBitcoinPrice } from "@/lib/utils/api";

const CollateralHealth: React.FC = () => {
  const { data: btcData } = useBitcoinPrice();
  const btcPrice = btcData?.current_price || 45000;
  const collateralBtc = 3.75;
  const collateralValue = collateralBtc * btcPrice;
  const totalBorrowed = 85000;
  const availableToBorrow = Math.max(0, collateralValue * 0.7 - totalBorrowed);

  const priceChange24h = 2.5;
  const collateralChange24h = (collateralValue * priceChange24h) / 100;

  return (
    <Card>
      <h2 className="text-xl font-bold mb-6">Collateral Health</h2>

      <div className="space-y-6">
        <div className="p-4 bg-gradient-to-br from-dark-700 to-dark-600 rounded-lg border border-dark-500">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="text-accent-yellow mt-1" size={20} />
            <div>
              <h3 className="font-medium">Loan #BTC-458</h3>
              <p className="text-sm text-gray-400 mt-1">
                Collateral ratio approaching minimum threshold
              </p>
            </div>
          </div>

          <div className="mt-4">
            <CollateralRatioIndicator
              currentRatio={145}
              minRatio={150}
              liquidationRatio={120}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-dark-700 rounded-lg">
            <span className="text-sm text-gray-400">
              Total Collateral Value
            </span>
            <div className="text-right">
              <span className="font-medium">
                {formatCurrency(collateralValue)}
              </span>
              <div
                className={`text-xs flex items-center justify-end ${
                  priceChange24h >= 0 ? "text-accent-green" : "text-accent-red"
                }`}
              >
                {priceChange24h >= 0 ? (
                  <TrendingUp size={12} className="mr-1" />
                ) : (
                  <TrendingDown size={12} className="mr-1" />
                )}
                {priceChange24h >= 0 ? "+" : ""}
                {priceChange24h}% (
                {formatCurrency(Math.abs(collateralChange24h))})
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center p-3 bg-dark-700 rounded-lg">
            <span className="text-sm text-gray-400">Total Borrowed</span>
            <span className="font-medium">{formatCurrency(totalBorrowed)}</span>
          </div>

          <div className="flex justify-between items-center p-3 bg-dark-700 rounded-lg">
            <span className="text-sm text-gray-400">Available to Borrow</span>
            <span className="font-medium text-accent-green">
              {formatCurrency(availableToBorrow)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CollateralHealth;
