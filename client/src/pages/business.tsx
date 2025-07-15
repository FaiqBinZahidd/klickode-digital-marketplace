import { useState } from "react";
import { Code, Palette, RefreshCcw, Database, TrendingUp, Search, CheckCircle, Star, Phone, Mail, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import CheckeredBackground from "@/components/checkered-background";


const servicePackages = [
  {
    id: "web-development",
    title: "Web Development Package",
    description: "Complete website solutions from design to deployment",
    services: ["Web Design", "Web Development", "Web Redesign"],
    icon: <Code className="h-8 w-8 text-primary-red" />,
    price: "฿15,000",
    originalPrice: "฿20,000",
    features: [
      "Custom responsive web design",
      "Modern frontend development",
      "Mobile-first approach",
      "SEO-optimized structure",
      "Cross-browser compatibility",
      "Performance optimization",
      "3 months support"
    ],
    popular: true
  },
  {
    id: "wordpress-solutions",
    title: "WordPress Solutions",
    description: "WordPress development and migration services",
    services: ["WordPress Development", "Web Migration"],
    icon: <Globe className="h-8 w-8 text-primary-red" />,
    price: "฿12,000",
    originalPrice: "฿16,000",
    features: [
      "Custom WordPress themes",
      "Plugin development",
      "Site migration services",
      "Performance optimization",
      "Security hardening",
      "Backup solutions",
      "2 months support"
    ],
    popular: false
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing Suite",
    description: "Boost your online presence and rankings",
    services: ["Digital Marketing", "SEO Optimization"],
    icon: <TrendingUp className="h-8 w-8 text-primary-red" />,
    price: "฿8,000",
    originalPrice: "฿12,000",
    features: [
      "SEO audit & optimization",
      "Content marketing strategy",
      "Social media management",
      "Google Analytics setup",
      "Keyword research",
      "Monthly reports",
      "6 months consulting"
    ],
    popular: false
  }
];

const individualServices = [
  { name: "Web Design", price: "฿5,000", description: "Custom UI/UX design" },
  { name: "Web Development", price: "฿8,000", description: "Frontend & backend development" },
  { name: "WordPress Development", price: "฿6,000", description: "Custom WordPress solutions" },
  { name: "Web Redesign", price: "฿4,000", description: "Modernize your existing site" },
  { name: "Web Migration", price: "฿3,000", description: "Safe site migration services" },
  { name: "Digital Marketing", price: "฿4,500", description: "Comprehensive marketing strategy" },
  { name: "SEO Optimization", price: "฿3,500", description: "Search engine optimization" }
];

export default function Business() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Request Submitted!",
      description: "Thank you for your interest. We'll contact you within 24 hours.",
    });
    
    setFormData({ name: "", email: "", company: "", service: "", budget: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <CheckeredBackground className="min-h-screen">
      <Navigation />
      
      <div className="pt-32 px-6 sm:px-8 lg:px-10" style={{ marginTop: '60px' }}>
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#ff3434]/20 text-[#ff3434] border-[#ff3434]/30 border font-space-mono">
              <CheckCircle className="w-4 h-4 mr-2" />
              Professional Services
            </Badge>
            <h1 className="text-3xl md:text-4xl font-space-mono text-white mb-6">
              Business with <span className="text-[#ff3434]">Klickode</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-space-mono leading-relaxed">
              Professional web development and digital marketing services tailored for businesses in Thailand. 
              Transform your online presence with our expert team and cutting-edge solutions.
            </p>
          </div>

          {/* Service Packages */}
          <div className="mb-12">
            <h2 className="text-xl font-space-mono text-white mb-8">Service Packages</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {servicePackages.map((pkg) => (
                <Card 
                  key={pkg.id} 
                  className={`bg-space-darker border-gray-700 hover:border-primary-red/50 transition-all duration-300 relative ${
                    pkg.popular ? 'border-primary-red' : ''
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary-red text-white px-3 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-primary-red/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      {pkg.icon}
                    </div>
                    <CardTitle className="text-white font-space-mono">{pkg.title}</CardTitle>
                    <p className="text-gray-300 font-space-mono text-sm">{pkg.description}</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-3xl font-bold text-primary-red font-space-mono">
                          {pkg.price}
                        </span>
                        <span className="text-lg text-gray-500 line-through font-space-mono">
                          {pkg.originalPrice}
                        </span>
                      </div>
                      <p className="text-gray-400 font-space-mono text-sm">Starting from</p>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-gray-300 font-space-mono text-sm mb-3">Includes:</p>
                      {pkg.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary-red flex-shrink-0" />
                          <span className="text-gray-300 font-space-mono text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex flex-wrap gap-1 pt-4">
                      {pkg.services.map((service) => (
                        <Badge key={service} variant="secondary" className="text-xs bg-gray-700 text-gray-300">
                          {service}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button 
                      className="w-full bg-primary-red hover:bg-red-600"
                      onClick={() => setSelectedPackage(pkg.id)}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Individual Services */}
          <div className="mb-12">
            <h2 className="text-xl font-space-mono text-white mb-8">Individual Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {individualServices.map((service) => (
                <Card key={service.name} className="bg-space-darker border-gray-700 hover:border-primary-red/50 transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-white font-space-mono">{service.name}</h3>
                      <span className="text-primary-red font-space-mono font-bold">{service.price}</span>
                    </div>
                    <p className="text-gray-300 font-space-mono text-sm mb-3">{service.description}</p>
                    <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:border-primary-red hover:text-white">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Why Choose Us */}
          <Card className="bg-space-darker border-gray-700 mb-12">
            <CardHeader>
              <CardTitle className="text-white font-space-mono">Why Choose Klickode for Your Business?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-red/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="h-6 w-6 text-primary-red" />
                  </div>
                  <h4 className="text-white font-space-mono mb-2">Expert Team</h4>
                  <p className="text-gray-300 font-space-mono text-sm">5+ years experience in web development</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-red/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="h-6 w-6 text-primary-red" />
                  </div>
                  <h4 className="text-white font-space-mono mb-2">Quality Assured</h4>
                  <p className="text-gray-300 font-space-mono text-sm">100% satisfaction guarantee</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-red/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <RefreshCcw className="h-6 w-6 text-primary-red" />
                  </div>
                  <h4 className="text-white font-space-mono mb-2">Fast Delivery</h4>
                  <p className="text-gray-300 font-space-mono text-sm">Projects completed within 2-4 weeks</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-red/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Phone className="h-6 w-6 text-primary-red" />
                  </div>
                  <h4 className="text-white font-space-mono mb-2">Local Support</h4>
                  <p className="text-gray-300 font-space-mono text-sm">Thailand-based team with local expertise</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-space-darker border-gray-700">
              <CardHeader>
                <CardTitle className="text-white font-space-mono">Request a Quote</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 font-space-mono">
                        Name *
                      </label>
                      <Input
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-space-dark border-gray-600 text-white font-space-mono"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 font-space-mono">
                        Email *
                      </label>
                      <Input
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-space-dark border-gray-600 text-white font-space-mono"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 font-space-mono">
                      Company
                    </label>
                    <Input
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      className="bg-space-dark border-gray-600 text-white font-space-mono"
                      placeholder="Your company name"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 font-space-mono">
                        Service Interested
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full bg-space-dark border border-gray-600 text-white font-space-mono rounded-md px-3 py-2"
                      >
                        <option value="">Select a service</option>
                        <option value="web-development">Web Development Package</option>
                        <option value="wordpress-solutions">WordPress Solutions</option>
                        <option value="digital-marketing">Digital Marketing Suite</option>
                        <option value="custom">Custom Solution</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2 font-space-mono">
                        Budget Range (THB)
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full bg-space-dark border border-gray-600 text-white font-space-mono rounded-md px-3 py-2"
                      >
                        <option value="">Select budget</option>
                        <option value="5000-10000">฿5,000 - ฿10,000</option>
                        <option value="10000-20000">฿10,000 - ฿20,000</option>
                        <option value="20000-50000">฿20,000 - ฿50,000</option>
                        <option value="50000+">฿50,000+</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 font-space-mono">
                      Project Details
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="bg-space-dark border-gray-600 text-white font-space-mono min-h-[100px]"
                      placeholder="Tell us about your project requirements..."
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary-red hover:bg-red-600"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      "Request Quote"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="bg-space-darker border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white font-space-mono">Get in Touch</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary-red/20 rounded-lg flex items-center justify-center">
                      <Mail className="h-4 w-4 text-primary-red" />
                    </div>
                    <div>
                      <h4 className="text-white font-space-mono">Email</h4>
                      <p className="text-gray-300 font-space-mono text-sm">business@klickode.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary-red/20 rounded-lg flex items-center justify-center">
                      <Phone className="h-4 w-4 text-primary-red" />
                    </div>
                    <div>
                      <h4 className="text-white font-space-mono">Phone</h4>
                      <p className="text-gray-300 font-space-mono text-sm">+66 (0) 2-xxx-xxxx</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-space-darker border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white font-space-mono">Our Process</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary-red rounded-full flex items-center justify-center text-white text-xs font-space-mono">1</div>
                      <div>
                        <h4 className="text-white font-space-mono text-sm">Consultation</h4>
                        <p className="text-gray-300 font-space-mono text-xs">Understand your needs and goals</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary-red rounded-full flex items-center justify-center text-white text-xs font-space-mono">2</div>
                      <div>
                        <h4 className="text-white font-space-mono text-sm">Planning</h4>
                        <p className="text-gray-300 font-space-mono text-xs">Create detailed project roadmap</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary-red rounded-full flex items-center justify-center text-white text-xs font-space-mono">3</div>
                      <div>
                        <h4 className="text-white font-space-mono text-sm">Development</h4>
                        <p className="text-gray-300 font-space-mono text-xs">Build and test your solution</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary-red rounded-full flex items-center justify-center text-white text-xs font-space-mono">4</div>
                      <div>
                        <h4 className="text-white font-space-mono text-sm">Launch</h4>
                        <p className="text-gray-300 font-space-mono text-xs">Deploy and provide ongoing support</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <div className="pb-12"></div>
      <Footer />
    </CheckeredBackground>
  );
}