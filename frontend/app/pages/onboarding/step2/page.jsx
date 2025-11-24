"use client";

import React, { useState } from "react";
import { useOnboarding } from "@/app/utils/userOnobardingContext";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/Button";

export default function Step2() {
  const router = useRouter();
  const { userData, updateUser } = useOnboarding();
  const [emailTouched, setEmailTouched] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleNext = () => {
    router.push("/pages/onboarding/step3");
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <section className="trvm-card max-w-xl mx-auto flex flex-col gap-20 items-center text-center">
      <h1 className="heading-1 mb-4">Sign up</h1>
      <p className="subtitle mb-6 w-2/3">
        By continueing you agree to LineUp! Terms of use and Privacy Policy.
      </p>

      <input
        className="w-2/3 border-subtle rounded p-4 mb-4 placeholder:text-center"
        placeholder="Enter your email"
        type="email"
        value={userData.email}
        onChange={(e) => {
          updateUser({ email: e.target.value });
          if (emailTouched && validateEmail(e.target.value)) setEmailError("");
        }}
        onBlur={() => {
          setEmailTouched(true);
          if (!validateEmail(userData.email))
            setEmailError("Please enter a valid email address");
          else setEmailError("");
        }}
      />
      {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}

      <input
        className="w-2/3 border-subtle rounded p-4 mb-6 placeholder:text-center"
        placeholder="Enter your password"
        type="password"
        value={userData.password}
        onChange={(e) => updateUser({ password: e.target.value })}
      />

      <input
        className="w-2/3 border-subtle rounded p-4 mb-6 placeholder:text-center"
        placeholder="Confirm your password"
        type="password"
        value={userData.confirmPassword}
        onChange={(e) => updateUser({ confirmPassword: e.target.value })}
      />

      <div className="mt-6 mb-10">
        <Button
          variant="primary"
          size="sm"
          onClick={handleNext}
          className="mb-15 rounded-full"
          disabled={!validateEmail(userData.email) || !userData.password}
          aria-disabled={!validateEmail(userData.email) || !userData.password}
        >
          Continue
        </Button>

        <p>or</p>
        <div className="flex flex-col gap-20 items-center mt-20">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              /* google signup */
            }}
          >
            Sign up with Google
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              /* apple signup */
            }}
          >
            Sign up with Apple
          </Button>
        </div>
      </div>
    </section>
  );
}
