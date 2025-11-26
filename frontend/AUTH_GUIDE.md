# Authentication System Documentation

## Overview

This project uses **Supabase Auth** for authentication with **JWT tokens** stored in `localStorage`. The backend validates JWT tokens using Supabase's authentication middleware.

---

## How It Works

### 1. **User Registration (Signup)**

When a user completes the onboarding flow (`/pages/onboarding/step6`):

1. User data is sent to Supabase Auth via `supabase.auth.signUp()`
2. Supabase returns:
   - User ID
   - Access token (JWT)
   - Session data
3. The JWT token and user ID are stored in `localStorage`:
   ```javascript
   localStorage.setItem("jwt_token", accessToken);
   localStorage.setItem("user_id", userId);
   ```
4. User data is sent to backend API at `/user/create`

### 2. **User Login**

When a user logs in (`/pages/login`):

1. Credentials sent to Supabase via `signInWithPassword()`
2. On success, JWT token and user ID are stored in `localStorage`
3. User is redirected to the main app

### 3. **Making Authenticated API Requests**

For any protected backend endpoint, the JWT token is sent in the `Authorization` header:

```javascript
Authorization: Bearer <jwt_token>
```

#### Example Using the `authenticatedFetch` Helper:

```javascript
import { authenticatedFetch } from "@/app/utils/auth";

const response = await authenticatedFetch("http://localhost:3001/user/123", {
  method: "GET",
});
```

#### Example Using the API Utility:

```javascript
import { getUserProfile } from "@/app/utils/api";

const userProfile = await getUserProfile(userId);
```

### 4. **Backend Token Validation**

The backend middleware (`backend/middleware/auth.js`) validates tokens:

1. Extracts token from `Authorization: Bearer <token>` header
2. Validates token with Supabase: `supabase.auth.getUser(token)`
3. If valid, attaches `userId` to request: `req.userId = user.id`
4. Protected routes can access `req.userId`

---

## Utility Files

### `app/utils/auth.js`

Core authentication utilities:

- `setAuthToken(token, userId)` - Store auth data in localStorage
- `getAuthToken()` - Retrieve JWT token
- `getUserId()` - Retrieve user ID
- `clearAuthData()` - Remove auth data (logout)
- `isAuthenticated()` - Check if user is logged in
- `authenticatedFetch(url, options)` - Make authenticated API requests

### `app/utils/supabaseClient.js`

Supabase client with helper functions:

- `supabase` - Supabase client instance
- `signInWithPassword(email, password)` - Login and store tokens
- `signOut()` - Logout and clear tokens

### `app/utils/api.js`

Backend API wrappers:

- `createUser(userData)` - Create new user (no auth required)
- `getUserProfile(userId)` - Get user profile (requires auth)
- `updateUserProfile(userId, userData)` - Update profile (requires auth)

---

## Protected Routes Example

### Backend Route Protection:

```javascript
import { requireAuth } from "../middleware/auth.js";

// Protected route
router.get("/user/:id", requireAuth, async (req, res) => {
  // req.userId is available here after authentication
  const userId = req.userId;
  // ... handle request
});
```

### Frontend Protected Component:

```javascript
"use client";

import { useEffect, useState } from "react";
import { isAuthenticated, getUserId } from "@/app/utils/auth";
import { getUserProfile } from "@/app/utils/api";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      router.push("/pages/login");
      return;
    }

    // Fetch user profile
    const fetchProfile = async () => {
      const userId = getUserId();
      const data = await getUserProfile(userId);
      setProfile(data);
    };

    fetchProfile();
  }, [router]);

  return <div>{/* Display profile */}</div>;
}
```

---

## Storage Details

### LocalStorage Keys:

- `jwt_token` - JWT access token from Supabase
- `user_id` - User's unique ID from Supabase Auth

### Token Format:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Security Notes

1. **JWT tokens are stored in localStorage** - This is secure for SPAs but be aware of XSS risks
2. **Tokens expire** - Supabase handles token refresh automatically
3. **HTTPS required** - Always use HTTPS in production
4. **Never expose tokens** - Don't log tokens or send them in URLs
5. **Validate on backend** - Always validate tokens on the server, never trust client-side auth

---

## Testing

### Test Signup Flow:

1. Navigate to `/pages/onboarding/step1`
2. Complete all steps
3. Check browser console for: "Auth data stored in localStorage"
4. Check localStorage in DevTools for `jwt_token` and `user_id`

### Test Login Flow:

1. Navigate to `/pages/login`
2. Enter credentials
3. Check localStorage for tokens
4. Should redirect to home page

### Test Authenticated API Call:

```javascript
import { getUserProfile } from "@/app/utils/api";
import { getUserId } from "@/app/utils/auth";

const userId = getUserId();
const profile = await getUserProfile(userId);
console.log(profile);
```

---

## Troubleshooting

### "No authentication token found" Error

- User not logged in
- Token cleared from localStorage
- Check: `localStorage.getItem("jwt_token")`

### "Invalid or expired token" Error (401)

- Token expired
- Token invalid
- Solution: Re-login to get new token

### CORS Errors

- Backend must allow requests from frontend origin
- Check backend CORS configuration

---

## Next Steps

- [ ] Add token refresh logic
- [ ] Implement "Remember me" functionality
- [ ] Add logout button in navigation
- [ ] Create protected route wrapper component
- [ ] Add loading states for auth checks
