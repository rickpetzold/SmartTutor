'use client';

import Link from 'next/link';
import { useAuth } from '@/components/providers/auth-provider';
import { Button } from '@/components/ui/button';

// OAuth helper
const handleAuth = async (supabase: any) => {
  try {
    await supabase.auth.signInWithOAuth({ provider: 'google' });
  } catch (e) {
    console.error('Authentication error:', e);
  }
};

export default function Header() {
  const { session, supabase } = useAuth();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.error('Logout error:', e);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full px-4 py-3">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between rounded-2xl bg-gray-500/50 px-4 py-2">
          {/* Left: Logo + Section Buttons */}
          <div className="flex items-center gap-3 md:gap-4">
            <Link href="/" className="text-xl font-semibold tracking-tight" aria-label="SmartTutor Home">
              SmartTutor
            </Link>
            <nav className="flex items-center gap-2" aria-label="Primary">
              <Link href="/#price-chart">
                <Button className="h-8 px-4">Price Chart</Button>
              </Link>
              <Link href="/#satisfaction-chart">
                <Button className="h-8 px-4">Satisfaction Chart</Button>
              </Link>
              <Link href="/#database">
                <Button className="h-8 px-4">Database</Button>
              </Link>
            </nav>
          </div>

          {/* Right: Language + Auth */}
          <div className="flex items-center gap-2">
            <Button variant="outline" className="h-8 px-4" aria-label="Change language">EN</Button>
            {session ? (
              <Button className="h-8 px-4" onClick={handleLogout}>Logout</Button>
            ) : (
              <Button className="h-8 px-4" onClick={() => handleAuth(supabase)}>Login</Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}