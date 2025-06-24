
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Trophy, Gift, Users, TrendingUp, AlertTriangle, Medal, Shield } from 'lucide-react';

export function ReferralsLeaderboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glassmorphism p-6 rounded-xl border border-emerald-800/30">
        <h1 className="text-3xl font-bold text-white mb-2">Referral & Leaderboard System</h1>
        <p className="text-slate-300">Manage referral bonuses and leaderboard settings</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border border-emerald-800/30">
          <TabsTrigger value="overview" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-emerald-600/20">
            Overview & Statistics
          </TabsTrigger>
          <TabsTrigger value="levels" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-emerald-600/20">
            Referral Levels
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-emerald-600/20">
            Leaderboard Management
          </TabsTrigger>
          <TabsTrigger value="flagged" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-emerald-600/20">
            Flagged Activities
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="glassmorphism border-emerald-800/30">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Users className="w-8 h-8 text-emerald-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">12,547</p>
                    <p className="text-xs text-slate-400">Total Referrals</p>
                    <Badge className="bg-emerald-900/20 text-emerald-400 border-emerald-600/30 text-xs">+8% vs. last month</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism border-emerald-800/30">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Gift className="w-8 h-8 text-emerald-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">921,450</p>
                    <p className="text-xs text-slate-400">Bonus Rewards Paid (SVR)</p>
                    <Badge className="bg-emerald-900/20 text-emerald-400 border-emerald-600/30 text-xs">+12% vs. last month</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism border-emerald-800/30">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-8 h-8 text-emerald-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">$8.45M</p>
                    <p className="text-xs text-slate-400">Referral Volume</p>
                    <Badge className="bg-emerald-900/20 text-emerald-400 border-emerald-600/30 text-xs">+15% vs. last month</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism border-emerald-800/30">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">3</p>
                    <p className="text-xs text-slate-400">Flagged Activities</p>
                    <Badge className="bg-red-900/20 text-red-400 border-red-600/30 text-xs">+2 since last week</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="levels" className="space-y-6">
          <Card className="glassmorphism border-emerald-800/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Medal className="w-5 h-5 text-emerald-400" />
                Referral Levels & Bonuses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-emerald-800/30">
                      <TableHead className="text-slate-300">Level</TableHead>
                      <TableHead className="text-slate-300">Bonus Percentage</TableHead>
                      <TableHead className="text-slate-300">Direct Referrals Required</TableHead>
                      <TableHead className="text-slate-300">Total Volume Required</TableHead>
                      <TableHead className="text-slate-300">Users at Level</TableHead>
                      <TableHead className="text-slate-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="border-emerald-800/30">
                      <TableCell className="text-white font-medium">Standard</TableCell>
                      <TableCell className="text-slate-300">5%</TableCell>
                      <TableCell className="text-slate-300">0</TableCell>
                      <TableCell className="text-slate-300">0</TableCell>
                      <TableCell className="text-emerald-400">3,280</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" className="border-emerald-600/30 text-emerald-400 hover:bg-emerald-600/20">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-emerald-800/30">
                      <TableCell className="text-white font-medium">Bronze</TableCell>
                      <TableCell className="text-slate-300">7%</TableCell>
                      <TableCell className="text-slate-300">3</TableCell>
                      <TableCell className="text-slate-300">10,000</TableCell>
                      <TableCell className="text-emerald-400">842</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" className="border-emerald-600/30 text-emerald-400 hover:bg-emerald-600/20">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-emerald-800/30">
                      <TableCell className="text-white font-medium">Silver</TableCell>
                      <TableCell className="text-slate-300">8%</TableCell>
                      <TableCell className="text-slate-300">5</TableCell>
                      <TableCell className="text-slate-300">50,000</TableCell>
                      <TableCell className="text-emerald-400">329</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" className="border-emerald-600/30 text-emerald-400 hover:bg-emerald-600/20">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-emerald-800/30">
                      <TableCell className="text-white font-medium">Gold</TableCell>
                      <TableCell className="text-slate-300">10%</TableCell>
                      <TableCell className="text-slate-300">10</TableCell>
                      <TableCell className="text-slate-300">100,000</TableCell>
                      <TableCell className="text-emerald-400">64</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" className="border-emerald-600/30 text-emerald-400 hover:bg-emerald-600/20">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-emerald-800/30">
                      <TableCell className="text-white font-medium">Platinum</TableCell>
                      <TableCell className="text-slate-300">12%</TableCell>
                      <TableCell className="text-slate-300">20</TableCell>
                      <TableCell className="text-slate-300">500,000</TableCell>
                      <TableCell className="text-emerald-400">6</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" className="border-emerald-600/30 text-emerald-400 hover:bg-emerald-600/20">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 p-4 bg-slate-800/30 rounded-lg border border-emerald-800/20">
                <p className="text-slate-300 text-sm">
                  <strong>Referral Level Information:</strong> Users automatically move up through referral levels as they meet the requirements. 
                  Bonus percentages apply to referral rewards earned from the direct referral's staking activities.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glassmorphism border-emerald-800/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-emerald-400" />
                  Leaderboard Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="public-leaderboard" className="border-emerald-600/30" defaultChecked />
                  <label htmlFor="public-leaderboard" className="text-slate-300 text-sm">Enable public leaderboard</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="weekly-rewards" className="border-emerald-600/30" defaultChecked />
                  <label htmlFor="weekly-rewards" className="text-slate-300 text-sm">Enable weekly rewards for top referrers</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="fraud-detection" className="border-emerald-600/30" defaultChecked />
                  <label htmlFor="fraud-detection" className="text-slate-300 text-sm">Enable automatic fraud detection</label>
                </div>
                <Separator className="bg-emerald-800/30" />
                <div>
                  <p className="text-slate-300 text-sm mb-2">Next automatic distribution: November 30, 2023</p>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white w-full">
                    Distribute Weekly Rewards
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism border-emerald-800/30">
              <CardHeader>
                <CardTitle className="text-white">Weekly Reward Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-slate-800/30 rounded-lg border border-emerald-800/20">
                  <span className="text-slate-300">1st Place:</span>
                  <span className="text-emerald-400 font-semibold">25,000 SVR</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-800/30 rounded-lg border border-emerald-800/20">
                  <span className="text-slate-300">2nd Place:</span>
                  <span className="text-emerald-400 font-semibold">15,000 SVR</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-800/30 rounded-lg border border-emerald-800/20">
                  <span className="text-slate-300">3rd Place:</span>
                  <span className="text-emerald-400 font-semibold">10,000 SVR</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-800/30 rounded-lg border border-emerald-800/20">
                  <span className="text-slate-300">4th-10th Place:</span>
                  <span className="text-emerald-400 font-semibold">5,000 SVR each</span>
                </div>
                <Separator className="bg-emerald-800/30" />
                <div className="flex justify-between items-center p-3 bg-emerald-900/20 rounded-lg border border-emerald-600/30">
                  <span className="text-white font-semibold">Total Weekly Distribution:</span>
                  <span className="text-emerald-400 font-bold">85,000 SVR</span>
                </div>
                <p className="text-slate-400 text-xs">Leaderboard Criteria: New referral volume in trailing 7 days</p>
              </CardContent>
            </Card>
          </div>

          <Card className="glassmorphism border-emerald-800/30">
            <CardHeader>
              <CardTitle className="text-white">Current Top Referrers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-emerald-800/30">
                      <TableHead className="text-slate-300">Rank</TableHead>
                      <TableHead className="text-slate-300">Wallet</TableHead>
                      <TableHead className="text-slate-300">Level</TableHead>
                      <TableHead className="text-slate-300">Direct Referrals</TableHead>
                      <TableHead className="text-slate-300">Total Volume</TableHead>
                      <TableHead className="text-slate-300">Total Earned</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="border-emerald-800/30">
                      <TableCell className="text-emerald-400 font-bold">1st</TableCell>
                      <TableCell className="text-white font-mono">0x7Fc6...DaE9</TableCell>
                      <TableCell><Badge className="bg-purple-900/20 text-purple-400 border-purple-600/30">Platinum</Badge></TableCell>
                      <TableCell className="text-slate-300">28</TableCell>
                      <TableCell className="text-slate-300">$785,000</TableCell>
                      <TableCell className="text-emerald-400">94,200 SVR</TableCell>
                    </TableRow>
                    <TableRow className="border-emerald-800/30">
                      <TableCell className="text-emerald-400 font-bold">2nd</TableCell>
                      <TableCell className="text-white font-mono">0x1f98...F984</TableCell>
                      <TableCell><Badge className="bg-purple-900/20 text-purple-400 border-purple-600/30">Platinum</Badge></TableCell>
                      <TableCell className="text-slate-300">25</TableCell>
                      <TableCell className="text-slate-300">$682,000</TableCell>
                      <TableCell className="text-emerald-400">81,840 SVR</TableCell>
                    </TableRow>
                    <TableRow className="border-emerald-800/30">
                      <TableCell className="text-emerald-400 font-bold">3rd</TableCell>
                      <TableCell className="text-white font-mono">0xA0b8...eB48</TableCell>
                      <TableCell><Badge className="bg-purple-900/20 text-purple-400 border-purple-600/30">Platinum</Badge></TableCell>
                      <TableCell className="text-slate-300">22</TableCell>
                      <TableCell className="text-slate-300">$563,000</TableCell>
                      <TableCell className="text-emerald-400">67,560 SVR</TableCell>
                    </TableRow>
                    <TableRow className="border-emerald-800/30">
                      <TableCell className="text-emerald-400 font-bold">4th</TableCell>
                      <TableCell className="text-white font-mono">0xdAC1...1ec7</TableCell>
                      <TableCell><Badge className="bg-yellow-900/20 text-yellow-400 border-yellow-600/30">Gold</Badge></TableCell>
                      <TableCell className="text-slate-300">15</TableCell>
                      <TableCell className="text-slate-300">$387,000</TableCell>
                      <TableCell className="text-emerald-400">38,700 SVR</TableCell>
                    </TableRow>
                    <TableRow className="border-emerald-800/30">
                      <TableCell className="text-emerald-400 font-bold">5th</TableCell>
                      <TableCell className="text-white font-mono">0x6B17...1d0F</TableCell>
                      <TableCell><Badge className="bg-yellow-900/20 text-yellow-400 border-yellow-600/30">Gold</Badge></TableCell>
                      <TableCell className="text-slate-300">12</TableCell>
                      <TableCell className="text-slate-300">$320,000</TableCell>
                      <TableCell className="text-emerald-400">32,000 SVR</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flagged" className="space-y-6">
          <Card className="glassmorphism border-emerald-800/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-400" />
                Flagged Referral Activities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-slate-800/30 rounded-lg border border-red-800/30">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-white font-mono font-semibold">0xC02a...6Cc2</p>
                    <Badge className="bg-yellow-900/20 text-yellow-400 border-yellow-600/30 mt-1">Investigating</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-emerald-600/30 text-emerald-400 hover:bg-emerald-600/20">
                      Clear
                    </Button>
                    <Button size="sm" variant="outline" className="border-red-600/30 text-red-400 hover:bg-red-600/20">
                      Confirm Fraud
                    </Button>
                  </div>
                </div>
                <p className="text-slate-300 mb-2">Multiple accounts with same IP</p>
                <div className="flex gap-4 text-sm text-slate-400">
                  <span>Direct Referrals: 8</span>
                  <span>Volume: $43,000</span>
                  <span>Flagged: 2023-11-20</span>
                </div>
              </div>

              <div className="p-4 bg-slate-800/30 rounded-lg border border-red-800/30">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-white font-mono font-semibold">0x2260...C599</p>
                    <Badge className="bg-red-900/20 text-red-400 border-red-600/30 mt-1">Confirmed Fraud</Badge>
                  </div>
                </div>
                <p className="text-slate-300 mb-2">Suspicious referral pattern</p>
                <div className="flex gap-4 text-sm text-slate-400">
                  <span>Direct Referrals: 15</span>
                  <span>Volume: $87,000</span>
                  <span>Flagged: 2023-11-18</span>
                </div>
              </div>

              <div className="p-4 bg-slate-800/30 rounded-lg border border-emerald-800/30">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-white font-mono font-semibold">0x5149...86CA</p>
                    <Badge className="bg-emerald-900/20 text-emerald-400 border-emerald-600/30 mt-1">Cleared</Badge>
                  </div>
                </div>
                <p className="text-slate-300 mb-2">Unusually high referral rate</p>
                <div className="flex gap-4 text-sm text-slate-400">
                  <span>Direct Referrals: 21</span>
                  <span>Volume: $95,000</span>
                  <span>Flagged: 2023-11-15</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
