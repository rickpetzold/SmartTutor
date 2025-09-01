'use client'

import Image from 'next/image'
import Link from 'next/link'
import { DollarSign, Smile, Database, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/components/providers/auth-provider'
import { handleLogin, handleLogout, handleRegister } from '@/lib/auth-actions'
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function Sidebar() {
  const { session, supabase } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const onLogin = async () => {
    setIsLoading(true)
    await handleLogin(supabase)
    setIsLoading(false)
  }

  const onRegister = async () => {
    setIsLoading(true)
    await handleRegister(supabase)
    setIsLoading(false)
  }

  const onLogout = async () => {
    setIsLoading(true)
    await handleLogout(supabase)
    setIsLoading(false)
  }

  return (
    <aside className="hidden md:flex h-svh w-64 shrink-0 sticky top-0 border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      <div className="flex h-full w-full flex-col">
        <div className="p-4">
          <Link
            href="/"
            aria-label="SmartTutor Home"
            className="flex items-center gap-2"
          >
            <Image
              src="/brand/smarttutor-logo.png"
              alt="SmartTutor"
              width={80}
              height={80}
            />
            <span className="font-display text-2xl">SmartTutor</span>
          </Link>
        </div>
        <nav className="flex-1 px-2 py-2 space-y-1">
          <Link
            href="/#price-chart"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
          >
            <DollarSign className="h-4 w-4" />
            <span>Price Chart</span>
          </Link>
          <Link
            href="/#satisfaction-chart"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
          >
            <Smile className="h-4 w-4" />
            <span>Satisfaction Chart</span>
          </Link>
          <Link
            href="/#database"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
          >
            <Database className="h-4 w-4" />
            <span>Data</span>
          </Link>
        </nav>
        <div className="mt-auto p-4 border-t border-sidebar-border">
          <div className="flex items-center justify-between gap-2">
            <Button
              variant="secondary"
              size="sm"
              aria-label="Change language"
              className="flex items-center gap-2"
            >
              <Globe className="h-4 w-4" />
              <span>EN</span>
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
              <div className="flex items-center gap-1">
                <Button size="sm" onClick={onLogin} disabled={isLoading}>
                  {isLoading ? 'Redirecting...' : 'Login'}
                </Button>
                <Button size="sm" onClick={onRegister} disabled={isLoading}>
                  {isLoading ? '...' : 'Register'}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  )
}
