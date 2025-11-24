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
// cant undo membership type selection
// also here is where you would call supa base auth to create the user with email and password then use the returned user id to store the rest of the data in your users table
// and use that to call the backend to update the user data in the database

// all in all, looks pretty good!, if Victoria makes ui components for radio buttons, input and datepicker import those into the onboarding files, and use those instead of html elements
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
