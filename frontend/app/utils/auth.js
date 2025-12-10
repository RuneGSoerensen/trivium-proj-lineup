import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Sign in user and store auth data
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{user, session, error}>}
 */
export const signInWithPassword = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (data?.session && data?.user) {
    setAuthToken(data.session.access_token, data.user.id);
  }

  return { user: data?.user, session: data?.session, error };
};

/**
 * Sign out user and clear auth data
 */
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  clearAuthData();
  return { error };
};

/**
 * Authentication utility functions for managing JWT tokens and user sessions
 */

/**
 * Store authentication data in localStorage
 * @param {string} token - JWT access token from Supabase
 * @param {string} userId - User ID
 */
export const setAuthToken = (token, userId) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt_token", token);
    localStorage.setItem("user_id", userId);
  }
};

/**
 * Get the stored JWT token
 * @returns {string|null} JWT token or null if not found
 */
export const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("jwt_token");
  }
  return null;
};

/**
 * Get the stored user ID
 * @returns {string|null} User ID or null if not found
 */
export const getUserId = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("user_id");
  }
  return null;
};

/**
 * Clear all authentication data from localStorage
 */
export const clearAuthData = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("user_id");
  }
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if token exists
 */
export const isAuthenticated = () => {
  return !!getAuthToken();
};

/**
 * Make an authenticated API request to the backend
 * @param {string} url - API endpoint URL
 * @param {object} options - Fetch options (method, body, etc.)
 * @returns {Promise<Response>} Fetch response
 */
export const authenticatedFetch = async (url, options = {}) => {
  const token = getAuthToken();

  if (!token) {
    throw new Error("No authentication token found. Please log in.");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  return fetch(url, {
    ...options,
    headers,
  });
};
