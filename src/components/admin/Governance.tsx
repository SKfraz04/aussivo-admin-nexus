
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Vote, 
  Users, 
  Flame, 
  Gift,
  Plus,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  ArrowUpDown
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function Governance() {
  const [activeTab, setActiveTab] = useState('dao');

  const proposalData = [
    {
      id: 'PROP_001',
      title: 'Increase Staking Rewards Pool',
      proposer: 'USR_001',
      status: 'Active',
      startDate: '2024-06-20',
      endDate: '2024-06-27',
      votesFor: 15420,
      votesAgainst: 3250,
      participation: '65%'
    },
    {
      id: 'PROP_002',
      title: 'New Token Burn Mechanism',
      proposer: 'USR_045',
      status: 'Passed',
      startDate: '2024-06-10',
      endDate: '2024-06-17',
      votesFor: 22100,
      votesAgainst: 1890,
      participation: '78%'
    },
    {
      id: 'PROP_003',
      title: 'Referral Program Enhancement',
      proposer: 'USR_123',
      status: 'Failed',
      startDate: '2024-06-01',
      endDate: '2024-06-08',
      votesFor: 8750,
      votesAgainst: 18230,
      participation: '72%'
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      'Active': 'bg-blue-900/20 text-blue-400 border-blue-600/30',
      'Passed': 'bg-green-900/20 text-green-400 border-green-600/30',
      'Failed': 'bg-red-900/20 text-red-400 border-red-600/30',
      'Pending': 'bg-yellow-900/20 text-yellow-400 border-yellow-600/30'
    };
    return variants[status as keyof typeof variants] || variants.Pending;
  };

  const tabs = [
    { id: 'dao', label: 'Governance (DAO)', icon: Vote },
    { id: 'rewards-burn', label: 'Rewards & Burn Control', icon: Flame }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="glassmorphism p-6 rounded-xl border border-emerald-800/30">
        <h1 className="text-3xl font-bold text-white mb-2">Governance</h1>
        <p className="text-slate-300">Oversee decentralized autonomous organization (DAO) proposals, voting, and reward mechanisms.</p>
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
          {/* Governance (DAO) */}
          {activeTab === 'dao' && (
            <div className="space-y-6">
              {/* Proposals Table */}
              <Card className="glassmorphism border-emerald-800/30">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Vote className="w-5 h-5" />
                    DAO Proposals
                  </CardTitle>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Proposal
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-emerald-800/30">
                        <TableHead className="text-slate-300">
                          <div className="flex items-center gap-2">
                            Proposal ID <ArrowUpDown className="w-4 h-4" />
                          </div>
                        </TableHead>
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
                      {proposalData.map((proposal, index) => (
                        <TableRow key={index} className="border-emerald-800/20 hover:bg-slate-800/50">
                          <TableCell className="text-emerald-400 font-mono">{proposal.id}</TableCell>
                          <TableCell className="text-white font-medium">{proposal.title}</TableCell>
                          <TableCell className="text-slate-300">{proposal.proposer}</TableCell>
                          <TableCell>
                            <Badge className={getStatusBadge(proposal.status)}>
                              {proposal.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-slate-300">
                            {proposal.startDate} - {proposal.endDate}
                          </TableCell>
                          <TableCell className="text-green-400 font-medium">
                            {proposal.votesFor.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-red-400 font-medium">
                            {proposal.votesAgainst.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-white">{proposal.participation}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline" className="border-emerald-600 text-emerald-400 hover:bg-emerald-600 hover:text-white">
                                <Eye className="w-4 h-4" />
                              </Button>
                              {proposal.status === 'Active' && (
                                <>
                                  <Button size="sm" variant="outline" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
                                    <Clock className="w-4 h-4" />
                                  </Button>
                                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                                    <CheckCircle className="w-4 h-4" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Global Governance Settings */}
              <Card className="glassmorphism border-emerald-800/30">
                <CardHeader>
                  <CardTitle className="text-white">Global Governance Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-300 text-sm font-medium">Minimum ASVO to Submit Proposal</label>
                      <Input className="mt-1 bg-slate-800/50 border-slate-600 text-white" defaultValue="10000" />
                    </div>
                    <div>
                      <label className="text-slate-300 text-sm font-medium">Default Voting Period (Days)</label>
                      <Input className="mt-1 bg-slate-800/50 border-slate-600 text-white" defaultValue="7" />
                    </div>
                    <div>
                      <label className="text-slate-300 text-sm font-medium">Required Quorum for Passing (%)</label>
                      <Input className="mt-1 bg-slate-800/50 border-slate-600 text-white" defaultValue="50" />
                    </div>
                    <div>
                      <label className="text-slate-300 text-sm font-medium">Required Majority for Passing (%)</label>
                      <Input className="mt-1 bg-slate-800/50 border-slate-600 text-white" defaultValue="60" />
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
          {activeTab === 'rewards-burn' && (
            <div className="space-y-6">
              {/* Reward Pool Management */}
              <Card className="glassmorphism border-emerald-800/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Gift className="w-5 h-5" />
                    Reward Pool Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-slate-800/50 rounded-lg">
                      <h4 className="text-white font-medium mb-2">Staking Rewards Pool</h4>
                      <p className="text-3xl font-bold text-emerald-400 mb-2">5,250,000 ASVO</p>
                      <p className="text-slate-400 text-sm">Current Balance</p>
                      <div className="mt-4 space-y-2">
                        <Input placeholder="Amount to add (ASVO)" className="bg-slate-700/50 border-slate-600 text-white" />
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                          Add Funds to Staking Pool
                        </Button>
                      </div>
                    </div>
                    <div className="p-4 bg-slate-800/50 rounded-lg">
                      <h4 className="text-white font-medium mb-2">Governance Rewards Pool</h4>
                      <p className="text-3xl font-bold text-blue-400 mb-2">1,850,000 ASVO</p>
                      <p className="text-slate-400 text-sm">Current Balance</p>
                      <div className="mt-4 space-y-2">
                        <Input placeholder="Amount to add (ASVO)" className="bg-slate-700/50 border-slate-600 text-white" />
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                          Add Funds to Governance Pool
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-emerald-800/30">
                    <div>
                      <p className="text-slate-300 text-sm">Next Automated Reward Distribution</p>
                      <p className="text-white font-medium">2024-06-25 00:00:00 UTC</p>
                    </div>
                    <div className="flex justify-end">
                      <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">
                        Trigger Manual Distribution
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* ASVO Burn Mechanism */}
              <Card className="glassmorphism border-emerald-800/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Flame className="w-5 h-5" />
                    ASVO Burn Mechanism Control
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-slate-800/50 rounded-lg">
                      <h4 className="text-white font-medium mb-2">Total ASVO Burned</h4>
                      <p className="text-3xl font-bold text-red-400 mb-2">2,450,000 ASVO</p>
                      <p className="text-slate-400 text-sm">Permanently Removed</p>
                    </div>
                    <div className="p-4 bg-slate-800/50 rounded-lg">
                      <h4 className="text-white font-medium mb-2">Burn Rate</h4>
                      <div className="flex items-center space-x-2">
                        <Input 
                          defaultValue="1" 
                          className="bg-slate-700/50 border-slate-600 text-white w-20" 
                        />
                        <span className="text-white">% of Fees/Revenue</span>
                      </div>
                    </div>
                    <div className="p-4 bg-slate-800/50 rounded-lg">
                      <h4 className="text-white font-medium mb-2">Last Burn Event</h4>
                      <p className="text-white font-medium">2024-06-20</p>
                      <p className="text-slate-400 text-sm">125,000 ASVO burned</p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-slate-900/50 rounded-lg border border-red-600/30">
                    <h4 className="text-white font-medium mb-2">Burn Address</h4>
                    <code className="text-red-400 text-sm font-mono">
                      0x0000000000000000000000000000000000000001
                    </code>
                    <div className="mt-4 flex gap-4">
                      <Input placeholder="Amount to burn (ASVO)" className="bg-slate-700/50 border-slate-600 text-white" />
                      <Button className="bg-red-600 hover:bg-red-700 text-white whitespace-nowrap">
                        Trigger Manual Burn
                      </Button>
                    </div>
                  </div>
                  
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    Save Reward & Burn Settings
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
