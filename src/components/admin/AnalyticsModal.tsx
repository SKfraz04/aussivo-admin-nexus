
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell } from 'recharts';
import { Download, TrendingUp, Users, DollarSign, Activity } from 'lucide-react';

interface AnalyticsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const chartData = [
  { name: 'Jan', users: 4000, revenue: 2400, volume: 2400 },
  { name: 'Feb', users: 3000, revenue: 1398, volume: 2210 },
  { name: 'Mar', users: 2000, revenue: 9800, volume: 2290 },
  { name: 'Apr', users: 2780, revenue: 3908, volume: 2000 },
  { name: 'May', users: 1890, revenue: 4800, volume: 2181 },
  { name: 'Jun', users: 2390, revenue: 3800, volume: 2500 }
];

const pieData = [
  { name: 'Core Validator', value: 35, color: '#10b981' },
  { name: 'Premium Staker', value: 25, color: '#06b6d4' },
  { name: 'Basic Staker', value: 25, color: '#8b5cf6' },
  { name: 'Starter Package', value: 15, color: '#f59e0b' }
];

const config = {
  users: {
    label: "Users",
    color: "#10b981",
  },
  revenue: {
    label: "Revenue",
    color: "#06b6d4",
  },
  volume: {
    label: "Volume",
    color: "#8b5cf6",
  },
  "Core Validator": {
    label: "Core Validator",
    color: "#10b981",
  },
  "Premium Staker": {
    label: "Premium Staker",
    color: "#06b6d4",
  },
  "Basic Staker": {
    label: "Basic Staker",
    color: "#8b5cf6",
  },
  "Starter Package": {
    label: "Starter Package",
    color: "#f59e0b",
  },
};

export function AnalyticsModal({ open, onOpenChange }: AnalyticsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-slate-900 border-emerald-800/30">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl">Advanced Analytics Dashboard</DialogTitle>
          <DialogDescription className="text-slate-400">
            Comprehensive platform analytics and performance metrics
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="glassmorphism border-emerald-800/30">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-emerald-400" />
                  <div>
                    <p className="text-xs text-slate-400">Active Users</p>
                    <p className="text-lg font-bold text-white">12,847</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism border-emerald-800/30">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-emerald-400" />
                  <div>
                    <p className="text-xs text-slate-400">Revenue</p>
                    <p className="text-lg font-bold text-white">$89.2K</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism border-emerald-800/30">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-emerald-400" />
                  <div>
                    <p className="text-xs text-slate-400">Growth</p>
                    <p className="text-lg font-bold text-white">+23.4%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism border-emerald-800/30">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-emerald-400" />
                  <div>
                    <p className="text-xs text-slate-400">Volume</p>
                    <p className="text-lg font-bold text-white">$156K</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Growth Chart */}
            <Card className="glassmorphism border-emerald-800/30">
              <CardHeader>
                <CardTitle className="text-white">User Growth Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={config} className="h-64">
                  <LineChart data={chartData}>
                    <XAxis dataKey="name" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="users" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      dot={{ fill: '#10b981' }}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Revenue Chart */}
            <Card className="glassmorphism border-emerald-800/30">
              <CardHeader>
                <CardTitle className="text-white">Revenue & Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={config} className="h-64">
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="revenue" fill="#06b6d4" />
                    <Bar dataKey="volume" fill="#8b5cf6" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Package Distribution */}
            <Card className="glassmorphism border-emerald-800/30">
              <CardHeader>
                <CardTitle className="text-white">Package Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={config} className="h-64">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
                <div className="mt-4 space-y-2">
                  {pieData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-slate-300 text-sm">{item.name}</span>
                      </div>
                      <span className="text-white font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card className="glassmorphism border-emerald-800/30">
              <CardHeader>
                <CardTitle className="text-white">Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">API Response Time</span>
                  <span className="text-emerald-400 font-medium">142ms</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">System Uptime</span>
                  <span className="text-emerald-400 font-medium">99.98%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Transaction Success Rate</span>
                  <span className="text-emerald-400 font-medium">99.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Active Sessions</span>
                  <span className="text-emerald-400 font-medium">2,847</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Cache Hit Rate</span>
                  <span className="text-emerald-400 font-medium">94.5%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Export Button */}
          <div className="flex justify-end">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Download className="h-4 w-4 mr-2" />
              Export Analytics Report
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
