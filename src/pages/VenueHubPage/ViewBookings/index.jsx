import { useEffect, useMemo, useState } from "react";
import Heading from "../../../component/Heading";
import Loader from "../../../component/Loader";
import BookingObjects from "../BookingObjects";
import useProfileVenues from "../../../js/api/useProfileVenues";
import NoBookings from "../NoBookings";

export default function ViewBookings() {
  const [currentPage, setCurrentPage] = useState(1);
  const [accumulatedVenueBookings, setAccumulatedVenueBookings] = useState([]);
  const [sortBy, setSortBy] = useState("date");
  const [sortedBookings, setSortedBookings] = useState([]);

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
  const sortedVenueBookings = useMemo(() => {
    return [...accumulatedVenueBookings].sort(
      (a, b) => new Date(a.booking.dateFrom) - new Date(b.booking.dateFrom),
    );
  }, [accumulatedVenueBookings]);

  // New constant: flat list of bookings sorted first by venue name then by booking dateFrom.
  const sortedByVenueBookings = useMemo(() => {
    return (
      [...accumulatedVenueBookings]
        // Although accumulatedVenueBookings should already only have upcoming bookings,
        // we add an extra filter in case additional filtering is needed.
        .filter(({ booking }) => new Date(booking.dateTo) >= today)
        .sort((a, b) => {
          const venueComparison = a.venue.name.localeCompare(b.venue.name);
          if (venueComparison !== 0) return venueComparison;
          return new Date(a.booking.dateFrom) - new Date(b.booking.dateFrom);
        })
    );
  }, [accumulatedVenueBookings, today]);

  // Choose which sorted array to pass to BookingObjects based on the selected sort option.
  const sortBookings = useMemo(() => {
    return sortBy === "date" ? sortedVenueBookings : sortedByVenueBookings;
  }, [sortBy, sortedVenueBookings, sortedByVenueBookings]);

  useEffect(() => {
    setSortedBookings(sortBookings);
  }, [sortBookings]);

  console.log("Sorted Upcoming Bookings:", sortedVenueBookings);
  console.log("Sorted By Venue Bookings:", sortedByVenueBookings);
  console.log("META:", meta);
  console.log(loading, error);

  return (
    <section className="flex flex-col gap-5 md:gap-7.5 lg:gap-10 mx-5 md:mx-7.5 lg:mx-10 mb-10 md:mb-15 lg:mb-20">
      {venues.length > 0 && (
        <Heading level="2" className="text-center text-custom-coral">
          bookings (
          <span className="text-natural-charcoal">
            {sortedVenueBookings.length}
          </span>
          )
        </Heading>
      )}
      <div>
        <div>
          <form>
            <fieldset className="flex justify-end">
              <legend className="sr-only">sort by</legend>
              <div className="flex gap-5 items-end">
                <label
                  htmlFor="sort-b"
                  className="font-medium text-sm-leading-none"
                >
                  Sort by:
                </label>
                <select
                  className="capitalize bg-white pt-4 cursor-pointer"
                  name="sort-by"
                  id="sort-by"
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="date">date</option>
                  <option value="venue">venue</option>
                </select>
              </div>
            </fieldset>
          </form>
        </div>
        {loading ? (
          <div className="flex justify-center mt-10">
            <Loader />
          </div>
        ) : !sortedVenueBookings.length ? (
          <NoBookings />
        ) : (
          <BookingObjects sortedVenueBookings={sortedBookings} />
        )}
      </div>
    </section>
  );
}
