import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
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
  MoreHorizontal,
  Filter,
  Download,
  ToggleLeft,
  ToggleRight,
  CheckCircle2
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
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CreatePromoCodeDialog } from './dialogs/CreatePromoCodeDialog';
import { EditPromoCodeDialog } from './dialogs/EditPromoCodeDialog';
import { ViewPromoCodeDialog } from './dialogs/ViewPromoCodeDialog';
import { DeletePromoCodeDialog } from './dialogs/DeletePromoCodeDialog';

interface PromoCode {
  id: string;
  code: string;
  type: string;
  description: string;
  discount: string;
  usage: string;
  status: string;
  validUntil: string;
  target?: string;
  createdAt: string;
  minPurchase: number;
  discountType: 'percentage' | 'fixed' | 'bonus';
}

export function PromoCodeManagement() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('all-codes');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);
  
  // Dialog states
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPromoCode, setSelectedPromoCode] = useState<PromoCode | null>(null);

  // Settings states
  const [allowMultipleCodes, setAllowMultipleCodes] = useState(false);
  const [defaultUsageLimit, setDefaultUsageLimit] = useState(1000);

  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([
    {
      id: '1',
      code: 'WELCOME10',
      type: 'Public',
      description: 'New user welcome discount',
      discount: '10%',
      usage: '245/1000',
      status: 'active',
      validUntil: '12/31/2024',
      createdAt: '01/15/2024',
      minPurchase: 100,
      discountType: 'percentage'
    },
    {
      id: '2',
      code: 'VIP-USER-001',
      type: 'User-Centric',
      description: 'VIP user exclusive discount',
      discount: '25%',
      usage: '12/50',
      status: 'active',
      validUntil: '03/31/2024',
      target: 'VIP Platinum',
      createdAt: '01/10/2024',
      minPurchase: 500,
      discountType: 'percentage'
    },
    {
      id: '3',
      code: 'BONUS20',
      type: 'Public',
      description: '20% bonus tokens on purchase',
      discount: '+20%',
      usage: '156/500',
      status: 'active',
      validUntil: '03/31/2024',
      createdAt: '01/20/2024',
      minPurchase: 200,
      discountType: 'bonus'
    },
    {
      id: '4',
      code: 'EARLY50',
      type: 'Public',
      description: '$50 fixed discount for early birds',
      discount: '$50',
      usage: '200/200',
      status: 'expired',
      validUntil: '01/31/2024',
      createdAt: '12/01/2023',
      minPurchase: 300,
      discountType: 'fixed'
    }
  ]);

  // Filtered and searched promo codes
  const filteredPromoCodes = useMemo(() => {
    return promoCodes.filter(promo => {
      const matchesSearch = promo.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           promo.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || promo.status === statusFilter;
      const matchesType = typeFilter === 'all' || promo.type.toLowerCase().replace('-', '') === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [promoCodes, searchTerm, statusFilter, typeFilter]);

  // Tab-specific filtered codes
  const getTabCodes = () => {
    switch (activeTab) {
      case 'public-codes':
        return filteredPromoCodes.filter(promo => promo.type === 'Public');
      case 'user-centric':
        return filteredPromoCodes.filter(promo => promo.type === 'User-Centric');
      default:
        return filteredPromoCodes;
    }
  };

  // Analytics calculations
  const analytics = useMemo(() => {
    const totalCodes = promoCodes.length;
    const activeCodes = promoCodes.filter(p => p.status === 'active').length;
    const totalUses = promoCodes.reduce((acc, promo) => {
      const [used] = promo.usage.split('/').map(Number);
      return acc + used;
    }, 0);
    const conversionRate = 78.5; // Mock data - would come from backend
    
    return { totalCodes, activeCodes, totalUses, conversionRate };
  }, [promoCodes]);

  const getStatusBadge = (status: string) => {
    const variants = {
      'active': 'bg-green-900/20 text-green-400 border-green-600/30',
      'inactive': 'bg-slate-900/20 text-slate-400 border-slate-600/30',
      'expired': 'bg-red-900/20 text-red-400 border-red-600/30',
    };
    return variants[status as keyof typeof variants] || variants.inactive;
  };

  // Action handlers
  const handleCreatePromoCode = (promoData: any) => {
    const newPromoCode: PromoCode = {
      id: Date.now().toString(),
      code: promoData.code,
      type: promoData.promoType === 'public' ? 'Public' : 'User-Centric',
      description: promoData.description,
      discount: promoData.discountType === 'percentage' ? `${promoData.percentage}%` :
                promoData.discountType === 'fixed' ? `$${promoData.amount}` :
                `+${promoData.bonusPercentage}%`,
      usage: `0/${promoData.usageLimit}`,
      status: 'active',
      validUntil: promoData.endDate ? promoData.endDate.toLocaleDateString() : '',
      createdAt: new Date().toLocaleDateString(),
      minPurchase: promoData.minPurchase,
      discountType: promoData.discountType
    };
    
    setPromoCodes(prev => [newPromoCode, ...prev]);
    toast({
      title: "Promo Code Created",
      description: `${promoData.code} has been successfully created.`,
    });
  };

  const handleEditPromoCode = (promoCode: PromoCode) => {
    setSelectedPromoCode(promoCode);
    setEditDialogOpen(true);
  };

  const handleUpdatePromoCode = (updatedPromo: PromoCode) => {
    setPromoCodes(prev => prev.map(promo => 
      promo.id === updatedPromo.id ? updatedPromo : promo
    ));
    toast({
      title: "Promo Code Updated",
      description: `${updatedPromo.code} has been successfully updated.`,
    });
  };

  const handleViewPromoCode = (promoCode: PromoCode) => {
    setSelectedPromoCode(promoCode);
    setViewDialogOpen(true);
  };

  const handleDeletePromoCode = (promoCode: PromoCode) => {
    setSelectedPromoCode(promoCode);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = (promoCode: PromoCode) => {
    setPromoCodes(prev => prev.filter(promo => promo.id !== promoCode.id));
    toast({
      title: "Promo Code Deleted",
      description: `${promoCode.code} has been permanently deleted.`,
      variant: "destructive",
    });
  };

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      toast({
        title: "Code Copied",
        description: `${code} has been copied to clipboard.`,
      });
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy code to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleToggleStatus = (promoCode: PromoCode) => {
    const newStatus = promoCode.status === 'active' ? 'inactive' : 'active';
    const updatedPromo = { ...promoCode, status: newStatus };
    handleUpdatePromoCode(updatedPromo);
  };

  const handleBulkAction = (action: string) => {
    if (selectedCodes.length === 0) {
      toast({
        title: "No Selection", 
        description: "Please select promo codes to perform bulk actions.",
        variant: "destructive",
      });
      return;
    }

    switch (action) {
      case 'activate':
        setPromoCodes(prev => prev.map(promo => 
          selectedCodes.includes(promo.id) ? { ...promo, status: 'active' } : promo
        ));
        toast({
          title: "Bulk Activation", 
          description: `${selectedCodes.length} promo codes activated.`,
        });
        break;
      case 'deactivate':
        setPromoCodes(prev => prev.map(promo => 
          selectedCodes.includes(promo.id) ? { ...promo, status: 'inactive' } : promo
        ));
        toast({
          title: "Bulk Deactivation", 
          description: `${selectedCodes.length} promo codes deactivated.`,
        });
        break;
      case 'delete':
        setPromoCodes(prev => prev.filter(promo => !selectedCodes.includes(promo.id)));
        toast({
          title: "Bulk Delete", 
          description: `${selectedCodes.length} promo codes deleted.`,
          variant: "destructive",
        });
        break;
    }
    setSelectedCodes([]);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCodes(getTabCodes().map(promo => promo.id));
    } else {
      setSelectedCodes([]);
    }
  };

  const handleSelectCode = (codeId: string, checked: boolean) => {
    if (checked) {
      setSelectedCodes(prev => [...prev, codeId]);
    } else {
      setSelectedCodes(prev => prev.filter(id => id !== codeId));
    }
  };

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Code,Type,Description,Discount,Usage,Status,Valid Until,Created\n" +
      promoCodes.map(promo => 
        `${promo.code},${promo.type},${promo.description},${promo.discount},${promo.usage},${promo.status},${promo.validUntil},${promo.createdAt}`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "promo_codes.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export Complete",
      description: "Promo codes have been exported to CSV.",
    });
  };

  const tabs = [
    { id: 'all-codes', label: 'All Promo Codes' },
    { id: 'public-codes', label: 'Public Codes' },
    { id: 'user-centric', label: 'User-Centric Codes' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'settings', label: 'Settings' }
  ];

  const tabCodes = getTabCodes();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="glassmorphism p-6 rounded-xl border border-emerald-800/30">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Promo Code Management</h1>
            <div className="flex items-center gap-4 text-slate-300">
              <span>Total: {analytics.totalCodes}</span>
              <span>Active: {analytics.activeCodes}</span>
              <span>Uses: {analytics.totalUses}</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              variant="outline" 
              onClick={exportData}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button 
              className="bg-emerald-600 hover:bg-emerald-700 text-white" 
              onClick={() => setCreateDialogOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Promo Code
            </Button>
          </div>
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
          {/* Table Tabs (All Codes, Public Codes, User-Centric) */}
          {(activeTab === 'all-codes' || activeTab === 'public-codes' || activeTab === 'user-centric') && (
            <Card className="glassmorphism border-emerald-800/30">
              <CardHeader>
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-white">
                      {activeTab === 'all-codes' && 'All Promo Codes'}
                      {activeTab === 'public-codes' && 'Public Promo Codes'}
                      {activeTab === 'user-centric' && 'User-Centric Promo Codes'}
                    </CardTitle>
                    {activeTab === 'public-codes' && (
                      <p className="text-slate-300 text-sm">Codes available to all users</p>
                    )}
                    {activeTab === 'user-centric' && (
                      <p className="text-slate-300 text-sm">Targeted codes for specific users or groups</p>
                    )}
                  </div>
                  
                  {/* Filters and Search */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input 
                        placeholder="Search promo codes..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-slate-800/50 border-slate-600 text-white w-full sm:w-64"
                      />
                    </div>
                    
                    {activeTab === 'all-codes' && (
                      <>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                          <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white w-full sm:w-32">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-600">
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="expired">Expired</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Select value={typeFilter} onValueChange={setTypeFilter}>
                          <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white w-full sm:w-32">
                            <SelectValue placeholder="Type" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-600">
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="usercentric">User-Centric</SelectItem>
                          </SelectContent>
                        </Select>
                      </>
                    )}
                  </div>
                </div>
                
                {/* Bulk Actions */}
                {selectedCodes.length > 0 && (
                  <div className="flex flex-wrap items-center gap-3 p-4 bg-emerald-600/10 border border-emerald-600/20 rounded-lg">
                    <span className="text-emerald-400 font-medium">
                      {selectedCodes.length} selected
                    </span>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleBulkAction('activate')}
                        className="border-emerald-600/50 text-emerald-400 hover:bg-emerald-600/20"
                      >
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        Activate
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleBulkAction('deactivate')}
                        className="border-slate-600 text-slate-300 hover:bg-slate-700"
                      >
                        <ToggleLeft className="w-4 h-4 mr-1" />
                        Deactivate
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleBulkAction('delete')}
                        className="border-red-600/50 text-red-400 hover:bg-red-600/20"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                )}
              </CardHeader>
              
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-emerald-800/30">
                        <TableHead className="w-12">
                          <Checkbox
                            checked={selectedCodes.length === tabCodes.length && tabCodes.length > 0}
                            onCheckedChange={handleSelectAll}
                            className="border-slate-600"
                          />
                        </TableHead>
                        <TableHead className="text-slate-300">Code</TableHead>
                        {activeTab === 'all-codes' && <TableHead className="text-slate-300">Type</TableHead>}
                        <TableHead className="text-slate-300">Description</TableHead>
                        {activeTab === 'user-centric' && <TableHead className="text-slate-300">Target</TableHead>}
                        <TableHead className="text-slate-300">Discount</TableHead>
                        <TableHead className="text-slate-300">Usage</TableHead>
                        <TableHead className="text-slate-300">Status</TableHead>
                        {activeTab === 'all-codes' && <TableHead className="text-slate-300">Valid Until</TableHead>}
                        <TableHead className="text-slate-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tabCodes.map((promo) => (
                        <TableRow key={promo.id} className="border-emerald-800/20 hover:bg-slate-800/50">
                          <TableCell>
                            <Checkbox
                              checked={selectedCodes.includes(promo.id)}
                              onCheckedChange={(checked) => handleSelectCode(promo.id, checked as boolean)}
                              className="border-slate-600"
                            />
                          </TableCell>
                          <TableCell className="text-white font-mono font-bold">{promo.code}</TableCell>
                          {activeTab === 'all-codes' && (
                            <TableCell>
                              <Badge className={promo.type === 'Public' ? 'bg-blue-900/20 text-blue-400 border-blue-600/30' : 'bg-purple-900/20 text-purple-400 border-purple-600/30'}>
                                {promo.type}
                              </Badge>
                            </TableCell>
                          )}
                          <TableCell className="text-slate-300 max-w-xs truncate">{promo.description}</TableCell>
                          {activeTab === 'user-centric' && promo.target && (
                            <TableCell>
                              <Badge className="bg-purple-900/20 text-purple-400 border-purple-600/30">
                                {promo.target}
                              </Badge>
                            </TableCell>
                          )}
                          <TableCell className="text-emerald-400 font-bold">{promo.discount}</TableCell>
                          <TableCell>
                            {activeTab === 'user-centric' ? (
                              <div className="space-y-1">
                                <div className="text-white">{promo.usage}</div>
                                <div className="text-xs text-slate-400">Per user: 1</div>
                              </div>
                            ) : (
                              <div className="text-white">{promo.usage}</div>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusBadge(promo.status)}>
                              {promo.status}
                            </Badge>
                          </TableCell>
                          {activeTab === 'all-codes' && (
                            <TableCell className="text-slate-300">{promo.validUntil}</TableCell>
                          )}
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-white">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-slate-800 border-slate-600">
                                {activeTab === 'user-centric' && (
                                  <>
                                    <DropdownMenuItem 
                                      onClick={() => handleViewPromoCode(promo)}
                                      className="text-slate-300 hover:text-white hover:bg-slate-700"
                                    >
                                      <Eye className="mr-2 h-4 w-4" />
                                      View Details
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator className="bg-slate-600" />
                                  </>
                                )}
                                <DropdownMenuItem 
                                  onClick={() => handleEditPromoCode(promo)}
                                  className="text-slate-300 hover:text-white hover:bg-slate-700"
                                >
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleCopyCode(promo.code)}
                                  className="text-slate-300 hover:text-white hover:bg-slate-700"
                                >
                                  <Copy className="mr-2 h-4 w-4" />
                                  Copy Code
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleToggleStatus(promo)}
                                  className="text-slate-300 hover:text-white hover:bg-slate-700"
                                >
                                  {promo.status === 'active' ? (
                                    <>
                                      <ToggleLeft className="mr-2 h-4 w-4" />
                                      Deactivate
                                    </>
                                  ) : (
                                    <>
                                      <ToggleRight className="mr-2 h-4 w-4" />
                                      Activate
                                    </>
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-slate-600" />
                                <DropdownMenuItem 
                                  onClick={() => handleDeletePromoCode(promo)}
                                  className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                                >
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
                  
                  {tabCodes.length === 0 && (
                    <div className="text-center py-12">
                      <div className="text-slate-400 text-lg mb-2">No promo codes found</div>
                      <p className="text-slate-500">Try adjusting your search or filters</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Analytics */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="glassmorphism border-emerald-800/30">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-300 text-sm font-medium">Total Promo Codes</p>
                        <p className="text-3xl font-bold text-white">{analytics.totalCodes}</p>
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
                        <p className="text-slate-300 text-sm font-medium">Active Codes</p>
                        <p className="text-3xl font-bold text-white">{analytics.activeCodes}</p>
                        <p className="text-xs text-slate-400">Currently running</p>
                      </div>
                      <div className="p-3 bg-green-600/20 rounded-full">
                        <CheckCircle2 className="h-6 w-6 text-green-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glassmorphism border-emerald-800/30">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-300 text-sm font-medium">Total Uses</p>
                        <p className="text-3xl font-bold text-white">{analytics.totalUses}</p>
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
                        <p className="text-3xl font-bold text-white">{analytics.conversionRate}%</p>
                        <p className="text-xs text-slate-400">Users who complete purchase</p>
                      </div>
                      <div className="p-3 bg-purple-600/20 rounded-full">
                        <Percent className="h-6 w-6 text-purple-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Chart Placeholder */}
              <Card className="glassmorphism border-emerald-800/30">
                <CardHeader>
                  <CardTitle className="text-white">Performance Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center border border-slate-700 rounded-lg">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-400">Performance charts will be displayed here</p>
                      <p className="text-slate-500 text-sm">Integration with analytics service required</p>
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
                      <Switch 
                        checked={allowMultipleCodes}
                        onCheckedChange={setAllowMultipleCodes}
                      />
                      <Button 
                        variant="outline" 
                        className="text-slate-300 border-slate-600 hover:bg-slate-700"
                        onClick={() => toast({
                          title: "Settings Updated",
                          description: `Multiple codes ${allowMultipleCodes ? 'enabled' : 'disabled'}.`,
                        })}
                      >
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
                          type="number"
                          value={defaultUsageLimit}
                          onChange={(e) => setDefaultUsageLimit(Number(e.target.value))}
                          className="w-24 bg-slate-800/50 border-slate-600 text-white text-center"
                        />
                        <Button 
                          variant="outline" 
                          className="text-slate-300 border-slate-600 hover:bg-slate-700"
                          onClick={() => toast({
                            title: "Default Updated",
                            description: `Default usage limit set to ${defaultUsageLimit}.`,
                          })}
                        >
                          Set Default
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-700 pt-6">
                    <div className="space-y-4">
                      <h4 className="text-white font-medium">Advanced Settings</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-slate-300 text-sm">Auto-expire after (days)</label>
                          <Input 
                            type="number"
                            defaultValue="30"
                            className="bg-slate-800/50 border-slate-600 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-slate-300 text-sm">Notification threshold (%)</label>
                          <Input 
                            type="number"
                            defaultValue="90"
                            className="bg-slate-800/50 border-slate-600 text-white"
                          />
                        </div>
                      </div>
                      <Button 
                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                        onClick={() => toast({
                          title: "Advanced Settings Saved",
                          description: "All advanced settings have been updated.",
                        })}
                      >
                        Save Advanced Settings
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* All Dialogs */}
      <CreatePromoCodeDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onCreatePromoCode={handleCreatePromoCode}
      />

      <EditPromoCodeDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        promoCode={selectedPromoCode}
        onUpdatePromoCode={handleUpdatePromoCode}
      />

      <ViewPromoCodeDialog
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
        promoCode={selectedPromoCode}
      />

      <DeletePromoCodeDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        promoCode={selectedPromoCode}
        onDeletePromoCode={handleConfirmDelete}
      />
    </div>
  );
}