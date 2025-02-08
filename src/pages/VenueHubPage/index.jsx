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
import MediaElement from "./MediaElement";
import useUpdateVenue from "../../js/api/useUpdateVenue";
import updateVenueStore from "../../js/data/updateVenueStore";
import Loader from "../../component/Loader";
import useUIStore from "../../js/store/useUIStore";
import useDeleteVenue from "../../js/api/useDeleteVenue";
import useAlertStore from "../../js/store/useAlertStore";

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
        {viewUpdateVenue && (
          <UpdateVenue
            venueObj={currentVenue}
            handleViewChange={handleViewChange}
          />
        )}
      </section>
    </div>
  );
}

function UpdateVenue({ venueObj, handleViewChange }) {
  const [loading, setLoading] = useState(true);

  const {
    setVenue,
    setAddress,
    setChosenLocation,
    setZipCode,
    setPrice,
    setRating,
    setSleeps,
    setWifi,
    setParking,
    setPets,
    setBreakfast,
    setMedia,
    setDescription,
    venue,
    address,
    zipCode,
    chosenLocation,
    price,
    rating,
    sleeps,
    toggleWifi,
    toggleBreakfast,
    toggleParking,
    togglePets,
    wifi,
    pets,
    breakfast,
    parking,
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
    clearAll,
  } = useCreateVenueStore();

  useEffect(() => {
    if (venueObj) {
      // Update the venue store with the provided venueObj
      updateVenueStore(venueObj, {
        setVenue,
        setAddress,
        setChosenLocation,
        setZipCode,
        setPrice,
        setRating,
        setSleeps,
        setWifi,
        setParking,
        setPets,
        setBreakfast,
        setMedia,
        setDescription,
        clearAll,
      });
      // Once the update is complete, set loading to false
      setLoading(false);
    } else {
      // If venueObj isn't available, ensure loading remains true
      setLoading(true);
    }
  }, [
    venueObj,
    setVenue,
    setAddress,
    setChosenLocation,
    setZipCode,
    setPrice,
    setRating,
    setSleeps,
    setWifi,
    setParking,
    setPets,
    setBreakfast,
    setMedia,
    setDescription,
    clearAll,
  ]);

  const { updateVenue, isLoading, error } = useUpdateVenue(venueObj.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("location-handleSubmit:", chosenLocation);
    updateVenue({
      wifi,
      breakfast,
      parking,
      pets,
      venue,
      address,
      chosenLocation,
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
    error ? console.log("Error:", error) : handleViewChange("venues");
  };

  console.log("current venue:", venueObj);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-10 md:gap-15 lg:gap-20">
          <section className="flex flex-col gap-5 md:gap-7.5 lg:gap-10 px-5 md:px-7.5 lg:px-10">
            <Heading level="2" className="text-center text-deep-blue">
              update venue
            </Heading>
            <form
              className="flex flex-col gap-5 md:gap-x-7.5 md:gap-y-15 lg:gap-x-10 lg:gap-y-20 md:grid grid-cols-2"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-5 md:gap-7.5 lg:gap-10">
                <fieldset>
                  <legend className="sr-only">name and location data</legend>
                  <ul className="flex flex-col gap-5 md:gap-7.5 lg:gap-10">
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
                  <ul className="flex flex-col gap-5 md:gap-7.5 lg:gap-10">
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
                <fieldset className="mt-5">
                  <legend className="sr-only">media</legend>
                  <MediaElement />
                </fieldset>
              </div>
              <fieldset className="my-5 col-span-full">
                <legend className="sr-only">description</legend>
                <div className="flex flex-col gap-1">
                  <label
                    className="text-sm-leading-none capitalize"
                    htmlFor="description"
                  >
                    description
                  </label>
                  <textarea
                    className="bg-warm-beige border border-natural-charcoal/40 w-full h-44 p-1 overflow-y-scroll overscroll-contain scrollbar md:text-lg lg:text-xl"
                    name="description"
                    id="description"
                    placeholder="Describe your amazing venue"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </fieldset>
              <div className="flex justify-center col-span-full">
                <button
                  className="font-serif font-bold text-2xl-leading-none md:text-3xl-leading-none lg:text-4xl-leading-none bg-deep-blue text-white py-3.75 px-7.5 md:py-5 md:px-10 lg:py-7.5 lg:px-15 rounded-xl shadow-md shadow-natural-charcoal/40 hover:bg-deep-blue/90"
                  disabled={isLoading}
                  type="submit"
                >
                  update venue
                </button>
              </div>
            </form>
          </section>
          <DangerZone id={venueObj.id} handleViewChange={handleViewChange} />
        </div>
      )}
    </>
  );
}

function DangerZone({ id, handleViewChange }) {
  return (
    <section className="flex flex-col gap-10 md:gap-15 lg:gap-20 bg-custom-coral pt-5 md:pt-7.5 lg:pt-10 pb-10 md:pb-15 lg:pb-20">
      <h2 className="font-serif text-white text-center text-4xl-leading-none uppercase font-black underline">
        danger zone
      </h2>
      <DeleteVenueBtn id={id} handleViewChange={handleViewChange} />
    </section>
  );
}

function DeleteVenueBtn({ id, handleViewChange }) {
  const { openStateWithOverlay, closeAll } = useUIStore();
  const { deleteVenue, loading, error } = useDeleteVenue();
  const { setAlert, updateMessage, clearAlert } = useAlertStore();

  const title = "delete venue";
  const message =
    "Are you sure you want to DELETE the venue? This action can not be undone later!";
  const type = "ok-cancel";
  const className =
    "w-full bg-custom-coral hover:text-natural-charcoal hover:bg-custom-coral/50 text-white";

  const handleOk = async () => {
    const success = await deleteVenue(id);
    if (success) {
      updateMessage("Successfully deleted the venue!");
      setTimeout(() => {
        closeAll();
        clearAlert();
        handleViewChange("venues");
      }, 2000);
      return;
    }
    setAlert(
      "Ops. Something went wrong!",
      error,
      "ok-only",
      () => {
        closeAll();
        clearAlert();
      },
      null,
    );
    return;
  };

  const handleCancel = () => {
    closeAll();
    clearAlert();
    return;
  };

  return (
    <div className="flex justify-center ">
      <div className="bg-white p-1 rounded-xl">
        <div className="bg-custom-coral p-1 rounded-xl">
          <button
            className="bg-white text-custom-coral uppercase poppins font-black py-3.75 px-7.5 rounded-xl text-2xl-leading-none hover:bg-custom-coral hover:text-white"
            onClick={() => {
              setAlert(title, message, type, handleOk, handleCancel, className);
              openStateWithOverlay("isAlertModalOpen");
            }}
            disabled={loading}
          >
            delete venue
          </button>
        </div>
      </div>
    </div>
  );
}
