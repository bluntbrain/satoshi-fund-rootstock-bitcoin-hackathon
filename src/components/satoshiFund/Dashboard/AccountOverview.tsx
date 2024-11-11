import React from 'react';
import { motion } from 'framer-motion';
import { Bitcoin, DollarSign, Percent } from 'lucide-react';
import { Card } from '../Card';

const AccountOverview: React.FC = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      <motion.div variants={item}>
        <Card className="bg-gradient-to-br from-accent-blue/10 via-dark-800 to-dark-900 border-accent-blue/20">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 rounded-xl bg-accent-blue/20 animate-pulse-slow">
              <Bitcoin className="text-accent-blue" size={24} />
            </div>
            <h3 className="text-lg font-medium">BTC Balance</h3>
          </div>
          <p className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            3.75 BTC
          </p>
          <div className="flex items-center space-x-2 mt-2">
            <p className="text-sm text-gray-400">≈ $168,750</p>
            <span className="text-xs text-accent-green">↑ 3.2%</span>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="bg-gradient-to-br from-accent-purple/10 via-dark-800 to-dark-900 border-accent-purple/20">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 rounded-xl bg-accent-purple/20 animate-pulse-slow">
              <DollarSign className="text-accent-purple" size={24} />
            </div>
            <h3 className="text-lg font-medium">Active Loans</h3>
          </div>
          <p className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            $85,000
          </p>
          <p className="text-sm text-gray-400 mt-2">2 active loans</p>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="bg-gradient-to-br from-accent-green/10 via-dark-800 to-dark-900 border-accent-green/20">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 rounded-xl bg-accent-green/20 animate-pulse-slow">
              <Percent className="text-accent-green" size={24} />
            </div>
            <h3 className="text-lg font-medium">Current LTV</h3>
          </div>
          <p className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            42.5%
          </p>
          <p className="text-sm text-accent-green mt-2">Well below limit</p>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default AccountOverview;