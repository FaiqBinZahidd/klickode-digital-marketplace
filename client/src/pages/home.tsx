import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import AIToolsSection from "@/components/ai-tools-section";
import Footer from "@/components/footer";
import CheckeredBackground from "@/components/checkered-background";



export default function Home() {
  return (
    <CheckeredBackground className="min-h-screen">
      {/* Background layers */}

      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section - Full width */}
        <HeroSection />
        
        {/* Features Section - Contained */}
        <section className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FeaturesSection />
          </div>
        </section>
        
        {/* AI Tools Section - Contained */}
        <section className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AIToolsSection />
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
    </CheckeredBackground>
  );
}
