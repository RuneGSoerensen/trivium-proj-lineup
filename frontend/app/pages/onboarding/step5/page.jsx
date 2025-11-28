"use client";

import React, { useState, useEffect } from "react";
import { useOnboarding } from "@utils/userOnobardingContext";
import { useRouter } from "next/navigation";
import { Button } from "@ui/Button/Button";
import Link from "next/link";

export default function LookingForOptions() {
  const router = useRouter();
  const { canAccessStep, advanceStep, userData, updateUser } = useOnboarding();
  const stepNumber = 5;
  useEffect(() => {
    if (!canAccessStep(stepNumber)) {
      router.push("/pages/onboarding/step1");
    }
  }, [canAccessStep, stepNumber, router]);
  // Local useState for form Input
  const [formData, setFormData] = useState({
    looking_for: userData.looking_for || null,
  });

  const handleNext = () => {
    updateUser({ looking_for: formData.looking_for });
    advanceStep();
    router.push("/pages/onboarding/step6");
  };
  const options = [
    { key: 1, label: "Connect to fellow musicians" },
    { key: 2, label: "Promote my music" },
    { key: 3, label: "Find a band to play with" },
    { key: 4, label: "Find services for my music" },
  ];

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-col gap-30 justify-center flex-1">
        <h2 className="font-bold">I am looking to</h2>

        <div className="flex flex-col gap-15">
          {options.map((opt) => (
            <div
              className={`flex items-center gap-10 border-2 p-4 rounded-full ${
                formData.looking_for === opt.key
                  ? "border-(--color-primary)"
                  : "border-gray-300"
              }`}
              key={opt.key}
            >
              <input
                type="checkbox"
                className="checkbox rounded-full ml-4 checked:border-(--color-primary) checked:bg-brand-primary"
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

        <div className="flex flex-col items-center gap-15 self-center pb-4">
          <Button
            variant="primary"
            size="sm"
            onClick={handleNext}
            className="w-fit"
          >
            Continue
          </Button>
          <Link
            className="text-sm text-muted-foreground text-center underline underline-offset-4"
            href="/home"
          >
            Skip for now
          </Link>
        </div>
      </div>
    </div>
  );
}
