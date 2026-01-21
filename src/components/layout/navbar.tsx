import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo />
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted">
          <Link href="#" className="hover:text-white transition-colors">Leagues</Link>
          <Link href="#" className="hover:text-white transition-colors">Matches</Link>
          <Link href="#" className="hover:text-white transition-colors">Stats</Link>
          <Link href="#" className="hover:text-white transition-colors">Ritual</Link>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Log In</Button>
          <Button variant="primary" size="sm">Start Playing</Button>
        </div>
      </div>
    </nav>
  );
}
