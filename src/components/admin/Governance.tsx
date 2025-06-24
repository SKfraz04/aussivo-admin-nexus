
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Vote, 
  Users, 
  Flame, 
  Gift,
  Plus,
  Calendar,
  DollarSign,
  TrendingUp,
  CheckCircle
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

export function Governance() {
  const [activeTab, setActiveTab] = useState('governance');
  const [proposalFilter, setProposalFilter] = useState('all');
  const [rewardsSubTab, setRewardsSubTab] = useState('distribution');

  const proposalData = [
    {
      id: 'SVR Token Burn Schedule',
      creator: '0x7Fc6...DaE9',
      date: '2023-11-21',
      status: 'Active',
      description: 'Implement a monthly token burn of 1% of circulating supply to reduce inflation and increase token value.',
      votesFor: 78,
      votesAgainst: 22,
      endDate: '2023-12-05',
      quorum: 51
    },
    {
      id: 'Increase APY for Core Validator Tier',
      creator: '0x1f98...F984',
      date: '2023-11-17',
      status: 'Active',
      description: 'Proposal to increase the APY for Core Validator Tier from 9% to 10% to incentivize larger stakes.',
      votesFor: 45,
      votesAgainst: 35,
      endDate: '2023-12-01',
      quorum: 51
    }
  ];

  const distributionHistory = [
    {
      date: '2023-11-01',
      type: 'Staking Rewards',
      amount: '1,875,500 SVR',
      recipients: '2,538',
      status: 'Completed'
    },
    {
      date: '2023-10-25',
      type: 'Referral Rewards',
      amount: '85,000 SVR',
      recipients: '10',
      status: 'Completed'
    },
    {
      date: '2023-10-01',
      type: 'Staking Rewards',
      amount: '1,850,000 SVR',
      recipients: '2,471',
      status: 'Completed'
    },
    {
      date: '2023-09-25',
      type: 'Referral Rewards',
      amount: '82,000 SVR',
      recipients: '10',
      status: 'Completed'
    }
  ];

  const burnHistory = [
    {
      date: '2023-11-15',
      amount: '1,500,000 SVR',
      type: 'Scheduled',
      hash: '0xb58b9643...91e4892a'
    },
    {
      date: '2023-10-15',
      amount: '1,450,000 SVR',
      type: 'Scheduled',
      hash: '0x3a7a1c36...700cd122'
    },
    {
      date: '2023-10-02',
      amount: '500,000 SVR',
      type: 'Manual',
      hash: '0xf683734b...f9121424'
    },
    {
      date: '2023-09-15',
      amount: '1,400,000 SVR',
      type: 'Scheduled',
      hash: '0x7f5a99d1...87d56002'
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      'Active': 'bg-blue-900/20 text-blue-400 border-blue-600/30',
      'Completed': 'bg-green-900/20 text-green-400 border-green-600/30',
      'Scheduled': 'bg-yellow-900/20 text-yellow-400 border-yellow-600/30',
      'Manual': 'bg-purple-900/20 text-purple-400 border-purple-600/30'
    };
    return variants[status as keyof typeof variants] || variants.Active;
  };

  const filteredProposals = proposalData.filter(proposal => {
    if (proposalFilter === 'all') return true;
    if (proposalFilter === 'active') return proposal.status === 'Active';
    if (proposalFilter === 'completed') return proposal.status === 'Completed';
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="glassmorphism p-6 rounded-xl border border-emerald-800/30">
        <h1 className="text-3xl font-bold text-white mb-2">Governance</h1>
        <p className="text-slate-300">Manage platform governance, proposals, rewards distribution, and token burning mechanisms.</p>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="glassmorphism border border-emerald-800/30 bg-slate-900/50">
          <TabsTrigger value="governance" className="data-[state=active]:bg-emerald-600/20 data-[state=active]:text-emerald-400">
            <Vote className="w-4 h-4 mr-2" />
            Governance (DAO)
          </TabsTrigger>
          <TabsTrigger value="rewards-burn" className="data-[state=active]:bg-emerald-600/20 data-[state=active]:text-emerald-400">
            <Flame className="w-4 h-4 mr-2" />
            Rewards & Burn Control
          </TabsTrigger>
        </TabsList>

        {/* Governance (DAO) Content */}
        <TabsContent value="governance" className="space-y-6">
          <div className="glassmorphism p-4 rounded-xl border border-emerald-800/30">
            <h2 className="text-xl font-bold text-white mb-2">Governance (DAO)</h2>
            <p className="text-slate-300 text-sm">Manage platform governance and proposals</p>
          </div>

          {/* Governance Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="glassmorphism border-emerald-800/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Active Proposals</p>
                    <p className="text-3xl font-bold text-white">2</p>
                    <p className="text-emerald-400 text-sm">Waiting for votes</p>
                  </div>
                  <Vote className="w-8 h-8 text-emerald-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism border-emerald-800/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Voting Participation</p>
                    <p className="text-3xl font-bold text-white">64%</p>
                    <p className="text-slate-400 text-sm">Average for all proposals</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism border-emerald-800/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Proposals Passed</p>
                    <p className="text-3xl font-bold text-white">12</p>
                    <p className="text-slate-400 text-sm">Out of 15 total proposals</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism border-emerald-800/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Eligible Voters</p>
                    <p className="text-3xl font-bold text-white">1,287</p>
                    <p className="text-slate-400 text-sm">Users with staked tokens</p>
                  </div>
                  <Users className="w-8 h-8 text-yellow-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Create New Proposal */}
          <Card className="glassmorphism border-emerald-800/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Create New Proposal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-slate-300 text-sm font-medium">Proposal Title</label>
                  <Input className="mt-1 bg-slate-800/50 border-slate-600 text-white" placeholder="Enter proposal title" />
                </div>
                <div>
                  <label className="text-slate-300 text-sm font-medium">Voting Period (days)</label>
                  <Input className="mt-1 bg-slate-800/50 border-slate-600 text-white" defaultValue="7 days" />
                </div>
                <div>
                  <label className="text-slate-300 text-sm font-medium">Quorum Requirement (%)</label>
                  <Input className="mt-1 bg-slate-800/50 border-slate-600 text-white" defaultValue="51%" />
                </div>
              </div>
              <div>
                <label className="text-slate-300 text-sm font-medium">Proposal Description</label>
                <Textarea className="mt-1 bg-slate-800/50 border-slate-600 text-white" placeholder="Enter detailed proposal description..." rows={4} />
              </div>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Create Proposal
              </Button>
            </CardContent>
          </Card>

          {/* Proposals List */}
          <Card className="glassmorphism border-emerald-800/30">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Proposals</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant={proposalFilter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setProposalFilter('all')}
                  className={proposalFilter === 'all' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
                >
                  All
                </Button>
                <Button
                  variant={proposalFilter === 'active' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setProposalFilter('active')}
                  className={proposalFilter === 'active' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
                >
                  Active
                </Button>
                <Button
                  variant={proposalFilter === 'completed' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setProposalFilter('completed')}
                  className={proposalFilter === 'completed' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
                >
                  Completed
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredProposals.map((proposal, index) => (
                <div key={index} className="p-4 bg-slate-800/30 rounded-lg border border-emerald-800/20">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-white font-medium mb-1">{proposal.id}</h3>
                      <p className="text-slate-400 text-sm">Created by: {proposal.creator} on {proposal.date}</p>
                    </div>
                    <Badge className={getStatusBadge(proposal.status)}>
                      {proposal.status}
                    </Badge>
                  </div>
                  <p className="text-slate-300 text-sm mb-4">{proposal.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-6 text-sm">
                      <span className="text-green-400">Votes For: {proposal.votesFor}%</span>
                      <span className="text-red-400">Votes Against: {proposal.votesAgainst}%</span>
                      <span className="text-slate-400">Voting ends: {proposal.endDate}</span>
                      <span className="text-slate-400">Quorum: {proposal.quorum}% required</span>
                    </div>
                    <Button variant="outline" size="sm" className="text-emerald-400 border-emerald-600/30 hover:bg-emerald-600/20">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rewards & Burn Control Content */}
        <TabsContent value="rewards-burn" className="space-y-6">
          <div className="glassmorphism p-4 rounded-xl border border-emerald-800/30">
            <h2 className="text-xl font-bold text-white mb-2">Rewards & Burn Control</h2>
            <p className="text-slate-300 text-sm">Configure rewards distribution and token burning</p>
          </div>

          {/* Sub-tabs for Rewards & Burn */}
          <Tabs value={rewardsSubTab} onValueChange={setRewardsSubTab} className="space-y-6">
            <TabsList className="glassmorphism border border-emerald-800/30 bg-slate-900/50">
              <TabsTrigger value="distribution" className="data-[state=active]:bg-emerald-600/20 data-[state=active]:text-emerald-400">
                <Gift className="w-4 h-4 mr-2" />
                Rewards Distribution
              </TabsTrigger>
              <TabsTrigger value="burn" className="data-[state=active]:bg-emerald-600/20 data-[state=active]:text-emerald-400">
                <Flame className="w-4 h-4 mr-2" />
                Token Burn & Buyback
              </TabsTrigger>
            </TabsList>

            {/* Rewards Distribution Tab */}
            <TabsContent value="distribution" className="space-y-6">
              {/* Rewards Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="glassmorphism border-emerald-800/30">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-sm">Next Distribution</p>
                        <p className="text-xl font-bold text-white">December 1, 2023</p>
                        <p className="text-emerald-400 text-sm">Estimated: 1,890,000 SVR</p>
                      </div>
                      <Calendar className="w-8 h-8 text-emerald-400" />
                    </div>
                    <Button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white">
                      Distribute Now
                    </Button>
                  </CardContent>
                </Card>

                <Card className="glassmorphism border-emerald-800/30">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-sm">Monthly Rewards Growth</p>
                        <p className="text-3xl font-bold text-green-400">+1.2%</p>
                        <p className="text-slate-400 text-sm">Vs. previous month</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-green-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="glassmorphism border-emerald-800/30">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-sm">Total Rewards Distributed</p>
                        <p className="text-3xl font-bold text-white">42.6M SVR</p>
                        <p className="text-slate-400 text-sm">Since platform launch</p>
                      </div>
                      <Gift className="w-8 h-8 text-blue-400" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Reward Configuration */}
              <Card className="glassmorphism border-emerald-800/30">
                <CardHeader>
                  <CardTitle className="text-white">Reward Distribution Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-slate-300 text-sm font-medium">Distribution Frequency</label>
                      <Input className="mt-1 bg-slate-800/50 border-slate-600 text-white" defaultValue="Monthly" />
                    </div>
                    <div>
                      <label className="text-slate-300 text-sm font-medium">Staking Rewards Pool</label>
                      <Input className="mt-1 bg-slate-800/50 border-slate-600 text-white" defaultValue="25000000" />
                      <p className="text-slate-400 text-xs mt-1">SVR tokens allocated for staking rewards</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-slate-300 text-sm font-medium">Referral Rewards Pool</label>
                    <Input className="mt-1 bg-slate-800/50 border-slate-600 text-white w-64" defaultValue="5000000" />
                    <p className="text-slate-400 text-xs mt-1">SVR tokens allocated for referral rewards</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="auto-compound" />
                    <label htmlFor="auto-compound" className="text-slate-300 text-sm">Enable auto-compound for eligible packages</label>
                  </div>
                </CardContent>
              </Card>

              {/* Distribution Breakdown and Recent Distributions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="glassmorphism border-emerald-800/30">
                  <CardHeader>
                    <CardTitle className="text-white">Reward Distribution Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Staking Rewards</span>
                        <span className="text-emerald-400 font-medium">82%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Referral Bonuses</span>
                        <span className="text-blue-400 font-medium">15%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Community Rewards</span>
                        <span className="text-yellow-400 font-medium">3%</span>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-emerald-800/30">
                      <p className="text-slate-300 text-sm">Next Staking Distribution</p>
                      <p className="text-white font-medium">1,890,000 SVR</p>
                      <p className="text-slate-400 text-sm">December 1, 2023</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glassmorphism border-emerald-800/30">
                  <CardHeader>
                    <CardTitle className="text-white">Recent Distributions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow className="border-emerald-800/30">
                          <TableHead className="text-slate-300">Date</TableHead>
                          <TableHead className="text-slate-300">Distribution Type</TableHead>
                          <TableHead className="text-slate-300">Total Amount</TableHead>
                          <TableHead className="text-slate-300">Recipients</TableHead>
                          <TableHead className="text-slate-300">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {distributionHistory.map((distribution, index) => (
                          <TableRow key={index} className="border-emerald-800/20 hover:bg-slate-800/50">
                            <TableCell className="text-slate-300">{distribution.date}</TableCell>
                            <TableCell className="text-white">{distribution.type}</TableCell>
                            <TableCell className="text-emerald-400">{distribution.amount}</TableCell>
                            <TableCell className="text-slate-300">{distribution.recipients}</TableCell>
                            <TableCell>
                              <Badge className={getStatusBadge(distribution.status)}>
                                {distribution.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Token Burn & Buyback Tab */}
            <TabsContent value="burn" className="space-y-6">
              {/* Burn Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="glassmorphism border-emerald-800/30">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-sm">Total SVR Burned</p>
                        <p className="text-2xl font-bold text-red-400">4,850,000 SVR</p>
                        <p className="text-slate-400 text-sm">2.43% of total supply</p>
                      </div>
                      <Flame className="w-8 h-8 text-red-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="glassmorphism border-emerald-800/30">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-sm">Next Scheduled Burn</p>
                        <p className="text-lg font-bold text-white">December 15, 2023</p>
                        <p className="text-yellow-400 text-sm">Estimated: 1,550,000 SVR</p>
                      </div>
                      <Calendar className="w-8 h-8 text-yellow-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="glassmorphism border-emerald-800/30">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-sm">Supply Reduction Impact</p>
                        <p className="text-2xl font-bold text-green-400">+0.022 USD</p>
                        <p className="text-slate-400 text-sm">Estimated price impact per burn</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-green-400" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Buy-Back & Burn Mechanism */}
              <Card className="glassmorphism border-emerald-800/30">
                <CardHeader>
                  <CardTitle className="text-white">Buy-Back & Burn Mechanism</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <Switch id="auto-buyback" />
                    <label htmlFor="auto-buyback" className="text-slate-300 text-sm">Enable auto-buyback & burn</label>
                  </div>
                  <div>
                    <label className="text-slate-300 text-sm font-medium">Platform Revenue Percentage for Buy-Back</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input className="bg-slate-800/50 border-slate-600 text-white w-20" defaultValue="5" />
                      <span className="text-white">%</span>
                      <Button variant="outline" size="sm" className="text-emerald-400 border-emerald-600/30">
                        Update Rate
                      </Button>
                    </div>
                    <p className="text-slate-400 text-xs mt-2">
                      Percentage of platform revenue used for token buy-back and burn
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm mb-4">
                      Auto-buyback automatically uses a percentage of platform revenue to purchase SVR tokens from the market and burn them, reducing total supply and potentially increasing token value.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-800/30 rounded-lg">
                      <div>
                        <p className="text-slate-300 text-sm font-medium">Buy-Back Schedule:</p>
                        <p className="text-white">Monthly, on the 15th of each month</p>
                      </div>
                      <div>
                        <p className="text-slate-300 text-sm font-medium">Last Auto-Buyback:</p>
                        <p className="text-white">November 15, 2023 - 1,500,000 SVR burned</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Manual Token Burn */}
              <Card className="glassmorphism border-red-800/30">
                <CardHeader>
                  <CardTitle className="text-white">Manual Token Burn</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4 items-end">
                    <div className="flex-1">
                      <label className="text-slate-300 text-sm font-medium">Amount to Burn</label>
                      <Input className="mt-1 bg-slate-800/50 border-slate-600 text-white" placeholder="Enter SVR amount" />
                    </div>
                    <Button className="bg-red-600 hover:bg-red-700 text-white">
                      Burn Tokens
                    </Button>
                  </div>
                  <p className="text-slate-400 text-sm">Permanently remove tokens from circulation</p>
                  
                  <div className="p-4 bg-slate-800/30 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-300 text-sm font-medium">Treasury Balance</p>
                        <p className="text-slate-400 text-sm">Available for burn:</p>
                        <p className="text-white font-medium">3,500,000 SVR</p>
                      </div>
                      <DollarSign className="w-8 h-8 text-blue-400" />
                    </div>
                  </div>

                  <div className="p-4 bg-red-900/20 border border-red-600/30 rounded-lg">
                    <p className="text-red-400 font-medium">⚠️ WARNING</p>
                    <p className="text-slate-300 text-sm">Token burns are irreversible. Please double check the amount before proceeding.</p>
                  </div>
                </CardContent>
              </Card>

              {/* Burn History */}
              <Card className="glassmorphism border-emerald-800/30">
                <CardHeader>
                  <CardTitle className="text-white">Burn History</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-emerald-800/30">
                        <TableHead className="text-slate-300">Date</TableHead>
                        <TableHead className="text-slate-300">Amount</TableHead>
                        <TableHead className="text-slate-300">Type</TableHead>
                        <TableHead className="text-slate-300">Transaction Hash</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {burnHistory.map((burn, index) => (
                        <TableRow key={index} className="border-emerald-800/20 hover:bg-slate-800/50">
                          <TableCell className="text-slate-300">{burn.date}</TableCell>
                          <TableCell className="text-red-400 font-medium">{burn.amount}</TableCell>
                          <TableCell>
                            <Badge className={getStatusBadge(burn.type)}>
                              {burn.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-emerald-400 font-mono text-sm">{burn.hash}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Burn Impact Analysis */}
              <Card className="glassmorphism border-emerald-800/30">
                <CardHeader>
                  <CardTitle className="text-white">Burn Impact Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-8 bg-slate-800/30 rounded-lg border border-emerald-800/20 text-center">
                    <p className="text-slate-400">Charts showing burn impact on token supply and price would be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
}
