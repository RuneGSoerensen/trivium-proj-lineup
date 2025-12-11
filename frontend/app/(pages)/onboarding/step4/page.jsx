"use client";

import React, { useState, useEffect } from "react";
import { useOnboarding } from "@/utils/userOnboardingContext";
import { useRouter } from "next/navigation";
import { Button } from "@/ui/Button/Button";
import Input from "@/ui/Input/Input";
import Image from "next/image";

export default function Step4() {
  const router = useRouter();
  const { canAccessStep, advanceStep, userData, updateUser, maxStepReached } =
    useOnboarding();
  const stepNumber = 4;
  useEffect(() => {
    if (!canAccessStep(stepNumber)) {
      router.push(`/onboarding/step${maxStepReached}`);
    }
  }, [canAccessStep, stepNumber, router, maxStepReached]);
  // Local useState for form Inputs
  const [formData, setFormData] = useState({
    name: userData.name || "",
    phone_number: userData.phone_number || "",
    birthdate: userData.birthdate || "",
    city: userData.city || "",
    business_name: userData.business_name || "",
  });

  const handleNext = () => {
    updateUser({
      name: formData.name,
      phone_number: formData.phone_number,
      birthdate: formData.birthdate,
      city: formData.city,
      business_name: formData.business_name,
    });
    advanceStep();
    router.push("/onboarding/step5");
  };
  const spacingStyle = "flex flex-col gap-12 justify-center";

  return (
    <div className="flex flex-col h-full justify-between items-center w-full">
      <div className="flex flex-col gap-30 justify-center flex-1">
        <div className={spacingStyle}>
          <h2 className="text-h2 font-medium">First & Last Name</h2>
          <Input
            placeholder="Enter your first & last name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className={spacingStyle}>
          <h2 className="text-h2 font-medium">Phone Number</h2>
          <div className="flex gap-12 mb-4">
            <Button variant="secondary" size="sm" className="px-12! rounded-lg border-muted! h-full">
              <span className="flex justify-center gap-8">
                <Image src="/icons/DA.svg" alt="Danish Flag" width={24} height={24} />
              </span>
            </Button>
            <Input
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone_number}
              onChange={(e) =>
                setFormData({ ...formData, phone_number: e.target.value })
              }
            />
          </div>
        </div>

        <div className={spacingStyle}>
          {/* change year of birth input to a date picker if possible */}
          <h2 className="text-h2 font-medium">Year of Birth</h2>
          <Input
            type="date"
            placeholder="Year of Birth"
            value={formData.birthdate}
            onChange={(e) =>
              setFormData({ ...formData, birthdate: e.target.value })
            }
          />
        </div>

        <div className={spacingStyle}>
          <h2 className="text-h2 font-medium">City</h2>
          <Input
            placeholder="Enter your city"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
        </div>

        <div className={spacingStyle}>
          <h2 className="text-h2 font-medium">Business Name</h2>
          <Input
            placeholder="Name of your business"
            value={formData.business_name}
            onChange={(e) =>
              setFormData({ ...formData, business_name: e.target.value })
            }
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
