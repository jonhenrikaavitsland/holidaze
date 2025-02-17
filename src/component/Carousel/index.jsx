/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";

export default function Carousel({ media }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
  }, [media]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? media.length - 1 : prevIndex - 1,
    );
  }, [media]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        prevSlide();
      } else if (event.key === "ArrowRight") {
        nextSlide();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [nextSlide, prevSlide]);

  if (!media || media.length === 0) {
    return (
      <div className="md:mx-7.5 py-30 md:py-48 bg-natural-charcoal text-white font-bold">
        <div className="flex items-center justify-center h-15 md:h-25">
          <p>No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center bg-natural-charcoal md:mx-7.5">
      {/* Main Image */}
      <div className="relative h-64 md:h-110 w-full">
        <img
          src={media[currentIndex].url}
          alt={media[currentIndex].alt || `Slide ${currentIndex + 1}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Navigation Buttons - only show if media length is greater than 1 */}
        {media.length >= 2 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2.5 top-1/2 transform -translate-y-1/2 bg-natural-charcoal text-white px-2 py-1 rounded-full shadow-md hover:bg-natural-charcoal/80"
            >
              &#8592;
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2.5 top-1/2 transform -translate-y-1/2 bg-natural-charcoal text-white px-2 py-1 rounded-full shadow-md hover:bg-natural-charcoal/80"
            >
              &#8594;
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Row */}
      <div className="flex w-full overflow-x-auto">
        {media.map((item, index) => (
          <div
            key={index}
            className={`relative w-1/5 md:w-1/6 lg:w-1/10 h-11 cursor-pointer`}
            onClick={() => setCurrentIndex(index)}
          >
            {/* Thumbnail Image */}
            <img
              src={item.url}
              alt={item.alt || `Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Overlay */}
            {currentIndex !== index && (
              <div className="absolute inset-0 bg-natural-charcoal/70 hover:bg-transparent"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
