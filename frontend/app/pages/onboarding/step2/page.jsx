"use client";

import React from "react";
import { useOnboarding } from "@/app/utils/userOnobardingContext";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/Button";

export default function Step2() {
  const router = useRouter();
  const { userData, updateUser } = useOnboarding();

  const handleNext = () => {
    router.push("/pages/onboarding/step3");
  };

  return (
    <section className="trvm-card max-w-xl mx-auto flex flex-col text-c">
      <h1 className="heading-1 mb-4">Step 2 — Sign up info</h1>
      <p className="subtitle mb-6">Enter email and password to continue</p>

      <input
        className="w-full border-muted rounded-button p-4 mb-4"
        placeholder="Enter your email"
        value={userData.email}
        onChange={(e) => updateUser({ email: e.target.value })}
      />

      <input
        className="w-full border-muted rounded-button p-4 mb-6"
        placeholder="Enter your password"
        type="password"
        value={userData.password}
        onChange={(e) => updateUser({ password: e.target.value })}
      />

      <div className="flex flex-col gap-10">
        <Button
          className="btn-outlined"
          onClick={() => {
            /* google signup */
          }}
        >
          Sign up with Google
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            /* apple signup */
          }}
        >
          Sign up with Apple
        </Button>
      </div>

      <div className="mt-6">
        <Button variant="primary" onClick={handleNext} className="ml-4">
          Continue
        </Button>
      </div>
    </section>
  );
}
