'use client';

import { useState, useEffect } from 'react';
import { PlayerResponse } from '@/lib/schemas/player.schema';
import { searchPlayersAction } from '@/actions/player-actions';
import { Loader2, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PlayerSelectorProps {
  positionId: number;
  onSelect: (player: PlayerResponse) => void;
  onClose: () => void;
}

export function PlayerSelector({ positionId, onSelect, onClose }: PlayerSelectorProps) {
  const [players, setPlayers] = useState<PlayerResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const posNames = { 1: "Goalkeepers", 2: "Defenders", 3: "Midfielders", 4: "Forwards" };

  useEffect(() => {
    async function fetchPlayers() {
      const res = await searchPlayersAction({ position_id: positionId, limit: 100, offset: 0 });
      if (res.data) {
        setPlayers(res.data);
      }
      setLoading(false);
    }
    fetchPlayers();
  }, [positionId]);

  const filteredPlayers = players.filter(p =>
    `${p.name} ${p.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#121212] border border-white/10 rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl">
        <header className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
          <div>
            <h2 className="text-xl font-bold text-white">Sign a {posNames[positionId as keyof typeof posNames]}</h2>
            <p className="text-xs text-muted uppercase tracking-widest mt-1">Transfer Market</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-5 h-5 text-muted" />
          </button>
        </header>

        <div className="p-4 border-b border-white/10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              placeholder="Search by name..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filteredPlayers.length > 0 ? (
            <div className="grid grid-cols-1 gap-3">
              {filteredPlayers.map((player) => (
                <div key={player.id} className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-lg font-bold text-primary">
                      {player.picture ? <img src={player.picture} alt={player.name} className="w-full h-full object-cover rounded-xl" /> : player.name[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{player.name} {player.last_name}</h3>
                      <p className="text-[10px] text-muted uppercase font-mono">{player.current_team_name || player.current_team}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-bold text-white">${(player.price / 1000000).toFixed(1)}M</div>
                      <div className="text-[10px] text-muted">Form: {player.form}</div>
                    </div>
                    <Button size="sm" onClick={() => onSelect(player)} className="h-8">Sign</Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted italic">No players found matching your search.</div>
          )}
        </div>
      </div>
    </div>
  );
}
