import { cn } from "@/lib/utils";
import { Trophy, Timer } from "lucide-react";
import { WEEKLY_LEADERBOARD } from "@/fixtures/leaderboard";

export function MatchCard({ className }: { className?: string }) {
  return (
    <article className={cn("glass-panel p-5 rounded-2xl flex flex-col justify-between h-full relative overflow-hidden group", className)}>
      <div className="absolute top-0 right-0 p-3">
        <div 
          className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/20 border border-red-500/20 text-[10px] font-bold text-red-500 animate-pulse"
          aria-live="polite"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" aria-hidden="true" />
          LIVE 42&apos;
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center text-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl font-bold" aria-hidden="true">B</div>
          <span className="text-xs font-bold text-muted uppercase tracking-wider">Boca</span>
        </div>
        
        <div className="text-3xl font-mono font-bold tracking-widest px-4" aria-label="Current score: 2 to 1">
          2 - 1
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl font-bold" aria-hidden="true">R</div>
          <span className="text-xs font-bold text-muted uppercase tracking-wider">River</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-xs text-muted">
        <span className="flex items-center gap-1"><Timer className="w-3 h-3" aria-hidden="true" /> 2nd Half</span>
        <span className="text-primary font-medium">+450 pts at stake</span>
      </div>
    </article>
  );
}

export function LeaderboardPreview({ className }: { className?: string }) {
  return (
    <section className={cn("glass-panel p-5 rounded-2xl flex flex-col h-full", className)} aria-labelledby="leaderboard-heading">
      <div className="flex items-center justify-between mb-4">
        <h3 id="leaderboard-heading" className="font-bold flex items-center gap-2 text-sm">
          <Trophy className="w-4 h-4 text-primary" aria-hidden="true" /> 
          Top Players
        </h3>
        <span className="text-[10px] text-muted uppercase tracking-wider">Weekly</span>
      </div>
      
      <ol className="space-y-3">
        {WEEKLY_LEADERBOARD.map((user) => (
          <li key={user.name} className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-default group">
            <div className="flex items-center gap-3">
              <span 
                className={cn("w-5 h-5 flex items-center justify-center text-[10px] font-bold rounded", 
                  user.rank === 1 ? "bg-yellow-500/20 text-yellow-500" : 
                  user.rank === 2 ? "bg-gray-400/20 text-gray-400" : "bg-orange-700/20 text-orange-700"
                )}
                aria-label={`Rank ${user.rank}`}
              >
                #{user.rank}
              </span>
              <span className="text-sm font-medium">{user.name}</span>
            </div>
            <span className="font-mono text-xs text-primary" aria-label={`${user.points} points`}>
              {user.points}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
