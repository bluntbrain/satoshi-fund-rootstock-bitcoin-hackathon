export type StarterProps = {
  name: string;
  description: string;
  link: string;
};

export interface Loan {
  id: string;
  collateralAmount: number;
  principalAmount: number;
  interestRate: number;
  startDate: Date;
  dueDate: Date;
  status: 'active' | 'paid' | 'liquidated';
  ltv: number;
  interestAccrued: number;
}

export interface Notification {
  id: string;
  type: 'warning' | 'info' | 'success' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

export interface AccountSummary {
  rbtcBalance: number;
  collateralizedAmount: number;
  outstandingLoanAmount: number;
  ltvRatio: number;
}