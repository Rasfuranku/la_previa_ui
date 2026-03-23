import { MatchCard, LeaderboardPreview } from "./dashboard-cards";
import { cn } from "@/lib/utils";
import { Activity } from "lucide-react";

export function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full h-full">
      {/* Main Feature: Live Match */}
      <div className="md:col-span-2 md:row-span-2 aspect-video md:aspect-auto">
         <MatchCard className="h-full glass-panel-hover" />
      </div>

      {/* Side Column Top: Leaderboard */}
      <div className="md:col-span-1 md:row-span-1 min-h-[200px] md:min-h-0">
        <LeaderboardPreview className="h-full glass-panel-hover" />
      </div>

      {/* Side Column Bottom: Stats Mini Card */}
      <div className="md:col-span-1 md:row-span-1 glass-panel glass-panel-hover p-5 rounded-2xl flex flex-col justify-center gap-4 min-h-[160px] md:min-h-0">
        <div className="flex items-center gap-2 text-muted text-xs font-bold uppercase tracking-wider">
          <Activity className="w-4 h-4 text-accent" aria-hidden="true" />
          Global Activity
        </div>
        <div>
          <div className="text-2xl font-bold text-white flex items-end gap-2">
            1.2M <span className="text-sm text-muted font-normal mb-1">predictions</span>
          </div>
          <div className="mt-3 h-1.5 w-full bg-white/5 rounded-full overflow-hidden" role="progressbar" aria-valuenow={70} aria-valuemin={0} aria-valuemax={100} aria-label="Prediction activity">
            <div className="h-full w-[70%] bg-accent transition-all duration-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
