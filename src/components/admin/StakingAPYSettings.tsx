
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Percent, 
  Calendar, 
  TrendingUp, 
  Coins,
  Settings,
  BarChart3,
  DollarSign,
  Clock,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function StakingAPYSettings() {
  const stakingPackages = [
    {
      name: 'Micro Node',
      apy: '4%',
      lockPeriod: '30 days',
      autoCompound: false,
      earlyExitFee: '10%',
      monthlyRewards: '41,500 SVR',
      status: 'Disabled'
    },
    {
      name: 'Compute Booster',
      apy: '5.5%',
      lockPeriod: '60 days',
      autoCompound: true,
      earlyExitFee: '15%',
      monthlyRewards: '301,492 SVR',
      status: 'Enabled'
    },
    {
      name: 'Data Streamer',
      apy: '6.5%',
      lockPeriod: '90 days',
      autoCompound: true,
      earlyExitFee: '20%',
      monthlyRewards: '587,438 SVR',
      status: 'Enabled'
    },
    {
      name: 'Edge Power Node',
      apy: '7.5%',
      lockPeriod: '180 days',
      autoCompound: true,
      earlyExitFee: '25%',
      monthlyRewards: '223,000 SVR',
      status: 'Enabled'
    },
    {
      name: 'Core Validator Tier',
      apy: '9%',
      lockPeriod: '365 days',
      autoCompound: true,
      earlyExitFee: '30%',
      monthlyRewards: '28,875 SVR',
      status: 'Enabled'
    }
  ];

  const rewardSchedule = [
    {
      date: 'December 1, 2023',
      amount: '1,875,500 SVR',
      type: 'Monthly Distribution',
      status: 'Estimated distribution'
    },
    {
      date: 'January 1, 2024',
      amount: '1,890,000 SVR',
      type: 'Monthly Distribution',
      status: 'Estimated distribution'
    },
    {
      date: 'February 1, 2024',
      amount: '1,905,000 SVR',
      type: 'Monthly Distribution',
      status: 'Estimated distribution'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glassmorphism p-6 rounded-xl border border-emerald-800/30">
        <h1 className="text-3xl font-bold text-white mb-2">Staking & APY Configuration</h1>
        <p className="text-slate-300">Configure staking rates and APY for all packages</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="glassmorphism border border-emerald-800/30 bg-slate-900/50">
          <TabsTrigger 
            value="overview" 
            className="data-[state=active]:bg-emerald-600/20 data-[state=active]:text-emerald-400 text-slate-300"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Overview & Pool Management
          </TabsTrigger>
          <TabsTrigger 
            value="apy-config" 
            className="data-[state=active]:bg-emerald-600/20 data-[state=active]:text-emerald-400 text-slate-300"
          >
            <Settings className="w-4 h-4 mr-2" />
            APY Configuration
          </TabsTrigger>
          <TabsTrigger 
            value="rewards-schedule" 
            className="data-[state=active]:bg-emerald-600/20 data-[state=active]:text-emerald-400 text-slate-300"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Reward Distribution Schedule
          </TabsTrigger>
        </TabsList>

        {/* Overview & Pool Management Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="glassmorphism border-emerald-800/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Average APY</p>
                    <p className="text-2xl font-bold text-emerald-400">6.5%</p>
                    <p className="text-slate-500 text-xs">Weighted by stake amount</p>
                  </div>
                  <Percent className="w-8 h-8 text-emerald-400/60" />
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism border-emerald-800/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Total Staked</p>
                    <p className="text-2xl font-bold text-emerald-400">226.21M SVR</p>
                    <p className="text-slate-500 text-xs">Across all packages</p>
                  </div>
                  <Coins className="w-8 h-8 text-emerald-400/60" />
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism border-emerald-800/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Next Reward Distribution</p>
                    <p className="text-2xl font-bold text-emerald-400">5 Days</p>
                    <p className="text-slate-500 text-xs">December 1, 2023</p>
                  </div>
                  <Clock className="w-8 h-8 text-emerald-400/60" />
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism border-emerald-800/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Auto-Compound Rate</p>
                    <p className="text-2xl font-bold text-emerald-400">82%</p>
                    <p className="text-slate-500 text-xs">Of stakes use auto-compound</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-emerald-400/60" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Rewards Pool Management */}
          <Card className="glassmorphism border-emerald-800/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-400" />
                Rewards Pool Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 text-sm">Rewards Pool (SVR Tokens)</label>
                  <Input 
                    className="bg-slate-800/50 border-emerald-800/30 text-white focus:border-emerald-600" 
                    value="25,000,000" 
                  />
                </div>
                <div>
                  <label className="text-slate-300 text-sm">Reward Distribution Frequency</label>
                  <Select defaultValue="monthly">
                    <SelectTrigger className="bg-slate-800/50 border-emerald-800/30 text-white focus:border-emerald-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-emerald-600/30">
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Update Rewards Pool
              </Button>
            </CardContent>
          </Card>

          {/* Rewards Pool Status */}
          <Card className="glassmorphism border-emerald-800/30">
            <CardHeader>
              <CardTitle className="text-white">Rewards Pool Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-emerald-900/20 rounded-lg border border-emerald-600/30">
                <p className="text-emerald-300 mb-2">Current rewards pool contains enough SVR tokens to maintain current APYs for:</p>
                <p className="text-2xl font-bold text-emerald-400">~21.1 months</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-800/30 rounded-lg">
                  <p className="text-slate-400 text-sm">Annual Rewards Required</p>
                  <p className="text-xl font-bold text-white">14,187,650 SVR</p>
                </div>
                <div className="p-4 bg-slate-800/30 rounded-lg">
                  <p className="text-slate-400 text-sm">Pool Sufficiency</p>
                  <p className="text-xl font-bold text-emerald-400">176.2% of annual requirement</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* APY Configuration Tab */}
        <TabsContent value="apy-config" className="space-y-6">
          <Card className="glassmorphism border-emerald-800/30">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">APY Configuration</CardTitle>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Edit APY Settings
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-emerald-800/30">
                    <TableHead className="text-slate-300">Package</TableHead>
                    <TableHead className="text-slate-300">Current APY</TableHead>
                    <TableHead className="text-slate-300">Lock Period</TableHead>
                    <TableHead className="text-slate-300">Auto Compound</TableHead>
                    <TableHead className="text-slate-300">Early Exit Fee</TableHead>
                    <TableHead className="text-slate-300">Monthly Rewards</TableHead>
                    <TableHead className="text-slate-300">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stakingPackages.map((pkg, index) => (
                    <TableRow key={index} className="border-emerald-800/20 hover:bg-slate-800/50">
                      <TableCell className="text-white font-medium">{pkg.name}</TableCell>
                      <TableCell className="text-emerald-400 font-bold">{pkg.apy}</TableCell>
                      <TableCell className="text-white">{pkg.lockPeriod}</TableCell>
                      <TableCell>
                        <Badge className={pkg.autoCompound 
                          ? "bg-emerald-900/20 text-emerald-400 border-emerald-600/30" 
                          : "bg-red-900/20 text-red-400 border-red-600/30"
                        }>
                          {pkg.autoCompound ? 'Enabled' : 'Disabled'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-white">{pkg.earlyExitFee}</TableCell>
                      <TableCell className="text-emerald-400">{pkg.monthlyRewards}</TableCell>
                      <TableCell>
                        <Badge className={pkg.status === 'Enabled' 
                          ? "bg-emerald-900/20 text-emerald-400 border-emerald-600/30" 
                          : "bg-red-900/20 text-red-400 border-red-600/30"
                        }>
                          {pkg.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* APY Changes Notice */}
          <Card className="glassmorphism border-emerald-800/30">
            <CardHeader>
              <CardTitle className="text-white">APY Changes Notice</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-yellow-900/20 rounded-lg border border-yellow-600/30">
                <p className="text-yellow-300">
                  Changes to APY rates will affect all new stakes and renewed stakes after the changes are applied. 
                  Existing stakes will continue with their current APY until their lock period ends.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reward Distribution Schedule Tab */}
        <TabsContent value="rewards-schedule" className="space-y-6">
          <Card className="glassmorphism border-emerald-800/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-400" />
                Reward Distribution Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rewardSchedule.map((reward, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg border border-emerald-800/20">
                    <div>
                      <div className="flex items-center gap-3">
                        <Badge className="bg-emerald-900/20 text-emerald-400 border-emerald-600/30">
                          {reward.type}
                        </Badge>
                        <p className="text-white font-medium">{reward.date}</p>
                      </div>
                      <p className="text-slate-400 text-sm mt-1">{reward.status}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-emerald-400 font-bold text-lg">{reward.amount}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
