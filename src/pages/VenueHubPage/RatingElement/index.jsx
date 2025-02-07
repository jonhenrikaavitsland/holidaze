import { useEffect, useState } from "react";
import useCreateVenueStore from "../../../js/store/useCreateVenueStore";

export default function RatingElement() {
  const { rating, setRating } = useCreateVenueStore();
  const [iconCount, setIconCount] = useState(rating);
  const maxIcons = 5;

  useEffect(() => {
    setRating(iconCount);
  }, [iconCount, setRating]);

  const increaseCount = () => {
    if (iconCount < maxIcons) {
      setIconCount(iconCount + 1);
    }
  };

  const decreaseCount = () => {
    if (iconCount > 1) {
      setIconCount(iconCount - 1);
    }
  };

  return (
    <li>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between">
          <label className="text-sm-leading-none capitalize" htmlFor="rating">
            rating
          </label>
          <p className="text-sm-leading-none font-bold">{iconCount}</p>
        </div>
        <div
          className="bg-warm-beige flex gap-5 justify-center items-center border border-natural-charcoal/40 h-9 text-center font-medium leading-none text-natural-charcoal"
          id="rating"
        >
          <button
            className="cursor-pointer grow flex justify-end hover:bg-custom-coral/20 pe-2.5 py-2.5 items-center"
            onClick={decreaseCount}
            disabled={iconCount === 1}
            type="button"
          >
            <img
              src="/minus-solid.svg"
              alt="decrease"
              className="h-4 md:h-4.5 lg:h-5"
            />
          </button>
          <div className="flex gap-2.5 min-w-32 md:min-w-36 lg:min-w-40 justify-center">
            {Array.from({ length: iconCount }, (_, index) => (
              <div key={index}>
                <img
                  src="/logo_warm_200.png"
                  alt="rating sun"
                  className="h-4 md:h-4.5 lg:h-5"
                />
              </div>
            ))}
          </div>
          <button
            className="cursor-pointer grow hover:bg-custom-coral/20 ps-2.5 py-2.5 flex items-center"
            onClick={increaseCount}
            disabled={iconCount === maxIcons}
            type="button"
          >
            <img
              src="/plus-solid.svg"
              alt="increase"
              className="h-4 md:h-4.5 lg:h-5"
            />
          </button>
        </div>
      </div>
    </li>
  );
}
