'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/components/providers/auth-provider'
import { DollarSign, Smile } from 'lucide-react'

export const handleAuth = async (supabase: any) => {
  try {
    await supabase.auth.signInWithOAuth({ provider: 'google' })
  } catch (e) {
    console.error('Authentication error:', e)
  }
}

export default function Header() {
  const { session, supabase } = useAuth()

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
    } catch (e) {
      console.error('Logout error:', e)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto max-w-full px-4 py-3">
        <div className="flex h-16 w-4/5 mx-auto items-center justify-between rounded-2xl border border-gray-300 bg-gray-900/40 backdrop-blur supports-[backdrop-filter]:bg-gray-900/30 px-4">
          {/* Left: Logo + chart shortcuts */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              aria-label="SmartTutor Home"
              className="flex items-center"
            >
              <Image
                src="/brand/smarttutor-logo.png"
                alt="SmartTutor"
                width={56}
                height={56}
                priority
              />
            </Link>
            <nav className="flex items-center gap-6" aria-label="Shortcuts">
              <Link
                href="/#price-chart"
                className="flex items-center gap-1 font-semibold text-gray-100 hover:text-white"
              >
                <DollarSign className="h-4 w-4" />
                <span>Price Chart</span>
              </Link>
              <Link
                href="/#satisfaction-chart"
                className="flex items-center gap-1 font-semibold text-gray-100 hover:text-white"
              >
                <Smile className="h-4 w-4" />
                <span>Satisfaction Chart</span>
              </Link>
              <Link
                href="/#database"
                className="flex items-center gap-1 font-semibold text-gray-100 hover:text-white"
              >
                <span>Database</span>
              </Link>
            </nav>
          </div>

          {/* Right: Language + Auth */}
          <div className="flex items-center gap-4">
            <Button aria-label="Change language">EN</Button>
            {session ? (
              <Button onClick={handleLogout}>Logout</Button>
            ) : (
              <Button onClick={() => handleAuth(supabase)}>Login</Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
