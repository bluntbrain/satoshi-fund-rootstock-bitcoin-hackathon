import React, { useState, useEffect } from "react";
import { Card } from "../components/satoshiFund/Card";
import { Button } from "../components/satoshiFund/Button";
import Modal from "../components/satoshiFund/Modal";
import RepayLoanForm from "../components/satoshiFund/ManageLoan/RepayLoanForm";
import TopUpCollateralForm from "../components/satoshiFund/ManageLoan/TopUpCollateralForm";
import LoanHealthIndicator from "../components/satoshiFund/ManageLoan/LoanHealthIndicator";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { formatCurrency } from "@/lib/utils/format";
import { useAccount, useReadContract } from "wagmi";
import { SATOSHI_FUND_ADDRESS } from "@/lib/utils/constants";
import SATOSHI_FUND_ABI from "@/contracts/abi/SatoshiFund.json";
import { ethers } from "ethers";

interface Loan {
  startDate: string | number;
  principal: bigint;
  collateral: bigint;
  interestAccrued: bigint;
  ltv: number;
  id: string;
  status: string;
  active: boolean;
}

const ManageLoans: React.FC = () => {
  const { address } = useAccount();
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [isRepayModalOpen, setIsRepayModalOpen] = useState(false);
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);
  const [isLoanLoading, setIsLoanLoading] = useState(true);

  const { data: loanDetails } = useReadContract({
    address: SATOSHI_FUND_ADDRESS,
    abi: SATOSHI_FUND_ABI,
    functionName: "getLoanDetails",
    args: [address],
  }) as { data: Loan };

  useEffect(() => {
    if (loanDetails) {
      setIsLoanLoading(false);
    }
  }, [loanDetails]);

  const loans = loanDetails ? [loanDetails] : [];

  const handleRepaySuccess = () => {
    setIsRepayModalOpen(false);
    // Optionally refetch loan details here
  };

  const handleTopUpSuccess = () => {
    setIsTopUpModalOpen(false);
    // Optionally refetch loan details here
  };

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Manage Loans</h1>
        <Link to="/request">
          <Button>
            <Plus className="w-5 h-5 mr-2" />
            New Loan
          </Button>
        </Link>
      </div>

      {isLoanLoading ? (
        <Card>
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-blue"></div>
          </div>
        </Card>
      ) : loans.length > 0 ? (
        loans.map((loan, index) => (
          <Card key={index} hover={false} gradient={false}>
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold">Loan #{index + 1}</h2>
                  <p className="text-gray-400">
                    Started{" "}
                    {new Date(
                      Number((loan as Loan).startDate) * 1000
                    ).toLocaleDateString()}
                  </p>
                  <p
                    className={`text-sm font-medium mt-1 ${
                      loan.active ? "text-accent-green" : "text-accent-red"
                    }`}
                  >
                    {loan.active ? "Active" : "Inactive"}
                  </p>
                </div>
                <div className="flex space-x-3">
                  <Button
                    variant="primary"
                    onClick={() => {
                      setSelectedLoan(loan);
                      setIsRepayModalOpen(true);
                    }}
                  >
                    Repay Loan
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setSelectedLoan(loan);
                      setIsTopUpModalOpen(true);
                    }}
                  >
                    Add Collateral
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-dark-700 rounded-lg">
                  <p className="text-sm text-gray-400">Principal</p>
                  <p className="text-xl font-bold mt-1">
                    {Number(ethers.formatEther(loan.principal))} RBTC
                  </p>
                </div>
                <div className="p-4 bg-dark-700 rounded-lg">
                  <p className="text-sm text-gray-400">Collateral</p>
                  <p className="text-xl font-bold mt-1">
                    {Number(ethers.formatEther(loan.collateral))} RBTC
                  </p>
                </div>
                <div className="p-4 bg-dark-700 rounded-lg">
                  <p className="text-sm text-gray-400">Interest Accrued</p>
                  <p className="text-xl font-bold mt-1">
                    {formatCurrency(Number(loan.interestAccrued))}
                  </p>
                </div>
              </div>

              <LoanHealthIndicator
                ltv={loan.ltv || 0}
                liquidationThreshold={150}
                warningThreshold={130}
              />
            </div>
          </Card>
        ))
      ) : (
        <Card>
          <div className="text-center py-8">
            <h3 className="text-xl font-medium mb-2">No Active Loans</h3>
            <p className="text-gray-400 mb-4">
              Get started by requesting your first loan
            </p>
            <Link to="/request">
              <Button>Request Loan</Button>
            </Link>
          </div>
        </Card>
      )}

      <Modal
        isOpen={isRepayModalOpen}
        onClose={() => setIsRepayModalOpen(false)}
        title="Repay Loan"
      >
        {selectedLoan && (
          <RepayLoanForm
            loanId={selectedLoan.id}
            principal={Number(ethers.formatEther(selectedLoan.principal))}
            interestAccrued={Number(
              ethers.formatEther(selectedLoan.interestAccrued)
            )}
            onSuccess={handleRepaySuccess}
          />
        )}
      </Modal>

      <Modal
        isOpen={isTopUpModalOpen}
        onClose={() => setIsTopUpModalOpen(false)}
        title="Add Collateral"
      >
        {selectedLoan && (
          <TopUpCollateralForm
            loanId={selectedLoan.id}
            currentCollateral={Number(
              ethers.formatEther(selectedLoan.collateral)
            )}
            currentLTV={selectedLoan.ltv || 0}
            onSuccess={handleTopUpSuccess}
          />
        )}
      </Modal>
    </div>
  );
};

export default ManageLoans;
