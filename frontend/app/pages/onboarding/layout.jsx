"use client";

import { UserOnboardingProvider } from "@/app/utils/userOnobardingContext";
import { usePathname } from "next/navigation";
import ProgressBar from "@/app/pages/onboarding/components/progress";

export default function OnboardingLayout({ children }) {
  const pathname = usePathname() || "";

  // Determine current step from the pathname (looking for 'step1'..'step6')
  const match = pathname.match(/step(\d+)/i);
  const currentStep = match ? Number(match[1]) : 1;

  const totalSteps = 6;
  const progressValue = Math.round(
    ((currentStep - 1) / (totalSteps - 1)) * 100
  );

  return (
    <UserOnboardingProvider>
      <div className="flex flex-col items-center gap-8 py-8">
        <ProgressBar
          value={progressValue}
          label={`Onboarding step ${currentStep}`}
        />
        {children}
      </div>
    </UserOnboardingProvider>
  );
}
