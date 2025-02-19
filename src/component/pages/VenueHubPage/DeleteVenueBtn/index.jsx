/* eslint-disable react/prop-types */
import useDeleteVenue from "../../../../js/api/useDeleteVenue";
import useAlertStore from "../../../../js/store/useAlertStore";
import useUIStore from "../../../../js/store/useUIStore";

/**
 * Renders a button that allows the user to delete a venue, with confirmation and alert handling.
 *
 * This component integrates with the `useDeleteVenue` hook to perform the deletion,
 * and with the `useAlertStore` and `useUIStore` to display confirmation alerts and handle UI state.
 * When the button is clicked, it sets an alert with a title, message, and "ok-cancel" options.
 * - If the user confirms the deletion (handleOk), the venue is deleted via the API. On success, a success message is shown,
 *   and after a delay the UI is updated to reflect the deletion and the view is changed (via `handleViewChange`).
 * - If the deletion fails, an error alert is shown.
 * - If the user cancels (handleCancel), the alert and overlay are simply cleared.
 *
 * @component
 * @param {object} props - The component props.
 * @param {string|number} props.id - The unique identifier of the venue to be deleted.
 * @param {Function} props.handleViewChange - Callback function to change the view after deletion (e.g., navigating to the venues list).
 *
 * @example
 * // Example usage:
 * <DeleteVenueBtn id="venue123" handleViewChange={(view) => console.log("Switching to", view)} />
 *
 * @returns {JSX.Element} The rendered Delete Venue button component.
 */
export default function DeleteVenueBtn({ id, handleViewChange }) {
  const { openStateWithOverlay, closeAll } = useUIStore();
  const { deleteVenue, loading, error } = useDeleteVenue();
  const { setAlert, updateSuccess, clearAlert } = useAlertStore();

  const title = "delete venue";
  const message =
    "Are you sure you want to DELETE the venue? This action can not be undone later!";
  const type = "ok-cancel";
  const className =
    "w-full bg-custom-coral hover:text-natural-charcoal hover:bg-custom-coral/50 text-white";

  const handleOk = async () => {
    const success = await deleteVenue(id);
    if (success) {
      updateSuccess("Successfully deleted the venue!", "", true);
      setTimeout(() => {
        closeAll();
        clearAlert();
        handleViewChange("venues");
      }, 2000);
      return;
    }
    setAlert(
      "Ops. Something went wrong!",
      error,
      "ok-only",
      () => {
        closeAll();
        clearAlert();
      },
      null,
    );
    return;
  };

  const handleCancel = () => {
    closeAll();
    clearAlert();
    return;
  };

  return (
    <div className="flex justify-center ">
      <div className="bg-white p-1 rounded-xl">
        <div className="bg-custom-coral p-1 rounded-xl">
          <button
            className="bg-white text-custom-coral uppercase poppins font-black py-3.75 px-7.5 rounded-xl text-2xl-leading-none hover:bg-custom-coral hover:text-white"
            onClick={() => {
              setAlert(title, message, type, handleOk, handleCancel, className);
              openStateWithOverlay("isAlertModalOpen");
            }}
            disabled={loading}
          >
            delete venue
          </button>
        </div>
      </div>
    </div>
  );
}
