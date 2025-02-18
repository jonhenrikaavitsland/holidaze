/* eslint-disable react/prop-types */

/**
 * Renders the formatted address information for a booking's venue.
 *
 * This component displays the venue's address details including the street address, postal code, city, and country.
 * It expects a `booking` prop with a nested structure where the venue's location data is provided.
 *
 * @component
 * @param {object} props - The component props.
 * @param {object} props.booking - The booking object.
 * @param {object} props.booking.venue - The venue object associated with the booking.
 * @param {object} props.booking.venue.location - The location details of the venue.
 * @param {string} props.booking.venue.location.address - The street address of the venue.
 * @param {string} props.booking.venue.location.zip - The postal code of the venue.
 * @param {string} props.booking.venue.location.city - The city where the venue is located.
 * @param {string} props.booking.venue.location.country - The country where the venue is located.
 *
 * @example
 * // Example usage:
 * const booking = {
 *   venue: {
 *     location: {
 *       address: "123 Main Street",
 *       zip: "12345",
 *       city: "Example City",
 *       country: "Spain"
 *     }
 *   }
 * };
 * <Address booking={booking} />
 *
 * @returns {JSX.Element} A JSX element displaying the formatted address.
 */
export default function Address({ booking }) {
  return (
    <div className="flex flex-col leading-none gap-2.5 md:text-lg-leading-none lg:text-xl-leading-none">
      <span>{booking.venue.location.address}</span>
      <span>
        {booking.venue.location.zip} {booking.venue.location.city}
      </span>
      <span>Fuerteventura, {booking.venue.location.country}</span>
    </div>
  );
}
