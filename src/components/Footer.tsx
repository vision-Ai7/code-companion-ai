import { Link } from 'react-router-dom';
import visioncodeLogo from '@/assets/visioncode-logo.png';

export const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="space-y-3 sm:space-y-4 col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 sm:gap-3">
              <img src={visioncodeLogo} alt="VisionCode AI" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
              <div>
                <h3 className="font-bold text-base sm:text-lg">VisionCode</h3>
                <span className="text-xs text-primary font-medium">AI</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              AI-powered coding assistant for developers of all skill levels.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-semibold text-sm sm:text-base">Features</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li>Code Analysis</li>
              <li>Code Generation</li>
              <li>Bug Detection</li>
              <li>AI Chatbot</li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-semibold text-sm sm:text-base">Legal</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
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
          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-semibold text-sm sm:text-base">Support</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-muted-foreground hover:text-foreground transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <a href="mailto:visioncode.help@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors break-all">
                  visioncode.help@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border/50 text-center text-xs sm:text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} VisionCode AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
