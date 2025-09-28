import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedButton from '@/components/AnimatedButton';
import AnimatedCard from '@/components/AnimatedCard';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft, Search, Users, Edit3, 
  Trash2, UserX, Mail, Phone, 
  IndianRupee, MoreVertical, CheckCircle, AlertCircle 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ManageCustomers: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [customers, setCustomers] = useState([
    {
      id: 'CID12345ABC',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+91 98765 43210',
      loanAmount: 500000,
      utilizedAmount: 325000,
      utilizationPercent: 65,
      status: 'active',
      joinDate: '2024-01-15',
      lastActive: '2024-01-20'
    },
    {
      id: 'CID67890DEF',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+91 87654 32109',
      loanAmount: 750000,
      utilizedAmount: 600000,
      utilizationPercent: 80,
      status: 'under-review',
      joinDate: '2024-01-10',
      lastActive: '2024-01-19'
    },
    {
      id: 'CID11111GHI',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+91 76543 21098',
      loanAmount: 300000,
      utilizedAmount: 150000,
      utilizationPercent: 50,
      status: 'suspended',
      joinDate: '2024-01-05',
      lastActive: '2024-01-18'
    },
    {
      id: 'CID22222JKL',
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      phone: '+91 65432 10987',
      loanAmount: 600000,
      utilizedAmount: 420000,
      utilizationPercent: 70,
      status: 'active',
      joinDate: '2024-01-12',
      lastActive: '2024-01-21'
    }
  ]);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return { color: 'text-success bg-success/20', label: 'Active', icon: CheckCircle };
      case 'under-review':
        return { color: 'text-warning bg-warning/20', label: 'Under Review', icon: AlertCircle };
      case 'suspended':
        return { color: 'text-destructive bg-destructive/20', label: 'Suspended', icon: UserX };
      default:
        return { color: 'text-gray-400 bg-gray-100', label: 'Unknown', icon: AlertCircle };
    }
  };

  const handleEdit = (customerId: string) => {
    toast({
      title: 'Edit Customer',
      description: `Opening edit form for customer ${customerId}`,
    });
    // Navigate to edit form or open modal
  };

  const handleSuspend = (customerId: string) => {
    setCustomers(customers.map(customer =>
      customer.id === customerId
        ? { ...customer, status: customer.status === 'suspended' ? 'active' : 'suspended' }
        : customer
    ));
    
    const customer = customers.find(c => c.id === customerId);
    const action = customer?.status === 'suspended' ? 'reactivated' : 'suspended';
    
    toast({
      title: 'Status Updated',
      description: `Customer ${customer?.name} has been ${action}.`,
    });
  };

  const handleDelete = (customerId: string) => {
    const customer = customers.find(c => c.id === customerId);
    if (customer) {
      setCustomers(customers.filter(c => c.id !== customerId));
      toast({
        title: 'Customer Deleted',
        description: `${customer.name} has been removed from the system.`,
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="min-h-screen gradient-bank bank-theme relative">
      {/* Header */}
      <div className="flex items-center justify-between p-6 text-white">
        <div className="flex items-center">
          <AnimatedButton
            variant="bank"
            size="sm"
            onClick={() => navigate('/bank/dashboard')}
            className="mr-4 bg-white/10 hover:bg-white/20 border-white/20 text-white"
          >
            <ArrowLeft className="w-4 h-4" />
          </AnimatedButton>
          <div>
            <h1 className="text-2xl font-bold">Manage Customers</h1>
            <p className="text-white/80">View, edit, and manage customer accounts</p>
          </div>
        </div>
        
        <AnimatedButton
          variant="success"
          onClick={() => navigate('/bank/add-customer')}
          glow
        >
          <Users className="w-4 h-4 mr-2" />
          Add Customer
        </AnimatedButton>
      </div>

      {/* Search and Stats */}
      <div className="px-6 mb-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-6 mb-6">
            <div className="lg:col-span-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                <Input
                  placeholder="Search customers by name, ID, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 h-12"
                />
              </div>
            </div>
            
            <AnimatedCard gradient bankTheme className="p-4 text-center">
              <p className="text-2xl font-bold text-white">{customers.length}</p>
              <p className="text-white/60 text-sm">Total Customers</p>
            </AnimatedCard>
          </div>
        </div>
      </div>

      {/* Customers Grid */}
      <div className="px-6 pb-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCustomers.map((customer, index) => {
              const statusConfig = getStatusConfig(customer.status);
              const StatusIcon = statusConfig.icon;

              return (
                <AnimatedCard
                  key={customer.id}
                  gradient
                  bankTheme
                  className="p-6 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-success" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{customer.name}</h3>
                        <p className="text-sm text-white/60">{customer.id}</p>
                      </div>
                    </div>
                    
                    <div className={`flex items-center space-x-2 px-2 py-1 rounded-full text-xs ${statusConfig.color}`}>
                      <StatusIcon className="w-3 h-3" />
                      <span>{statusConfig.label}</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-white/80">
                      <Mail className="w-4 h-4" />
                      <span>{customer.email}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm text-white/80">
                      <Phone className="w-4 h-4" />
                      <span>{customer.phone}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm text-white/80">
                      <IndianRupee className="w-4 h-4" />
                      <span>₹{customer.loanAmount.toLocaleString()} ({customer.utilizationPercent}% utilized)</span>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <div className="flex justify-between items-center text-xs text-white/60 mb-3">
                      <span>Joined: {customer.joinDate}</span>
                      <span>Last Active: {customer.lastActive}</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <AnimatedButton
                        variant="success"
                        size="sm"
                        onClick={() => handleEdit(customer.id)}
                        className="flex-1"
                      >
                        <Edit3 className="w-3 h-3 mr-1" />
                        Edit
                      </AnimatedButton>
                      
                      <AnimatedButton
                        variant={customer.status === 'suspended' ? 'success' : 'warning'}
                        size="sm"
                        onClick={() => handleSuspend(customer.id)}
                        className="flex-1"
                      >
                        <UserX className="w-3 h-3 mr-1" />
                        {customer.status === 'suspended' ? 'Reactivate' : 'Suspend'}
                      </AnimatedButton>
                      
                      <AnimatedButton
                        variant="bank"
                        size="sm"
                        onClick={() => handleDelete(customer.id)}
                        className="bg-destructive/20 hover:bg-destructive/30 border-destructive/30 text-destructive"
                      >
                        <Trash2 className="w-3 h-3" />
                      </AnimatedButton>
                    </div>
                  </div>
                </AnimatedCard>
              );
            })}
          </div>

          {filteredCustomers.length === 0 && (
            <AnimatedCard gradient bankTheme className="p-12 text-center">
              <Users className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Customers Found</h3>
              <p className="text-white/60 mb-6">
                {searchQuery 
                  ? `No customers match your search for "${searchQuery}"`
                  : 'No customers have been added yet'
                }
              </p>
              {!searchQuery && (
                <AnimatedButton
                  variant="success"
                  onClick={() => navigate('/bank/add-customer')}
                  glow
                >
                  <Users className="w-4 h-4 mr-2" />
                  Add First Customer
                </AnimatedButton>
              )}
            </AnimatedCard>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageCustomers;