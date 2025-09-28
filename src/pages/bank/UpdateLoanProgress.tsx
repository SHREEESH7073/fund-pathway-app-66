import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedButton from '@/components/AnimatedButton';
import AnimatedCard from '@/components/AnimatedCard';
import ProgressCircle from '@/components/ProgressCircle';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowLeft, Search, TrendingUp, User, 
  IndianRupee, CheckCircle, Clock, AlertCircle 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const UpdateLoanProgress: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [updateData, setUpdateData] = useState({
    utilizationPercent: '',
    status: '',
    remarks: ''
  });

  // Mock customer data
  const customers = [
    {
      id: 'CID12345ABC',
      name: 'John Doe',
      email: 'john@example.com',
      loanAmount: 500000,
      utilizedAmount: 325000,
      utilizationPercent: 65,
      status: 'active',
      lastUpdate: '2024-01-20'
    },
    {
      id: 'CID67890DEF',
      name: 'Jane Smith',
      email: 'jane@example.com',
      loanAmount: 750000,
      utilizedAmount: 600000,
      utilizationPercent: 80,
      status: 'under-review',
      lastUpdate: '2024-01-19'
    },
    {
      id: 'CID11111GHI',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      loanAmount: 300000,
      utilizedAmount: 150000,
      utilizationPercent: 50,
      status: 'pending',
      lastUpdate: '2024-01-18'
    }
  ];

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCustomerSelect = (customer: any) => {
    setSelectedCustomer(customer);
    setUpdateData({
      utilizationPercent: customer.utilizationPercent.toString(),
      status: customer.status,
      remarks: ''
    });
  };

  const handleUpdate = () => {
    if (!selectedCustomer || !updateData.utilizationPercent) {
      toast({
        title: 'Error',
        description: 'Please select a customer and fill in the utilization percentage.',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: 'Progress Updated!',
      description: `Loan progress for ${selectedCustomer.name} has been updated successfully.`,
    });

    // Reset form
    setSelectedCustomer(null);
    setUpdateData({
      utilizationPercent: '',
      status: '',
      remarks: ''
    });
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return { color: 'text-success bg-success/20', label: 'Active' };
      case 'under-review':
        return { color: 'text-warning bg-warning/20', label: 'Under Review' };
      case 'pending':
        return { color: 'text-primary bg-primary/20', label: 'Pending' };
      default:
        return { color: 'text-gray-400 bg-gray-100', label: 'Unknown' };
    }
  };

  return (
    <div className="min-h-screen gradient-bank bank-theme relative">
      {/* Header */}
      <div className="flex items-center p-6 text-white">
        <AnimatedButton
          variant="bank"
          size="sm"
          onClick={() => navigate('/bank/dashboard')}
          className="mr-4 bg-white/10 hover:bg-white/20 border-white/20 text-white"
        >
          <ArrowLeft className="w-4 h-4" />
        </AnimatedButton>
        <div>
          <h1 className="text-2xl font-bold">Update Loan Progress</h1>
          <p className="text-white/80">Modify customer loan utilization and status</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 pb-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Customer Search & Selection */}
            <AnimatedCard gradient bankTheme className="p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Select Customer</h3>
              
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                  <Input
                    placeholder="Search by name or Customer ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredCustomers.map((customer) => {
                    const statusConfig = getStatusConfig(customer.status);
                    
                    return (
                      <div
                        key={customer.id}
                        onClick={() => handleCustomerSelect(customer)}
                        className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                          selectedCustomer?.id === customer.id
                            ? 'border-success bg-success/10'
                            : 'border-white/20 bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-white">{customer.name}</h4>
                            <p className="text-sm text-white/60">{customer.id}</p>
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs ${statusConfig.color}`}>
                            {statusConfig.label}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-white/60">Loan Amount</p>
                            <p className="text-white font-semibold">₹{customer.loanAmount.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-white/60">Utilization</p>
                            <p className="text-white font-semibold">{customer.utilizationPercent}%</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </AnimatedCard>

            {/* Update Form */}
            <AnimatedCard gradient bankTheme className="p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Update Progress</h3>
              
              {selectedCustomer ? (
                <div className="space-y-6">
                  {/* Customer Info */}
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-success" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white">{selectedCustomer.name}</h4>
                        <p className="text-white/60">{selectedCustomer.id}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <ProgressCircle
                          percentage={parseInt(updateData.utilizationPercent) || selectedCustomer.utilizationPercent}
                          size={100}
                          strokeWidth={8}
                          color="hsl(var(--success))"
                        />
                      </div>
                      <div className="space-y-2">
                        <div>
                          <p className="text-white/60 text-sm">Sanctioned Amount</p>
                          <p className="text-white font-semibold">₹{selectedCustomer.loanAmount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-white/60 text-sm">Current Status</p>
                          <p className="text-white font-semibold capitalize">{selectedCustomer.status.replace('-', ' ')}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Update Form */}
                  <div className="space-y-4">
                    <div>
                      <Label className="text-white">Utilization Percentage</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        placeholder="Enter percentage (0-100)"
                        value={updateData.utilizationPercent}
                        onChange={(e) => setUpdateData({...updateData, utilizationPercent: e.target.value})}
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/60"
                      />
                    </div>

                    <div>
                      <Label className="text-white">Status</Label>
                      <Select value={updateData.status} onValueChange={(value) => setUpdateData({...updateData, status: value})}>
                        <SelectTrigger className="bg-white/5 border-white/20 text-white">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="under-review">Under Review</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-white">Remarks (Optional)</Label>
                      <Input
                        placeholder="Add any remarks or notes"
                        value={updateData.remarks}
                        onChange={(e) => setUpdateData({...updateData, remarks: e.target.value})}
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/60"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <AnimatedButton
                      variant="success"
                      onClick={handleUpdate}
                      glow
                      className="flex-1"
                    >
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Update Progress
                    </AnimatedButton>
                    
                    <AnimatedButton
                      variant="bank"
                      onClick={() => setSelectedCustomer(null)}
                      className="bg-white/10 hover:bg-white/20 border-white/20 text-white"
                    >
                      Cancel
                    </AnimatedButton>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <TrendingUp className="w-16 h-16 text-white/30 mx-auto mb-4" />
                  <p className="text-white/60">Select a customer from the list to update their loan progress</p>
                </div>
              )}
            </AnimatedCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateLoanProgress;