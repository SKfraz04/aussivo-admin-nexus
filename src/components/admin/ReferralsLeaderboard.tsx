
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Trophy, Gift } from 'lucide-react';

export function ReferralsLeaderboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glassmorphism p-6 rounded-xl border border-emerald-800/30">
        <h1 className="text-3xl font-bold text-white mb-2">Referrals & Leaderboard</h1>
        <p className="text-slate-300">Manage referral programs, rewards, and leaderboard configurations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glassmorphism border-emerald-800/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Gift className="w-5 h-5 text-emerald-400" />
              Referral Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-slate-300 text-sm">Referral Bonus (%)</label>
              <Input className="bg-slate-800/50 border-emerald-800/30 text-white focus:border-emerald-600" value="5.0" />
            </div>
            <div>
              <label className="text-slate-300 text-sm">Referee Bonus (%)</label>
              <Input className="bg-slate-800/50 border-emerald-800/30 text-white focus:border-emerald-600" value="2.5" />
            </div>
            <div>
              <label className="text-slate-300 text-sm">Max Referral Levels</label>
              <Input className="bg-slate-800/50 border-emerald-800/30 text-white focus:border-emerald-600" value="3" />
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white w-full">
              Update Referral Settings
            </Button>
          </CardContent>
        </Card>

        <Card className="glassmorphism border-emerald-800/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-emerald-400" />
              Leaderboard Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg border border-emerald-800/20">
                <div>
                  <p className="text-white font-medium">Weekly Competition</p>
                  <p className="text-slate-400 text-sm">Prize Pool: 1,000 ASVO</p>
                </div>
                <Badge className="bg-emerald-900/20 text-emerald-400 border-emerald-600/30">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg border border-emerald-800/20">
                <div>
                  <p className="text-white font-medium">Monthly Competition</p>
                  <p className="text-slate-400 text-sm">Prize Pool: 5,000 ASVO</p>
                </div>
                <Badge className="bg-emerald-900/20 text-emerald-400 border-emerald-600/30">Active</Badge>
              </div>
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white w-full">
              Configure Leaderboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
