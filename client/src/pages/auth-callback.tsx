import { useEffect } from 'react'
import { useLocation } from 'wouter'
import { supabase } from '@/lib/supabase'
import { Loader2 } from 'lucide-react'
import KlickodeLogo from '@/components/klickode-logo'

export default function AuthCallback() {
  const [, navigate] = useLocation()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Auth callback error:', error)
          navigate('/login?error=auth_callback_failed')
          return
        }

        if (data.session) {
          // Successfully authenticated
          navigate('/')
        } else {
          // No session found
          navigate('/login')
        }
      } catch (error) {
        console.error('Auth callback error:', error)
        navigate('/login?error=auth_callback_failed')
      }
    }

    handleAuthCallback()
  }, [navigate])

  return (
    <div className="min-h-screen bg-space-dark flex items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center mb-8">
          <KlickodeLogo size={64} />
        </div>
        <div className="flex items-center justify-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin text-red-500" />
          <span className="text-white text-lg">Completing authentication...</span>
        </div>
      </div>
    </div>
  )
}