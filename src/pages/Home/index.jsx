import { useMemo, useState, useCallback } from "react";
import CardLocation from "../../component/CardLocation";
import Hero from "../../component/Hero";
import SearchBox from "../../component/SearchBox";
import locationData from "../../data/locations/locations.json";
import { useAPISearch } from "../../js/api/useAPISearch";
import CardVenue from "../../component/CardVenue";

export default function Home() {
  const [fetchAll, setFetchAll] = useState(false);
  const [fetchQuery, setFetchQuery] = useState("");
  const [arrangedVenues, setArrangedVenues] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const apiURL = useMemo(() => {
    if (fetchQuery) {
      return `https://v2.api.noroff.dev/holidaze/venues/search?q=${fetchQuery}`;
    }
    if (fetchAll) {
      return "https://v2.api.noroff.dev/holidaze/venues?";
    }
    return null;
  }, [fetchQuery, fetchAll]);

  const { data, isLoading, isError } = useAPISearch(apiURL);
  console.log("Data:", data);
  console.log(isLoading, isError);

  console.log("fetchAll:", fetchAll);
  console.log("fetchQuery:", fetchQuery);

  const resetPagination = useCallback(() => {
    setArrangedVenues([]);
    setCurrentPage(0);
  }, []);

  const paginateData = useCallback(
    (dataArray, pageSize) => {
      const start = currentPage * pageSize;
      const end = start + pageSize;
      const nextPageData = dataArray.slice(start, end);
      setArrangedVenues((prev) => [...prev, ...nextPageData]);
      setCurrentPage((prev) => prev + 1);
    },
    [currentPage],
  );

  useMemo(() => {
    if (data && data.length > 0) {
      resetPagination();
      paginateData(data, 10);
    }
  }, [data, resetPagination, paginateData]);

  console.log("Arranged Venues:", arrangedVenues);

  return (
    <>
      <div className="flex flex-col gap-10 md:gap-12.5 lg:gap-15">
        <div className="grid grid-rows-hero grid-cols-hero md:grid-cols-heroMd md:grid-rows-heroMd lg:grid-cols-heroLg relative">
          <div className="row-start-1 row-end-3 col-span-full bg-natural-charcoal"></div>
          <Hero />
          <SearchBox setFetchAll={setFetchAll} setFetchQuery={setFetchQuery} />
        </div>
        <h2 className="font-serif font-bold text-center text-deep-blue text-xl-leading-none md:text-2xl-leading-none lg:text-3xl-leading-none mb-5 md:mb-7.5">
          Explore Fuerteventura
        </h2>
      </div>
      <div className="grid gap-5 md:gap-7.5 lg:gap-10 lg:grid-cols-2">
        {isLoading ? (
          <div className="col-span-full justify-self-center">
            <div className="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : isError ? (
          <div>Error</div>
        ) : arrangedVenues.length > 0 ? (
          arrangedVenues.map((venueObject, index) => (
            <CardVenue
              key={venueObject.id}
              venue={venueObject}
              className={index === data.length - 1 ? "lg:col-span-full" : ""}
            />
          ))
        ) : (
          locationData.map((location, index) => (
            <CardLocation
              key={location.name}
              location={location}
              className={
                index === locationData.length - 1 ? "lg:col-span-full" : ""
              }
            />
          ))
        )}
      </div>
    </>
  );
}
