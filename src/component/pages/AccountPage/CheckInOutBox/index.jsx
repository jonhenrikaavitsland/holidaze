/* eslint-disable react/prop-types */

/**
 * Renders a check-in and check-out information box for a booking.
 *
 * This component displays a labeled box that shows the check-in and check-out dates
 * in a formatted manner. It uses the provided booking dates and their corresponding formatted strings,
 * and wraps them in `<time>` elements for semantic markup.
 *
 * @component
 * @param {object} props - The component props.
 * @param {object} props.booking - The booking object containing the original date values.
 * @param {string} props.booking.dateFrom - The ISO date string for check-in.
 * @param {string} props.booking.dateTo - The ISO date string for check-out.
 * @param {string} formattedDateFrom - The formatted check-in date to display.
 * @param {string} formattedDateTo - The formatted check-out date to display.
 *
 * @example
 * // Example usage:
 * <CheckInOutBox
 *   booking={booking}
 *   formattedDateFrom="01.01.2025"
 *   formattedDateTo="05.01.2025"
 * />
 *
 * @returns {JSX.Element} The rendered check-in and check-out box component.
 */
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
