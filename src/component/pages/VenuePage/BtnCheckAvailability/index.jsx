/* eslint-disable react/prop-types */

/**
 * Renders a button that displays venue information and triggers a scroll action to the calendar section.
 *
 * The button is divided into three sections:
 * - A header displaying the venue's city (from `data.location.city`) on a dark background.
 * - A middle section showing the price per night, formatted as "€{data.price} / Night".
 * - A footer with a call-to-action text "check availability" on a deep blue background.
 *
 * When clicked, the button invokes the `scrollToCalendar` callback, allowing users to quickly jump to the calendar section.
 *
 * @component
 * @param {object} props - The component props.
 * @param {object} props.data - The venue data object.
 * @param {object} props.data.location - The location details of the venue.
 * @param {string} props.data.location.city - The city where the venue is located.
 * @param {number|string} props.data.price - The price per night for the venue.
 * @param {Function} props.scrollToCalendar - Callback function to scroll to the calendar section.
 *
 * @example
 * // Example usage:
 * const venueData = {
 *   location: { city: "Fuerteventura" },
 *   price: 120
 * };
 *
 * <BtnCheckAvailability
 *   data={venueData}
 *   scrollToCalendar={() => window.scrollTo(0, document.getElementById('calendar').offsetTop)}
 * />
 *
 * @returns {JSX.Element} The rendered button component.
 */
export default function BtnCheckAvailability({ data, scrollToCalendar }) {
  return (
    <div>
      <button
        className="shadow-md shadow-natural-charcoal/40 sm:w-full"
        onClick={scrollToCalendar}
      >
        <div className="font-serif text-center bg-natural-charcoal text-white py-4 md:py-5 font-bold uppercase text-lg-leading-none md:text-xl-leading-none lg:text-2xl-leading-none w-48 md:w-56 lg:w-64 sm:w-full">
          <h2>{data.location.city}</h2>
        </div>
        <div className="text-center text-lg-leading-none md:text-xl-leading-none lg:text-2xl-leading-none font-bold py-2.5 md:py-5">
          <span>{`€${data.price} / Night`}</span>
        </div>
        <div className="font-serif text-center bg-deep-blue text-white text-xl-leading-none md:text-2xl-leading-none lg:text-3xl-leading-none font-bold capitalize py-3.75 md:py-5 lg:py-7.5 hover:bg-deep-blue/90">
          <p className="w-30 md:w-36 lg:w-44 mx-auto">check availability</p>
        </div>
      </button>
    </div>
  );
}
