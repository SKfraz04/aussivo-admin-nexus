
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
  CheckCircle,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  BarChart3,
  PieChart
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useRealTimeData } from '@/hooks/useRealTimeData';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell
} from 'recharts';

export function AdminDashboard() {
  const { isLive, metrics, startLiveData, stopLiveData } = useRealTimeData();
  const { toast } = useToast();

  const handleLiveDataToggle = () => {
    if (isLive) {
      stopLiveData();
      toast({
        title: "Live Data Stopped",
        description: "Real-time data updates have been paused.",
      });
    } else {
      startLiveData();
      toast({
        title: "Live Data Started",
        description: "Real-time data updates are now active.",
      });
    }
  };

  const kpiData = [
    {
      title: 'Total Users',
      value: metrics.totalUsers.toLocaleString(),
      change: metrics.userGrowth,
      trend: 'up',
      icon: Users,
      description: 'Active users',
      gradient: 'from-blue-400 to-purple-500'
    },
    {
      title: 'ASVO Staked',
      value: metrics.asvoStaked,
      change: metrics.stakingGrowth,
      trend: 'up',
      icon: Coins,
      description: 'Total staked',
      gradient: 'from-emerald-400 to-teal-500'
    },
    {
      title: 'TVL',
      value: metrics.tvl,
      change: metrics.tvlGrowth,
      trend: 'up',
      icon: DollarSign,
      description: 'Total value',
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      title: 'ICO Progress',
      value: `${metrics.icoProgress.toFixed(1)}%`,
      change: '13.5M ASVO',
      trend: 'neutral',
      icon: TrendingUp,
      description: 'of 100M supply',
      gradient: 'from-pink-400 to-rose-500'
    }
  ];

  const recentActivity = [
    {
      id: 'TXN_001',
      user: { name: 'John Doe', avatar: 'JD' },
      action: 'Deposit',
      amount: '1,000 USDT',
      status: 'completed',
      time: '2 min ago'
    },
    {
      id: 'TXN_002',
      user: { name: 'Jane Smith', avatar: 'JS' },
      action: 'Withdrawal',
      amount: '500 USDT',
      status: 'pending',
      time: '5 min ago'
    },
    {
      id: 'TXN_003',
      user: { name: 'Mike Wilson', avatar: 'MW' },
      action: 'Staking',
      amount: '2,500 ASVO',
      status: 'completed',
      time: '10 min ago'
    }
  ];

  const chartData = [
    { name: 'Jan', users: 4000, revenue: 2400 },
    { name: 'Feb', users: 3000, revenue: 1398 },
    { name: 'Mar', users: 2000, revenue: 9800 },
    { name: 'Apr', users: 2780, revenue: 3908 },
    { name: 'May', users: 1890, revenue: 4800 },
    { name: 'Jun', users: 2390, revenue: 3800 },
  ];

  const pieData = [
    { name: 'Core Validator', value: 45, color: '#10b981' },
    { name: 'Premium Staker', value: 30, color: '#3b82f6' },
    { name: 'Basic Staker', value: 20, color: '#8b5cf6' },
    { name: 'Starter', value: 5, color: '#f59e0b' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-emerald-200 to-teal-300 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-slate-400 text-lg">Complete platform overview and analytics</p>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            className={`border-emerald-600/50 text-emerald-400 hover:bg-emerald-600/20 transition-all duration-300 hover:scale-105 ${
              isLive ? 'bg-emerald-600/20 border-emerald-400 shadow-lg shadow-emerald-500/20' : ''
            }`}
            onClick={handleLiveDataToggle}
          >
            <Activity className={`h-4 w-4 mr-2 ${isLive ? 'animate-pulse' : ''}`} />
            {isLive ? 'Live Data ON' : 'Live Data'}
          </Button>
        </div>
      </div>

      {/* Live Data Indicator */}
      {isLive && (
        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-600/10 via-emerald-500/10 to-teal-600/10 border border-emerald-600/30 rounded-xl backdrop-blur-sm animate-scale-in">
          <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
          <span className="text-emerald-400 font-medium">Live data updates active - refreshing every 2 seconds</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card 
            key={index} 
            className="glassmorphism border-emerald-800/30 hover:border-emerald-600/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/10 group animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                {kpi.title}
              </CardTitle>
              <div className={`p-2 rounded-lg bg-gradient-to-r ${kpi.gradient} bg-opacity-20 group-hover:scale-110 transition-transform duration-300`}>
                <kpi.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className={`text-3xl font-bold bg-gradient-to-r ${kpi.gradient} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300`}>
                {kpi.value}
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className={`flex items-center ${
                  kpi.trend === 'up' ? 'text-emerald-400' : 
                  kpi.trend === 'down' ? 'text-red-400' : 'text-slate-400'
                }`}>
                  {kpi.trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> :
                   kpi.trend === 'down' ? <ArrowDownRight className="h-3 w-3" /> : null}
                  <span className="font-medium">{kpi.change}</span>
                </div>
                <span className="text-slate-500">{kpi.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Growth Chart */}
        <Card className="glassmorphism border-emerald-800/30 hover:border-emerald-600/30 transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <CardHeader className="pb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 bg-opacity-20">
                <BarChart3 className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                  User Growth
                </CardTitle>
                <p className="text-slate-400 text-sm">Monthly active users</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="users" 
                    stroke="#10b981" 
                    fillOpacity={1} 
                    fill="url(#userGradient)" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Staking Distribution */}
        <Card className="glassmorphism border-emerald-800/30 hover:border-emerald-600/30 transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <CardHeader className="pb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 bg-opacity-20">
                <PieChart className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                  Staking Distribution
                </CardTitle>
                <p className="text-slate-400 text-sm">By package type</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <RechartsPieChart
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </RechartsPieChart>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {pieData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-slate-300">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="glassmorphism border-emerald-800/30 hover:border-emerald-600/30 transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.7s' }}>
        <CardHeader className="flex flex-row items-center justify-between pb-6">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
              Recent Activity
            </CardTitle>
            <p className="text-slate-400">Latest platform transactions</p>
          </div>
          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-emerald-600/20 transition-all duration-300">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div 
                key={activity.id} 
                className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-slate-800/30 to-slate-700/20 border border-emerald-800/20 hover:border-emerald-600/40 transition-all duration-300 hover:scale-[1.02] group animate-scale-in"
                style={{ animationDelay: `${0.8 + index * 0.1}s` }}
              >
                <div className="flex items-center space-x-4">
                  <Avatar className="h-10 w-10 ring-2 ring-emerald-500/20 group-hover:ring-emerald-400/40 transition-all duration-300">
                    <AvatarFallback className="bg-gradient-to-r from-emerald-600/20 to-teal-600/20 text-emerald-400 text-sm font-medium">
                      {activity.user.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-white font-medium">{activity.user.name}</p>
                    <p className="text-slate-400 text-sm">{activity.action} • <span className="text-emerald-400">{activity.amount}</span></p>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <Badge 
                    variant={activity.status === 'completed' ? 'default' : 'secondary'}
                    className={`text-xs transition-all duration-300 ${
                      activity.status === 'completed' ? 'bg-emerald-600/20 text-emerald-400 border-emerald-600/50 hover:bg-emerald-600/30' :
                      'bg-yellow-600/20 text-yellow-400 border-yellow-600/50 hover:bg-yellow-600/30'
                    }`}
                  >
                    {activity.status}
                  </Badge>
                  <p className="text-slate-500 text-xs">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Revenue Analytics */}
      <Card className="glassmorphism border-emerald-800/30 hover:border-emerald-600/30 transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.9s' }}>
        <CardHeader className="pb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 bg-opacity-20">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                Revenue Analytics
              </CardTitle>
              <p className="text-slate-400 text-sm">Monthly revenue breakdown</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
