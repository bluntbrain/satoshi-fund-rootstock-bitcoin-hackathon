import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus, Upload, RefreshCw } from 'lucide-react';

const QuickActions: React.FC = () => {
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
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      <motion.div variants={item}>
        <Link
          to="/request"
          className="group flex items-center justify-center p-6 bg-gradient-to-br from-accent-blue/10 to-transparent border border-accent-blue/20 text-white rounded-xl hover:shadow-neon transition-all duration-500 hover-float"
        >
          <Plus className="w-6 h-6 mr-2 text-accent-blue group-hover:scale-110 transition-transform duration-300" />
          <span className="font-semibold">Request Loan</span>
        </Link>
      </motion.div>

      <motion.div variants={item}>
        <Link
          to="/manage"
          className="group flex items-center justify-center p-6 bg-gradient-to-br from-accent-purple/10 to-transparent border border-accent-purple/20 text-white rounded-xl hover:shadow-neon-purple transition-all duration-500 hover-float"
        >
          <Upload className="w-6 h-6 mr-2 text-accent-purple group-hover:scale-110 transition-transform duration-300" />
          <span className="font-semibold">Add Collateral</span>
        </Link>
      </motion.div>

      <motion.div variants={item}>
        <Link
          to="/manage"
          className="group flex items-center justify-center p-6 bg-gradient-to-br from-accent-green/10 to-transparent border border-accent-green/20 text-white rounded-xl hover:shadow-neon-green transition-all duration-500 hover-float"
        >
          <RefreshCw className="w-6 h-6 mr-2 text-accent-green group-hover:scale-110 transition-transform duration-300" />
          <span className="font-semibold">Repay Loan</span>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default QuickActions;