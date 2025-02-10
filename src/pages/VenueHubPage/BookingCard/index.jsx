/* eslint-disable react/prop-types */
import { useState } from "react";
import BtnOpenClose from "../../../component/BtnOpenClose";
import BookingClosed from "../BookingClosed";
import BookingOpen from "../../../component/pages/VenueHubPage/BookingOpen";

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
