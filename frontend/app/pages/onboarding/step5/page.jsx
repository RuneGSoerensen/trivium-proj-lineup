"use client";

import { useOnboarding } from "@/app/utils/userOnobardingContext";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/Button";

export default function LookingForOptions() {
  const router = useRouter();
  const handleNext = () => {
    router.push("/pages/onboarding/step6");
  };
  const { userData, selectLookingFor } = useOnboarding();
  const options = [
    { key: "connect", label: "Connect to fellow musicians" },
    { key: "promote", label: "Promote my music" },
    { key: "find_band", label: "Find a band to play with" },
    { key: "services", label: "Find services for my music" },
  ];

  return (
    <section className="trvm-card max-w-xl mx-auto flex flex-col text-c">
      <h1 className="heading-1 mb-4">I am looking to</h1>

      <div className="flex flex-col gap-2">
        {options.map((opt) => (
          <div className="flex items-center gap-1" key={opt.key}>
            <input
              type="checkbox"
              className="checkbox"
              id={`lookingfor_${opt.key}`}
              checked={userData?.looking_for === opt.key}
              onChange={() => selectLookingFor(opt.key)}
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

      <Button variant="primary" onClick={handleNext} className="ml-4">
        Continue
      </Button>
    </section>
  );
}
