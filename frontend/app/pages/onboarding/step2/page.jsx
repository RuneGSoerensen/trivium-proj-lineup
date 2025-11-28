"use client";

import React, { useState, useEffect } from "react";
import { useOnboarding } from "@utils/userOnobardingContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@ui/Button/Button";
import Input from "@ui/Input/Input";

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
    <section className="max-w-xl mx-auto mt-12 flex flex-col gap-14 items-center">
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
          className="w-full border-muted rounded mb-4 placeholder:text-center"
          placeholder="Enter your email"
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
          className="w-full border-muted rounded mb-6 placeholder:text-center"
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

        <Input
          variant={confirmTouched && !!passwordMatchError ? "error" : "default"}
          className="w-full border-muted rounded mb-6 placeholder:text-center"
          placeholder="Confirm your password"
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

     <p>or</p>
      <div className="flex flex-col items-center justify-center mt-6 mb-10">
   
        <div className="flex flex-col gap-10 items-center mt-20">
          <Button
            variant="secondary"
            size="md"
            onClick={() => {
              /* google signup */
            }}
          >
            Sign up with Google
          </Button>

          <Button
            variant="secondary"
            size="md"
            onClick={() => {
              /* apple signup */
            }}
          >
            Sign up with Apple
          </Button>
        </div>
        <div className="flex flex-col gap-10 items-center mt-20">
          <p>
            Already have an account?{" "}
          </p>
          <Link className="text-cyan-500" href="/login">
            Log in
          </Link>

          <Link className="underline text-sm p-12 text-muted" href="/home">
            Skip for now
          </Link>
        </div>
      </div>
    </section>
  );
}
