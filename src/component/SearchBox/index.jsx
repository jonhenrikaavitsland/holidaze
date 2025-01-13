/* eslint-disable react/prop-types */
import { useState } from "react";
import Label from "../Label";
import locations from "../../data/locations/locations.json";

export default function SearchBox() {
  const [locationData] = useState(locations.map((location) => location.name));

  return (
    <div className="flex flex-col gap-5 md:gap-7.5 pt-5 px-2.5 pb-7.5 md:pt-7.5 md:px-5 md:pb-15 bg-light-sky-blue rounded-xl sm:rounded-none relative z-20 row-start-2 row-end-4 col-start-2 col-end-3 sm:col-span-full min-w-64 shadow-md shadow-natural-charcoal/30">
      <SearchBar />
      <Locations locationData={locationData} />
    </div>
  );
}

function SearchBar() {
  return (
    <div className="flex bg-white rounded-xl shadow-md shadow-natural-charcoal/30 sm:flex-col">
      <Label classes="sr-only" content="search-bar" target="search-bar" />
      <div className="flex grow">
        <Icon />
        <Field />
      </div>
      <Go />
    </div>
  );
}

function Locations({ locationData }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-7.5">
      <LocationBtn content="All Destinations" />
      {locationData.map((location, index) => (
        <LocationBtn key={index} content={location} />
      ))}
    </div>
  );
}

function LocationBtn(props) {
  return (
    <button className="bg-white leading-none md:text-lg-leading-none py-3 px-6 md:py-4 rounded-xl shadow-md shadow-natural-charcoal/30">
      {props.content}
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

function Field() {
  return (
    <input
      className="grow sm:rounded-t-xl sm:px-4 sm:text-center"
      type="text"
      id="search-bar"
      placeholder="Choose your destination..."
    />
  );
}

function Go() {
  return (
    <button className="bg-custom-coral text-white font-serif uppercase py-2 px-3 md:py-3.75 md:px-10 rounded-e-xl sm:rounded-t-none sm:rounded-b-xl text-2xl-leading-none md:text-3xl-leading-none font-bold">
      go
    </button>
  );
}
