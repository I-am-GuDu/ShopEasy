# Design Document: Frontend-Backend Integration

## Overview

This design outlines the integration between a Next.js frontend and Django REST API backend. The architecture follows modern best practices including centralized API client configuration, token-based authentication, React Query for server state management, and proper error handling. The integration enables secure, efficient communication between the client and server while maintaining separation of concerns.

## Architecture

### System Architecture

```
┌─────────────────────────────────────┐
│     Next.js Frontend (Port 3000)    │
│  ┌───────────────────────────────┐  │
│  │   React Components/Pages      │  │
│  └───────────┬───────────────────┘  │
│              │                       │
│  ┌───────────▼───────────────────┐  │
│  │   React Query Layer           │  │
│  │   (Data Fetching & Caching)   │  │
│  └───────────┬───────────────────┘  │
│              │                       │
│  ┌───────────▼───────────────────┐  │
│  │   API Service Layer           │  │
│  │   (Typed API Functions)       │  │
│  └───────────┬───────────────────┘  │
│              │                       │
│  ┌───────────▼───────────────────┐  │
│  │   Axios Client                │  │
│  │   (HTTP Client + Interceptors)│  │
│  └───────────┬───────────────────┘  │
└──────────────┼───────────────────────┘
               │ HTTP/HTTPS
               │ (JSON)
┌──────────────▼───────────────────────┐
│   Django Backend (Port 8000)         │
│  ┌───────────────────────────────┐  │
│  │   CORS Middleware             │  │
│  └───────────┬───────────────────┘  │
│              │                       │
│  ┌───────────▼───────────────────┐  │
│  │   Django REST Framework       │  │
│  │   (API Views & Serializers)   │  │
│  └───────────┬───────────────────┘  │
│              │                       │
│  ┌───────────▼───────────────────┐  │
│  │   Django ORM                  │  │
│  └───────────┬───────────────────┘  │
│              │                       │
│  ┌───────────▼───────────────────┐  │
│  │   MySQL Database              │  │
│  └───────────────────────────────┘  │
└──────────────────────────────────────┘
```

### Technology Stack

**Frontend:**
- Next.js 14+ with App Router
- React 18+
- TypeScript
- Axios (HTTP client)
- @tanstack/react-query (Server state management)
- Zustand (Client state management for auth)

**Backend:**
- Django 4+
- Django REST Framework
- django-cors-headers
- MySQL database

## Components and Interfaces

### Frontend Directory Structure

```
myapp-frontend/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   └── api/                    # Optional: Next.js API routes
├── lib/
│   ├── api/
│   │   ├── client.ts          # Axios instance configuration
│   │   ├── auth.ts            # Authentication API functions
│   │   └── index.ts           # Export all API functions
│   ├── hooks/
│   │   ├── useAuth.ts         # Authentication hook
│   │   └── useApi.ts          # Generic API hooks
│   ├── store/
│   │   └── authStore.ts       # Auth state management
│   └── types/
│       ├── api.ts             # API request/response types
│       └── auth.ts            # Auth-related types
├── .env.local                  # Local environment variables
├── .env.example                # Example environment variables
└── next.config.js
```

### Backend Configuration

**Django Settings (settings.py):**
```python
INSTALLED_APPS = [
    # ...
    'rest_framework',
    'corsheaders',
    # your apps
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Must be before CommonMiddleware
    'django.middleware.common.CommonMiddleware',
    # ...
]

# CORS Configuration
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    # Add production domain when deployed
]

CORS_ALLOW_CREDENTIALS = True

CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]

CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]

# REST Framework Configuration
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
}
```

## Data Models

### Frontend TypeScript Interfaces

**lib/types/api.ts:**
```typescript
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status: number;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
```

**lib/types/auth.ts:**
```typescript
export interface User {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
}
```

### API Client Configuration

**lib/api/client.ts:**
```typescript
import axios, { AxiosInstance, AxiosError } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor - attach auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - clear token and redirect to login
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

### Authentication Service

**lib/api/auth.ts:**
```typescript
import { apiClient } from './client';
import { LoginCredentials, LoginResponse, RegisterData, User } from '@/lib/types/auth';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/login/', credentials);
    return response.data;
  },

  register: async (data: RegisterData): Promise<User> => {
    const response = await apiClient.post<User>('/auth/register/', data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout/');
    localStorage.removeItem('auth_token');
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<User>('/auth/me/');
    return response.data;
  },
};
```

### React Query Configuration

**app/providers.tsx:**
```typescript
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

### Authentication Store (Zustand)

**lib/store/authStore.ts:**
```typescript
import { create } from 'zustand';
import { User } from '@/lib/types/auth';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  setAuth: (user, token) => {
    localStorage.setItem('auth_token', token);
    set({ user, token, isAuthenticated: true });
  },
  clearAuth: () => {
    localStorage.removeItem('auth_token');
    set({ user: null, token: null, isAuthenticated: false });
  },
}));
```

### Custom Hooks

**lib/hooks/useAuth.ts:**
```typescript
import { useMutation, useQuery } from '@tanstack/react-query';
import { authApi } from '@/lib/api/auth';
import { useAuthStore } from '@/lib/store/authStore';
import { LoginCredentials } from '@/lib/types/auth';

export function useAuth() {
  const { setAuth, clearAuth, isAuthenticated, user } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onSuccess: (data) => {
      setAuth(data.user, data.token);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      clearAuth();
    },
  });

  const { data: currentUser, isLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => authApi.getCurrentUser(),
    enabled: isAuthenticated,
  });

  return {
    user: currentUser || user,
    isAuthenticated,
    isLoading,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    isLoginLoading: loginMutation.isPending,
  };
}
```

## Error Handling

### Frontend Error Handling Strategy

1. **Network Errors**: Display "Unable to connect to server" message
2. **400-499 Errors**: Display specific validation or permission errors from backend
3. **500-599 Errors**: Display generic "Server error" message
4. **Timeout Errors**: Display "Request timed out" message
5. **Axios Interceptor**: Centralized error handling for common scenarios

### Error Display Component

```typescript
// components/ErrorMessage.tsx
interface ErrorMessageProps {
  error: Error | null;
}

export function ErrorMessage({ error }: ErrorMessageProps) {
  if (!error) return null;
  
  return (
    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
      {error.message}
    </div>
  );
}
```

## Testing Strategy

### Frontend Testing

**Unit Tests:**
- Test API client configuration
- Test API service functions with mocked axios
- Test custom hooks with React Testing Library
- Test authentication store state management

**Integration Tests:**
- Test complete authentication flow
- Test API error handling scenarios
- Test token refresh logic

### Backend Testing

**API Tests:**
- Test CORS headers are properly set
- Test authentication endpoints return correct responses
- Test protected endpoints require authentication
- Test error responses have consistent format

### Manual Testing Checklist

1. Start Django backend: `python manage.py runserver`
2. Start Next.js frontend: `npm run dev`
3. Test login flow end-to-end
4. Test authenticated API requests
5. Test logout functionality
6. Test error scenarios (wrong credentials, network errors)
7. Verify CORS headers in browser DevTools

## Environment Configuration

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### Frontend (.env.example)

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### Backend (.env or settings)

```env
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_NAME=your_database
DATABASE_USER=your_user
DATABASE_PASSWORD=your_password
DATABASE_HOST=localhost
DATABASE_PORT=3306
```

## Design Decisions and Rationales

### Axios vs Fetch API
**Decision**: Use Axios
**Rationale**:
- Built-in request/response interceptors
- Automatic JSON transformation
- Better error handling
- Request cancellation support
- Wider browser compatibility

### React Query vs SWR
**Decision**: Use React Query (@tanstack/react-query)
**Rationale**:
- More powerful caching strategies
- Better TypeScript support
- Extensive documentation
- Built-in devtools
- Larger community and ecosystem

### Token Storage
**Decision**: Store auth token in localStorage
**Rationale**:
- Simple implementation
- Persists across browser sessions
- Accessible from interceptors
- Note: For higher security requirements, consider httpOnly cookies

### Zustand vs Context API
**Decision**: Use Zustand for auth state
**Rationale**:
- Minimal boilerplate
- No provider wrapping needed
- Better performance (no unnecessary re-renders)
- Simple API
- Works well with React Query

### CORS Configuration
**Decision**: Configure CORS on Django backend
**Rationale**:
- Necessary for cross-origin requests
- More secure than disabling browser security
- Allows credential sharing
- Production-ready approach
