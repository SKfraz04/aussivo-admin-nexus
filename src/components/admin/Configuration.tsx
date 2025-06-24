import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Settings, 
  Coins, 
  Target, 
  Users, 
  Edit, 
  Plus,
  ToggleLeft,
  ToggleRight,
  MoreHorizontal
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

export function Configuration() {
  const [activeTab, setActiveTab] = useState('token-packages');

  const tokenSaleStages = [
    {
      name: 'Private Sale',
      price: '$0.05',
      allocation: '10,000,000 ASVO',
      sold: '8,500,000 ASVO',
      startDate: '2024-01-01',
      endDate: '2024-03-31',
      status: 'Completed'
    },
    {
      name: 'Public Sale Phase 1',
      price: '$0.08',
      allocation: '15,000,000 ASVO',
      sold: '5,000,000 ASVO',
      startDate: '2024-04-01',
      endDate: '2024-06-30',
      status: 'Active'
    },
    {
      name: 'Public Sale Phase 2',
      price: '$0.12',
      allocation: '20,000,000 ASVO',
      sold: '0 ASVO',
      startDate: '2024-07-01',
      endDate: '2024-09-30',
      status: 'Upcoming'
    }
  ];

  const stakingPackages = [
    {
      name: 'Starter Tier',
      apy: '8%',
      duration: '3 months',
      minStake: '1,000 ASVO',
      status: 'Active'
    },
    {
      name: 'Core Validator',
      apy: '12%',
      duration: '6 months',
      minStake: '5,000 ASVO',
      status: 'Active'
    },
    {
      name: 'Premium Validator',
      apy: '18%',
      duration: '12 months',
      minStake: '10,000 ASVO',
      status: 'Active'
    },
    {
      name: 'Elite Validator',
      apy: '25%',
      duration: '24 months',
      minStake: '50,000 ASVO',
      status: 'Inactive'
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      'Active': 'bg-green-900/20 text-green-400 border-green-600/30',
      'Inactive': 'bg-red-900/20 text-red-400 border-red-600/30',
      'Completed': 'bg-blue-900/20 text-blue-400 border-blue-600/30',
      'Upcoming': 'bg-yellow-900/20 text-yellow-400 border-yellow-600/30'
    };
    return variants[status as keyof typeof variants] || variants.Inactive;
  };

  const tabs = [
    { id: 'token-packages', label: 'Token & Packages', icon: Coins },
    { id: 'staking-apy', label: 'Staking & APY', icon: Target },
    { id: 'referrals', label: 'Referrals & Leaderboard', icon: Users }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="glassmorphism p-6 rounded-xl border border-emerald-800/30">
        <h1 className="text-3xl font-bold text-white mb-2">Configuration</h1>
        <p className="text-slate-300">Manage platform settings, token sales, staking packages, and system parameters.</p>
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
          {/* Token & Package Control */}
          {activeTab === 'token-packages' && (
            <div className="space-y-6">
              {/* ASVO Token Sale Stages */}
              <Card className="glassmorphism border-emerald-800/30">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-white">ASVO Token Sale Stages</CardTitle>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Stage
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-emerald-800/30">
                        <TableHead className="text-slate-300">Stage Name</TableHead>
                        <TableHead className="text-slate-300">Price per ASVO</TableHead>
                        <TableHead className="text-slate-300">Allocation</TableHead>
                        <TableHead className="text-slate-300">Sold</TableHead>
                        <TableHead className="text-slate-300">Start Date</TableHead>
                        <TableHead className="text-slate-300">End Date</TableHead>
                        <TableHead className="text-slate-300">Status</TableHead>
                        <TableHead className="text-slate-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tokenSaleStages.map((stage, index) => (
                        <TableRow key={index} className="border-emerald-800/20 hover:bg-slate-800/50">
                          <TableCell className="text-white font-medium">{stage.name}</TableCell>
                          <TableCell className="text-emerald-400">{stage.price}</TableCell>
                          <TableCell className="text-white">{stage.allocation}</TableCell>
                          <TableCell className="text-white">{stage.sold}</TableCell>
                          <TableCell className="text-slate-300">{stage.startDate}</TableCell>
                          <TableCell className="text-slate-300">{stage.endDate}</TableCell>
                          <TableCell>
                            <Badge className={getStatusBadge(stage.status)}>
                              {stage.status}
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
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit Stage
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-700">
                                  {stage.status === 'Active' ? (
                                    <>
                                      <ToggleLeft className="mr-2 h-4 w-4" />
                                      Deactivate
                                    </>
                                  ) : (
                                    <>
                                      <ToggleRight className="mr-2 h-4 w-4" />
                                      Activate
                                    </>
                                  )}
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

              {/* Staking Packages */}
              <Card className="glassmorphism border-emerald-800/30">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-white">Staking Packages</CardTitle>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Package
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-emerald-800/30">
                        <TableHead className="text-slate-300">Package Name</TableHead>
                        <TableHead className="text-slate-300">APY</TableHead>
                        <TableHead className="text-slate-300">Duration</TableHead>
                        <TableHead className="text-slate-300">Min. Stake</TableHead>
                        <TableHead className="text-slate-300">Status</TableHead>
                        <TableHead className="text-slate-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {stakingPackages.map((pkg, index) => (
                        <TableRow key={index} className="border-emerald-800/20 hover:bg-slate-800/50">
                          <TableCell className="text-white font-medium">{pkg.name}</TableCell>
                          <TableCell className="text-emerald-400 font-bold">{pkg.apy}</TableCell>
                          <TableCell className="text-white">{pkg.duration}</TableCell>
                          <TableCell className="text-white">{pkg.minStake}</TableCell>
                          <TableCell>
                            <Badge className={getStatusBadge(pkg.status)}>
                              {pkg.status}
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
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit Package
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-700">
                                  {pkg.status === 'Active' ? (
                                    <>
                                      <ToggleLeft className="mr-2 h-4 w-4" />
                                      Deactivate
                                    </>
                                  ) : (
                                    <>
                                      <ToggleRight className="mr-2 h-4 w-4" />
                                      Activate
                                    </>
                                  )}
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

          {/* Staking & APY Settings */}
          {activeTab === 'staking-apy' && (
            <div className="space-y-6">
              <Card className="glassmorphism border-emerald-800/30">
                <CardHeader>
                  <CardTitle className="text-white">Global Staking Parameters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-300 text-sm font-medium">Default ASVO Staking APY Base (%)</label>
                      <Input className="mt-1 bg-slate-800/50 border-slate-600 text-white" defaultValue="8" />
                    </div>
                    <div>
                      <label className="text-slate-300 text-sm font-medium">Auto-Compounding Frequency</label>
                      <Select defaultValue="daily">
                        <SelectTrigger className="mt-1 bg-slate-800/50 border-slate-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-600">
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-slate-300 text-sm font-medium">Min. ASVO for Staking</label>
                      <Input className="mt-1 bg-slate-800/50 border-slate-600 text-white" defaultValue="100" />
                    </div>
                    <div>
                      <label className="text-slate-300 text-sm font-medium">Max. ASVO for Staking</label>
                      <Input className="mt-1 bg-slate-800/50 border-slate-600 text-white" defaultValue="1000000" />
                    </div>
                  </div>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    Save Global Staking Settings
                  </Button>
                </CardContent>
              </Card>

              <Card className="glassmorphism border-emerald-800/30">
                <CardHeader>
                  <CardTitle className="text-white">Loyalty Bonus Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-300 text-sm font-medium">Loyalty Bonus Increment (%) per month</label>
                      <Input className="mt-1 bg-slate-800/50 border-slate-600 text-white" defaultValue="0.5" />
                    </div>
                    <div>
                      <label className="text-slate-300 text-sm font-medium">Max Loyalty Bonus Months</label>
                      <Input className="mt-1 bg-slate-800/50 border-slate-600 text-white" defaultValue="24" />
                    </div>
                  </div>
                  <div className="p-4 bg-slate-800/50 rounded-lg">
                    <h4 className="text-white font-medium mb-2">APY Calculation Logic</h4>
                    <code className="text-emerald-400 text-sm">
                      Base APY + Loyalty Bonus + Participation Bonus + Referral Boost
                    </code>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Referrals & Leaderboard */}
          {activeTab === 'referrals' && (
            <div className="space-y-6">
              <Card className="glassmorphism border-emerald-800/30">
                <CardHeader>
                  <CardTitle className="text-white">Referral Program Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-300 text-sm font-medium">Default Referral Commission Rate (%)</label>
                      <Input className="mt-1 bg-slate-800/50 border-slate-600 text-white" defaultValue="10" />
                    </div>
                    <div>
                      <label className="text-slate-300 text-sm font-medium">Commission Source</label>
                      <Select defaultValue="staking">
                        <SelectTrigger className="mt-1 bg-slate-800/50 border-slate-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-600">
                          <SelectItem value="staking">Staking Rewards</SelectItem>
                          <SelectItem value="total-staked">Total Staked</SelectItem>
                          <SelectItem value="ico-purchase">ICO Purchase</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-slate-300 text-sm font-medium">Referral Payout Frequency</label>
                      <Select defaultValue="weekly">
                        <SelectTrigger className="mt-1 bg-slate-800/50 border-slate-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-600">
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-slate-300 text-sm font-medium">Minimum Referrals for Bonus Tier</label>
                      <Input className="mt-1 bg-slate-800/50 border-slate-600 text-white" defaultValue="10" />
                    </div>
                  </div>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    Save Referral Settings
                  </Button>
                </CardContent>
              </Card>

              <Card className="glassmorphism border-emerald-800/30">
                <CardHeader>
                  <CardTitle className="text-white">Leaderboard Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium">Enable Leaderboard</h4>
                      <p className="text-slate-400 text-sm">Show public leaderboard on the platform</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-300 text-sm font-medium">Leaderboard Metric</label>
                      <Select defaultValue="total-referrals">
                        <SelectTrigger className="mt-1 bg-slate-800/50 border-slate-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-600">
                          <SelectItem value="total-referrals">Total Referrals</SelectItem>
                          <SelectItem value="referral-earnings">Total Referral Earnings</SelectItem>
                          <SelectItem value="staked-asvo">Staked ASVO by Referrals</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-slate-300 text-sm font-medium">Number of Top Users to Display</label>
                      <Input className="mt-1 bg-slate-800/50 border-slate-600 text-white" defaultValue="100" />
                    </div>
                  </div>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    Save Leaderboard Settings
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
