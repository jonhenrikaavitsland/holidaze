/* eslint-disable react/prop-types */

/**
 * Renders an address block displaying location details for a given venue.
 *
 * This component displays a series of text elements that show:
 * - The name of the venue.
 * - The street address.
 * - The zip code and city.
 * - The fixed location "Fuerteventura" followed by the country.
 *
 * All text elements are styled with responsive typography and spacing.
 *
 * @component
 * @param {object} props - The component props.
 * @param {object} props.data - The venue data object.
 * @param {string} props.data.name - The name of the venue.
 * @param {object} props.data.location - The location details of the venue.
 * @param {string} props.data.location.address - The street address of the venue.
 * @param {string} props.data.location.zip - The zip code of the venue.
 * @param {string} props.data.location.city - The city where the venue is located.
 * @param {string} props.data.location.country - The country where the venue is located.
 *
 * @example
 * const venueData = {
 *   name: "Seaside Retreat",
 *   location: {
 *     address: "123 Ocean Drive",
 *     zip: "12345",
 *     city: "Example City",
 *     country: "Spain"
 *   }
 * };
 *
 * <Address data={venueData} />
 *
 * @returns {JSX.Element} The rendered address block.
 */
export default function Address({ data }) {
  return (
    <div className="flex flex-col leading-none md:text-lg-leading-none lg:text-xl-leading-none gap-1 md:gap-2 lg:gap-3 justify-end">
      <span className="w-max">{data.name}</span>
      <span className="w-max">{data.location.address}</span>
      <span className="w-max">
        {data.location.zip} {data.location.city}
      </span>
      <span className="w-max">Fuerteventura, {data.location.country}</span>
    </div>
  );
}
