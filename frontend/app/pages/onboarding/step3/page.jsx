"use client";

import React, { useState, useEffect } from "react";
import { useOnboarding } from "@/utils/userOnboardingContext";
import { useRouter } from "next/navigation";
import { Button } from "@ui/Button/Button";

export default function Step3() {
  const router = useRouter();
  const { canAccessStep, advanceStep, userData, updateUser, maxStepReached } =
    useOnboarding();
  const stepNumber = 3;
  useEffect(() => {
    if (!canAccessStep(stepNumber)) {
      router.push(`/pages/onboarding/step${maxStepReached}`);
    }
  }, [canAccessStep, stepNumber, router, maxStepReached]);
  // Local useState for form Input
  const [formData, setFormData] = useState({
    is_musician: userData.is_musician ?? null,
  });

  const handleNext = () => {
    updateUser({ is_musician: formData.is_musician });
    advanceStep();
    router.push("/pages/onboarding/step4");
  };

  return (
    <section className="trvm-card max-w-xl mx-auto flex flex-col text-c">
      <h1 className="heading-1 mb-4">Step 3 — Musician Info</h1>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1">
          <input
            type="checkbox"
            className="checkbox"
            id="musicianTrue"
            checked={formData.is_musician === true}
            onChange={() => setFormData({ is_musician: true })}
          />
          <label className="label-text text-base" htmlFor="musicianTrue">
            I am a musician
          </label>
          <p>I am a musician looking for collaboration and services.</p>
        </div>

        <div className="flex items-center gap-1">
          <input
            type="checkbox"
            className="checkbox"
            id="musicianFalse"
            checked={formData.is_musician === false}
            onChange={() => setFormData({ is_musician: false })}
          />
          <label className="label-text text-base" htmlFor="musicianFalse">
            Not a musician
          </label>
          <p>I want to provide services for musicians.</p>
        </div>
      </div>

      <div className="mt-6">
        <Button variant="primary" onClick={handleNext} className="ml-4">
          Continue
        </Button>
      </div>
    </section>
  );
}
