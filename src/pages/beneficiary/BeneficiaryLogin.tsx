import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import AnimatedButton from '@/components/AnimatedButton';
import AnimatedCard from '@/components/AnimatedCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Lock, ArrowLeft } from 'lucide-react';

const BeneficiaryLogin: React.FC = () => {
  const [customerId, setCustomerId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useUser();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication
    if (customerId && password) {
      login({
        id: customerId,
        name: 'John Doe',
        role: 'beneficiary',
        email: 'john@example.com'
      });
      navigate('/beneficiary/dashboard');
    }
  };

  return (
    <div className="min-h-screen gradient-bank flex items-center justify-center relative bank-theme">
      <div className="w-full max-w-md px-6">
        <AnimatedButton
          variant="bank"
          size="sm"
          onClick={() => navigate('/')}
          className="mb-8 bg-white/10 hover:bg-white/20 border-white/20 text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </AnimatedButton>

        <AnimatedCard gradient bankTheme className="p-8 backdrop-blur-sm border-white/10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Beneficiary Login</h2>
            <p className="text-white/80">Enter your credentials to access your loan dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="customerId" className="text-white">Customer ID</Label>
              <Input
                id="customerId"
                type="text"
                placeholder="Enter your Customer ID"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                className="bg-white/5 border-white/20 text-white placeholder:text-white/60"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/5 border-white/20 text-white placeholder:text-white/60"
                required
              />
            </div>

            <AnimatedButton
              type="submit"
              variant="success"
              size="lg"
              glow
              className="w-full"
            >
              <Lock className="w-4 h-4 mr-2" />
              Sign In
            </AnimatedButton>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/60 text-sm">
              Demo credentials: Any Customer ID + Password
            </p>
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
};

export default BeneficiaryLogin;