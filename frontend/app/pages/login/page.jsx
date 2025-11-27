"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithPassword } from "@/app/utils/supabaseClient";

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
      const {
        user,
        session,
        error: signInError,
      } = await signInWithPassword(email, password);

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      if (user && session) {
        console.log("Login successful!", {
          userId: user.id,
          email: user.email,
        });
        // Redirect to home or dashboard
        router.push("/");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="trvm-card max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6">Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input w-full"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input w-full"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <a href="/pages/onboarding/step1" className="text-cyan-500">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
