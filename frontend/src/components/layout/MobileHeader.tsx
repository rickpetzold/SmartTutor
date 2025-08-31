'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/components/providers/auth-provider'
import { Globe } from 'lucide-react'

export default function MobileHeader() {
  const { session, supabase } = useAuth()

  const handleLogin = async () => {
    try {
      await supabase.auth.signInWithOAuth({ provider: 'google' })
    } catch (e) {
      console.error('Authentication error:', e)
    }
  }

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
    } catch (e) {
      console.error('Logout error:', e)
    }
  }

  return (
    <header className="sticky top-0 z-40 md:hidden border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-14 items-center justify-between">
        <Link
          href="/"
          aria-label="SmartTutor Home"
          className="flex items-center gap-2"
        >
          <Image
            src="/brand/smarttutor-logo.png"
            alt="SmartTutor"
            width={52}
            height={52}
          />
          <span className="font-display font-bold text-lg">SmartTutor</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Change language">
            <Globe className="h-5 w-5" />
          </Button>
          {session ? (
            <Button size="sm" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button size="sm" onClick={handleLogin}>
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
