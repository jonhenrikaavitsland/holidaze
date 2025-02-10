/* eslint-disable react/prop-types */
export default function ClosedCard({
  booking,
  formattedDateFrom,
  formattedDateTo,
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="leading-none">
        {booking.venue.location.city}, Fuerteventura
      </span>
      <span className="leading-none">{booking.venue.location.country}</span>
      <div className="leading-none">
        <time className="" dateTime={booking.dateFrom}>
          {formattedDateFrom}
        </time>
        <span> - </span>
        <time dateTime={booking.dateTo}>{formattedDateTo}</time>
      </div>
    </div>
  );
}
