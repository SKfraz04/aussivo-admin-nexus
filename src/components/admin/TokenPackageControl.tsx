
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Coins, Package, Plus } from 'lucide-react';

export function TokenPackageControl() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glassmorphism p-6 rounded-xl border border-emerald-800/30">
        <h1 className="text-3xl font-bold text-white mb-2">Token & Package Control</h1>
        <p className="text-slate-300">Manage token parameters, staking packages, and related configurations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glassmorphism border-emerald-800/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Coins className="w-5 h-5 text-emerald-400" />
              Token Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-slate-300 text-sm">Total Supply</label>
              <Input className="bg-slate-800/50 border-emerald-800/30 text-white focus:border-emerald-600" value="1,000,000 ASVO" readOnly />
            </div>
            <div>
              <label className="text-slate-300 text-sm">Circulating Supply</label>
              <Input className="bg-slate-800/50 border-emerald-800/30 text-white focus:border-emerald-600" value="750,000 ASVO" />
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white w-full">
              Update Token Settings
            </Button>
          </CardContent>
        </Card>

        <Card className="glassmorphism border-emerald-800/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Package className="w-5 h-5 text-emerald-400" />
              Package Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg border border-emerald-800/20">
                <div>
                  <p className="text-white font-medium">Starter Package</p>
                  <p className="text-slate-400 text-sm">Min: 100 ASVO</p>
                </div>
                <Badge className="bg-emerald-900/20 text-emerald-400 border-emerald-600/30">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg border border-emerald-800/20">
                <div>
                  <p className="text-white font-medium">Premium Package</p>
                  <p className="text-slate-400 text-sm">Min: 1,000 ASVO</p>
                </div>
                <Badge className="bg-emerald-900/20 text-emerald-400 border-emerald-600/30">Active</Badge>
              </div>
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add New Package
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
