
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  Eye,
  CreditCard,
  ArrowUpDown,
  Clock,
  MoreHorizontal,
  Download,
  RefreshCw
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAdminData } from '@/hooks/useAdminData';
import { useToast } from '@/hooks/use-toast';

export function DepositsTransactions() {
  const { transactions, transactionFilters, setTransactionFilters, updateTransactionStatus, allTransactions } = useAdminData();
  const { toast } = useToast();
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [actionDialog, setActionDialog] = useState<{ open: boolean; type: string; transaction: any }>({
    open: false,
    type: '',
    transaction: null
  });
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([]);

  const handleSearch = (value: string) => {
    setTransactionFilters(prev => ({ ...prev, searchTerm: value }));
  };

  const handleTypeFilter = (value: string) => {
    setTransactionFilters(prev => ({ ...prev, typeFilter: value }));
  };

  const handleStatusFilter = (value: string) => {
    setTransactionFilters(prev => ({ ...prev, statusFilter: value }));
  };

  const handleTokenFilter = (value: string) => {
    setTransactionFilters(prev => ({ ...prev, tokenFilter: value }));
  };

  const applyFilters = () => {
    toast({
      title: "Filters Applied",
      description: `Found ${transactions.length} transactions matching your criteria.`,
    });
  };

  const clearFilters = () => {
    setTransactionFilters({
      searchTerm: '',
      statusFilter: 'all',
      typeFilter: 'all',
      verificationFilter: 'all',
      tokenFilter: 'all'
    });
    toast({
      title: "Filters Cleared",
      description: "All filters have been reset.",
    });
  };

  const handleTransactionAction = (action: string, transaction: any) => {
    if (action === 'view') {
      setSelectedTransaction(transaction);
    } else {
      setActionDialog({ open: true, type: action, transaction });
    }
  };

  const confirmAction = () => {
    const { type, transaction } = actionDialog;
    
    switch (type) {
      case 'confirm':
      case 'approve':
        updateTransactionStatus(transaction.txId, 'Confirmed');
        toast({
          title: `${transaction.type} ${type === 'confirm' ? 'Confirmed' : 'Approved'}`,
          description: `Transaction ${transaction.txId} has been processed successfully.`,
        });
        break;
      case 'reject':
        updateTransactionStatus(transaction.txId, 'Rejected');
        toast({
          title: `${transaction.type} Rejected`,
          description: `Transaction ${transaction.txId} has been rejected.`,
          variant: "destructive"
        });
        break;
    }
    
    setActionDialog({ open: false, type: '', transaction: null });
  };

  const bulkAction = (action: 'confirm' | 'reject', type: 'Deposit' | 'Withdrawal') => {
    const pendingTransactions = transactions.filter(tx => 
      tx.type === type && tx.status === 'Pending'
    );
    
    const newStatus = action === 'confirm' ? 'Confirmed' : 'Rejected';
    
    pendingTransactions.forEach(tx => {
      updateTransactionStatus(tx.txId, newStatus);
    });
    
    toast({
      title: `Bulk ${action === 'confirm' ? 'Confirmation' : 'Rejection'}`,
      description: `${pendingTransactions.length} ${type.toLowerCase()}s have been ${action === 'confirm' ? 'confirmed' : 'rejected'}.`,
      variant: action === 'reject' ? "destructive" : "default"
    });
  };

  const exportData = () => {
    const csvContent = [
      ['Transaction ID', 'Type', 'User ID', 'Amount', 'Token', 'Network', 'Status', 'Timestamp'],
      ...transactions.map(tx => [
        tx.txId,
        tx.type,
        tx.userId,
        tx.amount,
        tx.tokenType,
        tx.network,
        tx.status,
        tx.timestamp
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions_export.csv';
    a.click();
    
    toast({
      title: "Export Complete",
      description: "Transaction data has been exported successfully.",
    });
  };

  const refreshData = () => {
    toast({
      title: "Data Refreshed",
      description: "Transaction data has been refreshed successfully.",
    });
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'Pending': 'bg-yellow-900/20 text-yellow-400 border-yellow-600/30',
      'Confirmed': 'bg-green-900/20 text-green-400 border-green-600/30',
      'Failed': 'bg-red-900/20 text-red-400 border-red-600/30',
      'Rejected': 'bg-red-900/20 text-red-400 border-red-600/30'
    };
    return variants[status as keyof typeof variants] || variants.Pending;
  };

  const getTypeBadge = (type: string) => {
    const variants = {
      'Deposit': 'bg-blue-900/20 text-blue-400 border-blue-600/30',
      'Withdrawal': 'bg-purple-900/20 text-purple-400 border-purple-600/30'
    };
    return variants[type as keyof typeof variants] || variants.Deposit;
  };

  const pendingDeposits = allTransactions.filter(tx => tx.type === 'Deposit' && tx.status === 'Pending');
  const pendingWithdrawals = allTransactions.filter(tx => tx.type === 'Withdrawal' && tx.status === 'Pending');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="glassmorphism p-6 rounded-xl border border-emerald-800/30">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Deposits & Transactions</h1>
            <p className="text-slate-300">Monitor and manage all platform deposit and withdrawal activities.</p>
          </div>
          <Button onClick={refreshData} variant="outline" className="border-emerald-600/50 text-emerald-400 hover:bg-emerald-600/20">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Transaction Filters */}
      <Card className="glassmorphism border-emerald-800/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Transaction Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by ID, User, Hash"
                value={transactionFilters.searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
              />
            </div>
            <Select value={transactionFilters.typeFilter} onValueChange={handleTypeFilter}>
              <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                <SelectValue placeholder="Transaction Type" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="deposit">Deposit</SelectItem>
                <SelectItem value="withdrawal">Withdrawal</SelectItem>
              </SelectContent>
            </Select>
            <Select value={transactionFilters.statusFilter} onValueChange={handleStatusFilter}>
              <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={transactionFilters.tokenFilter} onValueChange={handleTokenFilter}>
              <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                <SelectValue placeholder="Token Type" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="all">All Tokens</SelectItem>
                <SelectItem value="usdt">USDT</SelectItem>
                <SelectItem value="asvo">ASVO</SelectItem>
                <SelectItem value="sui">SUI</SelectItem>
                <SelectItem value="eth">ETH</SelectItem>
                <SelectItem value="bnb">BNB</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={applyFilters} className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Apply Filters
            </Button>
            <div className="flex gap-2">
              <Button onClick={clearFilters} variant="outline" className="border-slate-600 text-slate-300 hover:text-white">
                Clear
              </Button>
              <Button onClick={exportData} variant="outline" className="border-emerald-600/50 text-emerald-400 hover:bg-emerald-600/20">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pending Deposits */}
        <Card className="glassmorphism border-emerald-800/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Pending Deposits ({pendingDeposits.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingDeposits.slice(0, 3).map((deposit, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">{deposit.amount} {deposit.tokenType}</p>
                    <p className="text-slate-400 text-sm">{deposit.userId} • {deposit.network}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => handleTransactionAction('confirm', deposit)}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => handleTransactionAction('reject', deposit)}
                      variant="outline" 
                      className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                    >
                      <XCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <div className="flex gap-2 mt-4">
                <Button 
                  onClick={() => bulkAction('confirm', 'Deposit')}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                  disabled={pendingDeposits.length === 0}
                >
                  Bulk Confirm All
                </Button>
                <Button 
                  onClick={() => bulkAction('reject', 'Deposit')}
                  variant="outline"
                  className="flex-1 border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                  disabled={pendingDeposits.length === 0}
                >
                  Bulk Reject All
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pending Withdrawals */}
        <Card className="glassmorphism border-emerald-800/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Pending Withdrawals ({pendingWithdrawals.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingWithdrawals.slice(0, 3).map((withdrawal, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">{withdrawal.amount} {withdrawal.tokenType}</p>
                    <p className="text-slate-400 text-sm">{withdrawal.userId} • {withdrawal.network}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => handleTransactionAction('approve', withdrawal)}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => handleTransactionAction('reject', withdrawal)}
                      variant="outline" 
                      className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                    >
                      <XCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <div className="flex gap-2 mt-4">
                <Button 
                  onClick={() => bulkAction('confirm', 'Withdrawal')}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                  disabled={pendingWithdrawals.length === 0}
                >
                  Bulk Approve All
                </Button>
                <Button 
                  onClick={() => bulkAction('reject', 'Withdrawal')}
                  variant="outline"
                  className="flex-1 border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                  disabled={pendingWithdrawals.length === 0}
                >
                  Bulk Reject All
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* All Transactions Table */}
      <Card className="glassmorphism border-emerald-800/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              All Transactions ({transactions.length})
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-emerald-800/30">
                  <TableHead className="text-slate-300">
                    <div className="flex items-center gap-2 cursor-pointer hover:text-white">
                      Transaction ID <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-slate-300">Type</TableHead>
                  <TableHead className="text-slate-300">User ID</TableHead>
                  <TableHead className="text-slate-300">Amount</TableHead>
                  <TableHead className="text-slate-300">Token</TableHead>
                  <TableHead className="text-slate-300">Network</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                  <TableHead className="text-slate-300">Timestamp</TableHead>
                  <TableHead className="text-slate-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((tx, index) => (
                  <TableRow key={index} className="border-emerald-800/20 hover:bg-slate-800/50">
                    <TableCell className="text-emerald-400 font-mono">{tx.txId}</TableCell>
                    <TableCell>
                      <Badge className={getTypeBadge(tx.type)}>
                        {tx.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-white">{tx.userId}</TableCell>
                    <TableCell className="text-white font-medium">{tx.amount}</TableCell>
                    <TableCell className="text-emerald-400">{tx.tokenType}</TableCell>
                    <TableCell className="text-slate-300">{tx.network}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(tx.status)}>
                        {tx.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-300">{tx.timestamp}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-white">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-slate-800 border-slate-600">
                          <DropdownMenuItem 
                            onClick={() => handleTransactionAction('view', tx)}
                            className="text-slate-300 hover:text-white hover:bg-slate-700"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          {tx.status === 'Pending' && (
                            <>
                              <DropdownMenuItem 
                                onClick={() => handleTransactionAction(tx.type === 'Deposit' ? 'confirm' : 'approve', tx)}
                                className="text-green-400 hover:text-green-300 hover:bg-slate-700"
                              >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                {tx.type === 'Deposit' ? 'Confirm' : 'Approve'}
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleTransactionAction('reject', tx)}
                                className="text-red-400 hover:text-red-300 hover:bg-slate-700"
                              >
                                <XCircle className="mr-2 h-4 w-4" />
                                Reject
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Details Dialog */}
      <Dialog open={!!selectedTransaction} onOpenChange={() => setSelectedTransaction(null)}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription className="text-slate-400">
              Complete information for transaction {selectedTransaction?.txId}
            </DialogDescription>
          </DialogHeader>
          {selectedTransaction && (
            <div className="grid grid-cols-2 gap-4 py-4">
              <div>
                <label className="text-sm font-medium text-slate-300">Transaction ID</label>
                <p className="text-emerald-400 font-mono">{selectedTransaction.txId}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300">Type</label>
                <Badge className={getTypeBadge(selectedTransaction.type)}>
                  {selectedTransaction.type}
                </Badge>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300">User ID</label>
                <p className="text-white">{selectedTransaction.userId}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300">Status</label>
                <Badge className={getStatusBadge(selectedTransaction.status)}>
                  {selectedTransaction.status}
                </Badge>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300">Amount</label>
                <p className="text-white font-medium">{selectedTransaction.amount}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300">Token Type</label>
                <p className="text-emerald-400">{selectedTransaction.tokenType}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300">Network</label>
                <p className="text-slate-300">{selectedTransaction.network}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300">Timestamp</label>
                <p className="text-slate-300">{selectedTransaction.timestamp}</p>
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium text-slate-300">Transaction Hash</label>
                <p className="text-emerald-400 font-mono break-all">{selectedTransaction.hash}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Action Confirmation Dialog */}
      <Dialog open={actionDialog.open} onOpenChange={(open) => setActionDialog(prev => ({ ...prev, open }))}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogDescription className="text-slate-400">
              Are you sure you want to {actionDialog.type} this {actionDialog.transaction?.type?.toLowerCase()}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setActionDialog({ open: false, type: '', transaction: null })}
              className="border-slate-600 text-slate-300"
            >
              Cancel
            </Button>
            <Button 
              onClick={confirmAction} 
              className={actionDialog.type === 'reject' ? "bg-red-600 hover:bg-red-700" : "bg-emerald-600 hover:bg-emerald-700"}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
