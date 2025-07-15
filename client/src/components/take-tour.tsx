import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Code, 
  Zap, 
  Brain, 
  ShoppingCart, 
  Star, 
  Users, 
  Rocket,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

interface TourStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  duration: string;
  badge?: string;
}

const tourSteps: TourStep[] = [
  {
    id: 'marketplace',
    title: 'Digital Asset Marketplace',
    description: 'Discover thousands of premium digital assets including UI kits, templates, and code snippets.',
    icon: <ShoppingCart className="w-8 h-8 text-primary-red" />,
    features: [
      'Browse 1000+ digital assets',
      'Filter by category and price',
      'Preview before purchase',
      'Instant download access'
    ],
    duration: '2 min',
    badge: 'Popular'
  },
  {
    id: 'ai-tools',
    title: 'AI-Powered Development Tools',
    description: 'Boost your productivity with our suite of AI tools for code generation, translation, and optimization.',
    icon: <Zap className="w-8 h-8 text-primary-red" />,
    features: [
      'Code generation from natural language',
      'Multi-language code translation',
      'Performance optimization suggestions',
      'Automated bug detection'
    ],
    duration: '3 min',
    badge: 'AI-Powered'
  },
  {
    id: 'learning',
    title: 'Klicko AI Learning Assistant',
    description: 'Learn programming concepts with our personalized AI tutor that adapts to your skill level.',
    icon: <Brain className="w-8 h-8 text-primary-red" />,
    features: [
      'Personalized learning paths',
      'Interactive coding challenges',
      'Real-time feedback',
      'Progress tracking'
    ],
    duration: '5 min',
    badge: 'Educational'
  },
  {
    id: 'playground',
    title: 'Code Playground',
    description: 'Test and experiment with code in our multi-language playground with live preview capabilities.',
    icon: <Code className="w-8 h-8 text-primary-red" />,
    features: [
      'Multi-language support',
      'Live code execution',
      'AI code explanations',
      'Share your projects'
    ],
    duration: '3 min'
  },
  {
    id: 'community',
    title: 'Developer Community',
    description: 'Connect with other developers, share knowledge, and get help in our vibrant community forum.',
    icon: <Users className="w-8 h-8 text-primary-red" />,
    features: [
      'Q&A discussions',
      'Code reviews',
      'Project showcases',
      'Expert advice'
    ],
    duration: '4 min'
  },
  {
    id: 'seller',
    title: 'Become a Seller',
    description: 'Monetize your skills by selling digital assets and earning from your creations.',
    icon: <Star className="w-8 h-8 text-primary-red" />,
    features: [
      'Upload your assets',
      'Set your own prices',
      'Earn 80% commission',
      'Analytics dashboard'
    ],
    duration: '3 min',
    badge: 'Earn Money'
  }
];

export default function TakeTour() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleStartTour = () => {
    setIsPlaying(true);
    setCurrentStep(0);
  };

  const handleNextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsPlaying(false);
      setCurrentStep(0);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    setIsPlaying(true);
  };

  const currentTourStep = tourSteps[currentStep];

  return (
    <div className="py-20 px-8 sm:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-space-mono text-3d-pop">
            Take the Tour
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-space-mono">
            Discover all the powerful features that make Klickode the ultimate platform for developers and creators.
          </p>
        </div>

        {!isPlaying ? (
          // Tour Overview
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {tourSteps.map((step, index) => (
              <Card
                key={step.id}
                className="bg-space-darker/90 backdrop-blur-sm border-gray-600 hover:border-primary-red/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary-red/20 cursor-pointer group"
                onClick={() => handleStepClick(index)}
              >
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-primary-red/10 rounded-full group-hover:bg-primary-red/20 transition-colors">
                      {step.icon}
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <CardTitle className="text-xl font-space-mono">{step.title}</CardTitle>
                    {step.badge && (
                      <Badge variant="secondary" className="bg-primary-red/20 text-primary-red font-space-mono text-xs">
                        {step.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-400 font-space-mono text-sm">{step.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {step.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300 font-space-mono">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400 font-space-mono">
                      Duration: {step.duration}
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-primary-red hover:bg-primary-red/10 font-space-mono"
                    >
                      <Play className="w-4 h-4 mr-1" />
                      Start
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          // Interactive Tour Player
          <div className="max-w-4xl mx-auto">
            <Card className="bg-space-darker/90 backdrop-blur-sm border-gray-600 mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary-red/10 rounded-full">
                      {currentTourStep.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-2xl font-space-mono">{currentTourStep.title}</CardTitle>
                        {currentTourStep.badge && (
                          <Badge variant="secondary" className="bg-primary-red/20 text-primary-red font-space-mono">
                            {currentTourStep.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-400 font-space-mono">{currentTourStep.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400 font-space-mono">
                      Step {currentStep + 1} of {tourSteps.length}
                    </div>
                    <div className="text-sm text-gray-400 font-space-mono">
                      {currentTourStep.duration}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-primary-red font-space-mono">Key Features:</h4>
                    <div className="space-y-2">
                      {currentTourStep.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                          <span className="text-gray-300 font-space-mono">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-600">
                    <div className="aspect-video bg-gradient-to-br from-primary-red/20 to-transparent rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Rocket className="w-16 h-16 text-primary-red mx-auto mb-4" />
                        <p className="text-gray-300 font-space-mono">Interactive Demo</p>
                        <p className="text-sm text-gray-400 font-space-mono">Coming Soon</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400 font-space-mono">Tour Progress</span>
                <span className="text-sm text-gray-400 font-space-mono">
                  {Math.round(((currentStep + 1) / tourSteps.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-primary-red h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / tourSteps.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Tour Navigation */}
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={() => setIsPlaying(false)}
                className="border-gray-600 text-gray-300 hover:bg-gray-700 font-space-mono"
              >
                Exit Tour
              </Button>
              <Button
                onClick={handleNextStep}
                className="bg-primary-red hover:bg-red-600 text-white font-space-mono"
              >
                {currentStep === tourSteps.length - 1 ? 'Complete Tour' : 'Next Step'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Call to Action */}
        {!isPlaying && (
          <div className="text-center mt-12">
            <Button
              onClick={handleStartTour}
              size="lg"
              className="bg-primary-red hover:bg-red-600 text-white px-8 py-4 text-lg font-space-mono"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Complete Tour
            </Button>
            <p className="text-sm text-gray-400 mt-4 font-space-mono">
              Takes about 20 minutes to complete all sections
            </p>
          </div>
        )}
      </div>
    </div>
  );
}