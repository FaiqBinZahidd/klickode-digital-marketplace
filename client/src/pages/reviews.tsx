import { useState } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import CheckeredBackground from "@/components/checkered-background";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Quote, ThumbsUp, MessageSquare, ExternalLink, Code, Grid3X3, List, Sliders, Eye, Download } from "lucide-react";

interface Review {
  id: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
  platform: string;
  verified: boolean;
}

const mockReviews: Review[] = [
  {
    id: 1,
    author: "Sarah Johnson",
    rating: 5,
    comment: "Outstanding templates! The quality is exceptional and the designs are modern and professional. Highly recommended for any developer.",
    date: "2 days ago",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face",
    platform: "Google",
    verified: true
  },
  {
    id: 2,
    author: "Mike Chen",
    rating: 5,
    comment: "Perfect for our startup! The templates saved us months of development time. Clean code and excellent documentation.",
    date: "1 week ago",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    platform: "Google",
    verified: true
  },
  {
    id: 3,
    author: "Emma Rodriguez",
    rating: 4,
    comment: "Great collection of UI components. The customer support is responsive and helpful. Minor issues with some mobile responsiveness.",
    date: "3 days ago",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    platform: "Facebook",
    verified: false
  },
  {
    id: 4,
    author: "David Kumar",
    rating: 5,
    comment: "Incredible value for money! The AI tools are a game-changer for productivity. The playground feature is particularly useful.",
    date: "5 days ago",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    platform: "Google",
    verified: true
  },
  {
    id: 5,
    author: "Lisa Thompson",
    rating: 4,
    comment: "Solid platform with good variety of templates. The learning resources are helpful for beginners. Could use more advanced examples.",
    date: "1 week ago",
    avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=40&h=40&fit=crop&crop=face",
    platform: "Trustpilot",
    verified: true
  },
  {
    id: 6,
    author: "James Wilson",
    rating: 5,
    comment: "Best marketplace for developers! The code quality is top-notch and the community is very supportive. Love the AI integration.",
    date: "2 weeks ago",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
    platform: "Google",
    verified: true
  }
];

export default function Reviews() {
  const [selectedLayout, setSelectedLayout] = useState("grid");
  const [selectedRating, setSelectedRating] = useState("all");
  const [selectedPlatform, setSelectedPlatform] = useState("all");

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-400"}`} 
      />
    ));
  };

  const filteredReviews = mockReviews.filter(review => {
    const ratingFilter = selectedRating === "all" || review.rating >= parseInt(selectedRating);
    const platformFilter = selectedPlatform === "all" || review.platform.toLowerCase() === selectedPlatform.toLowerCase();
    return ratingFilter && platformFilter;
  });

  const averageRating = mockReviews.reduce((sum, review) => sum + review.rating, 0) / mockReviews.length;

  const ReviewCard = ({ review }: { review: Review }) => (
    <Card className="netlify-card bg-space-darker/50 border-gray-700/50 hover:border-primary-red/30 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <img 
            src={review.avatar} 
            alt={review.author}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold text-white">{review.author}</h4>
                {review.verified && (
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    Verified
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <span>{review.platform}</span>
                <span>•</span>
                <span>{review.date}</span>
              </div>
            </div>
            <div className="flex items-center space-x-1 mb-3">
              {renderStars(review.rating)}
              <span className="text-sm text-gray-400 ml-2">({review.rating}/5)</span>
            </div>
            <p className="text-gray-300 leading-relaxed">{review.comment}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <CheckeredBackground className="min-h-screen">
      <Navigation />
      
      <div className="pt-32 pb-16 px-6 sm:px-8 lg:px-10" style={{ marginTop: '60px' }}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-space-mono mb-6">
              Reviews & <span className="text-primary-red">Widgets</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 font-space-mono">
              Powerful review widgets and testimonial systems to showcase customer feedback and boost your website's credibility.
            </p>
            
            {/* Rating Summary */}
            <div className="flex items-center justify-center space-x-8 mb-12">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-2">
                  {renderStars(Math.round(averageRating))}
                </div>
                <div className="text-3xl font-bold text-white">{averageRating.toFixed(1)}</div>
                <div className="text-sm text-gray-400">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-red">{mockReviews.length}</div>
                <div className="text-sm text-gray-400">Total Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">98%</div>
                <div className="text-sm text-gray-400">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Widget Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="netlify-card bg-space-darker/50 border-gray-700/50 hover:border-primary-red/30 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-red/10 rounded-lg flex items-center justify-center">
                    <Code className="h-6 w-6 text-primary-red" />
                  </div>
                  <div>
                    <CardTitle className="text-white">Easy Integration</CardTitle>
                    <p className="text-sm text-gray-400">No-code widget embedding</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Simply copy and paste our widget code into your website. No technical knowledge required.
                </p>
              </CardContent>
            </Card>

            <Card className="netlify-card bg-space-darker/50 border-gray-700/50 hover:border-primary-red/30 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-red/10 rounded-lg flex items-center justify-center">
                    <Sliders className="h-6 w-6 text-primary-red" />
                  </div>
                  <div>
                    <CardTitle className="text-white">Customizable Design</CardTitle>
                    <p className="text-sm text-gray-400">Match your brand perfectly</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Fully customizable layouts, colors, and styling to match your website's design.
                </p>
              </CardContent>
            </Card>

            <Card className="netlify-card bg-space-darker/50 border-gray-700/50 hover:border-primary-red/30 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-red/10 rounded-lg flex items-center justify-center">
                    <Star className="h-6 w-6 text-primary-red" />
                  </div>
                  <div>
                    <CardTitle className="text-white">Multi-Platform</CardTitle>
                    <p className="text-sm text-gray-400">Google, Facebook, and more</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Display reviews from Google, Facebook, Trustpilot, and other major platforms.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Review Widget Demo */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Interactive Review Widget <span className="text-primary-red">Demo</span>
            </h2>
            
            {/* Controls */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              <div className="flex items-center space-x-2">
                <label className="text-sm text-gray-400">Layout:</label>
                <Select value={selectedLayout} onValueChange={setSelectedLayout}>
                  <SelectTrigger className="w-32 bg-space-darker border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grid">
                      <div className="flex items-center space-x-2">
                        <Grid3X3 className="h-4 w-4" />
                        <span>Grid</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="list">
                      <div className="flex items-center space-x-2">
                        <List className="h-4 w-4" />
                        <span>List</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <label className="text-sm text-gray-400">Min Rating:</label>
                <Select value={selectedRating} onValueChange={setSelectedRating}>
                  <SelectTrigger className="w-24 bg-space-darker border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="5">5★</SelectItem>
                    <SelectItem value="4">4★+</SelectItem>
                    <SelectItem value="3">3★+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <label className="text-sm text-gray-400">Platform:</label>
                <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                  <SelectTrigger className="w-32 bg-space-darker border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="google">Google</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="trustpilot">Trustpilot</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Reviews Display */}
            <div className={`${selectedLayout === "grid" ? "grid md:grid-cols-2 gap-6" : "space-y-4"}`}>
              {filteredReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>

          {/* Widget Templates */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Widget <span className="text-primary-red">Templates</span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: "Google Reviews Widget", price: "Free", features: ["5-star ratings", "Customer photos", "Response system", "Mobile responsive"] },
                { name: "Testimonial Slider", price: "$29", features: ["Auto-scroll", "Custom styling", "Video testimonials", "CTA buttons"] },
                { name: "Review Carousel", price: "$49", features: ["Multiple layouts", "Social integration", "Analytics", "A/B testing"] },
                { name: "Floating Badge", price: "$19", features: ["Corner positioning", "Hover effects", "Click to expand", "Minimal design"] },
                { name: "All-in-One Reviews", price: "$99", features: ["Multi-platform", "Advanced filters", "Custom branding", "API access"] },
                { name: "Star Rating System", price: "$39", features: ["Interactive stars", "Aggregate ratings", "Review forms", "Export data"] }
              ].map((template, index) => (
                <Card key={index} className="netlify-card bg-space-darker/50 border-gray-700/50 hover:border-primary-red/30 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-white">{template.name}</CardTitle>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary-red">{template.price}</span>
                      <Badge className="bg-primary-red/20 text-primary-red border-primary-red/30">
                        Popular
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {template.features.map((feature, i) => (
                        <li key={i} className="flex items-center space-x-2 text-sm text-gray-300">
                          <ThumbsUp className="h-4 w-4 text-green-400" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="space-y-2">
                      <Button className="w-full bg-primary-red hover:bg-primary-red/90">
                        <Download className="h-4 w-4 mr-2" />
                        Download Template
                      </Button>
                      <Button variant="outline" className="w-full border-gray-600 hover:border-primary-red">
                        <Eye className="h-4 w-4 mr-2" />
                        Live Preview
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Card className="netlify-card bg-gradient-to-r from-primary-red/10 to-purple-600/10 border-primary-red/30">
              <CardContent className="p-12">
                <Quote className="h-16 w-16 text-primary-red mx-auto mb-6" />
                <h3 className="text-3xl font-bold mb-4">Ready to Boost Your Credibility?</h3>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Join thousands of businesses using our review widgets to increase conversions and build trust with their customers.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button size="lg" className="bg-primary-red hover:bg-primary-red/90">
                    <ExternalLink className="h-5 w-5 mr-2" />
                    Get Started Free
                  </Button>
                  <Button size="lg" variant="outline" className="border-gray-600 hover:border-primary-red">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Contact Sales
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <div className="pb-12"></div>
      <Footer />
    </CheckeredBackground>
  );
}