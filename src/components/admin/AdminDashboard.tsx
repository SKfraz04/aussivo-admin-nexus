import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  TrendingUp,
  Users,
  DollarSign,
  Coins,
  Clock,
  AlertCircle,
  Activity,
  UserPlus,
  BarChart3,
  PieChart,
  Trophy,
  Shield,
  Flame,
} from 'lucide-react';
import { useAdminData } from '@/hooks/useAdminData';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';

export function AdminDashboard() {
  const { users, transactions, stakingPackages, referrals } = useAdminData();

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Calculate total pending transactions
  const pendingTransactions = transactions.filter(tx => tx.status === 'Pending').length;

  // Mock data for recent activity
  const recentActivities = [
    {
      type: 'user',
      description: 'New user registered',
      timestamp: new Date().toISOString(),
    },
    {
      type: 'transaction',
      description: 'Deposit of $500 confirmed',
      timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    },
    {
      type: 'package',
      description: 'User staked in Compute Booster package',
      timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    },
  ];

  // Mock data for user distribution chart
  const distributionData = [
    { name: 'Micro Node', value: 400, color: '#34D399' },
    { name: 'Compute Booster', value: 300, color: '#10B981' },
    { name: 'Data Streamer', value: 300, color: '#059669' },
    { name: 'Edge Power Node', value: 200, color: '#047857' },
    { name: 'Core Validator Tier', value: 100, color: '#065F46' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2 animate-slide-in">Admin Dashboard</h1>
        <p className="text-slate-300 animate-slide-in" style={{ animationDelay: '200ms' }}>
          Monitor your platform's key metrics and activities
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users */}
        <Card className="glassmorphism border-emerald-800/30 animate-scale-in">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-white">{users.length}</p>
                <p className="text-slate-300 text-sm">Total Users</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-emerald-400" />
                  <span className="text-emerald-400 text-xs">+12% this month</span>
                </div>
              </div>
              <div className="p-3 bg-emerald-600/20 rounded-full">
                <Users className="h-6 w-6 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Revenue */}
        <Card className="glassmorphism border-emerald-800/30 animate-scale-in" style={{ animationDelay: '100ms' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-white">$2.5M</p>
                <p className="text-slate-300 text-sm">Total Revenue</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-emerald-400" />
                  <span className="text-emerald-400 text-xs">+8.2% this month</span>
                </div>
              </div>
              <div className="p-3 bg-emerald-600/20 rounded-full">
                <DollarSign className="h-6 w-6 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Stakes */}
        <Card className="glassmorphism border-emerald-800/30 animate-scale-in" style={{ animationDelay: '200ms' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-white">1,247</p>
                <p className="text-slate-300 text-sm">Active Stakes</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-emerald-400" />
                  <span className="text-emerald-400 text-xs">+15.3% this week</span>
                </div>
              </div>
              <div className="p-3 bg-emerald-600/20 rounded-full">
                <Coins className="h-6 w-6 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pending Transactions */}
        <Card className="glassmorphism border-emerald-800/30 animate-scale-in" style={{ animationDelay: '300ms' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-white">{pendingTransactions}</p>
                <p className="text-slate-300 text-sm">Pending Transactions</p>
                <div className="flex items-center gap-1 mt-1">
                  <Clock className="h-3 w-3 text-yellow-400" />
                  <span className="text-yellow-400 text-xs">Requires attention</span>
                </div>
              </div>
              <div className="p-3 bg-yellow-600/20 rounded-full">
                <AlertCircle className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Revenue Analytics - Parallel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="glassmorphism border-emerald-800/30 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-emerald-400" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 animate-slide-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className={`p-2 rounded-full ${activity.type === 'user' ? 'bg-blue-600/20' : 
                  activity.type === 'transaction' ? 'bg-emerald-600/20' : 'bg-yellow-600/20'}`}>
                  {activity.type === 'user' ? (
                    <UserPlus className="h-4 w-4 text-blue-400" />
                  ) : activity.type === 'transaction' ? (
                    <TrendingUp className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Coins className="h-4 w-4 text-yellow-400" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm">{activity.description}</p>
                  <p className="text-slate-400 text-xs">{formatDateTime(activity.timestamp)}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Revenue Analytics */}
        <Card className="glassmorphism border-emerald-800/30 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-emerald-400" />
              Revenue Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 text-sm">Total Revenue</span>
                <span className="text-white font-semibold">$2,550,000</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300 text-sm">Monthly Growth</span>
                <span className="text-emerald-400 font-semibold">+8.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300 text-sm">Active Packages</span>
                <span className="text-white font-semibold">1,247</span>
              </div>
              <div className="mt-4 p-4 bg-emerald-900/20 rounded-lg border border-emerald-800/30">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span className="text-emerald-400 text-sm font-medium">This Month</span>
                </div>
                <div className="text-white text-lg font-bold">$340,000</div>
                <div className="text-slate-400 text-xs">+12% from last month</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Distribution Chart */}
      <Card className="glassmorphism border-emerald-800/30 animate-fade-in">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <PieChart className="h-5 w-5 text-emerald-400" />
            User Distribution by Package
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
                <Legend
                  wrapperStyle={{
                    color: 'white'
                  }}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glassmorphism border-emerald-800/30 animate-fade-in">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="p-3 bg-emerald-600/20 rounded-full w-fit mx-auto mb-4">
                <Trophy className="h-8 w-8 text-emerald-400" />
              </div>
              <p className="text-2xl font-bold text-white">854</p>
              <p className="text-slate-300 text-sm">Active Referrals</p>
            </div>
          </CardContent>
        </Card>

        <Card className="glassmorphism border-emerald-800/30 animate-fade-in">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="p-3 bg-blue-600/20 rounded-full w-fit mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-400" />
              </div>
              <p className="text-2xl font-bold text-white">12</p>
              <p className="text-slate-300 text-sm">Active Proposals</p>
            </div>
          </CardContent>
        </Card>

        <Card className="glassmorphism border-emerald-800/30 animate-fade-in">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="p-3 bg-red-600/20 rounded-full w-fit mx-auto mb-4">
                <Flame className="h-8 w-8 text-red-400" />
              </div>
              <p className="text-2xl font-bold text-white">5.2M</p>
              <p className="text-slate-300 text-sm">Tokens Burned</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
