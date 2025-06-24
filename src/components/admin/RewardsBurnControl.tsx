
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Flame, Gift, AlertTriangle, TrendingUp, Settings, Save, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';

export function RewardsBurnControl() {
  const [autoBurnRate, setAutoBurnRate] = useState('2.0');
  const [manualBurnAmount, setManualBurnAmount] = useState('');
  const [stakingRewardRate, setStakingRewardRate] = useState('5000');
  const [referralRewardRate, setReferralRewardRate] = useState('1200');
  const [daoRewardRate, setDaoRewardRate] = useState('800');
  const [burnDialog, setBurnDialog] = useState<{ open: boolean; amount: string }>({ open: false, amount: '' });
  const [rewardDialog, setRewardDialog] = useState(false);
  const { toast } = useToast();

  const totalBurned = 25000;
  const monthlyBurned = 2150;
  const currentSupply = 1000000;
  const burnPercentage = ((totalBurned / currentSupply) * 100).toFixed(2);

  const handleAutoBurnRateChange = (value: string) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue < 0 || numValue > 10) {
      toast({
        title: "Invalid Rate",
        description: "Auto-burn rate must be between 0% and 10%.",
        variant: "destructive"
      });
      return;
    }
    setAutoBurnRate(value);
  };

  const saveAutoBurnRate = () => {
    toast({
      title: "Auto-Burn Rate Updated",
      description: `Auto-burn rate has been set to ${autoBurnRate}%.`,
    });
  };

  const executeManualBurn = () => {
    const amount = parseFloat(manualBurnAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid burn amount.",
        variant: "destructive"
      });
      return;
    }
    
    if (amount > 10000) {
      setBurnDialog({ open: true, amount: manualBurnAmount });
      return;
    }
    
    performBurn(amount);
  };

  const performBurn = (amount: number) => {
    toast({
      title: "Manual Burn Executed",
      description: `Successfully burned ${amount.toLocaleString()} ASVO tokens.`,
    });
    setManualBurnAmount('');
    setBurnDialog({ open: false, amount: '' });
  };

  const confirmBurn = () => {
    const amount = parseFloat(burnDialog.amount);
    performBurn(amount);
  };

  const updateRewardRates = () => {
    setRewardDialog(true);
  };

  const saveRewardRates = () => {
    toast({
      title: "Reward Rates Updated",
      description: "All reward distribution rates have been successfully updated.",
    });
    setRewardDialog(false);
  };

  const refreshData = () => {
    toast({
      title: "Data Refreshed",
      description: "Burn and reward data has been refreshed.",
    });
  };

  const toggleRewardStatus = (type: string) => {
    toast({
      title: "Reward Status Updated",
      description: `${type} rewards have been toggled.`,
    });
  };

  const dailyBurnFromRate = (currentSupply * (parseFloat(autoBurnRate) / 100)) / 365;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glassmorphism p-6 rounded-xl border border-emerald-800/30">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Rewards & Burn Control</h1>
            <p className="text-slate-300">Manage token burn mechanisms, reward distributions, and deflationary controls.</p>
          </div>
          <Button onClick={refreshData} variant="outline" className="border-emerald-600/50 text-emerald-400 hover:bg-emerald-600/20">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Burn Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glassmorphism border-emerald-800/30">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-600/20 rounded-lg">
                <Flame className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{totalBurned.toLocaleString()}</p>
                <p className="text-slate-300 text-sm">Total Burned</p>
                <p className="text-slate-400 text-xs">{burnPercentage}% of supply</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glassmorphism border-emerald-800/30">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-600/20 rounded-lg">
                <TrendingUp className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{monthlyBurned.toLocaleString()}</p>
                <p className="text-slate-300 text-sm">This Month</p>
                <p className="text-slate-400 text-xs">+12% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glassmorphism border-emerald-800/30">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-600/20 rounded-lg">
                <Settings className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{autoBurnRate}%</p>
                <p className="text-slate-300 text-sm">Auto-Burn Rate</p>
                <p className="text-slate-400 text-xs">{dailyBurnFromRate.toFixed(0)} ASVO/day</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glassmorphism border-emerald-800/30">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600/20 rounded-lg">
                <Gift className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{(parseInt(stakingRewardRate) + parseInt(referralRewardRate) + parseInt(daoRewardRate)).toLocaleString()}</p>
                <p className="text-slate-300 text-sm">Daily Rewards</p>
                <p className="text-slate-400 text-xs">ASVO distributed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Burn Mechanisms */}
        <Card className="glassmorphism border-emerald-800/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-emerald-400" />
              Burn Mechanisms
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-slate-300 text-sm mb-2 block">Auto-Burn Rate (%)</label>
              <div className="flex gap-2">
                <Input 
                  className="bg-slate-800/50 border-emerald-800/30 text-white focus:border-emerald-600" 
                  value={autoBurnRate}
                  onChange={(e) => setAutoBurnRate(e.target.value)}
                  onBlur={(e) => handleAutoBurnRateChange(e.target.value)}
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                />
                <Button onClick={saveAutoBurnRate} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  <Save className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-slate-400 text-xs mt-1">
                Daily burn: ~{dailyBurnFromRate.toFixed(0)} ASVO
              </p>
            </div>
            
            <div>
              <label className="text-slate-300 text-sm mb-2 block">Manual Burn Amount</label>
              <div className="flex gap-2">
                <Input 
                  className="bg-slate-800/50 border-emerald-800/30 text-white focus:border-emerald-600" 
                  placeholder="Enter amount to burn"
                  value={manualBurnAmount}
                  onChange={(e) => setManualBurnAmount(e.target.value)}
                  type="number"
                  min="0"
                />
                <Button 
                  onClick={executeManualBurn} 
                  disabled={!manualBurnAmount || parseFloat(manualBurnAmount) <= 0}
                  className="bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
                >
                  <Flame className="w-4 h-4 mr-2" />
                  Burn
                </Button>
              </div>
            </div>
            
            <div className="space-y-2 pt-4 border-t border-emerald-800/30">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 text-sm">Total Burned</span>
                <span className="text-emerald-400 font-medium">{totalBurned.toLocaleString()} ASVO</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300 text-sm">This Month</span>
                <span className="text-emerald-400 font-medium">{monthlyBurned.toLocaleString()} ASVO</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300 text-sm">Burn Rate</span>
                <span className="text-emerald-400 font-medium">{burnPercentage}% of supply</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reward Distribution */}
        <Card className="glassmorphism border-emerald-800/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Gift className="w-5 h-5 text-emerald-400" />
              Reward Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg border border-emerald-800/20 hover:border-emerald-600/30 transition-colors">
                <div>
                  <p className="text-white font-medium">Staking Rewards</p>
                  <p className="text-slate-400 text-sm">{parseInt(stakingRewardRate).toLocaleString()} ASVO/day</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    className="bg-emerald-900/20 text-emerald-400 border-emerald-600/30 cursor-pointer hover:bg-emerald-800/30"
                    onClick={() => toggleRewardStatus('Staking')}
                  >
                    Active
                  </Badge>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => setRewardDialog(true)}
                    className="text-slate-400 hover:text-white"
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg border border-emerald-800/20 hover:border-emerald-600/30 transition-colors">
                <div>
                  <p className="text-white font-medium">Referral Rewards</p>
                  <p className="text-slate-400 text-sm">{parseInt(referralRewardRate).toLocaleString()} ASVO/day</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    className="bg-emerald-900/20 text-emerald-400 border-emerald-600/30 cursor-pointer hover:bg-emerald-800/30"
                    onClick={() => toggleRewardStatus('Referral')}
                  >
                    Active
                  </Badge>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => setRewardDialog(true)}
                    className="text-slate-400 hover:text-white"
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg border border-emerald-800/20 hover:border-emerald-600/30 transition-colors">
                <div>
                  <p className="text-white font-medium">DAO Rewards</p>
                  <p className="text-slate-400 text-sm">{parseInt(daoRewardRate).toLocaleString()} ASVO/day</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    className="bg-emerald-900/20 text-emerald-400 border-emerald-600/30 cursor-pointer hover:bg-emerald-800/30"
                    onClick={() => toggleRewardStatus('DAO')}
                  >
                    Active
                  </Badge>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => setRewardDialog(true)}
                    className="text-slate-400 hover:text-white"
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <Button onClick={updateRewardRates} className="bg-emerald-600 hover:bg-emerald-700 text-white w-full">
              <Settings className="w-4 h-4 mr-2" />
              Configure Rewards
            </Button>
            
            <div className="pt-4 border-t border-emerald-800/30">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle className="text-emerald-400">Notice</AlertTitle>
                <AlertDescription className="text-slate-300">
                  Reward rate changes take effect immediately. Ensure sufficient token reserves before implementing changes.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Burn Confirmation Dialog */}
      <Dialog open={burnDialog.open} onOpenChange={(open) => setBurnDialog(prev => ({ ...prev, open }))}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              Confirm Large Burn
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              You are about to burn {parseFloat(burnDialog.amount).toLocaleString()} ASVO tokens. This action is irreversible.
            </DialogDescription>
          </DialogHeader>
          <Alert>
            <Flame className="h-4 w-4" />
            <AlertTitle className="text-red-400">Warning</AlertTitle>
            <AlertDescription className="text-slate-300">
              This is a large burn amount. Please verify this is correct before proceeding.
            </AlertDescription>
          </Alert>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setBurnDialog({ open: false, amount: '' })}
              className="border-slate-600 text-slate-300"
            >
              Cancel
            </Button>
            <Button onClick={confirmBurn} className="bg-red-600 hover:bg-red-700">
              Confirm Burn
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reward Configuration Dialog */}
      <Dialog open={rewardDialog} onOpenChange={setRewardDialog}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle>Configure Reward Rates</DialogTitle>
            <DialogDescription className="text-slate-400">
              Update daily reward distribution rates (ASVO per day)
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-slate-300 text-sm">Staking Rewards (ASVO/day)</label>
              <Input 
                value={stakingRewardRate}
                onChange={(e) => setStakingRewardRate(e.target.value)}
                className="bg-slate-800/50 border-slate-600 text-white"
                type="number"
                min="0"
              />
            </div>
            <div>
              <label className="text-slate-300 text-sm">Referral Rewards (ASVO/day)</label>
              <Input 
                value={referralRewardRate}
                onChange={(e) => setReferralRewardRate(e.target.value)}
                className="bg-slate-800/50 border-slate-600 text-white"
                type="number"
                min="0"
              />
            </div>
            <div>
              <label className="text-slate-300 text-sm">DAO Rewards (ASVO/day)</label>
              <Input 
                value={daoRewardRate}
                onChange={(e) => setDaoRewardRate(e.target.value)}
                className="bg-slate-800/50 border-slate-600 text-white"
                type="number"
                min="0"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRewardDialog(false)} className="border-slate-600 text-slate-300">
              Cancel
            </Button>
            <Button onClick={saveRewardRates} className="bg-emerald-600 hover:bg-emerald-700">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
