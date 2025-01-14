/* eslint-disable react/prop-types */
import Label from "../Label";
import locations from "../../data/locations/locations.json";
import { useEffect, useRef, useState } from "react";

export default function SearchBox({ setFetchedData }) {
  const [locationData] = useState(locations.map((location) => location.name));
  const [query, setQuery] = useState("");
  const [activeButton, setActiveButton] = useState(null);
  const [isAnyBtnActive, setIsAnyBtnActive] = useState(false);
  const hasCalledHandleLocationClick = useRef(false);

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setFetchedData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      fetchData(`https://v2.api.noroff.dev/holidaze/venues/search?q=${query}`);
    }
    // Reset location-related states
    setActiveButton(null);
    setIsAnyBtnActive(false);
    hasCalledHandleLocationClick.current = false;
  };

  const handleLocationClick = () =>
    fetchData("https://v2.api.noroff.dev/holidaze/venues");

  return (
    <div className="flex flex-col gap-5 md:gap-7.5 pt-5 px-2.5 pb-7.5 sm:px-5 md:pt-7.5 md:px-5 md:pb-15 lg:px-7.5 bg-light-sky-blue rounded-xl sm:rounded-none relative z-20 row-start-2 row-end-4 col-start-2 col-end-3 sm:col-span-full min-w-64 shadow-md shadow-natural-charcoal/40">
      <SearchBar
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
        hasCalledHandleLocationClick={hasCalledHandleLocationClick}
      />
      <Locations
        locationData={locationData}
        handleLocationClick={handleLocationClick}
        hasCalledHandleLocationClick={hasCalledHandleLocationClick}
        activeButton={activeButton}
        setActiveButton={setActiveButton}
        isAnyBtnActive={isAnyBtnActive}
        setIsAnyBtnActive={setIsAnyBtnActive}
      />
    </div>
  );
}

function SearchBar({
  query,
  setQuery,
  handleSearch,
  hasCalledHandleLocationClick,
}) {
  return (
    <div className="flex bg-white rounded-xl shadow-md shadow-natural-charcoal/40 sm:flex-col focus-within:outline-deep-blue focus-within:outline-2 focus-within:outline">
      <Label classes="sr-only" content="search-bar" target="search-bar" />
      <div className="flex grow">
        <Icon />
        <Field query={query} setQuery={setQuery} />
      </div>
      <Go
        handleSearch={handleSearch}
        hasCalledHandleLocationClick={hasCalledHandleLocationClick}
      />
    </div>
  );
}

function Locations({
  locationData,
  handleLocationClick,
  hasCalledHandleLocationClick,
  activeButton,
  setActiveButton,
  isAnyBtnActive,
  setIsAnyBtnActive,
}) {
  const [hasScrolled, setHasScrolled] = useState(false);

  function handleClick(content) {
    if (content !== activeButton) {
      setActiveButton(content);
      setIsAnyBtnActive(true);
    }
  }

  useEffect(() => {
    if (isAnyBtnActive && !hasCalledHandleLocationClick.current) {
      handleLocationClick();
      hasCalledHandleLocationClick.current = true;
    }
  }, [isAnyBtnActive, handleLocationClick, hasCalledHandleLocationClick]);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`grid sm:grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7.5`}
    >
      <LocationBtn
        content="All Destinations"
        isActive={activeButton === "All Destinations"}
        handleClick={handleClick}
      />
      {locationData.map((location, index) => (
        <LocationBtn
          key={index}
          content={location}
          isActive={activeButton === location}
          handleClick={handleClick}
          hasScrolled={hasScrolled}
        />
      ))}
    </div>
  );
}

function LocationBtn({ content, isActive, handleClick, hasScrolled = true }) {
  return (
    <button
      className={`leading-none md:text-lg-leading-none py-3 px-6 md:py-4 rounded-xl shadow-md shadow-natural-charcoal/40 ${isActive ? "bg-golden-yellow hover:bg-golden-yellow/80 font-bold" : "bg-white hover:bg-golden-yellow/20"} ${hasScrolled ? "sm:visible sm:translate-y-0" : "sm:sr-only"}`}
      onClick={() => handleClick(content)}
    >
      {content}
    </button>
  );
}

function Icon() {
  return (
    <div className="p-2.5 md:p-3.75 rounded-s-xl sm:collapse">
      <img
        src="/search_golden_solid.svg"
        alt="search field"
        className="h-5 w-5 md:h-7.5 md:w-7.5"
      />
    </div>
  );
}

function Field({ query, setQuery }) {
  return (
    <input
      className="grow sm:rounded-t-xl sm:px-4 sm:text-center active:ring-transparent focus:outline-none"
      type="text"
      id="search-bar"
      placeholder="Choose your destination..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function Go({ handleSearch }) {
  return (
    <button
      className="bg-custom-coral text-white font-serif uppercase py-2 px-3 md:py-3.75 md:px-10 rounded-e-xl sm:rounded-t-none sm:rounded-b-xl text-2xl-leading-none md:text-3xl-leading-none font-bold hover:bg-custom-coral/90"
      onClick={() => handleSearch()}
    >
      go
    </button>
  );
}
