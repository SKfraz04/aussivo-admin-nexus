
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Coins, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Clock,
  CheckCircle,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Activity
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function AdminDashboard() {
  const kpiData = [
    {
      title: 'Total Users',
      value: '15,432',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      description: 'Last 7 days'
    },
    {
      title: 'ASVO Staked',
      value: '75M',
      change: '+8.3%',
      trend: 'up',
      icon: Coins,
      description: 'Total value locked'
    },
    {
      title: 'TVL',
      value: '$3.75M',
      change: '+15.7%',
      trend: 'up',
      icon: DollarSign,
      description: 'USD equivalent'
    },
    {
      title: 'ICO Progress',
      value: '13.5%',
      change: '13.5M ASVO',
      trend: 'neutral',
      icon: TrendingUp,
      description: 'of 100M supply'
    }
  ];

  const recentActivity = [
    {
      id: 'TXN_001',
      user: { name: 'John Doe', email: 'john@example.com', avatar: 'JD' },
      action: 'Deposit',
      amount: '1,000 USDT',
      status: 'pending',
      time: '2 min ago'
    },
    {
      id: 'TXN_002',
      user: { name: 'Jane Smith', email: 'jane@example.com', avatar: 'JS' },
      action: 'Withdrawal',
      amount: '500 USDT',
      status: 'completed',
      time: '5 min ago'
    },
    {
      id: 'TXN_003',
      user: { name: 'Mike Wilson', email: 'mike@example.com', avatar: 'MW' },
      action: 'Staking',
      amount: '2,500 ASVO',
      status: 'failed',
      time: '10 min ago'
    },
    {
      id: 'TXN_004',
      user: { name: 'Alice Brown', email: 'alice@example.com', avatar: 'AB' },
      action: 'Claim Rewards',
      amount: '45.75 ASVO',
      status: 'completed',
      time: '15 min ago'
    }
  ];

  const topPerformers = [
    { name: 'Core Validator', staked: '25M ASVO', users: 1250, apy: '12%' },
    { name: 'Premium Staker', staked: '18M ASVO', users: 890, apy: '10%' },
    { name: 'Basic Staker', staked: '15M ASVO', users: 2100, apy: '8%' },
    { name: 'Starter Package', staked: '12M ASVO', users: 3200, apy: '6%' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400">Welcome back, here's what's happening with your platform today.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-emerald-600/50 text-emerald-400 hover:bg-emerald-600/20">
            <Activity className="h-4 w-4 mr-2" />
            Live Data
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <TrendingUp className="h-4 w-4 mr-2" />
            Analytics
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="glassmorphism border-emerald-800/30 hover:border-emerald-600/50 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">
                {kpi.title}
              </CardTitle>
              <kpi.icon className="h-4 w-4 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{kpi.value}</div>
              <div className="flex items-center space-x-2 text-xs">
                <div className={`flex items-center ${
                  kpi.trend === 'up' ? 'text-emerald-400' : 
                  kpi.trend === 'down' ? 'text-red-400' : 'text-slate-400'
                }`}>
                  {kpi.trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> :
                   kpi.trend === 'down' ? <ArrowDownRight className="h-3 w-3" /> : null}
                  <span>{kpi.change}</span>
                </div>
                <span className="text-slate-400">{kpi.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 glassmorphism border-emerald-800/30">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-white">Recent Activity</CardTitle>
              <p className="text-slate-400 text-sm">Latest platform transactions</p>
            </div>
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30 border border-emerald-800/20 hover:border-emerald-600/30 transition-colors">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-emerald-600/20 text-emerald-400 text-xs">
                        {activity.user.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-white font-medium text-sm">{activity.user.name}</p>
                      <p className="text-slate-400 text-xs">{activity.action} • {activity.amount}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={activity.status === 'completed' ? 'default' : activity.status === 'pending' ? 'secondary' : 'destructive'}
                      className={`text-xs ${
                        activity.status === 'completed' ? 'bg-emerald-600/20 text-emerald-400 border-emerald-600/50' :
                        activity.status === 'pending' ? 'bg-yellow-600/20 text-yellow-400 border-yellow-600/50' :
                        'bg-red-600/20 text-red-400 border-red-600/50'
                      }`}
                    >
                      {activity.status}
                    </Badge>
                    <p className="text-slate-400 text-xs mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Packages */}
        <Card className="glassmorphism border-emerald-800/30">
          <CardHeader>
            <CardTitle className="text-white">Top Packages</CardTitle>
            <p className="text-slate-400 text-sm">Most popular staking tiers</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((package_, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium text-sm">{package_.name}</p>
                      <p className="text-slate-400 text-xs">{package_.users} users</p>
                    </div>
                    <div className="text-right">
                      <p className="text-emerald-400 font-medium text-sm">{package_.apy}</p>
                      <p className="text-slate-400 text-xs">{package_.staked}</p>
                    </div>
                  </div>
                  <Progress 
                    value={85 - (index * 15)} 
                    className="h-2 bg-slate-800"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glassmorphism border-emerald-800/30">
          <CardHeader>
            <CardTitle className="text-white text-lg">System Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Uptime</span>
              <span className="text-emerald-400 font-medium">99.98%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Response Time</span>
              <span className="text-emerald-400 font-medium">142ms</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Active Sessions</span>
              <span className="text-emerald-400 font-medium">2,847</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glassmorphism border-emerald-800/30">
          <CardHeader>
            <CardTitle className="text-white text-lg">Token Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Price</span>
              <span className="text-emerald-400 font-medium">$0.048</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Market Cap</span>
              <span className="text-emerald-400 font-medium">$4.2M</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">24h Volume</span>
              <span className="text-emerald-400 font-medium">$156K</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glassmorphism border-emerald-800/30">
          <CardHeader>
            <CardTitle className="text-white text-lg">Growth Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-300">New Users</span>
              <span className="text-emerald-400 font-medium">+247</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Weekly Growth</span>
              <span className="text-emerald-400 font-medium">+23.4%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Revenue</span>
              <span className="text-emerald-400 font-medium">$89.2K</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
