"use client";

import { useOnboarding } from "@/app/utils/userOnobardingContext";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/Button";

export default function Step3() {
  const router = useRouter();
  const { userData, updateUser } = useOnboarding();

  const handleNext = () => {
    router.push("/pages/onboarding/step4");
  };

  return (
    <section className="trvm-card max-w-xl mx-auto flex flex-col text-c">
      <h1 className="heading-1 mb-4">Step 3 — Musician Info</h1>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1">
          <input
            type="checkbox"
            className="checkbox"
            id="musicianTrue"
            checked={!!userData?.is_musician}
            onChange={() => updateUser({ is_musician: true })}
          />
          <label className="label-text text-base" htmlFor="musicianTrue">
            I am a musician
          </label>
          <p>I am a musician looking for collaboration and services.</p>
        </div>

        <div className="flex items-center gap-1">
          <input
            type="checkbox"
            className="checkbox"
            id="musicianFalse"
            checked={!userData?.is_musician}
            onChange={() => updateUser({ is_musician: false })}
          />
          <label className="label-text text-base" htmlFor="musicianFalse">
            Not a musician
          </label>
          <p>I want to provide services for musicians.</p>
        </div>
      </div>

      <div className="mt-6">
        <Button variant="primary" onClick={handleNext} className="ml-4">
          Continue
        </Button>
      </div>
    </section>
  );
}
