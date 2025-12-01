import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.PROJECT_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing required environment variables: SUPABASE_URL and SUPABASE_ANON_KEY must be set"
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function (calls the next middleware/handler)
 */
export async function requireAuth(req, res, next) {
  try {
    // Step 1: Extract the Authorization header
    // Format should be: "Bearer <jwt-token>"
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists
    if (!authHeader) {
      return res.status(401).json({
        error: "Authentication required. Please provide a valid token.",
      });
    }

    // Step 2: Extract the token from the "Bearer <token>" format
    // Split by space and take the second part
    const parts = authHeader.split(" ");
    const scheme = parts[0];
    const token = parts[1];

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({
        error: "Invalid authorization header format. Expected: Bearer <token>",
      });
    }

    // Step 3: Verify the token with Supabase Auth
    // supabase.auth.getUser() validates the JWT and returns the user
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    // Check if token verification failed
    if (error || !user) {
      return res.status(401).json({
        error: "Invalid or expired token. Please log in again.",
      });
    }

    // Step 4: Token is valid! Attach user ID to the request object
    // This makes the user ID available to all route handlers

    req.userId = user.id;

    // Step 5: Call next() to continue to the route handler
    // Without calling next(), the request would hang
    next();
  } catch (error) {
    // Catch any unexpected errors during authentication
    console.error("Authentication error:", error);
    return res.status(401).json({
      error: "Authentication failed. Please try again.",
    });
  }
}

export function fakeAuthAs(userId) {
  return async (req, res, next) => {
    req.userId = userId;
    console.log(`Fake auth as ${userId}`);
    next();
  }
}
