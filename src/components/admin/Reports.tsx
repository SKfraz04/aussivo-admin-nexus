
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Download, 
  Calendar,
  Users,
  TrendingUp,
  Package,
  Target,
  FileText,
  EllipsisVertical
} from 'lucide-react';
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Reports() {
  const [activeTab, setActiveTab] = useState('staking');

  const predefinedReports = [
    {
      title: 'User Growth Report',
      description: 'Track new user registrations and engagement metrics',
      icon: Users,
      color: 'bg-blue-600/20 text-blue-400'
    },
    {
      title: 'ICO Sales Breakdown',
      description: 'Detailed analysis of token sales by stage and timeline',
      icon: Target,
      color: 'bg-purple-600/20 text-purple-400'
    },
    {
      title: 'Referral Performance',
      description: 'Commission payouts and referral network analysis',
      icon: TrendingUp,
      color: 'bg-green-600/20 text-green-400'
    },
    {
      title: 'Transaction Volume',
      description: 'Deposit and withdrawal activity over time',
      icon: BarChart3,
      color: 'bg-orange-600/20 text-orange-400'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="glassmorphism p-6 rounded-xl border border-emerald-800/30">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Reports & Analytics</h1>
            <p className="text-slate-300">Generate comprehensive reports and analyze platform performance.</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="border-emerald-600 text-emerald-400 hover:bg-emerald-600 hover:text-white">
                <EllipsisVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-slate-800 border-slate-600">
              <DropdownMenuItem className="text-white hover:bg-slate-700">Scheduled Reports</DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-slate-700">Report Templates</DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-slate-700">Export Settings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-4">
        <Button 
          variant={activeTab === 'staking' ? 'default' : 'outline'}
          onClick={() => setActiveTab('staking')}
          className={activeTab === 'staking' ? 'bg-emerald-600 hover:bg-emerald-700' : 'border-emerald-600 text-emerald-400 hover:bg-emerald-600 hover:text-white'}
        >
          <Package className="w-4 h-4 mr-2" />
          Staking Reports
        </Button>
        <Button 
          variant={activeTab === 'analytics' ? 'default' : 'outline'}
          onClick={() => setActiveTab('analytics')}
          className={activeTab === 'analytics' ? 'bg-emerald-600 hover:bg-emerald-700' : 'border-emerald-600 text-emerald-400 hover:bg-emerald-600 hover:text-white'}
        >
          <BarChart3 className="w-4 h-4 mr-2" />
          General Analytics
        </Button>
      </div>

      {/* Staking Reports */}
      {activeTab === 'staking' && (
        <div className="space-y-6">
          {/* Staking Report Generation */}
          <Card className="glassmorphism border-emerald-800/30">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-white flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Staking Activity Reports
                </CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="border-emerald-600 text-emerald-400 hover:bg-emerald-600 hover:text-white">
                      <EllipsisVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-slate-800 border-slate-600">
                    <DropdownMenuItem className="text-white hover:bg-slate-700">Save Report Template</DropdownMenuItem>
                    <DropdownMenuItem className="text-white hover:bg-slate-700">Schedule Report</DropdownMenuItem>
                    <DropdownMenuItem className="text-white hover:bg-slate-700">Report History</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-slate-300">Start Date</Label>
                  <Input type="date" className="bg-slate-800/50 border-slate-600 text-white" />
                </div>
                <div>
                  <Label className="text-slate-300">End Date</Label>
                  <Input type="date" className="bg-slate-800/50 border-slate-600 text-white" />
                </div>
                <div>
                  <Label className="text-slate-300">Staking Package</Label>
                  <Select>
                    <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                      <SelectValue placeholder="All Packages" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="all">All Packages</SelectItem>
                      <SelectItem value="starter">Starter Tier</SelectItem>
                      <SelectItem value="core">Core Validator</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">Filter by User ID (Optional)</Label>
                  <Input className="bg-slate-800/50 border-slate-600 text-white" placeholder="Enter User ID" />
                </div>
                <div>
                  <Label className="text-slate-300">Export Format</Label>
                  <Select>
                    <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                      <SelectValue placeholder="CSV" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Download className="w-4 h-4 mr-2" />
                Generate Staking Report
              </Button>
            </CardContent>
          </Card>

          {/* Package Performance */}
          <Card className="glassmorphism border-emerald-800/30">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Package Performance Reports
                </CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="border-emerald-600 text-emerald-400 hover:bg-emerald-600 hover:text-white">
                      <EllipsisVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-slate-800 border-slate-600">
                    <DropdownMenuItem className="text-white hover:bg-slate-700">Performance Trends</DropdownMenuItem>
                    <DropdownMenuItem className="text-white hover:bg-slate-700">Comparative Analysis</DropdownMenuItem>
                    <DropdownMenuItem className="text-white hover:bg-slate-700">Export Dashboard</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">Package Filter</Label>
                  <Select>
                    <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                      <SelectValue placeholder="All Packages" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="all">All Packages</SelectItem>
                      <SelectItem value="starter">Starter Tier</SelectItem>
                      <SelectItem value="core">Core Validator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-slate-300">Date Range</Label>
                  <Select>
                    <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                      <SelectValue placeholder="Last 30 Days" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="7d">Last 7 Days</SelectItem>
                      <SelectItem value="30d">Last 30 Days</SelectItem>
                      <SelectItem value="90d">Last 90 Days</SelectItem>
                      <SelectItem value="1y">Last Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Download className="w-4 h-4 mr-2" />
                Generate Package Performance Report
              </Button>
            </CardContent>
          </Card>

          {/* Staking Visualizations */}
          <Card className="glassmorphism border-emerald-800/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Staking Visualizations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-slate-800/50 rounded-lg text-center">
                  <BarChart3 className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                  <h3 className="text-white font-medium mb-2">Staked ASVO Over Time</h3>
                  <p className="text-slate-400 text-sm">Line chart showing staking growth trends</p>
                </div>
                <div className="p-6 bg-slate-800/50 rounded-lg text-center">
                  <Package className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-white font-medium mb-2">ASVO Distribution by Package</h3>
                  <p className="text-slate-400 text-sm">Pie chart of package allocation</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* General Analytics */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Pre-defined Reports */}
          <Card className="glassmorphism border-emerald-800/30">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Pre-defined Reports
                </CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="border-emerald-600 text-emerald-400 hover:bg-emerald-600 hover:text-white">
                      <EllipsisVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-slate-800 border-slate-600">
                    <DropdownMenuItem className="text-white hover:bg-slate-700">Download All Reports</DropdownMenuItem>
                    <DropdownMenuItem className="text-white hover:bg-slate-700">Schedule Reports</DropdownMenuItem>
                    <DropdownMenuItem className="text-white hover:bg-slate-700">Report Settings</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {predefinedReports.map((report, index) => (
                  <div key={index} className="p-6 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-emerald-600/50 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg ${report.color}`}>
                        <report.icon className="w-6 h-6" />
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                            <EllipsisVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-slate-800 border-slate-600">
                          <DropdownMenuItem className="text-white hover:bg-slate-700">
                            <Download className="w-4 h-4 mr-2" />
                            Download CSV
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-white hover:bg-slate-700">Download PDF</DropdownMenuItem>
                          <DropdownMenuItem className="text-white hover:bg-slate-700">Schedule Report</DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-slate-600" />
                          <DropdownMenuItem className="text-white hover:bg-slate-700">Customize Report</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <h3 className="text-white font-medium mb-2">{report.title}</h3>
                    <p className="text-slate-400 text-sm mb-4">{report.description}</p>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                      <Download className="w-4 h-4 mr-2" />
                      Generate Report
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Custom Report Builder */}
          <Card className="glassmorphism border-emerald-800/30">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Custom Report Builder
                </CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="border-emerald-600 text-emerald-400 hover:bg-emerald-600 hover:text-white">
                      <EllipsisVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-slate-800 border-slate-600">
                    <DropdownMenuItem className="text-white hover:bg-slate-700">Load Template</DropdownMenuItem>
                    <DropdownMenuItem className="text-white hover:bg-slate-700">Save as Template</DropdownMenuItem>
                    <DropdownMenuItem className="text-white hover:bg-slate-700">Clear All</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">Data Source</Label>
                  <Select>
                    <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                      <SelectValue placeholder="Select data source" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="users">Users</SelectItem>
                      <SelectItem value="wallets">Wallets</SelectItem>
                      <SelectItem value="transactions">Transactions</SelectItem>
                      <SelectItem value="staking">Staking</SelectItem>
                      <SelectItem value="referrals">Referrals</SelectItem>
                      <SelectItem value="governance">Governance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-slate-300">Output Format</Label>
                  <Select>
                    <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">Date Range Start</Label>
                  <Input type="date" className="bg-slate-800/50 border-slate-600 text-white" />
                </div>
                <div>
                  <Label className="text-slate-300">Date Range End</Label>
                  <Input type="date" className="bg-slate-800/50 border-slate-600 text-white" />
                </div>
              </div>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Download className="w-4 h-4 mr-2" />
                Generate Custom Report
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
