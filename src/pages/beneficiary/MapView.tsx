import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedButton from '@/components/AnimatedButton';
import AnimatedCard from '@/components/AnimatedCard';
import { ArrowLeft, MapPin, Camera, FileText, CheckCircle, Clock, X } from 'lucide-react';

const MapView: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPin, setSelectedPin] = useState<number | null>(null);

  const proofLocations = [
    {
      id: 1,
      lat: 19.0760,
      lng: 72.8777,
      title: 'Purchase Invoice',
      status: 'approved',
      date: '2024-01-20',
      type: 'document'
    },
    {
      id: 2,
      lat: 19.0820,
      lng: 72.8810,
      title: 'Asset Photo',
      status: 'pending',
      date: '2024-01-20',
      type: 'photo'
    },
    {
      id: 3,
      lat: 19.0740,
      lng: 72.8750,
      title: 'Installation Certificate',
      status: 'rejected',
      date: '2024-01-21',
      type: 'certificate'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-success text-white';
      case 'pending':
        return 'bg-warning text-white';
      case 'rejected':
        return 'bg-destructive text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return CheckCircle;
      case 'pending':
        return Clock;
      default:
        return X;
    }
  };

  return (
    <div className="min-h-screen gradient-bank bank-theme relative">
      {/* Header */}
      <div className="flex items-center p-6 text-white relative z-20">
        <AnimatedButton
          variant="bank"
          size="sm"
          onClick={() => navigate('/beneficiary/dashboard')}
          className="mr-4 bg-white/10 hover:bg-white/20 border-white/20 text-white"
        >
          <ArrowLeft className="w-4 h-4" />
        </AnimatedButton>
        <div>
          <h1 className="text-2xl font-bold">Map View</h1>
          <p className="text-white/80">View all your uploaded proofs on the map</p>
        </div>
      </div>

      {/* Map Container */}
      <div className="px-6 pb-6 h-[calc(100vh-120px)]">
        <div className="relative h-full rounded-2xl overflow-hidden">
          {/* Mock Map Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 left-0 w-full h-full bg-blue-50 bg-opacity-50"></div>
            </div>
          </div>

          {/* Map Pins */}
          {proofLocations.map((location, index) => (
            <div
              key={location.id}
              className={`absolute transform -translate-x-1/2 -translate-y-full cursor-pointer animate-fade-in-scale z-10`}
              style={{
                left: `${20 + index * 25}%`,
                top: `${30 + index * 15}%`,
                animationDelay: `${index * 0.2}s`
              }}
              onClick={() => setSelectedPin(location.id)}
            >
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center
                ${getStatusColor(location.status)}
                shadow-lg transform transition-all duration-300 hover:scale-110
                ${selectedPin === location.id ? 'scale-125 animate-pulse-glow' : ''}
              `}>
                <MapPin className="w-6 h-6" />
              </div>
              <div className="w-1 h-8 bg-current mx-auto"></div>
            </div>
          ))}

          {/* Selected Pin Details */}
          {selectedPin && (
            <div className="absolute bottom-6 left-6 right-6 z-20">
              {proofLocations
                .filter(location => location.id === selectedPin)
                .map(location => {
                  const StatusIcon = getStatusIcon(location.status);
                  
                  return (
                    <AnimatedCard
                      key={location.id}
                      gradient
                      className="p-6 animate-slide-up"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                            {location.type === 'photo' && <Camera className="w-6 h-6 text-primary" />}
                            {location.type === 'document' && <FileText className="w-6 h-6 text-primary" />}
                            {location.type === 'certificate' && <FileText className="w-6 h-6 text-primary" />}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">
                              {location.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                              Uploaded on {location.date}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <div className={`
                            flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium
                            ${location.status === 'approved' ? 'bg-success/20 text-success' : ''}
                            ${location.status === 'pending' ? 'bg-warning/20 text-warning' : ''}
                            ${location.status === 'rejected' ? 'bg-destructive/20 text-destructive' : ''}
                          `}>
                            <StatusIcon className="w-4 h-4" />
                            <span className="capitalize">{location.status}</span>
                          </div>
                          
                          <button
                            onClick={() => setSelectedPin(null)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex space-x-3">
                        <AnimatedButton
                          variant="hero"
                          size="sm"
                          onClick={() => navigate('/beneficiary/status')}
                          glow
                        >
                          View Details
                        </AnimatedButton>
                        
                        <AnimatedButton
                          variant="success"
                          size="sm"
                          onClick={() => navigate('/beneficiary/upload')}
                          glow
                        >
                          Upload New
                        </AnimatedButton>
                      </div>
                    </AnimatedCard>
                  );
                })}
            </div>
          )}

          {/* Map Controls */}
          <div className="absolute top-4 right-4 z-10 space-y-2">
            <AnimatedButton
              variant="hero"
              size="sm"
              className="bg-white/90 text-gray-800 hover:bg-white shadow-lg"
            >
              +
            </AnimatedButton>
            <AnimatedButton
              variant="hero"
              size="sm"
              className="bg-white/90 text-gray-800 hover:bg-white shadow-lg"
            >
              -
            </AnimatedButton>
          </div>

          {/* Map Legend */}
          <div className="absolute top-4 left-4 z-10">
            <AnimatedCard className="p-4 bg-white/95 backdrop-blur-sm">
              <h4 className="font-semibold text-gray-800 mb-3">Legend</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-success rounded-full"></div>
                  <span>Approved</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-warning rounded-full"></div>
                  <span>Under Review</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-destructive rounded-full"></div>
                  <span>Rejected</span>
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;