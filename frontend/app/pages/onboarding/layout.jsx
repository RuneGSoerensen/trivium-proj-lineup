"use client";

import { UserOnboardingProvider } from "@/app/utils/userOnobardingContext";

export default function OnboardingLayout({ children }) {
  return <UserOnboardingProvider>{children}</UserOnboardingProvider>;
}
