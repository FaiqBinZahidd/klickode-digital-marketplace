import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { User, Settings, ShoppingBag, Star, TrendingUp, Package, Users, Shield } from 'lucide-react'

import Footer from '@/components/footer'
import CheckeredBackground from '@/components/checkered-background'

export default function Dashboard() {
  const { authUser, signOut, updateProfile } = useAuth()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: authUser?.firstName || '',
    lastName: authUser?.lastName || '',
    bio: authUser?.bio || ''
  })

  const handleSave = async () => {
    try {
      await updateProfile(formData)
      setIsEditing(false)
      toast({
        title: 'Profile updated',
        description: 'Your profile has been successfully updated.',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive',
      })
    }
  }

  const handleSignOut = async () => {
    await signOut()
    toast({
      title: 'Signed out',
      description: 'You have been successfully signed out.',
    })
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-4 w-4" />
      case 'seller':
        return <Package className="h-4 w-4" />
      case 'buyer':
        return <ShoppingBag className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-500'
      case 'seller':
        return 'bg-green-500'
      case 'buyer':
        return 'bg-blue-500'
      default:
        return 'bg-gray-500'
    }
  }

  if (!authUser) {
    return (
      <div className="min-h-screen bg-space-dark text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-red"></div>
      </div>
    )
  }

  return (
    <CheckeredBackground className="min-h-screen">
      <div className="relative z-10 py-8 px-8 sm:px-12 lg:px-16" style={{ marginTop: '60px' }}>
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-space-mono text-white mb-4">
              Welcome back, <span className="text-[#ff3434]">{authUser.firstName}</span>
            </h1>
            <p className="text-gray-400 font-space-mono">Your developer dashboard</p>
          </div>

          {/* Profile Section */}
          <div className="flex flex-col items-center mb-12">
            <Avatar className="w-24 h-24 mb-6 ring-4 ring-[#ff3434]/20">
              <AvatarImage src={authUser.profileImageUrl || ''} alt={authUser.firstName} />
              <AvatarFallback className="text-2xl bg-[#ff3434]/10 text-[#ff3434]">
                {authUser.firstName?.[0]}{authUser.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h2 className="text-xl font-space-mono text-white mb-2">
                {authUser.firstName} {authUser.lastName}
              </h2>
              <p className="text-gray-400 font-space-mono mb-4">{authUser.email}</p>
              <Badge className="bg-[#ff3434]/20 text-[#ff3434] border-[#ff3434]/30 hover:bg-[#ff3434]/30 transition-colors">
                {getRoleIcon(authUser.role)}
                <span className="ml-2 capitalize">{authUser.role}</span>
              </Badge>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-space-darker/95 border-gray-700/80 hover:border-[#ff3434]/50 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <ShoppingBag className="h-8 w-8 text-[#ff3434] mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">0</div>
                <p className="text-sm text-gray-400 font-space-mono">Purchases</p>
              </CardContent>
            </Card>
            
            <Card className="bg-space-darker/95 border-gray-700/80 hover:border-[#ff3434]/50 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Star className="h-8 w-8 text-[#ff3434] mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">0</div>
                <p className="text-sm text-gray-400 font-space-mono">Favorites</p>
              </CardContent>
            </Card>
            
            <Card className="bg-space-darker/95 border-gray-700/80 hover:border-[#ff3434]/50 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 text-[#ff3434] mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">0</div>
                <p className="text-sm text-gray-400 font-space-mono">Activity</p>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => setIsEditing(true)}
              className="bg-[#ff3434] hover:bg-[#cc1a1a] transition-colors font-space-mono"
            >
              <Settings className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
            <Button 
              onClick={handleSignOut}
              variant="outline" 
              className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-[#ff3434] transition-colors font-space-mono"
            >
              <User className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>

          {/* Profile Edit Modal */}
          {isEditing && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
              <Card className="bg-space-darker/95 border-gray-700 max-w-md w-full mx-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white font-space-mono">
                    <Settings className="h-5 w-5 text-[#ff3434]" />
                    Edit Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-gray-400 font-space-mono">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="bg-space-dark border-gray-700 text-white font-space-mono"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-gray-400 font-space-mono">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="bg-space-dark border-gray-700 text-white font-space-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="bio" className="text-gray-400 font-space-mono">Bio</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      placeholder="Tell us about yourself..."
                      className="bg-space-dark border-gray-700 text-white font-space-mono"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSave} className="bg-[#ff3434] hover:bg-[#cc1a1a] font-space-mono">
                      Save Changes
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsEditing(false)}
                      className="border-gray-700 text-gray-300 hover:bg-gray-800 font-space-mono"
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
      
      <div className="pb-12"></div>
      <Footer />
    </CheckeredBackground>
  )
}