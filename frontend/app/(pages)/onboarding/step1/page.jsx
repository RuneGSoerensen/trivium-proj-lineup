"use client";

import { Button } from "@/ui/Button/Button";
import Carousel from "@/ui/Carousel/Carousel";
import { useOnboarding } from "@/utils/userOnboardingContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Step1() {
  const router = useRouter();
  const { canAccessStep, advanceStep, maxStepReached } = useOnboarding();
  const stepNumber = 1;

  useEffect(() => {
    if (!canAccessStep(stepNumber)) {
      router.push(`/onboarding/step${maxStepReached}`);
    }
  }, [canAccessStep, stepNumber, router, maxStepReached]);

  const handleNext = () => {
    advanceStep();
    router.push("/onboarding/step2");
  };

  const onboard_imgs = [
    "/images/onboard-1.png",
    "/images/onboard-2.png",
    "/images/onboard-3.png",
  ];
  const onboard_txt = [
    "Discover and connect with musicians worldwide.",
    "Request and offer music services with ease.",
    "Find the best services to elevate your music.",
  ];

  const onboard_content = onboard_imgs.map((src, index) => ({
    image: src,
    label: onboard_txt[index],
  }));

  const renderSlides = () => {
    return onboard_content.map((content, index) => (
      <div
        key={index}
        className="w-full max-h-fit flex flex-col items-center justify-center"
      >
        <Image
          width={250}
          height={250}
          src={content.image}
          alt={`Onboarding ${index + 1}`}
          className="object-contain w-8/12 h-11/12"
          loading="eager"
        />
        <h2 className="text-center mt-6 text-lg font-semibold flex-wrap px-12">
          {content.label}
        </h2>
      </div>
    ));
  };

  return (
    <div className="space-y-48 h-full flex flex-col items-center justify-center">
      <Carousel slides={renderSlides()} heightClass="h-fit" slideClassName="justify-center" />
      <Button onClick={handleNext} variant="primary">
        Get started!
      </Button>
    </div>
  );
}
