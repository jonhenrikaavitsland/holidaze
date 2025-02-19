/* eslint-disable react/prop-types */

/**
 * Renders a "Danger Zone" section that provides a UI for destructive actions such as deleting a venue.
 *
 * This component displays a prominent heading and includes a `DeleteVenueBtn` component which allows the user
 * to delete the venue. The appearance of the section is styled with a distinct background color to signal caution.
 *
 * @component
 * @param {object} props - The component props.
 * @param {string|number} props.id - The unique identifier for the venue to be deleted.
 * @param {Function} props.handleViewChange - Callback function to handle view changes after an action is performed.
 *
 * @example
 * // Example usage:
 * <DangerZone id="venue123" handleViewChange={(view) => console.log("Switching to", view)} />
 *
 * @returns {JSX.Element} The rendered Danger Zone section.
 */
import DeleteVenueBtn from "../DeleteVenueBtn";

export default function DangerZone({ id, handleViewChange }) {
  return (
    <section className="flex flex-col gap-10 md:gap-15 lg:gap-20 bg-custom-coral pt-5 md:pt-7.5 lg:pt-10 pb-10 md:pb-15 lg:pb-20">
      <h2 className="font-serif text-white text-center text-4xl-leading-none uppercase font-black underline">
        danger zone
      </h2>
      <DeleteVenueBtn id={id} handleViewChange={handleViewChange} />
    </section>
  );
}
