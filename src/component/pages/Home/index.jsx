import { useMemo, useState, useCallback, useEffect } from "react";
import CardLocation from "../../CardLocation";
import Hero from "../../Hero";
import SearchBox from "../../SearchBox";
import locationData from "../../../data/locations/locations.json";
import { useAPISearch } from "../../../js/api/useAPISearch";
import CardVenue from "../../CardVenue";
import Loader from "../../Loader";
import { apiUrl, venuesPath } from "../../../js/data/constants";
import Heading from "../../Heading";
import ViewMoreBtn from "./ViewMoreBtn";
import { filterDataByLocation } from "../../../js/data/filterDataByLocation";
import BackToTopBtn from "../../BackToTopBtn";

export default function Home() {
  const [fetchAll, setFetchAll] = useState(false);
  const [fetchQuery, setFetchQuery] = useState("");
  const [arrangedVenues, setArrangedVenues] = useState([]);
  const [activeButton, setActiveButton] = useState(null);
  const [shownData, setShownData] = useState([]);

  const apiURL = useMemo(() => {
    if (fetchQuery) {
      return `${apiUrl}${venuesPath}/search?q=${fetchQuery}`;
    }
    if (fetchAll) {
      return `${apiUrl}${venuesPath}?`;
    }
    return null;
  }, [fetchQuery, fetchAll]);

  const { data, isLoading, isError } = useAPISearch(apiURL);

  useEffect(() => {
    if (data && data.length > 0) {
      setShownData(data);
    }

    const filteredData = filterDataByLocation(
      data,
      activeButton?.toLowerCase(),
    );

    if (filteredData) {
      setShownData(filteredData);
    }
  }, [data, activeButton]);

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
    if (shownData && shownData.length > 0) {
      resetPagination();
      paginateData(shownData, 10);
    }
  }, [shownData, resetPagination, paginateData]);

  return (
    <div className="flex flex-col mb-10 md:mb-15 lg:mb-20">
      <div className="flex flex-col gap-10 md:gap-12.5 lg:gap-15">
        <div className="grid grid-rows-hero grid-cols-hero md:grid-cols-heroMd md:grid-rows-heroMd lg:grid-cols-heroLg relative">
          <div className="row-start-1 row-end-3 col-span-full bg-natural-charcoal"></div>
          <Hero />
          <SearchBox
            setFetchAll={setFetchAll}
            setFetchQuery={setFetchQuery}
            activeButton={activeButton}
            setActiveButton={setActiveButton}
          />
        </div>
        <Heading
          level={"2"}
          className="text-center text-deep-blue mb-5 md:mb-7.5 lg:mb-10"
        >
          {fetchQuery
            ? `Venues in ${fetchQuery}`
            : arrangedVenues.length
              ? `Venues in ${activeButton}`
              : "explore fuerteventura"}
        </Heading>
      </div>
      <div className="grid gap-5 md:gap-7.5 lg:gap-10 lg:grid-cols-2">
        {isLoading ? (
          <div className="col-span-full justify-self-center">
            <Loader />
          </div>
        ) : isError ? (
          <div>Error</div>
        ) : arrangedVenues.length > 0 ? (
          arrangedVenues.map((venueObject, index) => (
            <CardVenue
              key={venueObject.id}
              venue={venueObject}
              className={
                index === arrangedVenues.length - 1 &&
                arrangedVenues.length % 2 !== 0
                  ? "lg:col-span-full"
                  : ""
              }
            />
          ))
        ) : (
          locationData.map((location, index) => (
            <CardLocation
              key={location.name}
              location={location}
              className={
                index === locationData.length - 1 &&
                locationData.length % 2 !== 0
                  ? "lg:col-span-full"
                  : ""
              }
            />
          ))
        )}
      </div>
      <div className="flex justify-center">
        {shownData && arrangedVenues.length < shownData.length && (
          <div className="flex flex-col gap-5">
            <ViewMoreBtn data={shownData} paginateData={paginateData} />
            <BackToTopBtn />
          </div>
        )}
      </div>
    </div>
  );
}
