import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, AlertTriangle } from 'lucide-react';
import { Card } from '../Card';

export const ProblemSection: React.FC = () => {
  const stats = [
    {
      value: '$400B+',
      label: 'Bitcoin Market Cap',
      source: 'CoinMarketCap'
    },
    {
      value: '50%+',
      label: 'Long-term Holders',
      source: 'Glassnode'
    },
    {
      value: '15-20%',
      label: 'Capital Gains Tax',
      source: 'IRS'
    }
  ];

  return (
    <div className="relative py-32" id="learn-more">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The Bitcoin Liquidity Dilemma</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Bitcoin holders face a tough choice: Hold for long-term gains or sell for immediate liquidity needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="text-center">
                <div className="text-3xl font-bold text-bitcoin mb-2">{stat.value}</div>
                <div className="text-lg text-white mb-1">{stat.label}</div>
                <div className="text-sm text-gray-400">Source: {stat.source}</div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <Card>
              <h3 className="text-2xl font-bold mb-4">Current Challenges</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <AlertTriangle className="text-accent-yellow mt-1 mr-3 flex-shrink-0" size={20} />
                  <p className="text-gray-400">High collateral requirements (200%+) making loans inaccessible</p>
                </li>
                <li className="flex items-start">
                  <DollarSign className="text-accent-red mt-1 mr-3 flex-shrink-0" size={20} />
                  <p className="text-gray-400">Significant tax implications from selling Bitcoin</p>
                </li>
                <li className="flex items-start">
                  <TrendingUp className="text-accent-green mt-1 mr-3 flex-shrink-0" size={20} />
                  <p className="text-gray-400">Missing out on potential long-term appreciation</p>
                </li>
              </ul>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-bitcoin/10 to-transparent">
              <h3 className="text-2xl font-bold mb-4">The Need</h3>
              <p className="text-gray-400">
                Bitcoin holders need a way to access liquidity without sacrificing their long-term position or facing immediate tax consequences.
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};