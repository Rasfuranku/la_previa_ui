import { cn } from "@/lib/utils";
import { Trophy, Timer } from "lucide-react";

export function MatchCard({ className }: { className?: string }) {
  return (
    <div className={cn("glass-panel p-5 rounded-2xl flex flex-col justify-between h-full relative overflow-hidden group", className)}>
      <div className="absolute top-0 right-0 p-3">
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/20 border border-red-500/20 text-[10px] font-bold text-red-500 animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
          LIVE 42'
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center text-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl font-bold">B</div>
          <span className="text-xs font-bold text-muted">BOCA</span>
        </div>
        
        <div className="text-3xl font-mono font-bold tracking-widest px-4">
          2 - 1
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl font-bold">R</div>
          <span className="text-xs font-bold text-muted">RIVER</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-xs text-muted">
        <span className="flex items-center gap-1"><Timer className="w-3 h-3" /> 2nd Half</span>
        <span className="text-primary font-medium">+450 pts at stake</span>
      </div>
    </div>
  );
}

export function LeaderboardPreview({ className }: { className?: string }) {
  const users = [
    { name: "Santi_10", points: "2,450", rank: 1 },
    { name: "LaCobra", points: "2,120", rank: 2 },
    { name: "Davoo", points: "1,980", rank: 3 },
  ];

  return (
    <div className={cn("glass-panel p-5 rounded-2xl flex flex-col h-full", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold flex items-center gap-2 text-sm"><Trophy className="w-4 h-4 text-primary" /> Top Players</h3>
        <span className="text-[10px] text-muted uppercase tracking-wider">Weekly</span>
      </div>
      
      <div className="space-y-3">
        {users.map((user) => (
          <div key={user.name} className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-default">
            <div className="flex items-center gap-3">
              <span className={cn("w-5 h-5 flex items-center justify-center text-[10px] font-bold rounded", 
                user.rank === 1 ? "bg-yellow-500/20 text-yellow-500" : 
                user.rank === 2 ? "bg-gray-400/20 text-gray-400" : "bg-orange-700/20 text-orange-700"
              )}>#{user.rank}</span>
              <span className="text-sm font-medium">{user.name}</span>
            </div>
            <span className="font-mono text-xs text-primary">{user.points}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
