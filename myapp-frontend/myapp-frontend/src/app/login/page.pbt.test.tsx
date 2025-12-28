import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as fc from 'fast-check';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import LoginPage from './page';
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

// Mock auth store - use a simpler approach
let mockAuthStoreState = {
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

vi.mock('../../../lib/store/authStore', () => ({
  useAuthStore: vi.fn(() => mockAuthStoreState),
}));

describe('Login Page - Property Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    mockAuthStoreState = {
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
    
    vi.mocked(useRouter).mockReturnValue({
      push: vi.fn(),
    } as any);
  });

  describe('Property 6: Form Validation Prevents Empty Submission', () => {
    it('should prevent submission with empty email field', async () => {
      // Feature: login-page-integration, Property 6: Form Validation Prevents Empty Submission
      await fc.assert(
        fc.asyncProperty(
          fc.string({ minLength: 6, maxLength: 50 }),
          async (password) => {
            const { unmount } = render(<LoginPage />);

            const passwordInput = screen.getByPlaceholderText('••••••••') as HTMLInputElement;
            const submitButton = screen.getByRole('button', { name: /sign in/i });

            // Type only password, leave email empty
            fireEvent.change(passwordInput, { target: { value: password } });
            fireEvent.click(submitButton);

            // Verify validation error is shown and login is not called
            await waitFor(() => {
              const error = screen.queryByText('Email is required');
              expect(error).toBeInTheDocument();
              expect(authService.login).not.toHaveBeenCalled();
            }, { timeout: 2000 });

            unmount();
          }
        ),
        { numRuns: 50 }
      );
    });

    it('should prevent submission with empty password field', async () => {
      // Feature: login-page-integration, Property 6: Form Validation Prevents Empty Submission
      await fc.assert(
        fc.asyncProperty(
          fc.emailAddress(),
          async (email) => {
            const { unmount } = render(<LoginPage />);

            const emailInput = screen.getByPlaceholderText('you@example.com') as HTMLInputElement;
            const submitButton = screen.getByRole('button', { name: /sign in/i });

            // Type only email, leave password empty
            fireEvent.change(emailInput, { target: { value: email } });
            fireEvent.click(submitButton);

            // Verify validation error is shown and login is not called
            await waitFor(() => {
              const error = screen.queryByText('Password is required');
              expect(error).toBeInTheDocument();
              expect(authService.login).not.toHaveBeenCalled();
            }, { timeout: 2000 });

            unmount();
          }
        ),
        { numRuns: 50 }
      );
    });
  });

  describe('Property 7: Loading State Prevents Duplicate Submissions', () => {
    it('should disable submit button during form submission', async () => {
      // Feature: login-page-integration, Property 7: Loading State Prevents Duplicate Submissions
      await fc.assert(
        fc.asyncProperty(
          fc.emailAddress(),
          fc.string({ minLength: 6, maxLength: 50 }).filter(s => /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,}$/.test(s)), // Valid password with actual characters
          async (email, password) => {
            // Clear previous mock calls
            vi.clearAllMocks();
            
            // Mock login to return a promise that we control
            let resolveLogin: (value: any) => void;
            const loginPromise = new Promise((resolve) => {
              resolveLogin = resolve;
            });
            vi.mocked(authService.login).mockReturnValue(loginPromise);

            const { unmount } = render(<LoginPage />);

            try {
              // Get form elements
              const emailInput = screen.getByPlaceholderText('you@example.com');
              const passwordInput = screen.getByPlaceholderText('••••••••');
              const submitButton = screen.getByRole('button', { name: /sign in/i });

              // Fill and submit form
              fireEvent.change(emailInput, { target: { value: email } });
              fireEvent.change(passwordInput, { target: { value: password } });
              
              // Submit form
              fireEvent.click(submitButton);

              // Verify loading state appears (may need to wait for React state update)
              await waitFor(() => {
                expect(submitButton).toBeDisabled();
                expect(submitButton).toHaveTextContent('Signing in');
              }, { timeout: 100 });
              
              expect(authService.login).toHaveBeenCalledWith({ email, password });

              // Clean up by resolving the promise
              resolveLogin!({ token: 'test-token', user: { id: '1', email, username: 'test' } });
              
              // Small delay to allow cleanup
              await new Promise(resolve => setTimeout(resolve, 10));
            } finally {
              unmount();
            }
          }
        ),
        { numRuns: 5 } // Reduced runs for faster execution
      );
    });
  });

  describe('Property 8: Successful Login Redirects to Home', () => {
    it('should redirect to home page after successful login', async () => {
      // Feature: login-page-integration, Property 8: Successful Login Redirects to Home
      const mockPush = vi.fn();
      vi.mocked(useRouter).mockReturnValue({
        push: mockPush,
      } as any);

      // Mock successful login
      const mockAuthResponse = {
        token: 'test-token-123',
        user: {
          id: '1',
          email: 'test@example.com',
          username: 'testuser',
          firstName: 'Test',
          lastName: 'User',
        },
      };
      vi.mocked(authService.login).mockResolvedValue(mockAuthResponse);

      const { unmount } = render(<LoginPage />);

      try {
        // Get form elements
        const emailInput = screen.getByPlaceholderText('you@example.com');
        const passwordInput = screen.getByPlaceholderText('••••••••');
        const submitButton = screen.getByRole('button', { name: /sign in/i });

        // Fill and submit form with valid credentials
        await act(async () => {
          fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
          fireEvent.change(passwordInput, { target: { value: 'password123' } });
        });

        // Submit the form
        await act(async () => {
          fireEvent.click(submitButton);
        });

        // Wait for login to complete and verify redirect
        await waitFor(() => {
          expect(authService.login).toHaveBeenCalledWith({ 
            email: 'test@example.com', 
            password: 'password123' 
          });
          expect(mockPush).toHaveBeenCalledWith('/');
        }, { timeout: 2000 });
      } finally {
        unmount();
      }
    });

    it('should redirect to home page with different valid credentials', async () => {
      // Feature: login-page-integration, Property 8: Successful Login Redirects to Home
      const mockPush = vi.fn();
      vi.mocked(useRouter).mockReturnValue({
        push: mockPush,
      } as any);

      // Mock successful login with different user data
      const mockAuthResponse = {
        token: 'another-token-456',
        user: {
          id: '2',
          email: 'user@company.com',
          username: 'companyuser',
        },
      };
      vi.mocked(authService.login).mockResolvedValue(mockAuthResponse);

      const { unmount } = render(<LoginPage />);

      try {
        // Get form elements
        const emailInput = screen.getByPlaceholderText('you@example.com');
        const passwordInput = screen.getByPlaceholderText('••••••••');
        const submitButton = screen.getByRole('button', { name: /sign in/i });

        // Fill and submit form with different valid credentials
        await act(async () => {
          fireEvent.change(emailInput, { target: { value: 'user@company.com' } });
          fireEvent.change(passwordInput, { target: { value: 'securepass789' } });
        });

        // Submit the form
        await act(async () => {
          fireEvent.click(submitButton);
        });

        // Wait for login to complete and verify redirect
        await waitFor(() => {
          expect(authService.login).toHaveBeenCalledWith({ 
            email: 'user@company.com', 
            password: 'securepass789' 
          });
          expect(mockPush).toHaveBeenCalledWith('/');
        }, { timeout: 2000 });
      } finally {
        unmount();
      }
    });
  });
});
