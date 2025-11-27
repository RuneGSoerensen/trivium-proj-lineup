"use client";

import { useEffect } from "react";
import { Button } from "@/app/components/ui/Button/Button";
import Carousel from "@/app/components/ui/Carousel/Carousel";
import { useOnboarding } from "@/app/utils/userOnobardingContext";
import { useRouter } from "next/navigation";

export default function Step1() {
  const router = useRouter();
  const { canAccessStep, advanceStep } = useOnboarding();
  const stepNumber = 1;

  useEffect(() => {
    if (!canAccessStep(stepNumber)) {
      router.push("/pages/onboarding/step1");
    }
  }, [canAccessStep, stepNumber, router]);

  const handleNext = () => {
    advanceStep();
    router.push("/pages/onboarding/step2");
  };

  return (
    <> 
      {/* TODO refine carousel, add images and click events */}
     <Carousel slides={["Slide 1", "Slide 2", "Slide 3"]} heightClass="h-210"/>

      <Button onClick={handleNext} variant="primary">Get started!</Button>
    </>
  );
}
