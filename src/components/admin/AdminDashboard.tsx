
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
import { useRealTimeData } from '@/hooks/useRealTimeData';
import { AnalyticsModal } from './AnalyticsModal';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export function AdminDashboard() {
  const { isLive, metrics, startLiveData, stopLiveData } = useRealTimeData();
  const [showAnalytics, setShowAnalytics] = useState(false);
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

  const handleAnalyticsOpen = () => {
    setShowAnalytics(true);
    toast({
      title: "Analytics Opened",
      description: "Displaying advanced analytics dashboard.",
    });
  };

  const kpiData = [
    {
      title: 'Total Users',
      value: metrics.totalUsers.toLocaleString(),
      change: metrics.userGrowth,
      trend: 'up',
      icon: Users,
      description: 'Last 7 days',
      gradient: 'from-blue-400 to-purple-500'
    },
    {
      title: 'ASVO Staked',
      value: metrics.asvoStaked,
      change: metrics.stakingGrowth,
      trend: 'up',
      icon: Coins,
      description: 'Total value locked',
      gradient: 'from-emerald-400 to-teal-500'
    },
    {
      title: 'TVL',
      value: metrics.tvl,
      change: metrics.tvlGrowth,
      trend: 'up',
      icon: DollarSign,
      description: 'USD equivalent',
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
    { name: 'Core Validator', staked: '25M ASVO', users: 1250, apy: '12%', color: 'from-emerald-500 to-teal-400' },
    { name: 'Premium Staker', staked: '18M ASVO', users: 890, apy: '10%', color: 'from-blue-500 to-cyan-400' },
    { name: 'Basic Staker', staked: '15M ASVO', users: 2100, apy: '8%', color: 'from-purple-500 to-pink-400' },
    { name: 'Starter Package', staked: '12M ASVO', users: 3200, apy: '6%', color: 'from-orange-500 to-yellow-400' }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-emerald-200 to-teal-300 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-slate-400 text-lg">Welcome back, here's what's happening with your platform today.</p>
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
          <Button 
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            onClick={handleAnalyticsOpen}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Analytics
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

      {/* Recent Activity */}
      <Card className="glassmorphism border-emerald-800/30 hover:border-emerald-600/30 transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.5s' }}>
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
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
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
                    variant={activity.status === 'completed' ? 'default' : activity.status === 'pending' ? 'secondary' : 'destructive'}
                    className={`text-xs transition-all duration-300 ${
                      activity.status === 'completed' ? 'bg-emerald-600/20 text-emerald-400 border-emerald-600/50 hover:bg-emerald-600/30' :
                      activity.status === 'pending' ? 'bg-yellow-600/20 text-yellow-400 border-yellow-600/50 hover:bg-yellow-600/30' :
                      'bg-red-600/20 text-red-400 border-red-600/50 hover:bg-red-600/30'
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

      {/* Top Performing Packages */}
      <Card className="glassmorphism border-emerald-800/30 hover:border-emerald-600/30 transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.7s' }}>
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
            Top Packages
          </CardTitle>
          <p className="text-slate-400">Most popular staking tiers</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {topPerformers.map((package_, index) => (
              <div 
                key={index} 
                className="space-y-3 p-4 rounded-xl bg-gradient-to-r from-slate-800/20 to-slate-700/10 hover:from-slate-800/40 hover:to-slate-700/20 transition-all duration-300 hover:scale-[1.02] group animate-scale-in"
                style={{ animationDelay: `${0.8 + index * 0.1}s` }}
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className={`text-white font-semibold text-lg bg-gradient-to-r ${package_.color} bg-clip-text text-transparent`}>
                      {package_.name}
                    </p>
                    <p className="text-slate-400 text-sm">{package_.users.toLocaleString()} users</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className={`font-bold text-lg bg-gradient-to-r ${package_.color} bg-clip-text text-transparent`}>
                      {package_.apy}
                    </p>
                    <p className="text-slate-400 text-sm">{package_.staked}</p>
                  </div>
                </div>
                <div className="relative">
                  <Progress 
                    value={85 - (index * 15)} 
                    className="h-3 bg-slate-800/50 overflow-hidden"
                  />
                  <div 
                    className={`absolute top-0 left-0 h-3 bg-gradient-to-r ${package_.color} rounded-full transition-all duration-1000 ease-out shadow-lg`}
                    style={{ 
                      width: `${85 - (index * 15)}%`,
                      animationDelay: `${1 + index * 0.2}s`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bottom Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="glassmorphism border-emerald-800/30 hover:border-emerald-600/30 transition-all duration-300 hover:scale-[1.02] animate-fade-in" style={{ animationDelay: '1.2s' }}>
          <CardHeader className="pb-6">
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
              Token Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-slate-800/30 to-slate-700/20 hover:from-slate-800/50 hover:to-slate-700/30 transition-all duration-300">
              <span className="text-slate-300 font-medium">Price</span>
              <span className="text-emerald-400 font-bold text-lg">{metrics.tokenPrice}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-slate-800/30 to-slate-700/20 hover:from-slate-800/50 hover:to-slate-700/30 transition-all duration-300">
              <span className="text-slate-300 font-medium">Market Cap</span>
              <span className="text-emerald-400 font-bold text-lg">{metrics.marketCap}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-slate-800/30 to-slate-700/20 hover:from-slate-800/50 hover:to-slate-700/30 transition-all duration-300">
              <span className="text-slate-300 font-medium">24h Volume</span>
              <span className="text-emerald-400 font-bold text-lg">{metrics.volume24h}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glassmorphism border-emerald-800/30 hover:border-emerald-600/30 transition-all duration-300 hover:scale-[1.02] animate-fade-in" style={{ animationDelay: '1.3s' }}>
          <CardHeader className="pb-6">
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
              Growth Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-slate-800/30 to-slate-700/20 hover:from-slate-800/50 hover:to-slate-700/30 transition-all duration-300">
              <span className="text-slate-300 font-medium">New Users</span>
              <span className="text-emerald-400 font-bold text-lg">+{metrics.newUsers}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-slate-800/30 to-slate-700/20 hover:from-slate-800/50 hover:to-slate-700/30 transition-all duration-300">
              <span className="text-slate-300 font-medium">Weekly Growth</span>
              <span className="text-emerald-400 font-bold text-lg">{metrics.weeklyGrowth}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-slate-800/30 to-slate-700/20 hover:from-slate-800/50 hover:to-slate-700/30 transition-all duration-300">
              <span className="text-slate-300 font-medium">Revenue</span>
              <span className="text-emerald-400 font-bold text-lg">{metrics.revenue}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Modal */}
      <AnalyticsModal 
        open={showAnalytics} 
        onOpenChange={setShowAnalytics}
      />
    </div>
  );
}
