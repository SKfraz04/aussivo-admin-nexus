
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { History, Package } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function StakingHistoryPackages() {
  const stakingHistory = [
    {
      user: 'user_ABC123',
      package: 'Premium Validator',
      amount: '5,000 ASVO',
      startDate: '2025-06-01',
      endDate: '2025-12-01',
      status: 'Active',
      apy: '18.5%'
    },
    {
      user: 'user_DEF456',
      package: 'Core Validator',
      amount: '10,000 ASVO',
      startDate: '2025-05-15',
      endDate: '2025-11-15',
      status: 'Active',
      apy: '22.0%'
    },
    {
      user: 'user_GHI789',
      package: 'Starter',
      amount: '1,000 ASVO',
      startDate: '2025-04-20',
      endDate: '2025-07-20',
      status: 'Completed',
      apy: '12.5%'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glassmorphism p-6 rounded-xl border border-emerald-800/30">
        <h1 className="text-3xl font-bold text-white mb-2">Staking History & Packages</h1>
        <p className="text-slate-300">Overview of all staking activities, package performance, and historical data.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glassmorphism border-emerald-800/30">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-600/20 rounded-lg">
                <Package className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">247</p>
                <p className="text-slate-300 text-sm">Active Stakes</p>
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
                <p className="text-2xl font-bold text-white">1,432</p>
                <p className="text-slate-300 text-sm">Total Stakes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glassmorphism border-emerald-800/30">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-600/20 rounded-lg">
                <Package className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">18.7%</p>
                <p className="text-slate-300 text-sm">Avg APY</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glassmorphism border-emerald-800/30">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl text-white">Staking History</CardTitle>
          <Button variant="outline" className="border-emerald-600/50 text-emerald-400 hover:bg-emerald-600/20 hover:text-emerald-300 bg-transparent">
            Export History
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-emerald-800/30">
                <TableHead className="text-slate-300">User ID</TableHead>
                <TableHead className="text-slate-300">Package</TableHead>
                <TableHead className="text-slate-300">Amount</TableHead>
                <TableHead className="text-slate-300">Start Date</TableHead>
                <TableHead className="text-slate-300">End Date</TableHead>
                <TableHead className="text-slate-300">APY</TableHead>
                <TableHead className="text-slate-300">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stakingHistory.map((stake, index) => (
                <TableRow key={index} className="border-emerald-800/20 hover:bg-slate-800/30">
                  <TableCell className="text-emerald-400">{stake.user}</TableCell>
                  <TableCell className="text-white">{stake.package}</TableCell>
                  <TableCell className="text-slate-300">{stake.amount}</TableCell>
                  <TableCell className="text-slate-300">{stake.startDate}</TableCell>
                  <TableCell className="text-slate-300">{stake.endDate}</TableCell>
                  <TableCell className="text-emerald-400">{stake.apy}</TableCell>
                  <TableCell>
                    <Badge 
                      className={
                        stake.status === 'Active' 
                          ? 'bg-emerald-900/20 text-emerald-400 border-emerald-600/30' 
                          : 'bg-slate-700/50 text-slate-400 border-slate-600/30'
                      }
                    >
                      {stake.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
