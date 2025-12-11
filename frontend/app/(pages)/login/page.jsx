"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithPassword } from "@/utils/supabaseClient";
import Input from "@/ui/Input/Input";
import { Button } from "@/ui/Button/Button";
import { useBottomNav, useNavbar } from "@/utils/navbarContext";
import Image from "next/image";
import React from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setConfig } = useNavbar();
  useEffect(() => {
    setConfig((prev) => ({
      ...prev,
      type: "login",
      showBack: false,
      showLogo: false,
      visible: false,
    }));
  }, [setConfig]);

  const { setBottomNavConfig } = useBottomNav();
  useEffect(() => {
    setBottomNavConfig((prev) => ({
      ...prev,
      type: "login",
      visible: false,
    }));
  }, [setBottomNavConfig]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Use Supabase Auth to sign in
      const { user, error: authError } = await signInWithPassword(
        email,
        password
      );

      if (authError) {
        setError(authError.message);
        return;
      }

      if (user) {
        router.push("/");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="mt-12 max-w-md w-full h-full flex flex-col items-center justify-center text-center gap-30">
      <h1 className="text-h1">Login</h1>
      <form onSubmit={handleLogin} className="login flex flex-col gap-8 justify-center">

        <Input
          id="email"
          type="email"
          aria-label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border-muted mb-4"
          placeholder="Enter your email"
        />



        <Input
          id="password"
          type="password"
          aria-label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border-muted mb-4"
          placeholder="Enter your password"
        />


        {error && (
          <div className="bg-red-100 border border-error color-error px-4 py-3 rounded">
            {error}
          </div>
        )}
        <div className="flex justify-center mt-24 mb-8">
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Continue"}
          </Button>
        </div>
      </form>
      <div className="flex flex-col items-center justify-center">
        <p>or sign up with</p>
        <div className="flex flex-col gap-10 items-center my-24 w-11/12">
          <Button
            size="lg"
            variant="secondary"
            onClick={() => {
              /* google signup */
            }}
          >
            <span className="flex justify-center gap-8">
              <Image src="/icons/Google.svg" alt="Google Icon" width={20} height={20} className="mr-2" /> Google
            </span>
          </Button>

          <Button
            size="lg"
            variant="secondary"
            onClick={() => {
              /* apple signup */
            }}
          >
            <span className="flex justify-center gap-8">
              <Image src="/icons/Apple.svg" alt="Apple Icon" width={20} height={20} className="mr-2" /> Apple
            </span>
          </Button>
        </div>
      </div>

      <p className="mt-30 text-center text-body">
        Don&apos;t have an account?{" "}
        <a href="/onboarding/step1" className="text-cyan-500">
          Sign up
        </a>
      </p>
    </div>

  );
}
