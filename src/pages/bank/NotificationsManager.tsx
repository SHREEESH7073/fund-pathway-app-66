import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedButton from '@/components/AnimatedButton';
import AnimatedCard from '@/components/AnimatedCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowLeft, Bell, Send, Users, 
  CheckCircle, AlertCircle, Info, 
  MessageSquare, BellRing 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const NotificationsManager: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [notificationForm, setNotificationForm] = useState({
    type: '',
    title: '',
    message: '',
    recipients: '',
    customerId: ''
  });

  const [recentNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Document Approved',
      message: 'Your purchase invoice has been verified and approved.',
      recipient: 'John Doe (CID12345ABC)',
      sentAt: '2 hours ago'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Document Under Review',
      message: 'Your asset photo is currently being reviewed by our verification team.',
      recipient: 'Jane Smith (CID67890DEF)',
      sentAt: '1 day ago'
    },
    {
      id: 3,
      type: 'error',
      title: 'Document Rejected',
      message: 'Installation certificate was rejected due to poor image quality.',
      recipient: 'Mike Johnson (CID11111GHI)',
      sentAt: '2 days ago'
    },
    {
      id: 4,
      type: 'info',
      title: 'System Maintenance',
      message: 'Scheduled maintenance will occur on Sunday from 2 AM to 4 AM.',
      recipient: 'All Customers',
      sentAt: '3 days ago'
    }
  ]);

  const notificationTypes = [
    { value: 'success', label: 'Success', icon: CheckCircle, color: 'text-success' },
    { value: 'warning', label: 'Warning', icon: AlertCircle, color: 'text-warning' },
    { value: 'error', label: 'Error', icon: AlertCircle, color: 'text-destructive' },
    { value: 'info', label: 'Information', icon: Info, color: 'text-primary' }
  ];

  const predefinedMessages = {
    document_approved: {
      title: 'Document Approved',
      message: 'Your document has been successfully verified and approved. You can now proceed with your loan utilization.'
    },
    document_rejected: {
      title: 'Document Rejected',
      message: 'Your submitted document has been rejected. Please upload a clearer version with all required details visible.'
    },
    payment_due: {
      title: 'Payment Due Reminder',
      message: 'Your loan installment is due soon. Please ensure timely payment to avoid any penalties.'
    },
    loan_approved: {
      title: 'Loan Approved',
      message: 'Congratulations! Your loan application has been approved. You can now start utilizing your sanctioned amount.'
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setNotificationForm({
      ...notificationForm,
      [field]: value
    });
  };

  const handlePredefinedMessage = (key: string) => {
    const message = predefinedMessages[key as keyof typeof predefinedMessages];
    if (message) {
      setNotificationForm({
        ...notificationForm,
        title: message.title,
        message: message.message
      });
    }
  };

  const handleSendNotification = () => {
    if (!notificationForm.type || !notificationForm.title || !notificationForm.message) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }

    const recipientText = notificationForm.recipients === 'all' 
      ? 'all customers' 
      : notificationForm.recipients === 'specific' 
        ? `customer ${notificationForm.customerId}`
        : 'selected customers';

    toast({
      title: 'Notification Sent!',
      description: `Successfully sent "${notificationForm.title}" to ${recipientText}.`,
    });

    // Reset form
    setNotificationForm({
      type: '',
      title: '',
      message: '',
      recipients: '',
      customerId: ''
    });
  };

  const getNotificationIcon = (type: string) => {
    const typeConfig = notificationTypes.find(t => t.value === type);
    return typeConfig ? typeConfig.icon : Info;
  };

  const getNotificationColor = (type: string) => {
    const typeConfig = notificationTypes.find(t => t.value === type);
    return typeConfig ? typeConfig.color : 'text-primary';
  };

  return (
    <div className="min-h-screen gradient-bank bank-theme relative">
      {/* Header */}
      <div className="flex items-center p-6 text-white">
        <AnimatedButton
          variant="bank"
          size="sm"
          onClick={() => navigate('/bank/dashboard')}
          className="mr-4 bg-white/10 hover:bg-white/20 border-white/20 text-white"
        >
          <ArrowLeft className="w-4 h-4" />
        </AnimatedButton>
        <div>
          <h1 className="text-2xl font-bold">Notifications Manager</h1>
          <p className="text-white/80">Send alerts and updates to customers</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 pb-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Send Notification Form */}
            <AnimatedCard gradient bankTheme className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center">
                  <Send className="w-6 h-6 text-success" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Send Notification</h3>
                  <p className="text-white/60">Create and send custom alerts</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-white">Notification Type</Label>
                  <Select value={notificationForm.type} onValueChange={(value) => handleInputChange('type', value)}>
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder="Select notification type" />
                    </SelectTrigger>
                    <SelectContent>
                      {notificationTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center space-x-2">
                              <Icon className={`w-4 h-4 ${type.color}`} />
                              <span>{type.label}</span>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-white">Recipients</Label>
                  <Select value={notificationForm.recipients} onValueChange={(value) => handleInputChange('recipients', value)}>
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder="Select recipients" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Customers</SelectItem>
                      <SelectItem value="active">Active Customers Only</SelectItem>
                      <SelectItem value="pending">Pending Verifications</SelectItem>
                      <SelectItem value="specific">Specific Customer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {notificationForm.recipients === 'specific' && (
                  <div>
                    <Label className="text-white">Customer ID</Label>
                    <Input
                      placeholder="Enter Customer ID"
                      value={notificationForm.customerId}
                      onChange={(e) => handleInputChange('customerId', e.target.value)}
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/60"
                    />
                  </div>
                )}

                <div>
                  <Label className="text-white">Title</Label>
                  <Input
                    placeholder="Notification title"
                    value={notificationForm.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>

                <div>
                  <Label className="text-white">Message</Label>
                  <Textarea
                    placeholder="Enter your notification message..."
                    value={notificationForm.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/60"
                    rows={4}
                  />
                </div>

                {/* Predefined Messages */}
                <div>
                  <Label className="text-white">Quick Templates</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {Object.entries(predefinedMessages).map(([key, message]) => (
                      <AnimatedButton
                        key={key}
                        variant="bank"
                        size="sm"
                        onClick={() => handlePredefinedMessage(key)}
                        className="text-xs bg-white/5 hover:bg-white/10 border-white/20 text-white"
                      >
                        {message.title}
                      </AnimatedButton>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <AnimatedButton
                    variant="success"
                    onClick={handleSendNotification}
                    glow
                    className="flex-1"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Notification
                  </AnimatedButton>
                  
                  <AnimatedButton
                    variant="bank"
                    onClick={() => setNotificationForm({
                      type: '', title: '', message: '', recipients: '', customerId: ''
                    })}
                    className="bg-white/10 hover:bg-white/20 border-white/20 text-white"
                  >
                    Clear
                  </AnimatedButton>
                </div>
              </div>
            </AnimatedCard>

            {/* Recent Notifications */}
            <AnimatedCard gradient bankTheme className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <BellRing className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Recent Notifications</h3>
                  <p className="text-white/60">Previously sent alerts</p>
                </div>
              </div>

              <div className="space-y-4">
                {recentNotifications.map((notification, index) => {
                  const Icon = getNotificationIcon(notification.type);
                  const colorClass = getNotificationColor(notification.type);

                  return (
                    <div
                      key={notification.id}
                      className="p-4 bg-white/5 rounded-lg border border-white/10 animate-slide-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          notification.type === 'success' ? 'bg-success/20' :
                          notification.type === 'warning' ? 'bg-warning/20' :
                          notification.type === 'error' ? 'bg-destructive/20' :
                          'bg-primary/20'
                        }`}>
                          <Icon className={`w-4 h-4 ${colorClass}`} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-white text-sm">
                              {notification.title}
                            </h4>
                            <span className="text-xs text-white/50">
                              {notification.sentAt}
                            </span>
                          </div>
                          
                          <p className="text-white/70 text-sm mb-2">
                            {notification.message}
                          </p>
                          
                          <p className="text-xs text-white/50">
                            Sent to: {notification.recipient}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 text-center">
                <AnimatedButton
                  variant="bank"
                  size="sm"
                  className="bg-white/5 hover:bg-white/10 border-white/20 text-white"
                >
                  View All Notifications
                </AnimatedButton>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsManager;