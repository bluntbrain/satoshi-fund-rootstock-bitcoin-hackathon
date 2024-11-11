import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Bitcoin,
  Shield,
  TrendingUp,
  Lock,
  ChevronRight,
  ExternalLink,
  Zap,
  LineChart,
} from "lucide-react";
import { Button } from "../components/satoshiFund/Button";

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  const handleLaunchApp = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen  text-white px-4 sm:px-6 lg:px-8">
      <div className="fixed inset-x-0 top-0 h-screen -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/20 via-orange-500/5 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-500/20 via-orange-500/5 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_0%,transparent_0deg,var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[length:50px_50px] bg-top bg-[linear-gradient(to_right,theme(colors.orange.500/0.05)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.orange.500/0.05)_1px,transparent_1px)]" />
      </div>
      <div className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-radial from-orange-500/10 via-transparent to-transparent opacity-50" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-500/5 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="text-center space-y-8"
          >
            <motion.div variants={item} className="inline-block">
              <span className="inline-flex items-center px-4 py-2 rounded-full border border-bitcoin/20 bg-bitcoin/5 text-bitcoin text-sm font-medium">
                <Zap size={16} className="mr-2" />
                Instant Bitcoin-Backed Loans
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-5xl md:text-7xl font-bold tracking-tight"
            >
              <span className="bg-gradient-to-r from-bitcoin via-bitcoin-light to-bitcoin bg-clip-text text-transparent">
                Leverage Your Bitcoin.
              </span>
              <br />
              <span className="text-white">Maintain Your Holdings.</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light"
            >
              Access instant liquidity without sacrificing your Bitcoin
              position. Professional-grade lending platform built on Bitcoin's
              security.
            </motion.p>

            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                onClick={handleLaunchApp}
                size="lg"
                className="px-8 py-4 text-lg group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Launch Platform
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

            <motion.div
              variants={item}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
            >
              <div className="p-6 rounded-2xl bg-dark-800/50 border border-dark-600 backdrop-blur-sm">
                <div className="text-3xl font-bold text-bitcoin">$2.5B+</div>
                <div className="text-gray-400 mt-1">Total Volume Locked</div>
              </div>
              <div className="p-6 rounded-2xl bg-dark-800/50 border border-dark-600 backdrop-blur-sm">
                <div className="text-3xl font-bold text-bitcoin">50,000+</div>
                <div className="text-gray-400 mt-1">Active Users</div>
              </div>
              <div className="p-6 rounded-2xl bg-dark-800/50 border border-dark-600 backdrop-blur-sm">
                <div className="text-3xl font-bold text-bitcoin">0.5%</div>
                <div className="text-gray-400 mt-1">Minimum Interest Rate</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="relative py-32 bg-dark-800 rounded-2xl" id="learn-more">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,_var(--tw-gradient-stops))] from-transparent via-bitcoin/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for Bitcoin Believers
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Our platform combines the security of Bitcoin with the flexibility
              of DeFi, providing a professional-grade lending solution.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group p-8 bg-dark-700/50 rounded-2xl border border-dark-600 hover:border-bitcoin/50 transition-all duration-500 backdrop-blur-sm"
            >
              <div className="p-3 rounded-xl bg-bitcoin/10 w-fit group-hover:bg-bitcoin/20 transition-colors">
                <Bitcoin className="text-bitcoin" size={32} />
              </div>
              <h3 className="text-xl font-bold mt-6 mb-4">
                Native Bitcoin Security
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Leverage Rootstock's Bitcoin-backed infrastructure for unmatched
                security and reliability in every transaction.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group p-8 bg-dark-700/50 rounded-2xl border border-dark-600 hover:border-bitcoin/50 transition-all duration-500 backdrop-blur-sm"
            >
              <div className="p-3 rounded-xl bg-bitcoin/10 w-fit group-hover:bg-bitcoin/20 transition-colors">
                <LineChart className="text-bitcoin" size={32} />
              </div>
              <h3 className="text-xl font-bold mt-6 mb-4">
                Professional Tools
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Access institutional-grade lending features with real-time
                monitoring and advanced risk management tools.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group p-8 bg-dark-700/50 rounded-2xl border border-dark-600 hover:border-bitcoin/50 transition-all duration-500 backdrop-blur-sm"
            >
              <div className="p-3 rounded-xl bg-bitcoin/10 w-fit group-hover:bg-bitcoin/20 transition-colors">
                <Lock className="text-bitcoin" size={32} />
              </div>
              <h3 className="text-xl font-bold mt-6 mb-4">Self-Custodial</h3>
              <p className="text-gray-400 leading-relaxed">
                Maintain complete control of your assets with our non-custodial
                smart contract infrastructure.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Business Economics Section */}
      <div className="relative py-32">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Enterprise-Grade Infrastructure
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Built for both individual and institutional users, our platform
              provides the reliability and features needed for professional
              Bitcoin lending.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 bg-dark-800/50 rounded-2xl border border-dark-600 backdrop-blur-sm"
            >
              <TrendingUp className="text-bitcoin mb-6" size={32} />
              <h3 className="text-2xl font-bold mb-6">
                Market-Leading Economics
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start text-gray-400">
                  <ChevronRight
                    className="text-bitcoin mt-1 mr-2 flex-shrink-0"
                    size={16}
                  />
                  <span>
                    Industry-lowest interest rates starting at 0.5% for
                    overcollateralized loans
                  </span>
                </li>
                <li className="flex items-start text-gray-400">
                  <ChevronRight
                    className="text-bitcoin mt-1 mr-2 flex-shrink-0"
                    size={16}
                  />
                  <span>
                    Automated liquidation protection with customizable safety
                    parameters
                  </span>
                </li>
                <li className="flex items-start text-gray-400">
                  <ChevronRight
                    className="text-bitcoin mt-1 mr-2 flex-shrink-0"
                    size={16}
                  />
                  <span>Zero hidden fees with complete cost transparency</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 bg-dark-800/50 rounded-2xl border border-dark-600 backdrop-blur-sm"
            >
              <Shield className="text-bitcoin mb-6" size={32} />
              <h3 className="text-2xl font-bold mb-6">
                Institutional Security
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start text-gray-400">
                  <ChevronRight
                    className="text-bitcoin mt-1 mr-2 flex-shrink-0"
                    size={16}
                  />
                  <span>
                    Multi-signature security with hardware wallet integration
                  </span>
                </li>
                <li className="flex items-start text-gray-400">
                  <ChevronRight
                    className="text-bitcoin mt-1 mr-2 flex-shrink-0"
                    size={16}
                  />
                  <span>
                    Real-time oracle price feeds with multi-source validation
                  </span>
                </li>
                <li className="flex items-start text-gray-400">
                  <ChevronRight
                    className="text-bitcoin mt-1 mr-2 flex-shrink-0"
                    size={16}
                  />
                  <span>
                    Comprehensive insurance coverage for all deposited assets
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-20 bg-dark-800 rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bitcoin/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Leverage Your Bitcoin?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust our platform for professional
              Bitcoin-backed lending solutions.
            </p>
            <Button
              onClick={handleLaunchApp}
              size="lg"
              className="px-8 py-4 text-lg"
            >
              Get Started Now
              <ChevronRight className="ml-2" size={20} />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark-900 border-t border-dark-700 rounded-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-bold mb-4">Platform</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/dashboard"
                    className="text-gray-400 hover:text-bitcoin transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/request"
                    className="text-gray-400 hover:text-bitcoin transition-colors"
                  >
                    Get a Loan
                  </Link>
                </li>
                <li>
                  <Link
                    to="/manage"
                    className="text-gray-400 hover:text-bitcoin transition-colors"
                  >
                    Manage Loans
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-bitcoin transition-colors flex items-center"
                  >
                    Documentation
                    <ExternalLink size={14} className="ml-1" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-bitcoin transition-colors flex items-center"
                  >
                    API Reference
                    <ExternalLink size={14} className="ml-1" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-bitcoin transition-colors flex items-center"
                  >
                    Security
                    <ExternalLink size={14} className="ml-1" />
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-bitcoin transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-bitcoin transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-bitcoin transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-bitcoin transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-bitcoin transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-bitcoin transition-colors"
                  >
                    Risk Disclosure
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-dark-600 text-center text-gray-400">
            <p>© 2024 Bitcoin Lending Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
