import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LoginPage from './page';
import * as authActions from '@/actions/auth-actions';

// Mock useRouter
const mockPush = vi.fn();
const mockRefresh = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: mockRefresh,
  }),
}));

// Mock Server Actions
vi.mock('@/actions/auth-actions', () => ({
  loginAction: vi.fn(),
}));

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className }: any) => <div className={className}>{children}</div>,
  },
}));

describe('LoginPage', () => {
  it('handles loading state and displays error messages', async () => {
    // Setup Mock
    const mockLogin = vi.mocked(authActions.loginAction);
    mockLogin.mockImplementation(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
      return { error: 'Invalid credentials' };
    });

    render(<LoginPage />);

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    // Fill form
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Submit
    fireEvent.click(submitButton);

    // Check Loading State
    expect(screen.getByText(/signing in.../i)).toBeDefined();
    expect(submitButton).toBeDisabled();

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeDefined();
    });

    // Check Loading State removed
    expect(screen.getByRole('button', { name: /sign in/i })).toBeEnabled();
  });
});
