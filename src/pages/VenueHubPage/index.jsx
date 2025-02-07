/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Heading from "../../component/Heading";
import LinkBtn from "./LinkBtn";
import Buttons from "./Buttons";
import Welcome from "./Welcome";
import ViewVenuesObject from "./ViewVenuesObject";
import ViewBookings from "./ViewBookings";
import CreateNewVenue from "./CreateNewVenue";
import useCreateVenueStore from "../../js/store/useCreateVenueStore";
import FormListElement from "./FormListElement";
import ChooseLocation from "./ChooseLocation";
import RatingElement from "./RatingElement";
import CustomSwitch from "./CustomSwitch";

export default function VenueHubPage() {
  const [viewWelcome, setViewWelcome] = useState(true);
  const [viewBooking, setViewBooking] = useState(false);
  const [viewVenues, setViewVenues] = useState(false);
  const [viewNewVenue, setViewNewVenue] = useState(false);
  const [viewUpdateVenue, setUpdateVenue] = useState(false);
  const [currentVenue, setCurrentVenue] = useState({});

  function handleViewChange(view) {
    setViewWelcome(view === "welcome");
    setViewBooking(view === "booking");
    setViewVenues(view === "venues");
    setViewNewVenue(view === "newVenue");
    setUpdateVenue(view === "updateVenue");
  }

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
        {viewUpdateVenue && <UpdateVenue venue={currentVenue} />}
      </section>
    </div>
  );
}

function UpdateVenue({ venue }) {
  const {
    setVenue,
    setAddress,
    setLocation,
    setZipCode,
    setPrice,
    setRating,
    setSleeps,
    toggleWifi,
    toggleBreakfast,
    toggleParking,
    togglePets,
    wifi,
    pets,
    breakfast,
    parking,
    setWifi,
    setParking,
    setPets,
    setBreakfast,
  } = useCreateVenueStore();

  useEffect(() => {
    if (venue) {
      setVenue(venue?.name);
      setAddress(venue?.location.address);
      setLocation(venue?.location.city);
      setZipCode(venue?.location.zip);
      setPrice(venue?.price);
      setRating(venue?.rating);
      setSleeps(venue?.maxGuests);
      setWifi(venue?.meta.wifi);
      setParking(venue?.meta.parking);
      setBreakfast(venue?.meta.breakfast);
      setPets(venue?.meta.pets);
    }
  }, [
    setVenue,
    setAddress,
    setLocation,
    setZipCode,
    setPrice,
    setRating,
    setSleeps,
    setWifi,
    setParking,
    setPets,
    setBreakfast,
    venue,
  ]);

  console.log("current venue:", venue);
  return (
    <div>
      <section className="flex flex-col gap-5 md:gap-7.5 lg:gap-10 px-5 md:px-7.5 lg:px-10">
        <Heading level="2" className="text-center text-deep-blue">
          update venue
        </Heading>
        <form className="flex flex-col gap-5 md:gap-x-7.5 md:gap-y-15 lg:gap-x-10 lg:gap-y-20 md:grid grid-cols-2">
          <div className="flex flex-col gap-5 md:gap-7.5 lg:gap-10">
            <fieldset>
              <legend className="sr-only">name and location data</legend>
              <ul className="flex flex-col gap-5 md:gap-7.5 lg:gap-10">
                <FormListElement
                  setter="venue"
                  element="venue"
                  label="venue"
                  error=""
                  mustHave={true}
                  placeholder="Venue name"
                />
                <FormListElement
                  setter="address"
                  element="address"
                  label="address"
                  error=""
                  mustHave={true}
                  placeholder="Street address"
                />
                <ChooseLocation />
                <FormListElement
                  setter="zipCode"
                  element="zip-code"
                  label="zip code"
                  error=""
                  mustHave={true}
                  placeholder="35560"
                />
              </ul>
            </fieldset>
            <fieldset>
              <legend className="sr-only">accommodation details</legend>
              <ul className="flex flex-col gap-5 md:gap-7.5 lg:gap-10">
                <FormListElement
                  setter="price"
                  element="price"
                  label="price €"
                  error=""
                  mustHave={true}
                  placeholder="€165"
                />
                <RatingElement />
                <FormListElement
                  setter="sleeps"
                  element="sleeps"
                  label="sleeps"
                  error=""
                  mustHave={true}
                  placeholder="4"
                />
              </ul>
            </fieldset>
          </div>
          <div className="flex flex-col gap-5 md:gap-7.5 lg:gap-10">
            <fieldset className="flex flex-col gap-2.5 md:gap-3.75 lg:gap-5 mt-5 md:mt-0">
              <legend className="sr-only">amenities</legend>
              <Heading level="3" className="text-center text-deep-blue">
                Amenities
              </Heading>
              <div className="bg-warm-beige border border-natural-charcoal/40 rounded-xl w-56 mx-auto">
                <ul className="flex flex-col gap-5 md:gap-7.5 lg:gap-10 items-center mt-2.5 md:mt-3.75 lg:mt-5 mb-10">
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
          </div>
        </form>
      </section>
    </div>
  );
}
