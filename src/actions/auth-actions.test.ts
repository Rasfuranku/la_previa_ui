import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { registerAction, loginAction } from './auth-actions';

// Mock cookies
vi.mock('next/headers', () => ({
  cookies: vi.fn(() => ({
    set: vi.fn(),
  })),
}));

// Mock fetch
global.fetch = vi.fn();

describe('Auth Actions', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
    // Set a default mock URL for tests unless overridden
    process.env.NEXT_PUBLIC_API_URL = 'http://mock-api';
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.clearAllMocks();
  });

  it('registerAction returns configuration error when NEXT_PUBLIC_API_URL is missing', async () => {
    // Simulate missing env var
    delete process.env.NEXT_PUBLIC_API_URL;

    const result = await registerAction({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(result.error).toBe("System configuration error");
  });

  it('loginAction returns configuration error when NEXT_PUBLIC_API_URL is missing', async () => {
    delete process.env.NEXT_PUBLIC_API_URL;
    
    const result = await loginAction({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(result.error).toBe("System configuration error");
  });

  it('registerAction calls fetch with correct URL when API_URL is present', async () => {
    // Mock successful fetch
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    } as Response);

    const result = await registerAction({
      email: 'valid@example.com',
      password: 'securepassword',
    });

    expect(result.success).toBe(true);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://mock-api/auth/register',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ email: 'valid@example.com', password: 'securepassword' }),
      })
    );
  });
});