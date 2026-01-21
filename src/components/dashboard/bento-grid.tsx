import { MatchCard, LeaderboardPreview } from "./dashboard-cards";
import { cn } from "@/lib/utils";
import { TrendingUp, Activity } from "lucide-react";

export function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 w-full h-full min-h-[400px]">
      {/* Main Feature: Live Match */}
      <div className="md:col-span-2 md:row-span-2">
         <MatchCard className="h-full glass-panel-hover" />
      </div>

      {/* Side Column Top: Leaderboard */}
      <div className="md:col-span-1 md:row-span-1">
        <LeaderboardPreview className="h-full glass-panel-hover" />
      </div>

      {/* Side Column Bottom: Stats Mini Card */}
      <div className="md:col-span-1 md:row-span-1 glass-panel glass-panel-hover p-5 rounded-2xl flex flex-col justify-center gap-2">
        <div className="flex items-center gap-2 text-muted text-xs font-bold uppercase tracking-wider">
          <Activity className="w-4 h-4 text-accent" />
          Global Activity
        </div>
        <div className="text-2xl font-bold text-white flex items-end gap-2">
          1.2M <span className="text-sm text-muted font-normal mb-1">predictions</span>
        </div>
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <div className="h-full w-[70%] bg-accent" />
        </div>
      </div>
    </div>
  );
}
