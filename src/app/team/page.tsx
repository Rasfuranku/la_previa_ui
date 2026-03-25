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
import { TeamField } from '@/components/team/team-field';
import { PlayerSelector } from '@/components/team/player-selector';

export default function TeamPage() {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [team, setTeam] = useState<TeamFanaticResponse | null>(null);
  const [players, setPlayers] = useState<PlayerResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTeamName, setNewTeamName] = useState('');
  const [creating, setCreating] = useState(false);
  const [showPlayerSelector, setShowPlayerSelector] = useState<number | null>(null);

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
    const res = await createTeamFanaticAction({ fan_id: user.id, team_name: newTeamName });
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
        alert(res.error || "Failed to add player");
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
        alert(res.error || "Failed to remove player");
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
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white/5 p-6 rounded-2xl border border-white/10">
                <div className="space-y-1">
                <h2 className="text-lg font-bold text-white">New Manager</h2>
                <p className="text-sm text-muted">Enter your team name to join the league.</p>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                <input 
                    type="text" 
                    placeholder="Ex: Boca Juniors Fanatic" 
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 flex-1 sm:w-64"
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                />
                <Button onClick={handleCreateTeam} disabled={creating} className="gap-2">
                    {creating ? <Loader2 className="animate-spin w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    Create Team
                </Button>
                </div>
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
                <TeamField 
                    players={players} 
                    onAddPlayer={(posId) => setShowPlayerSelector(posId)} 
                    onRemovePlayer={handleRemovePlayer}
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
    </div>
  );
}
