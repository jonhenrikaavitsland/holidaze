import { useLocation } from "react-router-dom";
import LinkElement from "./LinkElement";

/**
 * Renders a breadcrumb navigation component based on the current URL path and venue details.
 *
 * The component uses React Router's `useLocation` hook to determine the current path and renders different breadcrumb structures accordingly:
 * - For a venue booking page (path matching `/venue/{venueId}/booking`), it displays:
 *   - A "Home" link.
 *   - A link to the venue page with the provided `venueName`.
 *   - A bold "Booking" label.
 * - For a venue page (path matching `/venue/{venueId}`), it displays:
 *   - A "Home" link.
 *   - A bold label with the venue name.
 * - For a location page (path matching one of the predefined location paths), it displays:
 *   - A "Home" link.
 *   - A bold label with the location name, formatted by replacing hyphens with spaces.
 *
 * @component
 * @param {object} props - The component props.
 * @param {string|number} props.venueId - The identifier for the venue used in constructing the breadcrumb URL.
 * @param {string} props.venueName - The display name of the venue.
 * @example
 * // Example usage:
 * <BreadCrumb venueId="123" venueName="The Venue" />
 *
 * @returns {JSX.Element|null} The rendered breadcrumb navigation element.
 */
export default function BreadCrumb({ venueId, venueName }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const breadcrumbMap = {
    "/locations/corralejo": "Corralejo",
    "/locations/costa-calma": "Costa-Calma",
    "/locations/caleta-de-fuste": "Caleta-de-Fuste",
    "/locations/el-cotillo": "El-Cotillo",
    "/locations/morro-jable": "Morro-Jable",
  };

  const currentBreadcrumb = breadcrumbMap[currentPath];

  const renderBreadCrumb = () => {
    switch (currentPath.toLowerCase()) {
      case `/venue/${venueId}/booking`.toLowerCase():
        return (
          <nav className="ms-5 md:ms-7.5 lg:ms-10">
            <ul className="flex flex-wrap items-center gap-x-2.5">
              <LinkElement to="/" content="Home" />
              <LinkElement to={`/venue/${venueId}`} content={venueName} />
              <li className="py-2.5 font-serif font-bold leading-none;">
                <span>{"Booking"}</span>
              </li>
            </ul>
          </nav>
        );
      case `/venue/${venueId}`.toLowerCase():
        return (
          <nav className="ms-5 md:ms-7.5 lg:ms-10">
            <ul className="flex flex-wrap items-center gap-x-2.5">
              <LinkElement to="/" content="Home" />
              <li className="py-2.5 font-serif font-bold leading-none;">
                <span>{venueName}</span>
              </li>
            </ul>
          </nav>
        );
      case `/locations/${currentBreadcrumb}`.toLowerCase():
        return (
          <nav className="ms-5 md:ms-7.5 lg:ms-10">
            <ul className="flex flex-wrap items-center gap-x-2.5">
              <LinkElement to="/" content="Home" />
              <li className="py-2.5 font-serif font-bold leading-none;">
                <span>{currentBreadcrumb.replace(/-/g, " ")}</span>
              </li>
            </ul>
          </nav>
        );
    }
  };
  return renderBreadCrumb();
}
