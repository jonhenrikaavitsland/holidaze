import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import useCreateVenueStore from "../store/useCreateVenueStore";
import { apiKey, apiUrl, locationsMap, venuesPath } from "../data/constants";
import useAlertStore from "../store/useAlertStore";
import useUIStore from "../store/useUIStore";

/**
 * Custom hook for updating an existing venue via an API call.
 *
 * This hook provides an `updateVenue` function that sends a PUT request to update venue details.
 * It constructs a request payload from the provided form values, including venue name, description, media,
 * pricing, guest capacity, rating, meta amenities, and location information. The location data is derived
 * from a predefined locations map to extract city, latitude, and longitude.
 *
 * On a successful update, the hook clears any temporary venue state. In case of an error, it handles the error
 * by setting alerts through the UI and Alert stores, and then throws an error with the response details.
 *
 * @component
 * @param {string|number} id - The unique identifier of the venue to update.
 *
 * @example
 * // Example usage:
 * const { updateVenue, isLoading } = useUpdateVenue("venue-id-123");
 *
 * async function handleUpdate(formValues) {
 *   try {
 *     await updateVenue(formValues);
 *     // Handle success (e.g., notify the user, update UI)
 *   } catch (error) {
 *     // Handle error (e.g., display error message)
 *   }
 * }
 *
 * @returns {object} An object containing:
 *   - {Function} updateVenue - Async function that accepts venue form values and updates the venue.
 *   - {boolean} isLoading - Indicates whether the update request is in progress.
 */
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
