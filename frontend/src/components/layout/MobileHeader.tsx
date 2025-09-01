'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/components/providers/auth-provider'
import { Globe } from 'lucide-react'
import { handleLogin, handleLogout } from '@/lib/auth-actions'
import { useState } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

export default function MobileHeader() {
  const { session, supabase } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const onLogin = async () => {
    setIsLoading(true)
    await handleLogin(supabase)
    setIsLoading(false)
  }

  const onLogout = async () => {
    setIsLoading(true)
    await handleLogout(supabase)
    setIsLoading(false)
  }

  return (
    <header className="sticky top-0 z-40 md:hidden border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="flex h-14 items-center justify-between p-4">
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
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={session.user.user_metadata.avatar_url} />
                <AvatarFallback>
                  {session.user.user_metadata.full_name
                    ?.split(' ')
                    .map((n: string) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <Button size="sm" onClick={onLogout} disabled={isLoading}>
                {isLoading ? '...' : 'Logout'}
              </Button>
            </div>
          ) : (
            <Button size="sm" onClick={onLogin} disabled={isLoading}>
              {isLoading ? '...' : 'Login'}
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
