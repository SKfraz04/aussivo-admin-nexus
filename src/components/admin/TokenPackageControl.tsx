
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Coins, Package, Plus, TrendingUp, Users, Percent } from 'lucide-react';

export function TokenPackageControl() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glassmorphism p-6 rounded-xl border border-emerald-800/30">
        <h1 className="text-3xl font-bold text-white mb-2">Token & Package Control</h1>
        <p className="text-slate-300">Manage token pricing and staking packages</p>
      </div>

      <Tabs defaultValue="token-price" className="space-y-6">
        <TabsList className="glassmorphism border-emerald-800/30 bg-slate-900/50">
          <TabsTrigger value="token-price" className="text-slate-300 data-[state=active]:text-emerald-400 data-[state=active]:bg-emerald-900/30">
            Token Price Management
          </TabsTrigger>
          <TabsTrigger value="staking-packages" className="text-slate-300 data-[state=active]:text-emerald-400 data-[state=active]:bg-emerald-900/30">
            Staking Packages
          </TabsTrigger>
        </TabsList>

        <TabsContent value="token-price" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glassmorphism border-emerald-800/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Coins className="w-5 h-5 text-emerald-400" />
                  Current Token Price (Phase 2)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-slate-300 text-sm">Token Price (USD)</label>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">$</span>
                    <Input className="bg-slate-800/50 border-emerald-800/30 text-white focus:border-emerald-600" value="0.005" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 text-emerald-600 bg-slate-800 border-emerald-800 rounded focus:ring-emerald-500" />
                  <label className="text-slate-300 text-sm">Enable discounted slots</label>
                </div>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white w-full">
                  Update Token Price
                </Button>
              </CardContent>
            </Card>

            <Card className="glassmorphism border-emerald-800/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  Phase 2 Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-400">Start Date:</p>
                    <p className="text-white">October 1, 2023</p>
                  </div>
                  <div>
                    <p className="text-slate-400">End Date:</p>
                    <p className="text-white">November 15, 2023</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Allocation Sold:</p>
                    <p className="text-emerald-400 font-semibold">68%</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Total Raised:</p>
                    <p className="text-white">$2,550,000</p>
                  </div>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Tokens Sold:</p>
                  <p className="text-white font-semibold">510,000,000 SVR</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glassmorphism border-emerald-800/30">
            <CardHeader>
              <CardTitle className="text-white">ICO Phases</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-emerald-800/30 hover:bg-slate-800/30">
                    <TableHead className="text-slate-300">Phase</TableHead>
                    <TableHead className="text-slate-300">Price</TableHead>
                    <TableHead className="text-slate-300">Duration</TableHead>
                    <TableHead className="text-slate-300">Dates</TableHead>
                    <TableHead className="text-slate-300">Allocation Sold</TableHead>
                    <TableHead className="text-slate-300">Status</TableHead>
                    <TableHead className="text-slate-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-emerald-800/30 hover:bg-slate-800/30">
                    <TableCell className="text-white">Phase 1</TableCell>
                    <TableCell className="text-white">$0.003</TableCell>
                    <TableCell className="text-white">30 days</TableCell>
                    <TableCell className="text-white">2023-09-01 to 2023-09-30</TableCell>
                    <TableCell>
                      <Badge className="bg-emerald-900/20 text-emerald-400 border-emerald-600/30">100%</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-slate-700/50 text-slate-300 border-slate-600/30">Completed</Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" className="border-emerald-800/30 text-emerald-400 hover:bg-emerald-900/20">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-emerald-800/30 hover:bg-slate-800/30">
                    <TableCell className="text-white">Phase 2</TableCell>
                    <TableCell className="text-white">$0.005</TableCell>
                    <TableCell className="text-white">45 days</TableCell>
                    <TableCell className="text-white">2023-10-01 to 2023-11-15</TableCell>
                    <TableCell>
                      <Badge className="bg-emerald-900/20 text-emerald-400 border-emerald-600/30">68%</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-emerald-900/20 text-emerald-400 border-emerald-600/30">Active</Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" className="border-emerald-800/30 text-emerald-400 hover:bg-emerald-900/20">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-emerald-800/30 hover:bg-slate-800/30">
                    <TableCell className="text-white">Phase 3</TableCell>
                    <TableCell className="text-white">$0.008</TableCell>
                    <TableCell className="text-white">60 days</TableCell>
                    <TableCell className="text-white">2023-11-16 to 2024-01-15</TableCell>
                    <TableCell>
                      <Badge className="bg-slate-700/50 text-slate-300 border-slate-600/30">0%</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-blue-900/20 text-blue-400 border-blue-600/30">Upcoming</Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" className="border-emerald-800/30 text-emerald-400 hover:bg-emerald-900/20">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="glassmorphism border-emerald-800/30">
            <CardHeader>
              <CardTitle className="text-white">Manual Token Allocation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 text-sm">Wallet Address</label>
                  <Input className="bg-slate-800/50 border-emerald-800/30 text-white focus:border-emerald-600" placeholder="0x..." />
                </div>
                <div>
                  <label className="text-slate-300 text-sm">Token Amount</label>
                  <Input className="bg-slate-800/50 border-emerald-800/30 text-white focus:border-emerald-600" placeholder="10000" />
                </div>
              </div>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Allocate Tokens
              </Button>
              <p className="text-slate-400 text-sm">Use this feature for promotional events or community rewards only.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staking-packages" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="glassmorphism border-emerald-800/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Package className="w-8 h-8 text-emerald-400" />
                  <div>
                    <p className="text-slate-400 text-sm">Total Packages</p>
                    <p className="text-white text-2xl font-bold">5</p>
                    <p className="text-slate-400 text-xs">From Micro Node to Core Validator</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism border-emerald-800/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8 text-emerald-400" />
                  <div>
                    <p className="text-slate-400 text-sm">Total Users</p>
                    <p className="text-white text-2xl font-bold">2,762</p>
                    <p className="text-slate-400 text-xs">Active stakers across all packages</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism border-emerald-800/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Percent className="w-8 h-8 text-emerald-400" />
                  <div>
                    <p className="text-slate-400 text-sm">Average APY</p>
                    <p className="text-white text-2xl font-bold">6.5%</p>
                    <p className="text-slate-400 text-xs">Weighted by stake amount</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

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
                  <TableRow className="border-emerald-800/30 hover:bg-slate-800/30">
                    <TableHead className="text-slate-300">Package</TableHead>
                    <TableHead className="text-slate-300">Min-Max Stake</TableHead>
                    <TableHead className="text-slate-300">APY</TableHead>
                    <TableHead className="text-slate-300">Lock Period</TableHead>
                    <TableHead className="text-slate-300">Auto Compound</TableHead>
                    <TableHead className="text-slate-300">Total Staked</TableHead>
                    <TableHead className="text-slate-300">Status</TableHead>
                    <TableHead className="text-slate-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-emerald-800/30 hover:bg-slate-800/30">
                    <TableCell className="text-white font-medium">Micro Node</TableCell>
                    <TableCell className="text-white">10,000 - 50,000 SVR</TableCell>
                    <TableCell className="text-emerald-400">4%</TableCell>
                    <TableCell className="text-white">30 days</TableCell>
                    <TableCell>
                      <Badge className="bg-red-900/20 text-red-400 border-red-600/30">Disabled</Badge>
                    </TableCell>
                    <TableCell className="text-white">12,450,000 SVR</TableCell>
                    <TableCell>
                      <Badge className="bg-emerald-900/20 text-emerald-400 border-emerald-600/30">Active</Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" className="border-emerald-800/30 text-emerald-400 hover:bg-emerald-900/20">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-emerald-800/30 hover:bg-slate-800/30">
                    <TableCell className="text-white font-medium">Compute Booster</TableCell>
                    <TableCell className="text-white">50,000 - 100,000 SVR</TableCell>
                    <TableCell className="text-emerald-400">5.5%</TableCell>
                    <TableCell className="text-white">60 days</TableCell>
                    <TableCell>
                      <Badge className="bg-emerald-900/20 text-emerald-400 border-emerald-600/30">Enabled</Badge>
                    </TableCell>
                    <TableCell className="text-white">65,780,000 SVR</TableCell>
                    <TableCell>
                      <Badge className="bg-emerald-900/20 text-emerald-400 border-emerald-600/30">Active</Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" className="border-emerald-800/30 text-emerald-400 hover:bg-emerald-900/20">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-emerald-800/30 hover:bg-slate-800/30">
                    <TableCell className="text-white font-medium">Data Streamer</TableCell>
                    <TableCell className="text-white">100,000 - 250,000 SVR</TableCell>
                    <TableCell className="text-emerald-400">6.5%</TableCell>
                    <TableCell className="text-white">90 days</TableCell>
                    <TableCell>
                      <Badge className="bg-emerald-900/20 text-emerald-400 border-emerald-600/30">Enabled</Badge>
                    </TableCell>
                    <TableCell className="text-white">108,450,000 SVR</TableCell>
                    <TableCell>
                      <Badge className="bg-emerald-900/20 text-emerald-400 border-emerald-600/30">Active</Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" className="border-emerald-800/30 text-emerald-400 hover:bg-emerald-900/20">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-emerald-800/30 hover:bg-slate-800/30">
                    <TableCell className="text-white font-medium">Edge Power Node</TableCell>
                    <TableCell className="text-white">250,000 - 500,000 SVR</TableCell>
                    <TableCell className="text-emerald-400">7.5%</TableCell>
                    <TableCell className="text-white">180 days</TableCell>
                    <TableCell>
                      <Badge className="bg-emerald-900/20 text-emerald-400 border-emerald-600/30">Enabled</Badge>
                    </TableCell>
                    <TableCell className="text-white">35,680,000 SVR</TableCell>
                    <TableCell>
                      <Badge className="bg-emerald-900/20 text-emerald-400 border-emerald-600/30">Active</Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" className="border-emerald-800/30 text-emerald-400 hover:bg-emerald-900/20">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-emerald-800/30 hover:bg-slate-800/30">
                    <TableCell className="text-white font-medium">Core Validator Tier</TableCell>
                    <TableCell className="text-white">500,000 - ∞ SVR</TableCell>
                    <TableCell className="text-emerald-400">9%</TableCell>
                    <TableCell className="text-white">365 days</TableCell>
                    <TableCell>
                      <Badge className="bg-emerald-900/20 text-emerald-400 border-emerald-600/30">Enabled</Badge>
                    </TableCell>
                    <TableCell className="text-white">3,850,000 SVR</TableCell>
                    <TableCell>
                      <Badge className="bg-emerald-900/20 text-emerald-400 border-emerald-600/30">Active</Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" className="border-emerald-800/30 text-emerald-400 hover:bg-emerald-900/20">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="mt-4 text-slate-300">
                Total staked across all packages: <span className="text-emerald-400 font-semibold">225,210,000 SVR</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
