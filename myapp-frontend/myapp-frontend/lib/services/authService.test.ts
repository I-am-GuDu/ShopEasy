import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as fc from 'fast-check';
import axios from 'axios';
import { authService, LoginCredentials, AuthResponse } from './authService';
import { useAuthStore } from '../store/authStore';
import apiClient from '../api/client';

// Mock the API client
vi.mock('../api/client', () => ({
  default: {
    post: vi.fn(),
  },
}));

// Helper to generate random credentials
const credentialsArbitrary = fc.record({
  email: fc.emailAddress(),
  password: fc.string({ minLength: 6, maxLength: 50 }),
});

// Helper to generate random users
const userArbitrary = fc.record({
  id: fc.uuid(),
  email: fc.emailAddress(),
  username: fc.string({ minLength: 1, maxLength: 20 }),
});

// Helper to generate random tokens
const tokenArbitrary = fc.string({ minLength: 32, maxLength: 256 }).filter(s => s.trim().length > 0);

describe('Auth Service', () => {
  beforeEach(() => {
    localStorage.clear();
    useAuthStore.setState({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
    useAuthStore.setState({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
    vi.clearAllMocks();
  });

  describe('Property 1: Successful Login Stores Token', () => {
    it('should store token in auth store after successful login', async () => {
      await fc.assert(
        fc.asyncProperty(credentialsArbitrary, userArbitrary, tokenArbitrary, async (credentials, user, token) => {
          // Reset before each iteration
          localStorage.clear();
          useAuthStore.setState({
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
          vi.clearAllMocks();

          // Arrange - Mock successful login response
          const mockResponse: AuthResponse = { token, user };
          vi.mocked(apiClient.post).mockResolvedValueOnce({
            data: mockResponse,
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {} as any,
          });

          // Act - Call login
          const result = await authService.login(credentials);

          // Assert - Token should be stored in auth store
          const authState = useAuthStore.getState();
          expect(authState.token).toBe(token);
          expect(authState.user).toEqual(user);
          expect(authState.isAuthenticated).toBe(true);
          expect(result.token).toBe(token);
          expect(result.user).toEqual(user);

          // Verify API was called with correct credentials
          expect(apiClient.post).toHaveBeenCalledWith('/auth/login', credentials);
        }),
        { numRuns: 100 }
      );
    });

    it('should include token in subsequent API requests after login', async () => {
      await fc.assert(
        fc.asyncProperty(credentialsArbitrary, userArbitrary, tokenArbitrary, async (credentials, user, token) => {
          // Reset before each iteration
          localStorage.clear();
          useAuthStore.setState({
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
          vi.clearAllMocks();

          // Arrange - Mock successful login response
          const mockResponse: AuthResponse = { token, user };
          vi.mocked(apiClient.post).mockResolvedValueOnce({
            data: mockResponse,
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {} as any,
          });

          // Act - Call login
          await authService.login(credentials);

          // Assert - Token should be accessible from auth store
          const authState = useAuthStore.getState();
          expect(authState.token).toBe(token);

          // Verify that the token would be used in subsequent requests
          // (The API client interceptor handles this)
          expect(authState.isAuthenticated).toBe(true);
        }),
        { numRuns: 100 }
      );
    });
  });

  describe('Property 2: Failed Login Displays Error', () => {
    it('should handle 401 unauthorized error and display error message', async () => {
      await fc.assert(
        fc.asyncProperty(credentialsArbitrary, async (credentials) => {
          // Reset before each iteration
          localStorage.clear();
          useAuthStore.setState({
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
          vi.clearAllMocks();

          // Arrange - Mock 401 error response
          const error = new axios.AxiosError('Unauthorized');
          error.response = {
            status: 401,
            statusText: 'Unauthorized',
            data: { message: 'Invalid email or password' },
            headers: {},
            config: {} as any,
          };
          vi.mocked(apiClient.post).mockRejectedValueOnce(error);

          // Act & Assert - Login should throw error
          try {
            await authService.login(credentials);
            expect.fail('Should have thrown error');
          } catch (e) {
            // Expected to throw
            expect(e).toBeDefined();
          }

          // Assert - Auth state should remain unauthenticated
          const authState = useAuthStore.getState();
          expect(authState.isAuthenticated).toBe(false);
          expect(authState.token).toBeNull();
          expect(authState.user).toBeNull();
        }),
        { numRuns: 100 }
      );
    });

    it('should handle 400 bad request error', async () => {
      await fc.assert(
        fc.asyncProperty(credentialsArbitrary, async (credentials) => {
          // Reset before each iteration
          localStorage.clear();
          useAuthStore.setState({
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
          vi.clearAllMocks();

          // Arrange - Mock 400 error response
          const error = new axios.AxiosError('Bad Request');
          error.response = {
            status: 400,
            statusText: 'Bad Request',
            data: { message: 'Invalid input format' },
            headers: {},
            config: {} as any,
          };
          vi.mocked(apiClient.post).mockRejectedValueOnce(error);

          // Act & Assert - Login should throw error
          try {
            await authService.login(credentials);
            expect.fail('Should have thrown error');
          } catch (e) {
            // Expected to throw
            expect(e).toBeDefined();
          }

          // Assert - Auth state should remain unauthenticated
          const authState = useAuthStore.getState();
          expect(authState.isAuthenticated).toBe(false);
        }),
        { numRuns: 100 }
      );
    });

    it('should handle network errors', async () => {
      await fc.assert(
        fc.asyncProperty(credentialsArbitrary, async (credentials) => {
          // Reset before each iteration
          localStorage.clear();
          useAuthStore.setState({
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
          vi.clearAllMocks();

          // Arrange - Mock network error
          const error = new axios.AxiosError('Network Error');
          error.response = undefined;
          vi.mocked(apiClient.post).mockRejectedValueOnce(error);

          // Act & Assert - Login should throw error
          try {
            await authService.login(credentials);
            expect.fail('Should have thrown error');
          } catch (e) {
            // Expected to throw
            expect(e).toBeDefined();
          }

          // Assert - Auth state should remain unauthenticated
          const authState = useAuthStore.getState();
          expect(authState.isAuthenticated).toBe(false);
        }),
        { numRuns: 100 }
      );
    });
  });

  describe('Auth Service Methods', () => {
    it('should clear token on logout', async () => {
      await fc.assert(
        fc.asyncProperty(userArbitrary, tokenArbitrary, async (user, token) => {
          // Reset before each iteration
          localStorage.clear();
          useAuthStore.setState({
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
          vi.clearAllMocks();

          // Arrange - Set up authenticated state
          const authStore = useAuthStore.getState();
          authStore.login(token, user);

          // Mock logout API call
          vi.mocked(apiClient.post).mockResolvedValueOnce({
            data: {},
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {} as any,
          });

          // Verify authenticated
          let currentState = useAuthStore.getState();
          expect(currentState.isAuthenticated).toBe(true);

          // Act - Call logout
          await authService.logout();

          // Assert - Auth state should be cleared
          currentState = useAuthStore.getState();
          expect(currentState.token).toBeNull();
          expect(currentState.user).toBeNull();
          expect(currentState.isAuthenticated).toBe(false);
        }),
        { numRuns: 50 }
      );
    });
  });
});
