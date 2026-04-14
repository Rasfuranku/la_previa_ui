'use client';

import { ChevronLeft, ChevronRight, TrendingUp, Trophy, ArrowRightLeft, Medal } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GameWeekHeaderProps {
  weekNumber: number;
  latestPoints: number;
  averagePoints: number;
  highestPoints: number;
  weekRank: number;
  totalTransfers: number;
  onPrevWeek?: () => void;
  onNextWeek?: () => void;
}

export function GameWeekHeader({
  weekNumber,
  latestPoints,
  averagePoints,
  highestPoints,
  weekRank,
  totalTransfers,
  onPrevWeek,
  onNextWeek
}: GameWeekHeaderProps) {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-gradient-to-tr from-white/5 to-transparent backdrop-blur-md mb-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left Side Stats */}
        <div className="flex flex-col gap-4 w-full md:w-1/3">
          <div className="flex items-center justify-between bg-black/40 p-4 rounded-2xl border border-white/5">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-muted" />
              <span className="text-sm font-medium text-white/80">Average Points</span>
            </div>
            <span className="text-lg font-bold text-white">{averagePoints}</span>
          </div>
          <div className="flex items-center justify-between bg-black/40 p-4 rounded-2xl border border-white/5">
            <div className="flex items-center gap-3">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium text-white/80">Highest Points</span>
            </div>
            <span className="text-lg font-bold text-white">{highestPoints}</span>
          </div>
        </div>

        {/* Center Main Header */}
        <div className="flex flex-col items-center justify-center text-center w-full md:w-1/3">
          <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-2">Semana {weekNumber}</h2>
          <div className="flex items-center justify-center gap-4 mb-2">
            <Button variant="glass" size="icon" className="rounded-full w-10 h-10 border border-white/10" onClick={onPrevWeek}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            <div className="flex flex-col items-center justify-center bg-black/60 border border-primary/30 shadow-[0_0_20px_rgba(124,58,237,0.2)] rounded-3xl p-6 min-w-[200px]">
              <span className="text-5xl font-black text-white">{latestPoints}</span>
              <span className="text-xs text-muted uppercase tracking-wider mt-2 font-bold">Últimos puntos conseguidos</span>
            </div>

            <Button variant="glass" size="icon" className="rounded-full w-10 h-10 border border-white/10" onClick={onNextWeek}>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Right Side Stats */}
        <div className="flex flex-col gap-4 w-full md:w-1/3">
          <div className="flex items-center justify-between bg-black/40 p-4 rounded-2xl border border-white/5">
            <div className="flex items-center gap-3">
              <Medal className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium text-white/80">Game Week Rank</span>
            </div>
            <span className="text-lg font-bold text-white">#{weekRank}</span>
          </div>
          <div className="flex items-center justify-between bg-black/40 p-4 rounded-2xl border border-white/5">
            <div className="flex items-center gap-3">
              <ArrowRightLeft className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-medium text-white/80">Total Transfers</span>
            </div>
            <span className="text-lg font-bold text-white">{totalTransfers}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
