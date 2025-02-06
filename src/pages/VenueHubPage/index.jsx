/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Heading from "../../component/Heading";
import LinkBtn from "./LinkBtn";
import Buttons from "./Buttons";
import Welcome from "./Welcome";
import ViewVenuesObject from "./ViewVenuesObject";
import ViewBookings from "./ViewBookings";
import useCreateVenueStore from "../../js/store/useCreateVenueStore";
import useCreateVenue from "../../js/api/useCreateVenue";
import { apiKey, apiUrl } from "../../js/data/constants";
import BreadCrumb from "../../component/Breadcrumb";

export default function VenueHubPage() {
  const [viewWelcome, setViewWelcome] = useState(true);
  const [viewBooking, setViewBooking] = useState(false);
  const [viewVenues, setViewVenues] = useState(false);
  const [viewNewVenue, setViewNewVenue] = useState(false);
  const [viewUpdateVenue, setUpdateVenue] = useState(false);
  const [currentVenue, setCurrentVenue] = useState("");

  function handleViewChange(view) {
    setViewWelcome(view === "welcome");
    setViewBooking(view === "booking");
    setViewVenues(view === "venues");
    setViewNewVenue(view === "newVenue");
    setUpdateVenue(view === "updateVenue");
  }

  console.log(viewBooking, viewNewVenue, viewUpdateVenue, currentVenue);

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="hidden lg:block bg-warm-beige p-10 w-56 border-r border-natural-charcoal/40 min-h-full">
        <div className="mt-17.5">
          <ul className="flex flex-col gap-10 w-max">
            <LinkBtn
              content="view bookings"
              handleViewChange={handleViewChange}
              kind="booking"
              status={viewBooking}
              className="hover:font-bold"
            />
            <LinkBtn
              content="view venues"
              handleViewChange={handleViewChange}
              kind="venues"
              status={viewVenues}
              className="hover:font-bold"
            />
            <LinkBtn
              content="new venue"
              handleViewChange={handleViewChange}
              kind="newVenue"
              status={viewNewVenue}
              className="hover:font-bold"
            />
          </ul>
        </div>
      </div>
      <section className="lg:grow pt-5 md:pt-7.5 lg:pt-10">
        <Heading level="1" className="text-center text-deep-blue">
          venue hUB
        </Heading>
        <Buttons
          handleViewChange={handleViewChange}
          bookingStatus={viewBooking}
          venuesStatus={viewVenues}
          newVenueStatus={viewNewVenue}
        />
        {viewWelcome && <Welcome handleViewChange={handleViewChange} />}
        {viewBooking && <ViewBookings />}
        {viewVenues && (
          <ViewVenuesObject
            handleViewChange={handleViewChange}
            setCurrentVenue={setCurrentVenue}
          />
        )}
        {viewNewVenue && <CreateNewVenue />}
      </section>
    </div>
  );
}

function CreateNewVenue() {
  const {
    wifi,
    toggleWifi,
    breakfast,
    toggleBreakfast,
    parking,
    toggleParking,
    pets,
    togglePets,
    description,
    setDescription,
    venue,
    address,
    location,
    zipCode,
    price,
    rating,
    sleeps,
    media0,
    media1,
    media2,
    media3,
    media4,
    media5,
    media6,
    media7,
    media8,
    media9,
  } = useCreateVenueStore();
  const { createVenue, isLoading, error } = useCreateVenue(apiUrl, apiKey);

  const handleSubmit = (e) => {
    e.preventDefault();
    createVenue({
      wifi,
      breakfast,
      parking,
      pets,
      venue,
      address,
      location,
      zipCode,
      price,
      rating,
      sleeps,
      description,
      media0,
      media1,
      media2,
      media3,
      media4,
      media5,
      media6,
      media7,
      media8,
      media9,
    });
    console.log("Error:", error);
  };

  return (
    <div>
      {<BreadCrumb />}
      <section className="flex flex-col gap-5 pt-5 px-5">
        <h1 className="font-bold font-serif text-deep-blue text-xl-leading-none text-center">
          Create new Venue
        </h1>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <fieldset>
            <legend className="sr-only">name and location data</legend>
            <ul className="flex flex-col gap-5">
              <FormListElement
                setter="venue"
                element="venue"
                label="venue"
                error={error}
                mustHave={true}
                placeholder="Venue name"
              />
              <FormListElement
                setter="address"
                element="address"
                label="address"
                error={error}
                mustHave={true}
                placeholder="Street address"
              />
              <ChooseLocation />
              <FormListElement
                setter="zipCode"
                element="zip-code"
                label="zip code"
                error={error}
                mustHave={true}
                placeholder="35560"
              />
            </ul>
          </fieldset>
          <fieldset>
            <legend className="sr-only">accommodation details</legend>
            <ul className="flex flex-col gap-5">
              <FormListElement
                setter="price"
                element="price"
                label="price €"
                error={error}
                mustHave={true}
                placeholder="€165"
              />
              <RatingElement />
              <FormListElement
                setter="sleeps"
                element="sleeps"
                label="sleeps"
                error={error}
                mustHave={true}
                placeholder="4"
              />
            </ul>
          </fieldset>
          <fieldset className="flex flex-col gap-2.5 mt-5">
            <legend className="sr-only">amenities</legend>
            <h2 className="font-serif text-lg-leading-none font-bold text-deep-blue text-center">
              Amenities
            </h2>
            <div className="bg-warm-beige border border-natural-charcoal/40 rounded-xl w-56 mx-auto">
              <ul className="flex flex-col gap-5 items-center mt-2.5 mb-10">
                <CustomSwitch
                  onToggle={toggleWifi}
                  isOn={wifi}
                  label="wiFi"
                  id="wifi"
                />
                <CustomSwitch
                  onToggle={toggleBreakfast}
                  isOn={breakfast}
                  label="breakfast"
                  id="breakfast"
                />
                <CustomSwitch
                  onToggle={toggleParking}
                  isOn={parking}
                  label="parking"
                  id="parking"
                />
                <CustomSwitch
                  onToggle={togglePets}
                  isOn={pets}
                  label="pets"
                  id="pets"
                />
              </ul>
            </div>
          </fieldset>
          <fieldset className="mt-5">
            <legend className="sr-only">media</legend>
            <MediaElement />
          </fieldset>
          <fieldset className="my-5">
            <legend className="sr-only">description</legend>
            <div className="flex flex-col gap-1">
              <label
                className="text-sm-leading-none capitalize"
                htmlFor="description"
              >
                description
              </label>
              <textarea
                className="bg-warm-beige border border-natural-charcoal/40 w-full h-44 p-1 overflow-y-scroll overscroll-contain scrollbar"
                name="description"
                id="description"
                placeholder="Describe your amazing venue"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </fieldset>
          <div className="flex justify-center">
            <button
              className="font-serif font-bold text-xl-leading-none bg-deep-blue text-white py-3.75 px-7.5 rounded-xl shadow-md shadow-natural-charcoal/40"
              disabled={isLoading}
              type="submit"
            >
              Create Venue
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function MediaElement(props) {
  const { setMedia, ...mediaStates } = useCreateVenueStore();
  const [inputs, setInputs] = useState(() => {
    const initialInputs = [];
    for (let i = 0; i < 10; i++) {
      initialInputs.push(mediaStates[`media${i}`] || "");
    }
    return (
      initialInputs.filter((input, index) => index === 0 || input !== "") || [
        "",
      ]
    );
  });

  const handleInputChange = (index, value) => {
    setMedia(index, value);
    const newInputs = [...inputs];
    newInputs[index] = value;
    // setInputs(newInputs);

    // If the last input has a value, add a new empty input
    if (
      value.trim() !== "" &&
      index === inputs.length - 1 &&
      inputs.length < 10
    ) {
      newInputs.push("");
    }

    const trimmedInputs = newInputs.slice(0, 10);
    setInputs(trimmedInputs);
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm-leading-none capitalize" htmlFor="media-0">
        media
      </label>
      <ul className="flex flex-col gap-2.5">
        {inputs.map((input, index) => (
          <li key={index}>
            <input
              className="bg-warm-beige border border-natural-charcoal/40 h-6 text-center font-medium leading-none w-full"
              type="text"
              value={input}
              placeholder="https://unsplash.com/photos/"
              onChange={(e) => handleInputChange(index, e.target.value)}
              required={index === 0}
              id={`media-${index}`}
            />
          </li>
        ))}
      </ul>
      {props.error && (
        <p className="text-custom-coral text-sm-leading-none font-bold text-center">
          {props.error}
        </p>
      )}
    </div>
  );
}

function CustomSwitch({ isOn, onToggle, id, label }) {
  return (
    <li>
      <div className="flex flex-col gap-1">
        <label
          className="text-sm-leading-none capitalize text-center"
          htmlFor={id}
        >
          {label}
        </label>
        <div
          className={`h-7.5 w-20 bg-white rounded-xl shadow-md shadow-natural-charcoal/40 flex items-center px-0.5 ${isOn ? "justify-end" : ""}`}
          onClick={onToggle}
          role="button"
          id={id}
          aria-pressed={isOn}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onToggle();
            }
          }}
        >
          <div
            className={` h-6.5 w-6.5 rounded-full transition-transform duration-300 ${isOn ? "bg-accent-teal" : "bg-natural-charcoal"}`}
          ></div>
        </div>
      </div>
    </li>
  );
}

function RatingElement() {
  const { setRating } = useCreateVenueStore();
  const [iconCount, setIconCount] = useState(1);
  const maxIcons = 5;

  useEffect(() => {
    setRating(iconCount);
  }, [iconCount, setRating]);

  const increaseCount = () => {
    if (iconCount < maxIcons) {
      setIconCount(iconCount + 1);
    }
  };

  const decreaseCount = () => {
    if (iconCount > 1) {
      setIconCount(iconCount - 1);
    }
  };

  return (
    <li>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between">
          <label className="text-sm-leading-none capitalize" htmlFor="rating">
            rating
          </label>
          <p className="text-sm-leading-none font-bold">{iconCount}</p>
        </div>
        <div
          className="bg-warm-beige flex gap-5 justify-center items-center border border-natural-charcoal/40 h-6 text-center font-medium leading-none text-natural-charcoal"
          id="rating"
        >
          <button
            className="cursor-pointer grow flex justify-end hover:bg-custom-coral/20 pe-2.5 h-6 items-center"
            onClick={decreaseCount}
            disabled={iconCount === 1}
            type="button"
          >
            <img src="/minus-solid.svg" alt="decrease" className="h-4" />
          </button>
          <div className="flex gap-2.5 min-w-32 justify-center">
            {Array.from({ length: iconCount }, (_, index) => (
              <div key={index}>
                <img
                  src="/logo_warm_200.png"
                  alt="rating sun"
                  className="h-4"
                />
              </div>
            ))}
          </div>
          <button
            className="cursor-pointer grow hover:bg-custom-coral/20 ps-2.5 h-6 flex items-center"
            onClick={increaseCount}
            disabled={iconCount === maxIcons}
            type="button"
          >
            <img src="/plus-solid.svg" alt="increase" className="h-4" />
          </button>
        </div>
      </div>
    </li>
  );
}

function FormListElement(props) {
  const {
    venue,
    address,
    zipCode,
    price,
    sleeps,
    setVenue,
    setAddress,
    setZipCode,
    setPrice,
    setSleeps,
  } = useCreateVenueStore();

  const valueMap = { venue, address, zipCode, price, sleeps };
  const value = valueMap[props.setter] ?? "";

  // A switch that returns the appropriate setter function
  const getOnChangeHandler = () => {
    switch (props.setter) {
      case "venue":
        return (e) => setVenue(e.target.value);
      case "address":
        return (e) => setAddress(e.target.value);
      case "zipCode":
        return (e) => setZipCode(e.target.value);
      case "price":
        return (e) => setPrice(e.target.value);
      case "sleeps":
        return (e) => setSleeps(e.target.value);
      default:
        return undefined;
    }
  };

  const onChangeHandler = getOnChangeHandler();

  return (
    <li>
      <div className="flex flex-col gap-1">
        <label
          className="text-sm-leading-none capitalize"
          htmlFor={props.element}
        >
          {props.label}
        </label>
        <input
          className="bg-warm-beige border border-natural-charcoal/40 h-6 text-center font-medium leading-none"
          type="text"
          id={props.element}
          placeholder={props.placeholder}
          required={props.mustHave}
          aria-invalid={!!props.error}
          aria-describedby={props.error ? `${props.element}-error` : undefined}
          value={value}
          onChange={onChangeHandler}
        />
        {props.error && (
          <p
            className="text-custom-coral text-sm-leading-none font-bold text-center"
            id={`${props.element}-error`}
          >
            {props.error}
          </p>
        )}
      </div>
    </li>
  );
}

function ChooseLocation() {
  const { location, setLocation } = useCreateVenueStore();

  return (
    <li>
      <div className="flex flex-col gap-1">
        <label className="text-sm-leading-none capitalize" htmlFor="options">
          location
        </label>
        <select
          className="bg-warm-beige border border-natural-charcoal/40 h-6 text-center font-medium leading-none"
          name="options"
          id="options"
          required
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">Select Location</option>
          <option value="1">Corralejo</option>
          <option value="2">Costa Calma</option>
          <option value="3">Caleta de Fuste</option>
          <option value="4">Morro Jable</option>
          <option value="5">El Cotillo</option>
        </select>
      </div>
    </li>
  );
}
