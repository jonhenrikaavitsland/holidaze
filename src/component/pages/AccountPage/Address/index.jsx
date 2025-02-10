/* eslint-disable react/prop-types */
export default function Address({ booking }) {
  return (
    <div className="flex flex-col leading-none gap-2.5 md:text-lg-leading-none lg:text-xl-leading-none">
      <span>{booking.venue.location.address}</span>
      <span>
        {booking.venue.location.zip} {booking.venue.location.city}
      </span>
      <span>Fuerteventura, {booking.venue.location.country}</span>
    </div>
  );
}
