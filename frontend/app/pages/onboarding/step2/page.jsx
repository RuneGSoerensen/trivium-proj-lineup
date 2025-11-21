"use client";

import { useOnboarding } from "@/app/utils/userOnobardingContext";
import { useRouter } from "next/navigation";

export default function Step2() {
  const router = useRouter();
  const { userData, updateUser } = useOnboarding();

  const handleNext = () => {
    router.push("/pages/onboarding/step3");
  };

  return (
    <div>
      <h1>Step 2 Basic Info</h1>

      <button onClick={handleNext}>Next</button>
    </div>
  );
}
