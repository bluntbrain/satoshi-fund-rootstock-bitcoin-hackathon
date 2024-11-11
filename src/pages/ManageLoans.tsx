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

interface Loan {
  startDate: number;
  principal: number;
  collateral: number;
  interestAccrued: number;
  ltv: number;
  id: string;
  status: string;
}

const ManageLoans: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [isRepayModalOpen, setIsRepayModalOpen] = useState(false);
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    setLoading(true);
    setLoans([]);
    try {
      // const loanDetails = await getLoanDetails();
      // if (loanDetails) {
      //   setLoans([loanDetails]);
      // }
    } catch (error) {
      console.error("Error fetching loans:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRepaySuccess = () => {
    setIsRepayModalOpen(false);
    fetchLoans();
  };

  const handleTopUpSuccess = () => {
    setIsTopUpModalOpen(false);
    fetchLoans();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Manage Loans</h1>
        <Link to="/request">
          <Button>
            <Plus className="w-5 h-5 mr-2" />
            New Loan
          </Button>
        </Link>
      </div>

      {loading ? (
        <Card>
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-blue"></div>
          </div>
        </Card>
      ) : loans.length > 0 ? (
        loans.map((loan) => (
          <Card key={loan.id}>
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold">Loan #{loan.id}</h2>
                  <p className="text-gray-400">
                    Started{" "}
                    {new Date(loan.startDate * 1000).toLocaleDateString()}
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
                    {formatCurrency(Number(loan.principal))}
                  </p>
                </div>
                <div className="p-4 bg-dark-700 rounded-lg">
                  <p className="text-sm text-gray-400">Collateral</p>
                  <p className="text-xl font-bold mt-1">
                    {loan.collateral} BTC
                  </p>
                </div>
                <div className="p-4 bg-dark-700 rounded-lg">
                  <p className="text-sm text-gray-400">Interest Accrued</p>
                  <p className="text-xl font-bold mt-1">
                    {formatCurrency(loan.interestAccrued)}
                  </p>
                </div>
              </div>

              <LoanHealthIndicator
                ltv={loan.ltv}
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
            principal={selectedLoan.principal}
            interestAccrued={selectedLoan.interestAccrued}
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
            currentCollateral={selectedLoan.collateral}
            currentLTV={selectedLoan.ltv}
            onSuccess={handleTopUpSuccess}
          />
        )}
      </Modal>
    </div>
  );
};

export default ManageLoans;
