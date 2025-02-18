/* eslint-disable react/prop-types */
import Heading from "../../../Heading";

/**
 * Renders the venue name along with its rating when the booking card is open.
 *
 * This component displays the name of the venue as a heading. When the card is in the open state,
 * it also displays a series of rating icons corresponding to the venue's rating. Each rating icon is rendered as an image.
 *
 * @component
 * @param {object} props - The component props.
 * @param {object} props.booking - The booking object containing venue details.
 * @param {object} props.booking.venue - The venue object associated with the booking.
 * @param {string} props.booking.venue.name - The name of the venue.
 * @param {number} props.booking.venue.rating - The rating of the venue (number of rating icons to display).
 * @param {boolean} props.isCardOpen - Indicates whether the booking card is open (to conditionally display the rating icons).
 *
 * @example
 * // Example usage:
 * const booking = {
 *   venue: {
 *     name: "Seaside Retreat",
 *     rating: 4,
 *   },
 * };
 *
 * <VenueName booking={booking} isCardOpen={true} />
 *
 * @returns {JSX.Element} The rendered venue name component with optional rating icons.
 */
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
