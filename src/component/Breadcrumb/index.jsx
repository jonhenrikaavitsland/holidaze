import { useLocation } from "react-router-dom";
import LinkElement from "./LinkElement";

export default function BreadCrumb() {
  const location = useLocation();
  const currentPath = location.pathname;

  let venueId;
  let venueName;

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
          <nav>
            <ul>
              <LinkElement to="/" content="Home" />
              <LinkElement to="/venue-hub" content="Venue HUB" />
              <li>
                <span>{"Create New Venue"}</span>
              </li>
            </ul>
          </nav>
        );
      case "/venue-hub/update-venue/":
        return (
          <nav>
            <ul>
              <LinkElement to="/" content="Home" />
              <LinkElement to="/venue-hub" content="Venue HUB" />
              <li>
                <span>{"Update Venue"}</span>
              </li>
            </ul>
          </nav>
        );
      case `/${venueId}/booking/`:
        return (
          <nav>
            <ul>
              <LinkElement to="/" content="Home" />
              <LinkElement to={venueId} content={venueName} />
              <li>
                <span>{"Booking"}</span>
              </li>
            </ul>
          </nav>
        );
      case `/${venueId}/`:
        return (
          <nav>
            <ul>
              <LinkElement to="/" content="Home" />
              <li>
                <span>{venueName}</span>
              </li>
            </ul>
          </nav>
        );
      case currentBreadcrumb:
        return (
          <nav>
            <ul>
              <LinkElement to="/" content="Home" />
              <li>
                <span>{currentBreadcrumb}</span>
              </li>
            </ul>
          </nav>
        );
    }
  };
  return renderBreadCrumb();
}
