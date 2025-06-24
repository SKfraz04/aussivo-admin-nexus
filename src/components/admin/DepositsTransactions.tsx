
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
  Clock
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

export function DepositsTransactions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tokenFilter, setTokenFilter] = useState('all');

  const transactionData = [
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

  const pendingDeposits = transactionData.filter(tx => tx.type === 'Deposit' && tx.status === 'Pending');
  const pendingWithdrawals = transactionData.filter(tx => tx.type === 'Withdrawal' && tx.status === 'Pending');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="glassmorphism p-6 rounded-xl border border-emerald-800/30">
        <h1 className="text-3xl font-bold text-white mb-2">Deposits & Transactions</h1>
        <p className="text-slate-300">Monitor and manage all platform deposit and withdrawal activities.</p>
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
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by Transaction ID, User ID, Wallet"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                <SelectValue placeholder="Transaction Type" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="deposit">Deposit</SelectItem>
                <SelectItem value="withdrawal">Withdrawal</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
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
            <Select value={tokenFilter} onValueChange={setTokenFilter}>
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
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Apply Filters
            </Button>
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
              {pendingDeposits.map((deposit, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">{deposit.amount} {deposit.tokenType}</p>
                    <p className="text-slate-400 text-sm">{deposit.userId} • {deposit.network}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
                      <XCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700">
                Bulk Confirm Selected
              </Button>
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
              {pendingWithdrawals.map((withdrawal, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">{withdrawal.amount} {withdrawal.tokenType}</p>
                    <p className="text-slate-400 text-sm">{withdrawal.userId} • {withdrawal.network}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
                      <XCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700">
                Bulk Approve Selected
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* All Transactions Table */}
      <Card className="glassmorphism border-emerald-800/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            All Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-emerald-800/30">
                  <TableHead className="text-slate-300">
                    <div className="flex items-center gap-2">
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
                {transactionData.map((tx, index) => (
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
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="border-emerald-600 text-emerald-400 hover:bg-emerald-600 hover:text-white">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {tx.status === 'Pending' && (
                          <>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
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
