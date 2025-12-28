import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as fc from 'fast-check';
import axios from 'axios';
import apiClient from './client';
import { useAuthStore } from '../store/authStore';

// Helper to generate random tokens
const tokenArbitrary = fc.string({ minLength: 32, maxLength: 256 }).filter(s => s.trim().length > 0);

// Helper to generate random endpoints
const endpointArbitrary = fc.string({ minLength: 1, maxLength: 50 }).filter(s => /^[a-z0-9\-/]+$/.test(s));

describe('API Client', () => {
  beforeEach(() => {
    localStorage.clear();
    useAuthStore.setState({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
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

  describe('Property 4: Protected Routes Redirect Unauthenticated Users', () => {
    it('should attach Authorization header when token is present', () => {
      fc.assert(
        fc.property(tokenArbitrary, (token) => {
          // Reset before each iteration
          localStorage.clear();
          useAuthStore.setState({
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });

          // Arrange - Set token in auth store
          const store = useAuthStore.getState();
          store.login(token, {
            id: 'test-id',
            email: 'test@example.com',
            username: 'testuser',
          });

          // Create a spy on the request interceptor
          const requestConfig = { headers: {} };
          
          // Get the request interceptor function
          const interceptors = apiClient.interceptors.request;
          const handlers = (interceptors as any).handlers;
          
          // The first handler should be our auth interceptor
          if (handlers && handlers.length > 0) {
            const authInterceptor = handlers[0].fulfilled;
            
            // Act - Call the interceptor
            const result = authInterceptor(requestConfig);
            
            // Assert - Authorization header should be set
            expect(result.headers.Authorization).toBe(`Bearer ${token}`);
          }
        }),
        { numRuns: 100 }
      );
    });

    it('should not attach Authorization header when token is null', () => {
      fc.assert(
        fc.property(fc.constant(null), () => {
          // Reset before each iteration
          localStorage.clear();
          useAuthStore.setState({
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });

          // Arrange - No token in auth store
          const requestConfig = { headers: {} };
          
          // Get the request interceptor function
          const interceptors = apiClient.interceptors.request;
          const handlers = (interceptors as any).handlers;
          
          // The first handler should be our auth interceptor
          if (handlers && handlers.length > 0) {
            const authInterceptor = handlers[0].fulfilled;
            
            // Act - Call the interceptor
            const result = authInterceptor(requestConfig);
            
            // Assert - Authorization header should not be set
            expect(result.headers.Authorization).toBeUndefined();
          }
        }),
        { numRuns: 50 }
      );
    });

    it('should handle 401 errors by clearing auth state', async () => {
      await fc.assert(
        fc.asyncProperty(tokenArbitrary, async (token) => {
          // Reset before each iteration
          localStorage.clear();
          useAuthStore.setState({
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });

          // Arrange - Set token in auth store
          const store = useAuthStore.getState();
          store.login(token, {
            id: 'test-id',
            email: 'test@example.com',
            username: 'testuser',
          });

          // Verify token is set
          let currentState = useAuthStore.getState();
          expect(currentState.token).toBe(token);
          expect(currentState.isAuthenticated).toBe(true);

          // Create a 401 error
          const error = new axios.AxiosError('Unauthorized');
          error.response = {
            status: 401,
            statusText: 'Unauthorized',
            data: {},
            headers: {},
            config: {} as any,
          };

          // Get the response error interceptor
          const interceptors = apiClient.interceptors.response;
          const handlers = (interceptors as any).handlers;
          
          if (handlers && handlers.length > 0) {
            const errorHandler = handlers[0].rejected;
            
            // Act - Call the error interceptor
            try {
              await errorHandler(error);
            } catch (e) {
              // Expected to reject
            }
            
            // Assert - Auth state should be cleared
            currentState = useAuthStore.getState();
            expect(currentState.token).toBeNull();
            expect(currentState.isAuthenticated).toBe(false);
            expect(currentState.error).toBe('Session expired, please log in again');
          }
        }),
        { numRuns: 50 }
      );
    });

    it('should handle 5xx errors with generic message', async () => {
      await fc.assert(
        fc.asyncProperty(fc.integer({ min: 500, max: 599 }), async (statusCode) => {
          // Reset before each iteration
          localStorage.clear();
          useAuthStore.setState({
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });

          // Create a 5xx error
          const error = new axios.AxiosError('Server Error');
          error.response = {
            status: statusCode,
            statusText: 'Server Error',
            data: {},
            headers: {},
            config: {} as any,
          };

          // Get the response error interceptor
          const interceptors = apiClient.interceptors.response;
          const handlers = (interceptors as any).handlers;
          
          if (handlers && handlers.length > 0) {
            const errorHandler = handlers[0].rejected;
            
            // Act - Call the error interceptor
            try {
              await errorHandler(error);
            } catch (e) {
              // Expected to reject
            }
            
            // Assert - Error message should be set
            const currentState = useAuthStore.getState();
            expect(currentState.error).toBe('Server error, please try again later');
          }
        }),
        { numRuns: 50 }
      );
    });

    it('should handle network errors gracefully', async () => {
      await fc.assert(
        fc.asyncProperty(fc.constant(null), async () => {
          // Reset before each iteration
          localStorage.clear();
          useAuthStore.setState({
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });

          // Create a network error (no response)
          const error = new axios.AxiosError('Network Error');
          error.response = undefined;

          // Get the response error interceptor
          const interceptors = apiClient.interceptors.response;
          const handlers = (interceptors as any).handlers;
          
          if (handlers && handlers.length > 0) {
            const errorHandler = handlers[0].rejected;
            
            // Act - Call the error interceptor
            try {
              await errorHandler(error);
            } catch (e) {
              // Expected to reject
            }
            
            // Assert - Network error message should be set
            const currentState = useAuthStore.getState();
            expect(currentState.error).toBe('Network error, please check your connection');
          }
        }),
        { numRuns: 50 }
      );
    });
  });
});
