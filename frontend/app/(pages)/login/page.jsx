"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { setAuthToken } from "@/app/utils/auth";
import Input from "@/components/ui/Input/Input";
import { Button } from "@/components/ui/Button/Button";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Use Supabase Auth to sign in
      const { data, error: authError } = await supabase.auth.signInWithPassword(
        {
          email,
          password,
        }
      );

      if (authError) {
        setError(authError.message);
        return;
      }

      if (data.session && data.user) {
        // Store the JWT token and user ID
        setAuthToken(data.session.access_token, data.user.id);

        router.push("/feed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center text-center">
      <div className="trvm-card max-w-md w-full">
        <h1 className="text-h1 font-bold mb-30">Login</h1>

        <form onSubmit={handleLogin} className="space-y-15">
          <div>
            <Input
              id="email"
              type="email"
              aria-label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input w-full text-center placeholder:text-center"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <Input
              id="password"
              type="password"
              aria-label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input w-full text-center placeholder:text-center"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <div className="flex justify-center">
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Continue"}
            </Button>
          </div>
        </form>
        <div className="mt-10 mb-10">
          <span>or</span>
        </div>
        <div className="space-y-20">
          {/* These will be implemented later */}
          <Button variant="secondary">Continue with Google</Button>
          <Button variant="secondary">Continue with Apple</Button>
        </div>

        <p className="mt-25 text-center text-sm">
          Don&apos;t have an account?{" "}
          <a href="/onboarding/step1" className="text-cyan-500">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
