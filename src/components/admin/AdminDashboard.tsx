
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Coins, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Clock,
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

export function AdminDashboard() {
  const kpiData = [
    {
      title: 'Total Registered Users',
      value: '15,432',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      period: 'Last 7d'
    },
    {
      title: 'Total ASVO Staked',
      value: '75,000,000 ASVO',
      change: '+8.3%',
      trend: 'up',
      icon: Coins,
      period: 'Last 24h'
    },
    {
      title: 'Total Value Locked (TVL)',
      value: '$3,750,000 USD',
      change: '+15.7%',
      trend: 'up',
      icon: DollarSign,
      period: 'Last 7d'
    },
    {
      title: 'Total ASVO Sold (ICO)',
      value: '13,500,000 ASVO',
      change: '13.5%',
      trend: 'neutral',
      icon: TrendingUp,
      period: 'Progress'
    },
    {
      title: 'Total Funds Raised (ICO)',
      value: '$825,000 USD',
      change: '+5.2%',
      trend: 'up',
      icon: DollarSign,
      period: 'Last 24h'
    },
    {
      title: 'Pending Deposits',
      value: '5',
      change: '',
      trend: 'neutral',
      icon: Clock,
      period: 'Awaiting Review'
    },
    {
      title: 'Pending Withdrawals',
      value: '2',
      change: '',
      trend: 'neutral',
      icon: Clock,
      period: 'Awaiting Approval'
    }
  ];

  const recentActivity = [
    {
      timestamp: '2025-06-24 14:55',
      action: 'New User Registration',
      entity: 'user_XYZ789',
      details: 'Email: user@example.com',
      status: 'success'
    },
    {
      timestamp: '2025-06-24 14:50',
      action: 'Deposit Confirmed',
      entity: 'user_ABC123',
      details: '1000 USDT (BEP20)',
      status: 'success'
    },
    {
      timestamp: '2025-06-24 14:40',
      action: 'Staking Package Created',
      entity: 'user_DEF456',
      details: 'Core Validator Tier (5000 ASVO)',
      status: 'pending'
    },
    {
      timestamp: '2025-06-24 14:30',
      action: 'ASVO Claimed',
      entity: 'user_GHI789',
      details: '45.75 ASVO',
      status: 'success'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="glassmorphism p-8 rounded-2xl border border-emerald-800/30 hover:border-emerald-600/50 transition-all duration-500 animate-scale-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-lg text-slate-300">Overview of the Aussivo ecosystem's key metrics and operational status.</p>
          </div>
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center animate-pulse">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card 
            key={index} 
            className="glassmorphism border-emerald-800/30 hover:border-emerald-600/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20 group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors duration-300">
                {kpi.title}
              </CardTitle>
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-400/20 to-teal-600/20 flex items-center justify-center group-hover:from-emerald-400/30 group-hover:to-teal-600/30 transition-all duration-300">
                <kpi.icon className="h-5 w-5 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors duration-300">
                {kpi.value}
              </div>
              <div className="flex items-center space-x-2">
                {kpi.change && (
                  <div className={`flex items-center text-xs font-medium ${
                    kpi.trend === 'up' ? 'text-emerald-400' : 
                    kpi.trend === 'down' ? 'text-red-400' : 'text-slate-400'
                  }`}>
                    {kpi.trend === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> :
                     kpi.trend === 'down' ? <TrendingDown className="w-3 h-3 mr-1" /> : null}
                    {kpi.change}
                  </div>
                )}
                <span className="text-xs text-slate-400">{kpi.period}</span>
              </div>
              {kpi.title.includes('ICO') && kpi.title.includes('Sold') && (
                <div className="mt-3">
                  <div className="w-full bg-slate-700/50 rounded-full h-2.5 mb-2">
                    <div 
                      className="bg-gradient-to-r from-emerald-400 to-teal-500 h-2.5 rounded-full transition-all duration-1000 ease-out" 
                      style={{width: '13.5%'}}
                    ></div>
                  </div>
                  <span className="text-xs text-slate-400">13.5% Complete</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity Feed */}
      <Card className="glassmorphism border-emerald-800/30 hover:border-emerald-600/50 transition-all duration-500 animate-scale-in">
        <CardHeader className="flex flex-row items-center justify-between p-6">
          <div>
            <CardTitle className="text-2xl text-white mb-2 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Recent System Activity
            </CardTitle>
            <p className="text-slate-400">Latest platform interactions and transactions</p>
          </div>
          <Button 
            variant="outline" 
            className="border-emerald-600/50 text-emerald-400 hover:bg-emerald-600/20 hover:text-emerald-300 bg-transparent hover:scale-105 transition-all duration-300"
          >
            View All System Logs
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-hidden rounded-xl border border-emerald-800/30">
            <Table>
              <TableHeader>
                <TableRow className="border-emerald-800/30 bg-slate-800/30">
                  <TableHead className="text-slate-300 font-semibold">Timestamp</TableHead>
                  <TableHead className="text-slate-300 font-semibold">Action</TableHead>
                  <TableHead className="text-slate-300 font-semibold">User ID / Entity</TableHead>
                  <TableHead className="text-slate-300 font-semibold">Details</TableHead>
                  <TableHead className="text-slate-300 font-semibold">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivity.map((activity, index) => (
                  <TableRow 
                    key={index} 
                    className="border-emerald-800/20 hover:bg-slate-800/30 transition-all duration-300 hover:scale-[1.01]"
                  >
                    <TableCell className="text-slate-300 font-mono text-sm">{activity.timestamp}</TableCell>
                    <TableCell className="text-white font-medium">{activity.action}</TableCell>
                    <TableCell className="text-emerald-400 font-mono">{activity.entity}</TableCell>
                    <TableCell className="text-slate-300">{activity.details}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={activity.status === 'success' ? 'default' : 'secondary'}
                        className={`${
                          activity.status === 'success' 
                            ? 'bg-emerald-600/20 text-emerald-400 border-emerald-600/50' 
                            : 'bg-yellow-600/20 text-yellow-400 border-yellow-600/50'
                        } hover:scale-105 transition-transform duration-200`}
                      >
                        {activity.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Platform Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glassmorphism border-emerald-800/30 hover:border-emerald-600/50 transition-all duration-500 hover:scale-105 animate-scale-in">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
              <span>Platform Growth</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 rounded-lg bg-slate-800/30 border border-emerald-800/20 hover:border-emerald-600/50 transition-all duration-300">
                <span className="text-slate-300">Daily Active Users</span>
                <span className="text-emerald-400 font-bold">2,847</span>
              </div>
              <div className="flex justify-between items-center p-4 rounded-lg bg-slate-800/30 border border-emerald-800/20 hover:border-emerald-600/50 transition-all duration-300">
                <span className="text-slate-300">Weekly Growth</span>
                <span className="text-emerald-400 font-bold">+23.4%</span>
              </div>
              <div className="flex justify-between items-center p-4 rounded-lg bg-slate-800/30 border border-emerald-800/20 hover:border-emerald-600/50 transition-all duration-300">
                <span className="text-slate-300">Monthly Volume</span>
                <span className="text-emerald-400 font-bold">$2.1M</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glassmorphism border-emerald-800/30 hover:border-emerald-600/50 transition-all duration-500 hover:scale-105 animate-scale-in">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center space-x-2">
              <Coins className="h-5 w-5 text-emerald-400" />
              <span>Token Metrics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 rounded-lg bg-slate-800/30 border border-emerald-800/20 hover:border-emerald-600/50 transition-all duration-300">
                <span className="text-slate-300">Circulating Supply</span>
                <span className="text-emerald-400 font-bold">87.5M ASVO</span>
              </div>
              <div className="flex justify-between items-center p-4 rounded-lg bg-slate-800/30 border border-emerald-800/20 hover:border-emerald-600/50 transition-all duration-300">
                <span className="text-slate-300">Market Cap</span>
                <span className="text-emerald-400 font-bold">$4.2M</span>
              </div>
              <div className="flex justify-between items-center p-4 rounded-lg bg-slate-800/30 border border-emerald-800/20 hover:border-emerald-600/50 transition-all duration-300">
                <span className="text-slate-300">24h Trading Volume</span>
                <span className="text-emerald-400 font-bold">$156K</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
