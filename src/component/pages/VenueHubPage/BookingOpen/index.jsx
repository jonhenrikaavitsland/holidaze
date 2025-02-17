/* eslint-disable react/prop-types */

import Heading from "../../../Heading";

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
