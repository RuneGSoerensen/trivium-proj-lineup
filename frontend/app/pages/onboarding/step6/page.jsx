"use client";

import { useOnboarding } from "@utils/userOnobardingContext";
import { useRouter } from "next/navigation";
import { supabase } from "@utils/supabaseClient";
import { setAuthToken } from "@utils/auth";
import { createUser } from "@utils/api";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@ui/Button/Button";
import Input from "@ui/Input/Input";

export default function Step6() {
  const router = useRouter();
  const { canAccessStep, userData } = useOnboarding();
  const stepNumber = 6;
  const [selectedMembership, setSelectedMembership] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // useEffect(() => {
  //   if (!canAccessStep(stepNumber)) {
  //     router.push("/pages/onboarding/step1");
  //   }
  // }, [canAccessStep, stepNumber, router]);

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
  return (
    <div
      className="flex flex-col h-full w-full
     justify-between"
    >
      <div className="flex flex-col gap-10 items-center justify-center flex-1">
        <div className="mb-20">
          <Image
            src="/images/lineup-pro.png"
            alt="LineUp Letter style logo"
            width={146}
            height={51}
          />
        </div>

        <div
          className={`flex items-center flex-row-reverse justify-between rounded-3xl ${
            selectedMembership === "premium" ? "border-subtle" : "border-muted"
          } `}
        >
          <label
            htmlFor="membership-premium"
            aria-label="Monthly subscription for Premium Membership"
          ></label>
          <div>
            <p className="text-sm">58 kr.</p>
          </div>

          <div>
            <p className="text-base font-semibold">Monthly</p>
            <p className="text-sm">58 kr. / month</p>
          </div>
          <div>
            <Input
              type="checkbox"
              className="checkbox mx-auto rounded-full checked:border-(--color-primary) checked:bg-brand-primary"
              id="membership-premium"
              checked={selectedMembership === "premium"}
              onChange={() => handleMembershipChange("premium")}
            />
          </div>
        </div>

        {/* <div
          className={`flex items-center flex-col gap-10 p-10 ${
            selectedMembership === "basic" ? "border-subtle" : "border-muted"
          } p-4 rounded-3xl text-center justify-center min-h-200 max-w-223`}
        >
          <label
            className="label-text text-base font-semibold"
            htmlFor="membership-basic"
          >
            Basic Membership
          </label>
          <p>Start with core features at a lower cost.</p>
          <Input
            type="checkbox"
            className="checkbox mx-auto rounded-full checked:border-(--color-primary) checked:bg-brand-primary"
            id="membership-basic"
            checked={selectedMembership === "basic"}
            onChange={() => handleMembershipChange("basic")}
          />
        </div> */}

        {errorMessage && (
          <p className="text-red-500 mt-2" role="alert">
            {errorMessage}
          </p>
        )}
      </div>

      <div className="items-end self-center pb-4">
        <Button
          variant="primary"
          size="sm"
          onClick={handleSubmit}
          className="ml-4 w-fit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Finish"}
        </Button>
      </div>
    </div>
  );
}
