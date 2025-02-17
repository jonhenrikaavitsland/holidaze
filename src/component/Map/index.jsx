/* eslint-disable react/prop-types */
import { fallBackMap, locationsMap } from "../../js/data/constants";

/**
 * Renders an iframe displaying a map based on the provided location data.
 *
 * The component attempts to find a matching location from a predefined locations map
 * using the latitude and longitude provided in the `data` prop. If a match is found,
 * it uses the corresponding map URL; otherwise, it falls back to a default map URL.
 *
 * @component
 * @param {object} props - The component props.
 * @param {object} props.data - The data object containing location information.
 * @param {object} props.data.location - The location object.
 * @param {number} props.data.location.lat - The latitude of the location.
 * @param {number} props.data.location.lng - The longitude of the location.
 *
 * @example
 * // Example usage:
 * const data = {
 *   location: {
 *     lat: 28.12345,
 *     lng: -16.12345,
 *   },
 * };
 * <Map data={data} />
 *
 * @returns {JSX.Element} The rendered map iframe element.
 */
export default function Map({ data }) {
  const location = Object.values(locationsMap).find(
    (loc) => loc.lat === data.location.lat && loc.lng === data.location.lng,
  );

  // Fallback URL if no match is found
  const mapUrl = location ? location.map : fallBackMap; // Default fallback map URL

  return (
    <iframe
      className="border-0 w-full md:h-110"
      src={mapUrl}
      width="400"
      height="300"
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
}
