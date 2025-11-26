"use client";

import React, { useState } from "react";
import { useOnboarding } from "@/app/utils/userOnobardingContext";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/Button/Button";

export default function LookingForOptions() {
  const router = useRouter();
  const { userData, updateUser } = useOnboarding();

  // Local useState for form Input
  const [formData, setFormData] = useState({
    looking_for: userData.looking_for || null,
  });

  const handleNext = () => {
    updateUser({ looking_for: formData.looking_for });
    router.push("/pages/onboarding/step6");
  };
  const options = [
    { key: 1, label: "Connect to fellow musicians" },
    { key: 2, label: "Promote my music" },
    { key: 3, label: "Find a band to play with" },
    { key: 4, label: "Find services for my music" },
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
              checked={formData.looking_for === opt.key}
              onChange={() => setFormData({ looking_for: opt.key })}
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
