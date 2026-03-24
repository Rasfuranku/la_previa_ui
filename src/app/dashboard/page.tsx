'use client';

import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { getMeAction } from '@/actions/user-actions';
import { getTeamFanaticAction, createTeamFanaticAction } from '@/actions/team-actions';
import { getActivePlayersByFanaticIdAction, addPlayerToTeamAction, transferPlayerAction } from '@/actions/player-actions';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Automatically redirect to /team for now as it's the primary management screen
    window.location.href = '/team';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  );
}
