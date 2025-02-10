/* eslint-disable react/prop-types */
export default function CheckInOutBox({
  booking,
  formattedDateFrom,
  formattedDateTo,
}) {
  return (
    <div className="flex flex-col gap-1.5 md:gap-2 bg-white border border-natural-charcoal/40 p-1 md:p-1.5 leading-none">
      <span className="text-sm-leading-none font-medium md:text-base md:leading-none">
        Check-in / Check-out
      </span>
      <div className="mx-auto text-base md:text-lg">
        <time className="" dateTime={booking.dateFrom}>
          {formattedDateFrom}
        </time>
        <span> - </span>
        <time dateTime={booking.dateTo}>{formattedDateTo}</time>
      </div>
    </div>
  );
}
