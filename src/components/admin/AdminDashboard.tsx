
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
  AlertCircle,
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
      details: 'Email: user@example.com'
    },
    {
      timestamp: '2025-06-24 14:50',
      action: 'Deposit Confirmed',
      entity: 'user_ABC123',
      details: '1000 USDT (BEP20)'
    },
    {
      timestamp: '2025-06-24 14:40',
      action: 'Staking Package Created',
      entity: 'user_DEF456',
      details: 'Core Validator Tier (5000 ASVO)'
    },
    {
      timestamp: '2025-06-24 14:30',
      action: 'ASVO Claimed',
      entity: 'user_GHI789',
      details: '45.75 ASVO'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="glassmorphism p-6 rounded-xl border border-emerald-800/30">
        <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-slate-300">Overview of the Aussivo ecosystem's key metrics and operational status.</p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="glassmorphism border-emerald-800/30 hover:border-emerald-600/50 transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">
                {kpi.title}
              </CardTitle>
              <kpi.icon className="h-4 w-4 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white mb-1">{kpi.value}</div>
              <div className="flex items-center space-x-2">
                {kpi.change && (
                  <div className={`flex items-center text-xs ${
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
                <div className="mt-2">
                  <div className="w-full bg-slate-700/50 rounded-full h-2">
                    <div className="bg-gradient-to-r from-emerald-400 to-teal-500 h-2 rounded-full" style={{width: '13.5%'}}></div>
                  </div>
                  <span className="text-xs text-slate-400 mt-1">13.5% Complete</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity Feed */}
      <Card className="glassmorphism border-emerald-800/30">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl text-white">Recent System Activity</CardTitle>
          <Button variant="outline" className="border-emerald-600/50 text-emerald-400 hover:bg-emerald-600/20 hover:text-emerald-300 bg-transparent">
            View All System Logs
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-emerald-800/30">
                <TableHead className="text-slate-300">Timestamp</TableHead>
                <TableHead className="text-slate-300">Action</TableHead>
                <TableHead className="text-slate-300">User ID / Entity</TableHead>
                <TableHead className="text-slate-300">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivity.map((activity, index) => (
                <TableRow key={index} className="border-emerald-800/20 hover:bg-slate-800/30">
                  <TableCell className="text-slate-300">{activity.timestamp}</TableCell>
                  <TableCell className="text-white">{activity.action}</TableCell>
                  <TableCell className="text-emerald-400">{activity.entity}</TableCell>
                  <TableCell className="text-slate-300">{activity.details}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* System Health & Alerts */}
      <Card className="glassmorphism border-emerald-800/30">
        <CardHeader>
          <CardTitle className="text-xl text-white">System Health</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-800/30 border border-emerald-800/20">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <div>
                <p className="text-white font-medium">API Status</p>
                <p className="text-emerald-400 text-sm">Online</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-800/30 border border-emerald-800/20">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <div>
                <p className="text-white font-medium">Blockchain Sync</p>
                <p className="text-emerald-400 text-sm">Synced</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-800/30 border border-emerald-800/20">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <div>
                <p className="text-white font-medium">Database Status</p>
                <p className="text-emerald-400 text-sm">OK</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-white font-medium">Recent Alerts</h4>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-emerald-900/10 border border-emerald-600/30 backdrop-blur-sm">
              <AlertCircle className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-300">High number of failed deposit attempts detected</span>
              <Badge variant="outline" className="ml-auto border-emerald-600/50 text-emerald-400 bg-transparent">
                2 hours ago
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
