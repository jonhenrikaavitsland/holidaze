/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from "react";
import Heading from "../../component/Heading";
import LinkBtn from "./LinkBtn";
import Buttons from "./Buttons";
import Welcome from "./Welcome";
import ViewVenuesObject from "./ViewVenuesObject";
import useProfileVenues from "../../js/api/useProfileVenues";
import Loader from "../../component/Loader";

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
            />
            <LinkBtn
              content="view venues"
              handleViewChange={handleViewChange}
              kind="venues"
              status={viewVenues}
            />
            <LinkBtn
              content="new venue"
              handleViewChange={handleViewChange}
              kind="newVenue"
              status={viewNewVenue}
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
      </section>
    </div>
  );
}

function ViewBookings() {
  const [currentPage, setCurrentPage] = useState(1);
  const [accumulatedVenueBookings, setAccumulatedVenueBookings] = useState([]);

  const { venues, meta, loading, error } = useProfileVenues({
    page: currentPage,
    limit: 100,
  });

  const today = useMemo(() => new Date(), []);

  useEffect(() => {
    if (venues && venues.length > 0) {
      // For each venue, attach the venue info to each of its bookings.
      const newVenueBookings = venues.flatMap((venue) =>
        // Create an object for each booking that includes the venue object.
        venue.bookings.map((booking) => ({ venue, booking })),
      );

      // Filter out the bookings where the booking's dateTo is in the past.
      const upcomingVenueBookings = newVenueBookings.filter(
        ({ booking }) => new Date(booking.dateTo) >= today,
      );

      setAccumulatedVenueBookings((prevVenueBookings) => {
        // Combine previous and new bookings.
        const combined = [...prevVenueBookings, ...upcomingVenueBookings];

        // Deduplicate bookings based on their id.
        const uniqueBookingsMap = new Map();
        combined.forEach((item) => {
          uniqueBookingsMap.set(item.booking.id, item);
        });

        return Array.from(uniqueBookingsMap.values());
      });
    }
  }, [venues, today]);

  // Automatically load the next page if more pages are available.
  useEffect(() => {
    if (meta && meta.pageCount > currentPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [meta, currentPage]);

  // Sort the accumulated venue-booking objects by the booking's dateFrom (earliest first).
  const sortedVenueBookings = accumulatedVenueBookings.sort(
    (a, b) => new Date(a.booking.dateFrom) - new Date(b.booking.dateFrom),
  );

  console.log("Sorted Upcoming Bookings:", sortedVenueBookings);
  console.log("META:", meta);
  console.log(loading, error);

  return (
    <section className="flex flex-col gap-5 md:gap-7.5 lg:gap-10 mx-5 md:mx-7.5 lg:mx-10 mb-10 md:mb-15 lg:mb-20">
      {venues.length > 0 && (
        <Heading level="2" className="text-center text-custom-coral">
          active bookings
        </Heading>
      )}
      {loading ? (
        <div className="flex justify-center mt-10">
          <Loader />
        </div>
      ) : error ? (
        <p>Oops... I can&apos;t find your bookings!</p>
      ) : (
        <BookingObject sortedVenueBookings={sortedVenueBookings} />
      )}
    </section>
  );
}

function BookingObject({ sortedVenueBookings }) {
  console.log(sortedVenueBookings);
  return (
    <section>
      {sortedVenueBookings.map((venueBooking, index) => (
        <ul key={index}></ul>
      ))}
    </section>
  );
}
