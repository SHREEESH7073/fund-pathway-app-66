import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import AnimatedButton from '@/components/AnimatedButton';
import AnimatedCard from '@/components/AnimatedCard';
import { 
  ArrowLeft, User, Mail, Phone, MapPin, 
  Calendar, IndianRupee, Edit3, Moon, Sun, LogOut 
} from 'lucide-react';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const [darkMode, setDarkMode] = useState(false);

  const profileData = {
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    phone: '+91 98765 43210',
    address: '123 Main Street, Mumbai, Maharashtra 400001',
    memberSince: 'January 2024',
    customerId: user?.id || 'CID12345',
    loanAmount: '₹5,00,000',
    nextDue: '15th March 2024'
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen gradient-bank bank-theme relative">
      {/* Header */}
      <div className="flex items-center justify-between p-6 text-white">
        <div className="flex items-center">
          <AnimatedButton
            variant="bank"
            size="sm"
            onClick={() => navigate('/beneficiary/dashboard')}
            className="mr-4 bg-white/10 hover:bg-white/20 border-white/20 text-white"
          >
            <ArrowLeft className="w-4 h-4" />
          </AnimatedButton>
          <div>
            <h1 className="text-2xl font-bold">My Profile</h1>
            <p className="text-white/80">Manage your account information</p>
          </div>
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
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <AnimatedCard gradient bankTheme className="p-8 mb-6 text-center">
            <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{profileData.name}</h2>
            <p className="text-white/60 mb-4">Customer ID: {profileData.customerId}</p>
            <AnimatedButton
              variant="success"
              size="sm"
              glow
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Profile
            </AnimatedButton>
          </AnimatedCard>

          {/* Profile Information */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Personal Information */}
            <AnimatedCard gradient bankTheme className="p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Personal Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Full Name</p>
                    <p className="font-semibold text-white">{profileData.name}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Email Address</p>
                    <p className="font-semibold text-white">{profileData.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Phone Number</p>
                    <p className="font-semibold text-white">{profileData.phone}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Address</p>
                    <p className="font-semibold text-white leading-relaxed">{profileData.address}</p>
                  </div>
                </div>
              </div>
            </AnimatedCard>

            {/* Loan Information */}
            <AnimatedCard gradient bankTheme className="p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Loan Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <IndianRupee className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Sanctioned Amount</p>
                    <p className="font-semibold text-white">{profileData.loanAmount}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Member Since</p>
                    <p className="font-semibold text-white">{profileData.memberSince}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Next Due Date</p>
                    <p className="font-semibold text-white">{profileData.nextDue}</p>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          </div>

          {/* Settings */}
          <AnimatedCard gradient bankTheme className="p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Settings</h3>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                  {darkMode ? <Moon className="w-5 h-5 text-secondary" /> : <Sun className="w-5 h-5 text-secondary" />}
                </div>
                <div>
                  <p className="font-semibold text-white">Dark Mode</p>
                  <p className="text-sm text-white/60">Toggle dark theme</p>
                </div>
              </div>
              
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </AnimatedCard>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-center space-x-4">
            <AnimatedButton
              variant="bank"
              onClick={() => navigate('/beneficiary/support')}
              className="bg-white/10 hover:bg-white/20 border-white/20 text-white"
              glow
            >
              Contact Support
            </AnimatedButton>
            
            <AnimatedButton
              variant="success"
              onClick={() => navigate('/beneficiary/dashboard')}
              glow
            >
              Back to Dashboard
            </AnimatedButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;