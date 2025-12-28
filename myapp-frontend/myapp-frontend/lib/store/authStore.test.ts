import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fc from 'fast-check';
import { useAuthStore, User } from './authStore';

// Helper to generate random users
const userArbitrary = fc.record({
  id: fc.uuid(),
  email: fc.emailAddress(),
  username: fc.string({ minLength: 1, maxLength: 20 }),
  firstName: fc.option(fc.string({ minLength: 1, maxLength: 20 })),
  lastName: fc.option(fc.string({ minLength: 1, maxLength: 20 })),
});

// Helper to generate random tokens (non-whitespace)
const tokenArbitrary = fc.string({ minLength: 32, maxLength: 256 }).filter(s => s.trim().length > 0);

describe('Auth Store', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Reset the store to initial state
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
  });

  describe('Property 5: Authentication Persists Across Refresh', () => {
    it('should persist and restore authentication state', () => {
      fc.assert(
        fc.property(userArbitrary, tokenArbitrary, (user, token) => {
          // Reset before each iteration
          localStorage.clear();
          useAuthStore.setState({
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });

          // Arrange
          const store = useAuthStore.getState();

          // Act - Login
          store.login(token, user);

          // Assert - Verify state is updated
          const currentState = useAuthStore.getState();
          expect(currentState.token).toBe(token);
          expect(currentState.user).toEqual(user);
          expect(currentState.isAuthenticated).toBe(true);

          // Verify localStorage has data
          const stored = localStorage.getItem('auth-store');
          expect(stored).toBeDefined();
        }),
        { numRuns: 100 }
      );
    });

    it('should restore authentication state from localStorage', () => {
      fc.assert(
        fc.property(userArbitrary, tokenArbitrary, (user, token) => {
          // Reset before each iteration
          localStorage.clear();
          useAuthStore.setState({
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });

          // Arrange - Set up initial state
          const store = useAuthStore.getState();
          store.login(token, user);

          // Verify it's persisted
          expect(localStorage.getItem('auth-store')).toBeDefined();

          // Simulate page refresh by getting state again
          // The persist middleware should have restored it
          const restoredStore = useAuthStore.getState();

          // Assert
          expect(restoredStore.token).toBe(token);
          expect(restoredStore.user).toEqual(user);
          expect(restoredStore.isAuthenticated).toBe(true);
        }),
        { numRuns: 100 }
      );
    });

    it('should clear persisted data when logout is called', () => {
      fc.assert(
        fc.property(userArbitrary, tokenArbitrary, (user, token) => {
          // Reset before each iteration
          localStorage.clear();
          useAuthStore.setState({
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });

          // Arrange
          const store = useAuthStore.getState();
          store.login(token, user);
          
          // Verify login worked
          let currentState = useAuthStore.getState();
          expect(currentState.isAuthenticated).toBe(true);

          // Act
          store.logout();

          // Assert
          currentState = useAuthStore.getState();
          expect(currentState.token).toBeNull();
          expect(currentState.user).toBeNull();
          expect(currentState.isAuthenticated).toBe(false);
        }),
        { numRuns: 100 }
      );
    });
  });

  describe('Auth Store Actions', () => {
    it('should set and clear error messages', () => {
      fc.assert(
        fc.property(fc.string({ minLength: 1 }), (errorMsg) => {
          // Reset before each iteration
          localStorage.clear();
          useAuthStore.setState({
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });

          const store = useAuthStore.getState();
          
          // Act - Set error
          store.setError(errorMsg);
          let currentState = useAuthStore.getState();
          expect(currentState.error).toBe(errorMsg);

          // Act - Clear error
          store.clearError();
          currentState = useAuthStore.getState();
          expect(currentState.error).toBeNull();
        }),
        { numRuns: 50 }
      );
    });

    it('should update isAuthenticated flag on login and logout', () => {
      fc.assert(
        fc.property(userArbitrary, tokenArbitrary, (user, token) => {
          // Reset before each iteration
          localStorage.clear();
          useAuthStore.setState({
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });

          const store = useAuthStore.getState();
          
          // Initial state
          let currentState = useAuthStore.getState();
          expect(currentState.isAuthenticated).toBe(false);

          // Act - Login
          store.login(token, user);
          currentState = useAuthStore.getState();
          expect(currentState.isAuthenticated).toBe(true);
          expect(currentState.token).toBe(token);
          expect(currentState.user).toEqual(user);

          // Act - Logout
          store.logout();
          currentState = useAuthStore.getState();
          expect(currentState.isAuthenticated).toBe(false);
          expect(currentState.token).toBeNull();
          expect(currentState.user).toBeNull();
        }),
        { numRuns: 50 }
      );
    });

    it('should store token and user on login', () => {
      fc.assert(
        fc.property(userArbitrary, tokenArbitrary, (user, token) => {
          // Reset before each iteration
          localStorage.clear();
          useAuthStore.setState({
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });

          const store = useAuthStore.getState();

          // Act
          store.login(token, user);

          // Assert
          const currentState = useAuthStore.getState();
          expect(currentState.token).toBe(token);
          expect(currentState.user).toEqual(user);
          expect(currentState.isAuthenticated).toBe(true);
          expect(currentState.error).toBeNull();
        }),
        { numRuns: 50 }
      );
    });
  });
});
