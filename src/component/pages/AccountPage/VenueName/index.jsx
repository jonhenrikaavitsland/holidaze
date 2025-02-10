/* eslint-disable react/prop-types */
import Heading from "../../../Heading";

export default function VenueName({ booking, isCardOpen }) {
  return (
    <div className="flex gap-2.5 md:gap-3.75 lg:gap-5">
      <Heading level="3" className="text-deep-blue">
        {booking.venue.name}
      </Heading>
      {isCardOpen && (
        <div className="flex gap-2">
          {[...Array(booking.venue.rating)].map((_, index) => (
            <div key={index}>
              <img
                src="/logo_warm_200.png"
                alt="rating icon"
                className="h-4.5 md:h-5 lg:h-6"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
