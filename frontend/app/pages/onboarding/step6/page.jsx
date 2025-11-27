"use client";

import { useOnboarding } from "@utils/userOnobardingContext";
import { useRouter } from "next/navigation";
import { supabase } from "@utils/supabaseClient";
import { setAuthToken } from "@utils/auth";
import { createUser } from "@utils/api";
import { useState } from "react";

export default function Step6() {
  const router = useRouter();
  const { canAccessStep, userData } = useOnboarding();
  const stepNumber = 6;
  const [selectedMembership, setSelectedMembership] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!canAccessStep(stepNumber)) {
      router.push("/pages/onboarding/step1");
    }
  }, [canAccessStep, stepNumber, router]);

  const handleMembershipChange = (membership) => {
    setSelectedMembership(
      selectedMembership === membership ? null : membership
    );
  };

  const handleSubmit = async () => {
    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
      });

      if (authError) {
        console.error("Error creating user in Supabase Auth:", authError);
        setErrorMessage(
          authError.message || "Failed to sign up. Please try again."
        );
        return;
      }

      const userId = authData.user?.id;
      const session = authData.session;

      if (!userId || !session?.access_token) {
        console.error("No user ID or access token returned from Supabase Auth");
        setErrorMessage("Authentication failed. No access token received.");
        return;
      }

      // Store JWT token and userId in localStorage
      setAuthToken(session.access_token, userId);
      console.log("Auth data stored in localStorage:", {
        userId,
        tokenLength: session.access_token.length,
      });

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

      console.log("Sending user data:", updatedUserData);

      // Create user in backend
      const result = await createUser(updatedUserData);
      console.log("User created successfully in backend:", result);

      router.push("/");
    } catch (error) {
      console.error("Unexpected error during user creation:", error);
      setErrorMessage(
        error.message || "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsSubmitting(false);
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

      {errorMessage && (
        <p className="text-red-500 mt-2" role="alert">
          {errorMessage}
        </p>
      )}
      <button className="btn" onClick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Finish"}
      </button>
    </section>
  );
}
