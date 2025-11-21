"use client";

import { useOnboarding } from "@/context/UserOnboardingContext";
import { useRouter } from "next/navigation";

export default function Step1() {
  const router = useRouter();
  const { userData, updateUser } = useOnboarding();

  const handleNext = () => {
    router.push("/step2");
  };

  return (
    <div>
      <h1>Step 1 Basic Info</h1>

      <button onClick={handleNext}>Next</button>
    </div>
  );
}
