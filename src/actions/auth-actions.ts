'use server'

import { cookies } from 'next/headers'
import { LoginSchema, RegisterSchema, LoginInput, RegisterInput } from '@/lib/schemas/auth.schema'

type ActionResponse = {
  error?: string;
  success?: boolean;
};

export async function loginAction(data: LoginInput): Promise<ActionResponse> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');
  
  console.log(`[loginAction] Initiating login for ${data.email}. Target API: ${API_URL}`);

  if (!API_URL) {
    console.error("[loginAction] Configuration Error: NEXT_PUBLIC_API_URL is missing.");
    return { error: "System configuration error" };
  }

  const result = LoginSchema.safeParse(data);

  if (!result.success) {
    console.warn("[loginAction] Validation failed:", result.error.format());
    return { error: "Invalid input data" };
  }

  const { email, password } = result.data;

  const formData = new URLSearchParams();
  formData.append('username', email);
  formData.append('password', password);

  try {
    console.log(`[loginAction] Fetching ${API_URL}/auth/login...`);
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
      cache: 'no-store',
    });

    console.log(`[loginAction] Response status: ${res.status}`);

    if (!res.ok) {
      if (res.status === 401) {
        return { error: "Invalid credentials" };
      }
      const errText = await res.text();
      console.error(`[loginAction] Request failed: ${errText}`);
      return { error: "Something went wrong. Please try again." };
    }

    const tokenData = await res.json();
    
    const cookieStore = await cookies();
    cookieStore.set('session_token', tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    console.log("[loginAction] Login successful, cookie set.");
    return { success: true };
  } catch (err) {
    console.error("[loginAction] Critical Error:", err);
    return { error: "Service unavailable" };
  }
}

export async function registerAction(data: RegisterInput): Promise<ActionResponse> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');
  
  console.log(`[registerAction] Initiating registration for ${data.email}. Target API: ${API_URL}`);

  if (!API_URL) {
    console.error("[registerAction] Configuration Error: NEXT_PUBLIC_API_URL is missing.");
    return { error: "System configuration error" };
  }

  const result = RegisterSchema.safeParse(data);

  if (!result.success) {
    console.warn("[registerAction] Validation failed:", result.error.format());
    return { error: "Invalid input data" };
  }

  try {
    console.log(`[registerAction] Fetching ${API_URL}/auth/register...`);
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result.data),
      cache: 'no-store',
    });

    console.log(`[registerAction] Response status: ${res.status}`);

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("[registerAction] Request failed:", errorData);
        if (res.status === 400 || res.status === 422) {
             return { error: errorData.detail || "Registration failed. Please check your inputs." };
        }
      return { error: "Registration failed. Please try again." };
    }

    console.log("[registerAction] Registration successful.");
    return { success: true };
  } catch (err) {
    console.error("[registerAction] Critical Error:", err);
    return { error: "Service unavailable" };
  }
}
