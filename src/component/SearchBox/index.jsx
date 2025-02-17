/* eslint-disable react/prop-types */
import locations from "../../data/locations/locations.json";
import { useEffect, useRef, useState } from "react";
import sanitizeInput from "../../js/sanitize/sanitizeInput";

/**
 * Renders a search box component that allows users to filter destinations.
 *
 * This component provides a search input and a grid of location buttons that users can interact with to filter or fetch destinations.
 * When a search query is provided, it sanitizes the input and updates the fetch query; if the query is empty, it defaults to fetching all destinations.
 * The component also manages the active state of location buttons.
 *
 * @component
 * @param {object} props - The component props.
 * @param {Function} props.setFetchAll - Callback to set fetching all destinations.
 * @param {Function} props.setFetchQuery - Callback to set the fetch query string.
 * @param {string|null} props.activeButton - The currently active location button.
 * @param {Function} props.setActiveButton - Callback to update the active location button.
 *
 * @example
 * <SearchBox
 *   setFetchAll={setFetchAll}
 *   setFetchQuery={setFetchQuery}
 *   activeButton={activeButton}
 *   setActiveButton={setActiveButton}
 * />
 *
 * @returns {JSX.Element} The rendered search box component.
 */
export default function SearchBox({
  setFetchAll,
  setFetchQuery,
  activeButton,
  setActiveButton,
}) {
  const [locationData] = useState(locations.map((location) => location.name));
  const [isAnyBtnActive, setIsAnyBtnActive] = useState(false);
  const hasCalledHandleLocationClick = useRef(false);
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      setFetchQuery(sanitizeInput(query));
      setFetchAll(false);
      setActiveButton(null);
      setIsAnyBtnActive(false);
      hasCalledHandleLocationClick.current = false;
    } else {
      // Treat empty query as clicking "All Destinations"
      handleLocationClick();
      setActiveButton("All Destinations");
      hasCalledHandleLocationClick.current = true;
    }
  };

  const handleLocationClick = () => {
    setFetchAll(true);
    setFetchQuery("");
  };

  return (
    <div className="flex flex-col gap-5 md:gap-7.5 lg:gap-10 pt-5 px-2.5 pb-7.5 sm:px-5 md:pt-7.5 md:px-5 md:pb-15 lg:px-7.5 bg-light-sky-blue rounded-xl sm:rounded-none relative z-20 row-start-2 row-end-4 col-start-2 col-end-3 sm:col-span-full sm:w-full sm:flex-shrink mx-auto shadow-md shadow-natural-charcoal/40">
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

/**
 * Renders the search bar section of the search box component.
 *
 * The SearchBar includes a search icon, an input field for entering the query, and a "go" button to trigger the search action.
 *
 * @component
 * @param {object} props - The component props.
 * @param {string} props.query - The current search query.
 * @param {Function} props.setQuery - Callback to update the search query.
 * @param {Function} props.handleSearch - Function to execute the search action.
 * @param {object} props.hasCalledHandleLocationClick - A ref indicating if the "All Destinations" action has been triggered.
 *
 * @example
 * <SearchBar
 *   query={query}
 *   setQuery={setQuery}
 *   handleSearch={handleSearch}
 *   hasCalledHandleLocationClick={hasCalledHandleLocationClick}
 * />
 *
 * @returns {JSX.Element} The rendered search bar component.
 */
function SearchBar({
  query,
  setQuery,
  handleSearch,
  hasCalledHandleLocationClick,
}) {
  return (
    <div className="flex bg-white rounded-xl shadow-md shadow-natural-charcoal/40 sm:flex-col focus-within:outline-deep-blue focus-within:outline-2 focus-within:outline">
      <label className="sr-only" htmlFor="search-bar">
        search-bar
      </label>
      <div className="flex grow">
        <Icon />
        <Field query={query} setQuery={setQuery} handleSearch={handleSearch} />
      </div>
      <Go
        handleSearch={handleSearch}
        hasCalledHandleLocationClick={hasCalledHandleLocationClick}
      />
    </div>
  );
}

/**
 * Renders a grid of location buttons for filtering destinations.
 *
 * This component displays a list of buttons for each available destination (plus an "All Destinations" button).
 * Clicking a button triggers the appropriate fetch actions and updates the active button state.
 * It also listens to the window scroll event to adjust button visibility on small screens.
 *
 * @component
 * @param {object} props - The component props.
 * @param {string[]} props.locationData - An array of location names.
 * @param {Function} props.handleLocationClick - Callback function to trigger when a location button is clicked (fetching all destinations).
 * @param {React.MutableRefObject<boolean>} props.hasCalledHandleLocationClick - A ref to track if the "All Destinations" action has been triggered.
 * @param {string|null} props.activeButton - The currently active location button.
 * @param {Function} props.setActiveButton - Callback to update the active location button.
 * @param {boolean} props.isAnyBtnActive - Indicates whether any location button is active.
 * @param {Function} props.setIsAnyBtnActive - Callback to update the state of any active button.
 *
 * @example
 * <Locations
 *   locationData={locationData}
 *   handleLocationClick={handleLocationClick}
 *   hasCalledHandleLocationClick={hasCalledHandleLocationClick}
 *   activeButton={activeButton}
 *   setActiveButton={setActiveButton}
 *   isAnyBtnActive={isAnyBtnActive}
 *   setIsAnyBtnActive={setIsAnyBtnActive}
 * />
 *
 * @returns {JSX.Element} The rendered grid of location buttons.
 */
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

/**
 * Renders an individual location button.
 *
 * This button displays the name of a destination and applies active styling if it is the selected location.
 * On small screens, its visibility can be toggled based on the scroll state.
 *
 * @component
 * @param {object} props - The component props.
 * @param {string} props.content - The text content of the button (location name).
 * @param {boolean} props.isActive - Indicates whether this button is currently active.
 * @param {Function} props.handleClick - Callback function invoked when the button is clicked.
 * @param {boolean} [props.hasScrolled=true] - Indicates whether the page has been scrolled, affecting button visibility on small screens.
 *
 * @example
 * <LocationBtn content="Corralejo" isActive={true} handleClick={handleClick} />
 *
 * @returns {JSX.Element} The rendered location button.
 */
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

/**
 * Renders a search icon used in the search bar.
 *
 * This component displays an image icon representing the search function.
 *
 * @component
 * @example
 * <Icon />
 *
 * @returns {JSX.Element} The rendered search icon.
 */
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

/**
 * Renders the input field for the search bar.
 *
 * This component provides a text input for entering search queries and triggers the search action when the "Enter" key is pressed.
 *
 * @component
 * @param {object} props - The component props.
 * @param {string} props.query - The current search query.
 * @param {Function} props.setQuery - Callback to update the search query.
 * @param {Function} props.handleSearch - Function to execute the search action.
 *
 * @example
 * <Field query={query} setQuery={setQuery} handleSearch={handleSearch} />
 *
 * @returns {JSX.Element} The rendered input field.
 */
function Field({ query, setQuery, handleSearch }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <input
      className="grow sm:rounded-t-xl sm:px-4 sm:text-center active:ring-transparent focus:outline-none sm:min-w-48"
      type="text"
      id="search-bar"
      placeholder="Choose your destination..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
}

/**
 * Renders the "go" button for the search bar.
 *
 * Clicking this button triggers the search action defined by the handleSearch function.
 *
 * @component
 * @param {object} props - The component props.
 * @param {Function} props.handleSearch - Function to execute when the "go" button is clicked.
 *
 * @example
 * <Go handleSearch={handleSearch} />
 *
 * @returns {JSX.Element} The rendered "go" button.
 */
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
