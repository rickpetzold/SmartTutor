'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/components/providers/auth-provider'

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
    <header className="sticky top-0 z-50 w-full bg-gray-900/40 backdrop-blur supports-[backdrop-filter]:bg-gray-900/30">
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo + chart shortcuts */}
          <div className="flex items-center gap-[1rem]">
            <Link
              href="/"
              aria-label="SmartTutor Home"
              className="flex items-center gap-24"
            >
              <Image
                src="/brand/smarttutor-logo.png"
                alt="SmartTutor"
                width={56}
                height={56}
                priority
              />
            </Link>
            <nav className="flex items-center" aria-label="Shortcuts">
              <Link href="/#price-chart">
                <Button>Price Chart</Button>
              </Link>
              <Link href="/#satisfaction-chart">
                <Button>Satisfaction Chart</Button>
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
