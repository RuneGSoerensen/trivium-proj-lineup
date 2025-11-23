"use client";

import { useOnboarding } from "@/app/utils/userOnobardingContext";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/Button";

export default function Step4() {
  const router = useRouter();
  const { userData, updateUser } = useOnboarding();

  const handleNext = () => {
    router.push("/pages/onboarding/step5");
  };

  return (
    <section className="trvm-card max-w-xl mx-auto flex flex-col text-c">
      <h1 className="heading-1 mb-4">Step 4 — Personal details</h1>
      <p className="subtitle mb-6">Enter your personal details to continue</p>

      <input
        className="w-full border-muted rounded-button p-4 mb-4"
        placeholder="Enter your name & last name"
        value={userData.name}
        onChange={(e) => updateUser({ name: e.target.value })}
      />

      <input
        className="w-full border-muted rounded-button p-4 mb-4"
        placeholder="Enter your phone number"
        value={userData.phone_nr}
        onChange={(e) => updateUser({ phone_nr: e.target.value })}
      />

      <input
        className="w-full border-muted rounded-button p-4 mb-4"
        placeholder="Year of Birth"
        value={userData.birthdate}
        onChange={(e) => updateUser({ birthdate: e.target.value })}
      />

      <input
        className="w-full border-muted rounded-button p-4 mb-6"
        placeholder="Enter your city"
        value={userData.city}
        onChange={(e) => updateUser({ city: e.target.value })}
      />

      <input
        className="w-full border-muted rounded-button p-4 mb-6"
        placeholder="Name of your business"
        value={userData.business_name}
        onChange={(e) => updateUser({ business_name: e.target.value })}
      />

      <div className="mt-6">
        <Button variant="primary" onClick={handleNext} className="ml-4">
          Continue
        </Button>
      </div>
    </section>
  );
}
