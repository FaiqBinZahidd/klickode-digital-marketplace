import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, Search, Star, Download, Grid3X3, List, ShoppingCart, Eye } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import Navigation from '@/components/navigation';
import CheckeredBackground from '@/components/checkered-background';
import Footer from '@/components/footer';

// Static data - no API calls or external dependencies
const digitalAssets = [
  {
    id: 1,
    title: 'React Admin Dashboard',
    description: 'Modern admin dashboard with React, TypeScript, and Tailwind CSS',
    price: 2499,
    category: 'Templates',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop',
    rating: 4.9,
    downloads: 2847,
    seller: 'ThaiWebDev',
    tags: ['React', 'TypeScript', 'Dashboard', 'Admin']
  },
  {
    id: 2,
    title: 'E-commerce UI Components',
    description: 'Complete set of e-commerce UI components for online stores',
    price: 1899,
    category: 'UI Kits',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
    rating: 4.8,
    downloads: 1923,
    seller: 'DesignStudio',
    tags: ['E-commerce', 'UI Kit', 'Components', 'Shopping']
  },
  {
    id: 3,
    title: 'Premium Icon Set',
    description: '500+ vector icons for web and mobile applications',
    price: 799,
    category: 'Icons',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop',
    rating: 4.7,
    downloads: 5641,
    seller: 'IconCraft',
    tags: ['Icons', 'Vector', 'UI', 'Design']
  },
  {
    id: 4,
    title: 'Mobile App Template',
    description: 'React Native template for food delivery apps',
    price: 3299,
    category: 'Mobile',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
    rating: 4.6,
    downloads: 876,
    seller: 'MobileFirst',
    tags: ['React Native', 'Mobile', 'App', 'Template']
  },
  {
    id: 5,
    title: 'Landing Page Kit',
    description: 'Professional landing page templates for businesses',
    price: 1599,
    category: 'Web Apps',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    rating: 4.8,
    downloads: 3214,
    seller: 'WebCrafters',
    tags: ['Landing Page', 'Business', 'Marketing', 'Web']
  },
  {
    id: 6,
    title: 'SaaS Dashboard Template',
    description: 'Complete SaaS application dashboard with authentication',
    price: 4999,
    category: 'Templates',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop',
    rating: 4.9,
    downloads: 1847,
    seller: 'SaaSDev',
    tags: ['SaaS', 'Dashboard', 'Authentication', 'Template']
  },
  {
    id: 7,
    title: 'Social Media Icons',
    description: 'Modern social media icon collection',
    price: 499,
    category: 'Icons',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
    rating: 4.5,
    downloads: 7892,
    seller: 'SocialIcons',
    tags: ['Social Media', 'Icons', 'Modern', 'Collection']
  },
  {
    id: 8,
    title: 'Restaurant Website',
    description: 'Complete restaurant website with online ordering',
    price: 2799,
    category: 'Web Apps',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop',
    rating: 4.7,
    downloads: 1456,
    seller: 'RestaurantWeb',
    tags: ['Restaurant', 'Website', 'Online Ordering', 'Food']
  },
  {
    id: 9,
    title: 'Fitness App UI',
    description: 'Mobile fitness app UI kit with workout screens',
    price: 1999,
    category: 'UI Kits',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    rating: 4.6,
    downloads: 2341,
    seller: 'FitnessUI',
    tags: ['Fitness', 'Mobile', 'UI Kit', 'Health']
  },
  {
    id: 10,
    title: 'Crypto Dashboard',
    description: 'Cryptocurrency trading dashboard with charts',
    price: 3799,
    category: 'Templates',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop',
    rating: 4.8,
    downloads: 987,
    seller: 'CryptoDesign',
    tags: ['Crypto', 'Trading', 'Dashboard', 'Charts']
  },
  {
    id: 11,
    title: 'Education Platform',
    description: 'Complete e-learning platform with courses and quizzes',
    price: 5499,
    category: 'Web Apps',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
    rating: 4.9,
    downloads: 743,
    seller: 'EduTech',
    tags: ['Education', 'E-learning', 'Platform', 'Courses']
  },
  {
    id: 12,
    title: 'Chat App Template',
    description: 'Real-time chat application template',
    price: 2299,
    category: 'Mobile',
    image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=400&h=300&fit=crop',
    rating: 4.7,
    downloads: 1567,
    seller: 'ChatDev',
    tags: ['Chat', 'Real-time', 'Mobile', 'Messaging']
  }
];

const categories = [
  { name: 'UI Kits', count: 2 },
  { name: 'Templates', count: 4 },
  { name: 'Icons', count: 2 },
  { name: 'Mobile', count: 2 },
  { name: 'Web Apps', count: 3 },
  { name: 'All Templates', count: 12 }
];

export default function Browse() {
  const [location] = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Templates');
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set());

  // Handle URL parameters for category filtering and search
  useEffect(() => {
    const searchParams = new URLSearchParams(location.split('?')[1] || '');
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');
    
    if (categoryParam && categories.some(cat => cat.name === categoryParam)) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory('All Templates');
    }
    
    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, [location]);

  // Filter assets based on search and category
  const filteredAssets = digitalAssets.filter(asset => {
    const matchesSearch = searchTerm === '' || 
      asset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All Templates' || asset.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Sort filtered assets
  const sortedAssets = [...filteredAssets].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'downloads':
        return b.downloads - a.downloads;
      case 'newest':
        return b.id - a.id;
      default:
        return b.downloads - a.downloads;
    }
  });

  const toggleLike = (assetId: number) => {
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(assetId)) {
        newSet.delete(assetId);
      } else {
        newSet.add(assetId);
      }
      return newSet;
    });
  };

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

  return (
    <CheckeredBackground className="min-h-screen">


      <div className="relative z-10">
        {/* Navigation */}
        <Navigation />
        
        {/* Header */}
        <div className="pt-32 pb-16 px-6 sm:px-8 lg:px-10" style={{ marginTop: '60px' }}>
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-space-mono mb-4 text-white">
              Browse Digital Assets
            </h1>
            <p className="text-base text-gray-300 max-w-3xl font-space-mono">
              Discover premium digital assets for your projects
            </p>

            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search assets, tags, or sellers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-space-darker/90 border-gray-700/50 text-white placeholder-gray-400 font-space-mono"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full lg:w-48 bg-space-darker/90 border-gray-700/50 text-white font-space-mono">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-space-darker border-gray-700/50">
                  {categories.map(category => (
                    <SelectItem key={category.name} value={category.name}>
                      {category.name} ({category.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-48 bg-space-darker/90 border-gray-700/50 text-white font-space-mono">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-space-darker border-gray-600">
                  <SelectItem value="popularity">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="bg-space-darker border-gray-600 hover:bg-gray-700"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="bg-space-darker border-gray-600 hover:bg-gray-700"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-400 font-space-mono">
                {sortedAssets.length} assets found
                {selectedCategory !== 'All Templates' && (
                  <span className="ml-2 text-primary-red">
                    in {selectedCategory}
                  </span>
                )}
              </p>
            </div>

            {/* Assets Display */}
            {sortedAssets.length > 0 ? (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
                {sortedAssets.map(asset => (
                  <Card key={asset.id} className="bg-space-darker border-gray-600 hover:border-primary-red/50 transition-all duration-300 group">
                    <CardHeader className="p-0">
                      <div className="relative">
                        <img
                          src={asset.image}
                          alt={asset.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="absolute top-2 right-2 flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => toggleLike(asset.id)}
                            className="bg-black/50 hover:bg-black/70 text-white"
                          >
                            <Heart className={`w-4 h-4 ${likedItems.has(asset.id) ? 'fill-red-500 text-red-500' : ''}`} />
                          </Button>
                        </div>
                        <div className="absolute bottom-2 left-2">
                          <Badge variant="secondary" className="bg-gray-800/80 text-white font-space-mono">
                            {asset.category}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg text-white font-space-mono group-hover:text-primary-red transition-colors line-clamp-2">
                            {asset.title}
                          </CardTitle>
                        </div>
                        
                        <p className="text-gray-400 text-sm font-space-mono line-clamp-2">
                          {asset.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            {renderStars(asset.rating)}
                            <span className="text-sm text-gray-400 font-space-mono">
                              ({asset.rating})
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-400">
                            <Download className="w-4 h-4" />
                            <span className="text-sm font-space-mono">
                              {asset.downloads.toLocaleString()}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-400 font-space-mono">
                            by {asset.seller}
                          </p>
                          <span className="text-primary-red font-bold text-lg font-space-mono">
                            {formatPrice(asset.price)}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {asset.tags.slice(0, 3).map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs border-gray-600 text-gray-400 font-space-mono">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex gap-2 pt-2">
                          <Link href={`/asset/${asset.id}`} className="flex-1">
                            <Button className="w-full bg-primary-red hover:bg-red-600 text-white font-space-mono">
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              Buy Now
                            </Button>
                          </Link>
                          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold mb-2 text-white font-space-mono">No assets found</h3>
                <p className="text-gray-400 font-space-mono">
                  Try adjusting your search terms or filters
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="pb-12"></div>
      <Footer />
    </CheckeredBackground>
  );
}