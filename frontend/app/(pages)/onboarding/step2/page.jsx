"use client";

import React, { useState, useEffect } from "react";
import { useOnboarding } from "@/utils/userOnboardingContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input/Input";
import Image from "next/image";

export default function Step2() {
  const router = useRouter();
  const { canAccessStep, advanceStep, userData, updateUser, maxStepReached } =
    useOnboarding();
  const [emailTouched, setEmailTouched] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [confirmTouched, setConfirmTouched] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const stepNumber = 2;

  useEffect(() => {
    if (!canAccessStep(stepNumber)) {
      router.push(`/onboarding/step${maxStepReached}`);
    }
  }, [canAccessStep, stepNumber, router, maxStepReached]);

  // Local useState for form Inputs
  // Password fields are never persisted to localStorage for security
  const [formData, setFormData] = useState({
    email: userData.email || "",
    password: "",
    confirmPassword: "",
  });

  const handleNext = () => {
    // Submit function, updates context and reroutes user to next step
    if (!validateEmail(formData.email)) {
      setEmailTouched(true);
      setEmailError("Please enter a valid email address");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatchError("Passwords do not match");
      return;
    }
    updateUser({
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    });

    console.log("Form Data Submitted:", formData);

    advanceStep();
    router.push("/onboarding/step3");
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  // change the inputs onChange to a submit function instead, this makes it so that it doesnt update your useOnboarding states until you press continue
  // then call the function when pressing continue ;)
  // Put this function inside the handleNext function
  return (
    <section className="mt-12 flex flex-col items-center">
      <h1 className="text-h1">Sign up</h1>
      <p className="subtitle mb-6 w-full text-center">
        By continuing you agree to LineUp! <br /> Terms of use and Privacy Policy.
      </p>

      <form
        className="flex flex-col items-center gap-8"
        onSubmit={(e) => {
          e.preventDefault();
          handleNext();
        }}
      >
        <Input
          variant={emailTouched && !!emailError ? "error" : "default"}
          className="border-muted mb-4 placeholder:text-center"
          placeholder="Email address"
          type="email"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
            if (emailTouched) {
              if (!validateEmail(e.target.value)) {
                setEmailError("Please enter a valid email address");
              } else {
                setEmailError("");
              }
            }
          }}
          onBlur={() => {
            setEmailTouched(true);
            if (!validateEmail(formData.email)) {
              setEmailError("Please enter a valid email address");
            } else setEmailError("");
          }}
          hasMessage={emailTouched && !!emailError}
          message={emailError}
        />


        <Input
          variant={confirmTouched && !!passwordMatchError ? "error" : "default"}
          className="w-full border-muted mb-6 placeholder:text-center"
          placeholder="Create a password"
          type="password"
          value={formData.password}
          onChange={(e) => {
            const newPassword = e.target.value;
            setFormData({ ...formData, password: newPassword });
            if (confirmTouched) {
              if (newPassword !== formData.confirmPassword) {
                setPasswordMatchError("Passwords do not match");
              } else {
                setPasswordMatchError("");
              }
            }
          }}
        />

        <Input
          variant={confirmTouched && !!passwordMatchError ? "error" : "default"}
          className="w-full border-muted mb-6 placeholder:text-center"
          placeholder="Confirm password"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => {
            setFormData({ ...formData, confirmPassword: e.target.value });
            if (confirmTouched) {
              if (formData.password !== e.target.value) {
                setPasswordMatchError("Passwords do not match");
              } else {
                setPasswordMatchError("");
              }
            }
          }}
          onBlur={() => {
            setConfirmTouched(true);
            if (formData.password !== formData.confirmPassword) {
              setPasswordMatchError("Passwords do not match");
            } else {
              setPasswordMatchError("");
            }
          }}
          hasMessage={confirmTouched && !!passwordMatchError}
          message={passwordMatchError}
        />

        {(emailTouched && !!emailError) || (confirmTouched && !!passwordMatchError) ? (
          <span className="sr-only" role="alert">
            {emailError || passwordMatchError}
          </span>
        ) : null}

        <Button
          type="submit"
          variant="primary"
          className="mt-14 rounded-full w-fit"
          disabled={
            !validateEmail(formData.email) ||
            !formData.password ||
            !formData.confirmPassword ||
            formData.password !== formData.confirmPassword
          }
          aria-disabled={
            !validateEmail(formData.email) ||
            !formData.password ||
            !formData.confirmPassword ||
            formData.password !== formData.confirmPassword
          }
        >
          Continue
        </Button>
      </form>


      <div className="flex flex-col items-center justify-center mt-24 ">
        <p>or sign up with</p>
        <div className="flex flex-col gap-10 items-center my-12 w-11/12">
          <Button
            size="lg"
            variant="secondary"
            onClick={() => {
              /* google signup */
            }}
          >
            <span className="flex justify-center gap-8">
              <Image src="/icons/Google.svg" alt="Google Icon" width={20} height={20} className="mr-2" /> Google
            </span>
          </Button>

          <Button
            size="lg"
            variant="secondary"
            onClick={() => {
              /* apple signup */
            }}
          >
            <span className="flex justify-center gap-8">
              <Image src="/icons/Apple.svg" alt="Apple Icon" width={20} height={20} className="mr-2" /> Apple
            </span>
          </Button>
        </div>
        <div className="flex flex-col gap-10 items-center mt-20">
          <div className="flex  gap-8 h-fit">
            <p>
              Already have an account?{" "}
            </p>
            <Link className="text-cyan-500" href="/login">
              Log in
            </Link>
          </div>

          {
            /* NOTE: Group decision to remove "Skip for now" from onboarding
            <Link className="underline text-sm p-12 color-muted" href="/home">
            Skip for now
            </Link> 
          */
          }
        </div>
      </div>
    </section>
  );
}
