import { Header } from '@/components/Header';
import { useNavigate } from 'react-router-dom';

const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={(section) => section === 'home' && navigate('/')} />
      
      <main className="container mx-auto px-4 pt-24 pb-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-invert max-w-none space-y-6">
          <p className="text-muted-foreground">Last updated: December 15, 2025</p>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using VisionCode AI, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">2. Description of Service</h2>
            <p className="text-muted-foreground">
              VisionCode AI provides AI-powered code analysis, explanation, bug detection, 
              code generation, and coding assistance services. Our services include:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Code analysis from images and text input</li>
              <li>Code explanation with beginner and advanced modes</li>
              <li>Bug detection and code optimization</li>
              <li>AI-powered code generation</li>
              <li>Interactive coding chatbot</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">3. User Responsibilities</h2>
            <p className="text-muted-foreground">You agree to:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Provide accurate account information</li>
              <li>Maintain the security of your account</li>
              <li>Not use the service for any illegal purposes</li>
              <li>Not upload malicious code or content</li>
              <li>Respect intellectual property rights</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">4. Intellectual Property</h2>
            <p className="text-muted-foreground">
              You retain ownership of the code you upload. The AI-generated suggestions and 
              analyses are provided for your use. VisionCode AI and its features are protected 
              by intellectual property laws.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">5. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              VisionCode AI provides AI-powered suggestions that should be reviewed before use. 
              We are not liable for any damages resulting from the use of our AI-generated content 
              or suggestions.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">6. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We may update these terms from time to time. Continued use of the service after 
              changes constitutes acceptance of the new terms.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default TermsOfService;
