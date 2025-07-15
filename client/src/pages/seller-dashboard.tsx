import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import CheckeredBackground from "@/components/checkered-background";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, Package, TrendingUp, Eye, Plus, Edit, Trash2 } from "lucide-react";
import type { AssetWithDetails } from "@shared/schema";

export default function SellerDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview");

  const { data: assets, isLoading } = useQuery<AssetWithDetails[]>({
    queryKey: ['/api/seller/assets'],
  });

  const stats = {
    totalRevenue: 12580.50,
    totalSales: 247,
    totalAssets: 18,
    avgRating: 4.8
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-500/20 text-green-400";
      case "review":
        return "bg-yellow-500/20 text-yellow-400";
      case "draft":
        return "bg-gray-500/20 text-gray-400";
      case "rejected":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <CheckeredBackground className="min-h-screen">
      <NetlifyBackground />
      <Navigation />
      
      <div className="pt-32 pb-16 px-6 sm:px-8 lg:px-10" style={{ marginTop: '60px' }}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-space-mono text-white mb-2">Seller Dashboard</h1>
              <p className="text-gray-300 font-space-mono">Manage your digital assets and track performance</p>
            </div>
            <Button className="bg-primary-red hover:bg-red-600">
              <Plus className="h-4 w-4 mr-2" />
              Upload New Asset
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-space-darker border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-primary-red" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">${stats.totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-gray-400">+12.5% from last month</p>
              </CardContent>
            </Card>
            
            <Card className="bg-space-darker border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Total Sales</CardTitle>
                <TrendingUp className="h-4 w-4 text-primary-red" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.totalSales}</div>
                <p className="text-xs text-gray-400">+8.2% from last month</p>
              </CardContent>
            </Card>
            
            <Card className="bg-space-darker border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Total Assets</CardTitle>
                <Package className="h-4 w-4 text-primary-red" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.totalAssets}</div>
                <p className="text-xs text-gray-400">3 pending review</p>
              </CardContent>
            </Card>
            
            <Card className="bg-space-darker border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Average Rating</CardTitle>
                <Eye className="h-4 w-4 text-primary-red" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stats.avgRating}</div>
                <p className="text-xs text-gray-400">Based on 142 reviews</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid grid-cols-4 w-full bg-space-darker">
              <TabsTrigger value="overview" className="data-[state=active]:bg-primary-red data-[state=active]:text-white">
                Overview
              </TabsTrigger>
              <TabsTrigger value="assets" className="data-[state=active]:bg-primary-red data-[state=active]:text-white">
                My Assets
              </TabsTrigger>
              <TabsTrigger value="sales" className="data-[state=active]:bg-primary-red data-[state=active]:text-white">
                Sales
              </TabsTrigger>
              <TabsTrigger value="payouts" className="data-[state=active]:bg-primary-red data-[state=active]:text-white">
                Payouts
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-space-darker border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Recent Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">This Month</span>
                        <span className="text-white font-semibold">$2,450.00</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Last Month</span>
                        <span className="text-white font-semibold">$2,180.00</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Growth</span>
                        <Badge className="bg-green-500/20 text-green-400">+12.4%</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-space-darker border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Top Performing Assets</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {assets?.slice(0, 3).map((asset) => (
                        <div key={asset.id} className="flex justify-between items-center">
                          <div>
                            <p className="text-white font-medium">{asset.title}</p>
                            <p className="text-xs text-gray-400">{asset.sales} sales</p>
                          </div>
                          <span className="text-primary-red font-semibold">${asset.price}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="assets" className="mt-6">
              <div className="space-y-4">
                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => (
                      <Card key={i} className="bg-space-darker border-gray-700 animate-pulse">
                        <div className="aspect-video bg-gray-700 rounded-t-lg"></div>
                        <CardHeader>
                          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {assets?.map((asset) => (
                      <Card key={asset.id} className="bg-space-darker border-gray-700">
                        <div className="aspect-video bg-gray-700 rounded-t-lg overflow-hidden">
                          <img
                            src={asset.thumbnail || `https://placehold.co/400x225/2d3748/e53935?text=${encodeURIComponent(asset.title)}`}
                            alt={asset.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <CardTitle className="text-white text-lg">{asset.title}</CardTitle>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge className={getStatusColor(asset.status)}>
                                  {asset.status}
                                </Badge>
                                <span className="text-sm text-gray-400">{asset.sales} sales</span>
                              </div>
                            </div>
                            <span className="text-primary-red font-bold">${asset.price}</span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-center">
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="border-gray-600 hover:bg-gray-700">
                                <Edit className="h-3 w-3 mr-1" />
                                Edit
                              </Button>
                              <Button size="sm" variant="outline" className="border-gray-600 hover:bg-gray-700">
                                <Eye className="h-3 w-3 mr-1" />
                                View
                              </Button>
                            </div>
                            <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="sales" className="mt-6">
              <Card className="bg-space-darker border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Recent Sales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex justify-between items-center py-3 border-b border-gray-700 last:border-b-0">
                        <div>
                          <p className="text-white font-medium">React Dashboard Template</p>
                          <p className="text-sm text-gray-400">Sold 2 hours ago</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-semibold">$49.00</p>
                          <p className="text-sm text-gray-400">$39.20 (80%)</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="payouts" className="mt-6">
              <Card className="bg-space-darker border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Payout History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-space-dark rounded-lg">
                      <div>
                        <p className="text-white font-medium">Available Balance</p>
                        <p className="text-sm text-gray-400">Ready for payout</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary-red">$1,245.80</p>
                        <Button size="sm" className="mt-2 bg-primary-red hover:bg-red-600">
                          Request Payout
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex justify-between items-center py-3 border-b border-gray-700 last:border-b-0">
                          <div>
                            <p className="text-white font-medium">Payout #{1000 + i}</p>
                            <p className="text-sm text-gray-400">Processed on Dec {15 - i}, 2024</p>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-semibold">$850.00</p>
                            <Badge className="bg-green-500/20 text-green-400">Completed</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <div className="pb-12"></div>
      <Footer />
    </CheckeredBackground>
  );
}
