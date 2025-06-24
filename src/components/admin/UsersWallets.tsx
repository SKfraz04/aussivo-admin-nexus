import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  RefreshCw, 
  Lock,
  User,
  Wallet,
  ArrowUpDown,
  MoreHorizontal
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

export function UsersWallets() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [verificationFilter, setVerificationFilter] = useState('all');

  const userData = [
    {
      userId: 'USR_001',
      email: 'john.doe@example.com',
      totalBalance: '$15,420.50',
      totalASVO: '12,500 ASVO',
      stakedASVO: '10,000 ASVO',
      status: 'Active',
      registrationDate: '2024-01-15',
      lastLogin: '2024-06-24 10:30',
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
      lastLogin: '2024-06-23 15:45',
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
      lastLogin: '2024-06-22 09:15',
      kycStatus: 'Verified'
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      'Active': 'bg-green-900/20 text-green-400 border-green-600/30',
      'Suspended': 'bg-red-900/20 text-red-400 border-red-600/30',
      'Inactive': 'bg-yellow-900/20 text-yellow-400 border-yellow-600/30'
    };
    return variants[status as keyof typeof variants] || variants.Inactive;
  };

  const getKYCBadge = (status: string) => {
    const variants = {
      'Verified': 'bg-green-900/20 text-green-400 border-green-600/30',
      'Pending': 'bg-yellow-900/20 text-yellow-400 border-yellow-600/30',
      'Rejected': 'bg-red-900/20 text-red-400 border-red-600/30'
    };
    return variants[status as keyof typeof variants] || variants.Pending;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="glassmorphism p-6 rounded-xl border border-emerald-800/30">
        <h1 className="text-3xl font-bold text-white mb-2">User & Wallet Management</h1>
        <p className="text-slate-300">Manage user accounts, view wallet balances, and track user-specific activities.</p>
      </div>

      {/* Search & Filters */}
      <Card className="glassmorphism border-emerald-800/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Search & Filter Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by User ID, Email, Wallet Address"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Select value={verificationFilter} onValueChange={setVerificationFilter}>
              <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                <SelectValue placeholder="KYC Status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="all">All KYC Status</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Apply Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* User Table */}
      <Card className="glassmorphism border-emerald-800/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <User className="w-5 h-5" />
            User Directory
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-emerald-800/30">
                  <TableHead className="text-slate-300">
                    <div className="flex items-center gap-2">
                      User ID <ArrowUpDown className="w-4 h-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-slate-300">Email</TableHead>
                  <TableHead className="text-slate-300">Total Balance</TableHead>
                  <TableHead className="text-slate-300">Total ASVO</TableHead>
                  <TableHead className="text-slate-300">Staked ASVO</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                  <TableHead className="text-slate-300">KYC Status</TableHead>
                  <TableHead className="text-slate-300">Registration</TableHead>
                  <TableHead className="text-slate-300">Last Login</TableHead>
                  <TableHead className="text-slate-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userData.map((user, index) => (
                  <TableRow key={index} className="border-emerald-800/20 hover:bg-slate-800/50">
                    <TableCell className="text-emerald-400 font-mono">{user.userId}</TableCell>
                    <TableCell className="text-white">{user.email}</TableCell>
                    <TableCell className="text-white font-medium">{user.totalBalance}</TableCell>
                    <TableCell className="text-emerald-400">{user.totalASVO}</TableCell>
                    <TableCell className="text-emerald-300">{user.stakedASVO}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(user.status)}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getKYCBadge(user.kycStatus)}>
                        {user.kycStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-300">{user.registrationDate}</TableCell>
                    <TableCell className="text-slate-300">{user.lastLogin}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-white">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-slate-800 border-slate-600">
                          <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-700">
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-700">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-700">
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Reset Password
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-400 hover:text-red-300 hover:bg-slate-700">
                            <Lock className="mr-2 h-4 w-4" />
                            Suspend User
                          </DropdownMenuItem>
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

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glassmorphism border-emerald-800/30">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-600/20 rounded-lg">
                <User className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">15,432</p>
                <p className="text-slate-300 text-sm">Total Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glassmorphism border-emerald-800/30">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-600/20 rounded-lg">
                <Badge className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">12,847</p>
                <p className="text-slate-300 text-sm">Active Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glassmorphism border-emerald-800/30">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-600/20 rounded-lg">
                <Wallet className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">1,285</p>
                <p className="text-slate-300 text-sm">KYC Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glassmorphism border-emerald-800/30">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-600/20 rounded-lg">
                <Lock className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">89</p>
                <p className="text-slate-300 text-sm">Suspended</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
