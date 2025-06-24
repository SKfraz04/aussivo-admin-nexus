
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Vote, 
  Plus, 
  Eye, 
  Edit, 
  Calendar,
  Users,
  Coins,
  Flame,
  Settings,
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Governance() {
  const [activeTab, setActiveTab] = useState('proposals');

  const proposals = [
    {
      id: 'PROP_001',
      title: 'Increase Staking APY for Tier 1 Package',
      proposer: 'admin_001',
      status: 'Active',
      startDate: '2024-06-20',
      endDate: '2024-06-27',
      votesFor: 12500,
      votesAgainst: 3200,
      participation: 78
    },
    {
      id: 'PROP_002',
      title: 'Implement Token Burn Mechanism',
      proposer: 'user_DEF456',
      status: 'Passed',
      startDate: '2024-06-10',
      endDate: '2024-06-17',
      votesFor: 18900,
      votesAgainst: 2100,
      participation: 84
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="glassmorphism p-6 rounded-xl border border-emerald-800/30">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Governance</h1>
            <p className="text-slate-300">Manage DAO proposals, voting mechanisms, and token economics.</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="border-emerald-600 text-emerald-400 hover:bg-emerald-600 hover:text-white">
                <EllipsisVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-slate-800 border-slate-600">
              <DropdownMenuItem className="text-white hover:bg-slate-700">Governance Analytics</DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-slate-700">Export Voting Data</DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:bg-slate-700">Governance Settings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-4">
        <Button 
          variant={activeTab === 'proposals' ? 'default' : 'outline'}
          onClick={() => setActiveTab('proposals')}
          className={activeTab === 'proposals' ? 'bg-emerald-600 hover:bg-emerald-700' : 'border-emerald-600 text-emerald-400 hover:bg-emerald-600 hover:text-white'}
        >
          <Vote className="w-4 h-4 mr-2" />
          DAO Proposals
        </Button>
        <Button 
          variant={activeTab === 'rewards' ? 'default' : 'outline'}
          onClick={() => setActiveTab('rewards')}
          className={activeTab === 'rewards' ? 'bg-emerald-600 hover:bg-emerald-700' : 'border-emerald-600 text-emerald-400 hover:bg-emerald-600 hover:text-white'}
        >
          <Coins className="w-4 h-4 mr-2" />
          Rewards & Burn
        </Button>
      </div>

      {/* DAO Proposals */}
      {activeTab === 'proposals' && (
        <div className="space-y-6">
          {/* Proposals Table */}
          <Card className="glassmorphism border-emerald-800/30">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-white flex items-center gap-2">
                  <Vote className="w-5 h-5" />
                  DAO Proposals
                </CardTitle>
                <div className="flex gap-2">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Proposal
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon" className="border-emerald-600 text-emerald-400 hover:bg-emerald-600 hover:text-white">
                        <EllipsisVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-slate-800 border-slate-600">
                      <DropdownMenuItem className="text-white hover:bg-slate-700">Export Proposals</DropdownMenuItem>
                      <DropdownMenuItem className="text-white hover:bg-slate-700">Proposal Templates</DropdownMenuItem>
                      <DropdownMenuItem className="text-white hover:bg-slate-700">Voting Analytics</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-emerald-800/30">
                    <TableHead className="text-slate-300">Proposal ID</TableHead>
                    <TableHead className="text-slate-300">Title</TableHead>
                    <TableHead className="text-slate-300">Proposer</TableHead>
                    <TableHead className="text-slate-300">Status</TableHead>
                    <TableHead className="text-slate-300">Voting Period</TableHead>
                    <TableHead className="text-slate-300">Votes For</TableHead>
                    <TableHead className="text-slate-300">Votes Against</TableHead>
                    <TableHead className="text-slate-300">Participation</TableHead>
                    <TableHead className="text-slate-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {proposals.map((proposal, index) => (
                    <TableRow key={index} className="border-emerald-800/20 hover:bg-slate-800/50">
                      <TableCell className="text-emerald-400 font-mono">{proposal.id}</TableCell>
                      <TableCell className="text-white font-medium max-w-xs truncate">{proposal.title}</TableCell>
                      <TableCell className="text-slate-300">{proposal.proposer}</TableCell>
                      <TableCell>
                        <Badge className={proposal.status === 'Active' ? 'bg-green-900/20 text-green-400 border-green-600/30' : 'bg-blue-900/20 text-blue-400 border-blue-600/30'}>
                          {proposal.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-300">{proposal.startDate} - {proposal.endDate}</TableCell>
                      <TableCell className="text-green-400">{proposal.votesFor.toLocaleString()}</TableCell>
                      <TableCell className="text-red-400">{proposal.votesAgainst.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={proposal.participation} className="w-16 h-2" />
                          <span className="text-slate-300 text-sm">{proposal.participation}%</span>
                        </div>
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
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-white hover:bg-slate-700">View Voters</DropdownMenuItem>
                            {proposal.status === 'Active' && (
                              <>
                                <DropdownMenuItem className="text-white hover:bg-slate-700">
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit Proposal
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-white hover:bg-slate-700">
                                  <Calendar className="w-4 h-4 mr-2" />
                                  Extend Voting
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-slate-600" />
                                <DropdownMenuItem className="text-red-400 hover:bg-red-600 hover:text-white">
                                  Force End Vote
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Governance Settings */}
          <Card className="glassmorphism border-emerald-800/30">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Global Governance Settings
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
                    <Label className="text-slate-300">Minimum ASVO to Submit Proposal</Label>
                    <Input className="bg-slate-800/50 border-slate-600 text-white" defaultValue="10000" />
                  </div>
                  <div>
                    <Label className="text-slate-300">Default Voting Period (Days)</Label>
                    <Input className="bg-slate-800/50 border-slate-600 text-white" defaultValue="7" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-slate-300">Required Quorum for Passing (%)</Label>
                    <Input className="bg-slate-800/50 border-slate-600 text-white" defaultValue="30" />
                  </div>
                  <div>
                    <Label className="text-slate-300">Required Majority for Passing (%)</Label>
                    <Input className="bg-slate-800/50 border-slate-600 text-white" defaultValue="51" />
                  </div>
                </div>
              </div>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Save Governance Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Rewards & Burn Control */}
      {activeTab === 'rewards' && (
        <div className="space-y-6">
          {/* Reward Pool Management */}
          <Card className="glassmorphism border-emerald-800/30">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-white flex items-center gap-2">
                  <Coins className="w-5 h-5" />
                  Reward Pool Management
                </CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="border-emerald-600 text-emerald-400 hover:bg-emerald-600 hover:text-white">
                      <EllipsisVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-slate-800 border-slate-600">
                    <DropdownMenuItem className="text-white hover:bg-slate-700">Pool History</DropdownMenuItem>
                    <DropdownMenuItem className="text-white hover:bg-slate-700">Distribution Schedule</DropdownMenuItem>
                    <DropdownMenuItem className="text-white hover:bg-slate-700">Pool Analytics</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-slate-800/50 rounded-lg">
                    <p className="text-slate-300 text-sm">Current Staking Rewards Pool Balance</p>
                    <p className="text-2xl font-bold text-emerald-400">5,250,000 ASVO</p>
                  </div>
                  <div>
                    <Label className="text-slate-300">Add Funds to Staking Pool (ASVO)</Label>
                    <Input className="bg-slate-800/50 border-slate-600 text-white" placeholder="Enter amount" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-800/50 rounded-lg">
                    <p className="text-slate-300 text-sm">Current Governance Rewards Pool Balance</p>
                    <p className="text-2xl font-bold text-blue-400">1,750,000 ASVO</p>
                  </div>
                  <div>
                    <Label className="text-slate-300">Add Funds to Governance Pool (ASVO)</Label>
                    <Input className="bg-slate-800/50 border-slate-600 text-white" placeholder="Enter amount" />
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  Add Funds to Pools
                </Button>
                <Button variant="outline" className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white">
                  Trigger Manual Distribution
                </Button>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <p className="text-slate-300 text-sm">Next Automated Reward Distribution</p>
                <p className="text-white font-medium">2024-06-25 00:00:00 UTC</p>
              </div>
            </CardContent>
          </Card>

          {/* ASVO Burn Mechanism */}
          <Card className="glassmorphism border-emerald-800/30">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-white flex items-center gap-2">
                  <Flame className="w-5 h-5" />
                  ASVO Burn Mechanism Control
                </CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="border-emerald-600 text-emerald-400 hover:bg-emerald-600 hover:text-white">
                      <EllipsisVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-slate-800 border-slate-600">
                    <DropdownMenuItem className="text-white hover:bg-slate-700">Burn History</DropdownMenuItem>
                    <DropdownMenuItem className="text-white hover:bg-slate-700">Burn Analytics</DropdownMenuItem>
                    <DropdownMenuItem className="text-white hover:bg-slate-700">Burn Schedule</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-slate-800/50 rounded-lg">
                    <p className="text-slate-300 text-sm">Total ASVO Burned to Date</p>
                    <p className="text-2xl font-bold text-orange-400">850,000 ASVO</p>
                  </div>
                  <div>
                    <Label className="text-slate-300">Burn Rate (% of Fees/Revenue)</Label>
                    <Input className="bg-slate-800/50 border-slate-600 text-white" defaultValue="1" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-800/50 rounded-lg">
                    <p className="text-slate-300 text-sm">Last Burn Event Date</p>
                    <p className="text-white font-medium">2024-06-20 12:00:00 UTC</p>
                  </div>
                  <div>
                    <Label className="text-slate-300">Manual Burn Amount (ASVO)</Label>
                    <Input className="bg-slate-800/50 border-slate-600 text-white" placeholder="Enter amount to burn" />
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" className="border-orange-600 text-orange-400 hover:bg-orange-600 hover:text-white">
                  <Flame className="w-4 h-4 mr-2" />
                  Trigger Manual Burn
                </Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  Save Burn Settings
                </Button>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <p className="text-slate-300 text-sm">Burn Address</p>
                <p className="text-white font-mono text-sm">0x0000000000000000000000000000000000000000</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
