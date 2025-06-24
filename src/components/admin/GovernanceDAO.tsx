
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Vote, Users, Clock } from 'lucide-react';

export function GovernanceDAO() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glassmorphism p-6 rounded-xl border border-emerald-800/30">
        <h1 className="text-3xl font-bold text-white mb-2">Governance (DAO)</h1>
        <p className="text-slate-300">Manage DAO proposals, voting mechanisms, and governance parameters.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glassmorphism border-emerald-800/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Vote className="w-5 h-5 text-emerald-400" />
              Active Proposals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-4 bg-slate-800/30 rounded-lg border border-emerald-800/20">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-medium">Proposal #001</h3>
                  <Badge className="bg-emerald-900/20 text-emerald-400 border-emerald-600/30">Voting</Badge>
                </div>
                <p className="text-slate-400 text-sm mb-3">Increase staking rewards by 2%</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-emerald-400">For: 1,250</span>
                  <span className="text-slate-400">Against: 340</span>
                  <span className="text-slate-400">Ends in 3 days</span>
                </div>
              </div>
              <div className="p-4 bg-slate-800/30 rounded-lg border border-emerald-800/20">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-medium">Proposal #002</h3>
                  <Badge className="bg-slate-700/50 text-slate-400 border-slate-600/30">Draft</Badge>
                </div>
                <p className="text-slate-400 text-sm mb-3">Add new staking package tier</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-slate-400">Voting starts in 2 days</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glassmorphism border-emerald-800/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-400" />
              Governance Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-slate-800/30 rounded-lg border border-emerald-800/20">
                <Users className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">1,847</p>
                <p className="text-slate-400 text-sm">Total Voters</p>
              </div>
              <div className="text-center p-3 bg-slate-800/30 rounded-lg border border-emerald-800/20">
                <Clock className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">72h</p>
                <p className="text-slate-400 text-sm">Avg Vote Time</p>
              </div>
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white w-full">
              Create New Proposal
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
