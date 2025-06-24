
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, BarChart, TrendingUp, DollarSign } from 'lucide-react';

export function ReportsAnalytics() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glassmorphism p-6 rounded-xl border border-emerald-800/30">
        <h1 className="text-3xl font-bold text-white mb-2">Reports & Analytics</h1>
        <p className="text-slate-300">Comprehensive analytics, performance metrics, and detailed reports.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glassmorphism border-emerald-800/30">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-600/20 rounded-lg">
                <DollarSign className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">$2.4M</p>
                <p className="text-slate-300 text-sm">Total Volume</p>
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
                <p className="text-2xl font-bold text-white">+12.5%</p>
                <p className="text-slate-300 text-sm">Growth Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glassmorphism border-emerald-800/30">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600/20 rounded-lg">
                <BarChart className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">15,432</p>
                <p className="text-slate-300 text-sm">Transactions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glassmorphism border-emerald-800/30">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-600/20 rounded-lg">
                <PieChart className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">89.2%</p>
                <p className="text-slate-300 text-sm">Success Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glassmorphism border-emerald-800/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart className="w-5 h-5" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Daily Active Users</span>
                <span className="text-white font-medium">3,247</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Average Session Time</span>
                <span className="text-white font-medium">12m 34s</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Conversion Rate</span>
                <span className="text-white font-medium">4.8%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">User Retention (7d)</span>
                <span className="text-white font-medium">76.3%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glassmorphism border-emerald-800/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Revenue Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Staking Fees</span>
                <span className="text-white font-medium">$156,230</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Transaction Fees</span>
                <span className="text-white font-medium">$89,450</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Premium Features</span>
                <span className="text-white font-medium">$45,670</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Partnerships</span>
                <span className="text-white font-medium">$23,890</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
