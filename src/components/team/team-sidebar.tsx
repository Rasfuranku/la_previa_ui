'use client';

import { TeamFanaticResponse } from '@/lib/schemas/team.schema';
import { PlayerResponse } from '@/lib/schemas/player.schema';
import { Trophy, TrendingUp, Users, ArrowUpCircle, Medal, Globe } from 'lucide-react';

interface TeamSidebarProps {
  team: TeamFanaticResponse;
  players: PlayerResponse[];
  totalPoints?: number;
  weeklyPoints?: number;
  ranking?: number;
}

export function TeamSidebar({ team, players, totalPoints = 1240, weeklyPoints = 85, ranking = 12 }: TeamSidebarProps) {
  const totalPlayers = players.length;

  return (
    <aside className="space-y-6">
      <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-md relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
        
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center text-3xl shadow-xl overflow-hidden shrink-0">
            {team.badge ? <img src={team.badge} alt={team.team_name} className="w-full h-full object-cover" /> : '⚽'}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white leading-tight">{team.team_name}</h2>
            {team.favorite_team && <p className="text-xs text-primary font-bold uppercase tracking-wider">{team.favorite_team}</p>}
            {team.nationality && <p className="text-xs text-muted flex items-center gap-1 mt-1"><Globe className="w-3 h-3" /> {team.nationality}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 relative z-10">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-white/5 group hover:bg-white/5 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <Trophy className="w-4 h-4 text-yellow-500" />
              </div>
              <span className="text-sm font-medium text-white/80">Total Points</span>
            </div>
            <span className="text-xl font-black text-white">{totalPoints}</span>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-white/5 group hover:bg-white/5 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <ArrowUpCircle className="w-4 h-4 text-green-500" />
              </div>
              <span className="text-sm font-medium text-white/80">Puntos de la semana</span>
            </div>
            <span className="text-xl font-black text-white">{weeklyPoints}</span>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-white/5 group hover:bg-white/5 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Medal className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-white/80">Ranking</span>
            </div>
            <span className="text-xl font-black text-white">#{ranking}</span>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-white/5 group hover:bg-white/5 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                <Users className="w-4 h-4 text-accent" />
              </div>
              <span className="text-sm font-medium text-white/80">Total Players</span>
            </div>
            <span className="text-xl font-black text-white">{totalPlayers} / 15</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
