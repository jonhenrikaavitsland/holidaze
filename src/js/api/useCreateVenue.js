import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import useCreateVenueStore from "../store/useCreateVenueStore";
import { locationsMap } from "../data/constants";
import useAlertStore from "../store/useAlertStore";
import useUIStore from "../store/useUIStore";

/**
 * Custom hook for creating a new venue via an API call.
 *
 * This hook constructs a venue object from the provided form values, including details such as name, description, media,
 * pricing, guest capacity, rating, and location information. It then sends a POST request to create the venue on the server.
 *
 * The hook handles the following:
 * - Extracting the authentication token from the auth store.
 * - Mapping location identifiers to their corresponding data using a predefined locations map.
 * - Filtering and formatting media URLs.
 * - Constructing the request payload with venue details, including meta information for amenities.
 * - Managing loading and success states during the API call.
 * - Handling errors by setting an alert with details from the error response and triggering UI changes.
 *
 * @param {string} apiUrl - The base URL of the API endpoint.
 * @param {string} apiKey - The API key required for authentication.
 *
 * @returns {object} An object containing:
 *   - {Function} createVenue - Function to call for creating a new venue. Accepts an object with venue details.
 *   - {boolean} isLoading - Indicates whether the venue creation request is in progress.
 *   - {boolean} success - Indicates whether the venue was created successfully.
 *
 * @example
 * const { createVenue, isLoading, success } = useCreateVenue("https://api.example.com", "your-api-key");
 *
 * // To create a venue:
 * createVenue({
 *   wifi: true,
 *   breakfast: false,
 *   parking: true,
 *   pets: false,
 *   venue: "Beachside Paradise",
 *   address: "123 Ocean Drive",
 *   location: "Costa Calma",
 *   zipCode: "12345",
 *   price: "150.00",
 *   rating: "4.5",
 *   sleeps: "4",
 *   description: "A wonderful venue by the sea.",
 *   media0: "https://example.com/image1.jpg",
 *   // ... other media fields as needed
 * });
 */
const useCreateVenue = (apiUrl, apiKey) => {
  const { token } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { clearAll } = useCreateVenueStore();
  const { setAlert, clearAlert } = useAlertStore();
  const { closeAll, checkAndCloseAll, openStateWithOverlay } = useUIStore();

  const handleOk = () => {
    clearAlert();
    closeAll();
  };

  const createVenue = async (values) => {
    setIsLoading(true);
    setSuccess(false);

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

      const response = await fetch(`${apiUrl}/holidaze/venues`, {
        method: "POST",
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

      setSuccess(true);
      clearAll();
    } catch (error) {
      console.error(error.message, error.status, error.data);
    } finally {
      setIsLoading(false);
    }
  };

  return { createVenue, isLoading, success };
};

export default useCreateVenue;
