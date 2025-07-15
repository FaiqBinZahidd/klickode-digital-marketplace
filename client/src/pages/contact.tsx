import { useState } from "react";
import { Mail, Phone, MapPin, MessageSquare, Send, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";


export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
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
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
    
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-space-dark text-white relative overflow-x-hidden">

      <Navigation />
      
      <div className="pt-20 pb-8 px-8 sm:px-12 lg:px-16" style={{ marginTop: '60px' }}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-left mb-12">
            <h1 className="text-2xl md:text-3xl font-space-mono text-white mb-4">
              Contact <span className="text-primary-red">Us</span>
            </h1>
            <p className="text-base text-gray-300 max-w-3xl font-space-mono">
              Get in touch with our team. We're here to help with any questions about our platform, services, or partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="bg-space-darker border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white font-space-mono">Send us a message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2 font-space-mono">
                          Name
                        </label>
                        <Input
                          id="name"
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
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2 font-space-mono">
                          Email
                        </label>
                        <Input
                          id="email"
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
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2 font-space-mono">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="bg-space-dark border-gray-600 text-white font-space-mono"
                        placeholder="What's this about?"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2 font-space-mono">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="bg-space-dark border-gray-600 text-white font-space-mono min-h-[120px]"
                        placeholder="Tell us more about your inquiry..."
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
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="bg-space-darker border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white font-space-mono">Get in Touch</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary-red/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="h-4 w-4 text-primary-red" />
                    </div>
                    <div>
                      <h4 className="text-white font-space-mono mb-1">Email</h4>
                      <p className="text-gray-300 font-space-mono text-sm">hello@klickode.com</p>
                      <p className="text-gray-300 font-space-mono text-sm">support@klickode.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary-red/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="h-4 w-4 text-primary-red" />
                    </div>
                    <div>
                      <h4 className="text-white font-space-mono mb-1">Live Chat</h4>
                      <p className="text-gray-300 font-space-mono text-sm">Available 24/7 for instant support</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary-red/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-4 w-4 text-primary-red" />
                    </div>
                    <div>
                      <h4 className="text-white font-space-mono mb-1">Location</h4>
                      <p className="text-gray-300 font-space-mono text-sm">Global Remote Team</p>
                      <p className="text-gray-300 font-space-mono text-sm">Serving developers worldwide</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-space-darker border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white font-space-mono">Support Hours</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary-red" />
                    <span className="text-gray-300 font-space-mono text-sm">24/7 Community Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary-red" />
                    <span className="text-gray-300 font-space-mono text-sm">Mon-Fri: 9AM-6PM EST</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary-red" />
                    <span className="text-gray-300 font-space-mono text-sm">Weekend: Limited Support</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-space-darker border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white font-space-mono">Quick Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-2">
                    <a href="/faq" className="block text-gray-300 hover:text-primary-red font-space-mono text-sm transition-colors">
                      Frequently Asked Questions
                    </a>
                    <a href="/documentation" className="block text-gray-300 hover:text-primary-red font-space-mono text-sm transition-colors">
                      Documentation
                    </a>
                    <a href="/forum" className="block text-gray-300 hover:text-primary-red font-space-mono text-sm transition-colors">
                      Community Forum
                    </a>
                    <a href="/status" className="block text-gray-300 hover:text-primary-red font-space-mono text-sm transition-colors">
                      System Status
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <div className="pb-12"></div>
      <Footer />
    </div>
  );
}