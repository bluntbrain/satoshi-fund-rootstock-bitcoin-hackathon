import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Coins, Bell, Wallet } from 'lucide-react';
import { Card } from '../Card';

export const SolutionSection: React.FC = () => {
  const features = [
    {
      icon: <Shield className="text-bitcoin" size={24} />,
      title: 'Flexible Collateral Options',
      description: 'Get personalized loan terms based on your profile and collateral.'
    },
    {
      icon: <Lock className="text-bitcoin" size={24} />,
      title: 'Transparent and Secure',
      description: 'Built on Rootstock (RSK) for maximum security and transparency.'
    },
    {
      icon: <Coins className="text-bitcoin" size={24} />,
      title: 'Customizable Rates',
      description: 'Fair interest rates based on your credit profile.'
    },
    {
      icon: <Wallet className="text-bitcoin" size={24} />,
      title: 'Easy Repayment',
      description: 'Flexible repayment options with interest only on what you owe.'
    },
    {
      icon: <Bell className="text-bitcoin" size={24} />,
      title: 'Price Alerts',
      description: 'Real-time notifications for collateral value changes.'
    }
  ];

  return (
    <div className="relative py-32 bg-dark-800">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bitcoin/5 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Introducing SatoshiFund</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A new way to leverage your Bitcoin holdings while maintaining complete control of your assets.
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
                <div className="p-3 rounded-xl bg-bitcoin/10 w-fit mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};