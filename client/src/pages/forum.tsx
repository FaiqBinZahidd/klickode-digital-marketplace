import { useState } from "react";
import { Link } from "wouter";
import { MessageSquare, Users, Plus, Search, Filter, Clock, ThumbsUp, MessageCircle, Pin, Star, Eye, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import CheckeredBackground from "@/components/checkered-background";


// Mock data for forum posts
const mockPosts = [
  {
    id: 1,
    title: "How to optimize React components for better performance?",
    content: "I'm working on a large React application and noticed some performance issues...",
    author: {
      name: "John Developer",
      avatar: "/api/placeholder/40/40",
      reputation: 1250,
      badges: ["Expert", "Contributor"]
    },
    category: "React",
    tags: ["react", "performance", "optimization"],
    upvotes: 23,
    replies: 8,
    views: 156,
    createdAt: "2024-01-15T10:30:00Z",
    isSticky: false,
    isSolved: true
  },
  {
    id: 2,
    title: "Best practices for TypeScript in large codebases",
    content: "What are the recommended patterns and practices when working with TypeScript...",
    author: {
      name: "Sarah TypeScript",
      avatar: "/api/placeholder/40/40",
      reputation: 890,
      badges: ["TypeScript Expert"]
    },
    category: "TypeScript",
    tags: ["typescript", "best-practices", "architecture"],
    upvotes: 45,
    replies: 15,
    views: 234,
    createdAt: "2024-01-14T14:20:00Z",
    isSticky: true,
    isSolved: false
  },
  {
    id: 3,
    title: "Database design patterns for modern web applications",
    content: "I'm designing a new database schema and looking for advice on modern patterns...",
    author: {
      name: "Mike Database",
      avatar: "/api/placeholder/40/40",
      reputation: 2100,
      badges: ["Database Expert", "Mentor"]
    },
    category: "Database",
    tags: ["database", "design", "patterns", "postgresql"],
    upvotes: 67,
    replies: 22,
    views: 445,
    createdAt: "2024-01-13T09:15:00Z",
    isSticky: false,
    isSolved: true
  },
  {
    id: 4,
    title: "CSS Grid vs Flexbox: When to use which?",
    content: "I always get confused about when to use CSS Grid vs Flexbox...",
    author: {
      name: "Emma CSS",
      avatar: "/api/placeholder/40/40",
      reputation: 650,
      badges: ["CSS Ninja"]
    },
    category: "CSS",
    tags: ["css", "grid", "flexbox", "layout"],
    upvotes: 34,
    replies: 12,
    views: 178,
    createdAt: "2024-01-12T16:45:00Z",
    isSticky: false,
    isSolved: false
  }
];

const categories = [
  { id: "all", name: "All Categories", count: 234 },
  { id: "react", name: "React", count: 45 },
  { id: "typescript", name: "TypeScript", count: 32 },
  { id: "database", name: "Database", count: 28 },
  { id: "css", name: "CSS", count: 41 },
  { id: "javascript", name: "JavaScript", count: 88 }
];

export default function Forum() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  const filteredPosts = mockPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || 
                           post.category.toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    // Always show sticky posts first
    if (a.isSticky && !b.isSticky) return -1;
    if (!a.isSticky && b.isSticky) return 1;
    
    switch (sortBy) {
      case "upvotes":
        return b.upvotes - a.upvotes;
      case "replies":
        return b.replies - a.replies;
      case "views":
        return b.views - a.views;
      default: // recent
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return (
    <CheckeredBackground className="min-h-screen">

      <Navigation />
      
      <div className="pt-32 px-6 sm:px-8 lg:px-10" style={{ marginTop: '60px' }}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-left mb-12">
            <h1 className="text-2xl md:text-3xl font-space-mono text-white mb-4">
              Developer <span className="text-primary-red">Forum</span>
            </h1>
            <p className="text-base text-gray-300 max-w-3xl font-space-mono">
              Connect with fellow developers, share knowledge, and get help with your coding challenges
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Search and Controls */}
              <div className="bg-space-darker border border-gray-700 rounded-xl p-6 mb-8">
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search discussions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-space-dark border-gray-600 text-white font-space-mono"
                      />
                    </div>
                  </div>
                  <Button className="bg-primary-red hover:bg-red-600">
                    <Plus className="h-4 w-4 mr-2" />
                    New Post
                  </Button>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full sm:w-48 bg-space-dark border-gray-600">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name} ({category.count})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-32 bg-space-dark border-gray-600">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Recent</SelectItem>
                      <SelectItem value="upvotes">Most Upvoted</SelectItem>
                      <SelectItem value="replies">Most Replies</SelectItem>
                      <SelectItem value="views">Most Views</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Posts List */}
              <div className="space-y-4">
                {sortedPosts.map((post) => (
                  <Card key={post.id} className="bg-space-darker border-gray-700 hover:border-primary-red/50 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12 flex-shrink-0">
                          <AvatarImage src={post.author.avatar} />
                          <AvatarFallback className="bg-gray-700 text-white">
                            {post.author.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            {post.isSticky && (
                              <Pin className="h-4 w-4 text-primary-red" />
                            )}
                            <h3 className="text-lg font-space-mono text-white hover:text-primary-red transition-colors cursor-pointer">
                              {post.title}
                            </h3>
                            {post.isSolved && (
                              <Badge className="bg-green-600 text-white">
                                Solved
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-gray-300 font-space-mono text-sm mb-3 line-clamp-2">
                            {post.content}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            {post.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs bg-gray-700 text-gray-300">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                              <span className="font-space-mono">
                                by {post.author.name}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {new Date(post.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                              <span className="flex items-center gap-1">
                                <ThumbsUp className="h-3 w-3" />
                                {post.upvotes}
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageCircle className="h-3 w-3" />
                                {post.replies}
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                {post.views}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {sortedPosts.length === 0 && (
                <div className="text-center py-12">
                  <MessageSquare className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-space-mono text-gray-300 mb-2">No posts found</h3>
                  <p className="text-gray-400 font-space-mono">Try adjusting your search or create a new post</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Stats */}
              <Card className="bg-space-darker border-gray-700 mb-6">
                <CardHeader>
                  <CardTitle className="text-white font-space-mono">Forum Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 font-space-mono">Total Posts</span>
                    <span className="text-white font-space-mono">1,234</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 font-space-mono">Total Members</span>
                    <span className="text-white font-space-mono">456</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 font-space-mono">Online Now</span>
                    <span className="text-primary-red font-space-mono">23</span>
                  </div>
                </CardContent>
              </Card>

              {/* Categories */}
              <Card className="bg-space-darker border-gray-700 mb-6">
                <CardHeader>
                  <CardTitle className="text-white font-space-mono">Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {categories.slice(1).map((category) => (
                    <div key={category.id} className="flex items-center justify-between p-2 hover:bg-gray-700 rounded cursor-pointer">
                      <span className="text-gray-300 font-space-mono">{category.name}</span>
                      <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                        {category.count}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Top Contributors */}
              <Card className="bg-space-darker border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white font-space-mono">Top Contributors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Alex Code", reputation: 2500, posts: 45 },
                    { name: "Sarah Dev", reputation: 1890, posts: 32 },
                    { name: "Mike Tech", reputation: 1650, posts: 28 }
                  ].map((contributor, index) => (
                    <div key={contributor.name} className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-6 h-6 bg-primary-red rounded-full text-white text-xs font-space-mono">
                        {index + 1}
                      </div>
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-gray-700 text-white text-xs">
                          {contributor.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-space-mono text-sm truncate">{contributor.name}</p>
                        <p className="text-gray-400 text-xs font-space-mono">{contributor.reputation} rep</p>
                      </div>
                    </div>
                  ))}
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