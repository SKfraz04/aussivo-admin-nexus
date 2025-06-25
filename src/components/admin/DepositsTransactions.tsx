
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Download,
  TrendingUp,
  TrendingDown,
  Activity,
  DollarSign
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
import { useAdminData } from '@/hooks/useAdminData';

export function DepositsTransactions() {
  const { transactions, transactionFilters, setTransactionFilters, updateTransactionStatus } = useAdminData();

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'Confirmed': 'bg-emerald-600/20 text-emerald-400 border-emerald-600/50',
      'Pending': 'bg-yellow-600/20 text-yellow-400 border-yellow-600/50',
      'Failed': 'bg-red-600/20 text-red-400 border-red-600/50'
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.Pending;
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getTypeIcon = (type: string) => {
    return type === 'Deposit' ? 
      <TrendingDown className="h-4 w-4 text-emerald-400" /> : 
      <TrendingUp className="h-4 w-4 text-red-400" />;
  };

  // Calculate stats
  const totalDeposits = transactions.filter(tx => tx.type === 'Deposit').length;
  const totalWithdrawals = transactions.filter(tx => tx.type === 'Withdrawal').length;
  const pendingTransactions = transactions.filter(tx => tx.status === 'Pending').length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Deposits & Transactions</h1>
          <p className="text-slate-400">Monitor all platform transactions</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-emerald-600/50 text-emerald-400 hover:bg-emerald-600/20">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glassmorphism border-emerald-800/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-white">{transactions.length}</p>
                <p className="text-slate-300 text-sm">Total Transactions</p>
              </div>
              <Activity className="h-5 w-5 text-emerald-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glassmorphism border-emerald-800/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-white">{totalDeposits}</p>
                <p className="text-slate-300 text-sm">Deposits</p>
              </div>
              <TrendingDown className="h-5 w-5 text-emerald-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glassmorphism border-emerald-800/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-white">{totalWithdrawals}</p>
                <p className="text-slate-300 text-sm">Withdrawals</p>
              </div>
              <TrendingUp className="h-5 w-5 text-red-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glassmorphism border-emerald-800/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-white">{pendingTransactions}</p>
                <p className="text-slate-300 text-sm">Pending</p>
              </div>
              <DollarSign className="h-5 w-5 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="glassmorphism border-emerald-800/30">
        <CardHeader>
          <CardTitle className="text-white">Transaction Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search transactions..."
                  value={transactionFilters.searchTerm}
                  onChange={(e) => setTransactionFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                  className="pl-9 bg-slate-800/50 border-emerald-800/30 text-white focus:border-emerald-600"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Select value={transactionFilters.typeFilter} onValueChange={(value) => setTransactionFilters(prev => ({ ...prev, typeFilter: value }))}>
                <SelectTrigger className="w-32 bg-slate-800/50 border-emerald-800/30 text-white">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-emerald-800/30">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="deposit">Deposit</SelectItem>
                  <SelectItem value="withdrawal">Withdrawal</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={transactionFilters.statusFilter} onValueChange={(value) => setTransactionFilters(prev => ({ ...prev, statusFilter: value }))}>
                <SelectTrigger className="w-32 bg-slate-800/50 border-emerald-800/30 text-white">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-emerald-800/30">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={transactionFilters.tokenFilter} onValueChange={(value) => setTransactionFilters(prev => ({ ...prev, tokenFilter: value }))}>
                <SelectTrigger className="w-32 bg-slate-800/50 border-emerald-800/30 text-white">
                  <SelectValue placeholder="Token" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-emerald-800/30">
                  <SelectItem value="all">All Tokens</SelectItem>
                  <SelectItem value="usdt">USDT</SelectItem>
                  <SelectItem value="asvo">ASVO</SelectItem>
                  <SelectItem value="eth">ETH</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="sm" className="border-emerald-600/50 text-emerald-400 hover:bg-emerald-600/20">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card className="glassmorphism border-emerald-800/30">
        <CardContent className="p-0">
          <div className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-emerald-800/30 bg-slate-800/30">
                  <TableHead className="text-slate-300 font-semibold">Transaction ID</TableHead>
                  <TableHead className="text-slate-300 font-semibold">Type</TableHead>
                  <TableHead className="text-slate-300 font-semibold">User</TableHead>
                  <TableHead className="text-slate-300 font-semibold">Amount</TableHead>
                  <TableHead className="text-slate-300 font-semibold">Network</TableHead>
                  <TableHead className="text-slate-300 font-semibold">Status</TableHead>
                  <TableHead className="text-slate-300 font-semibold">Date & Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.txId} className="border-emerald-800/20 hover:bg-slate-800/30 transition-colors">
                    <TableCell>
                      <div>
                        <p className="text-white font-medium">{transaction.txId}</p>
                        <p className="text-slate-400 text-xs font-mono">{transaction.hash}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(transaction.type)}
                        <span className="text-white">{transaction.type}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-300">{transaction.userId}</TableCell>
                    <TableCell>
                      <div>
                        <p className="text-white font-medium">{transaction.amount}</p>
                        <p className="text-emerald-400 text-sm">{transaction.tokenType}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-slate-600/50 text-slate-300">
                        {transaction.network}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-300 text-sm">
                      {formatDateTime(transaction.timestamp)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
