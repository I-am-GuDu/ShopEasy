import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from './page';
import { useAuthStore } from '../../../lib/store/authStore';
import { authService } from '../../../lib/services/authService';
import { useRouter } from 'next/navigation';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

// Mock auth service
vi.mock('../../../lib/services/authService', () => ({
  authService: {
    login: vi.fn(),
  },
}));

// Mock auth store
vi.mock('../../../lib/store/authStore', () => ({
  useAuthStore: vi.fn(),
}));

describe('Login Page - Form Validation', () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock router
    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
    } as any);

    // Mock auth store - it's a hook that returns the store state
    const mockStore = {
      isAuthenticated: false,
      isLoading: false,
      token: null,
      user: null,
      error: null,
      login: vi.fn(),
      logout: vi.fn(),
      setError: vi.fn(),
      clearError: vi.fn(),
      restoreSession: vi.fn(),
    };
    
    vi.mocked(useAuthStore).mockReturnValue(mockStore as any);
  });

  it('should display validation error when email field is empty', async () => {
    render(<LoginPage />);

    const submitButton = screen.getByRole('button', { name: /sign in/i });
    
    fireEvent.click(submitButton);

    // Wait for validation errors to appear
    await waitFor(() => {
      const emailError = screen.queryByText('Email is required');
      expect(emailError).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('should display validation error when password field is empty', async () => {
    render(<LoginPage />);

    const emailInput = screen.getByPlaceholderText('you@example.com') as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const error = screen.queryByText('Password is required');
      expect(error).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('should display validation error when password is less than 6 characters', async () => {
    render(<LoginPage />);

    const emailInput = screen.getByPlaceholderText('you@example.com') as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText('••••••••') as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: '12345' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const error = screen.queryByText('Password must be at least 6 characters');
      expect(error).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('should pass validation with valid credentials', async () => {
    vi.mocked(authService.login).mockResolvedValueOnce({
      token: 'test-token',
      user: {
        id: '1',
        email: 'test@example.com',
        username: 'testuser',
      },
    });

    render(<LoginPage />);

    const emailInput = screen.getByPlaceholderText('you@example.com') as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText('••••••••') as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('should not submit form with empty email and password', async () => {
    render(<LoginPage />);

    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(authService.login).not.toHaveBeenCalled();
    });
  });
});
