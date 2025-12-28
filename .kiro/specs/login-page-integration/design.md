# Design Document: Login Page Integration

## Overview

The login page integration provides a secure authentication flow for users to log in to the application. The design leverages existing frontend infrastructure (React Hook Form, Zod validation, Zustand state management, React Query, and Axios) to create a seamless authentication experience. The implementation includes form validation, error handling, loading states, and protected route management.

## Architecture

The login system follows a layered architecture:

```
┌─────────────────────────────────────────────────────────┐
│                    Login Page Component                  │
│  (Form UI, validation feedback, loading states)          │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│              Authentication Service Layer                │
│  (API calls, token management, error handling)           │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│           Zustand Auth Store (Global State)              │
│  (User info, token, auth status, logout action)          │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│              Axios API Client                            │
│  (HTTP requests, interceptors, token injection)          │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│           Django Backend API                             │
│  (/api/auth/login endpoint)                              │
└─────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### 1. Login Page Component (`src/app/login/page.tsx`)

**Purpose**: Main login UI component

**Responsibilities**:
- Render login form with email/username and password fields
- Display validation errors
- Show loading state during submission
- Handle form submission
- Redirect on successful login
- Redirect authenticated users to home

**Key Features**:
- Uses React Hook Form for form state management
- Uses Zod for schema validation
- Displays real-time validation feedback
- Shows loading spinner during API call
- Displays error messages from API responses
- Clears errors when user modifies form

### 2. Authentication Service (`lib/services/authService.ts`)

**Purpose**: Centralized authentication API operations

**Responsibilities**:
- Handle login API requests
- Handle logout operations
- Manage token storage and retrieval
- Provide typed API methods

**Key Methods**:
```typescript
login(credentials: LoginCredentials): Promise<AuthResponse>
logout(): Promise<void>
getStoredToken(): string | null
clearToken(): void
```

### 3. Auth Store (Zustand) (`lib/store/authStore.ts`)

**Purpose**: Global authentication state management

**Responsibilities**:
- Store authentication token
- Store user information
- Track authentication status
- Provide login/logout actions
- Persist state to localStorage

**State Structure**:
```typescript
{
  token: string | null
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login(credentials): Promise<void>
  logout(): void
  setError(error): void
  clearError(): void
  restoreSession(): void
}
```

### 4. Protected Route Wrapper (`lib/components/ProtectedRoute.tsx`)

**Purpose**: Enforce authentication on protected routes

**Responsibilities**:
- Check authentication status
- Redirect unauthenticated users to login
- Store redirect destination
- Render protected component if authenticated

### 5. API Client Configuration (`lib/api/client.ts`)

**Purpose**: Configure Axios with authentication interceptors

**Responsibilities**:
- Set base URL from environment variables
- Attach token to request headers
- Handle token refresh on 401 responses
- Handle global error responses

**Request Interceptor**:
- Adds `Authorization: Bearer {token}` header to all requests

**Response Interceptor**:
- Handles 401 responses by clearing auth state
- Handles 5xx errors with generic messages
- Handles network errors gracefully

## Data Models

### LoginCredentials
```typescript
interface LoginCredentials {
  email: string      // User email or username
  password: string   // User password
}
```

### AuthResponse
```typescript
interface AuthResponse {
  token: string      // JWT or session token
  user: User         // User information
}
```

### User
```typescript
interface User {
  id: string
  email: string
  username: string
  firstName?: string
  lastName?: string
}
```

### LoginFormData (Zod Schema)
```typescript
const loginSchema = z.object({
  email: z.string()
    .min(1, "Email is required")
    .email("Invalid email format"),
  password: z.string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters")
})
```

## Correctness Properties

A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.

### Property 1: Successful Login Stores Token

**For any** valid login credentials, when the backend returns a successful authentication response with a token, the token SHALL be stored in the auth store and accessible in subsequent requests.

**Validates: Requirements 5.1, 5.2**

### Property 2: Failed Login Displays Error

**For any** invalid login credentials, when the backend returns a 401 Unauthorized response, an error message SHALL be displayed to the user and the auth state SHALL remain unauthenticated.

**Validates: Requirements 4.1, 4.4**

### Property 3: Logout Clears Authentication

**For any** authenticated user, when logout is called, the stored token SHALL be cleared, the auth state SHALL be reset to unauthenticated, and subsequent API requests SHALL not include an authentication token.

**Validates: Requirements 6.1, 6.2, 6.4**

### Property 4: Protected Routes Redirect Unauthenticated Users

**For any** protected route, when an unauthenticated user attempts to access it, the application SHALL redirect to the login page and the protected component SHALL not render.

**Validates: Requirements 7.1, 7.4**

### Property 5: Authentication Persists Across Refresh

**For any** user with a valid stored token, when the page is refreshed, the authentication state SHALL be restored from storage and the user SHALL remain logged in.

**Validates: Requirements 8.1, 8.2**

### Property 6: Form Validation Prevents Empty Submission

**For any** login form submission with empty email or password fields, the form submission SHALL be prevented and validation error messages SHALL be displayed.

**Validates: Requirements 2.2, 2.3, 2.4**

### Property 7: Loading State Prevents Duplicate Submissions

**For any** login form submission, while the API request is in progress, the submit button SHALL be disabled and a loading indicator SHALL be visible.

**Validates: Requirements 3.1, 3.2**

### Property 8: Successful Login Redirects to Home

**For any** successful login, the application SHALL redirect the user to the home page or dashboard after authentication completes.

**Validates: Requirements 5.3**

## Error Handling

### Error Types and Responses

1. **Validation Errors** (400 Bad Request)
   - Display field-specific validation messages
   - Highlight invalid fields
   - Allow user to correct and resubmit

2. **Authentication Errors** (401 Unauthorized)
   - Display "Invalid email or password" message
   - Do not reveal which field is incorrect
   - Allow user to retry

3. **Server Errors** (5xx)
   - Display generic "Server error, please try again later"
   - Log detailed error for debugging
   - Allow user to retry

4. **Network Errors**
   - Display "Network error, please check your connection"
   - Allow user to retry
   - Implement exponential backoff for retries

5. **Token Expiration**
   - Detect 401 responses in API interceptor
   - Clear auth state
   - Redirect to login page
   - Display "Session expired, please log in again"

### Error Recovery

- Errors are cleared when user modifies form fields
- Errors are cleared when user navigates away
- Retry mechanism available for network errors
- User can attempt login multiple times

## Testing Strategy

### Unit Tests

Unit tests verify specific examples and edge cases:

1. **Form Validation Tests**
   - Empty email field shows error
   - Invalid email format shows error
   - Empty password field shows error
   - Valid credentials pass validation

2. **Auth Store Tests**
   - Login action updates token and user state
   - Logout action clears token and user state
   - setError action updates error state
   - clearError action removes error message

3. **API Client Tests**
   - Request interceptor adds Authorization header
   - Response interceptor handles 401 errors
   - Network errors are caught and handled

4. **Component Tests**
   - Login form renders with email and password fields
   - Submit button is disabled during loading
   - Error messages display correctly
   - Successful login redirects to home

### Property-Based Tests

Property-based tests verify universal properties across many inputs:

1. **Property 1: Successful Login Stores Token**
   - Generate random valid credentials
   - Mock successful API response
   - Verify token is stored in auth store
   - Verify token is included in subsequent requests

2. **Property 2: Failed Login Displays Error**
   - Generate random invalid credentials
   - Mock 401 API response
   - Verify error message is displayed
   - Verify auth state remains unauthenticated

3. **Property 3: Logout Clears Authentication**
   - Set up authenticated state with token
   - Call logout action
   - Verify token is cleared
   - Verify subsequent requests don't include token

4. **Property 4: Protected Routes Redirect Unauthenticated Users**
   - Generate random protected routes
   - Attempt access without authentication
   - Verify redirect to login page
   - Verify protected component doesn't render

5. **Property 5: Authentication Persists Across Refresh**
   - Set up authenticated state with token
   - Simulate page refresh
   - Verify auth state is restored
   - Verify user remains logged in

6. **Property 6: Form Validation Prevents Empty Submission**
   - Generate random combinations of empty fields
   - Attempt form submission
   - Verify submission is prevented
   - Verify validation errors are displayed

7. **Property 7: Loading State Prevents Duplicate Submissions**
   - Submit login form
   - Verify submit button is disabled during request
   - Verify loading indicator is visible
   - Verify button is re-enabled after response

8. **Property 8: Successful Login Redirects to Home**
   - Submit valid credentials
   - Mock successful API response
   - Verify redirect to home page occurs

### Test Configuration

- Minimum 100 iterations per property test
- Use Vitest for unit testing
- Use fast-check for property-based testing
- Mock API responses using MSW (Mock Service Worker)
- Mock Next.js router for navigation testing
- Tag format: `Feature: login-page-integration, Property {number}: {property_text}`

