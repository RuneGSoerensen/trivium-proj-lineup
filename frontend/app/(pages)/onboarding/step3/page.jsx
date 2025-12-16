"use client";

import React, { useState, useEffect } from "react";
import { useOnboarding } from "@/utils/userOnboardingContext";
import { useRouter } from "next/navigation";
import { Button } from "@/ui/Button/Button";
import Input from "@/ui/Input/Input";
import Image from "next/image";

export default function Step3() {
  const router = useRouter();
  const { canAccessStep, advanceStep, userData, updateUser, maxStepReached } =
    useOnboarding();
  const stepNumber = 3;
  useEffect(() => {
    if (!canAccessStep(stepNumber)) {
      router.push(`/onboarding/step${maxStepReached}`);
    }
  }, [canAccessStep, stepNumber, router, maxStepReached]);
  // Local useState for form Input
  const [formData, setFormData] = useState({
    is_musician: userData.is_musician ?? false,
  });
  const handleNext = () => {
    updateUser({ is_musician: formData.is_musician });
    advanceStep();
    router.push("/onboarding/step4");
  };

  const isChecked = (value) => {
    return formData.is_musician === value;
  };

  const handleboxStyle = (isChecked) => {
    return isChecked
      ? "border-subtle"
      : "border-muted";
  };


  return (
    <div className="flex flex-col h-full justify-between mt-12">
      <div className="flex flex-col gap-30 items-center justify-center flex-1">
        <div className="mb-30">
          <Image
            src="/images/lineup-logo-letters-yellow.png"
            alt="LineUp Letter style logo"
            width={46}
            height={29}
          />
        </div>

        <div
          className={`flex items-center flex-col gap-20 p-20 border-${isChecked(true) ? "subtle" : "muted"
            } p-4 rounded-3xl text-center justify-center w-fit h-fit min-h-155 max-w-223`}
        >
          <label
            className="text-h2 color-grey-300 text-base font-semibold"
            htmlFor="musicianTrue"
          >
            I am a musician
          </label>
          <p>I am a musician looking for collaboration and services.</p>
          <Input
            type="checkbox"
            className="checkbox mx-auto rounded-full"
            id="musicianTrue"
            checked={isChecked(true)}
            onChange={() => setFormData({ is_musician: true })}
          />
        </div>

        <div
          className={`flex items-center flex-col gap-20 p-20 border-${isChecked(false) ? "subtle" : "muted"
            } p-4 rounded-3xl text-center justify-center w-fit h-fit min-h-155 max-w-223`}
        >
          <label
            className="text-h2 color-grey-300 text-base font-semibold"
            htmlFor="musicianFalse"
          >
            Not a musician
          </label>
          <p>I want to provide services for musicians.</p>
          <Input
            type="checkbox"
            className="checkbox mx-auto rounded-full"
            id="musicianFalse"
            checked={isChecked(false)}
            onChange={() => setFormData({ is_musician: false })}
          />
        </div>
      </div>

      <div className="items-end self-center pb-4">
        <Button
          variant="primary"
          onClick={handleNext}
          className="ml-4 w-fit"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
