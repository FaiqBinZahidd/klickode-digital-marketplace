import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star, Code, Palette, Zap } from 'lucide-react';
import { Link } from 'wouter';
import { AnimatedHeading } from './animated-heading';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden" style={{ paddingTop: '160px', paddingBottom: '80px' }}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-space-darker/40 to-black/60" />
      


      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center py-12">

        {/* Main heading with animated text */}
        <div className="relative mb-8">
          <AnimatedHeading />
        </div>

        {/* Description */}
        <p className="text-base sm:text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed font-space-mono">
          Thailand's premier digital marketplace for developers. Buy premium code assets, sell your creations, 
          and accelerate development with AI-powered tools.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
          <Link href="/browse">
            <Button size="lg" className="bg-[#ff3434] hover:bg-[#ff3434]/80 text-white px-6 py-3 text-base font-space-mono shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Start Browsing
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="outline" size="lg" className="border-[#ff3434]/50 text-white hover:bg-[#ff3434]/10 hover:border-[#ff3434] px-6 py-3 text-base font-space-mono transition-all duration-300">
              Join as Seller
            </Button>
          </Link>
        </div>

        {/* Feature highlights - Smaller and more organized */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-4xl mx-auto">
          <div className="flex flex-col items-center p-4 bg-space-darker/80 rounded-lg border border-gray-700/50 hover:border-[#ff3434]/50 transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:shadow-lg hover:shadow-[#ff3434]/20 cursor-pointer">
            <Code className="w-5 h-5 text-[#ff3434] mb-2" />
            <h3 className="text-sm font-semibold text-white mb-2 font-space-mono">Premium Code</h3>
            <p className="text-gray-400 text-center font-space-mono text-xs">Ready-to-use templates</p>
          </div>
          <div className="flex flex-col items-center p-4 bg-space-darker/80 rounded-lg border border-gray-700/50 hover:border-[#ff3434]/50 transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:shadow-lg hover:shadow-[#ff3434]/20 cursor-pointer">
            <Palette className="w-5 h-5 text-[#ff3434] mb-2" />
            <h3 className="text-sm font-semibold text-white mb-2 font-space-mono">Design Assets</h3>
            <p className="text-gray-400 text-center font-space-mono text-xs">UI components</p>
          </div>
          <div className="flex flex-col items-center p-4 bg-space-darker/80 rounded-lg border border-gray-700/50 hover:border-[#ff3434]/50 transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:shadow-lg hover:shadow-[#ff3434]/20 cursor-pointer">
            <Zap className="w-5 h-5 text-[#ff3434] mb-2" />
            <h3 className="text-sm font-semibold text-white mb-2 font-space-mono">AI Tools</h3>
            <p className="text-gray-400 text-center font-space-mono text-xs">Smart assistants</p>
          </div>
        </div>
      </div>
    </section>
  );
}