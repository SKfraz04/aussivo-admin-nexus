import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon, Shuffle, Sparkles } from 'lucide-react';
import { format } from 'date-fns';

interface CreatePromoCodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreatePromoCode: (promoData: any) => void;
}

export function CreatePromoCodeDialog({ 
  open, 
  onOpenChange, 
  onCreatePromoCode 
}: CreatePromoCodeDialogProps) {
  const [promoType, setPromoType] = useState('public');
  const [discountType, setDiscountType] = useState('percentage');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [formData, setFormData] = useState({
    code: '',
    description: '',
    percentage: 0,
    amount: 0,
    bonusPercentage: 0,
    maxDiscount: 0,
    usageLimit: 100,
    minPurchase: 0,
    // User-centric specific fields
    targetType: 'all', // all, specific-users, user-groups, email-domains
    specificUsers: '',
    userGroups: [],
    emailDomains: '',
    usagePerUser: 1,
    customerSegment: 'all',
    // Public specific fields
    isStackable: false,
    priority: 1,
    redemptionLimit: 'unlimited',
  });

  const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData(prev => ({ ...prev, code: result }));
  };

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const promoData = {
      ...formData,
      promoType,
      discountType,
      startDate,
      endDate,
    };
    onCreatePromoCode(promoData);
    onOpenChange(false);
    // Reset form
    setFormData({
      code: '',
      description: '',
      percentage: 0,
      amount: 0,
      bonusPercentage: 0,
      maxDiscount: 0,
      usageLimit: 100,
      minPurchase: 0,
      targetType: 'all',
      specificUsers: '',
      userGroups: [],
      emailDomains: '',
      usagePerUser: 1,
      customerSegment: 'all',
      isStackable: false,
      priority: 1,
      redemptionLimit: 'unlimited',
    });
    setStartDate(undefined);
    setEndDate(undefined);
  };

  const renderDiscountFields = () => {
    switch (discountType) {
      case 'percentage':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="percentage" className="text-slate-300">Percentage (%)</Label>
              <Input
                id="percentage"
                type="number"
                min="0"
                max="100"
                value={formData.percentage}
                onChange={(e) => handleInputChange('percentage', Number(e.target.value))}
                className="bg-slate-800/50 border-slate-600 text-white"
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxDiscount" className="text-slate-300">Max Discount ($)</Label>
              <Input
                id="maxDiscount"
                type="number"
                min="0"
                value={formData.maxDiscount}
                onChange={(e) => handleInputChange('maxDiscount', Number(e.target.value))}
                className="bg-slate-800/50 border-slate-600 text-white"
                placeholder="0"
              />
            </div>
          </div>
        );
      case 'fixed':
        return (
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-slate-300">Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              min="0"
              value={formData.amount}
              onChange={(e) => handleInputChange('amount', Number(e.target.value))}
              className="bg-slate-800/50 border-slate-600 text-white"
              placeholder="0"
            />
          </div>
        );
      case 'bonus':
        return (
          <div className="space-y-2">
            <Label htmlFor="bonusPercentage" className="text-slate-300">Bonus %</Label>
            <Input
              id="bonusPercentage"
              type="number"
              min="0"
              value={formData.bonusPercentage}
              onChange={(e) => handleInputChange('bonusPercentage', Number(e.target.value))}
              className="bg-slate-800/50 border-slate-600 text-white"
              placeholder="0"
            />
          </div>
        );
      default:
        return null;
    }
  };

  const renderUserCentricFields = () => {
    if (promoType !== 'user-centric') return null;
    
    return (
      <div className="space-y-4 p-4 bg-slate-800/30 rounded-lg border border-slate-700">
        <h4 className="text-lg font-semibold text-emerald-400">Targeting Configuration</h4>
        
        {/* Target Type */}
        <div className="space-y-2">
          <Label className="text-slate-300 font-medium">Target Type</Label>
          <Select value={formData.targetType} onValueChange={(value) => handleInputChange('targetType', value)}>
            <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="specific-users">Specific Users</SelectItem>
              <SelectItem value="user-groups">User Groups</SelectItem>
              <SelectItem value="email-domains">Email Domains</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Conditional Fields Based on Target Type */}
        {formData.targetType === 'specific-users' && (
          <div className="space-y-2">
            <Label htmlFor="specificUsers" className="text-slate-300 font-medium">Specific Users (Email/Username)</Label>
            <Textarea
              id="specificUsers"
              value={formData.specificUsers}
              onChange={(e) => handleInputChange('specificUsers', e.target.value)}
              className="bg-slate-800/50 border-slate-600 text-white resize-none"
              placeholder="Enter emails or usernames, separated by commas"
              rows={3}
            />
          </div>
        )}

        {formData.targetType === 'email-domains' && (
          <div className="space-y-2">
            <Label htmlFor="emailDomains" className="text-slate-300 font-medium">Email Domains</Label>
            <Input
              id="emailDomains"
              value={formData.emailDomains}
              onChange={(e) => handleInputChange('emailDomains', e.target.value)}
              className="bg-slate-800/50 border-slate-600 text-white"
              placeholder="example.com, company.org"
            />
          </div>
        )}

        {/* Customer Segment */}
        <div className="space-y-2">
          <Label className="text-slate-300 font-medium">Customer Segment</Label>
          <Select value={formData.customerSegment} onValueChange={(value) => handleInputChange('customerSegment', value)}>
            <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              <SelectItem value="all">All Customers</SelectItem>
              <SelectItem value="new">New Customers</SelectItem>
              <SelectItem value="returning">Returning Customers</SelectItem>
              <SelectItem value="vip">VIP Customers</SelectItem>
              <SelectItem value="inactive">Inactive Customers</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Usage Per User */}
        <div className="space-y-2">
          <Label htmlFor="usagePerUser" className="text-slate-300 font-medium">Usage Per User</Label>
          <Input
            id="usagePerUser"
            type="number"
            min="1"
            value={formData.usagePerUser}
            onChange={(e) => handleInputChange('usagePerUser', Number(e.target.value))}
            className="bg-slate-800/50 border-slate-600 text-white"
            placeholder="1"
          />
        </div>
      </div>
    );
  };

  const renderPublicFields = () => {
    if (promoType !== 'public') return null;
    
    return (
      <div className="space-y-4 p-4 bg-slate-800/30 rounded-lg border border-slate-700">
        <h4 className="text-lg font-semibold text-emerald-400">Public Code Configuration</h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Priority */}
          <div className="space-y-2">
            <Label htmlFor="priority" className="text-slate-300 font-medium">Priority Level</Label>
            <Select value={formData.priority.toString()} onValueChange={(value) => handleInputChange('priority', Number(value))}>
              <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="1">High Priority</SelectItem>
                <SelectItem value="2">Medium Priority</SelectItem>
                <SelectItem value="3">Low Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Redemption Limit */}
          <div className="space-y-2">
            <Label className="text-slate-300 font-medium">Redemption Limit</Label>
            <Select value={formData.redemptionLimit} onValueChange={(value) => handleInputChange('redemptionLimit', value)}>
              <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="unlimited">Unlimited</SelectItem>
                <SelectItem value="once-per-user">Once Per User</SelectItem>
                <SelectItem value="daily">Daily Limit</SelectItem>
                <SelectItem value="weekly">Weekly Limit</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stackable Option */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isStackable"
            checked={formData.isStackable}
            onChange={(e) => handleInputChange('isStackable', e.target.checked)}
            className="w-4 h-4 text-emerald-600 bg-slate-800 border-slate-600 rounded focus:ring-emerald-500"
          />
          <Label htmlFor="isStackable" className="text-slate-300 font-medium">
            Allow stacking with other codes
          </Label>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glassmorphism border-emerald-800/30 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-emerald-400" />
            Create New Promo Code
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Promo Type */}
          <div className="space-y-2">
            <Label className="text-slate-300 font-medium">Promo Type</Label>
            <Select value={promoType} onValueChange={setPromoType}>
              <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="public">Public (Available to All Users)</SelectItem>
                <SelectItem value="user-centric">User-Centric (Targeted Users)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Code Generation */}
          <div className="space-y-2">
            <Label htmlFor="code" className="text-slate-300 font-medium">Code</Label>
            <div className="flex gap-2">
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => handleInputChange('code', e.target.value)}
                className="bg-slate-800/50 border-slate-600 text-white flex-1"
                placeholder="Enter promo code"
              />
              <Button
                type="button"
                variant="outline"
                onClick={generateCode}
                className="border-emerald-600/50 text-emerald-400 hover:bg-emerald-600/20 px-4"
              >
                <Shuffle className="h-4 w-4 mr-2" />
                Generate
              </Button>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-slate-300 font-medium">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="bg-slate-800/50 border-slate-600 text-white resize-none"
              placeholder="Brief description of the promo code"
              rows={3}
            />
          </div>

          {/* Discount Type */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-slate-300 font-medium">Discount Type</Label>
              <Select value={discountType} onValueChange={setDiscountType}>
                <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="percentage">Percentage Discount</SelectItem>
                  <SelectItem value="fixed">Fixed Amount Discount</SelectItem>
                  <SelectItem value="bonus">Bonus Tokens</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Dynamic Discount Fields */}
            {renderDiscountFields()}
          </div>

          {/* Type-specific Configuration */}
          {renderUserCentricFields()}
          {renderPublicFields()}

          {/* Usage and Purchase Limits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="usageLimit" className="text-slate-300 font-medium">
                {promoType === 'user-centric' ? 'Total Usage Limit' : 'Global Usage Limit'}
              </Label>
              <Input
                id="usageLimit"
                type="number"
                min="1"
                value={formData.usageLimit}
                onChange={(e) => handleInputChange('usageLimit', Number(e.target.value))}
                className="bg-slate-800/50 border-slate-600 text-white"
                placeholder="100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minPurchase" className="text-slate-300 font-medium">Min Purchase ($)</Label>
              <Input
                id="minPurchase"
                type="number"
                min="0"
                value={formData.minPurchase}
                onChange={(e) => handleInputChange('minPurchase', Number(e.target.value))}
                className="bg-slate-800/50 border-slate-600 text-white"
                placeholder="0"
              />
            </div>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-300 font-medium">Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-slate-800/50 border-slate-600 text-white hover:bg-slate-700/50",
                      !startDate && "text-slate-400"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "dd-MM-yyyy") : "dd-mm-yyyy"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-600" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300 font-medium">End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-slate-800/50 border-slate-600 text-white hover:bg-slate-700/50",
                      !endDate && "text-slate-400"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "dd-MM-yyyy") : "dd-mm-yyyy"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-600" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                    disabled={(date) => startDate ? date < startDate : false}
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-700">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-slate-600 text-slate-300 hover:bg-slate-700 w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-emerald-600 hover:bg-emerald-700 text-white w-full sm:w-auto"
            disabled={
              !formData.code || 
              !formData.description || 
              (promoType === 'user-centric' && formData.targetType === 'specific-users' && !formData.specificUsers) ||
              (promoType === 'user-centric' && formData.targetType === 'email-domains' && !formData.emailDomains)
            }
          >
            Create Promo Code
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}