
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Flame, Gift, TrendingDown, Zap } from 'lucide-react';

export function RewardsBurnControl() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glassmorphism p-6 rounded-xl border border-emerald-800/30">
        <h1 className="text-3xl font-bold text-white mb-2">Rewards & Burn Control</h1>
        <p className="text-slate-300">Manage token burn mechanisms, reward distributions, and deflationary controls.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glassmorphism border-emerald-800/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Flame className="w-5 h-5" />
              Burn Mechanisms
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-slate-300 text-sm">Auto-Burn Rate (%)</label>
              <Input className="bg-slate-800/50 border-slate-600 text-white" value="2.0" />
            </div>
            <div>
              <label className="text-slate-300 text-sm">Manual Burn Amount</label>
              <Input className="bg-slate-800/50 border-slate-600 text-white" placeholder="Enter amount" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 text-sm">Total Burned</span>
                <span className="text-red-400 font-medium">25,000 ASVO</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300 text-sm">This Month</span>
                <span className="text-red-400 font-medium">2,150 ASVO</span>
              </div>
            </div>
            <Button className="bg-red-600 hover:bg-red-700 text-white w-full">
              Execute Manual Burn
            </Button>
          </CardContent>
        </Card>

        <Card className="glassmorphism border-emerald-800/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Gift className="w-5 h-5" />
              Reward Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                <div>
                  <p className="text-white font-medium">Staking Rewards</p>
                  <p className="text-slate-400 text-sm">5,000 ASVO/day</p>
                </div>
                <Badge className="bg-green-900/20 text-green-400">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                <div>
                  <p className="text-white font-medium">Referral Rewards</p>
                  <p className="text-slate-400 text-sm">1,200 ASVO/day</p>
                </div>
                <Badge className="bg-green-900/20 text-green-400">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                <div>
                  <p className="text-white font-medium">DAO Rewards</p>
                  <p className="text-slate-400 text-sm">800 ASVO/day</p>
                </div>
                <Badge className="bg-green-900/20 text-green-400">Active</Badge>
              </div>
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white w-full">
              Configure Rewards
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
