import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { loginAction, registerAction } from './auth-actions';

// Mock cookies
vi.mock('next/headers', () => ({
  cookies: vi.fn(() => ({
    set: vi.fn(),
  })),
}));

// Mock fetch
global.fetch = vi.fn();

describe('Auth Actions Payload', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
    process.env.NEXT_PUBLIC_API_URL = 'http://mock-api';
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.clearAllMocks();
  });

  it('loginAction sends correct body format', async () => {
    // Mock successful fetch
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ access_token: 'fake-token' }),
    } as Response);

    await loginAction({
      email: 'test@example.com',
      password: 'password123',
    });

    const fetchCalls = vi.mocked(global.fetch).mock.calls;
    expect(fetchCalls.length).toBe(1);
    const [url, options] = fetchCalls[0];
    
    expect(url).toBe('http://mock-api/auth/login');
    expect(options).toBeDefined();
    
    // Verify headers
    expect(options?.headers).toEqual(expect.objectContaining({
        'Content-Type': 'application/x-www-form-urlencoded',
    }));

    // Verify body is stringified URLSearchParams
    const body = options?.body;
    expect(typeof body).toBe('string');
    expect(body).toContain('username=test%40example.com');
    expect(body).toContain('password=password123');
  });

  it('registerAction sends correct JSON body', async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    } as Response);

    await registerAction({
        email: 'new@example.com',
        password: 'securepassword',
    });

    const fetchCalls = vi.mocked(global.fetch).mock.calls;
    expect(fetchCalls.length).toBe(1);
    const [url, options] = fetchCalls[0];

    expect(url).toBe('http://mock-api/auth/register');
    expect(options?.headers).toEqual(expect.objectContaining({
        'Content-Type': 'application/json',
    }));
    
    expect(options?.body).toBe(JSON.stringify({
        email: 'new@example.com',
        password: 'securepassword',
    }));
  });
});
