"use client";

import { Button } from "@/app/components/ui/Button/Button";
import Carousel from "@/app/components/ui/Carousel/Carousel";
import { useOnboarding } from "@/app/utils/userOnobardingContext";
import { useRouter } from "next/navigation";

export default function Step1() {
  const router = useRouter();
  const { userData, updateUser } = useOnboarding();

  const handleNext = () => {
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
