'use client';

import { PlayerResponse } from '@/lib/schemas/player.schema';
import { Plus, User } from 'lucide-react';

interface TeamFieldProps {
  players: PlayerResponse[];
  onAddPlayer?: (positionId: number) => void;
  onRemovePlayer?: (playerId: number) => void;
}

export function TeamField({ players, onAddPlayer, onRemovePlayer }: TeamFieldProps) {
  // 2 Goalkeepers (1 pitch, 1 bench)
  // 5 Defenders (4 pitch, 1 bench)
  // 5 Midfielders (4 pitch, 1 bench)
  // 3 Forwards (2 pitch, 1 bench)
  // Total: 11 pitch + 4 bench = 15

  const getPlayersByPos = (posId: number) => players.filter(p => p.position_id === posId);

  const gks = getPlayersByPos(1);
  const defs = getPlayersByPos(2);
  const mids = getPlayersByPos(3);
  const fwds = getPlayersByPos(4);

  const PlayerCard = ({ player, positionId, label }: { player?: PlayerResponse, positionId: number, label: string }) => (
    <div className="flex flex-col items-center group w-16 md:w-24">
      <div 
        onClick={() => player ? onRemovePlayer?.(player.id) : onAddPlayer?.(positionId)}
        className="relative w-14 h-14 md:w-20 md:h-20 cursor-pointer transition-all hover:scale-105"
      >
        {/* Jersey Area */}
        <div className="absolute inset-0 flex items-center justify-center">
            {player ? (
                player.picture ? (
                    <img src={player.picture} alt={player.name} className="w-full h-full object-contain drop-shadow-lg" />
                ) : (
                    <div className="w-full h-full bg-white/10 rounded-t-lg flex items-center justify-center">
                        <User className="w-10 h-10 text-white/20" />
                    </div>
                )
            ) : (
                <div className="w-full h-full bg-black/40 border-2 border-dashed border-white/10 rounded-t-lg flex items-center justify-center">
                    <Plus className="w-6 h-6 text-white/20 group-hover:text-primary transition-colors" />
                </div>
            )}
        </div>
        
        {/* Info Overlay */}
        <div className="absolute -bottom-1 left-0 right-0 flex flex-col items-center">
            <div className="w-full bg-white text-black text-[8px] md:text-[10px] font-bold py-0.5 text-center shadow-md">
                {player ? player.last_name.toUpperCase() : label}
            </div>
            <div className={`w-full text-white text-[7px] md:text-[9px] font-bold py-0.5 text-center shadow-md ${player ? 'bg-primary' : 'bg-gray-800'}`}>
                {player ? `$${(player.price / 1000000).toFixed(1)}M` : '-'}
            </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Pitch Area */}
      <div className="relative w-full min-h-[500px] md:min-h-[600px] bg-[#022c22] rounded-[40px] overflow-hidden border-8 border-white/5 shadow-2xl flex flex-col p-4">
        
        {/* Tactical View Container with Perspective */}
        <div className="absolute inset-0 flex flex-col" style={{ perspective: '1000px' }}>
          <div className="absolute inset-0 bg-gradient-to-b from-[#064e3b] to-[#022c22]" />
          
          {/* Pitch Markings */}
          <div className="absolute inset-x-8 top-0 h-full border-x-2 border-white/10 pointer-events-none" />
          <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 border-t-2 border-white/10 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-white/10 rounded-full pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 border-2 border-t-0 border-white/10 pointer-events-none" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-40 border-2 border-b-0 border-white/10 pointer-events-none" />
          
          {/* Players Pitch Grid */}
          <div 
            className="relative flex-1 flex flex-col justify-between py-12"
            style={{ transform: 'rotateX(20deg) translateY(-20px)' }}
          >
            {/* GoalKeeper */}
            <div className="flex justify-center">
              <PlayerCard player={gks[0]} positionId={1} label="GKP" />
            </div>

            {/* Defenders Row (4) */}
            <div className="flex justify-around px-4">
              {[0, 1, 2, 3].map(i => (
                <PlayerCard key={`def-${i}`} player={defs[i]} positionId={2} label="DEF" />
              ))}
            </div>

            {/* Midfielders Row (4) */}
            <div className="flex justify-around px-2">
              {[0, 1, 2, 3].map(i => (
                <PlayerCard key={`mid-${i}`} player={mids[i]} positionId={3} label="MID" />
              ))}
            </div>

            {/* Forwards Row (2) */}
            <div className="flex justify-center gap-16">
              {[0, 1].map(i => (
                <PlayerCard key={`fwd-${i}`} player={fwds[i]} positionId={4} label="FWD" />
              ))}
            </div>
          </div>
        </div>

        {/* Header decoration */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/20 backdrop-blur-md px-4 py-1 rounded-full border border-white/10 z-10">
            <span className="text-[10px] font-bold text-white uppercase tracking-widest opacity-50">Pitch View</span>
        </div>
      </div>

      {/* Bench / Substitutes Area */}
      <div className="bg-white/5 border border-white/10 rounded-[30px] p-6 backdrop-blur-md">
        <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest px-2">Substitutes</h3>
            <div className="h-px flex-1 mx-4 bg-gradient-to-r from-white/10 to-transparent" />
        </div>
        
        <div className="flex justify-center gap-4 md:gap-12">
          {/* Remaining players from the 15-player squad */}
          <PlayerCard player={gks[1]} positionId={1} label="GKP" />
          <PlayerCard player={defs[4]} positionId={2} label="DEF" />
          <PlayerCard player={mids[4]} positionId={3} label="MID" />
          <PlayerCard player={fwds[2]} positionId={4} label="FWD" />
        </div>
      </div>
    </div>
  );
}
