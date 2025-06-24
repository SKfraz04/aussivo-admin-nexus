
export interface User {
  userId: string;
  email: string;
  totalBalance: string;
  totalASVO: string;
  stakedASVO: string;
  status: 'Active' | 'Suspended' | 'Inactive';
  registrationDate: string;
  lastLogin: string;
  kycStatus: 'Verified' | 'Pending' | 'Rejected';
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

export interface FilterState {
  searchTerm: string;
  statusFilter: string;
  typeFilter: string;
  verificationFilter: string;
  tokenFilter: string;
}
