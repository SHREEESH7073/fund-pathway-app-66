import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import AnimatedButton from '@/components/AnimatedButton';
import AnimatedCard from '@/components/AnimatedCard';
import { 
  LogOut, Users, UserPlus, TrendingUp, 
  Settings, Bell, BarChart3, Shield, 
  FileText, MapPin, CheckCircle, AlertCircle 
} from 'lucide-react';

const BankDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const stats = {
    totalCustomers: 1247,
    activeLoans: 892,
    pendingVerifications: 34,
    approvedToday: 15
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
          <h1 className="text-2xl font-bold flex items-center">
            <Shield className="w-8 h-8 mr-3 text-success" />
            Bank Employee Portal
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

      {/* Stats Overview */}
      <div className="px-6 mb-8">
        <div className="grid md:grid-cols-4 gap-6">
          <AnimatedCard gradient bankTheme className="p-6 text-center">
            <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-success" />
            </div>
            <p className="text-3xl font-bold text-white mb-2">{stats.totalCustomers}</p>
            <p className="text-white/60">Total Customers</p>
          </AnimatedCard>

          <AnimatedCard gradient bankTheme className="p-6 text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <p className="text-3xl font-bold text-white mb-2">{stats.activeLoans}</p>
            <p className="text-white/60">Active Loans</p>
          </AnimatedCard>

          <AnimatedCard gradient bankTheme className="p-6 text-center">
            <div className="w-12 h-12 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <AlertCircle className="w-6 h-6 text-warning" />
            </div>
            <p className="text-3xl font-bold text-white mb-2">{stats.pendingVerifications}</p>
            <p className="text-white/60">Pending Reviews</p>
          </AnimatedCard>

          <AnimatedCard gradient bankTheme className="p-6 text-center">
            <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
            <p className="text-3xl font-bold text-white mb-2">{stats.approvedToday}</p>
            <p className="text-white/60">Approved Today</p>
          </AnimatedCard>
        </div>
      </div>

      {/* Main Actions */}
      <div className="px-6 pb-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Bank Operations</h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Customer Management */}
            <AnimatedCard gradient bankTheme className="p-8">
              <h3 className="text-xl font-semibold text-white mb-6">Customer Management</h3>
              
              <div className="space-y-4">
                <AnimatedButton
                  variant="success"
                  size="lg"
                  onClick={() => navigate('/bank/add-customer')}
                  glow
                  className="w-full h-16 flex items-center justify-start space-x-4 px-6"
                >
                  <UserPlus className="w-6 h-6" />
                  <div className="text-left">
                    <p className="font-semibold">Add New Customer</p>
                    <p className="text-sm text-white/80">Create new loan accounts</p>
                  </div>
                </AnimatedButton>

                <AnimatedButton
                  variant="bank"
                  size="lg"
                  onClick={() => navigate('/bank/manage-customers')}
                  glow
                  className="w-full h-16 flex items-center justify-start space-x-4 px-6 bg-white/10 hover:bg-white/20 border-white/20 text-white"
                >
                  <Users className="w-6 h-6" />
                  <div className="text-left">
                    <p className="font-semibold">Manage Customers</p>
                    <p className="text-sm text-white/80">View, edit, and suspend accounts</p>
                  </div>
                </AnimatedButton>
              </div>
            </AnimatedCard>

            {/* Loan Operations */}
            <AnimatedCard gradient bankTheme className="p-8">
              <h3 className="text-xl font-semibold text-white mb-6">Loan Operations</h3>
              
              <div className="space-y-4">
                <AnimatedButton
                  variant="success"
                  size="lg"
                  onClick={() => navigate('/bank/update-progress')}
                  glow
                  className="w-full h-16 flex items-center justify-start space-x-4 px-6"
                >
                  <TrendingUp className="w-6 h-6" />
                  <div className="text-left">
                    <p className="font-semibold">Update Loan Progress</p>
                    <p className="text-sm text-white/80">Modify utilization status</p>
                  </div>
                </AnimatedButton>

                <AnimatedButton
                  variant="bank"
                  size="lg"
                  onClick={() => navigate('/bank/notifications')}
                  glow
                  className="w-full h-16 flex items-center justify-start space-x-4 px-6 bg-white/10 hover:bg-white/20 border-white/20 text-white"
                >
                  <Bell className="w-6 h-6" />
                  <div className="text-left">
                    <p className="font-semibold">Send Notifications</p>
                    <p className="text-sm text-white/80">Alert customers about updates</p>
                  </div>
                </AnimatedButton>
              </div>
            </AnimatedCard>
          </div>

          {/* Quick Stats */}
          <div className="mt-8">
            <AnimatedCard gradient bankTheme className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">System Status</h3>
                  <p className="text-white/60">All systems operational</p>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="w-3 h-3 bg-success rounded-full mx-auto mb-1"></div>
                    <p className="text-xs text-white/60">Verification</p>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 bg-success rounded-full mx-auto mb-1"></div>
                    <p className="text-xs text-white/60">Database</p>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 bg-success rounded-full mx-auto mb-1"></div>
                    <p className="text-xs text-white/60">API</p>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none opacity-5 z-0">
        <Shield className="absolute top-20 right-20 w-32 h-32 text-white animate-float" />
        <Users className="absolute bottom-40 left-20 w-24 h-24 text-white animate-float" style={{ animationDelay: '3s' }} />
        <TrendingUp className="absolute top-1/2 left-10 w-20 h-20 text-white animate-float" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
};

export default BankDashboard;