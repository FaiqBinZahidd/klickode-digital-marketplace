import { Users, Target, Award, Code, Zap, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import CheckeredBackground from "@/components/checkered-background";


export default function About() {
  return (
    <CheckeredBackground className="min-h-screen">

      <Navigation />
      
      <div className="pt-20 pb-8 px-8 sm:px-12 lg:px-16" style={{ marginTop: '60px' }}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-left mb-12">
            <h1 className="text-2xl md:text-3xl font-space-mono text-white mb-4">
              About <span className="text-primary-red">Klickode</span>
            </h1>
            <p className="text-base text-gray-300 max-w-3xl font-space-mono">
              Empowering developers worldwide with cutting-edge tools, premium digital assets, and AI-powered development solutions.
            </p>
          </div>

          {/* Mission Statement */}
          <Card className="bg-space-darker border-gray-700 mb-12">
            <CardContent className="p-8">
              <div className="text-center">
                <h2 className="text-xl font-space-mono text-white mb-4">Our Mission</h2>
                <p className="text-gray-300 font-space-mono leading-relaxed max-w-4xl mx-auto">
                  At Klickode, we believe in democratizing development tools and resources. Our platform brings together 
                  a vibrant community of developers, designers, and creators who share a passion for innovation and excellence. 
                  We're building the future of digital asset marketplaces with AI-powered tools that accelerate development 
                  and inspire creativity.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Core Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-space-darker border-gray-700">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-red/20 rounded-lg flex items-center justify-center">
                    <Code className="h-6 w-6 text-primary-red" />
                  </div>
                  <CardTitle className="text-white font-space-mono">Innovation</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 font-space-mono">
                  We embrace cutting-edge technologies and push the boundaries of what's possible in digital development.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-space-darker border-gray-700">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-red/20 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary-red" />
                  </div>
                  <CardTitle className="text-white font-space-mono">Community</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 font-space-mono">
                  Building a supportive ecosystem where developers can learn, share, and grow together.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-space-darker border-gray-700">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-red/20 rounded-lg flex items-center justify-center">
                    <Award className="h-6 w-6 text-primary-red" />
                  </div>
                  <CardTitle className="text-white font-space-mono">Quality</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 font-space-mono">
                  Every asset, tool, and feature is crafted with attention to detail and commitment to excellence.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card className="bg-space-darker border-gray-700">
              <CardHeader>
                <CardTitle className="text-white font-space-mono">What We Offer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary-red/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="h-4 w-4 text-primary-red" />
                  </div>
                  <div>
                    <h4 className="text-white font-space-mono mb-1">AI-Powered Tools</h4>
                    <p className="text-gray-300 font-space-mono text-sm">
                      Advanced AI tools for code generation, optimization, and debugging
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary-red/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="h-4 w-4 text-primary-red" />
                  </div>
                  <div>
                    <h4 className="text-white font-space-mono mb-1">Digital Marketplace</h4>
                    <p className="text-gray-300 font-space-mono text-sm">
                      Premium templates, UI kits, and development resources
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary-red/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Code className="h-4 w-4 text-primary-red" />
                  </div>
                  <div>
                    <h4 className="text-white font-space-mono mb-1">Learning Platform</h4>
                    <p className="text-gray-300 font-space-mono text-sm">
                      Interactive tutorials and AI-powered learning assistance
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-space-darker border-gray-700">
              <CardHeader>
                <CardTitle className="text-white font-space-mono">Platform Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-space-mono">Active Developers</span>
                  <span className="text-2xl font-bold text-primary-red font-space-mono">10,000+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-space-mono">Digital Assets</span>
                  <span className="text-2xl font-bold text-primary-red font-space-mono">5,000+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-space-mono">AI Queries Processed</span>
                  <span className="text-2xl font-bold text-primary-red font-space-mono">1M+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-space-mono">Countries Served</span>
                  <span className="text-2xl font-bold text-primary-red font-space-mono">50+</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Team */}
          <Card className="bg-space-darker border-gray-700">
            <CardHeader>
              <CardTitle className="text-white font-space-mono">Our Team</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 font-space-mono mb-6">
                Klickode is built by a passionate team of developers, designers, and AI enthusiasts who understand 
                the challenges of modern software development. We're committed to creating tools that make development 
                more efficient, enjoyable, and accessible to everyone.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-red/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="h-8 w-8 text-primary-red" />
                  </div>
                  <h4 className="text-white font-space-mono mb-1">Engineering Team</h4>
                  <p className="text-gray-400 font-space-mono text-sm">Building robust, scalable solutions</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-red/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="h-8 w-8 text-primary-red" />
                  </div>
                  <h4 className="text-white font-space-mono mb-1">Design Team</h4>
                  <p className="text-gray-400 font-space-mono text-sm">Creating intuitive user experiences</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-red/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Zap className="h-8 w-8 text-primary-red" />
                  </div>
                  <h4 className="text-white font-space-mono mb-1">AI Research</h4>
                  <p className="text-gray-400 font-space-mono text-sm">Advancing AI-powered development tools</p>
                </div>
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