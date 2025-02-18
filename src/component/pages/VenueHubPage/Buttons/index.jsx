/* eslint-disable react/prop-types */

import useCreateVenueStore from "../../../../js/store/useCreateVenueStore";
import LinkBtn from "../LinkBtn";

/**
 * Renders a set of navigation buttons for switching between different views on the venue management page.
 *
 * This component displays three buttons:
 * - "view bookings": Switches to the bookings view.
 * - "view venues": Switches to the venues view.
 * - "new venue": Switches to the new venue creation view and clears any existing venue data.
 *
 * Each button is rendered using the `LinkBtn` component and passes appropriate props such as content, styling, view change handler,
 * and current status. The "new venue" button additionally triggers the `clearAll` action from the create venue store.
 *
 * @component
 * @param {object} props - The component props.
 * @param {Function} props.handleViewChange - Callback function to handle view changes.
 * @param {string} props.bookingStatus - The current status indicator for the bookings view.
 * @param {string} props.venuesStatus - The current status indicator for the venues view.
 * @param {string} props.newVenueStatus - The current status indicator for the new venue view.
 *
 * @example
 * // Example usage:
 * <Buttons
 *   handleViewChange={(view) => console.log("Switching to", view)}
 *   bookingStatus="active"
 *   venuesStatus="inactive"
 *   newVenueStatus="inactive"
 * />
 *
 * @returns {JSX.Element} The rendered set of navigation buttons.
 */
export default function Buttons({
  handleViewChange,
  bookingStatus,
  venuesStatus,
  newVenueStatus,
}) {
  const { clearAll } = useCreateVenueStore();
  return (
    <div className="flex w-full mt-5 mb-10 md:mt-7.5 md:mb-15">
      <ul className="flex flex-col gap-5 md:gap-7.5 lg:hidden mx-auto text-center sm:w-48 w-64 ">
        <LinkBtn
          content="view bookings"
          className="bg-warm-beige border border-natural-charcoal/40 hover:font-bold w-full shadow-md shadow-natural-charcoal/40"
          handleViewChange={handleViewChange}
          kind="booking"
          status={bookingStatus}
        />
        <LinkBtn
          content="view venues"
          className="bg-warm-beige border border-natural-charcoal/40 w-full hover:font-bold shadow-md shadow-natural-charcoal/40"
          handleViewChange={handleViewChange}
          kind="venues"
          status={venuesStatus}
        />
        <LinkBtn
          content="new venue"
          className="bg-warm-beige w-full border border-natural-charcoal/40 hover:font-bold shadow-md shadow-natural-charcoal/40"
          handleViewChange={handleViewChange}
          kind="newVenue"
          status={newVenueStatus}
          action={clearAll}
        />
      </ul>
    </div>
  );
}
