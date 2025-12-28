# Implementation Plan: Login Page Integration

## Overview

This implementation plan breaks down the login page integration into discrete, manageable tasks. The tasks follow a logical progression: setting up the authentication infrastructure (store, API client, services), implementing the login page UI, adding protected route handling, and finally implementing comprehensive tests. Each task builds on previous work and validates functionality incrementally.

## Tasks

- [x] 1. Set up authentication store with Zustand
  - Create `lib/store/authStore.ts` with Zustand store for managing auth state
  - Define state interface with token, user, isAuthenticated, isLoading, error fields
  - Implement login, logout, setError, clearError, and restoreSession actions
  - Add localStorage persistence for token and user data
  - _Requirements: 5.1, 5.2, 6.1, 6.2, 6.4, 8.1, 8.2_

- [x] 1.1 Write property test for auth store persistence
  - **Property 5: Authentication Persists Across Refresh**
  - **Validates: Requirements 8.1, 8.2**

- [x] 2. Configure Axios API client with authentication interceptors
  - Create `lib/api/client.ts` with Axios instance configured with base URL from environment
  - Implement request interceptor to attach Authorization header with token
  - Implement response interceptor to handle 401 errors by clearing auth state
  - Implement response interceptor to handle 5xx errors with generic messages
  - Implement response interceptor to handle network errors gracefully
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 5.4_

- [x] 2.1 Write property test for request interceptor
  - **Property 4: Protected Routes Redirect Unauthenticated Users**
  - **Validates: Requirements 7.1, 7.4**

- [x] 3. Create authentication service layer
  - Create `lib/services/authService.ts` with typed API methods
  - Implement `login(credentials)` method that calls backend /api/auth/login endpoint
  - Implement `logout()` method that clears auth state
  - Implement `getStoredToken()` and `clearToken()` helper methods
  - Define TypeScript interfaces for LoginCredentials, AuthResponse, and User
  - _Requirements: 2.5, 5.1, 5.2, 6.1_

- [x] 3.1 Write property test for login API call
  - **Property 1: Successful Login Stores Token**
  - **Validates: Requirements 5.1, 5.2**

- [x] 3.2 Write property test for failed login handling
  - **Property 2: Failed Login Displays Error**
  - **Validates: Requirements 4.1, 4.4**

- [x] 4. Create login page component with form validation
  - Create `src/app/login/page.tsx` with login form UI
  - Use React Hook Form for form state management
  - Define Zod schema for email and password validation
  - Render email input field with validation error display
  - Render password input field with validation error display
  - Render submit button with loading state
  - Render link to registration page
  - _Requirements: 1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 2.4, 3.1, 3.2_

- [x] 4.1 Write unit tests for login form validation
  - Test empty email field shows validation error
  - Test invalid email format shows validation error
  - Test empty password field shows validation error
  - Test valid credentials pass validation
  - _Requirements: 2.2, 2.3, 2.4_

- [x] 4.2 Write property test for form validation
  - **Property 6: Form Validation Prevents Empty Submission**
  - **Validates: Requirements 2.2, 2.3, 2.4**

- [x] 5. Implement login form submission and error handling
  - Add form submission handler to login page
  - Call authService.login() with form credentials
  - Display loading indicator during API request
  - Disable submit button during request
  - Handle successful login response by updating auth store
  - Handle 401 error response with "Invalid email or password" message
  - Handle 400 error response with validation error message
  - Handle 5xx error response with generic server error message
  - Handle network errors with network error message
  - Clear error messages when user modifies form fields
  - _Requirements: 2.5, 3.1, 3.2, 3.3, 3.4, 4.1, 4.2, 4.3, 4.4, 4.5_

- [x] 5.1 Write property test for loading state
  - **Property 7: Loading State Prevents Duplicate Submissions**
  - **Validates: Requirements 3.1, 3.2**

- [x] 5.2 Write property test for error clearing
  - **Property 8: Successful Login Redirects to Home**
  - **Validates: Requirements 5.3**

- [ ] 6. Implement redirect logic after successful login
  - Add redirect to home page after successful login
  - Store original destination URL when redirected to login
  - Redirect to original destination after login if available
  - Use Next.js useRouter for navigation
  - _Requirements: 5.3, 7.2, 7.3_

- [ ] 6.1 Write unit tests for redirect logic
  - Test redirect to home page after successful login
  - Test redirect to original destination if available
  - _Requirements: 5.3, 7.2, 7.3_

- [ ] 7. Implement protected route wrapper component
  - Create `lib/components/ProtectedRoute.tsx` component
  - Check authentication status from auth store
  - Redirect unauthenticated users to login page
  - Store original destination URL for post-login redirect
  - Render protected component if authenticated
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [ ] 7.1 Write property test for protected routes
  - **Property 4: Protected Routes Redirect Unauthenticated Users**
  - **Validates: Requirements 7.1, 7.4**

- [ ] 8. Implement logout functionality
  - Add logout button to header/navigation component
  - Implement logout handler that calls authService.logout()
  - Clear auth store on logout
  - Redirect to login page after logout
  - Display confirmation or success message
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [ ] 8.1 Write property test for logout
  - **Property 3: Logout Clears Authentication**
  - **Validates: Requirements 6.1, 6.2, 6.4**

- [ ] 9. Implement session persistence and restoration
  - Add useEffect hook to restore auth state on app initialization
  - Check for stored token in localStorage on app load
  - Validate stored token with backend if available
  - Restore user information from localStorage
  - Handle expired or invalid tokens by clearing them
  - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [ ] 9.1 Write property test for session restoration
  - **Property 5: Authentication Persists Across Refresh**
  - **Validates: Requirements 8.1, 8.2**

- [ ] 10. Implement user information display in header
  - Update Header component to display logged-in user information
  - Show user name or email in navigation
  - Show logout button when user is authenticated
  - Hide user info and show login link when not authenticated
  - _Requirements: 5.5_

- [ ] 10.1 Write unit tests for header user display
  - Test user information displays when authenticated
  - Test login link displays when not authenticated
  - Test logout button is visible when authenticated
  - _Requirements: 5.5_

- [ ] 11. Checkpoint - Ensure all tests pass
  - Run all unit tests and verify they pass
  - Run all property-based tests and verify they pass
  - Verify no console errors or warnings
  - Ask the user if questions arise

- [ ] 12. Integration testing and manual verification
  - Test complete login flow end-to-end
  - Test redirect to home page after login
  - Test protected route access with and without authentication
  - Test logout functionality
  - Test session persistence across page refresh
  - Test error handling for various API responses
  - _Requirements: All_

- [ ] 12.1 Write integration tests
  - Test complete login flow from form submission to redirect
  - Test protected route access and redirect
  - Test logout and redirect to login
  - Test session restoration after page refresh
  - _Requirements: All_

- [ ] 13. Final checkpoint - Ensure all tests pass and feature is complete
  - Run all tests and verify they pass
  - Verify all requirements are met
  - Ask the user if questions arise

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- All code should follow TypeScript best practices and existing project conventions
- Use existing project dependencies (React Hook Form, Zod, Zustand, Axios, React Query)
- Environment variables should be configured in `.env.local` file

