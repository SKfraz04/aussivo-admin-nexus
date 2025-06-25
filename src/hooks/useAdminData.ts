import { useState, useMemo } from 'react';
import { User, Transaction, FilterState } from '@/types/admin';

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
    kycStatus: 'Verified'
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
    kycStatus: 'Pending'
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
    kycStatus: 'Verified'
  },
  {
    userId: 'USR_004',
    email: 'alice.brown@example.com',
    totalBalance: '$3,200.00',
    totalASVO: '2,800 ASVO',
    stakedASVO: '2,000 ASVO',
    status: 'Active',
    registrationDate: '2024-03-10',
    lastLogin: '2025-05-22T18:28:00Z',
    kycStatus: 'Pending'
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

export const useAdminData = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
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

      return matchesSearch && matchesStatus;
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

  const updateUserStatus = (userId: string, newStatus: User['status']) => {
    setUsers(prev => prev.map(user => 
      user.userId === userId ? { ...user, status: newStatus } : user
    ));
  };

  const updateTransactionStatus = (txId: string, newStatus: Transaction['status']) => {
    setTransactions(prev => prev.map(tx => 
      tx.txId === txId ? { ...tx, status: newStatus } : tx
    ));
  };

  return {
    users: filteredUsers,
    transactions: filteredTransactions,
    userFilters,
    transactionFilters,
    setUserFilters,
    setTransactionFilters,
    updateUserStatus,
    updateTransactionStatus,
    allUsers: users,
    allTransactions: transactions
  };
};
