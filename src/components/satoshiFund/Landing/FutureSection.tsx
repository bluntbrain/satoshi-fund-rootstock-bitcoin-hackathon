import React from 'react';
import { motion } from 'framer-motion';
import { Users, BarChart3, Layers, Building2, ShieldCheck, Vote } from 'lucide-react';
import { Card } from '../Card';

export const FutureSection: React.FC = () => {
  const features = [
    {
      icon: <Users className="text-bitcoin" size={24} />,
      title: 'P2P Lending',
      description: 'Connect directly with lenders and borrowers in a decentralized marketplace.'
    },
    {
      icon: <BarChart3 className="text-bitcoin" size={24} />,
      title: 'Yield Farming',
      description: 'Earn competitive yields through staking and liquidity provision.'
    },
    {
      icon: <Layers className="text-bitcoin" size={24} />,
      title: 'Multi-Asset Collateral',
      description: 'Support for multiple cryptocurrencies as collateral options.'
    },
    {
      icon: <Building2 className="text-bitcoin" size={24} />,
      title: 'Fiat Integration',
      description: 'Seamless fiat on/off ramps for direct bank transfers.'
    },
    {
      icon: <ShieldCheck className="text-bitcoin" size={24} />,
      title: 'Enhanced Security',
      description: 'DeFi insurance options and advanced risk management tools.'
    },
    {
      icon: <Vote className="text-bitcoin" size={24} />,
      title: 'DAO Governance',
      description: 'Community-driven platform evolution through decentralized governance.'
    }
  ];

  return (
    <div className="relative py-32 bg-dark-800">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-bitcoin/5 via-transparent to-transparent opacity-50" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Future Scope</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Our vision extends beyond traditional Bitcoin-backed loans. Explore the future
            capabilities coming to SatoshiFund.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:border-bitcoin/50 transition-all duration-500">
                <div className="p-3 rounded-xl bg-bitcoin/10 w-fit mb-4 group-hover:bg-bitcoin/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};