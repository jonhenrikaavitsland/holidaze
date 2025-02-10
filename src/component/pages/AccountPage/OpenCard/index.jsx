/* eslint-disable react/prop-types */
import Heading from "../../../Heading";
import Address from "../Address";
import CheckInOutBox from "../CheckInOutBox";
import DisplayMeta from "../DisplayMeta";

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
