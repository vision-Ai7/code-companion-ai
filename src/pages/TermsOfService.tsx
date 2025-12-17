import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useNavigate } from 'react-router-dom';

const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header onNavigate={(section) => section === 'home' && navigate('/')} />
      
      <main className="container mx-auto px-4 pt-20 sm:pt-24 pb-12 sm:pb-16 max-w-4xl flex-1">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Terms of Service</h1>
        <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">Last Updated: December 15, 2025</p>
        
        <div className="prose prose-invert max-w-none space-y-6 sm:space-y-8 text-sm sm:text-base">
          <p className="text-muted-foreground">
            Welcome to VisionCode AI. By accessing or using our platform, you agree to be bound by these Terms of Service. 
            Please read them carefully before using our services.
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using VisionCode AI, you acknowledge that you have read, understood, and agree to be 
              bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please 
              do not use our services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">2. Description of Service</h2>
            <p className="text-muted-foreground">
              VisionCode AI provides AI-powered coding assistance tools, including but not limited to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Code analysis from images and text input</li>
              <li>Code explanation with beginner and advanced modes</li>
              <li>Bug detection and code optimization</li>
              <li>AI-powered code generation</li>
              <li>Interactive coding chatbot</li>
              <li>OCR (Optical Character Recognition) for code images</li>
            </ul>
            <p className="text-muted-foreground">
              We do not guarantee the accuracy, completeness, or suitability of any AI-generated content for 
              any particular purpose.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">3. User Responsibilities</h2>
            <p className="text-muted-foreground">By using VisionCode AI, you agree to:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Provide accurate and complete account information</li>
              <li>Maintain the security and confidentiality of your account credentials</li>
              <li>Review and test all AI-generated outputs before using them in production</li>
              <li>Not upload illegal, harmful, malicious, or copyrighted content without authorization</li>
              <li>Not use the service for any unlawful or prohibited purposes</li>
              <li>Respect intellectual property rights of others</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">4. Intellectual Property</h2>
            <p className="text-muted-foreground">
              The VisionCode AI platform, including its design, features, functionality, and branding, is owned 
              by VisionCode AI and protected by intellectual property laws. You may not copy, modify, distribute, 
              or create derivative works without our express written permission.
            </p>
            <p className="text-muted-foreground">
              You retain ownership of the code you upload to our platform. By uploading code, you grant us a 
              limited license to process it solely for the purpose of providing our services to you.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">5. AI Limitations</h2>
            <p className="text-muted-foreground">
              VisionCode AI uses artificial intelligence to provide its services. You acknowledge and agree that:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>AI-generated responses may contain errors, inaccuracies, or incomplete information</li>
              <li>AI outputs should not be considered as professional advice</li>
              <li>AI is not a replacement for professional judgment, code review, or testing</li>
              <li>You are solely responsible for verifying and testing any AI-generated code</li>
              <li>AI capabilities may vary and are subject to change</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">6. Prohibited Activities</h2>
            <p className="text-muted-foreground">You agree not to engage in any of the following prohibited activities:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Reverse engineering, decompiling, or disassembling any part of our platform</li>
              <li>Attempting to gain unauthorized access to our systems or user accounts</li>
              <li>Using automated tools to scrape, crawl, or extract data from our platform</li>
              <li>Overloading or interfering with our servers or network infrastructure</li>
              <li>Attempting to bypass usage limits, rate limits, or access controls</li>
              <li>Transmitting viruses, malware, or other malicious code</li>
              <li>Using the service to generate harmful, illegal, or unethical content</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">7. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              VISIONCODE AI IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER 
              EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS 
              FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
            <p className="text-muted-foreground">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, VISIONCODE AI SHALL NOT BE LIABLE FOR ANY INDIRECT, 
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, 
              WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE 
              LOSSES RESULTING FROM:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Your use or inability to use the service</li>
              <li>Any AI-generated outputs or suggestions</li>
              <li>Unauthorized access to or alteration of your data</li>
              <li>Any third-party conduct on the service</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">8. Termination</h2>
            <p className="text-muted-foreground">
              We reserve the right to suspend or terminate your account and access to our services at our sole 
              discretion, without prior notice, for conduct that we believe violates these Terms of Service, 
              is harmful to other users, or is otherwise inappropriate.
            </p>
            <p className="text-muted-foreground">
              You may terminate your account at any time by contacting us. Upon termination, your right to 
              use the service will immediately cease.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">9. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these Terms of Service at any time. We will notify users of any 
              material changes by posting the updated terms on this page and updating the &quot;Last Updated&quot; date. 
              Your continued use of the service after such changes constitutes your acceptance of the new terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">10. Governing Law</h2>
            <p className="text-muted-foreground">
              These Terms of Service shall be governed by and construed in accordance with applicable laws, 
              without regard to conflict of law principles.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">11. Contact Information</h2>
            <p className="text-muted-foreground">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p className="text-muted-foreground">
              Email:{' '}
              <a href="mailto:visioncode.help@gmail.com" className="text-primary hover:underline">
                visioncode.help@gmail.com
              </a>
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;
