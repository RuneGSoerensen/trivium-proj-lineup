"use client";

import { useOnboarding } from "@/context/UserOnboardingContext";
import { useRouter } from "next/navigation";

export default function Step3() {
  const router = useRouter();
  const { userData, updateUser } = useOnboarding();

  const handleNext = () => {
    router.push("pages/onboarding/step4");
  };

  return (
    <div>
      <h1>Step 3 Basic Info</h1>

      <button onClick={handleNext}>Next</button>
    </div>
  );
}
