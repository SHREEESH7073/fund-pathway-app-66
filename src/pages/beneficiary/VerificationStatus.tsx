import React from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedButton from '@/components/AnimatedButton';
import AnimatedCard from '@/components/AnimatedCard';
import { 
  ArrowLeft, FileText, MapPin, Calendar, 
  CheckCircle, Clock, AlertCircle, Camera 
} from 'lucide-react';

const VerificationStatus: React.FC = () => {
  const navigate = useNavigate();

  const proofs = [
    {
      id: 1,
      type: 'Purchase Invoice',
      date: '2024-01-20',
      location: 'Mumbai, Maharashtra',
      status: 'approved',
      thumbnail: '/api/placeholder/150/150'
    },
    {
      id: 2,
      type: 'Asset Photo',
      date: '2024-01-20',
      location: 'Mumbai, Maharashtra',
      status: 'pending',
      thumbnail: '/api/placeholder/150/150'
    },
    {
      id: 3,
      type: 'Installation Certificate',
      date: '2024-01-21',
      location: 'Mumbai, Maharashtra',
      status: 'rejected',
      thumbnail: '/api/placeholder/150/150'
    }
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'approved':
        return {
          color: 'text-success bg-success/20',
          icon: CheckCircle,
          label: 'Approved'
        };
      case 'pending':
        return {
          color: 'text-warning bg-warning/20',
          icon: Clock,
          label: 'Under Review'
        };
      case 'rejected':
        return {
          color: 'text-destructive bg-destructive/20',
          icon: AlertCircle,
          label: 'Rejected'
        };
      default:
        return {
          color: 'text-gray-400 bg-gray-100',
          icon: Clock,
          label: 'Unknown'
        };
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
          <h1 className="text-2xl font-bold">Verification Status</h1>
          <p className="text-white/80">Review your submitted documents</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 pb-6">
        <div className="max-w-4xl mx-auto">
          {/* Status Overview */}
          <AnimatedCard gradient bankTheme className="p-6 mb-6">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-success" />
                </div>
                <p className="text-2xl font-bold text-white">1</p>
                <p className="text-white/60">Approved</p>
              </div>
              
              <div>
                <div className="w-12 h-12 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-warning" />
                </div>
                <p className="text-2xl font-bold text-white">1</p>
                <p className="text-white/60">Under Review</p>
              </div>
              
              <div>
                <div className="w-12 h-12 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <AlertCircle className="w-6 h-6 text-destructive" />
                </div>
                <p className="text-2xl font-bold text-white">1</p>
                <p className="text-white/60">Rejected</p>
              </div>
            </div>
          </AnimatedCard>

          {/* Proof Cards */}
          <div className="space-y-4">
            {proofs.map((proof, index) => {
              const statusConfig = getStatusConfig(proof.status);
              const StatusIcon = statusConfig.icon;

              return (
                <AnimatedCard
                  key={proof.id}
                  bankTheme
                  className="p-6 card-hover animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start space-x-4">
                    {/* Thumbnail */}
                    <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Camera className="w-8 h-8 text-gray-400" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-semibold text-white">
                          {proof.type}
                        </h3>
                        <div className={`
                          flex items-center space-x-2 px-3 py-1 rounded-full
                          ${statusConfig.color}
                        `}>
                          <StatusIcon className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            {statusConfig.label}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6 text-sm text-white/60">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{proof.date}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>{proof.location}</span>
                        </div>
                      </div>

                      {proof.status === 'rejected' && (
                        <div className="mt-3 p-3 bg-destructive/10 rounded-lg">
                          <p className="text-sm text-destructive">
                            <strong>Rejection Reason:</strong> Image quality is too low. 
                            Please upload a clearer image showing all details.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </AnimatedCard>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-center space-x-4">
            <AnimatedButton
              variant="hero"
              onClick={() => navigate('/beneficiary/upload')}
              glow
            >
              <FileText className="w-4 h-4 mr-2" />
              Upload New Document
            </AnimatedButton>
            
            <AnimatedButton
              variant="success"
              onClick={() => navigate('/beneficiary/map')}
              glow
            >
              <MapPin className="w-4 h-4 mr-2" />
              View on Map
            </AnimatedButton>
          </div>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none opacity-10 z-0">
        <FileText className="absolute top-32 right-20 w-16 h-16 text-white animate-float" />
        <CheckCircle className="absolute bottom-40 left-20 w-12 h-12 text-white animate-float" style={{ animationDelay: '3s' }} />
        <Camera className="absolute top-1/2 left-10 w-10 h-10 text-white animate-float" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
};

export default VerificationStatus;