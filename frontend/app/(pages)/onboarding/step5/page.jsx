"use client";

import React, { useState, useEffect } from "react";
import { useOnboarding } from "@/utils/userOnboardingContext";
import { useRouter } from "next/navigation";
import { Button } from "@/ui/Button/Button";

export default function LookingForOptions() {
  const router = useRouter();
  const { canAccessStep, advanceStep, userData, updateUser, maxStepReached } =
    useOnboarding();
  const stepNumber = 5;
  useEffect(() => {
    if (!canAccessStep(stepNumber)) {
      router.push(`/onboarding/step${maxStepReached}`);
    }
  }, [canAccessStep, stepNumber, router, maxStepReached]);
  // Local useState for form Input
  const [formData, setFormData] = useState({
    looking_for: userData.looking_for || null,
  });

  const handleNext = () => {
    updateUser({ looking_for: formData.looking_for });
    advanceStep();
    router.push("/onboarding/step6");
  };
  const options = [
    { key: 1, label: "Connect to fellow musicians" },
    { key: 2, label: "Promote my music" },
    { key: 3, label: "Find a band to play with" },
    { key: 4, label: "Find services for my music" },
  ];

  return (
    <section className="trvm-card max-w-xl mx-auto flex flex-col text-c">
      <h1 className="heading-1 mb-4">I am looking to</h1>

      <div className="flex flex-col gap-2">
        {options.map((opt) => (
          <div className="flex items-center gap-1" key={opt.key}>
            <input
              type="checkbox"
              className="checkbox"
              id={`lookingfor_${opt.key}`}
              checked={formData.looking_for === opt.key}
              onChange={() => setFormData({ looking_for: opt.key })}
            />
            <label
              className="label-text text-base"
              htmlFor={`lookingfor_${opt.key}`}
            >
              {opt.label}
            </label>
            <p className="text-sm text-muted-foreground">&nbsp;</p>
          </div>
        ))}
      </div>

      <Button variant="primary" onClick={handleNext} className="ml-4">
        Continue
      </Button>
    </section>
  );
}
