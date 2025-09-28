import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedButton from '@/components/AnimatedButton';
import AnimatedCard from '@/components/AnimatedCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  ArrowLeft, UserPlus, Mail, Phone, 
  MapPin, IndianRupee, Copy, CheckCircle 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AddCustomer: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    loanAmount: '',
    purpose: ''
  });
  const [generatedCredentials, setGeneratedCredentials] = useState<{
    customerId: string;
    password: string;
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const generateCredentials = () => {
    const customerId = 'CID' + Math.random().toString(36).substr(2, 8).toUpperCase();
    const password = Math.random().toString(36).substr(2, 10);
    
    setGeneratedCredentials({ customerId, password });
    
    toast({
      title: 'Customer Created Successfully!',
      description: 'New customer account has been created with loan approval.',
    });
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: `${type} copied to clipboard.`,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.loanAmount) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }
    generateCredentials();
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
          <h1 className="text-2xl font-bold">Add New Customer</h1>
          <p className="text-white/80">Create a new customer account with loan approval</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 pb-6">
        <div className="max-w-4xl mx-auto">
          {!generatedCredentials ? (
            /* Customer Form */
            <AnimatedCard gradient bankTheme className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserPlus className="w-8 h-8 text-success" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Customer Information</h2>
                <p className="text-white/80">Fill in the customer details to create a new account</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter customer's full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/60"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="customer@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/60"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/60"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="loanAmount" className="text-white">Loan Amount *</Label>
                    <Input
                      id="loanAmount"
                      name="loanAmount"
                      type="number"
                      placeholder="500000"
                      value={formData.loanAmount}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/60"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-white">Address</Label>
                  <Textarea
                    id="address"
                    name="address"
                    placeholder="Enter customer's complete address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/60"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purpose" className="text-white">Loan Purpose</Label>
                  <Textarea
                    id="purpose"
                    name="purpose"
                    placeholder="Describe the purpose of the loan"
                    value={formData.purpose}
                    onChange={handleInputChange}
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/60"
                    rows={3}
                  />
                </div>

                <div className="flex space-x-4">
                  <AnimatedButton
                    type="submit"
                    variant="success"
                    size="lg"
                    glow
                    className="flex-1"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Create Customer Account
                  </AnimatedButton>

                  <AnimatedButton
                    type="button"
                    variant="bank"
                    size="lg"
                    onClick={() => navigate('/bank/dashboard')}
                    className="bg-white/10 hover:bg-white/20 border-white/20 text-white"
                  >
                    Cancel
                  </AnimatedButton>
                </div>
              </form>
            </AnimatedCard>
          ) : (
            /* Success Screen with Credentials */
            <div className="space-y-6">
              <AnimatedCard gradient bankTheme className="p-8 text-center">
                <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-success" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Customer Created Successfully!</h2>
                <p className="text-white/80 mb-6">
                  New customer account has been created with loan approval of ₹{parseInt(formData.loanAmount).toLocaleString()}
                </p>
              </AnimatedCard>

              <AnimatedCard gradient bankTheme className="p-8">
                <h3 className="text-xl font-semibold text-white mb-6">Generated Credentials</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-success/10 rounded-lg border border-success/20">
                    <div>
                      <p className="text-sm text-white/80">Customer ID</p>
                      <p className="text-lg font-mono font-bold text-white">
                        {generatedCredentials.customerId}
                      </p>
                    </div>
                    <AnimatedButton
                      variant="success"
                      size="sm"
                      onClick={() => copyToClipboard(generatedCredentials.customerId, 'Customer ID')}
                    >
                      <Copy className="w-4 h-4" />
                    </AnimatedButton>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <div>
                      <p className="text-sm text-white/80">Password</p>
                      <p className="text-lg font-mono font-bold text-white">
                        {generatedCredentials.password}
                      </p>
                    </div>
                    <AnimatedButton
                      variant="success"
                      size="sm"
                      onClick={() => copyToClipboard(generatedCredentials.password, 'Password')}
                    >
                      <Copy className="w-4 h-4" />
                    </AnimatedButton>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-warning/10 border border-warning/20 rounded-lg">
                  <p className="text-warning text-sm">
                    <strong>Important:</strong> Share these credentials securely with the customer. 
                    They will need both the Customer ID and Password to access their account.
                  </p>
                </div>
              </AnimatedCard>

              <div className="flex space-x-4">
                <AnimatedButton
                  variant="success"
                  size="lg"
                  onClick={() => setGeneratedCredentials(null)}
                  glow
                  className="flex-1"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Another Customer
                </AnimatedButton>

                <AnimatedButton
                  variant="bank"
                  size="lg"
                  onClick={() => navigate('/bank/dashboard')}
                  className="flex-1 bg-white/10 hover:bg-white/20 border-white/20 text-white"
                >
                  Back to Dashboard
                </AnimatedButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;