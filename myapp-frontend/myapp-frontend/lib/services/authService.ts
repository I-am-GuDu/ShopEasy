import apiClient from '../api/client';
import { useAuthStore, User } from '../store/authStore';

/**
 * Login credentials interface
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Authentication response interface
 */
export interface AuthResponse {
  token: string;
  user: User;
}

/**
 * Authentication service layer
 * Handles all authentication-related API calls and token management
 */
class AuthService {
  /**
   * Login with email and password
   * Calls backend /api/auth/login endpoint
   * @param credentials - User login credentials
   * @returns Promise with auth response containing token and user
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
      const { token, user } = response.data;

      // Store token and user in auth store
      const authStore = useAuthStore.getState();
      authStore.login(token, user);

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Logout the current user
   * Clears auth state and removes stored credentials
   */
  async logout(): Promise<void> {
    try {
      // Call backend logout endpoint if needed
      await apiClient.post('/auth/logout');
    } catch (error) {
      // Even if logout API fails, clear local state
      console.error('Logout API error:', error);
    } finally {
      // Clear auth store
      const authStore = useAuthStore.getState();
      authStore.logout();
      this.clearToken();
    }
  }

  /**
   * Get stored authentication token from localStorage
   * @returns Token string or null if not found
   */
  getStoredToken(): string | null {
    if (typeof window === 'undefined') {
      return null;
    }

    try {
      const stored = localStorage.getItem('auth-store');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Zustand persist middleware stores state directly in the object
        return parsed.token || null;
      }
    } catch (error) {
      console.error('Error retrieving stored token:', error);
    }

    return null;
  }

  /**
   * Clear stored authentication token and user data
   */
  clearToken(): void {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      localStorage.removeItem('auth-store');
    } catch (error) {
      console.error('Error clearing stored token:', error);
    }
  }
}

// Export singleton instance
export const authService = new AuthService();
