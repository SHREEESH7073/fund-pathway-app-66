import React from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedButton from '@/components/AnimatedButton';
import AnimatedCard from '@/components/AnimatedCard';
import { 
  ArrowLeft, Bell, CheckCircle, AlertCircle, 
  Info, Clock, FileText, Upload 
} from 'lucide-react';

const NotificationsCenter: React.FC = () => {
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Document Approved',
      message: 'Your purchase invoice has been verified and approved.',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'Document Under Review',
      message: 'Your asset photo is currently being reviewed by our verification team.',
      time: '1 day ago',
      read: false
    },
    {
      id: 3,
      type: 'error',
      title: 'Document Rejected',
      message: 'Installation certificate was rejected due to poor image quality. Please re-upload.',
      time: '2 days ago',
      read: true
    },
    {
      id: 4,
      type: 'info',
      title: 'New Feature Available',
      message: 'You can now track your documents in real-time using our new map view feature.',
      time: '3 days ago',
      read: true
    },
    {
      id: 5,
      type: 'info',
      title: 'Loan Utilization Update',
      message: 'Your loan utilization has reached 65%. Keep track of your remaining balance.',
      time: '1 week ago',
      read: true
    }
  ];

  const getNotificationConfig = (type: string) => {
    switch (type) {
      case 'success':
        return {
          icon: CheckCircle,
          color: 'text-success bg-success/20',
          borderColor: 'border-success/30'
        };
      case 'warning':
        return {
          icon: Clock,
          color: 'text-warning bg-warning/20',
          borderColor: 'border-warning/30'
        };
      case 'error':
        return {
          icon: AlertCircle,
          color: 'text-destructive bg-destructive/20',
          borderColor: 'border-destructive/30'
        };
      default:
        return {
          icon: Info,
          color: 'text-primary bg-primary/20',
          borderColor: 'border-primary/30'
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
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-white/80">Stay updated with your loan progress</p>
        </div>
        <div className="text-white/80">
          <Bell className="w-6 h-6" />
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 pb-6">
        <div className="max-w-4xl mx-auto">
          {/* Notification Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <AnimatedCard gradient className="p-4 text-center">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <p className="text-2xl font-bold text-primary">5</p>
              <p className="text-sm text-gray-600">Total</p>
            </AnimatedCard>

            <AnimatedCard gradient className="p-4 text-center">
              <div className="w-10 h-10 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Clock className="w-5 h-5 text-warning" />
              </div>
              <p className="text-2xl font-bold text-warning">2</p>
              <p className="text-sm text-gray-600">Unread</p>
            </AnimatedCard>

            <AnimatedCard gradient className="p-4 text-center">
              <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <p className="text-2xl font-bold text-success">1</p>
              <p className="text-sm text-gray-600">Approved</p>
            </AnimatedCard>

            <AnimatedCard gradient className="p-4 text-center">
              <div className="w-10 h-10 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <AlertCircle className="w-5 h-5 text-destructive" />
              </div>
              <p className="text-2xl font-bold text-destructive">1</p>
              <p className="text-sm text-gray-600">Action Needed</p>
            </AnimatedCard>
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {notifications.map((notification, index) => {
              const config = getNotificationConfig(notification.type);
              const Icon = config.icon;

              return (
                <AnimatedCard
                  key={notification.id}
                  className={`p-6 border-l-4 ${config.borderColor} ${
                    !notification.read ? 'bg-white' : 'bg-gray-50'
                  } animate-slide-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0
                      ${config.color}
                    `}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className={`text-lg font-semibold ${
                          !notification.read ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <div className="w-3 h-3 bg-primary rounded-full"></div>
                        )}
                      </div>
                      
                      <p className={`mb-3 ${
                        !notification.read ? 'text-gray-700' : 'text-gray-600'
                      }`}>
                        {notification.message}
                      </p>
                      
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">{notification.time}</p>
                        
                        {notification.type === 'error' && (
                          <AnimatedButton
                            variant="warning"
                            size="sm"
                            onClick={() => navigate('/beneficiary/upload')}
                            glow
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Re-upload
                          </AnimatedButton>
                        )}
                        
                        {notification.type === 'success' && (
                          <AnimatedButton
                            variant="success"
                            size="sm"
                            onClick={() => navigate('/beneficiary/status')}
                            glow
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            View Details
                          </AnimatedButton>
                        )}
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 text-center">
            <AnimatedButton
              variant="hero"
              onClick={() => navigate('/beneficiary/dashboard')}
              glow
              className="mr-4"
            >
              Back to Dashboard
            </AnimatedButton>
            
            <AnimatedButton
              variant="success"
              onClick={() => {/* Mark all as read */}}
              glow
            >
              Mark All as Read
            </AnimatedButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsCenter;