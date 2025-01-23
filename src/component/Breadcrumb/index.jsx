import { useLocation } from "react-router-dom";
import LinkElement from "./LinkElement";

export default function BreadCrumb({ venueId, venueName }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const breadcrumbMap = {
    "/corralejo/": "Corralejo",
    "/costa-calma/": "Costa Calma",
    "/caleta-de-fuste/": "Caleta de Fuste",
    "/el-cotillo/": "El Cotillo",
    "/morro-jable/": "Morro Jable",
  };

  const currentBreadcrumb = breadcrumbMap[currentPath];

  const renderBreadCrumb = () => {
    switch (currentPath) {
      case "/venue-hub/create-new-venue/":
        return (
          <nav className="ms-5 md:ms-7.5 lg:ms-10">
            <ul className="flex flex-wrap items-center gap-x-2.5">
              <LinkElement to="/" content="Home" />
              <LinkElement to="/venue-hub" content="Venue HUB" />
              <li className="py-2.5 font-serif font-bold leading-none;">
                <span>{"Create New Venue"}</span>
              </li>
            </ul>
          </nav>
        );
      case "/venue-hub/update-venue/":
        return (
          <nav className="ms-5 md:ms-7.5 lg:ms-10">
            <ul className="flex flex-wrap items-center gap-x-2.5">
              <LinkElement to="/" content="Home" />
              <LinkElement to="/venue-hub" content="Venue HUB" />
              <li className="py-2.5 font-serif font-bold leading-none;">
                <span>{"Update Venue"}</span>
              </li>
            </ul>
          </nav>
        );
      case `/venue/${venueId}/booking/`:
        return (
          <nav className="ms-5 md:ms-7.5 lg:ms-10">
            <ul className="flex flex-wrap items-center gap-x-2.5">
              <LinkElement to="/" content="Home" />
              <LinkElement to={venueId} content={venueName} />
              <li className="py-2.5 font-serif font-bold leading-none;">
                <span>{"Booking"}</span>
              </li>
            </ul>
          </nav>
        );
      case `/venue/${venueId}`:
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
      case currentBreadcrumb:
        return (
          <nav className="ms-5 md:ms-7.5 lg:ms-10">
            <ul className="flex flex-wrap items-center gap-x-2.5">
              <LinkElement to="/" content="Home" />
              <li className="py-2.5 font-serif font-bold leading-none;">
                <span>{currentBreadcrumb}</span>
              </li>
            </ul>
          </nav>
        );
    }
  };
  return renderBreadCrumb();
}
