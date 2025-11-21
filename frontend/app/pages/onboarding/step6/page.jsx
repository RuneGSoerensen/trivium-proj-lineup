"use client";

import { useOnboarding } from "@/app/utils/userOnobardingContext";
import { useRouter } from "next/navigation";

export default function Step6() {
  const router = useRouter();
  const { userData, updateUser } = useOnboarding();

  const handleNext = () => {
    router.push("step2");
  };

  return (
    <div>
      <h1>Step 6 Basic Info</h1>

      <button onClick={handleNext}>Next</button>
    </div>
  );
}
