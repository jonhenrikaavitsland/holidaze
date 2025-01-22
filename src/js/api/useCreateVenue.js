import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import useCreateVenueStore from "../store/useCreateVenueStore";

const useCreateVenue = (apiUrl, apiKey) => {
  const { token } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { clearAll } = useCreateVenueStore();

  const createVenue = async (values) => {
    setIsLoading(true);
    setError(null);
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

      // Map location
      const locationsMap = {
        1: { city: "Corralejo", lat: 28.7296937, lng: -13.8671499 },
        2: { city: "Costa Calma", lat: 28.1585283, lng: -14.2294205 },
        3: { city: "Caleta de Fuste", lat: 28.500821, lng: -13.8628367 },
        4: { city: "Morro Jable", lat: 28.0511096, lng: -14.351552 },
        5: { city: "El Cotillo", lat: 28.6855572, lng: -14.0108625 },
      };

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

      // Build request body
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

      // API Call using fetch
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
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create venue");
      }

      setSuccess(true);
      clearAll();
    } catch (error) {
      setError(error.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return { createVenue, isLoading, error, success };
};

export default useCreateVenue;
