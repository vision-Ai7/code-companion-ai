import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MessageSquare, Globe, Heart } from 'lucide-react';

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header onNavigate={(section) => section === 'home' && navigate('/')} />
      
      <main className="container mx-auto px-4 pt-20 sm:pt-24 pb-12 sm:pb-16 max-w-4xl flex-1">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Contact Us</h1>
        <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
          We&apos;d love to hear from you. Get in touch with the VisionCode AI team.
        </p>
        
        <div className="space-y-8">
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                Email Us
              </CardTitle>
              <CardDescription>
                The best way to reach us for any inquiries
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Whether you have questions, feedback, suggestions, or need assistance, we&apos;re here to help. 
                Send us an email and we&apos;ll get back to you as soon as possible.
              </p>
              <div className="flex items-center gap-2 text-lg">
                <a 
                  href="mailto:visioncode.help@gmail.com" 
                  className="text-primary hover:underline font-medium text-xl"
                >
                  visioncode.help@gmail.com
                </a>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  General Inquiries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Have questions about VisionCode AI? Want to learn more about our features? 
                  We&apos;re happy to provide information and answer any questions you may have.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Heart className="w-5 h-5 text-primary" />
                  Feedback & Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Your feedback helps us improve. Share your experience, suggest new features, 
                  or let us know how we can make VisionCode AI better for you.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                About VisionCode AI
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                VisionCode AI is an AI-powered coding assistant platform designed to help developers 
                of all skill levels. Our tools include code analysis, bug detection, code explanation, 
                code generation, and an intelligent coding chatbot.
              </p>
              <p className="text-muted-foreground">
                We&apos;re committed to making coding more accessible and efficient through the power of 
                artificial intelligence. Thank you for being part of our community.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-primary/10 border-primary/20">
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Looking for technical support?{' '}
                <button 
                  onClick={() => navigate('/support')} 
                  className="text-primary hover:underline font-medium"
                >
                  Visit our Support page
                </button>{' '}
                for assistance with account issues, bugs, or platform questions.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
