/* eslint-disable react/prop-types */
import { useState } from "react";
import BtnOpenClose from "../../../BtnOpenClose";
import ClosedCard from "../ClosedCard";
import OpenCard from "../OpenCard";
import VenueName from "../VenueName";

export default function BookingCard({ booking, index, maxNum }) {
  const dateFromObj = new Date(booking.dateFrom);
  const dateToObj = new Date(booking.dateTo);
  const [isCardOpen, setIsCardOpen] = useState(false);

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
    <div>
      <span className="text-xs-leading-none">
        {index + 1} / {maxNum}
      </span>
      <section
        className="relative flex flex-col gap-2.5 bg-light-sky-blue pt-2.5 px-2.5 pb-10 rounded-xl shadow-md shadow-natural-charcoal/40 cursor-pointer"
        onClick={() => setIsCardOpen(!isCardOpen)}
      >
        <VenueName booking={booking} isCardOpen={isCardOpen} />
        {!isCardOpen && (
          <ClosedCard
            booking={booking}
            formattedDateFrom={formattedDateFrom}
            formattedDateTo={formattedDateTo}
          />
        )}
        {isCardOpen && (
          <OpenCard
            booking={booking}
            formattedDateFrom={formattedDateFrom}
            formattedDateTo={formattedDateTo}
            days={dayCount}
          />
        )}
        <BtnOpenClose openState={isCardOpen} />
      </section>
    </div>
  );
}
