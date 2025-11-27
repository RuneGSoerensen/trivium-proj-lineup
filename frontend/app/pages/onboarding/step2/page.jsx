"use client";

import React, { useState, useEffect } from "react";
import { useOnboarding } from "@/app/utils/userOnobardingContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/app/components/ui/Button/Button";

export default function Step2() {
  const router = useRouter();
  const { canAccessStep, advanceStep, userData, updateUser } = useOnboarding();
  const [emailTouched, setEmailTouched] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [confirmTouched, setConfirmTouched] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const stepNumber = 2;

  useEffect(() => {
    if (!canAccessStep(stepNumber)) {
      router.push("/pages/onboarding/step1");
    }
  }, [canAccessStep, stepNumber, router]);

  // Local useState for form Inputs
  const [formData, setFormData] = useState({
    email: userData.email || "",
    password: userData.password || "",
    confirmPassword: userData.confirmPassword || "",
  });

  const handleNext = () => {
    // Submit function, updates context and reroutes user to next step
    if (!validateEmail(formData.email)) {
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
    advanceStep();
    router.push("/pages/onboarding/step3");
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  // change the inputs onChange to a submit function instead, this makes it so that it doesnt update your useOnboarding states until you press continue
  // then call the function when pressing continue ;)
  // Put this function inside the handleNext function
  return (
    <section className="trvm-card max-w-xl mx-auto flex flex-col gap-20 items-center text-center">
      <h1 className="heading-1 mb-4">Sign up</h1>
      <p className="subtitle mb-6 w-2/3">
        By continueing you agree to LineUp! Terms of use and Privacy Policy.
      </p>

      <input
        className="w-2/3 border-muted rounded p-4 mb-4 placeholder:text-center"
        placeholder="Enter your email"
        type="email"
        value={formData.email}
        onChange={(e) => {
          setFormData({ ...formData, email: e.target.value });
          if (emailTouched && validateEmail(e.target.value)) setEmailError("");
        }}
        onBlur={() => {
          setEmailTouched(true);
          if (!validateEmail(formData.email))
            setEmailError("Please enter a valid email address");
          else setEmailError("");
        }}
      />
      {/* Consider using a span instead of a p tag */}
      {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}

      <input
        className="w-2/3 border-muted rounded p-4 mb-6 placeholder:text-center"
        placeholder="Enter your password"
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

      <input
        className="w-2/3 border-muted rounded p-4 mb-6 placeholder:text-center"
        placeholder="Confirm your password"
        type="password"
        value={formData.confirmPassword}
        onChange={(e) => {
          const newConfirm = e.target.value;
          setFormData({ ...formData, confirmPassword: newConfirm });
          if (confirmTouched) {
            if (formData.password !== newConfirm) {
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
      />

      {passwordMatchError && (
        <p className="text-red-500 text-sm -mt-4 mb-6">{passwordMatchError}</p>
      )}

      <div className="mt-6 mb-10">
        <Button
          variant="primary"
          size="sm"
          onClick={handleNext}
          className="mb-15 rounded-full"
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

        <p>or</p>
        <div className="flex flex-col gap-20 items-center mt-20">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              /* google signup */
            }}
          >
            Sign up with Google
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              /* apple signup */
            }}
          >
            Sign up with Apple
          </Button>
        </div>
        <div className="flex flex-col gap-10 items-center mt-20">
          <p>
            Already have an account{" "}
            <Link className="text-cyan-500" href="/login">
              Log in
            </Link>
          </p>
          <Link className="underline" href="/home">
            Skip for now
          </Link>
        </div>
      </div>
    </section>
  );
}
