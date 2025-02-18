import { useParams } from "react-router-dom";
import BreadCrumb from "../../Breadcrumb";
import Heading from "../../Heading";
import { useCallback, useEffect, useMemo, useState } from "react";
import Loader from "../../Loader";
import CardLocation from "../../CardLocation";
import { useAPISearch } from "../../../js/api/useAPISearch";
import { apiUrl, venuesPath } from "../../../js/data/constants";
import CardVenue from "../../CardVenue";
import FourThings from "./FourThings";
import { filterDataByLocation } from "../../../js/data/filterDataByLocation";
import ViewMoreBtn from "../Home/ViewMoreBtn";
import BackToTopBtn from "../../BackToTopBtn";
import locationsData from "/src/data/locations/locations.json";

/**
 * Renders the Location Page for Holidaze, showcasing details and venues for a specific location.
 *
 * This component performs several tasks:
 * - It extracts the `locationName` from the URL parameters and uses it to filter venue data.
 * - It fetches venue data via the `useAPISearch` hook from the API endpoint and filters it using the `filterDataByLocation` function.
 * - It manages pagination for the displayed venues, loading a set number of venues at a time.
 * - It retrieves additional location details from a local JSON file and sets the document title and meta description for SEO.
 * - It renders a header section containing a breadcrumb, heading, location card, and description for the location.
 * - It displays a "4 Things to see and do" section, mapping over the location's `four-things` array to render each item using the `FourThings` component.
 * - It displays available venues in a responsive grid using the `CardVenue` component.
 * - If more venues are available than currently displayed, it shows a "View More" button (via `ViewMoreBtn`) and a "Back to Top" button.
 * - It handles loading and error states appropriately with a `Loader` component and error messages.
 *
 * @component
 * @example
 * // Example usage:
 * <LocationPage />
 *
 * @returns {JSX.Element} The rendered Location Page component.
 */
export default function LocationPage() {
  const { locationName } = useParams();
  const [locationData, setLocationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [shownLocations, setShownLocations] = useState([]);
  const [arrangedVenues, setArrangedVenues] = useState([]);

  const apiURL = `${apiUrl}${venuesPath}?`;

  const { data, isLoading: loading, isError } = useAPISearch(apiURL);

  useEffect(() => {
    document.title = `${locationName.replace(/-/g, " ")} || Holidaze`;

    const metaDescription = document.querySelector('meta[name="description"]');
    const content = `Visit ${locationName.replace(/-/g, " ")} now with Holidaze and experience an exclusive selection of venues with prices only available at Holidaze. We know Fuerteventura, Holidaze, Your goto holiday maker.`;
    if (metaDescription) {
      metaDescription.setAttribute("content", content);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = content;
      document.head.appendChild(meta);
    }
  }, [locationName]);

  useEffect(() => {
    if (data && data.length > 0) {
      setShownLocations(data);
    }

    const filteredData = filterDataByLocation(
      data,
      locationName?.toLowerCase(),
    );

    if (filteredData) {
      setShownLocations(filteredData);
    }
  }, [data, locationName]);

  const resetPagination = useCallback(() => {
    setArrangedVenues([]);
  }, []);

  const paginateData = useCallback((dataArray, pageSize) => {
    setArrangedVenues((prev) => {
      const currentLength = prev.length;
      const nextPageData = dataArray.slice(
        currentLength,
        currentLength + pageSize,
      );
      return [...prev, ...nextPageData];
    });
  }, []);

  useMemo(() => {
    if (shownLocations && shownLocations.length > 0) {
      resetPagination();
      paginateData(shownLocations, 10);
    }
  }, [shownLocations, resetPagination, paginateData]);

  useEffect(() => {
    try {
      const matchedLocation = locationsData.find(
        (location) =>
          location.name.toLowerCase().replace(/\s+/g, "-") === locationName,
      );
      setLocationData(matchedLocation || null);
    } catch (error) {
      console.error("Error processing locations data", error);
    } finally {
      setIsLoading(false);
    }
  }, [locationName]);

  // While loading, avoid rendering anything that relies on locationData
  if (isLoading) {
    return (
      <div className="flex justify-center pt-20">
        <Loader />
      </div>
    );
  }

  // If no matching location is found
  if (!locationData) {
    return (
      <p className="text-center text-custom-coral font-bold md:text-lg lg:text-xl mx-5 md:mx-7.5 lg:mx-10">
        Oops... Location not found.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-10 md:gap-15 lg:gap-20 mb-10 md:mb-15 lg:mb-20">
      <section className="flex flex-col gap-5 md:gap-7.5 lg:gap-10">
        <BreadCrumb />
        <Heading
          level="1"
          className="text-center text-deep-blue mx-5 md:mx-7.5 lg:mx-10"
        >
          {`Explore ${locationData.name}`}
        </Heading>
        <CardLocation location={locationData} />
        <p className="mx-5 md:mx-7.5 lg:mx-10">{locationData.description}</p>
      </section>
      <section className="flex flex-col gap-5 md:gap-7.5 lg:gap-10">
        <Heading
          level="2"
          className="text-center text-deep-blue mx-5 md:mx-7.5 lg:mx-10"
        >{`4 Things to see and do in ${locationData.name}`}</Heading>
        {locationData["four-things"].map((thing, index) => (
          <FourThings key={index} thing={thing} index={index} />
        ))}
      </section>
      <section className="flex flex-col gap-5 md:gap-7.5 lg:gap-10">
        <Heading
          level="2"
          className="text-center text-deep-blue"
        >{`Available venues in ${locationData.name}`}</Heading>
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-5 md:gap-7.5 lg:gap-10 lg:mx-10">
          {isError ? (
            <p className="font-bold text-custom-coral text-center">
              Something went wrong fetching venues!
            </p>
          ) : loading ? (
            <Loader />
          ) : (
            arrangedVenues &&
            arrangedVenues.map((venue, index) => {
              // Check if the number of venues is odd and if this is the last item
              const isLastOdd =
                data.length % 2 === 1 && index === data.length - 1;
              return (
                <CardVenue
                  key={venue.id}
                  venue={venue}
                  className={isLastOdd ? "lg:col-span-full" : ""}
                />
              );
            })
          )}
        </div>
        <div className="flex justify-center">
          {shownLocations && arrangedVenues.length < shownLocations.length && (
            <div className="flex flex-col gap-5">
              <ViewMoreBtn data={shownLocations} paginateData={paginateData} />
              <BackToTopBtn />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
