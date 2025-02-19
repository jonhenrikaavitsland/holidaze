/* eslint-disable react/prop-types */

import Heading from "../../../Heading";

/**
 * Renders an expanded view of a booking card, displaying detailed booking and guest information.
 *
 * This component presents comprehensive details about a booking including:
 * - The booking creation date, venue name, booking date range, and location.
 * - Financial details such as the calculated booking value (based on the nightly price and day count) and price per night.
 * - Guest information including the number of guests, the contact person's name, and email address.
 *
 * Dates are formatted using locale settings (en-GB) with slashes replaced by periods.
 *
 * @component
 * @param {object} props - The component props.
 * @param {object} props.venueBooking - The booking object containing details of the booking and associated venue.
 * @param {object} props.venueBooking.booking - The booking details.
 * @param {string} props.venueBooking.booking.created - The ISO string representing when the booking was created.
 * @param {string} props.venueBooking.booking.dateFrom - The ISO string representing the check-in date.
 * @param {string} props.venueBooking.booking.dateTo - The ISO string representing the check-out date.
 * @param {number} props.venueBooking.booking.guests - The number of guests included in the booking.
 * @param {object} props.venueBooking.booking.customer - The customer details associated with the booking.
 * @param {string} props.venueBooking.booking.customer.name - The name of the customer.
 * @param {string} props.venueBooking.booking.customer.email - The email address of the customer.
 * @param {object} props.venueBooking.venue - The venue object containing venue-specific details.
 * @param {string} props.venueBooking.venue.name - The name of the venue.
 * @param {number} props.venueBooking.venue.price - The nightly price for the venue.
 * @param {object} props.venueBooking.venue.location - The location details of the venue.
 * @param {string} props.venueBooking.venue.location.city - The city where the venue is located.
 * @param {string} props.venueBooking.venue.location.country - The country where the venue is located.
 * @param {number} dayCount - The total number of days for the booking (used to calculate the booking value).
 * @param {string} formattedDateFrom - The formatted check-in date to be displayed.
 * @param {string} formattedDateTo - The formatted check-out date to be displayed.
 *
 * @example
 * // Example usage:
 * <BookingOpen
 *   venueBooking={bookingData}
 *   formattedDateFrom="01.01.2025"
 *   formattedDateTo="05.01.2025"
 *   dayCount={4}
 * />
 *
 * @returns {JSX.Element} The rendered detailed view of the booking card.
 */
export default function BookingOpen({
  venueBooking,
  formattedDateFrom,
  formattedDateTo,
  dayCount,
}) {
  const dateCreated = new Date(venueBooking.booking.created);

  const formattedDateCreated = dateCreated
    .toLocaleDateString("en-GB", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    })
    .replace(/\//g, ".");

  return (
    <div className="flex flex-col gap-5 md:gap-7.5 lg:gap-10">
      <section className="flex flex-col gap-2.5 md:gap-5 lg:gap-7.5">
        <Heading level="3" className="text-deep-blue">
          booking details
        </Heading>
        <div className="flex flex-col gap-1 md:gap-1.5 lg:gap-2 leading-none">
          <span className="capitalized italic text-sm-leading-none md:text-base md:leading-none lg:text-lg-leading-none">
            created{" "}
            <time dateTime={venueBooking.booking.created}>
              {formattedDateCreated}
            </time>
          </span>
          <p className="font-medium text-lg-leading-none md:text-xl-leading-none lg:text-2xl-leading-none">
            {venueBooking.venue.name}
          </p>
          <span className="md:text-lg-leading-none lg:text-xl-leading-none">
            <time dateTime={venueBooking.booking.dateFrom}>
              {formattedDateFrom}
            </time>{" "}
            -{" "}
            <time dateTime={venueBooking.booking.dateTo}>
              {formattedDateTo}
            </time>
          </span>
          <p className="capitalize md:text-lg-leading-none lg:text-xl-leading-none">
            <span>{venueBooking.venue.location.city}</span>, fuerteventura
          </p>
          <p className="md:text-lg-leading-none lg:text-xl-leading-none">
            {venueBooking.venue.location.country}
          </p>
        </div>
        <div className="flex flex-col gap-1 md:gap-1.5 lg:gap-2 mt-2.5 md:mt-0">
          <div className="flex gap-2.5 md:gap-5 lg:gap-7.5 text-lg-leading-none font-medium md:text-xl-leading-none lg:text-2xl-leading-none">
            <p>Booking value:</p>
            <div className="bg-white px-1 grow">
              <span>€{Math.round(dayCount * venueBooking.venue.price)}</span>
            </div>
          </div>
          <div className="flex gap-2.5 md:gap-5 lg:gap-7.5 leading-none md:text-lg-leading-none lg:text-xl-leading-none">
            <p>Price per night:</p>
            <div className="bg-white px-1 grow">
              <span>€{venueBooking.venue.price}</span>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-2.5 md:gap-5 lg:gap-7.5">
        <Heading level="3" className="text-deep-blue">
          guest details
        </Heading>
        <div className="flex flex-col gap-1 md:gap-1.5 lg:gap-2 leading-none md:text-lg-leading-none lg:text-xl-leading-none">
          <div className="flex gap-2.5 md:gap-5 lg:gap-7.5">
            <p>Number of guests:</p>
            <div className="bg-white px-1 grow">
              <span>{venueBooking.booking.guests}</span>
            </div>
          </div>
          <div className="flex gap-2.5 md:gap-5 lg:gap-7.5">
            <p>Contact person:</p>
            <div className="bg-white px-1 grow">
              <span className="capitalize">
                {venueBooking.booking.customer.name}
              </span>
            </div>
          </div>
          <div className="flex gap-2.5 md:gap-5 lg:gap-7.5">
            <p className="whitespace-nowrap">Contact email:</p>
            <div className="bg-white px-1 grow min-w-0">
              <span className="break-words">
                {venueBooking.booking.customer.email}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
