import React from "react";
import { HeroSection } from "../components/satoshiFund/Landing/HeroSection";
import { ProblemSection } from "../components/satoshiFund/Landing/ProblemSection";
import { SolutionSection } from "../components/satoshiFund/Landing/SolutionSection";
import { FutureSection } from "../components/satoshiFund/Landing/FutureSection";
import { motion } from "framer-motion";
import { Button } from "../components/satoshiFund/Button";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-white">
      <div className="fixed inset-x-0 top-0 h-[80rem] -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-bitcoin/20 via-bitcoin/5 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-bitcoin/20 via-bitcoin/5 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-bitcoin/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_0%,transparent_0deg,var(--tw-gradient-stops))] from-bitcoin/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[length:50px_50px] bg-top bg-[linear-gradient(to_right,theme(colors.bitcoin.DEFAULT/0.05)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.bitcoin.DEFAULT/0.05)_1px,transparent_1px)]" />
      </div>

      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <FutureSection />

      <div className="relative py-20 bg-dark-800">
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
              onClick={() => navigate("/dashboard")}
              size="lg"
              className="px-8 py-4 text-lg"
            >
              Get Started Now
              <ChevronRight className="ml-2" size={20} />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
