import React from 'react';
import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

interface LoanHealthIndicatorProps {
  ltv: number;
  liquidationThreshold: number;
  warningThreshold: number;
}

const LoanHealthIndicator: React.FC<LoanHealthIndicatorProps> = ({
  ltv,
  liquidationThreshold,
  warningThreshold,
}) => {
  const getHealthStatus = () => {
    if (ltv >= liquidationThreshold) {
      return {
        status: 'danger',
        icon: <AlertTriangle className="text-accent-red" size={24} />,
        message: 'At risk of liquidation',
        color: 'text-accent-red',
        bgColor: 'bg-accent-red/10',
      };
    } else if (ltv >= warningThreshold) {
      return {
        status: 'warning',
        icon: <AlertCircle className="text-accent-yellow" size={24} />,
        message: 'Approaching liquidation threshold',
        color: 'text-accent-yellow',
        bgColor: 'bg-accent-yellow/10',
      };
    } else {
      return {
        status: 'healthy',
        icon: <CheckCircle className="text-accent-green" size={24} />,
        message: 'Healthy loan position',
        color: 'text-accent-green',
        bgColor: 'bg-accent-green/10',
      };
    }
  };

  const health = getHealthStatus();

  return (
    <div className={`p-4 rounded-lg ${health.bgColor}`}>
      <div className="flex items-start space-x-3">
        {health.icon}
        <div>
          <h3 className={`font-medium ${health.color}`}>
            Loan Health: {health.status.charAt(0).toUpperCase() + health.status.slice(1)}
          </h3>
          <p className="text-sm text-gray-400 mt-1">{health.message}</p>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-400">Current LTV</span>
          <span className={health.color}>{ltv.toFixed(2)}%</span>
        </div>
        <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              health.status === 'danger' ? 'bg-accent-red' :
              health.status === 'warning' ? 'bg-accent-yellow' :
              'bg-accent-green'
            }`}
            style={{ width: `${Math.min((ltv / liquidationThreshold) * 100, 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Safe: &lt;{warningThreshold}%</span>
          <span>Liquidation: {liquidationThreshold}%</span>
        </div>
      </div>
    </div>
  );
};

export default LoanHealthIndicator;