/* eslint-disable react/prop-types */

/**
 * Renders a closed view of a booking card displaying basic venue and date information.
 *
 * This component displays a brief summary of a booking including the venue's city and country,
 * as well as the formatted check-in and check-out dates. It is typically used when the booking card is in its closed state.
 *
 * @component
 * @param {object} props - The component props.
 * @param {object} props.booking - The booking object containing venue and date information.
 * @param {object} props.booking.venue - The venue object associated with the booking.
 * @param {object} props.booking.venue.location - The location details of the venue.
 * @param {string} props.booking.venue.location.city - The city where the venue is located.
 * @param {string} props.booking.venue.location.country - The country where the venue is located.
 * @param {string} props.booking.dateFrom - The ISO date string representing the check-in date.
 * @param {string} props.booking.dateTo - The ISO date string representing the check-out date.
 * @param {string} formattedDateFrom - The formatted check-in date to display.
 * @param {string} formattedDateTo - The formatted check-out date to display.
 *
 * @example
 * // Example usage:
 * <ClosedCard
 *   booking={bookingData}
 *   formattedDateFrom="01.01.2025"
 *   formattedDateTo="05.01.2025"
 * />
 *
 * @returns {JSX.Element} The rendered closed booking card component.
 */
export default function ClosedCard({
  booking,
  formattedDateFrom,
  formattedDateTo,
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="leading-none">
        {booking.venue.location.city}, Fuerteventura
      </span>
      <span className="leading-none">{booking.venue.location.country}</span>
      <div className="leading-none">
        <time className="" dateTime={booking.dateFrom}>
          {formattedDateFrom}
        </time>
        <span> - </span>
        <time dateTime={booking.dateTo}>{formattedDateTo}</time>
      </div>
    </div>
  );
}
