import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { useLocation } from "react-router-dom";
import { apiKey, apiUrl, profilesPath } from "../data/constants";

/**
 * Custom hook for updating the user's profile via an API call.
 *
 * This hook provides an `updateProfile` function that sends a PUT request to the user's profile endpoint.
 * Depending on the current URL, it either updates the venue manager status or the user's avatar.
 * For venue managers (when the URL includes "list-your-venue"), it sets `venueManager` to true.
 * Otherwise, it updates the user's avatar using the provided form data (which includes the image URL and alt text).
 *
 * The hook manages loading and error states during the API request and returns the updated profile data
 * (specifically, the avatar and venue manager status) on a successful update.
 *
 * @component
 * @example
 * // Example usage:
 * const { updateProfile, loading, error } = useUpdateProfile();
 *
 * // To update the avatar:
 * const formData = { url: "https://example.com/new-avatar.jpg", alt: "New Avatar" };
 * const updatedData = await updateProfile(formData);
 *
 * // To update venue manager status:
 * // If the current URL includes "list-your-venue", no formData is needed:
 * const updatedData = await updateProfile();
 *
 * @returns {object} An object containing:
 *   - {Function} updateProfile - Async function that updates the user's profile.
 *   - {boolean} loading - Indicates whether the profile update request is in progress.
 *   - {string|null} error - Contains an error message if the update fails, otherwise null.
 */
const useUpdateProfile = () => {
  const { user, token } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  const updateProfile = async (formData = null) => {
    const url = location.pathname;
    const isVenueManager = url.includes("list-your-venue");
    const apiAddress = `${apiUrl}${profilesPath}/${user.name}`;
    const headers = {
      "Content-Type": "application/json",
      "X-Noroff-API-Key": apiKey,
      Authorization: `Bearer ${token}`,
    };

    const body = isVenueManager
      ? JSON.stringify({ venueManager: true })
      : JSON.stringify({
          avatar: {
            url: formData.url,
            alt: formData.alt,
          },
        });

    try {
      setLoading(true);
      const response = await fetch(apiAddress, {
        method: "PUT",
        headers,
        body,
      });

      if (!response.ok) {
        throw new Error(`Failed to update profile: ${response.statusText}`);
      }

      const result = await response.json();

      const { avatar, venueManager } = result.data;
      return { avatar, venueManager };
    } catch (err) {
      setError(err.message);
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { updateProfile, loading, error };
};

export default useUpdateProfile;
