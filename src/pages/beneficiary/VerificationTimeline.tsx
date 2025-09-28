import React from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedButton from '@/components/AnimatedButton';
import AnimatedCard from '@/components/AnimatedCard';
import { CheckCircle, Clock, XCircle, ArrowLeft, FileText } from 'lucide-react';

const VerificationTimeline: React.FC = () => {
  const navigate = useNavigate();

  const timelineSteps = [
    {
      id: 1,
      title: 'Loan Sanctioned',
      description: 'Your loan application has been approved',
      status: 'completed',
      date: '2024-01-15',
      icon: CheckCircle
    },
    {
      id: 2,
      title: 'Documents Uploaded',
      description: 'Proof of utilization documents submitted',
      status: 'completed',
      date: '2024-01-20',
      icon: FileText
    },
    {
      id: 3,
      title: 'Under Review',
      description: 'Bank is reviewing your submitted documents',
      status: 'in-progress',
      date: '2024-01-22',
      icon: Clock
    },
    {
      id: 4,
      title: 'Verification Complete',
      description: 'Documents verified and loan utilization approved',
      status: 'pending',
      date: 'Pending',
      icon: CheckCircle
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success/20';
      case 'in-progress':
        return 'text-warning bg-warning/20 animate-pulse';
      case 'pending':
        return 'text-gray-400 bg-gray-100';
      case 'rejected':
        return 'text-destructive bg-destructive/20';
      default:
        return 'text-gray-400 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen gradient-bank bank-theme relative">
      {/* Header */}
      <div className="flex items-center p-6 text-white">
        <AnimatedButton
          variant="bank"
          size="sm"
          onClick={() => navigate('/beneficiary/dashboard')}
          className="mr-4 bg-white/10 hover:bg-white/20 border-white/20 text-white"
        >
          <ArrowLeft className="w-4 h-4" />
        </AnimatedButton>
        <div>
          <h1 className="text-2xl font-bold">Verification Timeline</h1>
          <p className="text-white/80">Track your loan verification progress</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 pb-6">
        <div className="max-w-3xl mx-auto">
          <AnimatedCard gradient className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
              Loan Verification Process
            </h2>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>

              {/* Timeline Steps */}
              <div className="space-y-8">
                {timelineSteps.map((step, index) => {
                  const Icon = step.icon;
                  
                  return (
                    <div
                      key={step.id}
                      className="relative flex items-start animate-slide-up"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      {/* Step Icon */}
                      <div className={`
                        relative z-10 flex items-center justify-center w-16 h-16 rounded-full
                        ${getStatusColor(step.status)}
                        transition-all duration-300
                      `}>
                        <Icon className="w-8 h-8" />
                      </div>

                      {/* Step Content */}
                      <div className="ml-6 flex-1">
                        <AnimatedCard className="p-6 card-hover">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="text-xl font-semibold text-gray-800">
                              {step.title}
                            </h3>
                            <span className={`
                              px-3 py-1 rounded-full text-sm font-medium
                              ${step.status === 'completed' ? 'bg-success/20 text-success' : ''}
                              ${step.status === 'in-progress' ? 'bg-warning/20 text-warning' : ''}
                              ${step.status === 'pending' ? 'bg-gray-100 text-gray-600' : ''}
                            `}>
                              {step.status === 'completed' ? 'Completed' : ''}
                              {step.status === 'in-progress' ? 'In Progress' : ''}
                              {step.status === 'pending' ? 'Pending' : ''}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 mb-3">{step.description}</p>
                          
                          <p className="text-sm text-gray-500">
                            {step.date !== 'Pending' ? `Completed on ${step.date}` : 'Awaiting completion'}
                          </p>
                        </AnimatedCard>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-center space-x-4">
              <AnimatedButton
                variant="hero"
                onClick={() => navigate('/beneficiary/status')}
                glow
              >
                View Detailed Status
              </AnimatedButton>
              
              <AnimatedButton
                variant="success"
                onClick={() => navigate('/beneficiary/upload')}
                glow
              >
                Upload More Documents
              </AnimatedButton>
            </div>
          </AnimatedCard>
        </div>
      </div>
    </div>
  );
};

export default VerificationTimeline;