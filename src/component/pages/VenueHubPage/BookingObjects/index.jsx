/* eslint-disable react/prop-types */

import BookingCard from "../BookingCard";

/**
 * Renders a list of booking cards based on an array of sorted venue bookings.
 *
 * This component maps over the `sortedVenueBookings` array and renders each booking using the `BookingCard` component.
 * Each booking card is wrapped in a list item and displays booking details such as venue name and booking dates.
 *
 * @component
 * @param {object} props - The component props.
 * @param {Array} props.sortedVenueBookings - An array of booking objects sorted by a specific criterion.
 *
 * @example
 * // Example usage:
 * const sortedBookings = [booking1, booking2, booking3];
 * <BookingObjects sortedVenueBookings={sortedBookings} />
 *
 * @returns {JSX.Element} The rendered list of booking cards.
 */
export default function BookingObjects({ sortedVenueBookings }) {
  return (
    <ul className="flex flex-col gap-5 md:gap-7.5 lg:gap-10">
      {sortedVenueBookings.map((venueBooking, index) => (
        <li key={index}>
          <BookingCard
            venueBooking={venueBooking}
            index={index}
            maxNum={sortedVenueBookings.length}
          />
        </li>
      ))}
    </ul>
  );
}
