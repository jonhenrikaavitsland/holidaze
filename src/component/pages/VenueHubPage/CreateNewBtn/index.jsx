import useCreateVenueStore from "../../../../js/store/useCreateVenueStore";

/* eslint-disable react/prop-types */

/**
 * Renders a button that clears the current venue creation state and switches the view to "new venue" mode.
 *
 * When clicked, the button triggers the `clearAll` action from the create venue store to reset any existing venue data,
 * and then calls the provided `handleViewChange` callback with the argument "newVenue" to change the view.
 *
 * @component
 * @param {object} props - The component props.
 * @param {Function} props.handleViewChange - Callback function to handle the view change; it should accept a string argument indicating the new view.
 *
 * @example
 * // Example usage:
 * <CreateNewBtn handleViewChange={(view) => console.log("Switching to", view)} />
 *
 * @returns {JSX.Element} The rendered "Create New Venue" button.
 */
export default function CreateNewBtn({ handleViewChange }) {
  const { clearAll } = useCreateVenueStore();
  return (
    <div className="mx-auto">
      <button
        className="font-serif font-bold text-2xl-leading-none md:text-3xl-leading-none lg:text-4xl-leading-none text-white bg-deep-blue py-3.75 px-7.5 md:py-5 md:px-10 lg:py-7.5 lg:px-15 rounded-xl shadow-md shadow-natural-charcoal/40 hover:bg-deep-blue/90"
        onClick={() => {
          clearAll();
          handleViewChange("newVenue");
        }}
      >
        create new venue
      </button>
    </div>
  );
}
