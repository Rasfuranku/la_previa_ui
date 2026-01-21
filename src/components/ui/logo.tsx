import { cn } from "@/lib/utils";
import { Zap } from "lucide-react";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 font-bold tracking-tighter", className)}>
      <div className="bg-primary/20 p-1.5 rounded-lg border border-primary/20">
        <Zap className="w-5 h-5 text-primary fill-primary" />
      </div>
      <span className="text-xl">LA <span className="text-primary">PREVIA</span></span>
    </div>
  );
}
