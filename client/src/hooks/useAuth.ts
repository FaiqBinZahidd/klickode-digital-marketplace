import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface AuthUser {
  id: string
  email: string
  firstName?: string
  lastName?: string
  profileImageUrl?: string
  role?: string
}

export function useAuth() {
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session)
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          firstName: session.user.user_metadata?.first_name,
          lastName: session.user.user_metadata?.last_name,
          profileImageUrl: session.user.user_metadata?.avatar_url,
          role: 'buyer'
        })
      }
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setIsAuthenticated(!!session)
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            firstName: session.user.user_metadata?.first_name,
            lastName: session.user.user_metadata?.last_name,
            profileImageUrl: session.user.user_metadata?.avatar_url,
            role: 'buyer'
          })
        } else {
          setUser(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) throw error
    } catch (error) {
      console.error('Error signing in with email:', error)
      throw error
    }
  }

  const signUpWithEmail = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName
          }
        }
      })
      if (error) throw error
    } catch (error) {
      console.error('Error signing up with email:', error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }

  const updateProfile = async (updates: Partial<AuthUser>) => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          first_name: updates.firstName,
          last_name: updates.lastName
        }
      })
      if (error) throw error

      setUser(prev => prev ? { ...prev, ...updates } : null)
    } catch (error) {
      console.error('Error updating profile:', error)
      throw error
    }
  }

  return {
    user,
    loading,
    isAuthenticated,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    updateProfile
  }
}