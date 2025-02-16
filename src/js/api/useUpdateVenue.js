import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import useCreateVenueStore from "../store/useCreateVenueStore";
import { apiKey, apiUrl, locationsMap, venuesPath } from "../data/constants";
import useAlertStore from "../store/useAlertStore";
import useUIStore from "../store/useUIStore";

const useUpdateVenue = (id) => {
  const { token } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const { clearAll } = useCreateVenueStore();
  const { setAlert, clearAlert } = useAlertStore();
  const { closeAll, checkAndCloseAll, openStateWithOverlay } = useUIStore();

  const handleOk = () => {
    clearAlert();
    closeAll();
  };

  const updateVenue = async (values) => {
    setIsLoading(true);

    try {
      const {
        wifi,
        breakfast,
        parking,
        pets,
        venue,
        address,
        location,
        zipCode,
        price,
        rating,
        sleeps,
        description,
        media0,
        media1,
        media2,
        media3,
        media4,
        media5,
        media6,
        media7,
        media8,
        media9,
      } = values;

      console.log("locObj:", location);
      const selectedLocation = locationsMap[location] || {};
      const city = selectedLocation.city || null;
      const lat = selectedLocation.lat || 0;
      const lng = selectedLocation.lng || 0;

      const media = [
        media0,
        media1,
        media2,
        media3,
        media4,
        media5,
        media6,
        media7,
        media8,
        media9,
      ]
        .filter((url) => url && url.trim() !== "")
        .map((url) => ({
          url,
          alt: "A wonderful place under the sun",
        }));

      const requestBody = {
        name: venue,
        description,
        media,
        price: parseFloat(price),
        maxGuests: parseInt(sleeps, 10),
        rating: parseFloat(rating) || 0,
        meta: {
          wifi: wifi || false,
          parking: parking || false,
          breakfast: breakfast || false,
          pets: pets || false,
        },
        location: {
          address: address || null,
          city,
          zip: zipCode || null,
          country: "Spain",
          continent: "Africa",
          lat,
          lng,
        },
      };

      const response = await fetch(`${apiUrl}${venuesPath}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Noroff-API-Key": apiKey,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
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

      clearAll();
    } catch (error) {
      console.error(error.message, error.status, error.data);
    } finally {
      setIsLoading(false);
    }
  };
  return { updateVenue, isLoading };
};

export default useUpdateVenue;
