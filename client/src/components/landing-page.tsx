import HeroSection from "./hero-section";
import FeaturesSection from "./features-section";
import AIToolsSection from "./ai-tools-section";
import Footer from "./footer";
import CheckeredBackground from "./checkered-background";

export default function LandingPage() {
  return (
    <CheckeredBackground className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <AIToolsSection />
      <div className="pb-20"></div>
      <Footer />
    </CheckeredBackground>
  );
}