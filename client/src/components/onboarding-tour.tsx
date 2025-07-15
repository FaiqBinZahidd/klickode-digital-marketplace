import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, ChevronRight, ChevronLeft, Rocket, Code, Star, ShoppingCart, Zap, Users, Target, Sparkles } from 'lucide-react';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  target?: string;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
  animation: 'bounce' | 'pulse' | 'float' | 'glow' | 'rocket';
  highlight?: boolean;
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Klickode Space! 🚀',
    description: 'Ready to explore the galaxy of digital assets? Let\'s take a quick tour of our space-themed marketplace.',
    icon: <Rocket className="h-8 w-8 text-primary-red" />,
    position: 'center',
    animation: 'rocket',
    highlight: true
  },
  {
    id: 'browse',
    title: 'Asset Galaxy Explorer',
    description: 'Discover thousands of digital assets from UI kits to templates. Use filters to find exactly what you need.',
    icon: <Star className="h-8 w-8 text-primary-red" />,
    position: 'center',
    animation: 'pulse'
  },
  {
    id: 'ai-tools',
    title: 'AI Powered Development Hub',
    description: 'Access powerful AI tools for code generation, optimization, and debugging. Your coding companion awaits!',
    icon: <Zap className="h-8 w-8 text-primary-red" />,
    position: 'center',
    animation: 'bounce'
  },
  {
    id: 'marketplace',
    title: 'Digital Marketplace',
    description: 'Buy and sell digital assets with ease. Connect with creators and build your digital empire.',
    icon: <ShoppingCart className="h-8 w-8 text-primary-red" />,
    position: 'center',
    animation: 'float'
  },
  {
    id: 'community',
    title: 'Space Community',
    description: 'Join forums, share knowledge, and connect with fellow space travelers in our developer community.',
    icon: <Users className="h-8 w-8 text-primary-red" />,
    position: 'center',
    animation: 'glow'
  },
  {
    id: 'complete',
    title: 'Ready for Launch! 🌟',
    description: 'You\'re all set to explore Klickode! Start by browsing assets or try our AI tools. Welcome aboard, space traveler!',
    icon: <Sparkles className="h-8 w-8 text-primary-red" />,
    position: 'center',
    animation: 'bounce',
    highlight: true
  }
];

interface OnboardingTourProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OnboardingTour({ isOpen, onClose }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const currentStepData = onboardingSteps[currentStep];

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipTour = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary-red/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Floating stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white/20 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            ⭐
          </div>
        ))}
      </div>

      {/* Tour card - always centered */}
      <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-60 transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <Card className="w-96 bg-space-darker border-primary-red/50 shadow-2xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className={`${getAnimationClass(currentStepData.animation)}`}>
                {currentStepData.icon}
              </div>
            </div>
            <CardTitle className="text-white font-space-mono text-xl">
              {currentStepData.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <CardDescription className="text-gray-300 font-space-mono text-center">
              {currentStepData.description}
            </CardDescription>
            
            {/* Progress indicator */}
            <div className="flex justify-center space-x-2">
              {onboardingSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentStep ? 'bg-primary-red animate-pulse' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={skipTour}
                className="text-gray-300 border-gray-600 hover:bg-gray-700"
              >
                Skip Tour
              </Button>
              
              <div className="flex space-x-2">
                {currentStep > 0 && (
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    className="text-gray-300 border-gray-600 hover:bg-gray-700"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                )}
                
                {currentStep < onboardingSteps.length - 1 ? (
                  <Button
                    onClick={nextStep}
                    className="bg-primary-red hover:bg-red-600"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={onClose}
                    className="bg-primary-red hover:bg-red-600 animate-pulse"
                  >
                    Start Exploring!
                    <Rocket className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function getAnimationClass(animation: string): string {
  switch (animation) {
    case 'bounce':
      return 'animate-bounce';
    case 'pulse':
      return 'animate-pulse';
    case 'rocket':
      return 'animate-bounce';
    case 'float':
      return 'animate-pulse';
    case 'glow':
      return 'animate-pulse';
    default:
      return 'animate-pulse';
  }
}