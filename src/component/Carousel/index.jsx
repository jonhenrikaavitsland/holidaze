/* eslint-disable react/prop-types */
import { useState } from "react";

export default function Carousel({ media }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? media.length - 1 : prevIndex - 1,
    );
  };

  if (!media || media.length === 0) {
    return <p>No images available</p>;
  }

  return (
    <div className="flex flex-col items-center">
      {/* Main Image */}
      <div className="relative h-64 md:h-110 w-full">
        <img
          src={media[currentIndex].url}
          alt={media[currentIndex].alt || `Slide ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
        {/* Navigation Buttons */}
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
      </div>

      {/* Thumbnail Row */}
      <div className="flex w-full overflow-x-auto">
        {media.map((item, index) => (
          <div
            key={index}
            className={`relative w-1/5 h-11 cursor-pointer`}
            onClick={() => setCurrentIndex(index)}
          >
            {/* Thumbnail Image */}
            <img
              src={item.url}
              alt={item.alt || `Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
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
