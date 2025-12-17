import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header onNavigate={(section) => section === 'home' && navigate('/')} />
      
      <main className="container mx-auto px-4 pt-20 sm:pt-24 pb-12 sm:pb-16 max-w-4xl flex-1">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Privacy Policy</h1>
        <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">Last Updated: December 15, 2025</p>
        
        <div className="prose prose-invert max-w-none space-y-6 sm:space-y-8 text-sm sm:text-base">
          <p className="text-muted-foreground">
            At VisionCode AI, we are committed to protecting your privacy. This Privacy Policy explains how we collect, 
            use, disclose, and safeguard your information when you use our AI-powered code analysis platform.
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
            <p className="text-muted-foreground">
              We collect information you provide directly to us when you create an account, use our services, 
              or contact us for support. This includes:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Email address and basic account information</li>
              <li>Code snippets, images, and files uploaded for analysis</li>
              <li>Chat conversations and analysis history</li>
              <li>Usage data, device information, and preferences</li>
              <li>Browser type, operating system, and IP address</li>
              <li>Pages visited and features used within our platform</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">2. How We Use Your Information</h2>
            <p className="text-muted-foreground">We use the information we collect to:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Provide, operate, and improve the VisionCode AI platform</li>
              <li>Process code analysis, bug detection, and AI responses</li>
              <li>Communicate service updates and support messages</li>
              <li>Improve user experience and platform performance</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>Detect, investigate, and prevent fraudulent transactions and abuse</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">3. Advertising and Cookies</h2>
            <p className="text-muted-foreground">
              We use Google AdSense to display advertisements on our platform. Google AdSense and other third-party 
              vendors use cookies, web beacons, and similar technologies to serve ads based on your prior visits 
              to our website or other websites.
            </p>
            <p className="text-muted-foreground">
              Google&apos;s use of the DoubleClick cookie enables it and its partners to serve ads based on your visit 
              to VisionCode AI and/or other sites on the Internet.
            </p>
            <p className="text-muted-foreground">
              You may opt out of personalized advertising by visiting{' '}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Google Ads Settings
              </a>. Alternatively, you can opt out of third-party vendor cookies by visiting the{' '}
              <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Network Advertising Initiative opt-out page
              </a>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">4. Third-Party Services</h2>
            <p className="text-muted-foreground">
              We may share your information with third-party service providers who perform services on our behalf, including:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Hosting and infrastructure providers</li>
              <li>Analytics services to help us understand platform usage</li>
              <li>AI service providers for code analysis and generation</li>
              <li>Payment processors for subscription services</li>
            </ul>
            <p className="text-muted-foreground">
              These third parties are bound by confidentiality obligations and are only permitted to use your 
              information as necessary to provide services to us.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">5. Data Security</h2>
            <p className="text-muted-foreground">
              We implement reasonable security measures to protect your personal information from unauthorized access, 
              alteration, disclosure, or destruction. This includes encryption of data in transit and at rest where applicable.
            </p>
            <p className="text-muted-foreground">
              However, no method of transmission over the Internet or electronic storage is 100% secure. While we 
              strive to use commercially acceptable means to protect your information, we cannot guarantee its absolute security.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">6. Data Retention</h2>
            <p className="text-muted-foreground">
              We retain your information for as long as your account is active or as needed to provide you services. 
              You may request deletion of your account and associated data at any time by contacting us.
            </p>
            <p className="text-muted-foreground">
              We may retain certain information as required by law or for legitimate business purposes, such as 
              resolving disputes and enforcing our agreements.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">7. AI Disclaimer</h2>
            <p className="text-muted-foreground">
              VisionCode AI uses artificial intelligence to provide code analysis, explanations, bug detection, 
              and code generation. AI-generated outputs may not always be accurate, complete, or suitable for 
              your specific use case.
            </p>
            <p className="text-muted-foreground">
              Users are responsible for reviewing and testing all AI-generated code and suggestions before using 
              them in production environments. VisionCode AI is not liable for any issues arising from the use 
              of AI-generated content.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">8. Children&apos;s Privacy</h2>
            <p className="text-muted-foreground">
              Our service is not intended for children under 13 years of age. We do not knowingly collect personal 
              information from children under 13. If we become aware that we have collected personal information 
              from a child under 13, we will take steps to delete such information.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">9. Changes to This Policy</h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
              the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">10. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy, please contact us at:
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

export default PrivacyPolicy;
