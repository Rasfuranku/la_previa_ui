'use client';

import { useEffect, useState } from 'react';
import { getMeAction } from '@/actions/user-actions';
import { getTeamFanaticAction, createTeamFanaticAction } from '@/actions/team-actions';
import { getActivePlayersByFanaticIdAction, addPlayerToTeamAction, transferPlayerAction } from '@/actions/player-actions';
import { UserResponse } from '@/lib/schemas/auth.schema';
import { TeamFanaticResponse } from '@/lib/schemas/team.schema';
import { PlayerResponse } from '@/lib/schemas/player.schema';
import { Loader2, Plus, LayoutDashboard, Search, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TeamSidebar } from '@/components/team/team-sidebar';
import { GameWeekHeader } from '@/components/team/game-week-header';
import { TeamField } from '@/components/team/team-field';
import { PlayerSelector } from '@/components/team/player-selector';
import { PlayerMenuCard } from '@/components/team/player-menu-card';
import { AlertModal } from '@/components/ui/alert-modal';

export default function TeamPage() {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [team, setTeam] = useState<TeamFanaticResponse | null>(null);
  const [players, setPlayers] = useState<PlayerResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTeamName, setNewTeamName] = useState('');
  const [favoriteTeam, setFavoriteTeam] = useState('');
  const [nationality, setNationality] = useState('');
  const [creating, setCreating] = useState(false);
  const [showPlayerSelector, setShowPlayerSelector] = useState<number | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerResponse | null>(null);
  const [alertConfig, setAlertConfig] = useState<{isOpen: boolean, message: string}>({ isOpen: false, message: "" });

  useEffect(() => {
    async function loadData() {
      try {
        const userRes = await getMeAction();
        if (userRes.error) {
          setError(userRes.error);
          setLoading(false);
          return;
        }
        if (userRes.data) {
          setUser(userRes.data);
          const teamRes = await getTeamFanaticAction(userRes.data.id);
          if (teamRes.success && teamRes.data) {
            setTeam(teamRes.data);
            const playersRes = await getActivePlayersByFanaticIdAction(userRes.data.id);
            if (playersRes.success && playersRes.data) {
              setPlayers(playersRes.data);
            }
          }
        }
      } catch (err) {
        setError("Failed to load team data");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  async function handleCreateTeam() {
    if (!user || !newTeamName) return;
    setCreating(true);
    const res = await createTeamFanaticAction({ 
      fan_id: user.id, 
      team_name: newTeamName,
      favorite_team: favoriteTeam,
      nationality: nationality
    });
    if (res.data) {
      setTeam(res.data);
    } else {
      setError(res.error || "Failed to create team");
    }
    setCreating(false);
  }

  async function handleAddPlayer(player: PlayerResponse) {
    if (!user || !team) return;
    const res = await addPlayerToTeamAction({
        id: player.id,
        fan_id: user.id,
        team_fanatic_id: team.id,
        transfer_in: true
    });
    if (res.success && res.data) {
        setPlayers([...players, res.data]);
        setShowPlayerSelector(null);
    } else {
        setAlertConfig({ isOpen: true, message: res.error || "Failed to add player" });
    }
  }

  async function handleRemovePlayer(playerId: number) {
    if (!user || !team) return;
    const res = await transferPlayerAction(playerId, {
        id: playerId,
        fan_id: user.id,
        team_fanatic_id: team.id,
        transfer_in: false
    });
    if (res.success) {
        setPlayers(players.filter(p => p.id !== playerId));
    } else {
        setAlertConfig({ isOpen: true, message: res.error || "Failed to remove player" });
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <h1 className="text-2xl font-bold text-red-500">Error</h1>
        <p className="text-muted">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-white">
                {team ? team.team_name : 'Create Your Team'}
            </h1>
            {team ? (
            <div className="flex items-center gap-2 text-muted text-lg">
                <ShieldCheck className="w-5 h-5 text-primary" />
                Squad Management
            </div>
            ) : (
            <div className="flex flex-col items-start gap-6 bg-white/5 p-8 rounded-3xl border border-white/10 w-full max-w-2xl">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-white">Join the Pitch</h2>
                  <p className="text-sm text-muted">Complete your profile to start competing in the ritual.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted px-1">Team Name</label>
                    <input 
                        type="text" 
                        placeholder="Ex: Boca Juniors Fanatic" 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        value={newTeamName}
                        onChange={(e) => setNewTeamName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted px-1">Nationality</label>
                    <input 
                        type="text" 
                        placeholder="Ex: Argentina" 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        value={nationality}
                        onChange={(e) => setNationality(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted px-1">Favorite National/League Team</label>
                    <input 
                        type="text" 
                        placeholder="Ex: Real Madrid" 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        value={favoriteTeam}
                        onChange={(e) => setFavoriteTeam(e.target.value)}
                    />
                  </div>
                </div>

                <Button onClick={handleCreateTeam} disabled={creating || !newTeamName || !nationality || !favoriteTeam} className="w-full gap-2" size="lg">
                    {creating ? <Loader2 className="animate-spin w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    Create Team
                </Button>
            </div>
            )}
        </div>

        {team && (
            <div className="flex items-center gap-3">
                <Button variant="glass" size="sm" className="gap-2" onClick={() => window.location.href = '/dashboard'}>
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Button>
                <Button variant="primary" size="sm" className="gap-2" onClick={() => window.location.href = '/players'}>
                    <Search className="w-4 h-4" /> Transfer Market
                </Button>
            </div>
        )}
      </header>

      {team && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <TeamSidebar team={team} players={players} />
              </div>
              <div className="lg:col-span-3 space-y-8">
                <GameWeekHeader 
                    weekNumber={12} 
                    latestPoints={85} 
                    averagePoints={56} 
                    highestPoints={112} 
                    weekRank={453} 
                    totalTransfers={3} 
                    onPrevWeek={() => {}}
                    onNextWeek={() => {}}
                />
                <TeamField 
                    players={players} 
                    onAddPlayer={(posId) => setShowPlayerSelector(posId)} 
                    onPlayerClick={setSelectedPlayer}
                />
              </div>
          </div>
      )}

      {showPlayerSelector !== null && (
          <PlayerSelector 
            positionId={showPlayerSelector} 
            onSelect={handleAddPlayer} 
            onClose={() => setShowPlayerSelector(null)} 
          />
      )}

      {selectedPlayer !== null && (
          <PlayerMenuCard 
            player={selectedPlayer}
            onClose={() => setSelectedPlayer(null)}
            onRemove={handleRemovePlayer}
          />
      )}

      <AlertModal 
         isOpen={alertConfig.isOpen}
         title="Transfer Blocked"
         message={alertConfig.message}
         onClose={() => setAlertConfig({ ...alertConfig, isOpen: false })}
      />
    </div>
  );
}
