'use server'

import { MatchIncidentResponse, MatchLineupResponse, PlayerMatchStatsResponse } from '@/lib/schemas/sofascore.schema'

type ActionResponse<T> = {
  data?: T;
  error?: string;
  success?: boolean;
};

const getApiUrl = () => process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');

export async function syncSofaDataAction(): Promise<ActionResponse<any>> {
  const API_URL = getApiUrl();
  if (!API_URL) return { error: "System configuration error" };

  try {
    const res = await fetch(`${API_URL}/sofascore/sync`, {
      method: 'POST',
      cache: 'no-store',
    });

    if (!res.ok) return { error: "Failed to sync SofaScore data" };
    const data = await res.json();
    return { data, success: true };
  } catch (err) {
    return { error: "Service unavailable" };
  }
}

export async function getTestIncidentAction(): Promise<ActionResponse<MatchIncidentResponse>> {
  const API_URL = getApiUrl();
  if (!API_URL) return { error: "System configuration error" };

  try {
    const res = await fetch(`${API_URL}/sofascore/test/incident`, {
      cache: 'no-store',
    });

    if (!res.ok) return { error: "No incidents found" };
    const data = await res.json();
    return { data, success: true };
  } catch (err) {
    return { error: "Service unavailable" };
  }
}

export async function getTestLineupAction(): Promise<ActionResponse<MatchLineupResponse>> {
  const API_URL = getApiUrl();
  if (!API_URL) return { error: "System configuration error" };

  try {
    const res = await fetch(`${API_URL}/sofascore/test/lineup`, {
      cache: 'no-store',
    });

    if (!res.ok) return { error: "No lineups found" };
    const data = await res.json();
    return { data, success: true };
  } catch (err) {
    return { error: "Service unavailable" };
  }
}

export async function getTestPlayerStatsAction(): Promise<ActionResponse<PlayerMatchStatsResponse>> {
  const API_URL = getApiUrl();
  if (!API_URL) return { error: "System configuration error" };

  try {
    const res = await fetch(`${API_URL}/sofascore/test/player_stats`, {
      cache: 'no-store',
    });

    if (!res.ok) return { error: "No player stats found" };
    const data = await res.json();
    return { data, success: true };
  } catch (err) {
    return { error: "Service unavailable" };
  }
}
