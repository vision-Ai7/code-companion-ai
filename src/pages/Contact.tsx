import { Header } from '@/components/Header';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MessageSquare, Github, Twitter } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const Contact = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    (e.target as HTMLFormElement).reset();
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={(section) => section === 'home' && navigate('/')} />
      
      <main className="container mx-auto px-4 pt-24 pb-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-muted-foreground mb-12 text-lg">
          Have questions, feedback, or need support? We'd love to hear from you.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input 
                  placeholder="Your Name" 
                  required 
                  className="bg-muted/50"
                />
              </div>
              <div>
                <Input 
                  type="email" 
                  placeholder="Your Email" 
                  required 
                  className="bg-muted/50"
                />
              </div>
              <div>
                <Input 
                  placeholder="Subject" 
                  required 
                  className="bg-muted/50"
                />
              </div>
              <div>
                <Textarea 
                  placeholder="Your Message" 
                  required 
                  rows={5}
                  className="bg-muted/50"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>

          {/* About & Contact Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">About VisionCode AI</h2>
              <p className="text-muted-foreground">
                VisionCode AI is a powerful AI-powered coding assistant designed to help developers 
                of all skill levels. Whether you're analyzing code from images, debugging issues, 
                generating new code, or learning programming concepts, we're here to help.
              </p>
              <p className="text-muted-foreground">
                Our mission is to make coding more accessible and efficient through the power of 
                artificial intelligence.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Get in Touch</h3>
              <div className="space-y-3">
                <a 
                  href="mailto:support@visioncode.ai" 
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="h-5 w-5 text-primary" />
                  support@visioncode.ai
                </a>
                <a 
                  href="#" 
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Live Chat Support
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Follow Us</h3>
              <div className="flex gap-4">
                <a 
                  href="#" 
                  className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
