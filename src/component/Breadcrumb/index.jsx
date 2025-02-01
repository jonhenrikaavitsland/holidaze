import { useLocation } from "react-router-dom";
import LinkElement from "./LinkElement";

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
