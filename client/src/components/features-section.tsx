
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Palette, Zap, Shield, Users, Sparkles, Star } from 'lucide-react';
import { Link } from 'wouter';

const features = [
  {
    icon: Code,
    title: "Klickode Marketplace",
    description: "Browse and purchase premium code snippets, UI kits, templates, and complete web applications created by skilled developers.",
    badge: "Verified Assets",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Palette,
    title: "Digital Asset Store",
    description: "Discover professional UI components, responsive templates, mobile app designs, and graphic resources for your projects.",
    badge: "Design Quality",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Zap,
    title: "AI Development Tools",
    description: "Access powerful AI-powered code generators, translators, optimizers, and debugging assistants to accelerate development.",
    badge: "AI Enhanced",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: Shield,
    title: "Seller Dashboard",
    description: "Monetize your skills by selling digital assets on our secure platform with 80% revenue share and instant payments.",
    badge: "Earn Revenue",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Users,
    title: "Learning Platform",
    description: "Master new programming languages and frameworks with our interactive AI tutor and hands-on coding challenges.",
    badge: "Skill Building",
    color: "from-indigo-500 to-purple-500"
  },
  {
    icon: Sparkles,
    title: "Code Playground",
    description: "Test, experiment, and prototype with our multi-language code editor featuring live preview and AI code assistance.",
    badge: "Live Coding",
    color: "from-pink-500 to-rose-500"
  }
];

export default function FeaturesSection() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      features.forEach((_, index) => {
        setTimeout(() => {
          setVisibleCards(prev => [...prev, index]);
        }, index * 200);
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ marginTop: '30px', marginBottom: '30px' }}>
      <div className="text-center mb-16">
        <div className="inline-block mb-4">
          <Badge className="bg-[#ff3434]/20 text-[#ff3434] border-[#ff3434]/30 border font-space-mono px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            Complete Development Ecosystem
          </Badge>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 font-space-mono">
          Your Development
          <span className="text-[#ff3434]"> Superpower</span>
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed font-space-mono">
          From concept to deployment, access everything you need to build extraordinary digital experiences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Left Column - Main Features */}
        <div className="space-y-6">
          {features.slice(0, 3).map((feature, index) => (
            <div 
              key={index}
              className={`flex items-start space-x-4 p-6 rounded-xl bg-gradient-to-r from-space-darker/80 to-space-darker/60 border border-gray-700/50 hover:border-[#ff3434]/50 transition-all duration-500 transform group ${
                visibleCards.includes(index) 
                  ? 'translate-x-0 opacity-100' 
                  : 'translate-x-8 opacity-0'
              } hover:scale-[1.02] hover:shadow-lg hover:shadow-[#ff3434]/10`}
            >
              <div className="flex-shrink-0 p-3 rounded-lg bg-[#ff3434]/10 group-hover:bg-[#ff3434]/20 transition-colors">
                <feature.icon className="w-6 h-6 text-[#ff3434]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white group-hover:text-[#ff3434] transition-colors font-space-mono">
                    {feature.title}
                  </h3>
                  <Badge variant="outline" className="bg-[#ff3434]/10 text-[#ff3434] border-[#ff3434]/20 font-space-mono text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <p className="text-gray-400 leading-relaxed font-space-mono text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column - Additional Features */}
        <div className="space-y-6">
          {features.slice(3).map((feature, index) => (
            <div 
              key={index + 3}
              className={`flex items-start space-x-4 p-6 rounded-xl bg-gradient-to-l from-space-darker/80 to-space-darker/60 border border-gray-700/50 hover:border-[#ff3434]/50 transition-all duration-500 transform group ${
                visibleCards.includes(index + 3) 
                  ? 'translate-x-0 opacity-100' 
                  : '-translate-x-8 opacity-0'
              } hover:scale-[1.02] hover:shadow-lg hover:shadow-[#ff3434]/10`}
            >
              <div className="flex-shrink-0 p-3 rounded-lg bg-[#ff3434]/10 group-hover:bg-[#ff3434]/20 transition-colors">
                <feature.icon className="w-6 h-6 text-[#ff3434]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white group-hover:text-[#ff3434] transition-colors font-space-mono">
                    {feature.title}
                  </h3>
                  <Badge variant="outline" className="bg-[#ff3434]/10 text-[#ff3434] border-[#ff3434]/20 font-space-mono text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <p className="text-gray-400 leading-relaxed font-space-mono text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-12">
        <Link href="/browse">
          <Button size="lg" className="bg-[#ff3434] hover:bg-[#ff3434]/80 text-white px-6 py-3 text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-space-mono">
            Explore All Features
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
