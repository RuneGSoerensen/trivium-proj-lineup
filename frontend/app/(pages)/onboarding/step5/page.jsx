"use client";

import React, { useState, useEffect } from "react";
import { useOnboarding } from "@/utils/userOnboardingContext";
import { useRouter } from "next/navigation";
import { Button } from "@/ui/Button/Button";
import Link from "next/link";
import Input from "@/ui/Input/Input";
import { Tag } from "@/ui/Tag/Tag";

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
    <div className="flex flex-col h-full w-full max-w-270">
      <div className="flex flex-col gap-40 justify-center flex-1">
        <h3 className="text-h3 font-bold">I am looking to</h3>

        <div className="flex flex-col gap-15">
          {options.map((opt) => (
            <Tag
              key={`lookingfor_${opt.key}`}
              label={opt.label}
              checkable={true}
              checked={formData.looking_for === opt.key}
              onCheckChange={() => setFormData({ looking_for: opt.key })}
              onClick={() => setFormData({ looking_for: opt.key })}
              htmlForLabel={`lookingfor_${opt.key}`}
            />
          ))}
        </div>

        <div className="flex flex-col items-center gap-15 self-center pb-4">
          <Button variant="primary" onClick={handleNext} className="w-fit">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
