import { useState } from 'react';
import { useRoute, Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  Heart, 
  Star, 
  Download, 
  ShoppingCart, 
  Eye, 
  ArrowLeft, 
  Code, 
  FileText, 
  Image, 
  Figma, 
  Folder,
  ExternalLink,
  CheckCircle,
  User,
  Calendar,
  Package,
  Shield,
  Zap
} from 'lucide-react';
import Navigation from '@/components/navigation';
import CheckeredBackground from '@/components/checkered-background';
import Footer from '@/components/footer';

interface Asset {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  price: number;
  category: string;
  imageUrl: string;
  rating: number;
  downloads: number;
  seller: string;
  sellerAvatar?: string;
  sellerRating?: number;
  tags: string[];
  features: string[];
  compatibility: string[];
  lastUpdated: string;
  version: string;
  files: AssetFile[];
  previewImages: string[];
  demoUrl?: string;
  documentation?: string;
  license: string;
  support: string;
}

interface AssetFile {
  id: number;
  name: string;
  type: 'code' | 'figma' | 'image' | 'document' | 'archive';
  size: string;
  format: string;
  description: string;
  icon: React.ReactNode;
}

// Enhanced asset data with full product details
const assetData: Asset[] = [
  {
    id: 1,
    title: 'React Admin Dashboard',
    description: 'Modern admin dashboard with React, TypeScript, and Tailwind CSS',
    fullDescription: 'A comprehensive admin dashboard built with React and TypeScript, featuring a modern design, responsive layout, and extensive customization options. Perfect for admin panels, analytics dashboards, and business applications. Includes 50+ components, authentication system, role-based access control, and detailed documentation.',
    price: 2499,
    category: 'Templates',
    imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop',
    rating: 4.9,
    downloads: 2847,
    seller: 'ThaiWebDev',
    sellerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    sellerRating: 4.8,
    tags: ['React', 'TypeScript', 'Dashboard', 'Admin'],
    features: [
      'Responsive design for all devices',
      'Dark/Light theme support',
      'TypeScript integration',
      'Chart.js integration',
      'User authentication system',
      'Role-based access control',
      'API integration ready',
      'Comprehensive documentation',
      '50+ reusable components',
      'Form validation',
      'Data tables with sorting',
      'Export functionality'
    ],
    compatibility: ['React 18+', 'Node.js 16+', 'Modern browsers'],
    lastUpdated: '2024-01-15',
    version: '2.1.0',
    files: [
      {
        id: 1,
        name: 'Source Code',
        type: 'code',
        size: '45.2 MB',
        format: 'ZIP',
        description: 'Complete React application with all components and configurations',
        icon: <Code className="w-5 h-5" />
      },
      {
        id: 2,
        name: 'Figma Design',
        type: 'figma',
        size: '12.8 MB',
        format: 'FIG',
        description: 'Complete UI design system with all components and screens',
        icon: <Figma className="w-5 h-5" />
      },
      {
        id: 3,
        name: 'Documentation',
        type: 'document',
        size: '2.1 MB',
        format: 'PDF',
        description: 'Installation guide, API reference, and usage examples',
        icon: <FileText className="w-5 h-5" />
      },
      {
        id: 4,
        name: 'Assets Pack',
        type: 'image',
        size: '8.5 MB',
        format: 'ZIP',
        description: 'Icons, images, and graphics used in the dashboard',
        icon: <Image className="w-5 h-5" />
      }
    ],
    previewImages: [
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop'
    ],
    demoUrl: 'https://demo.example.com/admin-dashboard',
    documentation: 'https://docs.example.com/admin-dashboard',
    license: 'Commercial License',
    support: 'Email & Community Support'
  },
  {
    id: 2,
    title: 'E-commerce UI Components',
    description: 'Complete set of e-commerce UI components for online stores',
    fullDescription: 'A complete UI kit for building modern e-commerce applications. Includes product pages, shopping cart, checkout flow, and admin components. Built with modern design principles and optimized for conversion.',
    price: 1899,
    category: 'UI Kits',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    rating: 4.8,
    downloads: 1923,
    seller: 'DesignStudio',
    sellerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b0a8c90c?w=100&h=100&fit=crop',
    sellerRating: 4.7,
    tags: ['E-commerce', 'UI Kit', 'Components', 'Shopping'],
    features: [
      'Product catalog components',
      'Shopping cart interface',
      'Checkout process flow',
      'Payment integration UI',
      'User account pages',
      'Admin dashboard components',
      'Mobile responsive design',
      'SEO optimized structure'
    ],
    compatibility: ['React 18+', 'Vue 3+', 'Angular 15+'],
    lastUpdated: '2024-01-10',
    version: '1.5.2',
    files: [
      {
        id: 1,
        name: 'React Components',
        type: 'code',
        size: '32.1 MB',
        format: 'ZIP',
        description: 'React components with TypeScript and Tailwind CSS',
        icon: <Code className="w-5 h-5" />
      },
      {
        id: 2,
        name: 'Vue Components',
        type: 'code',
        size: '28.9 MB',
        format: 'ZIP',
        description: 'Vue 3 components with Composition API',
        icon: <Code className="w-5 h-5" />
      },
      {
        id: 3,
        name: 'Design System',
        type: 'figma',
        size: '15.3 MB',
        format: 'FIG',
        description: 'Complete design system with tokens and components',
        icon: <Figma className="w-5 h-5" />
      }
    ],
    previewImages: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop'
    ],
    demoUrl: 'https://demo.example.com/ecommerce-ui',
    license: 'Commercial License',
    support: 'Priority Support'
  }
];

export default function AssetDetail() {
  const [, params] = useRoute('/asset/:id');
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [activePreview, setActivePreview] = useState(0);

  const assetId = parseInt(params?.id || '1');
  const asset = assetData.find(a => a.id === assetId) || assetData[0];

  const formatPrice = (price: number) => {
    return `฿${price.toLocaleString()}`;
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`}
      />
    ));
  };

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case 'code': return 'bg-green-500/20 text-green-400';
      case 'figma': return 'bg-purple-500/20 text-purple-400';
      case 'image': return 'bg-blue-500/20 text-blue-400';
      case 'document': return 'bg-orange-500/20 text-orange-400';
      case 'archive': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <CheckeredBackground className="min-h-screen">
      {/* Background Elements */}


      <div className="relative z-10">
        {/* Navigation */}
        <Navigation />

        {/* Main Content */}
        <div className="pt-20 pb-8 px-8 sm:px-12 lg:px-16">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <div className="mb-6">
              <Link href="/browse" className="inline-flex items-center text-gray-400 hover:text-primary-red transition-colors font-space-mono">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Browse
              </Link>
            </div>

            {/* Asset Header */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* Preview Section */}
              <div className="lg:col-span-2">
                <Card className="bg-space-darker border-gray-600 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={asset.previewImages[activePreview] || asset.imageUrl}
                        alt={asset.title}
                        className="w-full h-96 object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setIsLiked(!isLiked)}
                          className="bg-black/50 hover:bg-black/70 text-white"
                        >
                          <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Preview Thumbnails */}
                    {asset.previewImages.length > 1 && (
                      <div className="p-4 flex gap-2">
                        {asset.previewImages.map((img, index) => (
                          <button
                            key={index}
                            onClick={() => setActivePreview(index)}
                            className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                              activePreview === index ? 'border-primary-red' : 'border-gray-600'
                            }`}
                          >
                            <img src={img} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Purchase Section */}
              <div className="space-y-6">
                <Card className="bg-space-darker border-gray-600">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <Badge variant="secondary" className="bg-gray-700 text-white font-space-mono">
                        {asset.category}
                      </Badge>
                      <div className="flex items-center gap-1">
                        {renderStars(asset.rating)}
                        <span className="text-sm text-gray-400 ml-2 font-space-mono">
                          ({asset.rating})
                        </span>
                      </div>
                    </div>
                    <CardTitle className="text-2xl font-space-mono">{asset.title}</CardTitle>
                    <p className="text-gray-400 font-space-mono">{asset.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-3xl font-bold text-primary-red font-space-mono">
                      {formatPrice(asset.price)}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        <span className="font-space-mono">{asset.downloads.toLocaleString()} downloads</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span className="font-space-mono">Live Preview</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button className="w-full bg-primary-red hover:bg-red-600 text-white font-space-mono">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                      {asset.demoUrl && (
                        <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 font-space-mono">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </Button>
                      )}
                    </div>

                    <Separator className="bg-gray-600" />

                    {/* Seller Info */}
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={asset.sellerAvatar} alt={asset.seller} />
                        <AvatarFallback>{asset.seller.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium font-space-mono">{asset.seller}</p>
                        <div className="flex items-center gap-1">
                          {asset.sellerRating && renderStars(asset.sellerRating)}
                          <span className="text-sm text-gray-400 font-space-mono">
                            ({asset.sellerRating})
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Info */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Package className="w-4 h-4" />
                        <span className="font-space-mono">Version {asset.version}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span className="font-space-mono">Updated {asset.lastUpdated}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Shield className="w-4 h-4" />
                        <span className="font-space-mono">{asset.license}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Product Details Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-space-darker">
                <TabsTrigger value="overview" className="font-space-mono">Overview</TabsTrigger>
                <TabsTrigger value="files" className="font-space-mono">Files & Content</TabsTrigger>
                <TabsTrigger value="features" className="font-space-mono">Features</TabsTrigger>
                <TabsTrigger value="reviews" className="font-space-mono">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <Card className="bg-space-darker border-gray-600">
                      <CardHeader>
                        <CardTitle className="font-space-mono">Description</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300 leading-relaxed font-space-mono">
                          {asset.fullDescription}
                        </p>
                        
                        <div className="mt-6">
                          <h4 className="font-semibold mb-3 font-space-mono">Tags</h4>
                          <div className="flex flex-wrap gap-2">
                            {asset.tags.map(tag => (
                              <Badge key={tag} variant="outline" className="border-gray-600 text-gray-300 font-space-mono">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-6">
                    <Card className="bg-space-darker border-gray-600">
                      <CardHeader>
                        <CardTitle className="font-space-mono">Compatibility</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {asset.compatibility.map((item, index) => (
                            <li key={index} className="flex items-center gap-2 text-gray-300">
                              <CheckCircle className="w-4 h-4 text-green-400" />
                              <span className="font-space-mono">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="bg-space-darker border-gray-600">
                      <CardHeader>
                        <CardTitle className="font-space-mono">Support</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-primary-red" />
                            <span className="font-space-mono">{asset.support}</span>
                          </div>
                          {asset.documentation && (
                            <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 font-space-mono">
                              <FileText className="w-4 h-4 mr-2" />
                              Documentation
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="files" className="mt-6">
                <Card className="bg-space-darker border-gray-600">
                  <CardHeader>
                    <CardTitle className="font-space-mono">Included Files & Content</CardTitle>
                    <p className="text-gray-400 font-space-mono">
                      This package includes the following files and resources:
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {asset.files.map((file) => (
                        <div key={file.id} className="border border-gray-600 rounded-lg p-4 hover:border-primary-red/50 transition-colors">
                          <div className="flex items-start gap-4">
                            <div className={`p-2 rounded-lg ${getFileTypeColor(file.type)}`}>
                              {file.icon}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold font-space-mono">{file.name}</h4>
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                  <span className="font-space-mono">{file.format}</span>
                                  <span className="font-space-mono">{file.size}</span>
                                </div>
                              </div>
                              <p className="text-gray-400 text-sm font-space-mono">
                                {file.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="features" className="mt-6">
                <Card className="bg-space-darker border-gray-600">
                  <CardHeader>
                    <CardTitle className="font-space-mono">Key Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {asset.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <span className="text-gray-300 font-space-mono">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <Card className="bg-space-darker border-gray-600">
                  <CardHeader>
                    <CardTitle className="font-space-mono">Customer Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <p className="text-gray-400 font-space-mono">
                        Reviews feature coming soon. Be the first to purchase and review this asset!
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <div className="pb-12"></div>
      <Footer />
    </CheckeredBackground>
  );
}