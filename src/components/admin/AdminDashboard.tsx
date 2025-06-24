
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  Activity,
  Wallet,
  Lock,
  EllipsisVertical
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
} from '@/components/ui/dropdown-menu';

export function AdminDashboard() {
  const recentActivity = [
    {
      id: 1,
      timestamp: '2025-06-24 14:55',
      action: 'New User Registration',
      entity: 'user_XYZ789',
      details: 'Email: user@example.com'
    },
    {
      id: 2,
      timestamp: '2025-06-24 14:50',
      action: 'Deposit Confirmed',
      entity: 'user_ABC123',
      details: '1000 USDT (BEP20)'
    },
    {
      id: 3,
      timestamp: '2025-06-24 14:40',
      action: 'Staking Package Created',
      entity: 'user_DEF456',
      details: 'Core Validator Tier (5000 ASVO)'
    },
    {
      id: 4,
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
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-slate-300">Overview of the Aussivo ecosystem's key metrics and operational status.</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="border-emerald-600 text-emerald-400 hover:bg-emerald-600 hover:text-white">
                <EllipsisVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-slate-800 border-slate-600">
              <DropdownMenuItem className="text-white hover:bg-slate-700">Export Dashboard Data</DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-slate-700">Refresh All Metrics</DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-slate-700">Dashboard Settings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glassmorphism border-emerald-800/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-emerald-600/20 rounded-lg">
                  <Users className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">15,432</p>
                  <p className="text-slate-300 text-sm">Total Users</p>
                  <p className="text-emerald-400 text-xs">+5.2% (24h)</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                    <EllipsisVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-slate-800 border-slate-600">
                  <DropdownMenuItem className="text-white hover:bg-slate-700">View Details</DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:bg-slate-700">Export Data</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>

        <Card className="glassmorphism border-emerald-800/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-600/20 rounded-lg">
                  <Lock className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">75,000,000</p>
                  <p className="text-slate-300 text-sm">ASVO Staked</p>
                  <p className="text-blue-400 text-xs">+2.8% (24h)</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                    <EllipsisVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-slate-800 border-slate-600">
                  <DropdownMenuItem className="text-white hover:bg-slate-700">View Staking Details</DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:bg-slate-700">Export Staking Data</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>

        <Card className="glassmorphism border-emerald-800/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-600/20 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">$3,750,000</p>
                  <p className="text-slate-300 text-sm">Total Value Locked</p>
                  <p className="text-green-400 text-xs">+8.1% (7d)</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                    <EllipsisVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-slate-800 border-slate-600">
                  <DropdownMenuItem className="text-white hover:bg-slate-700">TVL Breakdown</DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:bg-slate-700">Historical Data</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>

        <Card className="glassmorphism border-emerald-800/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-600/20 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">$825,000</p>
                  <p className="text-slate-300 text-sm">ICO Funds Raised</p>
                  <p className="text-purple-400 text-xs">13.5% Complete</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                    <EllipsisVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-slate-800 border-slate-600">
                  <DropdownMenuItem className="text-white hover:bg-slate-700">ICO Details</DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:bg-slate-700">Sales Report</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="glassmorphism border-emerald-800/30">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Recent System Activity
            </CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="border-emerald-600 text-emerald-400 hover:bg-emerald-600 hover:text-white">
                  <EllipsisVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-slate-800 border-slate-600">
                <DropdownMenuItem className="text-white hover:bg-slate-700">View All Logs</DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-slate-700">Filter Activity</DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-slate-700">Export Activity Log</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-emerald-800/30">
                  <TableHead className="text-slate-300">Timestamp</TableHead>
                  <TableHead className="text-slate-300">Action</TableHead>
                  <TableHead className="text-slate-300">Entity</TableHead>
                  <TableHead className="text-slate-300">Details</TableHead>
                  <TableHead className="text-slate-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivity.map((activity) => (
                  <TableRow key={activity.id} className="border-emerald-800/20 hover:bg-slate-800/50">
                    <TableCell className="text-slate-300">{activity.timestamp}</TableCell>
                    <TableCell className="text-white">{activity.action}</TableCell>
                    <TableCell className="text-emerald-400 font-mono">{activity.entity}</TableCell>
                    <TableCell className="text-slate-300">{activity.details}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                            <EllipsisVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-slate-800 border-slate-600">
                          <DropdownMenuItem className="text-white hover:bg-slate-700">View Details</DropdownMenuItem>
                          <DropdownMenuItem className="text-white hover:bg-slate-700">View User Profile</DropdownMenuItem>
                          <DropdownMenuItem className="text-white hover:bg-slate-700">Related Transactions</DropdownMenuItem>
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

      {/* System Health */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glassmorphism border-emerald-800/30">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                System Health
              </CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                    <EllipsisVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-slate-800 border-slate-600">
                  <DropdownMenuItem className="text-white hover:bg-slate-700">Run System Check</DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:bg-slate-700">View Health History</DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:bg-slate-700">Configure Alerts</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">API Status</span>
                <Badge className="bg-green-900/20 text-green-400 border-green-600/30">🟢 Online</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Blockchain Sync</span>
                <Badge className="bg-green-900/20 text-green-400 border-green-600/30">🟢 Synced</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Database Status</span>
                <Badge className="bg-green-900/20 text-green-400 border-green-600/30">🟢 OK</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glassmorphism border-emerald-800/30">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-white flex items-center gap-2">
                <Wallet className="w-5 h-5" />
                Pending Transactions
              </CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                    <EllipsisVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-slate-800 border-slate-600">
                  <DropdownMenuItem className="text-white hover:bg-slate-700">Process All</DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:bg-slate-700">View Queue</DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:bg-slate-700">Auto-Process Settings</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Pending Deposits</span>
                <Badge className="bg-yellow-900/20 text-yellow-400 border-yellow-600/30">5</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Pending Withdrawals</span>
                <Badge className="bg-orange-900/20 text-orange-400 border-orange-600/30">2</Badge>
              </div>
              <Button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700">
                Review Pending
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
