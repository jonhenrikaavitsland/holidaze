/* eslint-disable react/prop-types */
import { useState } from "react";
import Heading from "../../../Heading";
import Loader from "../../../Loader";
import HasNoVenues from "../HasNoVenues";
import HasVenues from "../HasVenues";
import useProfileVenues from "../../../../js/api/useProfileVenues";

/**
 * Renders the view for displaying a list of venues or a prompt to create one, based on the user's venue data.
 *
 * This component uses the `useProfileVenues` hook to fetch a paginated list of venues for the current user.
 * It displays a heading if any venues are available, shows a loader while the data is loading, and conditionally
 * renders either the `HasVenues` component (if venues exist) or the `HasNoVenues` component (if no venues are available).
 *
 * The component accepts two callbacks:
 * - `handleViewChange`: A function to switch between different views (e.g., navigating to a detailed view or a form for creating a new venue).
 * - `setCurrentVenue`: A function to set the currently selected venue.
 *
 * @component
 * @param {object} props - The component props.
 * @param {Function} props.handleViewChange - Callback function to change the view.
 * @param {Function} props.setCurrentVenue - Callback function to set the currently selected venue.
 *
 * @example
 * // Example usage:
 * <ViewVenuesObject
 *   handleViewChange={(view) => console.log("Switching view to:", view)}
 *   setCurrentVenue={(venue) => console.log("Selected venue:", venue)}
 * />
 *
 * @returns {JSX.Element} The rendered view of venues or a prompt to create a new venue.
 */
export default function ViewVenuesObject({
  handleViewChange,
  setCurrentVenue,
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const { venues, meta, loading, error } = useProfileVenues({
    page: currentPage,
    limit: 10,
  });

  return (
    <section className="flex flex-col gap-5 md:gap-7.5 lg:gap-10 mx-5 md:mx-7.5 lg:mx-10 mb-10 md:mb-15 lg:mb-20">
      {venues.length > 0 && (
        <Heading level="2" className="text-center text-custom-coral">
          venues
        </Heading>
      )}
      {loading ? (
        <div className="flex justify-center pt-10">
          <Loader />
        </div>
      ) : venues.length > 0 ? (
        <HasVenues
          venues={venues}
          meta={meta}
          error={error}
          setCurrentPage={setCurrentPage}
          handleViewChange={handleViewChange}
          setCurrentVenue={setCurrentVenue}
        />
      ) : (
        <HasNoVenues handleViewChange={handleViewChange} />
      )}
    </section>
  );
}
