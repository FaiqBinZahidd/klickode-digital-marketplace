import { Shield, Eye, Lock, Server, Cookie, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import CheckeredBackground from "@/components/checkered-background";


export default function Privacy() {
  return (
    <CheckeredBackground className="min-h-screen">

      <Navigation />
      
      <div className="pt-20 pb-8 px-8 sm:px-12 lg:px-16" style={{ marginTop: '60px' }}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-left mb-12">
            <h1 className="text-2xl md:text-3xl font-space-mono text-white mb-4">
              Privacy <span className="text-primary-red">Policy</span>
            </h1>
            <p className="text-base text-gray-300 font-space-mono">
              Last updated: January 2025
            </p>
          </div>

          {/* Overview */}
          <Card className="bg-space-darker border-gray-700 mb-8">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-primary-red" />
                <CardTitle className="text-white font-space-mono">Your Privacy Matters</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 font-space-mono leading-relaxed">
                At Klickode, we take your privacy seriously. This policy explains how we collect, use, and protect 
                your personal information when you use our platform. We are committed to transparency and giving you 
                control over your data.
              </p>
            </CardContent>
          </Card>

          {/* Information Collection */}
          <Card className="bg-space-darker border-gray-700 mb-8">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Eye className="h-6 w-6 text-primary-red" />
                <CardTitle className="text-white font-space-mono">Information We Collect</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-white font-space-mono mb-2">Account Information</h3>
                <p className="text-gray-300 font-space-mono text-sm">
                  When you create an account, we collect your name, email address, and profile information.
                </p>
              </div>
              <div>
                <h3 className="text-white font-space-mono mb-2">Usage Data</h3>
                <p className="text-gray-300 font-space-mono text-sm">
                  We collect information about how you use our platform, including pages visited, features used, and time spent.
                </p>
              </div>
              <div>
                <h3 className="text-white font-space-mono mb-2">Payment Information</h3>
                <p className="text-gray-300 font-space-mono text-sm">
                  Payment data is processed securely through our payment partners and is not stored on our servers.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Data Usage */}
          <Card className="bg-space-darker border-gray-700 mb-8">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Server className="h-6 w-6 text-primary-red" />
                <CardTitle className="text-white font-space-mono">How We Use Your Data</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-red rounded-full mt-2"></div>
                  <p className="text-gray-300 font-space-mono text-sm">
                    Provide and improve our services
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-red rounded-full mt-2"></div>
                  <p className="text-gray-300 font-space-mono text-sm">
                    Process transactions and manage your account
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-red rounded-full mt-2"></div>
                  <p className="text-gray-300 font-space-mono text-sm">
                    Send important updates and notifications
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-red rounded-full mt-2"></div>
                  <p className="text-gray-300 font-space-mono text-sm">
                    Personalize your experience with relevant content
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Protection */}
          <Card className="bg-space-darker border-gray-700 mb-8">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Lock className="h-6 w-6 text-primary-red" />
                <CardTitle className="text-white font-space-mono">Data Protection</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 font-space-mono text-sm">
                We implement industry-standard security measures to protect your data:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-red rounded-full mt-2"></div>
                  <p className="text-gray-300 font-space-mono text-sm">
                    Encryption in transit and at rest
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-red rounded-full mt-2"></div>
                  <p className="text-gray-300 font-space-mono text-sm">
                    Regular security audits and updates
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-red rounded-full mt-2"></div>
                  <p className="text-gray-300 font-space-mono text-sm">
                    Limited access to personal data
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cookies */}
          <Card className="bg-space-darker border-gray-700 mb-8">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Cookie className="h-6 w-6 text-primary-red" />
                <CardTitle className="text-white font-space-mono">Cookies & Tracking</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 font-space-mono text-sm mb-4">
                We use cookies and similar technologies to enhance your experience and analyze site usage:
              </p>
              <div className="space-y-3">
                <div>
                  <span className="text-white font-space-mono">Essential Cookies:</span>
                  <span className="text-gray-300 font-space-mono text-sm ml-2">Required for basic functionality</span>
                </div>
                <div>
                  <span className="text-white font-space-mono">Analytics Cookies:</span>
                  <span className="text-gray-300 font-space-mono text-sm ml-2">Help us understand usage patterns</span>
                </div>
                <div>
                  <span className="text-white font-space-mono">Preference Cookies:</span>
                  <span className="text-gray-300 font-space-mono text-sm ml-2">Remember your settings</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card className="bg-space-darker border-gray-700 mb-8">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Globe className="h-6 w-6 text-primary-red" />
                <CardTitle className="text-white font-space-mono">Your Rights</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 font-space-mono text-sm mb-4">
                You have the following rights regarding your personal data:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-red rounded-full mt-2"></div>
                  <p className="text-gray-300 font-space-mono text-sm">
                    <strong>Access:</strong> Request a copy of your personal data
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-red rounded-full mt-2"></div>
                  <p className="text-gray-300 font-space-mono text-sm">
                    <strong>Correction:</strong> Update or correct inaccurate information
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-red rounded-full mt-2"></div>
                  <p className="text-gray-300 font-space-mono text-sm">
                    <strong>Deletion:</strong> Request deletion of your personal data
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-red rounded-full mt-2"></div>
                  <p className="text-gray-300 font-space-mono text-sm">
                    <strong>Portability:</strong> Export your data in a portable format
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="bg-space-darker border-gray-700">
            <CardHeader>
              <CardTitle className="text-white font-space-mono">Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 font-space-mono text-sm mb-4">
                If you have any questions about this privacy policy or your personal data, please contact us:
              </p>
              <div className="space-y-2">
                <p className="text-gray-300 font-space-mono text-sm">
                  Email: privacy@klickode.com
                </p>
                <p className="text-gray-300 font-space-mono text-sm">
                  Or through our contact form
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="pb-12"></div>
      <Footer />
    </CheckeredBackground>
  );
}