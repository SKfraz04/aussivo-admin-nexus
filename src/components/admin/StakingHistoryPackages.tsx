
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { History, Package, TrendingUp, Clock } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function StakingHistoryPackages() {
  const stakingData = [
    {
      id: 'STK_001',
      user: 'john.doe@example.com',
      package: 'Premium',
      amount: '10,000 ASVO',
      apy: '18.0%',
      startDate: '2024-01-15',
      endDate: '2024-04-15',
      status: 'Active'
    },
    {
      id: 'STK_002',
      user: 'jane.smith@example.com',
      package: 'Starter',
      amount: '5,000 ASVO',
      apy: '12.5%',
      startDate: '2024-02-01',
      endDate: '2024-03-03',
      status: 'Completed'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glassmorphism p-6 rounded-xl border border-emerald-800/30">
        <h1 className="text-3xl font-bold text-white mb-2">Staking History & Packages</h1>
        <p className="text-slate-300">Track staking activities, package performance, and historical data.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="glassmorphism border-emerald-800/30">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-600/20 rounded-lg">
                <Package className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">2,547</p>
                <p className="text-slate-300 text-sm">Total Stakes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glassmorphism border-emerald-800/30">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-600/20 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">1,847</p>
                <p className="text-slate-300 text-sm">Active Stakes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glassmorphism border-emerald-800/30">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-600/20 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">700</p>
                <p className="text-slate-300 text-sm">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glassmorphism border-emerald-800/30">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-600/20 rounded-lg">
                <History className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">15.8%</p>
                <p className="text-slate-300 text-sm">Avg APY</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glassmorphism border-emerald-800/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <History className="w-5 h-5" />
            Staking History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-emerald-800/30">
                  <TableHead className="text-slate-300">Stake ID</TableHead>
                  <TableHead className="text-slate-300">User</TableHead>
                  <TableHead className="text-slate-300">Package</TableHead>
                  <TableHead className="text-slate-300">Amount</TableHead>
                  <TableHead className="text-slate-300">APY</TableHead>
                  <TableHead className="text-slate-300">Start Date</TableHead>
                  <TableHead className="text-slate-300">End Date</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stakingData.map((stake, index) => (
                  <TableRow key={index} className="border-emerald-800/20 hover:bg-slate-800/50">
                    <TableCell className="text-emerald-400 font-mono">{stake.id}</TableCell>
                    <TableCell className="text-white">{stake.user}</TableCell>
                    <TableCell className="text-white">{stake.package}</TableCell>
                    <TableCell className="text-emerald-400">{stake.amount}</TableCell>
                    <TableCell className="text-green-400">{stake.apy}</TableCell>
                    <TableCell className="text-slate-300">{stake.startDate}</TableCell>
                    <TableCell className="text-slate-300">{stake.endDate}</TableCell>
                    <TableCell>
                      <Badge className={stake.status === 'Active' ? 'bg-green-900/20 text-green-400' : 'bg-blue-900/20 text-blue-400'}>
                        {stake.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
