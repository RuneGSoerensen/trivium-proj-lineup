"use client";

import React, { useState, useEffect } from "react";
import { useOnboarding } from "@utils/userOnobardingContext";
import { useRouter } from "next/navigation";
import { Button } from "@ui/Button/Button";
import Input from "@ui/Input/Input";
import Image from "next/image";

export default function Step3() {
  const router = useRouter();
  const { canAccessStep, advanceStep, userData, updateUser } = useOnboarding();
  const stepNumber = 3;
  // useEffect(() => {
  //   if (!canAccessStep(stepNumber)) {
  //     router.push("/pages/onboarding/step1");
  //   }
  // }, [canAccessStep, stepNumber, router]);
  // Local useState for form Input
  const [formData, setFormData] = useState({
    is_musician: userData.is_musician ?? null,
  });

  const handleNext = () => {
    updateUser({ is_musician: formData.is_musician });
    advanceStep();
    router.push("/pages/onboarding/step4");
  };

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex flex-col gap-30 items-center justify-center flex-1">
        <div className="mb-8">
          <Image
            src="/images/lineup-logo-letters-yellow.png"
            alt="LineUp Letter style logo"
            width={46}
            height={29}
          />
        </div>

        <div
          className={`flex items-center flex-col gap-10 p-10 ${
            formData.is_musician === true ? "border-subtle" : "border-muted"
          } p-4 rounded-3xl text-center justify-center min-h-200 max-w-223`}
        >
          <label
            className="label-text text-base font-semibold"
            htmlFor="musicianTrue"
          >
            I am a musician
          </label>
          <p>I am a musician looking for collaboration and services.</p>
          <Input
            type="checkbox"
            className="checkbox mx-auto rounded-full checked:border-(--color-primary) checked:bg-brand-primary"
            id="musicianTrue"
            checked={formData.is_musician === true}
            onChange={() => setFormData({ is_musician: true })}
          />
        </div>

        <div
          className={`flex items-center flex-col gap-10 p-10 ${
            formData.is_musician === false ? "border-subtle" : "border-muted"
          } p-4 rounded-3xl text-center justify-center min-h-200 max-w-223`}
        >
          <label
            className="label-text text-base font-semibold"
            htmlFor="musicianFalse"
          >
            Not a musician
          </label>
          <p>I want to provide services for musicians.</p>
          <Input
            type="checkbox"
            className="checkbox mx-auto rounded-full checked:border-(--color-primary) checked:bg-brand-primary"
            id="musicianFalse"
            checked={formData.is_musician === false}
            onChange={() => setFormData({ is_musician: false })}
          />
        </div>
      </div>

      <div className="items-end self-center pb-4">
        <Button
          variant="primary"
          size="sm"
          onClick={handleNext}
          className="ml-4 w-fit"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
