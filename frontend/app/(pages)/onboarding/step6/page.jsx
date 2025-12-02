"use client";

import { useOnboarding } from "@/utils/userOnboardingContext";
import { useRouter } from "next/navigation";
import { supabase } from "@utils/supabaseClient";
import { setAuthToken } from "@utils/auth";
import { createUser } from "@utils/api";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@ui/Button/Button";
import Input from "@ui/Input/Input";
import { Check } from "lucide-react";
import Link from "next/link";

export default function Step6() {
  const router = useRouter();
  const { canAccessStep, userData, maxStepReached, clearOnboardingData } =
    useOnboarding();
  const stepNumber = 6;
  const [selectedMembership, setSelectedMembership] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!isCompleted && !canAccessStep(stepNumber)) {
      router.push(`/onboarding/step${maxStepReached}`);
    }
  }, [canAccessStep, stepNumber, router, maxStepReached, isCompleted]);

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

      // Mark as completed to prevent redirect in useEffect
      setIsCompleted(true);
      // Use replace instead of push to prevent back navigation to onboarding
      router.replace("/");
      // Clear onboarding data from localStorage (preserves userId and JWT token) after navigation starts
      setTimeout(() => clearOnboardingData(), 100);
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
    <div className="flex flex-col h-full w-full justify-between">
      <div className="flex flex-col gap-10 items-center flex-1">
        <div className="mt-40 mb-10">
          <Image
            src="/images/lineup-pro.png"
            alt="LineUp Letter style logo"
            width={146}
            height={51}
          />
        </div>
        <h1 className="text-h2 self-start md:self-center">
          Get full access to LineUp
        </h1>
        <div className="flex flex-col gap-4 max-w-md items-start self-start md:self-center">
          <p className="flex flex-row gap-10">
            <Check color="#ffcf70" /> Unlimited collabs
          </p>
          <p className="flex flex-row gap-10">
            <Check color="#ffcf70" /> Unlimited connections
          </p>
          <p className="flex flex-row gap-10">
            <Check color="#ffcf70" /> Advanced insights
          </p>
          <p className="flex flex-row gap-10">
            <Check color="#ffcf70" /> See detailed reviews
          </p>
        </div>
        {/* Monthly checkbox */}
        <div
          className={`flex items-center justify-between rounded-3xl py-5 px-10 w-full md:max-w-[50%] border-2 ${
            selectedMembership === "premium" ? "border-subtle" : "border-muted"
          }`}
        >
          <div className="flex items-center gap-4">
            <Input
              type="checkbox"
              className="checkbox rounded-full checked:bg-brand-primary"
              id="membership-premium"
              checked={selectedMembership === "premium"}
              onChange={() => handleMembershipChange("premium")}
            />
            <label htmlFor="membership-premium" className="cursor-pointer">
              <p className="text-base font-semibold">Monthly</p>
              <p className="text-sm text-muted">58 kr. / month</p>
            </label>
          </div>
          <div>
            <p className="text-base font-semibold">58 kr.</p>
          </div>
        </div>
        {/* Yearly checkbox */}
        <div className="relative w-full md:self-center md:max-w-[50%]">
          <div className="absolute -top-3 left-12 bg-brand-primary text-xs font-bold px-7 py-1 rounded">
            HIT
          </div>
          <div
            className={`flex items-center justify-between rounded-3xl py-5 px-10 w-full ${
              selectedMembership === "basic" ? "border-subtle" : "border-muted"
            }`}
          >
            <div className="flex items-center gap-4">
              <Input
                type="checkbox"
                className="checkbox rounded-full checked:bg-brand-primary"
                id="membership-basic"
                checked={selectedMembership === "basic"}
                onChange={() => handleMembershipChange("basic")}
              />
              <label htmlFor="membership-basic" className="cursor-pointer">
                <p className="text-base font-semibold">Yearly</p>
                <p className="text-sm text-muted">29 kr. / month</p>
              </label>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-base font-semibold">348 kr.</p>
              <span className="bg-brand-primary text-sm font-semibold px-3 py-2">
                save 50%
              </span>
            </div>
          </div>
        </div>
        <div className="mt-20">
          <Button
            variant="primary"
            size="sm"
            onClick={handleSubmit}
            className="ml-4 w-fit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Start my 7-day free trial"}
          </Button>
        </div>
        <p className="text-sm text-center">Terms of use and Privacy Policy</p>
        {errorMessage && (
          <p className="text-red-500 mt-2" role="alert">
            {errorMessage}
          </p>
        )}
        <Link
          className="text-sm text-muted-foreground text-center underline underline-offset-4"
          href="/home"
        >
          Skip for now
        </Link>
      </div>
    </div>
  );
}
