"use client";

import React, { useState, useEffect } from "react";
import { useOnboarding } from "@utils/userOnobardingContext";
import { useRouter } from "next/navigation";
import { Button } from "@ui/Button/Button";
import Input from "@ui/Input/Input";

export default function Step4() {
  const router = useRouter();
  const { canAccessStep, advanceStep, userData, updateUser } = useOnboarding();
  const stepNumber = 4;
  useEffect(() => {
    if (!canAccessStep(stepNumber)) {
      router.push("/pages/onboarding/step1");
    }
  }, [canAccessStep, stepNumber, router]);
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
    router.push("/pages/onboarding/step5");
  };
  return (
    <div className="flex flex-col h-full justify-between w-full">
      <div className="flex flex-col gap-10 justify-center flex-1">
        <h2 className="font-medium">First & Last Name</h2>
        <Input
          className="w-full border-muted rounded p-6 mb-4 placeholder:text-center"
          placeholder="Enter your name & last name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <h2 className="font-medium">Phone Number</h2>
        <div className="flex gap-10 mb-4">
          <div className="border border-muted rounded px-9 flex items-center justify-center">
            {/* Quick method of getting a danish flag for country codes. */}
            {/*  This is NTH, and will likely be implemented at a later point */}
            <svg
              className="w-12 h-8"
              viewBox="0 0 37 28"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="37" height="28" fill="#C8102E" />
              <rect x="12" width="4" height="28" fill="white" />
              <rect y="12" width="37" height="4" fill="white" />
            </svg>
          </div>
          <Input
            className="w-full border-muted rounded p-6 placeholder:text-center"
            placeholder="Enter your phone number"
            value={formData.phone_number}
            onChange={(e) =>
              setFormData({ ...formData, phone_number: e.target.value })
            }
          />
        </div>
        {/* change year of birth input to a date picker if possible */}
        <h2 className="font-medium">Year of Birth</h2>
        <Input
          className="w-full border-muted rounded p-6 mb-4 placeholder:text-center"
          placeholder="Year of Birth"
          value={formData.birthdate}
          onChange={(e) =>
            setFormData({ ...formData, birthdate: e.target.value })
          }
        />
        <h2 className="font-medium">City</h2>
        <Input
          className="w-full border-muted rounded p-6 mb-6 placeholder:text-center"
          placeholder="Enter your city"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
        />
        <h2 className="font-medium">Business Name</h2>
        <Input
          className="w-full border-muted rounded p-6 mb-6 placeholder:text-center"
          placeholder="Name of your business"
          value={formData.business_name}
          onChange={(e) =>
            setFormData({ ...formData, business_name: e.target.value })
          }
        />
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
