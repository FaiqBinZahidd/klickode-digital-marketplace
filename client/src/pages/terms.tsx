import { FileText, Scale, Shield, AlertTriangle, User, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import CheckeredBackground from "@/components/checkered-background";


export default function Terms() {
  return (
    <CheckeredBackground className="min-h-screen">

      <Navigation />
      
      <div className="pt-20 pb-8 px-8 sm:px-12 lg:px-16" style={{ marginTop: '60px' }}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-left mb-12">
            <h1 className="text-2xl md:text-3xl font-space-mono text-white mb-4">
              Terms of <span className="text-primary-red">Service</span>
            </h1>
            <p className="text-base text-gray-300 font-space-mono">
              Last updated: January 2025
            </p>
          </div>

          {/* Introduction */}
          <Card className="bg-space-darker border-gray-700 mb-8">
            <CardHeader>
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-primary-red" />
                <CardTitle className="text-white font-space-mono">Agreement Overview</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 font-space-mono leading-relaxed">
                By using Klickode, you agree to these terms of service. Please read them carefully as they 
                govern your use of our platform, including access to digital assets, AI tools, and community features.
              </p>
            </CardContent>
          </Card>

          {/* Account Terms */}
          <Card className="bg-space-darker border-gray-700 mb-8">
            <CardHeader>
              <div className="flex items-center gap-3">
                <User className="h-6 w-6 text-primary-red" />
                <CardTitle className="text-white font-space-mono">Account Terms</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-red rounded-full mt-2"></div>
                  <p className="text-gray-300 font-space-mono text-sm">
                    You must be 18 or older to create an account
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-red rounded-full mt-2"></div>
                  <p className="text-gray-300 font-space-mono text-sm">
                    Provide accurate and complete information
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-red rounded-full mt-2"></div>
                  <p className="text-gray-300 font-space-mono text-sm">
                    Keep your account credentials secure
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-red rounded-full mt-2"></div>
                  <p className="text-gray-300 font-space-mono text-sm">
                    You are responsible for all activity on your account
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Platform Usage */}
          <Card className="bg-space-darker border-gray-700 mb-8">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Scale className="h-6 w-6 text-primary-red" />
                <CardTitle className="text-white font-space-mono">Platform Usage</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-white font-space-mono mb-2">Permitted Use</h3>
                <p className="text-gray-300 font-space-mono text-sm mb-3">
                  You may use Klickode for lawful purposes only. This includes:
                </p>
                <div className="space-y-2 ml-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary-red rounded-full mt-2"></div>
                    <p className="text-gray-300 font-space-mono text-sm">
                      Browsing and purchasing digital assets
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary-red rounded-full mt-2"></div>
                    <p className="text-gray-300 font-space-mono text-sm">
                      Using AI development tools for legitimate projects
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary-red rounded-full mt-2"></div>
                    <p className="text-gray-300 font-space-mono text-sm">
                      Participating in community discussions
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-white font-space-mono mb-2">Prohibited Activities</h3>
                <div className="space-y-2 ml-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <p className="text-gray-300 font-space-mono text-sm">
                      Unauthorized access to systems or accounts
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <p className="text-gray-300 font-space-mono text-sm">
                      Uploading malicious content or viruses
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <p className="text-gray-300 font-space-mono text-sm">
                      Violating intellectual property rights
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Terms */}
          <Card className="bg-space-darker border-gray-700 mb-8">
            <CardHeader>
              <div className="flex items-center gap-3">
                <CreditCard className="h-6 w-6 text-primary-red" />
                <CardTitle className="text-white font-space-mono">Payment Terms</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-red rounded-full mt-2"></div>
                  <p className="text-gray-300 font-space-mono text-sm">
                    All purchases are final unless otherwise stated
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-red rounded-full mt-2"></div>
                  <p className="text-gray-300 font-space-mono text-sm">
                    Prices are subject to change without notice
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-red rounded-full mt-2"></div>
                  <p className="text-gray-300 font-space-mono text-sm">
                    Refunds are processed according to our refund policy
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-red rounded-full mt-2"></div>
                  <p className="text-gray-300 font-space-mono text-sm">
                    Payment processing is handled by secure third-party providers
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card className="bg-space-darker border-gray-700 mb-8">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-primary-red" />
                <CardTitle className="text-white font-space-mono">Intellectual Property</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-white font-space-mono mb-2">Platform Content</h3>
                <p className="text-gray-300 font-space-mono text-sm">
                  All content, features, and functionality on Klickode are owned by us and protected by copyright, 
                  trademark, and other intellectual property laws.
                </p>
              </div>
              
              <div>
                <h3 className="text-white font-space-mono mb-2">User Content</h3>
                <p className="text-gray-300 font-space-mono text-sm">
                  By uploading content to our platform, you grant us a license to use, modify, and distribute 
                  that content as necessary to provide our services.
                </p>
              </div>
              
              <div>
                <h3 className="text-white font-space-mono mb-2">Digital Assets</h3>
                <p className="text-gray-300 font-space-mono text-sm">
                  Purchased digital assets are licensed to you under specific terms provided with each asset. 
                  You do not acquire ownership of the underlying intellectual property.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimers */}
          <Card className="bg-space-darker border-gray-700 mb-8">
            <CardHeader>
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-primary-red" />
                <CardTitle className="text-white font-space-mono">Disclaimers</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <p className="text-gray-300 font-space-mono text-sm">
                    Services are provided "as is" without warranties
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <p className="text-gray-300 font-space-mono text-sm">
                    AI tools may not always produce perfect results
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <p className="text-gray-300 font-space-mono text-sm">
                    We are not liable for third-party content or services
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <p className="text-gray-300 font-space-mono text-sm">
                    Service availability may be interrupted for maintenance
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="bg-space-darker border-gray-700">
            <CardHeader>
              <CardTitle className="text-white font-space-mono">Questions?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 font-space-mono text-sm mb-4">
                If you have any questions about these terms, please contact us:
              </p>
              <div className="space-y-2">
                <p className="text-gray-300 font-space-mono text-sm">
                  Email: legal@klickode.com
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