import Heading from "../../../Heading";

/* eslint-disable react/prop-types */

/**
 * Renders a closed view of a booking card showing the venue name and the booking date range.
 *
 * This component displays the venue name as a heading and the check-in and check-out dates in a formatted manner.
 * The dates are wrapped in `<time>` elements for semantic markup.
 *
 * @component
 * @param {object} props - The component props.
 * @param {object} props.venueBooking - The booking object containing the booking and venue details.
 * @param {object} props.venueBooking.venue - The venue object associated with the booking.
 * @param {string} props.venueBooking.venue.name - The name of the venue.
 * @param {object} props.venueBooking.booking - The booking details object.
 * @param {string} props.venueBooking.booking.dateFrom - The original check-in date as an ISO string.
 * @param {string} props.venueBooking.booking.dateTo - The original check-out date as an ISO string.
 * @param {string} formattedDateFrom - The formatted check-in date to display.
 * @param {string} formattedDateTo - The formatted check-out date to display.
 *
 * @example
 * // Example usage:
 * <BookingClosed
 *   venueBooking={bookingData}
 *   formattedDateFrom="01.01.2025"
 *   formattedDateTo="05.01.2025"
 * />
 *
 * @returns {JSX.Element} The rendered closed booking view.
 */
export default function BookingClosed({
  venueBooking,
  formattedDateFrom,
  formattedDateTo,
}) {
  return (
    <section className="text-center flex flex-col md:flex-row gap-2.5 md:gap-5 lg:gap-10">
      <Heading level="3" className="text-deep-blue">
        {venueBooking.venue.name}
      </Heading>
      <span className="text-lg-leading-none md:text-xl-leading-none lg:text-2xl-leading-none">
        <time dateTime={venueBooking.booking.dateFrom}>
          {formattedDateFrom}
        </time>{" "}
        - <time dateTime={venueBooking.booking.dateTo}>{formattedDateTo}</time>
      </span>
    </section>
  );
}
