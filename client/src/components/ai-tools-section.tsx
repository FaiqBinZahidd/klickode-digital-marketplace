
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Code2, Palette, MessageSquare, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

const aiTools = [
  {
    icon: Code2,
    title: "Code Generator",
    description: "Transform natural language descriptions into production-ready code in JavaScript, Python, React, and more.",
    badge: "Most Popular",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Palette,
    title: "Code Translator",
    description: "Seamlessly convert code between different programming languages while maintaining functionality and best practices.",
    badge: "Time Saver",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: MessageSquare,
    title: "Code Optimizer",
    description: "Improve code performance, readability, and maintainability with AI-powered optimization suggestions.",
    badge: "Performance",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Brain,
    title: "Code Explainer",
    description: "Get detailed explanations of complex code, algorithms, and programming concepts with interactive examples.",
    badge: "Learning",
    color: "from-orange-500 to-red-500"
  }
];

export default function AIToolsSection() {
  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden" style={{ marginTop: '40px', marginBottom: '40px' }}>
      {/* Background gradient - same as hero section */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-space-darker/40 to-black/60" />
      
      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-[#ff3434]/20 text-[#ff3434] border-[#ff3434]/30 border font-space-mono">
            <Zap className="w-4 h-4 mr-1" />
            Powered by AI
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-space-mono">
            Supercharge Your Development with
            <span className="text-[#ff3434]"> AI Tools</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto font-space-mono">
            Leverage cutting-edge artificial intelligence to code faster, design better, and build more efficiently
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 max-w-5xl mx-auto">
          {aiTools.map((tool, index) => (
          <Card 
            key={index}
            className="bg-space-darker/95 backdrop-blur-md border border-gray-700/70 hover:border-[#ff3434]/50 transition-all duration-300 hover:scale-105 group cursor-pointer rounded-xl card-3d hover-3d"
          >
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-[#ff3434]/10 hover:bg-[#ff3434]/20 transition-colors">
                  <tool.icon className="w-6 h-6 text-[#ff3434]" />
                </div>
                <Badge variant="secondary" className="bg-[#ff3434]/10 text-[#ff3434] border-[#ff3434]/20 font-space-mono">
                  {tool.badge}
                </Badge>
              </div>
              <CardTitle className="text-white group-hover:text-[#ff3434] transition-colors font-space-mono">
                {tool.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-6 leading-relaxed font-space-mono">
                {tool.description}
              </p>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-300 hover:text-[#ff3434] p-0 h-auto font-semibold group-hover:translate-x-1 transition-transform font-space-mono"
              >
                Try it now
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/ai-tools">
            <Button size="lg" className="bg-[#ff3434] hover:bg-[#ff3434]/80 text-white px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-space-mono">
              Explore All AI Tools
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
