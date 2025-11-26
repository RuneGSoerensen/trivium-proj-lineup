"use client";

import { useOnboarding } from "@/app/utils/userOnobardingContext";
import { useRouter } from "next/navigation";

export default function Step1() {
  const router = useRouter();
  const { userData, updateUser } = useOnboarding();

  const handleNext = () => {
    router.push("/pages/onboarding/step2");
  };

  return (
    <div>
      <h1>Step 1 Introduction to app here</h1>

      <button onClick={handleNext}>Continue</button>
    </div>
  );
}
