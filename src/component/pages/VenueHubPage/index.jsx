import { useEffect, useState } from "react";
import Heading from "../../Heading";
import LinkBtn from "./LinkBtn";
import ViewVenuesObject from "./ViewVenuesObject";
import CreateNewVenue from "./CreateNewVenue";
import Welcome from "./Welcome";
import ViewBookings from "./ViewBookings";
import UpdateVenue from "./UpdateVenue";
import Buttons from "./Buttons";

/**
 * Renders the Venue HUB page, a central dashboard for venue managers to manage their venues and bookings.
 *
 * This component provides a multi-view interface that allows users to:
 * - View a welcome message with introductory information and options (default view).
 * - View upcoming bookings via the "view bookings" view.
 * - View a list of existing venues via the "view venues" view.
 * - Create a new venue via the "new venue" view.
 * - Update an existing venue via the "update venue" view.
 *
 * The view is controlled by several state variables (`viewWelcome`, `viewBooking`, `viewVenues`, `viewNewVenue`, and `viewUpdateVenue`)
 * and is changed using the `handleViewChange` callback. The component also manages the currently selected venue (`currentVenue`)
 * for updating purposes.
 *
 * Additionally, it sets the document title and meta description upon mounting for SEO purposes.
 *
 * On large screens, a sidebar with navigation buttons (implemented with `LinkBtn` components) is displayed for quick access to the different views.
 *
 * @component
 * @example
 * // Example usage:
 * <VenueHubPage />
 *
 * @returns {JSX.Element} The rendered Venue HUB page.
 */
export default function VenueHubPage() {
  const [viewWelcome, setViewWelcome] = useState(true);
  const [viewBooking, setViewBooking] = useState(false);
  const [viewVenues, setViewVenues] = useState(false);
  const [viewNewVenue, setViewNewVenue] = useState(false);
  const [viewUpdateVenue, setUpdateVenue] = useState(false);
  const [currentVenue, setCurrentVenue] = useState({});

  useEffect(() => {
    document.title = "Venue HUB || Holidaze";

    const metaDescription = document.querySelector('meta[name="description"]');
    const content =
      "Welcome to your playground, this is were you manage your valuable assets, create new venues, view existing venues, view bookings and interact with your assets as you need. All made accessible to you here at Holidaze.";
    if (metaDescription) {
      metaDescription.setAttribute("content", content);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = content;
      document.head.appendChild(meta);
    }
  }, []);

  function handleViewChange(view) {
    setViewWelcome(view === "welcome");
    setViewBooking(view === "booking");
    setViewVenues(view === "venues");
    setViewNewVenue(view === "newVenue");
    setUpdateVenue(view === "updateVenue");
  }

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="hidden lg:flex bg-warm-beige p-10 w-56 border-r border-natural-charcoal/40 min-h-dvh">
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
        {viewNewVenue && <CreateNewVenue handleViewChange={handleViewChange} />}
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
