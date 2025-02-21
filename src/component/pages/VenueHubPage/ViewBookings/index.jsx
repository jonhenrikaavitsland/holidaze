import { useEffect, useMemo, useState } from "react";
import Heading from "../../../Heading";
import Loader from "../../../Loader";
import BookingObjects from "../BookingObjects";
import useProfileVenues from "../../../../js/api/useProfileVenues";
import NoBookings from "../NoBookings";
import SortBy from "../SortBy";

/**
 * Renders the ViewBookings component that displays the user's upcoming venue bookings.
 *
 * This component performs the following actions:
 * - Fetches venue data with bookings using the `useProfileVenues` hook, which retrieves a paginated list of venues
 *   and their associated bookings for the current user.
 * - Accumulates and deduplicates booking objects by flattening the bookings from each venue and filtering out past bookings.
 * - Automatically loads additional pages of venue data if more pages are available.
 * - Provides two sorting options for the accumulated bookings:
 *   - Sorting by date (i.e., by the booking's `dateFrom` in ascending order).
 *   - Sorting by venue name (alphabetically) and then by booking date.
 * - Uses the `SortBy` component to allow the user to select the sorting criterion.
 * - Displays a heading that shows the total number of upcoming bookings.
 * - Renders a loader while data is being fetched, an error message if fetching fails, or a "NoBookings" message if no bookings exist.
 * - When bookings are available, the `BookingObjects` component is used to render the sorted list of booking objects.
 *
 * The component utilizes React hooks such as `useState`, `useEffect`, `useMemo`, and `useCallback` for data management,
 * pagination, and sorting logic.
 *
 * @component
 * @example
 * // Example usage:
 * <ViewBookings />
 *
 * @returns {JSX.Element} The rendered ViewBookings component.
 */
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

  return (
    <section className="flex flex-col gap-5 md:gap-7.5 lg:gap-10 mx-5 md:mx-7.5 lg:mx-10 mb-10 md:mb-15 lg:mb-20">
      {error && (
        <p className="text-center font-bold text-custom-coral md:text-lg lg:text-xl">
          {error.message}
        </p>
      )}
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
        {sortedVenueBookings.length > 0 && <SortBy setSortBy={setSortBy} />}
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
