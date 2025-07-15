import { Link } from "wouter";
import { Code } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 bg-space-darker border-t border-gray-800 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-red rounded-lg flex items-center justify-center">
                <Code className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-space-mono text-white">Klickode</span>
            </div>
            <p className="text-gray-300 max-w-md font-space-mono">
              The ultimate marketplace for developers, designers, and creators to buy and sell digital assets.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-space-mono mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/browse" className="text-gray-300 hover:text-white transition-colors font-space-mono">
                  Browse
                </Link>
              </li>
              <li>
                <Link href="/seller-dashboard" className="text-gray-300 hover:text-white transition-colors font-space-mono">
                  Become a Seller
                </Link>
              </li>
              <li>
                <Link href="/ai-tools" className="text-gray-300 hover:text-white transition-colors font-space-mono">
                  AI Tools
                </Link>
              </li>
              <li>
                <Link href="/forum" className="text-gray-300 hover:text-white transition-colors font-space-mono">
                  Forum
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-space-mono mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors font-space-mono">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors font-space-mono">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/business" className="text-gray-300 hover:text-white transition-colors font-space-mono">
                  Business with Klickode
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors font-space-mono">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white transition-colors font-space-mono">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 font-space-mono">&copy; 2025 Klickode. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
