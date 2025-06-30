
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Download,
  Eye,
  Edit,
  DollarSign,
  Ban,
  XCircle,
  CheckCircle,
  Users,
  UserCheck,
  UserX,
  Clock,
  MoreVertical
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
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
      'Active': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50',
      'Suspended': 'bg-orange-500/20 text-orange-400 border-orange-500/50',
      'Terminated': 'bg-red-500/20 text-red-400 border-red-500/50',
      'Inactive': 'bg-slate-500/20 text-slate-400 border-slate-500/50'
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.Inactive;
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
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="space-y-6 p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl text-white">User & Wallet Management</h1>
            <p className="text-slate-400">
              Manage platform users, their wallets, and account settings
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button 
              variant="outline" 
              onClick={() => setShowWalletHistory(true)}
              className="justify-start sm:justify-center bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
            >
              <DollarSign className="mr-2 h-4 w-4" />
              Wallet History
            </Button>
            <Button 
              variant="outline" 
              onClick={handleExport}
              className="justify-start sm:justify-center bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
            >
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-emerald-400" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-400">Total Users</p>
                  <p className="text-xl font-bold md:text-2xl text-white">{statusCounts.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-emerald-400" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-400">Active</p>
                  <p className="text-xl font-bold text-emerald-400 md:text-2xl">{statusCounts.active}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-orange-400" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-400">Suspended</p>
                  <p className="text-xl font-bold text-orange-400 md:text-2xl">{statusCounts.suspended}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center space-x-2">
                <XCircle className="h-4 w-4 text-red-400" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-400">Terminated</p>
                  <p className="text-xl font-bold text-red-400 md:text-2xl">{statusCounts.terminated}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 md:p-6">
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search by wallet address, email, or user ID..."
                  value={userFilters.searchTerm}
                  onChange={(e) => setUserFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                  className="pl-9 bg-slate-900 border-slate-600 text-white placeholder:text-slate-400"
                />
              </div>

              {/* Status Filter Tabs */}
              <Tabs 
                value={userFilters.statusFilter} 
                onValueChange={(value) => setUserFilters(prev => ({ ...prev, statusFilter: value }))}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-slate-900">
                  <TabsTrigger value="all" className="text-xs md:text-sm data-[state=active]:bg-emerald-600 data-[state=active]:text-white">All Users</TabsTrigger>
                  <TabsTrigger value="active" className="text-xs md:text-sm data-[state=active]:bg-emerald-600 data-[state=active]:text-white">Active</TabsTrigger>
                  <TabsTrigger value="suspended" className="text-xs md:text-sm data-[state=active]:bg-emerald-600 data-[state=active]:text-white">Suspended</TabsTrigger>
                  <TabsTrigger value="terminated" className="text-xs md:text-sm data-[state=active]:bg-emerald-600 data-[state=active]:text-white">Terminated</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="px-4 py-4 md:px-6">
            <CardTitle className="text-lg md:text-xl text-white">Users ({users.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="min-w-[200px] text-slate-300">Wallet Address</TableHead>
                    <TableHead className="min-w-[100px] text-slate-300">Status</TableHead>
                    <TableHead className="hidden md:table-cell min-w-[120px] text-slate-300">Referral Level</TableHead>
                    <TableHead className="hidden lg:table-cell min-w-[140px] text-slate-300">Staking Package</TableHead>
                    <TableHead className="hidden sm:table-cell min-w-[120px] text-slate-300">Registration</TableHead>
                    <TableHead className="w-[70px] text-slate-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.userId} className="hover:bg-slate-700/50 border-slate-700">
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-mono text-sm text-white">
                            {user.walletAddress ? 
                              `${user.walletAddress.slice(0, 6)}...${user.walletAddress.slice(-4)}` 
                              : 'N/A'
                            }
                          </div>
                          <div className="text-xs text-slate-400 md:hidden">
                            {user.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusBadge(user.status)}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <span className="text-slate-400">Level 1</span>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <span className="text-slate-400">Basic</span>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-sm text-slate-400">
                        {new Date(user.registrationDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-slate-700"
                            >
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Open actions menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48 bg-slate-800 border-slate-700">
                            <DropdownMenuItem onClick={() => handleViewDetails(user)} className="text-white hover:bg-slate-700">
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditUser(user)} className="text-white hover:bg-slate-700">
                              <Edit className="mr-2 h-4 w-4" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAdjustWallet(user)} className="text-white hover:bg-slate-700">
                              <DollarSign className="mr-2 h-4 w-4" />
                              Adjust Wallet
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-slate-700" />
                            {user.status === 'Active' && (
                              <>
                                <DropdownMenuItem onClick={() => handleSuspendUser(user)} className="text-orange-400 hover:bg-slate-700">
                                  <Ban className="mr-2 h-4 w-4" />
                                  Suspend User
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleStatusUpdate(user.userId, 'Terminated')}
                                  className="text-red-400 hover:bg-slate-700"
                                >
                                  <XCircle className="mr-2 h-4 w-4" />
                                  Terminate User
                                </DropdownMenuItem>
                              </>
                            )}
                            {(user.status === 'Suspended' || user.status === 'Terminated') && (
                              <DropdownMenuItem 
                                onClick={() => handleStatusUpdate(user.userId, 'Active')}
                                className="text-emerald-400 hover:bg-slate-700"
                              >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Activate User
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                  {users.length === 0 && (
                    <TableRow className="border-slate-700">
                      <TableCell colSpan={6} className="h-24 text-center">
                        <div className="flex flex-col items-center space-y-2">
                          <UserX className="h-8 w-8 text-slate-400" />
                          <p className="text-slate-400">No users found</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
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
    </div>
  );
}
