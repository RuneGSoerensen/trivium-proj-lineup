"use client";
import React from "react";
import { Button } from "../Button/Button";
import { ChevronRightCircle, ChevronLeftCircle } from "lucide-react"

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
function Carousel({ slides = [], heightClass = "h-80", className, slideClassName = "flex h-full relative justify-center p-6" }) {
    if (!slides.length) return null;

    const handleClick = (direction) => {
        direction === 'next' ? console.log('Next slide') : console.log('Previous slide');
    };

    return (
        <div
            data-carousel={CAROUSEL_CONFIG}
            className={`relative flex items-center justify-center w-full overflow-hidden ${className}`}
        >
            <div className="carousel">
                <div className={`carousel-body ${heightClass}`}>
                    {slides.map((slideContent, index) => (
                        <div
                            key={index}
                            className={`carousel-slide ${index === 0 ? "active" : ""}`}
                        >
                            <div className={`carousel-slide-content ${slideClassName}`}>
                                {typeof slideContent === "string" ? (
                                    <span className="self-center text-body">{slideContent}</span>
                                ) : (
                                    slideContent
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Button
                variant="secondary"
                type="icon"
                rightIcon={<ChevronLeftCircle stroke="inherit" />}
                iconSize="lg"
                className="carousel-btn"
                onClick={handleClick.bind(null, 'prev')}
            >
                <span className="sr-only">Previous</span>
            </Button>

            <Button
                variant="secondary"
                type="icon"
                rightIcon={<ChevronRightCircle stroke="inherit" />}
                iconSize="lg"
                className="carousel-btn"
                onClick={handleClick.bind(null, 'next')}
            >
                <span className="sr-only">Next</span>
            </Button>

            <div className="carousel-pagination absolute bottom-3 end-0 start-0 flex justify-center gap-8" />
        </div>
    );
}

export default Carousel;
