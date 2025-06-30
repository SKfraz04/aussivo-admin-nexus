
export interface User {
  userId: string;
  email: string;
  totalBalance: string;
  totalASVO: string;
  stakedASVO: string;
  status: 'Active' | 'Suspended' | 'Terminated' | 'Inactive';
  registrationDate: string;
  lastLogin: string;
  kycStatus: 'Verified' | 'Pending' | 'Rejected';
  walletAddress?: string;
  lockPeriod?: string;
  asvoBalance?: string;
  asvoRewardBalance?: string;
  asvoReferralBalance?: string;
  usdtBep20Balance?: string;
  usdtTrc20Balance?: string;
  asvoStakedBalance?: string;
  suspendedUntil?: string;
}

export interface Transaction {
  txId: string;
  type: 'Deposit' | 'Withdrawal';
  userId: string;
  amount: string;
  tokenType: string;
  network: string;
  status: 'Pending' | 'Confirmed' | 'Failed' | 'Rejected';
  timestamp: string;
  hash: string;
}

export interface WalletAdjustment {
  id: string;
  walletAddress: string;
  operation: 'Credit' | 'Debit';
  currency: 'USDT' | 'ASVO';
  amount: number;
  reason: string;
  timestamp: string;
  status: 'Success' | 'Failed';
  adminId?: string;
}

export interface FilterState {
  searchTerm: string;
  statusFilter: string;
  typeFilter: string;
  verificationFilter: string;
  tokenFilter: string;
}
