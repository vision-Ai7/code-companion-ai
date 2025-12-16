import { Header } from '@/components/Header';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={(section) => section === 'home' && navigate('/')} />
      
      <main className="container mx-auto px-4 pt-24 pb-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-invert max-w-none space-y-6">
          <p className="text-muted-foreground">Last updated: December 15, 2025</p>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
            <p className="text-muted-foreground">
              We collect information you provide directly to us, such as when you create an account, 
              use our services, or contact us for support. This may include:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Email address and account credentials</li>
              <li>Code snippets and images you upload for analysis</li>
              <li>Chat conversations and analysis history</li>
              <li>Usage data and preferences</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">2. How We Use Your Information</h2>
            <p className="text-muted-foreground">We use the information we collect to:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process and store your code analyses and chat history</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">3. Data Security</h2>
            <p className="text-muted-foreground">
              We implement appropriate security measures to protect your personal information. 
              Your code and analysis data are encrypted and stored securely. We do not share 
              your code with third parties.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">4. Data Retention</h2>
            <p className="text-muted-foreground">
              We retain your information for as long as your account is active or as needed to 
              provide you services. You can delete your account and associated data at any time.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">5. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy, please contact us through our 
              Contact page.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
