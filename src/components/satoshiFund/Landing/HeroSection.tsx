import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Zap } from "lucide-react";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <div className="relative min-h-screen flex items-center">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-bitcoin/10 via-transparent to-transparent opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-bitcoin/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-bitcoin/10 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bitcoin/20 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center space-y-8"
        >
          <motion.div variants={item} className="inline-block">
            <span className="inline-flex items-center px-4 py-2 rounded-full border border-bitcoin/20 bg-bitcoin/5 text-bitcoin text-sm font-medium">
              <Zap size={16} className="mr-2" />
              Unlock the Value of Your Bitcoin
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-5xl md:text-7xl font-bold tracking-tight"
          >
            <span className="bg-gradient-to-r from-bitcoin via-bitcoin-light to-bitcoin bg-clip-text text-transparent">
              Borrow Without Selling
            </span>
            <br />
            <span className="text-white">Keep Your Bitcoin</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light"
          >
            Access stablecoins against your Bitcoin holdings. Stay invested and
            access cash whenever you need it.
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              onClick={() => navigate("/dashboard")}
              size="lg"
              className="px-8 py-4 text-lg group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Launch App
                <ChevronRight
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-bitcoin to-bitcoin-dark group-hover:from-bitcoin-dark group-hover:to-bitcoin transition-all duration-500" />
            </Button>
            <a
              href="#learn-more"
              className="text-gray-400 hover:text-bitcoin transition-colors flex items-center gap-2"
            >
              Learn more
              <ChevronRight size={16} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
