"use client";
import React, { useState } from "react";
import { Button } from "../Button/Button";
import { ChevronRightCircle, ChevronLeftCircle } from "lucide-react";

const CAROUSEL_CONFIG =
  '{"loadingClasses": "opacity-0", "dotsItemClasses": "carousel-pagination carousel-dot carousel-active:bg-brand-primary"}';

/**
 * Reusable FlyonUI carousel component
 *
 * @param {Object} props
 * @param {Array<React.ReactNode | string>} props.slides - Content for each slide
 * @param {string} [props.heightClass="h-80"] - Tailwind height class for the carousel body
 * @param {string} [props.className] - Extra classes for the outer wrapper
 */
function Carousel({
  slides = [],
  heightClass = "h-80",
  className,
  slideClassName = "flex h-full relative justify-center p-6",
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasMultipleSlides = slides.length > 1;

  const goToIndex = (index) => {
    if (!hasMultipleSlides) return;
    const nextIndex = (index + slides.length) % slides.length;
    setActiveIndex(nextIndex);
  };

  const nextSlide = () => goToIndex(activeIndex + 1);
  const prevSlide = () => goToIndex(activeIndex - 1);

  return (
    <div
      className={`relative flex items-center justify-center w-full overflow-hidden ${className}`}
    >
      <div className="carousel relative mt-24 mb-36 w-full">
        <div className={`carousel-body ${heightClass} overflow-hidden`}>
          <div
            className="flex h-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {slides.map((slideContent, index) => (
              <div
                key={index}
                className={`carousel-slide w-full shrink-0 ${
                  index === activeIndex ? "active" : ""
                }`}
              >
                <div className={`carousel-slide-content ${slideClassName}`}>
                  {typeof slideContent === "string" ? (
                    <span className="self-center text-body">
                      {slideContent}
                    </span>
                  ) : (
                    slideContent
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-between pointer-events-none px-4 z-50">
        <button
          onClick={prevSlide}
          disabled={!hasMultipleSlides}
          aria-label="Previous slide"
          className="carousel-btn pointer-events-auto"
        >
          <ChevronLeftCircle size={32} strokeWidth={2} />
        </button>

        <button
          onClick={nextSlide}
          disabled={!hasMultipleSlides}
          aria-label="Next slide"
          className="carousel-btn pointer-events-auto"
        >
          <ChevronRightCircle size={32} strokeWidth={2} />
        </button>
      </div>
      <div className="carousel-pagination absolute bottom-0 end-0 start-0 flex justify-center gap-8">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => goToIndex(index)}
            className={`carousel-dot h-8 w-8 rounded-full ${
              activeIndex === index ? "active bg-brand-primary" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
