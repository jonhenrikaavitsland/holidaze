/* eslint-disable react/prop-types */
import Heading from "../../../Heading";
import Address from "../Address";
import CheckInOutBox from "../CheckInOutBox";
import DisplayMeta from "../DisplayMeta";

/**
 * Renders the expanded (open) view of a booking card, showing detailed information about the booking.
 *
 * This component displays detailed information about a booking including:
 * - The venue address (using the Address component).
 * - Check-in and check-out dates (using the CheckInOutBox component).
 * - A list of amenities included at the venue (using the DisplayMeta component, preceded by a heading).
 * - Guest count, price per night, and the total cost calculated by multiplying the nightly rate by the number of days.
 *
 * @component
 * @param {object} props - The component props.
 * @param {object} props.booking - The booking object containing details about the booking and venue.
 * @param {string} props.booking.venue.price - The nightly price of the venue.
 * @param {object} props.booking.venue.meta - An object containing boolean values for available amenities (wifi, breakfast, parking, pets).
 * @param {number} props.booking.guests - The number of guests for the booking.
 * @param {string} props.formattedDateFrom - The formatted check-in date.
 * @param {string} props.formattedDateTo - The formatted check-out date.
 * @param {number} props.days - The total number of days for the booking (used to calculate the total cost).
 *
 * @example
 * // Example usage:
 * <OpenCard
 *   booking={bookingData}
 *   formattedDateFrom="01.01.2025"
 *   formattedDateTo="05.01.2025"
 *   days={4}
 * />
 *
 * @returns {JSX.Element} The rendered open booking card component.
 */
export default function OpenCard({
  booking,
  formattedDateFrom,
  formattedDateTo,
  days,
}) {
  const totalValue = booking.venue.price * days;

  return (
    <div className="flex flex-col gap-5">
      <Address booking={booking} />
      <CheckInOutBox
        booking={booking}
        formattedDateFrom={formattedDateFrom}
        formattedDateTo={formattedDateTo}
      />
      <section className="flex flex-col gap-2.5">
        <Heading level="3" className="text-deep-blue">
          Amenities Included:
        </Heading>
        <DisplayMeta meta={booking.venue.meta} />
      </section>
      <div className="flex flex-col gap-2.5 leading-none md:text-lg-leading-none lg:text-xl-leading-none">
        <span>{booking.guests} Guests</span>
        <span>€{booking.venue.price} / night</span>
        <span>€{totalValue} Total</span>
      </div>
    </div>
  );
}
