
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
  Download,
  Plus,
  Eye,
  Edit,
  DollarSign,
  Ban,
  XCircle,
  CheckCircle
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
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAdminData } from '@/hooks/useAdminData';
import { useToast } from '@/hooks/use-toast';
import { User } from '@/types/admin';
import { UserDetailsDialog } from './dialogs/UserDetailsDialog';
import { EditUserDialog } from './dialogs/EditUserDialog';
import { AdjustWalletDialog } from './dialogs/AdjustWalletDialog';
import { SuspendUserDialog } from './dialogs/SuspendUserDialog';
import { WalletAdjustmentHistory } from './WalletAdjustmentHistory';

export function UsersWallets() {
  const { 
    users, 
    userFilters, 
    setUserFilters, 
    updateUserStatus, 
    updateUserEmail, 
    addWalletAdjustment,
    allUsers 
  } = useAdminData();
  const { toast } = useToast();
  
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [showAdjustWallet, setShowAdjustWallet] = useState(false);
  const [showSuspendUser, setShowSuspendUser] = useState(false);
  const [showWalletHistory, setShowWalletHistory] = useState(false);

  const handleStatusUpdate = (userId: string, newStatus: User['status'], suspendedUntil?: string) => {
    updateUserStatus(userId, newStatus, suspendedUntil);
    const statusText = newStatus === 'Active' ? 'activated' : 
                     newStatus === 'Suspended' ? 'suspended' : 'terminated';
    toast({
      title: `User ${statusText}`,
      description: `User status has been changed to ${newStatus}.`,
    });
  };

  const handleViewDetails = (user: User) => {
    setSelectedUser(user);
    setShowUserDetails(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setShowEditUser(true);
  };

  const handleAdjustWallet = (user: User) => {
    setSelectedUser(user);
    setShowAdjustWallet(true);
  };

  const handleSuspendUser = (user: User) => {
    setSelectedUser(user);
    setShowSuspendUser(true);
  };

  const handleEmailUpdate = (userId: string, newEmail: string) => {
    updateUserEmail(userId, newEmail);
    toast({
      title: "Email Updated",
      description: "User email has been successfully updated.",
    });
  };

  const handleWalletAdjustment = (walletAddress: string, operation: 'Credit' | 'Debit', currency: 'USDT' | 'ASVO', amount: number, reason: string) => {
    addWalletAdjustment({
      walletAddress,
      operation,
      currency,
      amount,
      reason,
      status: 'Success'
    });
    toast({
      title: "Wallet Adjusted",
      description: `Successfully ${operation.toLowerCase()}ed ${amount} ${currency} ${operation === 'Credit' ? 'to' : 'from'} wallet.`,
    });
  };

  const handleExport = () => {
    const csvContent = [
      ['User ID', 'Email', 'Wallet Address', 'Total Balance', 'Total ASVO', 'Staked ASVO', 'Status', 'Registration Date', 'Last Login', 'KYC Status'],
      ...users.map(user => [
        user.userId,
        user.email,
        user.walletAddress || '',
        user.totalBalance,
        user.totalASVO,
        user.stakedASVO,
        user.status,
        user.registrationDate,
        user.lastLogin,
        user.kycStatus
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Export Successful",
      description: "Users data has been exported to CSV.",
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'Active': 'bg-emerald-600/20 text-emerald-400 border-emerald-600/50',
      'Suspended': 'bg-orange-600/20 text-orange-400 border-orange-600/50',
      'Terminated': 'bg-red-600/20 text-red-400 border-red-600/50',
      'Inactive': 'bg-slate-600/20 text-slate-400 border-slate-600/50'
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.Inactive;
  };

  const formatLastLogin = (dateString: string) => {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const resetFilters = () => {
    setUserFilters({
      searchTerm: '',
      statusFilter: 'all',
      typeFilter: 'all',
      verificationFilter: 'all',
      tokenFilter: 'all'
    });
    toast({
      title: "Filters Reset",
      description: "All filters have been cleared.",
    });
  };

  const getStatusCounts = () => {
    return {
      total: allUsers.length,
      active: allUsers.filter(u => u.status === 'Active').length,
      suspended: allUsers.filter(u => u.status === 'Suspended').length,
      terminated: allUsers.filter(u => u.status === 'Terminated').length
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">User & Wallet Management</h1>
          <p className="text-slate-400">Manage platform users and their wallets</p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            className="border-emerald-600/50 text-emerald-400 hover:bg-emerald-600/20"
            onClick={() => setShowWalletHistory(true)}
          >
            <DollarSign className="h-4 w-4 mr-2" />
            Wallet History
          </Button>
          <Button 
            variant="outline" 
            className="border-emerald-600/50 text-emerald-400 hover:bg-emerald-600/20"
            onClick={handleExport}
          >
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
                <p className="text-2xl font-bold text-white">{statusCounts.total}</p>
                <p className="text-slate-300 text-sm">All Users</p>
              </div>
              <UserCheck className="h-5 w-5 text-emerald-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glassmorphism border-emerald-800/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-emerald-400">{statusCounts.active}</p>
                <p className="text-slate-300 text-sm">Active</p>
              </div>
              <CheckCircle className="h-5 w-5 text-emerald-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glassmorphism border-emerald-800/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-orange-400">{statusCounts.suspended}</p>
                <p className="text-slate-300 text-sm">Suspended</p>
              </div>
              <Ban className="h-5 w-5 text-orange-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glassmorphism border-emerald-800/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-red-400">{statusCounts.terminated}</p>
                <p className="text-slate-300 text-sm">Terminated</p>
              </div>
              <XCircle className="h-5 w-5 text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 p-1 bg-slate-800/50 rounded-lg">
        <Button
          variant={userFilters.statusFilter === 'all' ? 'default' : 'ghost'}
          size="sm"
          className={userFilters.statusFilter === 'all' ? 'bg-emerald-600 hover:bg-emerald-700' : 'text-slate-400 hover:text-white'}
          onClick={() => setUserFilters(prev => ({ ...prev, statusFilter: 'all' }))}
        >
          All Users
        </Button>
        <Button
          variant={userFilters.statusFilter === 'active' ? 'default' : 'ghost'}
          size="sm"
          className={userFilters.statusFilter === 'active' ? 'bg-emerald-600 hover:bg-emerald-700' : 'text-slate-400 hover:text-white'}
          onClick={() => setUserFilters(prev => ({ ...prev, statusFilter: 'active' }))}
        >
          Active
        </Button>
        <Button
          variant={userFilters.statusFilter === 'suspended' ? 'default' : 'ghost'}
          size="sm"
          className={userFilters.statusFilter === 'suspended' ? 'bg-emerald-600 hover:bg-emerald-700' : 'text-slate-400 hover:text-white'}
          onClick={() => setUserFilters(prev => ({ ...prev, statusFilter: 'suspended' }))}
        >
          Suspended
        </Button>
        <Button
          variant={userFilters.statusFilter === 'terminated' ? 'default' : 'ghost'}
          size="sm"
          className={userFilters.statusFilter === 'terminated' ? 'bg-emerald-600 hover:bg-emerald-700' : 'text-slate-400 hover:text-white'}
          onClick={() => setUserFilters(prev => ({ ...prev, statusFilter: 'terminated' }))}
        >
          Terminated
        </Button>
      </div>

      {/* Search */}
      <Card className="glassmorphism border-emerald-800/30">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search by Wallet Address..."
              value={userFilters.searchTerm}
              onChange={(e) => setUserFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
              className="pl-9 bg-slate-800/50 border-emerald-800/30 text-white focus:border-emerald-600"
            />
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
                  <TableHead className="text-slate-300 font-semibold">Wallet Address</TableHead>
                  <TableHead className="text-slate-300 font-semibold">Status</TableHead>
                  <TableHead className="text-slate-300 font-semibold">Referral Level</TableHead>
                  <TableHead className="text-slate-300 font-semibold">Staking Package</TableHead>
                  <TableHead className="text-slate-300 font-semibold">Registration Date</TableHead>
                  <TableHead className="text-slate-300 font-semibold">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.userId} className="border-emerald-800/20 hover:bg-slate-800/30 transition-colors">
                    <TableCell>
                      <div className="font-mono text-sm text-white">
                        {user.walletAddress ? 
                          `${user.walletAddress.slice(0, 6)}...${user.walletAddress.slice(-4)}` 
                          : 'N/A'
                        }
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(user.status)}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-emerald-400">N/A</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-slate-400">N/A</span>
                    </TableCell>
                    <TableCell className="text-slate-300 text-sm">
                      {formatLastLogin(user.registrationDate)}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-slate-400 hover:text-white"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-slate-800 border-emerald-800/30 min-w-[160px]">
                          <DropdownMenuItem 
                            className="text-slate-300 hover:text-white hover:bg-slate-700"
                            onClick={() => handleViewDetails(user)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-slate-300 hover:text-white hover:bg-slate-700"
                            onClick={() => handleEditUser(user)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-slate-300 hover:text-white hover:bg-slate-700"
                            onClick={() => handleAdjustWallet(user)}
                          >
                            <DollarSign className="h-4 w-4 mr-2" />
                            Adjust Wallet
                          </DropdownMenuItem>
                          {user.status === 'Active' && (
                            <DropdownMenuItem 
                              className="text-slate-300 hover:text-white hover:bg-slate-700"
                              onClick={() => handleSuspendUser(user)}
                            >
                              <Ban className="h-4 w-4 mr-2" />
                              Suspend User
                            </DropdownMenuItem>
                          )}
                          {user.status === 'Active' && (
                            <DropdownMenuItem 
                              className="text-slate-300 hover:text-white hover:bg-slate-700"
                              onClick={() => handleStatusUpdate(user.userId, 'Terminated')}
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Terminate User
                            </DropdownMenuItem>
                          )}
                          {(user.status === 'Suspended' || user.status === 'Terminated') && (
                            <DropdownMenuItem 
                              className="text-slate-300 hover:text-white hover:bg-slate-700"
                              onClick={() => handleStatusUpdate(user.userId, 'Active')}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Activate User
                            </DropdownMenuItem>
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

      {/* Dialogs */}
      <UserDetailsDialog
        user={selectedUser}
        open={showUserDetails}
        onOpenChange={setShowUserDetails}
      />

      <EditUserDialog
        user={selectedUser}
        open={showEditUser}
        onOpenChange={setShowEditUser}
        onSave={handleEmailUpdate}
      />

      <AdjustWalletDialog
        user={selectedUser}
        open={showAdjustWallet}
        onOpenChange={setShowAdjustWallet}
        onSave={handleWalletAdjustment}
      />

      <SuspendUserDialog
        user={selectedUser}
        open={showSuspendUser}
        onOpenChange={setShowSuspendUser}
        onSave={handleStatusUpdate}
      />

      <WalletAdjustmentHistory
        open={showWalletHistory}
        onOpenChange={setShowWalletHistory}
      />
    </div>
  );
}
