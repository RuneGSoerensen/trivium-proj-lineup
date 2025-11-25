"use client";

import { useOnboarding } from "@/app/utils/userOnobardingContext";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/utils/supabaseClient";
import { useState } from "react";

export default function Step6() {
  const router = useRouter();
  const { userData, updateUser } = useOnboarding();
  const [selectedMembership, setSelectedMembership] = useState(null);

  const handleMembershipChange = (membership) => {
    setSelectedMembership(
      selectedMembership === membership ? null : membership
    );
  };

  const handleSubmit = async () => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
      });

      if (authError) {
        console.error("Error creating user in Supabase Auth:", authError);
        return;
      }

      const userId = authData.user?.id;
      if (!userId) {
        console.error("no user Id returned from supabase auth");
        return;
      }

      const updatedUserData = {
        id: userId,
        email: userData.email,
        name: userData.name,
        birthdate: userData.birthdate,
        city: userData.city,
        phone_number: userData.phone_number,
        looking_for: userData.looking_for,
        is_musician: userData.is_musician,
        business: userData.business_name,
      };

      console.log("Sending user data:", updatedUserData); // Add this line

      const response = await fetch("http://localhost:3001/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error creating user in backend:", errorData);
        return;
      }

      const result = await response.json();
      console.log("User created successfully in backend:", result);
      router.push("/welcome");
    } catch (error) {
      console.error("Unexpected error during user creation:", error);
    }
  };
  // all in all, looks pretty good!, if Victoria makes ui
  // components for radio buttons, input and datepicker import those into
  // the onboarding files, and use those instead of html elements
  return (
    <section className="trvm-card max-w-xl mx-auto flex flex-col text-c">
      <h1>Final step - Membership type:</h1>
      <div className="flex items-center gap-1">
        <input
          type="checkbox"
          className="checkbox"
          id="membership-premium"
          checked={selectedMembership === "premium"}
          onChange={() => handleMembershipChange("premium")}
        />
        <label className="label-text text-base" htmlFor="membership-premium">
          Premium Membership
        </label>
      </div>
      <div className="flex items-center gap-1">
        <input
          type="checkbox"
          className="checkbox"
          id="membership-basic"
          checked={selectedMembership === "basic"}
          onChange={() => handleMembershipChange("basic")}
        />
        <label className="label-text text-base" htmlFor="membership-basic">
          Basic Membership
        </label>
      </div>

      <button onClick={handleSubmit}>Finish</button>
    </section>
  );
}
