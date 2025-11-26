import { createClient } from "@supabase/supabase-js";
import { setAuthToken, clearAuthData } from "./auth";

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
