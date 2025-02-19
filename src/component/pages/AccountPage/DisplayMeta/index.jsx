/* eslint-disable react/prop-types */

/**
 * Renders a list of venue meta information regarding available amenities.
 *
 * This component takes a `meta` object and conditionally displays list items based on which amenities are enabled.
 * It checks for the following boolean properties:
 * - `wifi`: If true, displays that WiFi is included.
 * - `breakfast`: If true, displays that breakfast is included.
 * - `parking`: If true, displays that parking is available.
 * - `pets`: If true, displays that pets are welcome.
 *
 * @component
 * @param {object} props - The component props.
 * @param {object} props.meta - The meta data object for the venue.
 * @param {boolean} props.meta.wifi - Indicates whether WiFi is included.
 * @param {boolean} props.meta.breakfast - Indicates whether breakfast is included.
 * @param {boolean} props.meta.parking - Indicates whether parking is available.
 * @param {boolean} props.meta.pets - Indicates whether pets are welcome.
 *
 * @example
 * // Example usage:
 * const meta = { wifi: true, breakfast: true, parking: false, pets: true };
 * <DisplayMeta meta={meta} />
 *
 * @returns {JSX.Element} The rendered list of meta information.
 */
export default function DisplayMeta({ meta }) {
  return (
    <ul className="flex flex-col gap-1 leading-none md:text-lg-leading-none lg:text-xl-leading-none list-disc ms-5 md:ms-7.5 lg:ms-10">
      {meta.wifi && (
        <li>
          <span>WiFi is included</span>
        </li>
      )}
      {meta.breakfast && (
        <li>
          <span>Breakfast is included</span>
        </li>
      )}
      {meta.parking && (
        <li>
          <span>Parking is available</span>
        </li>
      )}
      {meta.pets && (
        <li>
          <span>Pets are welcome</span>
        </li>
      )}
    </ul>
  );
}
