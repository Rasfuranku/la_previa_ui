import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cookies } from "next/headers";
import { logoutAction } from "@/actions/auth-actions";

const NAV_LINKS = [
  { label: "Dashboard", href: "/dashboard", protected: true },
  { label: "Team", href: "/team", protected: true },
  { label: "Players", href: "/players", protected: true },
  { label: "Admin", href: "/admin", protected: true },
  { label: "Leagues", href: "/leagues" },
  { label: "Matches", href: "/matches" },
  { label: "Stats", href: "/stats" },
];

export async function Navbar() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('session_token')?.value;

  async function handleLogout() {
    'use server';
    await logoutAction();
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/50 backdrop-blur-xl" aria-label="Main Navigation">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo />
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted">
          {NAV_LINKS.filter(link => !link.protected || sessionToken).map((link) => (
            <Link 
              key={link.label} 
              href={link.href} 
              className="hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {sessionToken ? (
            <form action={handleLogout}>
              <Button type="submit" variant="ghost" size="sm">Log Out</Button>
            </form>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Log In</Button>
              </Link>
              <Link href="/register">
                <Button variant="primary" size="sm">Start Playing</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
