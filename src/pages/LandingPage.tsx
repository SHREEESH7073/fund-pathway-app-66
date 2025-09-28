import React from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedButton from '@/components/AnimatedButton';
import { User, Building2, Shield, TrendingUp } from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-beneficiary flex items-center justify-center relative overflow-auto py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center text-white z-10">
        <div className="animate-fade-in-scale">
          <Shield className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6" />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
            Loan Utilization
            <br />
            <span className="text-white/90">Tracking System</span>
          </h1>
          <p className="text-sm sm:text-lg text-white/80 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-4">
            Track your loan progress with real-time verification, secure document uploads, 
            and transparent communication between beneficiaries and financial institutions.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto px-4">
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-white/20 card-hover">
              <User className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-3 text-white" />
              <h3 className="text-lg sm:text-xl font-semibold mb-3">For Beneficiaries</h3>
              <p className="text-white/80 mb-4 text-sm sm:text-base">
                Upload verification documents, track loan utilization progress, 
                and receive real-time updates on your application status.
              </p>
              <AnimatedButton
                variant="black"
                size="lg"
                glow
                onClick={() => navigate('/login/beneficiary')}
                className="w-full text-sm sm:text-base py-2 sm:py-3"
              >
                Continue as Beneficiary
              </AnimatedButton>
            </div>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-white/20 card-hover">
              <Building2 className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-3 text-white" />
              <h3 className="text-lg sm:text-xl font-semibold mb-3">For Bank Employees</h3>
              <p className="text-white/80 mb-4 text-sm sm:text-base">
                Manage customer applications, update loan progress, 
                and oversee the verification process with powerful tools.
              </p>
              <AnimatedButton
                variant="bank"
                size="lg"
                glow
                onClick={() => navigate('/login/bank')}
                className="w-full bg-white/20 hover:bg-white/30 border-white/30 text-sm sm:text-base py-2 sm:py-3"
              >
                Bank Employee Login
              </AnimatedButton>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center justify-center space-x-4 sm:space-x-6 text-white/60 text-sm sm:text-base">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Real-time Tracking</span>
            </div>
            <div className="w-px h-4 sm:h-6 bg-white/30"></div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Secure Verification</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;