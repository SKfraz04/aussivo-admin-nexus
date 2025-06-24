import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PieChart, BarChart, TrendingUp, DollarSign, Users, Target, Download, Calendar, Activity, UserPlus, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useState } from 'react';

export function ReportsAnalytics() {
  const [activeTab, setActiveTab] = useState('overview');

  const availableReports = [
    {
      title: 'User Registration Report',
      description: 'Detailed analysis of user growth and registrations',
      icon: Users
    },
    {
      title: 'Staking Performance Report',
      description: 'Analysis of staking packages and user behavior',
      icon: Target
    },
    {
      title: 'Referral Network Report',
      description: 'Detailed breakdown of referral performance',
      icon: TrendingUp
    },
    {
      title: 'Financial Performance Report',
      description: 'Revenue, rewards, and token economics analysis',
      icon: DollarSign
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glassmorphism p-6 rounded-xl border border-emerald-800/30">
        <h1 className="text-3xl font-bold text-white mb-2">Reports & Analytics</h1>
        <p className="text-slate-300">Generate comprehensive platform reports and analytics</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Select>
            <SelectTrigger className="w-48 bg-slate-800/50 border-slate-600 text-white">
              <SelectValue placeholder="Last 30 Days" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
          <TabsTrigger value="overview" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-emerald-600">Overview</TabsTrigger>
          <TabsTrigger value="user-analytics" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-emerald-600">User Analytics</TabsTrigger>
          <TabsTrigger value="staking-analytics" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-emerald-600">Staking Analytics</TabsTrigger>
          <TabsTrigger value="referral-analytics" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-emerald-600">Referral Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="glassmorphism border-emerald-800/30">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-emerald-600/20 rounded-lg">
                    <Users className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">+12%</p>
                    <p className="text-slate-300 text-sm">User Growth</p>
                    <p className="text-slate-400 text-xs">vs. previous period</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glassmorphism border-emerald-800/30">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-emerald-600/20 rounded-lg">
                    <DollarSign className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">$4.5M</p>
                    <p className="text-slate-300 text-sm">Total Volume</p>
                    <p className="text-slate-400 text-xs">+18% vs. previous period</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glassmorphism border-emerald-800/30">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-emerald-600/20 rounded-lg">
                    <Target className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">358</p>
                    <p className="text-slate-300 text-sm">New Stakes</p>
                    <p className="text-slate-400 text-xs">+8% vs. previous period</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glassmorphism border-emerald-800/30">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-emerald-600/20 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">42%</p>
                    <p className="text-slate-300 text-sm">Conversion Rate</p>
                    <p className="text-slate-400 text-xs">+5% vs. previous period</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="glassmorphism border-emerald-800/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart className="w-5 h-5 text-emerald-400" />
                  Platform Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-slate-800/30 rounded-lg">
                  <p className="text-slate-400">Platform growth chart would be displayed here, showing users, stakes, and volume over time</p>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism border-emerald-800/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-emerald-400" />
                  Package Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-slate-800/30 rounded-lg">
                  <p className="text-slate-400">Pie chart showing distribution of stakes across different packages</p>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism border-emerald-800/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart className="w-5 h-5 text-emerald-400" />
                  Revenue & Rewards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-slate-800/30 rounded-lg">
                  <p className="text-slate-400">Bar chart showing platform revenue and distributed rewards over time</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glassmorphism border-emerald-800/30">
            <CardHeader>
              <CardTitle className="text-white">Available Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableReports.map((report, index) => (
                  <div key={index} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-emerald-600/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-emerald-600/20 rounded-lg">
                          <report.icon className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{report.title}</h4>
                          <p className="text-slate-400 text-sm mt-1">{report.description}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="border-emerald-600/50 text-emerald-400 hover:bg-emerald-600/20 hover:text-emerald-300 bg-transparent">
                        <Download className="w-4 h-4 mr-1" />
                        Export
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="user-analytics" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="glassmorphism border-emerald-800/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300 text-sm">Total Users</p>
                    <p className="text-3xl font-bold text-white">15,742</p>
                    <div className="flex items-center mt-2">
                      <ArrowUpRight className="w-4 h-4 text-emerald-400 mr-1" />
                      <span className="text-emerald-400 text-sm">+12% this month</span>
                    </div>
                  </div>
                  <div className="p-3 bg-emerald-600/20 rounded-lg">
                    <Users className="w-8 h-8 text-emerald-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism border-emerald-800/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300 text-sm">New Registrations</p>
                    <p className="text-3xl font-bold text-white">1,284</p>
                    <div className="flex items-center mt-2">
                      <ArrowUpRight className="w-4 h-4 text-emerald-400 mr-1" />
                      <span className="text-emerald-400 text-sm">+8% this week</span>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-600/20 rounded-lg">
                    <UserPlus className="w-8 h-8 text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism border-emerald-800/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300 text-sm">Active Users (30d)</p>
                    <p className="text-3xl font-bold text-white">12,897</p>
                    <div className="flex items-center mt-2">
                      <ArrowUpRight className="w-4 h-4 text-emerald-400 mr-1" />
                      <span className="text-emerald-400 text-sm">+5% vs last month</span>
                    </div>
                  </div>
                  <div className="p-3 bg-purple-600/20 rounded-lg">
                    <Activity className="w-8 h-8 text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism border-emerald-800/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300 text-sm">User Retention</p>
                    <p className="text-3xl font-bold text-white">78%</p>
                    <div className="flex items-center mt-2">
                      <ArrowDownRight className="w-4 h-4 text-red-400 mr-1" />
                      <span className="text-red-400 text-sm">-2% vs last month</span>
                    </div>
                  </div>
                  <div className="p-3 bg-orange-600/20 rounded-lg">
                    <TrendingUp className="w-8 h-8 text-orange-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glassmorphism border-emerald-800/30">
              <CardHeader>
                <CardTitle className="text-white">User Growth Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-slate-800/30 rounded-lg">
                  <p className="text-slate-400">User growth chart showing daily/weekly/monthly registrations</p>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism border-emerald-800/30">
              <CardHeader>
                <CardTitle className="text-white">User Activity Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-slate-800/30 rounded-lg">
                  <p className="text-slate-400">Activity distribution chart showing user engagement levels</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glassmorphism border-emerald-800/30">
            <CardHeader>
              <CardTitle className="text-white">Recent User Registrations</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-300">Date</TableHead>
                    <TableHead className="text-slate-300">Wallet Address</TableHead>
                    <TableHead className="text-slate-300">Registration Source</TableHead>
                    <TableHead className="text-slate-300">Status</TableHead>
                    <TableHead className="text-slate-300">Activity Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-slate-700">
                    <TableCell className="text-white">2023-11-24</TableCell>
                    <TableCell className="text-slate-300 font-mono">0x7Fc6...DaE9</TableCell>
                    <TableCell className="text-slate-300">Direct</TableCell>
                    <TableCell><span className="text-emerald-400 bg-emerald-400/20 px-2 py-1 rounded text-xs">Active</span></TableCell>
                    <TableCell className="text-white">85%</TableCell>
                  </TableRow>
                  <TableRow className="border-slate-700">
                    <TableCell className="text-white">2023-11-24</TableCell>
                    <TableCell className="text-slate-300 font-mono">0x1f98...F984</TableCell>
                    <TableCell className="text-slate-300">Referral</TableCell>
                    <TableCell><span className="text-emerald-400 bg-emerald-400/20 px-2 py-1 rounded text-xs">Active</span></TableCell>
                    <TableCell className="text-white">92%</TableCell>
                  </TableRow>
                  <TableRow className="border-slate-700">
                    <TableCell className="text-white">2023-11-23</TableCell>
                    <TableCell className="text-slate-300 font-mono">0xA0b8...eB48</TableCell>
                    <TableCell className="text-slate-300">Direct</TableCell>
                    <TableCell><span className="text-yellow-400 bg-yellow-400/20 px-2 py-1 rounded text-xs">Inactive</span></TableCell>
                    <TableCell className="text-white">23%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staking-analytics" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="glassmorphism border-emerald-800/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300 text-sm">Total Staked</p>
                    <p className="text-3xl font-bold text-white">225.21M</p>
                    <p className="text-slate-400 text-sm">SVR Tokens</p>
                  </div>
                  <div className="p-3 bg-emerald-600/20 rounded-lg">
                    <Target className="w-8 h-8 text-emerald-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism border-emerald-800/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300 text-sm">Active Stakes</p>
                    <p className="text-3xl font-bold text-white">2,762</p>
                    <div className="flex items-center mt-2">
                      <ArrowUpRight className="w-4 h-4 text-emerald-400 mr-1" />
                      <span className="text-emerald-400 text-sm">+8% this month</span>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-600/20 rounded-lg">
                    <Activity className="w-8 h-8 text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism border-emerald-800/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300 text-sm">Avg Lock Period</p>
                    <p className="text-3xl font-bold text-white">127</p>
                    <p className="text-slate-400 text-sm">Days</p>
                  </div>
                  <div className="p-3 bg-purple-600/20 rounded-lg">
                    <Calendar className="w-8 h-8 text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism border-emerald-800/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300 text-sm">Renewal Rate</p>
                    <p className="text-3xl font-bold text-white">68%</p>
                    <div className="flex items-center mt-2">
                      <ArrowUpRight className="w-4 h-4 text-emerald-400 mr-1" />
                      <span className="text-emerald-400 text-sm">+3% vs last quarter</span>
                    </div>
                  </div>
                  <div className="p-3 bg-orange-600/20 rounded-lg">
                    <TrendingUp className="w-8 h-8 text-orange-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glassmorphism border-emerald-800/30">
              <CardHeader>
                <CardTitle className="text-white">Package Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Core Validator</p>
                      <p className="text-slate-400 text-sm">9% APY</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">3.85M SVR</p>
                      <p className="text-emerald-400 text-sm">7 users</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Edge Power Node</p>
                      <p className="text-slate-400 text-sm">7.5% APY</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">35.68M SVR</p>
                      <p className="text-emerald-400 text-sm">89 users</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Data Streamer</p>
                      <p className="text-slate-400 text-sm">6.5% APY</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">108.45M SVR</p>
                      <p className="text-emerald-400 text-sm">542 users</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism border-emerald-800/30">
              <CardHeader>
                <CardTitle className="text-white">Staking Volume Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-slate-800/30 rounded-lg">
                  <p className="text-slate-400">Chart showing staking volume over time by package type</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glassmorphism border-emerald-800/30">
            <CardHeader>
              <CardTitle className="text-white">Top Stakers</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-300">Rank</TableHead>
                    <TableHead className="text-slate-300">Wallet Address</TableHead>
                    <TableHead className="text-slate-300">Package</TableHead>
                    <TableHead className="text-slate-300">Staked Amount</TableHead>
                    <TableHead className="text-slate-300">Earnings</TableHead>
                    <TableHead className="text-slate-300">Duration</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-slate-700">
                    <TableCell className="text-emerald-400 font-bold">1</TableCell>
                    <TableCell className="text-slate-300 font-mono">0x7Fc6...DaE9</TableCell>
                    <TableCell className="text-white">Core Validator</TableCell>
                    <TableCell className="text-white font-bold">500,000 SVR</TableCell>
                    <TableCell className="text-emerald-400">7,500 SVR</TableCell>
                    <TableCell className="text-slate-300">365 days</TableCell>
                  </TableRow>
                  <TableRow className="border-slate-700">
                    <TableCell className="text-emerald-400 font-bold">2</TableCell>
                    <TableCell className="text-slate-300 font-mono">0x1f98...F984</TableCell>
                    <TableCell className="text-white">Edge Power Node</TableCell>
                    <TableCell className="text-white font-bold">350,000 SVR</TableCell>
                    <TableCell className="text-emerald-400">4,375 SVR</TableCell>
                    <TableCell className="text-slate-300">180 days</TableCell>
                  </TableRow>
                  <TableRow className="border-slate-700">
                    <TableCell className="text-emerald-400 font-bold">3</TableCell>
                    <TableCell className="text-slate-300 font-mono">0xA0b8...eB48</TableCell>
                    <TableCell className="text-white">Data Streamer</TableCell>
                    <TableCell className="text-white font-bold">120,000 SVR</TableCell>
                    <TableCell className="text-emerald-400">1,950 SVR</TableCell>
                    <TableCell className="text-slate-300">90 days</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="referral-analytics" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="glassmorphism border-emerald-800/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300 text-sm">Total Referrals</p>
                    <p className="text-3xl font-bold text-white">4,287</p>
                    <div className="flex items-center mt-2">
                      <ArrowUpRight className="w-4 h-4 text-emerald-400 mr-1" />
                      <span className="text-emerald-400 text-sm">+15% this month</span>
                    </div>
                  </div>
                  <div className="p-3 bg-emerald-600/20 rounded-lg">
                    <Users className="w-8 h-8 text-emerald-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism border-emerald-800/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300 text-sm">Active Referrers</p>
                    <p className="text-3xl font-bold text-white">1,542</p>
                    <div className="flex items-center mt-2">
                      <ArrowUpRight className="w-4 h-4 text-emerald-400 mr-1" />
                      <span className="text-emerald-400 text-sm">+12% this month</span>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-600/20 rounded-lg">
                    <TrendingUp className="w-8 h-8 text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism border-emerald-800/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300 text-sm">Conversion Rate</p>
                    <p className="text-3xl font-bold text-white">28%</p>
                    <div className="flex items-center mt-2">
                      <ArrowUpRight className="w-4 h-4 text-emerald-400 mr-1" />
                      <span className="text-emerald-400 text-sm">+3% vs last month</span>
                    </div>
                  </div>
                  <div className="p-3 bg-purple-600/20 rounded-lg">
                    <Target className="w-8 h-8 text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism border-emerald-800/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300 text-sm">Rewards Paid</p>
                    <p className="text-3xl font-bold text-white">854K</p>
                    <p className="text-slate-400 text-sm">SVR Tokens</p>
                  </div>
                  <div className="p-3 bg-orange-600/20 rounded-lg">
                    <DollarSign className="w-8 h-8 text-orange-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glassmorphism border-emerald-800/30">
              <CardHeader>
                <CardTitle className="text-white">Referral Network Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-slate-800/30 rounded-lg">
                  <p className="text-slate-400">Network growth chart showing referral expansion over time</p>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism border-emerald-800/30">
              <CardHeader>
                <CardTitle className="text-white">Referral Source Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Direct Links</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div className="w-16 h-full bg-emerald-500 rounded-full"></div>
                      </div>
                      <span className="text-white text-sm">67%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Social Media</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div className="w-8 h-full bg-blue-500 rounded-full"></div>
                      </div>
                      <span className="text-white text-sm">33%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glassmorphism border-emerald-800/30">
            <CardHeader>
              <CardTitle className="text-white">Top Referrers</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-300">Rank</TableHead>
                    <TableHead className="text-slate-300">Referrer</TableHead>
                    <TableHead className="text-slate-300">Total Referrals</TableHead>
                    <TableHead className="text-slate-300">Successful Conversions</TableHead>
                    <TableHead className="text-slate-300">Rewards Earned</TableHead>
                    <TableHead className="text-slate-300">Network Level</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-slate-700">
                    <TableCell className="text-emerald-400 font-bold">1</TableCell>
                    <TableCell className="text-slate-300 font-mono">0x7Fc6...DaE9</TableCell>
                    <TableCell className="text-white">287</TableCell>
                    <TableCell className="text-emerald-400">198</TableCell>
                    <TableCell className="text-white font-bold">45,000 SVR</TableCell>
                    <TableCell><span className="text-yellow-400 bg-yellow-400/20 px-2 py-1 rounded text-xs">Gold</span></TableCell>
                  </TableRow>
                  <TableRow className="border-slate-700">
                    <TableCell className="text-emerald-400 font-bold">2</TableCell>
                    <TableCell className="text-slate-300 font-mono">0x1f98...F984</TableCell>
                    <TableCell className="text-white">234</TableCell>
                    <TableCell className="text-emerald-400">165</TableCell>
                    <TableCell className="text-white font-bold">38,500 SVR</TableCell>
                    <TableCell><span className="text-gray-400 bg-gray-400/20 px-2 py-1 rounded text-xs">Silver</span></TableCell>
                  </TableRow>
                  <TableRow className="border-slate-700">
                    <TableCell className="text-emerald-400 font-bold">3</TableCell>
                    <TableCell className="text-slate-300 font-mono">0xA0b8...eB48</TableCell>
                    <TableCell className="text-white">198</TableCell>
                    <TableCell className="text-emerald-400">142</TableCell>
                    <TableCell className="text-white font-bold">32,000 SVR</TableCell>
                    <TableCell><span className="text-orange-400 bg-orange-400/20 px-2 py-1 rounded text-xs">Bronze</span></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
