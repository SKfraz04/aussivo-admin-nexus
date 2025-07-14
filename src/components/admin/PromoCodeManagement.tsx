import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Tag,
  Search,
  Copy,
  Eye,
  Trash2,
  TrendingUp,
  Percent,
  Edit,
  Plus,
  MoreHorizontal
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function PromoCodeManagement() {
  const [activeTab, setActiveTab] = useState('all-codes');

  const promoCodes = [
    {
      code: 'WELCOME10',
      type: 'Public',
      description: 'New user welcome discount',
      discount: '10%',
      usage: '245/1000',
      status: 'active',
      validUntil: '12/31/2024'
    },
    {
      code: 'VIP-USER-001',
      type: 'User-Centric',
      description: 'VIP user exclusive discount',
      discount: '25%',
      usage: '12/50',
      status: 'active',
      validUntil: '3/31/2024',
      target: 'VIP Platinum'
    },
    {
      code: 'BONUS20',
      type: 'Public',
      description: '20% bonus tokens on purchase',
      discount: '+20%',
      usage: '156/500',
      status: 'active',
      validUntil: '3/31/2024'
    },
    {
      code: 'EARLY50',
      type: 'Public',
      description: '$50 fixed discount for early birds',
      discount: '$50',
      usage: '200/200',
      status: 'expired',
      validUntil: '1/31/2024'
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      'active': 'bg-green-900/20 text-green-400 border-green-600/30',
      'inactive': 'bg-slate-900/20 text-slate-400 border-slate-600/30',
      'expired': 'bg-red-900/20 text-red-400 border-red-600/30',
    };
    return variants[status as keyof typeof variants] || variants.inactive;
  };

  const tabs = [
    { id: 'all-codes', label: 'All Promo Codes' },
    { id: 'public-codes', label: 'Public Codes' },
    { id: 'user-centric', label: 'User-Centric Codes' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'settings', label: 'Settings' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="glassmorphism p-6 rounded-xl border border-emerald-800/30">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Promo Code Management</h1>
            <p className="text-slate-300">Create and manage promotional codes for token sales</p>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Create Promo Code
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="glassmorphism border border-emerald-800/30 rounded-xl">
        <div className="flex border-b border-emerald-800/30 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all duration-200 ${
                activeTab === tab.id
                  ? 'text-white bg-emerald-600/20 border-b-2 border-emerald-400'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* All Promo Codes */}
          {activeTab === 'all-codes' && (
            <Card className="glassmorphism border-emerald-800/30">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <CardTitle className="text-white">All Promo Codes</CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input 
                      placeholder="Search promo codes..." 
                      className="pl-10 bg-slate-800/50 border-slate-600 text-white w-full sm:w-64"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-emerald-800/30">
                        <TableHead className="text-slate-300">Code</TableHead>
                        <TableHead className="text-slate-300">Type</TableHead>
                        <TableHead className="text-slate-300">Description</TableHead>
                        <TableHead className="text-slate-300">Discount</TableHead>
                        <TableHead className="text-slate-300">Usage</TableHead>
                        <TableHead className="text-slate-300">Status</TableHead>
                        <TableHead className="text-slate-300">Valid Until</TableHead>
                        <TableHead className="text-slate-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {promoCodes.map((promo, index) => (
                        <TableRow key={index} className="border-emerald-800/20 hover:bg-slate-800/50">
                          <TableCell className="text-white font-mono font-bold">{promo.code}</TableCell>
                          <TableCell>
                            <Badge className={promo.type === 'Public' ? 'bg-blue-900/20 text-blue-400 border-blue-600/30' : 'bg-purple-900/20 text-purple-400 border-purple-600/30'}>
                              {promo.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-slate-300 max-w-xs truncate">{promo.description}</TableCell>
                          <TableCell className="text-emerald-400 font-bold">{promo.discount}</TableCell>
                          <TableCell className="text-white">{promo.usage}</TableCell>
                          <TableCell>
                            <Badge className={getStatusBadge(promo.status)}>
                              {promo.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-slate-300">{promo.validUntil}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-white">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-slate-800 border-slate-600">
                                <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-700">
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-700">
                                  <Copy className="mr-2 h-4 w-4" />
                                  Copy Code
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-400 hover:text-red-300 hover:bg-red-900/20">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Public Codes */}
          {activeTab === 'public-codes' && (
            <Card className="glassmorphism border-emerald-800/30">
              <CardHeader>
                <CardTitle className="text-white">Public Promo Codes</CardTitle>
                <p className="text-slate-300">Codes available to all users</p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-emerald-800/30">
                        <TableHead className="text-slate-300">Code</TableHead>
                        <TableHead className="text-slate-300">Description</TableHead>
                        <TableHead className="text-slate-300">Discount</TableHead>
                        <TableHead className="text-slate-300">Usage</TableHead>
                        <TableHead className="text-slate-300">Status</TableHead>
                        <TableHead className="text-slate-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {promoCodes.filter(promo => promo.type === 'Public').map((promo, index) => (
                        <TableRow key={index} className="border-emerald-800/20 hover:bg-slate-800/50">
                          <TableCell className="text-white font-mono font-bold">{promo.code}</TableCell>
                          <TableCell className="text-slate-300">{promo.description}</TableCell>
                          <TableCell className="text-emerald-400 font-bold">{promo.discount}</TableCell>
                          <TableCell className="text-white">{promo.usage}</TableCell>
                          <TableCell>
                            <Badge className={getStatusBadge(promo.status)}>
                              {promo.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-white">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-slate-800 border-slate-600">
                                <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-700">
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-700">
                                  <Copy className="mr-2 h-4 w-4" />
                                  Copy Code
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* User-Centric Codes */}
          {activeTab === 'user-centric' && (
            <Card className="glassmorphism border-emerald-800/30">
              <CardHeader>
                <CardTitle className="text-white">User-Centric Promo Codes</CardTitle>
                <p className="text-slate-300">Targeted codes for specific users or groups</p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-emerald-800/30">
                        <TableHead className="text-slate-300">Code</TableHead>
                        <TableHead className="text-slate-300">Description</TableHead>
                        <TableHead className="text-slate-300">Target</TableHead>
                        <TableHead className="text-slate-300">Discount</TableHead>
                        <TableHead className="text-slate-300">Usage</TableHead>
                        <TableHead className="text-slate-300">Status</TableHead>
                        <TableHead className="text-slate-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {promoCodes.filter(promo => promo.type === 'User-Centric').map((promo, index) => (
                        <TableRow key={index} className="border-emerald-800/20 hover:bg-slate-800/50">
                          <TableCell className="text-white font-mono font-bold">{promo.code}</TableCell>
                          <TableCell className="text-slate-300">{promo.description}</TableCell>
                          <TableCell>
                            <Badge className="bg-purple-900/20 text-purple-400 border-purple-600/30">
                              {promo.target}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-emerald-400 font-bold">{promo.discount}</TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="text-white">{promo.usage}</div>
                              <div className="text-xs text-slate-400">Per user: 1</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusBadge(promo.status)}>
                              {promo.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-white">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-slate-800 border-slate-600">
                                <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-700">
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-700">
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Analytics */}
          {activeTab === 'analytics' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="glassmorphism border-emerald-800/30">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-300 text-sm font-medium">Total Promo Codes</p>
                      <p className="text-3xl font-bold text-white">4</p>
                      <p className="text-xs text-slate-400">Active promotional campaigns</p>
                    </div>
                    <div className="p-3 bg-emerald-600/20 rounded-full">
                      <Tag className="h-6 w-6 text-emerald-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glassmorphism border-emerald-800/30">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-300 text-sm font-medium">Total Uses</p>
                      <p className="text-3xl font-bold text-white">613</p>
                      <p className="text-xs text-slate-400">Across all campaigns</p>
                    </div>
                    <div className="p-3 bg-blue-600/20 rounded-full">
                      <TrendingUp className="h-6 w-6 text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glassmorphism border-emerald-800/30">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-300 text-sm font-medium">Conversion Rate</p>
                      <p className="text-3xl font-bold text-white">78.5%</p>
                      <p className="text-xs text-slate-400">Users who complete purchase</p>
                    </div>
                    <div className="p-3 bg-purple-600/20 rounded-full">
                      <Percent className="h-6 w-6 text-purple-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Settings */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <Card className="glassmorphism border-emerald-800/30">
                <CardHeader>
                  <CardTitle className="text-white">Global Promo Code Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-white font-medium">Allow Multiple Promo Codes</h4>
                      <p className="text-slate-300 text-sm">Allow users to apply multiple promo codes per transaction</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Switch />
                      <Button variant="outline" className="text-slate-300 border-slate-600 hover:bg-slate-700">
                        Configure
                      </Button>
                    </div>
                  </div>

                  <div className="border-t border-slate-700 pt-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="text-white font-medium">Default Usage Limit</h4>
                        <p className="text-slate-300 text-sm">Default usage limit for new promo codes</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Input 
                          defaultValue="1000" 
                          className="w-24 bg-slate-800/50 border-slate-600 text-white text-center"
                        />
                        <Button variant="outline" className="text-slate-300 border-slate-600 hover:bg-slate-700">
                          Set Default
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}