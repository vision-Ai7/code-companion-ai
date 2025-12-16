import { Link } from 'react-router-dom';
import visioncodeLogo from '@/assets/visioncode-logo.png';

export const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={visioncodeLogo} alt="VisionCode AI" className="w-10 h-10 object-contain" />
              <div>
                <h3 className="font-bold text-lg">VisionCode</h3>
                <span className="text-xs text-primary font-medium">AI</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-powered coding assistant for developers of all skill levels.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h4 className="font-semibold">Features</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Code Analysis</li>
              <li>Code Generation</li>
              <li>Bug Detection</li>
              <li>AI Chatbot</li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="mailto:support@visioncode.ai" className="text-muted-foreground hover:text-foreground transition-colors">
                  support@visioncode.ai
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} VisionCode AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
