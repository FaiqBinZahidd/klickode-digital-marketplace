import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Menu, X, Search, User, ShoppingCart, Globe, Code, Palette, Smartphone, Puzzle, Zap, Layout, FileText, Star, Grid3X3 } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import KlickodeLogo from './klickode-logo';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { signOut } from '@/lib/supabase';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const { user, loading } = useSupabaseAuth();
  const [location] = useLocation();
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const browseCategories = [
    { name: "UI Kits", href: "/browse?category=UI Kits", icon: Layout, description: "High-quality UI kits for your projects." },
    { name: "Templates", href: "/browse?category=Templates", icon: FileText, description: "Responsive templates for web and mobile." },
    { name: "Icons", href: "/browse?category=Icons", icon: Zap, description: "Pixel-perfect icon sets." },
    { name: "Mobile", href: "/browse?category=Mobile", icon: Smartphone, description: "Components and screens for mobile apps." },
    { name: "Web Apps", href: "/browse?category=Web Apps", icon: Globe, description: "Full-fledged web application boilerplates." },
    { name: "Reviews & Widgets", href: "/reviews", icon: Star, description: "Customer review widgets and testimonial systems." },
    { name: "All Templates", href: "/browse", icon: Grid3X3, description: "Browse all available digital templates." },
  ];

  const navigationItems = [
    { name: "Learn", href: "/learn" },
    { name: "Playground", href: "/playground" },
    { name: "Tools", href: "/ai-tools", badge: true },
    { name: "Forum", href: "/forum" },
  ];

  const isActive = (href: string) => location === href;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/browse?search=${encodeURIComponent(searchTerm)}`;
      setShowSearch(false);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Mock search results for demonstration
    if (value.length > 0) {
      const mockResults = [
        { id: 1, title: "React Admin Dashboard", category: "Templates", price: "฿2,499" },
        { id: 2, title: "E-commerce UI Components", category: "UI Kits", price: "฿1,899" },
        { id: 3, title: "Premium Icon Set", category: "Icons", price: "฿799" },
        { id: 4, title: "Mobile App Template", category: "Mobile", price: "฿3,299" },
      ].filter(item => item.title.toLowerCase().includes(value.toLowerCase()));
      setSearchResults(mockResults);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transform translate-y-2 sm:translate-y-6">
      <div className="max-w-7xl mx-auto px-2 sm:px-5 lg:px-7">
        <div className="flex items-center justify-between h-12 sm:h-16 bg-space-darker/98 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-2xl border border-gray-700/70 px-3 sm:px-6 mx-1 mt-2 transition-all duration-300 hover:shadow-3xl hover:border-primary-red/50">
          
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <KlickodeLogo size="sm" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Browse Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-300 hover:text-[#ff3434] hover:bg-[#ff3434]/10 transition-all duration-200 font-space-mono">
                <span>Browse</span>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-4 w-80 bg-space-darker/98 backdrop-blur-md rounded-xl shadow-2xl border border-gray-700/70 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="grid grid-cols-2 gap-1 p-3">
                  {/* Left Column - Asset Categories */}
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-2 pb-1 font-space-mono">Asset Categories</div>
                    {browseCategories.slice(0, 4).map((category) => (
                      <Link
                        key={category.name}
                        href={category.href}
                        className="flex items-center space-x-3 px-2 py-2 rounded-lg hover:bg-[#ff3434]/10 hover:text-[#ff3434] transition-all duration-200 group/item"
                      >
                        <category.icon className="w-4 h-4 text-gray-400 group-hover/item:text-[#ff3434]" />
                        <span className="text-sm font-space-mono">{category.name}</span>
                      </Link>
                    ))}
                  </div>
                  
                  {/* Right Column - Popular Sections */}
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-2 pb-1 font-space-mono">Popular Sections</div>
                    {browseCategories.slice(4).map((category) => (
                      <Link
                        key={category.name}
                        href={category.href}
                        className="flex items-center space-x-3 px-2 py-2 rounded-lg hover:bg-[#ff3434]/10 hover:text-[#ff3434] transition-all duration-200 group/item"
                      >
                        <category.icon className="w-4 h-4 text-gray-400 group-hover/item:text-[#ff3434]" />
                        <span className="text-sm font-space-mono">{category.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-3 py-2 rounded-lg font-space-mono transition-all duration-200 ${
                  isActive(item.href)
                    ? 'text-[#ff3434] bg-[#ff3434]/10'
                    : 'text-gray-300 hover:text-[#ff3434] hover:bg-[#ff3434]/10'
                }`}
              >
                {item.name}
                {item.badge && (
                  <Badge className="absolute -top-1 -right-1 bg-[#ff3434] text-white text-xs px-1 py-0 min-w-[16px] h-4 rounded-full">
                    AI
                  </Badge>
                )}
              </Link>
            ))}

            {/* Search */}
            <div className="relative" ref={searchRef}>
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-300 hover:text-[#ff3434] hover:bg-[#ff3434]/10 transition-all duration-200 font-space-mono"
              >
                <Search className="h-4 w-4" />
              </button>
              
              {/* Search Dropdown */}
              {showSearch && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-space-darker/98 backdrop-blur-md rounded-xl shadow-2xl border border-gray-700/70 z-50">
                  <form onSubmit={handleSearch} className="p-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search templates, icons, UI kits..."
                        value={searchTerm}
                        onChange={handleSearchInputChange}
                        className="w-full bg-space-darker/90 border border-gray-700/70 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff3434]/50 font-space-mono"
                        autoFocus
                      />
                    </div>
                  </form>
                  
                  {/* Search Results */}
                  {searchResults.length > 0 && (
                    <div className="border-t border-gray-700/50 max-h-64 overflow-y-auto">
                      {searchResults.map((result) => (
                        <Link
                          key={result.id}
                          href={`/browse?search=${encodeURIComponent(result.title)}`}
                          className="block px-4 py-3 hover:bg-[#ff3434]/10 transition-colors duration-200"
                          onClick={() => setShowSearch(false)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-white font-space-mono text-sm">{result.title}</div>
                              <div className="text-gray-400 font-space-mono text-xs">{result.category}</div>
                            </div>
                            <div className="text-[#ff3434] font-space-mono text-sm font-semibold">{result.price}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                  
                  {searchTerm && searchResults.length === 0 && (
                    <div className="border-t border-gray-700/50 p-4 text-center text-gray-400 font-space-mono text-sm">
                      No results found for "{searchTerm}"
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>



          {/* User Actions */}
          <div className="flex items-center space-x-2">
            {loading ? (
              <div className="animate-pulse bg-gray-700 rounded-full w-8 h-8"></div>
            ) : user ? (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-[#ff3434] hover:bg-[#ff3434]/10 font-space-mono">
                  <ShoppingCart className="w-4 h-4" />
                </Button>
                <div className="relative group">
                  <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-[#ff3434]/10 transition-all duration-200">
                    <div className="w-6 h-6 bg-[#ff3434] rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  </button>
                  <div className="absolute top-full right-0 mt-4 w-48 bg-space-darker/98 backdrop-blur-md rounded-xl shadow-2xl border border-gray-700/70 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="p-2">
                      <div className="px-3 py-2 border-b border-gray-700/50 mb-1">
                        <p className="text-sm font-medium text-white font-space-mono">{user.email}</p>
                      </div>
                      <Link href="/dashboard" className="block px-3 py-2 text-sm text-gray-300 hover:text-[#ff3434] hover:bg-[#ff3434]/10 rounded-lg transition-all duration-200 font-space-mono">
                        Dashboard
                      </Link>
                      <Link href="/profile" className="block px-3 py-2 text-sm text-gray-300 hover:text-[#ff3434] hover:bg-[#ff3434]/10 rounded-lg transition-all duration-200 font-space-mono">
                        Profile
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-[#ff3434] hover:bg-[#ff3434]/10 rounded-lg transition-all duration-200 font-space-mono"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="text-gray-300 hover:text-[#ff3434] hover:bg-[#ff3434]/10 font-space-mono">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-[#ff3434] hover:bg-[#ff3434]/80 text-white font-space-mono shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-gray-300 hover:text-[#ff3434] hover:bg-[#ff3434]/10 rounded-lg transition-all duration-200"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-2 bg-space-darker/98 backdrop-blur-md rounded-xl shadow-2xl border border-gray-700/70 p-4 mx-1">
            <div className="space-y-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-lg font-space-mono transition-all duration-200 ${
                    isActive(item.href)
                      ? 'text-[#ff3434] bg-[#ff3434]/10'
                      : 'text-gray-300 hover:text-[#ff3434] hover:bg-[#ff3434]/10'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-2 border-t border-gray-700/50">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-3 pb-2 font-space-mono">Browse</div>
                {browseCategories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:text-[#ff3434] hover:bg-[#ff3434]/10 transition-all duration-200 font-space-mono"
                    onClick={() => setIsOpen(false)}
                  >
                    <category.icon className="w-4 h-4" />
                    <span className="text-sm">{category.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}