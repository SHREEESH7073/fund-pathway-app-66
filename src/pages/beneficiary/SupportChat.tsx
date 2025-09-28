import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedButton from '@/components/AnimatedButton';
import AnimatedCard from '@/components/AnimatedCard';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft, MessageCircle, Send, Bot, 
  User, Phone, Mail, HelpCircle 
} from 'lucide-react';

const SupportChat: React.FC = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      content: 'Hello! I\'m your virtual assistant. How can I help you today?',
      time: '10:30 AM'
    },
    {
      id: 2,
      sender: 'user',
      content: 'I need help with my document verification status',
      time: '10:31 AM'
    },
    {
      id: 3,
      sender: 'bot',
      content: 'I can help you with that! Let me check your latest document status... Your purchase invoice has been approved, and your asset photo is currently under review. Is there anything specific you\'d like to know?',
      time: '10:31 AM'
    }
  ]);

  const quickReplies = [
    'Check document status',
    'Upload new document',
    'Loan utilization query',
    'Contact human agent'
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'user' as const,
      content: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    // Mock bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        sender: 'bot' as const,
        content: 'Thank you for your message. Let me help you with that...',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleQuickReply = (reply: string) => {
    setMessage(reply);
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
          <h1 className="text-2xl font-bold">Support Chat</h1>
          <p className="text-white/80">Get instant help with your queries</p>
        </div>
        <div className="text-white/80">
          <MessageCircle className="w-6 h-6 animate-pulse-glow" />
        </div>
      </div>

      {/* Chat Container */}
      <div className="px-6 pb-6 h-[calc(100vh-120px)]">
        <div className="max-w-4xl mx-auto h-full flex flex-col">
          
          {/* Support Options */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <AnimatedCard gradient className="p-4 text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Live Chat</h3>
              <p className="text-sm text-gray-600">Get instant responses</p>
            </AnimatedCard>

            <AnimatedCard gradient className="p-4 text-center">
              <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Phone className="w-6 h-6 text-success" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Call Support</h3>
              <p className="text-sm text-gray-600">1800-XXX-XXXX</p>
            </AnimatedCard>

            <AnimatedCard gradient className="p-4 text-center">
              <div className="w-12 h-12 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail className="w-6 h-6 text-warning" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Email Support</h3>
              <p className="text-sm text-gray-600">help@loantrack.com</p>
            </AnimatedCard>
          </div>

          {/* Chat Messages */}
          <AnimatedCard gradient className="flex-1 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">AI Assistant</h3>
                  <p className="text-sm text-green-600">Online</p>
                </div>
              </div>
            </div>

            {/* Messages List */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${
                    msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.sender === 'user' ? 'bg-primary/20' : 'bg-success/20'
                    }`}>
                      {msg.sender === 'user' ? (
                        <User className="w-4 h-4 text-primary" />
                      ) : (
                        <Bot className="w-4 h-4 text-success" />
                      )}
                    </div>
                    
                    <div className={`p-3 rounded-lg ${
                      msg.sender === 'user' 
                        ? 'bg-primary text-white' 
                        : 'bg-white border border-gray-200'
                    }`}>
                      <p className="text-sm">{msg.content}</p>
                      <p className={`text-xs mt-1 ${
                        msg.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                      }`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Replies */}
            <div className="p-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-3">Quick replies:</p>
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply, index) => (
                  <AnimatedButton
                    key={index}
                    variant="hero"
                    size="sm"
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs bg-white/50 hover:bg-white/70 text-gray-700 border-gray-300"
                  >
                    {reply}
                  </AnimatedButton>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <AnimatedButton
                  variant="hero"
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  glow
                >
                  <Send className="w-4 h-4" />
                </AnimatedButton>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </div>

      {/* Floating Help Button */}
      <div className="fixed bottom-6 right-6">
        <AnimatedButton
          variant="success"
          size="lg"
          className="rounded-full w-14 h-14 shadow-lg animate-pulse-glow"
        >
          <HelpCircle className="w-6 h-6" />
        </AnimatedButton>
      </div>
    </div>
  );
};

export default SupportChat;