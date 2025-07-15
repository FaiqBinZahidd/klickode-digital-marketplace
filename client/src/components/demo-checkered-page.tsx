import React from 'react';
import CheckeredBackground from './checkered-background';
import Navigation from './navigation';
import HeroSection from './hero-section';
import AIToolsSection from './ai-tools-section';
import FeaturesSection from './features-section';
import Footer from './footer';

export default function DemoCheckeredPage() {
  return (
    <CheckeredBackground className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AIToolsSection />
      <FeaturesSection />
      <Footer />
    </CheckeredBackground>
  );
}