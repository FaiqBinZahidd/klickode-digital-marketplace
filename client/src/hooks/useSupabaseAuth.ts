import { useState, useEffect } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

export function useSupabaseAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    }

    getSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)

        // Sync user data with our database
        if (session?.user && event === 'SIGNED_IN') {
          await syncUserProfile(session.user)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const syncUserProfile = async (user: User) => {
    try {
      // Sync with our users table
      const response = await fetch('/api/users/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: user.id,
          email: user.email,
          firstName: user.user_metadata?.first_name,
          lastName: user.user_metadata?.last_name,
          profileImageUrl: user.user_metadata?.avatar_url,
        }),
      })

      if (!response.ok) {
        console.error('Failed to sync user profile')
      }
    } catch (error) {
      console.error('Error syncing user profile:', error)
    }
  }

  return {
    user,
    session,
    loading,
    isAuthenticated: !!user,
  }
}