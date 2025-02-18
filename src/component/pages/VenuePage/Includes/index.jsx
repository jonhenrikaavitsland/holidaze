/* eslint-disable react/prop-types */

/**
 * Renders a section displaying various included amenities and features for a venue.
 *
 * This component creates an object `included` that maps venue details to descriptive strings,
 * such as the venue's rating, maximum guest capacity, and available amenities like WiFi, breakfast,
 * pets, and parking. It then iterates over these entries and, for each non-null value, renders an
 * icon (using a warm logo image) alongside the descriptive text.
 *
 * @component
 * @param {object} props - The component props.
 * @param {object} props.data - The venue data object.
 * @param {number|string} props.data.rating - The rating of the venue.
 * @param {number|string} props.data.maxGuests - The maximum number of guests the venue can accommodate.
 * @param {object} props.data.meta - An object containing boolean flags for amenities.
 * @param {boolean} props.data.meta.wifi - Indicates if WiFi is available.
 * @param {boolean} props.data.meta.breakfast - Indicates if breakfast is included.
 * @param {boolean} props.data.meta.pets - Indicates if pets are welcome.
 * @param {boolean} props.data.meta.parking - Indicates if parking is available.
 *
 * @example
 * const venueData = {
 *   rating: 4.5,
 *   maxGuests: 6,
 *   meta: {
 *     wifi: true,
 *     breakfast: false,
 *     pets: true,
 *     parking: true,
 *   }
 * };
 *
 * <Includes data={venueData} />
 *
 * @returns {JSX.Element} The rendered component displaying the included amenities.
 */
export default function Includes({ data }) {
  const included = {
    rating: `Rating of ${data.rating}`,
    sleeps: `Sleeps up to ${data.maxGuests}`,
    wifi: data.meta.wifi ? "WiFi is available" : null,
    breakfast: data.meta.breakfast ? "Breakfast is included" : null,
    pets: data.meta.pets ? "Pets are welcome" : null,
    parking: data.meta.parking ? "Parking is available" : null,
  };

  return (
    <div className="grow">
      <div className="bg-light-sky-blue rounded-xl pt-2.5 px-2.5 pb-5 md:pt-5 md:px-5 md:pb-10 lg:pt-7.5 lg:px-7.5 lg:pb-15 flex flex-col md:flex-row md:flex-wrap gap-2.5 md:gap-5 lg:gap-7.5 shadow-md shadow-natural-charcoal/40">
        {Object.entries(included).map(([key, value]) => {
          if (value) {
            return (
              <div
                key={key}
                className="flex gap-2.5 leading-none md:text-lg-leading-none lg:text-xl-leading-none md:w-1/3 grow lg:w-1/4"
              >
                <img
                  src="/logo_warm_200.png"
                  alt="icon"
                  className="h-4 md:h-4.5 lg:h-5"
                />
                <span>{value}</span>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
