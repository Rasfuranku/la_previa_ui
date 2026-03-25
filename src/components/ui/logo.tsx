import { cn } from "@/lib/utils";
import Link from "next/link";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-3 font-bold tracking-tighter hover:opacity-80 transition-opacity", className)}>
      <div className="relative w-8 h-9 group">
        {/* Shield Shape */}
        <div className="absolute inset-0 bg-primary rounded-b-[40%] rounded-t-sm overflow-hidden border border-primary/50 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
          {/* Vertical Stripes */}
          <div className="flex h-full w-full">
            <div className="h-full w-1/4 bg-stripe-green" />
            <div className="h-full w-1/4 bg-accent" />
            <div className="h-full w-1/4 bg-white" />
            <div className="h-full w-1/4 bg-stripe-blue" />
          </div>
          
          {/* Overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
        </div>
        
        {/* Border Glow */}
        <div className="absolute inset-0 rounded-b-[40%] rounded-t-sm border-2 border-primary/20 scale-110 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <div className="flex flex-col leading-none">
        <span className="text-xl font-black italic tracking-tight">LA <span className="text-primary">PREVIA</span></span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted font-medium">Fantasy Football</span>
      </div>
    </Link>
  );
}

