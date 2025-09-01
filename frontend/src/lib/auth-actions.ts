import { SupabaseClient } from '@supabase/supabase-js'
import { toast } from 'sonner'

export const handleLogin = async (supabase: SupabaseClient) => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    })
    if (error) throw error
  } catch (error) {
    toast.error('Login failed. Please try again.')
    console.error('Authentication error:', error)
  }
}

export const handleRegister = async (supabase: SupabaseClient) => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
        queryParams: {
          prompt: 'consent',
        },
      },
    })
    if (error) throw error
  } catch (error) {
    toast.error('Registration failed. Please try again.')
    console.error('Authentication error:', error)
  }
}

export const handleLogout = async (supabase: SupabaseClient) => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    toast.success('You have been logged out.')
  } catch (error) {
    toast.error('Logout failed. Please try again.')
    console.error('Logout error:', error)
  }
}
