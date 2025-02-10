import Heading from "../../../Heading";

/* eslint-disable react/prop-types */
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
