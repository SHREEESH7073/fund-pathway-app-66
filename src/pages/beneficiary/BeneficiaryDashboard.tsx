import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import AnimatedButton from '@/components/AnimatedButton';
import AnimatedCard from '@/components/AnimatedCard';
import ProgressCircle from '@/components/ProgressCircle';
import { 
  Upload, Clock, FileCheck, Map, 
  Bell, User, MessageCircle, LogOut,
  IndianRupee, TrendingUp, CheckCircle 
} from 'lucide-react';

const BeneficiaryDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const loanData = {
    sanctioned: 500000,
    utilized: 325000,
    remaining: 175000,
    utilizationPercentage: 65
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen gradient-bank bank-theme relative">
      {/* Header */}
      <div className="flex justify-between items-center p-6 text-white">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center">
            <User className="w-8 h-8 mr-3 text-success" />
            Beneficiary Portal
          </h1>
          <p className="text-white/80">Welcome back, {user?.name}</p>
        </div>
        <AnimatedButton
          variant="bank"
          size="sm"
          onClick={handleLogout}
          className="bg-white/10 hover:bg-white/20 border-white/20 text-white"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </AnimatedButton>
      </div>

      {/* Main Content */}
      <div className="px-6 pb-6">
        {/* Loan Overview Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <AnimatedCard gradient bankTheme className="p-6 text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <IndianRupee className="w-6 h-6 text-primary" />
            </div>
            <p className="text-3xl font-bold text-white mb-2">
              ₹{loanData.sanctioned.toLocaleString()}
            </p>
            <p className="text-white/60">Sanctioned Amount</p>
          </AnimatedCard>

          <AnimatedCard gradient bankTheme className="p-6 text-center">
            <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-success" />
            </div>
            <p className="text-3xl font-bold text-white mb-2">
              ₹{loanData.utilized.toLocaleString()}
            </p>
            <p className="text-white/60">Utilized Amount</p>
          </AnimatedCard>

          <AnimatedCard gradient bankTheme className="p-6 text-center">
            <div className="w-12 h-12 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-warning" />
            </div>
            <p className="text-3xl font-bold text-white mb-2">
              ₹{loanData.remaining.toLocaleString()}
            </p>
            <p className="text-white/60">Remaining Amount</p>
          </AnimatedCard>
        </div>

        {/* Progress Circle and Quick Actions */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Progress Circle */}
          <AnimatedCard gradient bankTheme className="p-8 text-center">
            <h3 className="text-xl font-semibold text-white mb-6">Loan Utilization Progress</h3>
            <ProgressCircle
              percentage={loanData.utilizationPercentage}
              size={200}
              strokeWidth={12}
              className="mx-auto mb-4"
            />
            <p className="text-white/60">
              You've utilized {loanData.utilizationPercentage}% of your sanctioned loan amount
            </p>
          </AnimatedCard>

          {/* Quick Actions */}
          <AnimatedCard gradient bankTheme className="p-8">
            <h3 className="text-xl font-semibold text-white mb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <AnimatedButton
                variant="success"
                onClick={() => navigate('/beneficiary/upload')}
                className="h-20 flex-col space-y-2"
                glow
              >
                <Upload className="w-6 h-6" />
                <span>Upload Proof</span>
              </AnimatedButton>

              <AnimatedButton
                variant="bank"
                onClick={() => navigate('/beneficiary/timeline')}
                className="h-20 flex-col space-y-2 bg-white/10 hover:bg-white/20 border-white/20 text-white"
                glow
              >
                <Clock className="w-6 h-6" />
                <span>Timeline</span>
              </AnimatedButton>

              <AnimatedButton
                variant="bank"
                onClick={() => navigate('/beneficiary/status')}
                className="h-20 flex-col space-y-2 bg-white/10 hover:bg-white/20 border-white/20 text-white"
                glow
              >
                <FileCheck className="w-6 h-6" />
                <span>Status</span>
              </AnimatedButton>

              <AnimatedButton
                variant="success"
                onClick={() => navigate('/beneficiary/map')}
                className="h-20 flex-col space-y-2"
                glow
              >
                <Map className="w-6 h-6" />
                <span>Map View</span>
              </AnimatedButton>
            </div>
          </AnimatedCard>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-6 left-6 right-6 lg:relative lg:bottom-auto lg:left-auto lg:right-auto lg:mt-8">
          <AnimatedCard gradient bankTheme className="p-4">
            <div className="flex justify-around items-center">
              <AnimatedButton
                variant="bank"
                size="sm"
                onClick={() => navigate('/beneficiary/notifications')}
                className="flex-col space-y-1 h-16 w-16 bg-white/10 hover:bg-white/20 border-white/20 text-white"
              >
                <Bell className="w-5 h-5" />
                <span className="text-xs">Alerts</span>
              </AnimatedButton>

              <AnimatedButton
                variant="success"
                size="sm"
                onClick={() => navigate('/beneficiary/profile')}
                className="flex-col space-y-1 h-16 w-16"
              >
                <User className="w-5 h-5" />
                <span className="text-xs">Profile</span>
              </AnimatedButton>

              <AnimatedButton
                variant="bank"
                size="sm"
                onClick={() => navigate('/beneficiary/support')}
                className="flex-col space-y-1 h-16 w-16 bg-white/10 hover:bg-white/20 border-white/20 text-white relative"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="text-xs">Support</span>
              </AnimatedButton>
            </div>
          </AnimatedCard>
        </div>
      </div>
    </div>
  );
};

export default BeneficiaryDashboard;