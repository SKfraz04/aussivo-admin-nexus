
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Percent, Calendar } from 'lucide-react';

export function StakingAPYSettings() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glassmorphism p-6 rounded-xl border border-emerald-800/30">
        <h1 className="text-3xl font-bold text-white mb-2">Staking & APY Settings</h1>
        <p className="text-slate-300">Configure staking parameters, APY rates, and reward distributions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glassmorphism border-emerald-800/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Percent className="w-5 h-5" />
              APY Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-slate-300 text-sm">Base APY (%)</label>
              <Input className="bg-slate-800/50 border-slate-600 text-white" value="12.5" />
            </div>
            <div>
              <label className="text-slate-300 text-sm">Maximum APY (%)</label>
              <Input className="bg-slate-800/50 border-slate-600 text-white" value="25.0" />
            </div>
            <div>
              <label className="text-slate-300 text-sm">Compound Frequency</label>
              <Input className="bg-slate-800/50 border-slate-600 text-white" value="Daily" />
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white w-full">
              Update APY Settings
            </Button>
          </CardContent>
        </Card>

        <Card className="glassmorphism border-emerald-800/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Lock Periods
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                <div>
                  <p className="text-white font-medium">30 Days</p>
                  <p className="text-slate-400 text-sm">APY: 12.5%</p>
                </div>
                <Badge className="bg-green-900/20 text-green-400">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                <div>
                  <p className="text-white font-medium">90 Days</p>
                  <p className="text-slate-400 text-sm">APY: 18.0%</p>
                </div>
                <Badge className="bg-green-900/20 text-green-400">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                <div>
                  <p className="text-white font-medium">365 Days</p>
                  <p className="text-slate-400 text-sm">APY: 25.0%</p>
                </div>
                <Badge className="bg-green-900/20 text-green-400">Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
