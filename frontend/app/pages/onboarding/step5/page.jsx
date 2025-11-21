"use client";

import { useOnboarding } from "@/app/utils/userOnobardingContext";
import { useRouter } from "next/navigation";

export default function Step5() {
  const router = useRouter();
  const { userData, updateUser } = useOnboarding();

  const handleNext = () => {
    router.push("/pages/onboarding/step6");
  };

  return (
    <div>
      <h1>Step 5 Basic Info</h1>

      <button onClick={handleNext}>Next</button>
    </div>
  );
}
