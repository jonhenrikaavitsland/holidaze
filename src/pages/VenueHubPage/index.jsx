import { useState } from "react";
import Heading from "../../component/Heading";
import LinkBtn from "./LinkBtn";
import Buttons from "./Buttons";
import Welcome from "./Welcome";
import ViewVenuesObject from "./ViewVenuesObject";
import ViewBookings from "./ViewBookings";
import CreateNewVenue from "./CreateNewVenue";

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
