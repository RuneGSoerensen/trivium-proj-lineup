"use client";

import { UserOnboardingProvider } from "@/utils/userOnboardingContext";
import { usePathname } from "next/navigation";
import ProgressBar from "@ui/Progressbar/progress";

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
      <div className="flex flex-col items-center gap-8 py-8 w-full h-full max-w-3xl justify-center">
        <ProgressBar
          value={progressValue}
          label={`Onboarding step ${currentStep}`}
        />
        {children}
      </div>
    </UserOnboardingProvider>
  );
}
