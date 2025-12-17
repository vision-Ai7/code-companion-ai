import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Clock, MessageCircle, FileQuestion, Bug, Lightbulb } from 'lucide-react';

const Support = () => {
  const navigate = useNavigate();

  const supportTopics = [
    {
      icon: FileQuestion,
      title: 'Account & Billing',
      description: 'Questions about your account, subscription, or payment issues',
    },
    {
      icon: Bug,
      title: 'Technical Issues',
      description: 'Report bugs, errors, or problems with the platform',
    },
    {
      icon: MessageCircle,
      title: 'Feature Requests',
      description: 'Suggest new features or improvements to VisionCode AI',
    },
    {
      icon: Lightbulb,
      title: 'General Inquiries',
      description: 'Any other questions or feedback about our services',
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header onNavigate={(section) => section === 'home' && navigate('/')} />
      
      <main className="container mx-auto px-4 pt-20 sm:pt-24 pb-12 sm:pb-16 max-w-4xl flex-1">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Support</h1>
        <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
          We&apos;re here to help you get the most out of VisionCode AI
        </p>
        
        <div className="space-y-8">
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                Contact Support
              </CardTitle>
              <CardDescription>
                Our support team is ready to assist you with any questions or issues
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                VisionCode AI provides support for technical issues, account questions, feature requests, 
                and general feedback. Our team is committed to helping you resolve any issues and improve 
                your experience with our platform.
              </p>
              <div className="flex items-center gap-2 text-lg">
                <span className="text-muted-foreground">Email us at:</span>
                <a 
                  href="mailto:visioncode.help@gmail.com" 
                  className="text-primary hover:underline font-medium"
                >
                  visioncode.help@gmail.com
                </a>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Response Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We strive to respond to all support inquiries as quickly as possible. Response times may 
                vary depending on the volume of requests and the complexity of your issue. For urgent 
                matters, please include &quot;URGENT&quot; in your email subject line.
              </p>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  General inquiries: 24-48 hours
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  Technical issues: 12-24 hours
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  Account & billing: 24-48 hours
                </li>
              </ul>
            </CardContent>
          </Card>

          <div>
            <h2 className="text-2xl font-semibold mb-4">How Can We Help?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {supportTopics.map((topic) => (
                <Card key={topic.title} className="bg-card/50 border-border/50 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <topic.icon className="w-5 h-5 text-primary" />
                      {topic.title}
                    </CardTitle>
                    <CardDescription>{topic.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          <Card className="bg-primary/10 border-primary/20">
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Before contacting support, please check if your question is answered in our{' '}
                <button 
                  onClick={() => navigate('/terms')} 
                  className="text-primary hover:underline"
                >
                  Terms of Service
                </button>{' '}
                or{' '}
                <button 
                  onClick={() => navigate('/privacy')} 
                  className="text-primary hover:underline"
                >
                  Privacy Policy
                </button>
                .
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Support;
