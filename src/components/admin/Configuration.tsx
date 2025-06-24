
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  Package,
  Coins,
  Users,
  Trophy,
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

export function Configuration() {
  const [activeTab, setActiveTab] = useState('tokens');

  const tokenStages = [
    {
      stageName: 'Seed Sale',
      price: '$0.05',
      allocation: '10,000,000',
      sold: '8,500,000',
      startDate: '2024-01-01',
      endDate: '2024-03-31',
      status: 'Completed'
    },
    {
      stageName: 'Private Sale',
      price: '$0.08',
      allocation: '15,000,000',
      sold: '12,300,000',
      startDate: '2024-04-01',
      endDate: '2024-06-30',
      status: 'Active'
    }
  ];

  const stakingPackages = [
    {
      packageName: 'Starter Tier',
      apy: '12%',
      duration: '6',
      minStake: '1,000',
      status: 'Active'
    },
    {
      packageName: 'Core Validator',
      apy: '15%',
      duration: '12',
      minStake: '5,000',
      status: 'Active'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="glassmorphism p-6 rounded-xl border border-emerald-800/30">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Configuration</h1>
            <p className="text-slate-300">Manage platform settings, token sales, and staking parameters.</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="border-emerald-600 text-emerald-400 hover:bg-emerald-600 hover:text-white">
                <EllipsisVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-slate-800 border-slate-600">
              <DropdownMenuItem className="text-white hover:bg-slate-700">Export Configuration</DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-slate-700">Import Settings</DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-slate-700">Reset to Defaults</DropdownMenuItem>
              <DropdownMenuSeparator className="bg-slate-600" />
              <DropdownMenuItem className="text-white hover:bg-slate-700">Configuration History</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-4">
        <Button 
          variant={activeTab === 'tokens' ? 'default' : 'outline'}
          onClick={() => setActiveTab('tokens')}
          className={activeTab === 'tokens' ? 'bg-emerald-600 hover:bg-emerald-700' : 'border-emerald-600 text-emerald-400 hover:bg-emerald-600 hover:text-white'}
        >
          <Coins className="w-4 h-4 mr-2" />
          Token & Packages
        </Button>
        <Button 
          variant={activeTab === 'staking' ? 'default' : 'outline'}
          onClick={() => setActiveTab('staking')}
          className={activeTab === 'staking' ? 'bg-emerald-600 hover:bg-emerald-700' : 'border-emerald-600 text-emerald-400 hover:bg-emerald-600 hover:text-white'}
        >
          <Package className="w-4 h-4 mr-2" />
          Staking & APY
        </Button>
        <Button 
          variant={activeTab === 'referrals' ? 'default' : 'outline'}
          onClick={() => setActiveTab('referrals')}
          className={activeTab === 'referrals' ? 'bg-emerald-600 hover:bg-emerald-700' : 'border-emerald-600 text-emerald-400 hover:bg-emerald-600 hover:text-white'}
        >
          <Users className="w-4 h-4 mr-2" />
          Referrals & Leaderboard
        </Button>
      </div>

      {/* Token & Package Control */}
      {activeTab === 'tokens' && (
        <div className="space-y-6">
          {/* Token Sale Stages */}
          <Card className="glassmorphism border-emerald-800/30">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-white flex items-center gap-2">
                  <Coins className="w-5 h-5" />
                  ASVO Token Sale Stages
                </CardTitle>
                <div className="flex gap-2">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Stage
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon" className="border-emerald-600 text-emerald-400 hover:bg-emerald-600 hover:text-white">
                        <EllipsisVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-slate-800 border-slate-600">
                      <DropdownMenuItem className="text-white hover:bg-slate-700">Export Stages</DropdownMenuItem>
                      <DropdownMenuItem className="text-white hover:bg-slate-700">Bulk Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-white hover:bg-slate-700">Stage Analytics</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-emerald-800/30">
                    <TableHead className="text-slate-300">Stage Name</TableHead>
                    <TableHead className="text-slate-300">Price (USD)</TableHead>
                    <TableHead className="text-slate-300">Allocation</TableHead>
                    <TableHead className="text-slate-300">Sold</TableHead>
                    <TableHead className="text-slate-300">Start Date</TableHead>
                    <TableHead className="text-slate-300">End Date</TableHead>
                    <TableHead className="text-slate-300">Status</TableHead>
                    <TableHead className="text-slate-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tokenStages.map((stage, index) => (
                    <TableRow key={index} className="border-emerald-800/20 hover:bg-slate-800/50">
                      <TableCell className="text-white font-medium">{stage.stageName}</TableCell>
                      <TableCell className="text-emerald-400">{stage.price}</TableCell>
                      <TableCell className="text-white">{stage.allocation} ASVO</TableCell>
                      <TableCell className="text-white">{stage.sold} ASVO</TableCell>
                      <TableCell className="text-slate-300">{stage.startDate}</TableCell>
                      <TableCell className="text-slate-300">{stage.endDate}</TableCell>
                      <TableCell>
                        <Badge className={stage.status === 'Active' ? 'bg-green-900/20 text-green-400 border-green-600/30' : 'bg-blue-900/20 text-blue-400 border-blue-600/30'}>
                          {stage.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                              <EllipsisVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-slate-800 border-slate-600">
                            <DropdownMenuItem className="text-white hover:bg-slate-700">
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Stage
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-white hover:bg-slate-700">View Analytics</DropdownMenuItem>
                            <DropdownMenuItem className="text-white hover:bg-slate-700">
                              {stage.status === 'Active' ? 'Deactivate' : 'Activate'}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-slate-600" />
                            <DropdownMenuItem className="text-red-400 hover:bg-red-600 hover:text-white">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Stage
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
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-white flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Staking Packages
                </CardTitle>
                <div className="flex gap-2">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Package
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon" className="border-emerald-600 text-emerald-400 hover:bg-emerald-600 hover:text-white">
                        <EllipsisVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-slate-800 border-slate-600">
                      <DropdownMenuItem className="text-white hover:bg-slate-700">Export Packages</DropdownMenuItem>
                      <DropdownMenuItem className="text-white hover:bg-slate-700">Package Performance</DropdownMenuItem>
                      <DropdownMenuItem className="text-white hover:bg-slate-700">Bulk Actions</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-emerald-800/30">
                    <TableHead className="text-slate-300">Package Name</TableHead>
                    <TableHead className="text-slate-300">APY</TableHead>
                    <TableHead className="text-slate-300">Duration (Months)</TableHead>
                    <TableHead className="text-slate-300">Min. Stake (ASVO)</TableHead>
                    <TableHead className="text-slate-300">Status</TableHead>
                    <TableHead className="text-slate-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stakingPackages.map((pkg, index) => (
                    <TableRow key={index} className="border-emerald-800/20 hover:bg-slate-800/50">
                      <TableCell className="text-white font-medium">{pkg.packageName}</TableCell>
                      <TableCell className="text-emerald-400">{pkg.apy}</TableCell>
                      <TableCell className="text-white">{pkg.duration}</TableCell>
                      <TableCell className="text-white">{pkg.minStake}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-900/20 text-green-400 border-green-600/30">
                          {pkg.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                              <EllipsisVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-slate-800 border-slate-600">
                            <DropdownMenuItem className="text-white hover:bg-slate-700">
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Package
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-white hover:bg-slate-700">View Performance</DropdownMenuItem>
                            <DropdownMenuItem className="text-white hover:bg-slate-700">Toggle Status</DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-slate-600" />
                            <DropdownMenuItem className="text-red-400 hover:bg-red-600 hover:text-white">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Package
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
      {activeTab === 'staking' && (
        <Card className="glassmorphism border-emerald-800/30">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Global Staking Parameters
              </CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="border-emerald-600 text-emerald-400 hover:bg-emerald-600 hover:text-white">
                    <EllipsisVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-slate-800 border-slate-600">
                  <DropdownMenuItem className="text-white hover:bg-slate-700">Reset to Defaults</DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:bg-slate-700">Export Settings</DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:bg-slate-700">Import Settings</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-slate-300">Default ASVO Staking APY Base (%)</Label>
                  <Input className="bg-slate-800/50 border-slate-600 text-white" defaultValue="12" />
                </div>
                <div>
                  <Label className="text-slate-300">Auto-Compounding Frequency</Label>
                  <Select>
                    <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-slate-300">Min. ASVO for Staking</Label>
                  <Input className="bg-slate-800/50 border-slate-600 text-white" defaultValue="1000" />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label className="text-slate-300">Loyalty Bonus Increment (% per month)</Label>
                  <Input className="bg-slate-800/50 border-slate-600 text-white" defaultValue="0.5" />
                </div>
                <div>
                  <Label className="text-slate-300">Max Loyalty Bonus Months</Label>
                  <Input className="bg-slate-800/50 border-slate-600 text-white" defaultValue="24" />
                </div>
                <div>
                  <Label className="text-slate-300">Max. ASVO for Staking</Label>
                  <Input className="bg-slate-800/50 border-slate-600 text-white" defaultValue="1000000" />
                </div>
              </div>
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Save className="w-4 h-4 mr-2" />
              Save Global Staking Settings
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Referrals & Leaderboard */}
      {activeTab === 'referrals' && (
        <div className="space-y-6">
          <Card className="glassmorphism border-emerald-800/30">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Referral Program Settings
                </CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="border-emerald-600 text-emerald-400 hover:bg-emerald-600 hover:text-white">
                      <EllipsisVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-slate-800 border-slate-600">
                    <DropdownMenuItem className="text-white hover:bg-slate-700">Referral Analytics</DropdownMenuItem>
                    <DropdownMenuItem className="text-white hover:bg-slate-700">Export Referral Data</DropdownMenuItem>
                    <DropdownMenuItem className="text-white hover:bg-slate-700">Reset Settings</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-slate-300">Default Referral Commission Rate (%)</Label>
                    <Input className="bg-slate-800/50 border-slate-600 text-white" defaultValue="10" />
                  </div>
                  <div>
                    <Label className="text-slate-300">Commission Source</Label>
                    <Select>
                      <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        <SelectItem value="staking">Staking Rewards</SelectItem>
                        <SelectItem value="total">Total Staked</SelectItem>
                        <SelectItem value="ico">ICO Purchase</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-slate-300">Minimum Referrals for Bonus Tier</Label>
                    <Input className="bg-slate-800/50 border-slate-600 text-white" defaultValue="10" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-slate-300">Referral Payout Frequency</Label>
                    <Select>
                      <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-slate-300">Bonus Tier Commission Increment (%)</Label>
                    <Input className="bg-slate-800/50 border-slate-600 text-white" defaultValue="1" />
                  </div>
                  <div>
                    <Label className="text-slate-300">Referral Link Base URL</Label>
                    <Input className="bg-slate-800/50 border-slate-600 text-white" defaultValue="https://aussivo.com/ref/" />
                  </div>
                </div>
              </div>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Save className="w-4 h-4 mr-2" />
                Save Referral Settings
              </Button>
            </CardContent>
          </Card>

          <Card className="glassmorphism border-emerald-800/30">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Leaderboard Settings
                </CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="border-emerald-600 text-emerald-400 hover:bg-emerald-600 hover:text-white">
                      <EllipsisVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-slate-800 border-slate-600">
                    <DropdownMenuItem className="text-white hover:bg-slate-700">View Current Leaderboard</DropdownMenuItem>
                    <DropdownMenuItem className="text-white hover:bg-slate-700">Leaderboard History</DropdownMenuItem>
                    <DropdownMenuItem className="text-white hover:bg-slate-700">Reset Leaderboard</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="leaderboard-enabled" />
                    <Label htmlFor="leaderboard-enabled" className="text-slate-300">Enable Leaderboard</Label>
                  </div>
                  <div>
                    <Label className="text-slate-300">Leaderboard Metric</Label>
                    <Select>
                      <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                        <SelectValue placeholder="Select metric" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        <SelectItem value="referrals">Total Referrals</SelectItem>
                        <SelectItem value="earnings">Total Referral Earnings</SelectItem>
                        <SelectItem value="staked">Staked ASVO by Referrals</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-slate-300">Number of Top Users to Display</Label>
                    <Input className="bg-slate-800/50 border-slate-600 text-white" defaultValue="100" />
                  </div>
                  <div>
                    <Label className="text-slate-300">Refresh Frequency</Label>
                    <Select>
                      <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Save className="w-4 h-4 mr-2" />
                Save Leaderboard Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
