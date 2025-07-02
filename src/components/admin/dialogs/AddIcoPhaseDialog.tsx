
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface IcoPhase {
  phase: string;
  price: string;
  duration: string;
  startDate: string;
  endDate: string;
  allocationSold: string;
  status: 'Active' | 'Completed' | 'Upcoming';
}

interface AddIcoPhaseDialogProps {
  onAddPhase: (phase: IcoPhase) => void;
}

export function AddIcoPhaseDialog({ onAddPhase }: AddIcoPhaseDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    phase: '',
    price: '',
    duration: '',
    startDate: '',
    endDate: '',
    allocationSold: '0%',
    status: 'Upcoming' as const
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.phase || !formData.price || !formData.duration || !formData.startDate || !formData.endDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newPhase: IcoPhase = {
      ...formData,
      allocationSold: formData.allocationSold || '0%'
    };

    onAddPhase(newPhase);
    setOpen(false);
    setFormData({
      phase: '',
      price: '',
      duration: '',
      startDate: '',
      endDate: '',
      allocationSold: '0%',
      status: 'Upcoming'
    });

    toast({
      title: "Success",
      description: "ICO phase added successfully",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add New Phase
        </Button>
      </DialogTrigger>
      <DialogContent className="glassmorphism border-emerald-800/30 bg-slate-900/95 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">Add New ICO Phase</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="phase" className="text-slate-300">Phase Name *</Label>
            <Input
              id="phase"
              value={formData.phase}
              onChange={(e) => handleInputChange('phase', e.target.value)}
              className="bg-slate-800/50 border-emerald-800/30 text-white focus:border-emerald-600"
              placeholder="e.g., Phase 4"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="price" className="text-slate-300">Price (USD) *</Label>
            <Input
              id="price"
              value={formData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              className="bg-slate-800/50 border-emerald-800/30 text-white focus:border-emerald-600"
              placeholder="e.g., $0.010"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="duration" className="text-slate-300">Duration *</Label>
            <Input
              id="duration"
              value={formData.duration}
              onChange={(e) => handleInputChange('duration', e.target.value)}
              className="bg-slate-800/50 border-emerald-800/30 text-white focus:border-emerald-600"
              placeholder="e.g., 30 days"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="startDate" className="text-slate-300">Start Date *</Label>
            <Input
              id="startDate"
              type="datetime-local"
              value={formData.startDate}
              onChange={(e) => handleInputChange('startDate', e.target.value)}
              className="bg-slate-800/50 border-emerald-800/30 text-white focus:border-emerald-600"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="endDate" className="text-slate-300">End Date *</Label>
            <Input
              id="endDate"
              type="datetime-local"
              value={formData.endDate}
              onChange={(e) => handleInputChange('endDate', e.target.value)}
              className="bg-slate-800/50 border-emerald-800/30 text-white focus:border-emerald-600"
              required
            />
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1 border-emerald-800/30 text-emerald-400 hover:bg-emerald-900/20"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Add Phase
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
