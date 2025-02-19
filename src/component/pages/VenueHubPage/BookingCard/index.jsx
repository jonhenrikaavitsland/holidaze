/* eslint-disable react/prop-types */
import { useState } from "react";
import BtnOpenClose from "../../../BtnOpenClose";
import BookingOpen from "../BookingOpen";
import BookingClosed from "../BookingClosed";

/**
 * Renders a booking card for a venue that toggles between a closed and an open view.
 *
 * This component displays a booking summary for a venue booking, including formatted check-in and check-out dates,
 * and the booking's sequential index relative to the total number of bookings. The card toggles between two states:
 * a closed view (rendered by the `BookingClosed` component) and an open view (rendered by the `BookingOpen` component)
 * when the user clicks on it. A button (via the `BtnOpenClose` component) visually indicates the current state and allows toggling.
 *
 * The component computes the formatted dates from the booking's `dateFrom` and `dateTo` values and calculates the duration
 * (in days) of the booking.
 *
 * @component
 * @param {object} props - The component props.
 * @param {object} props.venueBooking - The booking object containing booking details and associated venue information.
 * @param {number} props.index - The index of the booking in the list (used for display purposes).
 * @param {number} props.maxNum - The total number of bookings (used for display purposes).
 *
 * @example
 * // Example usage:
 * <BookingCard venueBooking={bookingData} index={0} maxNum={5} />
 *
 * @returns {JSX.Element} The rendered booking card component.
 */
export default function BookingCard({ venueBooking, index, maxNum }) {
  const [openState, setOpenState] = useState(false);
  const dateFromObj = new Date(venueBooking.booking.dateFrom);
  const dateToObj = new Date(venueBooking.booking.dateTo);

  const formattedDateFrom = dateFromObj
    .toLocaleDateString("en-GB", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    })
    .replace(/\//g, ".");
  const formattedDateTo = dateToObj
    .toLocaleDateString("en-GB", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    })
    .replace(/\//g, ".");

  const dayCount = (dateToObj - dateFromObj) / (1000 * 60 * 60 * 24);

  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs-leading-none">
        {index + 1} / {maxNum}
      </span>
      <div
        className={`relative bg-light-sky-blue pt-2.5 px-2.5 md:pt-5 md:px-5 lg:pt-7.5 lg:px-7.5 rounded-xl shadow-md shadow-natural-charcoal/40 ${openState ? "pb-15 md:pb-20 lg:pb-24" : "cursor-pointer pb-10 md:pb-15"}`}
        onClick={() => setOpenState(!openState)}
      >
        {openState ? (
          <BookingOpen
            venueBooking={venueBooking}
            formattedDateFrom={formattedDateFrom}
            formattedDateTo={formattedDateTo}
            dayCount={dayCount}
          />
        ) : (
          <BookingClosed
            venueBooking={venueBooking}
            formattedDateFrom={formattedDateFrom}
            formattedDateTo={formattedDateTo}
          />
        )}

        <BtnOpenClose openState={openState} />
      </div>
    </div>
  );
}
