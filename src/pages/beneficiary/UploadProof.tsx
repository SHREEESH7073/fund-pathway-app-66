import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedButton from '@/components/AnimatedButton';
import AnimatedCard from '@/components/AnimatedCard';
import { Camera, Upload, MapPin, CheckCircle, X, ArrowLeft } from 'lucide-react';

const UploadProof: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [aiDetection, setAiDetection] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Mock AI detection
      setTimeout(() => {
        setAiDetection(Math.random() > 0.3 ? 'detected' : 'not-detected');
      }, 1500);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setUploading(true);
    // Mock upload process
    setTimeout(() => {
      setUploading(false);
      // Navigate to status page after successful upload
      navigate('/beneficiary/status');
    }, 2000);
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
          <h1 className="text-2xl font-bold">Upload Proof</h1>
          <p className="text-white/80">Upload documents to verify loan utilization</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 pb-6">
        <div className="max-w-2xl mx-auto">
          {/* Upload Section */}
          <AnimatedCard gradient bankTheme className="p-8 mb-6">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Document Upload</h2>
              <p className="text-white/60">Take a photo or select from gallery</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <AnimatedButton
                  variant="success"
                  size="lg"
                  glow
                  className="w-full h-24 flex-col space-y-2"
                  type="button"
                >
                  <Camera className="w-8 h-8" />
                  <span>Take Photo</span>
                </AnimatedButton>
              </label>

              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <AnimatedButton
                  variant="bank"
                  size="lg"
                  glow
                  className="w-full h-24 flex-col space-y-2 bg-white/10 hover:bg-white/20 border-white/20 text-white"
                  type="button"
                >
                  <Upload className="w-8 h-8" />
                  <span>From Gallery</span>
                </AnimatedButton>
              </label>
            </div>

            {/* File Preview */}
            {selectedFile && (
              <div className="border-2 border-dashed border-primary/30 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Camera className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{selectedFile.name}</p>
                      <p className="text-sm text-gray-600">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedFile(null);
                      setAiDetection(null);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* AI Detection Badge */}
                {aiDetection && (
                  <div className={`flex items-center space-x-2 p-3 rounded-lg ${
                    aiDetection === 'detected' 
                      ? 'bg-success/20 text-success' 
                      : 'bg-destructive/20 text-destructive'
                  }`}>
                    {aiDetection === 'detected' ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <X className="w-5 h-5" />
                    )}
                    <span className="font-semibold">
                      {aiDetection === 'detected' ? '✅ Asset Detected' : '❌ Asset Not Detected'}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Location Info */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-semibold text-gray-800">Auto-detected Location</p>
                  <p className="text-sm text-gray-600">Mumbai, Maharashtra • {new Date().toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Upload Button */}
            <AnimatedButton
              variant="success"
              size="lg"
              glow
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
              className="w-full"
            >
              {uploading ? 'Uploading...' : 'Upload Document'}
            </AnimatedButton>
          </AnimatedCard>

          {/* Decorative Background Elements */}
          <div className="fixed inset-0 pointer-events-none opacity-10 z-0">
            <Camera className="absolute top-20 right-20 w-16 h-16 text-white animate-float" />
            <Upload className="absolute bottom-40 left-20 w-12 h-12 text-white animate-float" style={{ animationDelay: '2s' }} />
            <MapPin className="absolute top-1/2 right-10 w-10 h-10 text-white animate-float" style={{ animationDelay: '4s' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadProof;