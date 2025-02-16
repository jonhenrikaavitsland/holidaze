import { useState } from "react";
import { apiKey, apiUrl, profilesPath } from "../data/constants";
import useAlertStore from "../store/useAlertStore";
import useUIStore from "../store/useUIStore";

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

      // If update is successful, update state.
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
