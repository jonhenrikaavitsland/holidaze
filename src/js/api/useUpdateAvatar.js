import { useState } from "react";
import { apiKey, apiUrl, profilesPath } from "../data/constants";
import useAlertStore from "../store/useAlertStore";
import useUIStore from "../store/useUIStore";

/**
 * Custom hook for updating a user's avatar via an API call.
 *
 * This hook provides an `updateAvatar` function that sends a PUT request to update the user's avatar image.
 * The request is sent to the user's profile endpoint, using the provided API key and bearer token for authentication.
 * On a successful update, the hook sets an internal state flag `updateSuccess` to true.
 * If the update fails, it handles the error by setting alerts via the UI and Alert stores, and logs the error details.
 *
 * @component
 * @param {object} user - The user object containing at least the user's name.
 * @param {string} token - The bearer token used for authentication.
 * @param {string} newImage - The URL of the new avatar image.
 *
 * @example
 * // Example usage:
 * const { updateAvatar, updateSuccess } = useUpdateAvatar();
 *
 * async function handleAvatarUpdate() {
 *   try {
 *     await updateAvatar(user, token, "https://example.com/new-avatar.jpg");
 *     if (updateSuccess) {
 *       // Avatar updated successfully
 *     }
 *   } catch (error) {
 *     // Handle error (alerts are automatically managed by the hook)
 *   }
 * }
 *
 * @returns {object} An object containing:
 *   - {Function} updateAvatar - Async function to update the user's avatar.
 *   - {boolean} updateSuccess - Flag indicating whether the avatar update was successful.
 */
const useUpdateAvatar = () => {
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const { setAlert, clearAlert } = useAlertStore();
  const { closeAll, checkAndCloseAll, openStateWithOverlay } = useUIStore();

  const handleOk = () => {
    clearAlert();
    closeAll();
  };

  const updateAvatar = async (user, token, newImage) => {
    const endPoint = `${apiUrl}${profilesPath}/${user.name}`;

    try {
      const response = await fetch(endPoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Noroff-API-Key": apiKey,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          avatar: {
            url: newImage,
            alt: user.name,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        const errorMessage = (errorData && errorData.message) || "Login Failed";

        const errorToThrow = new Error(errorMessage);
        errorToThrow.status = response.status;
        errorToThrow.data = errorData;

        setTimeout(() => {
          checkAndCloseAll();
          setAlert(
            errorToThrow.data?.status,
            errorToThrow.data.errors[0]?.message,
            "ok-only",
            handleOk,
            "",
            "bg-custom-coral text-white",
          );
          setTimeout(() => {
            openStateWithOverlay("isAlertModalOpen");
          }, 1000);
        }, 500);

        throw errorToThrow;
      }

      setUpdateSuccess(true);
    } catch (error) {
      console.error(error.message, error.status, error.data);
      setUpdateSuccess(false);
      throw error;
    }
  };

  return { updateAvatar, updateSuccess };
};

export default useUpdateAvatar;
