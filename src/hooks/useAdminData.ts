import { useState, useMemo } from 'react';
import { User, Transaction, FilterState, WalletAdjustment } from '@/types/admin';

const mockUsers: User[] = [
  {
    userId: 'USR_001',
    email: 'john.doe@example.com',
    totalBalance: '$15,420.50',
    totalASVO: '12,500 ASVO',
    stakedASVO: '10,000 ASVO',
    status: 'Active',
    registrationDate: '2024-01-15',
    lastLogin: '2024-06-24T10:28:00Z',
    kycStatus: 'Verified',
    walletAddress: '0xc4584cb684e85020392e920bb7d82b77286c21ec',
    lockPeriod: '6 Months',
    asvoBalance: '12,500',
    asvoRewardBalance: '0',
    asvoReferralBalance: '0',
    usdtBep20Balance: '15,420.50',
    usdtTrc20Balance: '0',
    asvoStakedBalance: '10,000'
  },
  {
    userId: 'USR_002',
    email: 'jane.smith@example.com',
    totalBalance: '$8,750.25',
    totalASVO: '7,200 ASVO',
    stakedASVO: '5,000 ASVO',
    status: 'Active',
    registrationDate: '2024-02-20',
    lastLogin: '2024-06-23T15:45:00Z',
    kycStatus: 'Pending',
    walletAddress: '0x3351eac1afa5bac025db6b7504f6a80e102c47e',
    lockPeriod: '6 Months',
    asvoBalance: '7,200',
    asvoRewardBalance: '0',
    asvoReferralBalance: '0',
    usdtBep20Balance: '8,750.25',
    usdtTrc20Balance: '0',
    asvoStakedBalance: '5,000'
  },
  {
    userId: 'USR_003',
    email: 'mike.wilson@example.com',
    totalBalance: '$25,680.75',
    totalASVO: '20,150 ASVO',
    stakedASVO: '18,000 ASVO',
    status: 'Suspended',
    registrationDate: '2024-01-08',
    lastLogin: '2024-06-22T09:15:00Z',
    kycStatus: 'Verified',
    walletAddress: '0x92d131bff59d074944cde73c4026ce476007904',
    lockPeriod: '6 Months',
    asvoBalance: '20,150',
    asvoRewardBalance: '0',
    asvoReferralBalance: '0',
    usdtBep20Balance: '25,680.75',
    usdtTrc20Balance: '0',
    asvoStakedBalance: '18,000',
    suspendedUntil: '2024-07-01'
  },
  {
    userId: 'USR_004',
    email: 'alice.brown@example.com',
    totalBalance: '$3,200.00',
    totalASVO: '2,800 ASVO',
    stakedASVO: '2,000 ASVO',
    status: 'Terminated',
    registrationDate: '2024-03-10',
    lastLogin: '2025-05-22T18:28:00Z',
    kycStatus: 'Pending',
    walletAddress: '0x7aeac6396852650ab7a0b263fe8cf8ea968bba',
    lockPeriod: '6 Months',
    asvoBalance: '2,800',
    asvoRewardBalance: '0',
    asvoReferralBalance: '0',
    usdtBep20Balance: '3,200.00',
    usdtTrc20Balance: '0',
    asvoStakedBalance: '2,000'
  }
];

const mockTransactions: Transaction[] = [
  {
    txId: 'TXN_001',
    type: 'Deposit',
    userId: 'USR_001',
    amount: '1,000.00',
    tokenType: 'USDT',
    network: 'BEP20',
    status: 'Pending',
    timestamp: '2024-06-24 14:30:25',
    hash: '0x1234...abcd'
  },
  {
    txId: 'TXN_002',
    type: 'Withdrawal',
    userId: 'USR_002',
    amount: '500.50',
    tokenType: 'USDT',
    network: 'ERC20',
    status: 'Confirmed',
    timestamp: '2024-06-24 13:15:42',
    hash: '0x5678...efgh'
  },
  {
    txId: 'TXN_003',
    type: 'Deposit',
    userId: 'USR_003',
    amount: '2,500.00',
    tokenType: 'ASVO',
    network: 'SUI',
    status: 'Failed',
    timestamp: '2024-06-24 12:45:18',
    hash: '0x9abc...ijkl'
  },
  {
    txId: 'TXN_004',
    type: 'Withdrawal',
    userId: 'USR_004',
    amount: '750.25',
    tokenType: 'ETH',
    network: 'ERC20',
    status: 'Pending',
    timestamp: '2024-06-24 11:20:33',
    hash: '0xdef0...mnop'
  }
];

const mockStakingPackages = [
  { id: 1, name: 'Micro Node', totalStaked: 12500 },
  { id: 2, name: 'Compute Booster', totalStaked: 25000 },
  { id: 3, name: 'Data Streamer', totalStaked: 50000 },
  { id: 4, name: 'Edge Power Node', totalStaked: 100000 },
  { id: 5, name: 'Core Validator Tier', totalStaked: 250000 }
];

const mockReferrals = [
  { id: 1, userId: 'USR_001', referredUserId: 'USR_002', commission: 150 },
  { id: 2, userId: 'USR_002', referredUserId: 'USR_003', commission: 200 },
  { id: 3, userId: 'USR_001', referredUserId: 'USR_004', commission: 125 }
];

const mockWalletAdjustments: WalletAdjustment[] = [
  {
    id: 'ADJ_001',
    walletAddress: '0x92d131bff59d074944cde73c4026ce476007904',
    operation: 'Debit',
    currency: 'USDT',
    amount: 0.00,
    reason: 'testing',
    timestamp: 'Jun 18, 2025 12:58 PM',
    status: 'Success'
  },
  {
    id: 'ADJ_002',
    walletAddress: '0x92d131bff59d074944cde73c4026ce476007904',
    operation: 'Credit',
    currency: 'USDT',
    amount: 0.00,
    reason: 'testing',
    timestamp: 'Jun 18, 2025 12:56 PM',
    status: 'Success'
  }
];

export const useAdminData = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [walletAdjustments, setWalletAdjustments] = useState<WalletAdjustment[]>(mockWalletAdjustments);
  const [stakingPackages] = useState(mockStakingPackages);
  const [referrals] = useState(mockReferrals);
  const [userFilters, setUserFilters] = useState<FilterState>({
    searchTerm: '',
    statusFilter: 'all',
    typeFilter: 'all',
    verificationFilter: 'all',
    tokenFilter: 'all'
  });
  const [transactionFilters, setTransactionFilters] = useState<FilterState>({
    searchTerm: '',
    statusFilter: 'all',
    typeFilter: 'all',
    verificationFilter: 'all',
    tokenFilter: 'all'
  });

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = userFilters.searchTerm === '' || 
        user.userId.toLowerCase().includes(userFilters.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(userFilters.searchTerm.toLowerCase());
      
      const matchesStatus = userFilters.statusFilter === 'all' || 
        user.status.toLowerCase() === userFilters.statusFilter.toLowerCase();

      const matchesVerification = userFilters.verificationFilter === 'all' || 
        user.kycStatus.toLowerCase() === userFilters.verificationFilter.toLowerCase();

      return matchesSearch && matchesStatus && matchesVerification;
    });
  }, [users, userFilters]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter(tx => {
      const matchesSearch = transactionFilters.searchTerm === '' || 
        tx.txId.toLowerCase().includes(transactionFilters.searchTerm.toLowerCase()) ||
        tx.userId.toLowerCase().includes(transactionFilters.searchTerm.toLowerCase()) ||
        tx.hash.toLowerCase().includes(transactionFilters.searchTerm.toLowerCase());
      
      const matchesType = transactionFilters.typeFilter === 'all' || 
        tx.type.toLowerCase() === transactionFilters.typeFilter.toLowerCase();
      
      const matchesStatus = transactionFilters.statusFilter === 'all' || 
        tx.status.toLowerCase() === transactionFilters.statusFilter.toLowerCase();
      
      const matchesToken = transactionFilters.tokenFilter === 'all' || 
        tx.tokenType.toLowerCase() === transactionFilters.tokenFilter.toLowerCase();

      return matchesSearch && matchesType && matchesStatus && matchesToken;
    });
  }, [transactions, transactionFilters]);

  const updateUserStatus = (userId: string, newStatus: User['status'], suspendedUntil?: string) => {
    setUsers(prev => prev.map(user => 
      user.userId === userId ? { 
        ...user, 
        status: newStatus,
        suspendedUntil: suspendedUntil 
      } : user
    ));
  };

  const updateUserEmail = (userId: string, newEmail: string) => {
    setUsers(prev => prev.map(user => 
      user.userId === userId ? { ...user, email: newEmail } : user
    ));
  };

  const addWalletAdjustment = (adjustment: Omit<WalletAdjustment, 'id' | 'timestamp'>) => {
    const newAdjustment: WalletAdjustment = {
      ...adjustment,
      id: `ADJ_${Date.now()}`,
      timestamp: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
    };
    setWalletAdjustments(prev => [newAdjustment, ...prev]);
    
    // Update user balance
    setUsers(prev => prev.map(user => {
      if (user.walletAddress === adjustment.walletAddress) {
        const updatedUser = { ...user };
        if (adjustment.currency === 'USDT') {
          const currentBalance = parseFloat(user.usdtBep20Balance?.replace(',', '') || '0');
          const newBalance = adjustment.operation === 'Credit' 
            ? currentBalance + adjustment.amount 
            : currentBalance - adjustment.amount;
          updatedUser.usdtBep20Balance = newBalance.toLocaleString('en-US', { minimumFractionDigits: 2 });
          updatedUser.totalBalance = `$${newBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
        } else if (adjustment.currency === 'ASVO') {
          const currentBalance = parseFloat(user.asvoBalance?.replace(',', '') || '0');
          const newBalance = adjustment.operation === 'Credit' 
            ? currentBalance + adjustment.amount 
            : currentBalance - adjustment.amount;
          updatedUser.asvoBalance = newBalance.toLocaleString('en-US');
          updatedUser.totalASVO = `${newBalance.toLocaleString('en-US')} ASVO`;
        }
        return updatedUser;
      }
      return user;
    }));
  };

  const updateTransactionStatus = (txId: string, newStatus: Transaction['status']) => {
    setTransactions(prev => prev.map(tx => 
      tx.txId === txId ? { ...tx, status: newStatus } : tx
    ));
  };

  return {
    users: filteredUsers,
    transactions: filteredTransactions,
    walletAdjustments,
    stakingPackages,
    referrals,
    userFilters,
    transactionFilters,
    setUserFilters,
    setTransactionFilters,
    updateUserStatus,
    updateUserEmail,
    addWalletAdjustment,
    updateTransactionStatus,
    allUsers: users,
    allTransactions: transactions
  };
};
