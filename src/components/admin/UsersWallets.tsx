
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
  DialogTrigger,
} from '@/components/ui/dialog';
import { useAdminData } from '@/hooks/useAdminData';
import { useToast } from '@/hooks/use-toast';
import { User } from '@/types/admin';

export function UsersWallets() {
  const { users, userFilters, setUserFilters, updateUserStatus, allUsers } = useAdminData();
  const { toast } = useToast();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const handleStatusUpdate = (userId: string, newStatus: 'Active' | 'Suspended' | 'Inactive') => {
    updateUserStatus(userId, newStatus);
    toast({
      title: "Status Updated",
      description: `User status has been changed to ${newStatus}.`,
    });
  };

  const handleViewDetails = (user: User) => {
    setSelectedUser(user);
    setShowUserDetails(true);
  };

  const handleExport = () => {
    const csvContent = [
      ['User ID', 'Email', 'Total Balance', 'Total ASVO', 'Staked ASVO', 'Status', 'Registration Date', 'Last Login', 'KYC Status'],
      ...users.map(user => [
        user.userId,
        user.email,
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

  const handleAddUser = () => {
    setShowAddUserDialog(true);
    toast({
      title: "Add User",
      description: "Add user functionality would be implemented here.",
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

  const formatLastLogin = (dateString: string) => {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}, ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;
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

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Users & Wallets</h1>
          <p className="text-slate-400">Manage user accounts and wallets</p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            className="border-emerald-600/50 text-emerald-400 hover:bg-emerald-600/20"
            onClick={handleExport}
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button 
            className="bg-emerald-600 hover:bg-emerald-700"
            onClick={handleAddUser}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glassmorphism border-emerald-800/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-white">{allUsers.length}</p>
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
                <p className="text-2xl font-bold text-white">{allUsers.filter(u => u.status === 'Active').length}</p>
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
                <p className="text-2xl font-bold text-white">{allUsers.filter(u => u.status === 'Suspended').length}</p>
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
              
              <Button 
                variant="outline" 
                size="sm" 
                className="border-emerald-600/50 text-emerald-400 hover:bg-emerald-600/20"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>

              {(userFilters.searchTerm || userFilters.statusFilter !== 'all' || userFilters.verificationFilter !== 'all') && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-slate-400 hover:text-white"
                  onClick={resetFilters}
                >
                  Clear
                </Button>
              )}
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
                      <Badge className={user.kycStatus === 'Verified' ? 'bg-emerald-600/20 text-emerald-400' : user.kycStatus === 'Pending' ? 'bg-yellow-600/20 text-yellow-400' : 'bg-red-600/20 text-red-400'}>
                        {user.kycStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-300 text-sm">
                      {formatLastLogin(user.lastLogin)}
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
                        <DropdownMenuContent className="bg-slate-800 border-emerald-800/30">
                          <DropdownMenuItem 
                            className="text-slate-300 hover:text-white hover:bg-slate-700"
                            onClick={() => handleViewDetails(user)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleStatusUpdate(user.userId, 'Active')}
                            className="text-slate-300 hover:text-white hover:bg-slate-700"
                          >
                            Set Active
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleStatusUpdate(user.userId, 'Suspended')}
                            className="text-slate-300 hover:text-white hover:bg-slate-700"
                          >
                            Suspend User
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleStatusUpdate(user.userId, 'Inactive')}
                            className="text-slate-300 hover:text-white hover:bg-slate-700"
                          >
                            Set Inactive
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

      {/* User Details Dialog */}
      <Dialog open={showUserDetails} onOpenChange={setShowUserDetails}>
        <DialogContent className="bg-slate-800 border-emerald-800/30 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-emerald-400">User Details</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 text-sm">User ID</label>
                  <p className="text-white font-medium">{selectedUser.userId}</p>
                </div>
                <div>
                  <label className="text-slate-400 text-sm">Email</label>
                  <p className="text-white font-medium">{selectedUser.email}</p>
                </div>
                <div>
                  <label className="text-slate-400 text-sm">Total Balance</label>
                  <p className="text-white font-medium">{selectedUser.totalBalance}</p>
                </div>
                <div>
                  <label className="text-slate-400 text-sm">Total ASVO</label>
                  <p className="text-emerald-400 font-medium">{selectedUser.totalASVO}</p>
                </div>
                <div>
                  <label className="text-slate-400 text-sm">Staked ASVO</label>
                  <p className="text-emerald-400 font-medium">{selectedUser.stakedASVO}</p>
                </div>
                <div>
                  <label className="text-slate-400 text-sm">Status</label>
                  <Badge className={getStatusBadge(selectedUser.status)}>
                    {selectedUser.status}
                  </Badge>
                </div>
                <div>
                  <label className="text-slate-400 text-sm">KYC Status</label>
                  <Badge className={selectedUser.kycStatus === 'Verified' ? 'bg-emerald-600/20 text-emerald-400' : selectedUser.kycStatus === 'Pending' ? 'bg-yellow-600/20 text-yellow-400' : 'bg-red-600/20 text-red-400'}>
                    {selectedUser.kycStatus}
                  </Badge>
                </div>
                <div>
                  <label className="text-slate-400 text-sm">Registration Date</label>
                  <p className="text-white font-medium">{selectedUser.registrationDate}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-slate-400 text-sm">Last Login</label>
                  <p className="text-white font-medium">{formatLastLogin(selectedUser.lastLogin)}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
