"use client";

import { useOnboarding } from "@/app/utils/userOnobardingContext";
import { useRouter } from "next/navigation";

export default function Step4() {
  const router = useRouter();
  const { userData, updateUser } = useOnboarding();

  const handleNext = () => {
    router.push("/pages/onboarding/step5");
  };

  return (
    <div>
      <h1>Step 4 Basic Info</h1>

      <button onClick={handleNext}>Next</button>
    </div>
  );
}
