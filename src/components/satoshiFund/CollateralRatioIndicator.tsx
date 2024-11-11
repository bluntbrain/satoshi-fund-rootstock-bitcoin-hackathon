import React from 'react';

interface CollateralRatioIndicatorProps {
  currentRatio: number;
  minRatio: number;
  liquidationRatio: number;
}

export const CollateralRatioIndicator: React.FC<CollateralRatioIndicatorProps> = ({
  currentRatio,
  minRatio,
  liquidationRatio,
}) => {
  const getStatusColor = (ratio: number) => {
    if (ratio <= liquidationRatio) return 'bg-accent-red';
    if (ratio <= minRatio) return 'bg-accent-yellow';
    return 'bg-accent-green';
  };

  const getPercentage = (ratio: number) => {
    return Math.min((ratio / (minRatio * 1.5)) * 100, 100);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-400">Collateral Ratio</span>
        <span className={`font-medium ${getStatusColor(currentRatio).replace('bg-', 'text-')}`}>
          {currentRatio}%
        </span>
      </div>
      <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
        <div
          className={`h-full ${getStatusColor(currentRatio)} transition-all duration-300`}
          style={{ width: `${getPercentage(currentRatio)}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-500">
        <span>Liquidation: {liquidationRatio}%</span>
        <span>Min: {minRatio}%</span>
      </div>
    </div>
  );
};