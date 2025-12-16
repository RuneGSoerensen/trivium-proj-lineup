/**
 * Authentication layer using supabase
 */

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

  return { user: data?.user, session: data?.session, error };
};

/**
 * Sign out user and clear auth data
 * @returns {Promise<{ error: AuthError|null }>} JWT token or null if not found
 */
export const signOut = async () => {
  return await supabase.auth.signOut();
};


/**
 * Get the stored user session token if the user is logged in.
 * @returns {Promise<string|null>} JWT session token or null if not found
 */
export const getAuthToken = async () => {
  const { data, error: _ } = await supabase.auth.getSession();
  return data?.session?.access_token;
};

/**
 * Get the stored user ID if the user is logged in.
 * @returns {Promise<string|null>} User ID or null if not found
 */
export const getUserId = async () => {
  const { data, error: _ } = await supabase.auth.getUser();
  return data?.user?.id;
};

/**
 * Check if user is authenticated.
 * @returns {Promise<boolean>} True if authenticated
 */
export const isAuthenticated = async () => {
  return !!(await getUserId());
};

/**
 * Make an authenticated API request to the backend
 * @param {string} url - API endpoint URL
 * @param {object} options - Fetch options (method, body, etc.)
 * @returns {Promise<Response>} Fetch response
 */
export const authenticatedFetch = async (url, options = {}) => {
  const token = await getAuthToken();

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
