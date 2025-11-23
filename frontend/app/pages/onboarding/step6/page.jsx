"use client";

import { useOnboarding } from "@/app/utils/userOnobardingContext";
import { useRouter } from "next/navigation";

export default function Step6() {
  const router = useRouter();
  const { userData, updateUser } = useOnboarding();

  const handleSubmit = async () => {
    await fetch("/api/users/onboarding", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
  };

  return (
    <section className="trvm-card max-w-xl mx-auto flex flex-col text-c">
      <h1>Final step - Membership type:</h1>
      <div className="flex items-center gap-1">
        <input type="radio" className="checkbox" id="membership-premium" />
        <label className="label-text text-base" htmlFor="membership-premium">
          Premium Membership
        </label>
      </div>
      <div className="flex items-center gap-1">
        <input type="radio" className="checkbox" id="membership-basic" />
        <label className="label-text text-base" htmlFor="membership-basic">
          Basic Membership
        </label>
      </div>

      <button onClick={handleSubmit}>Finish</button>
    </section>
  );
}
