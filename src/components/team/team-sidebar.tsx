'use client';

import { TeamFanaticResponse } from '@/lib/schemas/team.schema';
import { PlayerResponse } from '@/lib/schemas/player.schema';
import { Trophy, TrendingUp, Users } from 'lucide-react';

interface TeamSidebarProps {
  team: TeamFanaticResponse;
  players: PlayerResponse[];
  latestScore?: number;
}

export function TeamSidebar({ team, players, latestScore = 0 }: TeamSidebarProps) {
  const totalValue = players.reduce((acc, p) => acc + p.price, 0);
  const avgForm = players.length > 0 
    ? (players.reduce((acc, p) => acc + p.form, 0) / players.length).toFixed(1)
    : 0;

  return (
    <aside className="space-y-6">
      <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-3xl">
            {team.badge ? <img src={team.badge} alt={team.team_name} className="w-12 h-12" /> : '⚽'}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{team.team_name}</h2>
            <p className="text-xs text-muted uppercase tracking-wider">Fantasy Manager</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="flex items-center gap-3">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium">Latest Score</span>
            </div>
            <span className="text-lg font-bold text-white">{latestScore} pts</span>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Avg Form</span>
            </div>
            <span className="text-lg font-bold text-white">{avgForm}</span>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">Squad Value</span>
            </div>
            <span className="text-lg font-bold text-white">${(totalValue / 1000000).toFixed(1)}M</span>
          </div>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted mb-4 px-1">Squad Balance</h3>
        <div className="space-y-3">
            {[
                { label: 'Goalkeepers', current: players.filter(p => p.position_id === 1).length, max: 2 },
                { label: 'Defenders', current: players.filter(p => p.position_id === 2).length, max: 5 },
                { label: 'Midfielders', current: players.filter(p => p.position_id === 3).length, max: 5 },
                { label: 'Forwards', current: players.filter(p => p.position_id === 4).length, max: 3 },
            ].map((pos) => (
                <div key={pos.label} className="space-y-1">
                    <div className="flex justify-between text-xs">
                        <span className="text-muted">{pos.label}</span>
                        <span className={pos.current === pos.max ? "text-green-500 font-bold" : "text-white"}>
                            {pos.current}/{pos.max}
                        </span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div 
                            className={`h-full transition-all duration-500 ${pos.current === pos.max ? 'bg-green-500' : 'bg-primary'}`}
                            style={{ width: `${(pos.current / pos.max) * 100}%` }}
                        />
                    </div>
                </div>
            ))}
        </div>
      </div>
    </aside>
  );
}
