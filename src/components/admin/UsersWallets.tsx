
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  UserCheck, 
  UserX, 
  Shield,
  Download,
  Plus,
  Eye
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
import { useToast } from '@/hooks/use-toast';

export function UsersWallets() {
  const { users, userFilters, setUserFilters, updateUserStatus } = useAdminData();
  const { toast } = useToast();

  const handleStatusUpdate = (userId: string, newStatus: 'Active' | 'Suspended' | 'Inactive') => {
    updateUserStatus(userId, newStatus);
    toast({
      title: "Status Updated",
      description: `User status has been changed to ${newStatus}.`,
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'Active': 'bg-emerald-600/20 text-emerald-400 border-emerald-600/50',
      'Suspended': 'bg-red-600/20 text-red-400 border-red-600/50',
      'Inactive': 'bg-slate-600/20 text-slate-400 border-slate-600/50'
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.Inactive;
  };

  const getKycBadge = (status: string) => {
    const kycConfig = {
      'Verified': 'bg-emerald-600/20 text-emerald-400 border-emerald-600/50',
      'Pending': 'bg-yellow-600/20 text-yellow-400 border-yellow-600/50',
      'Rejected': 'bg-red-600/20 text-red-400 border-red-600/50'
    };
    return kycConfig[status as keyof typeof kycConfig] || kycConfig.Pending;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Users & Wallets</h1>
          <p className="text-slate-400">Manage user accounts, wallets, and verification status</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-emerald-600/50 text-emerald-400 hover:bg-emerald-600/20">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glassmorphism border-emerald-800/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-white">{users.length}</p>
                <p className="text-slate-300 text-sm">Total Users</p>
              </div>
              <UserCheck className="h-5 w-5 text-emerald-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glassmorphism border-emerald-800/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-white">{users.filter(u => u.status === 'Active').length}</p>
                <p className="text-slate-300 text-sm">Active Users</p>
              </div>
              <UserCheck className="h-5 w-5 text-emerald-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glassmorphism border-emerald-800/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-white">{users.filter(u => u.kycStatus === 'Verified').length}</p>
                <p className="text-slate-300 text-sm">KYC Verified</p>
              </div>
              <Shield className="h-5 w-5 text-emerald-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glassmorphism border-emerald-800/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-white">{users.filter(u => u.status === 'Suspended').length}</p>
                <p className="text-slate-300 text-sm">Suspended</p>
              </div>
              <UserX className="h-5 w-5 text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="glassmorphism border-emerald-800/30">
        <CardHeader>
          <CardTitle className="text-white">User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search users..."
                  value={userFilters.searchTerm}
                  onChange={(e) => setUserFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                  className="pl-9 bg-slate-800/50 border-emerald-800/30 text-white focus:border-emerald-600"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Select value={userFilters.statusFilter} onValueChange={(value) => setUserFilters(prev => ({ ...prev, statusFilter: value }))}>
                <SelectTrigger className="w-32 bg-slate-800/50 border-emerald-800/30 text-white">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-emerald-800/30">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={userFilters.verificationFilter} onValueChange={(value) => setUserFilters(prev => ({ ...prev, verificationFilter: value }))}>
                <SelectTrigger className="w-32 bg-slate-800/50 border-emerald-800/30 text-white">
                  <SelectValue placeholder="KYC" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-emerald-800/30">
                  <SelectItem value="all">All KYC</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
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

      {/* Users Table */}
      <Card className="glassmorphism border-emerald-800/30">
        <CardContent className="p-0">
          <div className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-emerald-800/30 bg-slate-800/30">
                  <TableHead className="text-slate-300 font-semibold">User</TableHead>
                  <TableHead className="text-slate-300 font-semibold">Balances</TableHead>
                  <TableHead className="text-slate-300 font-semibold">Status</TableHead>
                  <TableHead className="text-slate-300 font-semibold">KYC</TableHead>
                  <TableHead className="text-slate-300 font-semibold">Last Login</TableHead>
                  <TableHead className="text-slate-300 font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.userId} className="border-emerald-800/20 hover:bg-slate-800/30 transition-colors">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-emerald-600/20 text-emerald-400 text-xs">
                            {user.email.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-white font-medium">{user.userId}</p>
                          <p className="text-slate-400 text-sm">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-white font-medium">{user.totalBalance}</p>
                        <p className="text-emerald-400 text-sm">{user.totalASVO}</p>
                        <p className="text-slate-400 text-xs">Staked: {user.stakedASVO}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(user.status)}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getKycBadge(user.kycStatus)}>
                        {user.kycStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-300 font-mono text-sm">
                      {user.lastLogin}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-slate-400 hover:text-white"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Select onValueChange={(value) => handleStatusUpdate(user.userId, value as any)}>
                          <SelectTrigger className="h-8 w-8 p-0 border-0 bg-transparent hover:bg-slate-700">
                            <MoreHorizontal className="h-4 w-4 text-slate-400" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-emerald-800/30">
                            <SelectItem value="Active">Set Active</SelectItem>
                            <SelectItem value="Suspended">Suspend User</SelectItem>
                            <SelectItem value="Inactive">Set Inactive</SelectItem>
                          </SelectContent>
                        </Select>
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
