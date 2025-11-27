"use client";

import React, { useState } from "react";
import { useOnboarding } from "@/app/utils/userOnobardingContext";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/Button";

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
    <section className="trvm-card max-w-xl mx-auto flex flex-col text-c">
      <h1 className="heading-1 mb-4">Step 4 — Personal details</h1>
      <p className="subtitle mb-6">Enter your personal details to continue</p>

      <input
        className="w-full border-muted rounded-button p-4 mb-4"
        placeholder="Enter your name & last name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />

      <input
        className="w-full border-muted rounded-button p-4 mb-4"
        placeholder="Enter your phone number"
        value={formData.phone_number}
        onChange={(e) =>
          setFormData({ ...formData, phone_number: e.target.value })
        }
      />
      {/* change year of birth input to a date picker if possible */}
      <input
        className="w-full border-muted rounded-button p-4 mb-4"
        placeholder="Year of Birth"
        value={formData.birthdate}
        onChange={(e) =>
          setFormData({ ...formData, birthdate: e.target.value })
        }
      />

      <input
        className="w-full border-muted rounded-button p-4 mb-6"
        placeholder="Enter your city"
        value={formData.city}
        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
      />

      <input
        className="w-full border-muted rounded-button p-4 mb-6"
        placeholder="Name of your business"
        value={formData.business_name}
        onChange={(e) =>
          setFormData({ ...formData, business_name: e.target.value })
        }
      />

      <div className="mt-6">
        <Button variant="primary" onClick={handleNext} className="ml-4">
          Continue
        </Button>
      </div>
    </section>
  );
}
