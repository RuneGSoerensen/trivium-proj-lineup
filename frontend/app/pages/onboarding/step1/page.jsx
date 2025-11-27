"use client";

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
  const onboard_imgs = [ "/images/onboard-1.png", "/images/onboard-2.png", "/images/onboard-3.png"];
  const renderSlides = () => {
    return onboard_imgs.map((src, index) => (
      <div key={index} className="w-full h-full flex items-center justify-center">
        <Image width={150} height={250} src={src} alt={`Onboarding ${index + 1}`} className="object-cover w-full h-full" />
      </div>
    ));
  };

  return (
    <> 
      {/* TODO refine carousel, add images and click events */}
     <Carousel slides={renderSlides()} heightClass="h-210"/>

      <Button onClick={handleNext} variant="primary">Get started!</Button>
    </>
  );
}
