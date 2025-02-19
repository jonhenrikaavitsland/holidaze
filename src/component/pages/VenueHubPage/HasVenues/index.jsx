/* eslint-disable react/prop-types */
import LoadMore from "../../../LoadMore";
import VenueObject from "../VenueObject";

/**
 * Renders a list of venues with pagination controls and error handling for the venues view.
 *
 * This component displays:
 * - An error message (if an error object is provided via the `error` prop).
 * - A list of venues, where each venue is rendered using the `VenueObject` component.
 *   Each venue is preceded by a counter indicating its sequential number relative to the total count.
 * - A "Load More" button (via the `LoadMore` component) if there are multiple pages of venues (i.e., if `meta.pageCount` is 2 or more).
 *
 * Props:
 * @param {Array} venues - An array of venue objects to be displayed.
 * @param {object} meta - An object containing metadata for pagination, including:
 *   - {number} currentPage - The current page number.
 *   - {number} totalCount - The total number of venues available.
 *   - {number} pageCount - The total number of pages available.
 * @param {Function} setCurrentPage - Callback function to update the current page for pagination.
 * @param {Function} handleViewChange - Callback function to change the view (e.g., navigating to a detailed venue view).
 * @param {Function} setCurrentVenue - Callback function to set the currently selected venue.
 * @param {object} [error] - An optional error object; if present, its `message` property will be displayed.
 *
 * @example
 * // Example usage:
 * <HasVenues
 *   venues={venuesArray}
 *   meta={{ currentPage: 1, totalCount: 50, pageCount: 5 }}
 *   setCurrentPage={(page) => console.log("Page:", page)}
 *   handleViewChange={(view) => console.log("Changing view to:", view)}
 *   setCurrentVenue={(venue) => console.log("Selected venue:", venue)}
 *   error={errorObject}
 * />
 *
 * @returns {JSX.Element} The rendered list of venues with pagination controls.
 */
export default function HasVenues({
  venues,
  meta,
  setCurrentPage,
  handleViewChange,
  setCurrentVenue,
  error,
}) {
  return (
    <div className="flex flex-col gap-5 md:gap-7.5 lg:gap-10">
      {error && (
        <p className="text-center font-bold text-custom-coral md:text-lg lg:text-xl">
          {error.message}
        </p>
      )}
      {venues.map((venue, index) => (
        <div key={index} className="flex flex-col gap-1">
          <span className="text-xs-leading-none">
            {(meta.currentPage - 1) * 10 + (index + 1)} / {meta.totalCount}
          </span>
          <VenueObject
            venue={venue}
            handleViewChange={handleViewChange}
            setCurrentVenue={setCurrentVenue}
          />
        </div>
      ))}
      {meta.pageCount >= 2 && (
        <LoadMore
          setCurrentPage={setCurrentPage}
          meta={meta}
          headingContent="Load more venues"
        />
      )}
    </div>
  );
}
