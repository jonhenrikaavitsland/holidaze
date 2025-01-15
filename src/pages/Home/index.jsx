import { useMemo, useState } from "react";
import CardLocation from "../../component/CardLocation";
import Hero from "../../component/Hero";
import SearchBox from "../../component/SearchBox";
import locationData from "../../data/locations/locations.json";
import { useAPISearch } from "../../js/api/useAPISearch";

export default function Home() {
  const [fetchAll, setFetchAll] = useState(false);
  const [fetchQuery, setFetchQuery] = useState("");

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
        {locationData.map((location, index) => (
          <CardLocation
            key={location.name}
            location={location}
            className={
              index === locationData.length - 1 ? "lg:col-span-full" : ""
            }
          />
        ))}
      </div>
    </>
  );
}
