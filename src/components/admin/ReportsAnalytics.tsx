
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PieChart, BarChart, TrendingUp, DollarSign, Users, Target, Download, Calendar } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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

        <TabsContent value="user-analytics" className="mt-6">
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">User Analytics</h3>
            <p className="text-slate-400">Detailed user analytics and growth metrics will be displayed here</p>
          </div>
        </TabsContent>

        <TabsContent value="staking-analytics" className="mt-6">
          <div className="text-center py-12">
            <Target className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">Staking Analytics</h3>
            <p className="text-slate-400">Comprehensive staking performance and package analytics will be displayed here</p>
          </div>
        </TabsContent>

        <TabsContent value="referral-analytics" className="mt-6">
          <div className="text-center py-12">
            <TrendingUp className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">Referral Analytics</h3>
            <p className="text-slate-400">Detailed referral network analysis and performance metrics will be displayed here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
