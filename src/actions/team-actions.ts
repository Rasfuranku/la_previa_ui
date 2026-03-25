'use server'

import { TeamFanaticResponse, TeamFanaticCreateInput } from '@/lib/schemas/team.schema'

type ActionResponse<T> = {
  data?: T;
  error?: string;
  success?: boolean;
};

const getApiUrl = () => process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');

export async function getTeamFanaticAction(fanId: number): Promise<ActionResponse<TeamFanaticResponse>> {
  const API_URL = getApiUrl();
  if (!API_URL) return { error: "System configuration error" };

  try {
    const res = await fetch(`${API_URL}/fan/team/${fanId}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
        if (res.status === 404) return { error: "Team not found" };
        return { error: "Failed to fetch team data" };
    }
    
    const data = await res.json();
    return { data, success: true };
  } catch (err) {
    return { error: "Service unavailable" };
  }
}

export async function createTeamFanaticAction(data: TeamFanaticCreateInput): Promise<ActionResponse<TeamFanaticResponse>> {
  const API_URL = getApiUrl();
  if (!API_URL) return { error: "System configuration error" };

  try {
    const res = await fetch(`${API_URL}/fan/team/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      cache: 'no-store',
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        return { error: errorData.detail || "Failed to create team" };
    }
    
    const result = await res.json();
    return { data: result, success: true };
  } catch (err) {
    return { error: "Service unavailable" };
  }
}
