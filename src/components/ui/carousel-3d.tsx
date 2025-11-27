import { useState } from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { Button } from "./button";

interface Carousel3DProps {
    images: string | string[];
    alt: string;
    className?: string;
}

export const Carousel3D = ({ images, alt, className = "" }: Carousel3DProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Normalize images to always be an array
    const imageArray = Array.isArray(images) ? images : [images];
    const totalImages = imageArray.length;

    // Only show carousel controls if there are multiple images
    const showControls = totalImages > 1;

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <div className={`relative h-48 w-[300px] rounded-md overflow-hidden group ${className}`}>
            {/* Images Container with 3D effect */}
            <div className="relative h-full w-full perspective-1000">
                {imageArray.map((image, index) => {
                    const isActive = index === currentIndex;
                    const isPrev = index === (currentIndex - 1 + totalImages) % totalImages;
                    const isNext = index === (currentIndex + 1) % totalImages;

                    let transformClass = "translate-x-full opacity-0 scale-75";
                    let zIndexClass = "z-0";

                    if (isActive) {
                        transformClass = "translate-x-0 opacity-100 scale-100";
                        zIndexClass = "z-20";
                    } else if (isPrev) {
                        transformClass = "-translate-x-full opacity-0 scale-75";
                        zIndexClass = "z-10";
                    } else if (isNext) {
                        transformClass = "translate-x-full opacity-0 scale-75";
                        zIndexClass = "z-10";
                    }

                    return (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-all duration-500 ease-in-out transform ${transformClass} ${zIndexClass}`}
                            style={{
                                transformStyle: "preserve-3d",
                            }}
                        >
                            <img
                                src={image}
                                alt={`${alt} - ${index + 1}`}
                                className="h-full w-full object-cover rounded-md"
                            />
                        </div>
                    );
                })}
            </div>

            {/* Navigation Buttons - Only show if multiple images */}
            {showControls && (
                <>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={goToPrevious}
                    >
                        <IconChevronLeft className="h-6 w-6" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={goToNext}
                    >
                        <IconChevronRight className="h-6 w-6" />
                    </Button>
                </>
            )}

            {/* Indicator Dots - Only show if multiple images */}
            {showControls && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                    {imageArray.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`h-2 w-2 rounded-full transition-all ${index === currentIndex
                                    ? "bg-white w-6"
                                    : "bg-white/50 hover:bg-white/75"
                                }`}
                            aria-label={`Go to image ${index + 1}`}
                        />
                    ))}
                </div>
            )}

            {/* Image Counter */}
            {showControls && (
                <div className="absolute top-2 right-2 z-30 bg-black/50 text-white text-xs px-2 py-1 rounded">
                    {currentIndex + 1} / {totalImages}
                </div>
            )}
        </div>
    );
};
