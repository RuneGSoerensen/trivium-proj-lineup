"use client";

import { Button } from "@ui/Button/Button";
import Carousel from "@ui/Carousel/Carousel";
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
      router.push(`/pages/onboarding/step${maxStepReached}`);
    }
  }, [canAccessStep, stepNumber, router, maxStepReached]);

  const handleNext = () => {
    advanceStep();
    router.push("/pages/onboarding/step2");
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
        className="w-full h-full flex flex-col items-center justify-center"
      >
        <Image
          width={350}
          height={350}
          src={content.image}
          alt={`Onboarding ${index + 1}`}
          className="object-cover w-full h-full"
        />
        <h2 className="text-center mt-6 text-lg font-semibold">
          {content.label}
        </h2>
      </div>
    ));
  };

  return (
    <div className="space-y-24 h-full flex flex-col items-center justify-center">
      {/* TODO refine carousel, add images and click events */}
      <Carousel slides={renderSlides()} heightClass="h-310" />
      <Button onClick={handleNext} width="fit" variant="primary">
        Get started!
      </Button>
    </div>
  );
}
