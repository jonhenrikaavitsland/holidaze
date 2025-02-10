/* eslint-disable react/prop-types */
import useDeleteVenue from "../../../../js/api/useDeleteVenue";
import useAlertStore from "../../../../js/store/useAlertStore";
import useUIStore from "../../../../js/store/useUIStore";

export default function DeleteVenueBtn({ id, handleViewChange }) {
  const { openStateWithOverlay, closeAll } = useUIStore();
  const { deleteVenue, loading, error } = useDeleteVenue();
  const { setAlert, updateMessage, clearAlert } = useAlertStore();

  const title = "delete venue";
  const message =
    "Are you sure you want to DELETE the venue? This action can not be undone later!";
  const type = "ok-cancel";
  const className =
    "w-full bg-custom-coral hover:text-natural-charcoal hover:bg-custom-coral/50 text-white";

  const handleOk = async () => {
    const success = await deleteVenue(id);
    if (success) {
      updateMessage("Successfully deleted the venue!");
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
