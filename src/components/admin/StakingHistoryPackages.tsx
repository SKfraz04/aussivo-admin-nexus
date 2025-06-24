
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { History, Package, Search, Filter, Download, MoreHorizontal } from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

export function StakingHistoryPackages() {
  const [activeTab, setActiveTab] = useState('stakes');

  const stakingData = [
    {
      wallet: '0x7Fc6...DaE9',
      package: 'Core Validator Tier',
      amount: '500,000 SVR',
      status: 'Active',
      startDate: '2023-10-15',
      endDate: '2024-10-14',
      apy: '9%',
      earned: '7,500 SVR',
      autoCompound: 'Enabled'
    },
    {
      wallet: '0x1f98...F984',
      package: 'Edge Power Node',
      amount: '350,000 SVR',
      status: 'Active',
      startDate: '2023-10-01',
      endDate: '2024-03-29',
      apy: '7.5%',
      earned: '4,375 SVR',
      autoCompound: 'Enabled'
    },
    {
      wallet: '0xA0b8...eB48',
      package: 'Data Streamer',
      amount: '120,000 SVR',
      status: 'Active',
      startDate: '2023-09-12',
      endDate: '2023-12-11',
      apy: '6.5%',
      earned: '1,950 SVR',
      autoCompound: 'Disabled'
    },
    {
      wallet: '0xdAC1...1ec7',
      package: 'Compute Booster',
      amount: '75,000 SVR',
      status: 'Completed',
      startDate: '2023-09-05',
      endDate: '2023-11-04',
      apy: '5.5%',
      earned: '1,031.25 SVR',
      autoCompound: 'Disabled'
    },
    {
      wallet: '0x6B17...1d0F',
      package: 'Micro Node',
      amount: '25,000 SVR',
      status: 'Completed',
      startDate: '2023-08-18',
      endDate: '2023-09-17',
      apy: '4%',
      earned: '250 SVR',
      autoCompound: 'Disabled'
    }
  ];

  const packageData = [
    {
      name: 'Micro Node',
      apy: '4%',
      activeUsers: 1248,
      totalStaked: '12.45M SVR'
    },
    {
      name: 'Compute Booster',
      apy: '5.5%',
      activeUsers: 876,
      totalStaked: '65.78M SVR'
    },
    {
      name: 'Data Streamer',
      apy: '6.5%',
      activeUsers: 542,
      totalStaked: '108.45M SVR'
    },
    {
      name: 'Edge Power Node',
      apy: '7.5%',
      activeUsers: 89,
      totalStaked: '35.68M SVR'
    },
    {
      name: 'Core Validator',
      apy: '9%',
      activeUsers: 7,
      totalStaked: '3.85M SVR'
    }
  ];

  const getStatusBadge = (status: string) => {
    return status === 'Active' 
      ? 'bg-emerald-900/20 text-emerald-400 border-emerald-600/30'
      : 'bg-slate-700/50 text-slate-400 border-slate-600/30';
  };

  const getAutoCompoundBadge = (autoCompound: string) => {
    return autoCompound === 'Enabled'
      ? 'bg-blue-900/20 text-blue-400 border-blue-600/30'
      : 'bg-gray-900/20 text-gray-400 border-gray-600/30';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glassmorphism p-6 rounded-xl border border-emerald-800/30">
        <h1 className="text-3xl font-bold text-white mb-2">Staking History & Packages</h1>
        <p className="text-slate-300">View and manage user staking history and packages</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glassmorphism border-emerald-800/30">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-600/20 rounded-lg">
                <Package className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">2,762</p>
                <p className="text-slate-300 text-sm">Active Stakes</p>
                <p className="text-slate-400 text-xs">Across all packages</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glassmorphism border-emerald-800/30">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-600/20 rounded-lg">
                <History className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">225.21M</p>
                <p className="text-slate-300 text-sm">Total Staked SVR</p>
                <p className="text-slate-400 text-xs">Value: $23.65M at current price</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glassmorphism border-emerald-800/30">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-600/20 rounded-lg">
                <Package className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">127 days</p>
                <p className="text-slate-300 text-sm">Average Lock Period</p>
                <p className="text-slate-400 text-xs">Weighted by stake amount</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glassmorphism border-emerald-800/30">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-600/20 rounded-lg">
                <History className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">1,845</p>
                <p className="text-slate-300 text-sm">Completed Stakes</p>
                <p className="text-slate-400 text-xs">68% renewal rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glassmorphism border-emerald-800/30">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl text-white">Staking History</CardTitle>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input 
                placeholder="Search by wallet address..." 
                className="pl-10 bg-slate-800/50 border-slate-600 text-white w-64"
              />
            </div>
            <Select>
              <SelectTrigger className="w-32 bg-slate-800/50 border-slate-600 text-white">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-40 bg-slate-800/50 border-slate-600 text-white">
                <SelectValue placeholder="All Packages" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="all">All Packages</SelectItem>
                <SelectItem value="core">Core Validator</SelectItem>
                <SelectItem value="edge">Edge Power Node</SelectItem>
                <SelectItem value="data">Data Streamer</SelectItem>
                <SelectItem value="compute">Compute Booster</SelectItem>
                <SelectItem value="micro">Micro Node</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="border-emerald-600/50 text-emerald-400 hover:bg-emerald-600/20 hover:text-emerald-300 bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
            <Button variant="outline" className="border-emerald-600/50 text-emerald-400 hover:bg-emerald-600/20 hover:text-emerald-300 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-800/50">
              <TabsTrigger value="stakes" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-emerald-600">Stakes</TabsTrigger>
              <TabsTrigger value="upgrades" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-emerald-600">Package Upgrades</TabsTrigger>
              <TabsTrigger value="distribution" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-emerald-600">Package Distribution</TabsTrigger>
            </TabsList>
            
            <TabsContent value="stakes" className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow className="border-emerald-800/30">
                    <TableHead className="text-slate-300">Wallet</TableHead>
                    <TableHead className="text-slate-300">Package</TableHead>
                    <TableHead className="text-slate-300">Amount</TableHead>
                    <TableHead className="text-slate-300">Status</TableHead>
                    <TableHead className="text-slate-300">Start Date</TableHead>
                    <TableHead className="text-slate-300">End Date</TableHead>
                    <TableHead className="text-slate-300">APY</TableHead>
                    <TableHead className="text-slate-300">Earned</TableHead>
                    <TableHead className="text-slate-300">Auto Compound</TableHead>
                    <TableHead className="text-slate-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stakingData.map((stake, index) => (
                    <TableRow key={index} className="border-emerald-800/20 hover:bg-slate-800/30">
                      <TableCell className="text-emerald-400 font-mono">{stake.wallet}</TableCell>
                      <TableCell className="text-white">{stake.package}</TableCell>
                      <TableCell className="text-slate-300">{stake.amount}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(stake.status)}>
                          {stake.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-300">{stake.startDate}</TableCell>
                      <TableCell className="text-slate-300">{stake.endDate}</TableCell>
                      <TableCell className="text-emerald-400 font-bold">{stake.apy}</TableCell>
                      <TableCell className="text-green-400">{stake.earned}</TableCell>
                      <TableCell>
                        <Badge className={getAutoCompoundBadge(stake.autoCompound)}>
                          {stake.autoCompound}
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
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-700">
                              Export Record
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="upgrades" className="mt-6">
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Package Upgrades</h3>
                <p className="text-slate-400">Package upgrade history will be displayed here</p>
              </div>
            </TabsContent>

            <TabsContent value="distribution" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packageData.map((pkg, index) => (
                  <Card key={index} className="glassmorphism border-emerald-800/30">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center justify-between">
                        {pkg.name}
                        <Badge className="bg-emerald-900/20 text-emerald-400 border-emerald-600/30">
                          {pkg.apy} APY
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-300">Active Users</span>
                          <span className="text-white font-medium">{pkg.activeUsers.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-300">Total Staked</span>
                          <span className="text-emerald-400 font-bold">{pkg.totalStaked}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
