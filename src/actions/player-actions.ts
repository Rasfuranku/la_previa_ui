'use server'

import { PlayerSearchInput, PlayerUpdateInput, PlayerResponse } from '@/lib/schemas/player.schema'

type ActionResponse<T> = {
  data?: T;
  error?: string;
  success?: boolean;
};

const getApiUrl = () => process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');

export async function searchPlayersAction(params: PlayerSearchInput): Promise<ActionResponse<PlayerResponse[]>> {
  const API_URL = getApiUrl();
  if (!API_URL) return { error: "System configuration error" };

  const queryParams = new URLSearchParams();
  if (params.current_team) queryParams.append('current_team', params.current_team);
  if (params.position_id) queryParams.append('position_id', params.position_id.toString());
  if (params.price) queryParams.append('price', params.price.toString());
  if (params.form) queryParams.append('form', params.form.toString());
  if (params.medical_status) queryParams.append('medical_status', params.medical_status);
  queryParams.append('limit', params.limit.toString());
  queryParams.append('offset', params.offset.toString());

  try {
    const res = await fetch(`${API_URL}/players/search?${queryParams.toString()}`, {
      cache: 'no-store',
    });

    if (!res.ok) return { error: "Failed to fetch players" };
    const data = await res.json();
    return { data, success: true };
  } catch (err) {
    return { error: "Service unavailable" };
  }
}

export async function getPlayerAction(playerId: number): Promise<ActionResponse<PlayerResponse>> {
  const API_URL = getApiUrl();
  if (!API_URL) return { error: "System configuration error" };

  try {
    const res = await fetch(`${API_URL}/players/${playerId}`, {
      cache: 'no-store',
    });

    if (!res.ok) return { error: "Failed to fetch player" };
    const data = await res.json();
    if (data.error) return { error: data.error };
    return { data, success: true };
  } catch (err) {
    return { error: "Service unavailable" };
  }
}

export async function transferPlayerAction(playerId: number, data: PlayerUpdateInput): Promise<ActionResponse<PlayerResponse>> {
  const API_URL = getApiUrl();
  if (!API_URL) return { error: "System configuration error" };

  try {
    const res = await fetch(`${API_URL}/players/transfer/${playerId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      cache: 'no-store',
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        return { error: errorData.detail || "Transfer operation failed" };
    }
    const result = await res.json();
    return { data: result, success: true };
  } catch (err) {
    return { error: "Service unavailable" };
  }
}

export async function getActivePlayersByFanaticIdAction(fanaticId: number): Promise<ActionResponse<PlayerResponse[]>> {
  const API_URL = getApiUrl();
  if (!API_URL) return { error: "System configuration error" };

  try {
    const res = await fetch(`${API_URL}/players/fanatic/${fanaticId}`, {
      cache: 'no-store',
    });

    if (!res.ok) return { error: "Failed to fetch players" };
    const data = await res.json();
    return { data, success: true };
  } catch (err) {
    return { error: "Service unavailable" };
  }
}

export async function calculateMatchPointsAction(matchId: number): Promise<ActionResponse<{ message: string }>> {
  const API_URL = getApiUrl();
  if (!API_URL) return { error: "System configuration error" };

  try {
    const res = await fetch(`${API_URL}/players/match/points/${matchId}`, {
      cache: 'no-store',
    });

    if (!res.ok) return { error: "Failed to calculate points" };
    const data = await res.json();
    return { data, success: true };
  } catch (err) {
    return { error: "Service unavailable" };
  }
}
