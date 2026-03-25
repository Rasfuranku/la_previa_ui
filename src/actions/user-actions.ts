'use server'

import { cookies } from 'next/headers'
import { UserResponse } from '@/lib/schemas/auth.schema'

type ActionResponse<T> = {
  data?: T;
  error?: string;
  success?: boolean;
};

const getApiUrl = () => process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');

export async function getMeAction(): Promise<ActionResponse<UserResponse>> {
  const API_URL = getApiUrl();
  if (!API_URL) return { error: "System configuration error" };

  const cookieStore = await cookies();
  const token = cookieStore.get('session_token')?.value;

  if (!token) return { error: "Not authenticated" };

  try {
    const res = await fetch(`${API_URL}/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      cache: 'no-store',
    });

    if (!res.ok) {
        if (res.status === 401) return { error: "Session expired" };
        const errorData = await res.json().catch(() => ({}));
        return { error: errorData.detail || "Failed to fetch user data" };
    }
    
    const data = await res.json();
    return { data, success: true };
  } catch (err) {
    return { error: "Service unavailable" };
  }
}
