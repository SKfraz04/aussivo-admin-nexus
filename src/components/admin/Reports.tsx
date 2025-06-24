import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  BarChart3, 
  Download, 
  Calendar,
  Users,
  Target,
  TrendingUp,
  DollarSign,
  MoreHorizontal,
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

export function Reports() {
  const [activeTab, setActiveTab] = useState('staking-reports');

  const stakingHistoryData = [
    {
      userId: 'USR_001',
      packageName: 'Core Validator',
      stakedAmount: '5,000 ASVO',
      startDate: '2024-04-15',
      endDate: '2024-10-15',
      apy: '12%',
      earnedASVO: '245.67 ASVO',
      claimedASVO: '120.00 ASVO',
      status: 'Active'
    },
    {
      userId: 'USR_002',
      packageName: 'Starter Tier',
      stakedAmount: '1,500 ASVO',
      startDate: '2024-05-01',
      endDate: '2024-08-01',
      apy: '8%',
      earnedASVO: '89.32 ASVO',
      claimedASVO: '89.32 ASVO',
      status: 'Completed'
    },
    {
      userId: 'USR_003',
      packageName: 'Premium Validator',
      stakedAmount: '12,000 ASVO',
      startDate: '2024-03-20',
      endDate: '2025-03-20',
      apy: '18%',
      earnedASVO: '658.43 ASVO',
      claimedASVO: '300.00 ASVO',
      status: 'Active'
    }
  ];

  const packagePerformanceData = [
    {
      packageName: 'Starter Tier',
      totalStaked: '2,450,000 ASVO',
      numStakers: 1547,
      avgAPY: '8.2%',
      totalRewards: '185,000 ASVO'
    },
    {
      packageName: 'Core Validator',
      totalStaked: '8,750,000 ASVO',
      numStakers: 892,
      avgAPY: '12.5%',
      totalRewards: '982,000 ASVO'
    },
    {
      packageName: 'Premium Validator',
      totalStaked: '15,200,000 ASVO',
      numStakers: 445,
      avgAPY: '18.7%',
      totalRewards: '2,234,000 ASVO'
    },
    {
      packageName: 'Elite Validator',
      totalStaked: '42,800,000 ASVO',
      numStakers: 127,
      avgAPY: '25.3%',
      totalRewards: '8,950,000 ASVO'
    }
  ];

  const predefinedReports = [
    {
      title: 'User Growth Report',
      description: 'Daily new users, active users, and total user count',
      icon: Users,
      format: 'CSV'
    },
    {
      title: 'ICO Sales Breakdown',
      description: 'Stage-wise ASVO sales and USD raised data',
      icon: DollarSign,
      format: 'CSV'
    },
    {
      title: 'Referral Program Performance',
      description: 'Referrer statistics and earnings breakdown',
      icon: Target,
      format: 'CSV'
    },
    {
      title: 'Transaction Volume Report',
      description: 'Daily deposit/withdrawal volumes and counts',
      icon: TrendingUp,
      format: 'CSV'
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      'Active': 'bg-green-900/20 text-green-400 border-green-600/30',
      'Completed': 'bg-blue-900/20 text-blue-400 border-blue-600/30',
      'Paused': 'bg-yellow-900/20 text-yellow-400 border-yellow-600/30'
    };
    return variants[status as keyof typeof variants] || variants.Active;
  };

  const tabs = [
    { id: 'staking-reports', label: 'Staking Reports', icon: Target },
    { id: 'general-analytics', label: 'General Analytics', icon: BarChart3 }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="glassmorphism p-6 rounded-xl border border-emerald-800/30">
        <h1 className="text-3xl font-bold text-white mb-2">Reports</h1>
        <p className="text-slate-300">Generate detailed reports and access comprehensive platform analytics.</p>
      </div>

      {/* Tab Navigation */}
      <div className="glassmorphism border border-emerald-800/30 rounded-xl">
        <div className="flex border-b border-emerald-800/30">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'text-white bg-emerald-600/20 border-b-2 border-emerald-400'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Staking History & Packages */}
          {activeTab === 'staking-reports' && (
            <div className="space-y-6">
              {/* Report Generation Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glassmorphism border-emerald-800/30">
                  <CardHeader>
                    <CardTitle className="text-white">Staking Activity Report</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-slate-300 text-sm font-medium">Start Date</label>
                        <Input type="date" className="mt-1 bg-slate-800/50 border-slate-600 text-white" />
                      </div>
                      <div>
                        <label className="text-slate-300 text-sm font-medium">End Date</label>
                        <Input type="date" className="mt-1 bg-slate-800/50 border-slate-600 text-white" />
                      </div>
                    </div>
                    <div>
                      <label className="text-slate-300 text-sm font-medium">Filter by Package</label>
                      <Select>
                        <SelectTrigger className="mt-1 bg-slate-800/50 border-slate-600 text-white">
                          <SelectValue placeholder="All Packages" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-600">
                          <SelectItem value="all">All Packages</SelectItem>
                          <SelectItem value="starter">Starter Tier</SelectItem>
                          <SelectItem value="core">Core Validator</SelectItem>
                          <SelectItem value="premium">Premium Validator</SelectItem>
                          <SelectItem value="elite">Elite Validator</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-slate-300 text-sm font-medium">User ID (Optional)</label>
                      <Input placeholder="Enter specific User ID" className="mt-1 bg-slate-800/50 border-slate-600 text-white" />
                    </div>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                      <Download className="w-4 h-4 mr-2" />
                      Generate Staking Report
                    </Button>
                  </CardContent>
                </Card>

                <Card className="glassmorphism border-emerald-800/30">
                  <CardHeader>
                    <CardTitle className="text-white">Package Performance Report</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-slate-300 text-sm font-medium">Select Package</label>
                      <Select>
                        <SelectTrigger className="mt-1 bg-slate-800/50 border-slate-600 text-white">
                          <SelectValue placeholder="All Packages" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-600">
                          <SelectItem value="all">All Packages</SelectItem>
                          <SelectItem value="starter">Starter Tier</SelectItem>
                          <SelectItem value="core">Core Validator</SelectItem>
                          <SelectItem value="premium">Premium Validator</SelectItem>
                          <SelectItem value="elite">Elite Validator</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-slate-300 text-sm font-medium">Start Date</label>
                        <Input type="date" className="mt-1 bg-slate-800/50 border-slate-600 text-white" />
                      </div>
                      <div>
                        <label className="text-slate-300 text-sm font-medium">End Date</label>
                        <Input type="date" className="mt-1 bg-slate-800/50 border-slate-600 text-white" />
                      </div>
                    </div>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                      <Download className="w-4 h-4 mr-2" />
                      Generate Performance Report
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Staking History Sample Data */}
              <Card className="glassmorphism border-emerald-800/30">
                <CardHeader>
                  <CardTitle className="text-white">Recent Staking Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-emerald-800/30">
                        <TableHead className="text-slate-300">User ID</TableHead>
                        <TableHead className="text-slate-300">Package</TableHead>
                        <TableHead className="text-slate-300">Staked Amount</TableHead>
                        <TableHead className="text-slate-300">Period</TableHead>
                        <TableHead className="text-slate-300">APY</TableHead>
                        <TableHead className="text-slate-300">Earned</TableHead>
                        <TableHead className="text-slate-300">Claimed</TableHead>
                        <TableHead className="text-slate-300">Status</TableHead>
                        <TableHead className="text-slate-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {stakingHistoryData.map((stake, index) => (
                        <TableRow key={index} className="border-emerald-800/20 hover:bg-slate-800/50">
                          <TableCell className="text-emerald-400 font-mono">{stake.userId}</TableCell>
                          <TableCell className="text-white">{stake.packageName}</TableCell>
                          <TableCell className="text-white font-medium">{stake.stakedAmount}</TableCell>
                          <TableCell className="text-slate-300">{stake.startDate} - {stake.endDate}</TableCell>
                          <TableCell className="text-emerald-400 font-bold">{stake.apy}</TableCell>
                          <TableCell className="text-green-400">{stake.earnedASVO}</TableCell>
                          <TableCell className="text-blue-400">{stake.claimedASVO}</TableCell>
                          <TableCell>
                            <Badge className={getStatusBadge(stake.status)}>
                              {stake.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-white">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-slate-800 border-slate-600">
                                <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-700">
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-700">
                                  <Download className="mr-2 h-4 w-4" />
                                  Export Record
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Package Performance Summary */}
              <Card className="glassmorphism border-emerald-800/30">
                <CardHeader>
                  <CardTitle className="text-white">Package Performance Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-emerald-800/30">
                        <TableHead className="text-slate-300">Package</TableHead>
                        <TableHead className="text-slate-300">Total Staked</TableHead>
                        <TableHead className="text-slate-300">Stakers</TableHead>
                        <TableHead className="text-slate-300">Avg APY</TableHead>
                        <TableHead className="text-slate-300">Total Rewards</TableHead>
                        <TableHead className="text-slate-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {packagePerformanceData.map((pkg, index) => (
                        <TableRow key={index} className="border-emerald-800/20 hover:bg-slate-800/50">
                          <TableCell className="text-white font-medium">{pkg.packageName}</TableCell>
                          <TableCell className="text-emerald-400">{pkg.totalStaked}</TableCell>
                          <TableCell className="text-white">{pkg.numStakers}</TableCell>
                          <TableCell className="text-emerald-400 font-bold">{pkg.avgAPY}</TableCell>
                          <TableCell className="text-green-400">{pkg.totalRewards}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-white">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-slate-800 border-slate-600">
                                <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-700">
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Analysis
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-700">
                                  <Download className="mr-2 h-4 w-4" />
                                  Export Data
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {/* General Analytics */}
          {activeTab === 'general-analytics' && (
            <div className="space-y-6">
              {/* Pre-defined Reports */}
              <Card className="glassmorphism border-emerald-800/30">
                <CardHeader>
                  <CardTitle className="text-white">Pre-defined Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {predefinedReports.map((report, index) => (
                      <div key={index} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-emerald-600/50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-emerald-600/20 rounded-lg">
                              <report.icon className="w-5 h-5 text-emerald-400" />
                            </div>
                            <div>
                              <h4 className="text-white font-medium">{report.title}</h4>
                              <p className="text-slate-400 text-sm mt-1">{report.description}</p>
                              <Badge className="mt-2 bg-blue-900/20 text-blue-400 border-blue-600/30">
                                {report.format}
                              </Badge>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-white">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-slate-800 border-slate-600">
                              <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-700">
                                <Download className="mr-2 h-4 w-4" />
                                Generate Report
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-700">
                                <Calendar className="mr-2 h-4 w-4" />
                                Schedule
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Custom Report Builder */}
              <Card className="glassmorphism border-emerald-800/30">
                <CardHeader>
                  <CardTitle className="text-white">Custom Report Builder</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-300 text-sm font-medium">Data Source</label>
                      <Select>
                        <SelectTrigger className="mt-1 bg-slate-800/50 border-slate-600 text-white">
                          <SelectValue placeholder="Select data source" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-600">
                          <SelectItem value="users">Users</SelectItem>
                          <SelectItem value="transactions">Transactions</SelectItem>
                          <SelectItem value="staking">Staking</SelectItem>
                          <SelectItem value="referrals">Referrals</SelectItem>
                          <SelectItem value="governance">Governance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-slate-300 text-sm font-medium">Output Format</label>
                      <Select>
                        <SelectTrigger className="mt-1 bg-slate-800/50 border-slate-600 text-white">
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-600">
                          <SelectItem value="csv">CSV</SelectItem>
                          <SelectItem value="json">JSON</SelectItem>
                          <SelectItem value="pdf">PDF</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-300 text-sm font-medium">Start Date</label>
                      <Input type="date" className="mt-1 bg-slate-800/50 border-slate-600 text-white" />
                    </div>
                    <div>
                      <label className="text-slate-300 text-sm font-medium">End Date</label>
                      <Input type="date" className="mt-1 bg-slate-800/50 border-slate-600 text-white" />
                    </div>
                  </div>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                    <Download className="w-4 h-4 mr-2" />
                    Generate Custom Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
