'use client';

import { useEffect, useState } from 'react';
import { getMeAction } from '@/actions/user-actions';
import { getTeamFanaticAction, createTeamFanaticAction } from '@/actions/team-actions';
import { UserResponse } from '@/lib/schemas/auth.schema';
import { TeamFanaticResponse } from '@/lib/schemas/team.schema';
import { BentoGrid } from '@/components/dashboard/bento-grid';
import { MatchCard, LeaderboardPreview } from '@/components/dashboard/dashboard-cards';
import { Loader2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [team, setTeam] = useState<TeamFanaticResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTeamName, setNewTeamName] = useState('');
  const [creating, setCreating] = useState(false);

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
          }
        }
      } catch (err) {
        setError("Failed to load dashboard data");
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
      <header className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-white">
          Welcome back, <span className="text-primary">{user?.full_name || user?.email}</span>
        </h1>
        {team ? (
          <p className="text-muted text-lg">
            Managing <span className="text-white font-bold">{team.team_name}</span>
          </p>
        ) : (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white/5 p-6 rounded-2xl border border-white/10">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-white">Create Your Team</h2>
              <p className="text-sm text-muted">You need a team to start competing in the ritual.</p>
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
                Create
              </Button>
            </div>
          </div>
        )}
      </header>

      <BentoGrid />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MatchCard className="md:col-span-2" />
        <LeaderboardPreview />
      </div>
    </div>
  );
}
