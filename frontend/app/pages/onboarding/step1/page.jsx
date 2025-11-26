"use client";

import { useEffect } from "react";
import { useOnboarding } from "@/app/utils/userOnobardingContext";
import { useRouter } from "next/navigation";

export default function Step1() {
  const router = useRouter();
  const { canAccessStep, advanceStep } = useOnboarding();
  const stepNumber = 1;

  useEffect(() => {
    if (!canAccessStep(stepNumber)) {
      router.push("/pages/onboarding/step1");
    }
  }, [canAccessStep, stepNumber, router]);

  const handleNext = () => {
    advanceStep();
    router.push("/pages/onboarding/step2");
  };

  return (
    <div>
      <h1>Step 1 Introduction to app here</h1>

      <button onClick={handleNext}>Continue</button>
    </div>
  );
}
