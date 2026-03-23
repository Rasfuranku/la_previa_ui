'use client';

import { useState, useEffect } from 'react';
import { searchPlayersAction } from '@/actions/player-actions';
import { PlayerResponse } from '@/lib/schemas/player.schema';
import { Loader2, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PlayersPage() {
  const [players, setPlayers] = useState<PlayerResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchPlayers() {
      const res = await searchPlayersAction({ limit: 50, offset: 0 });
      if (res.data) {
        setPlayers(res.data);
      }
      setLoading(false);
    }
    fetchPlayers();
  }, []);

  const filteredPlayers = players.filter(p => 
    `${p.name} ${p.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.current_team.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Transfer Market</h1>
          <p className="text-muted">Discover and sign the best talent for your team.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input 
              type="text"
              placeholder="Search players or teams..."
              className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="glass" size="sm" className="gap-2">
            <Filter className="w-4 h-4" /> Filter
          </Button>
        </div>
      </header>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPlayers.map((player) => (
            <div key={player.id} className="glass-panel p-4 rounded-2xl border border-white/5 hover:border-primary/30 transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center text-2xl font-bold">
                  {player.name[0]}{player.last_name[0]}
                </div>
                <div className="text-right">
                  <div className="text-primary font-mono font-bold">${(player.price / 1000000).toFixed(1)}M</div>
                  <div className="text-[10px] text-muted uppercase tracking-tighter">Market Value</div>
                </div>
              </div>
              
              <div className="space-y-1">
                <h3 className="font-bold text-white group-hover:text-primary transition-colors">
                  {player.name} {player.last_name}
                </h3>
                <p className="text-xs text-muted">{player.current_team}</p>
              </div>

              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted uppercase">Form</span>
                  <span className="text-sm font-bold">{player.form}</span>
                </div>
                <Button variant="primary" size="sm" className="h-8 text-xs">
                  Sign Player
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
