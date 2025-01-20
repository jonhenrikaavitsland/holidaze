import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { useLocation } from "react-router-dom";

const useUpdateProfile = () => {
  const { user, token } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  const updateProfile = async (formData = null) => {
    const url = location.pathname;
    const isVenueManager = url.includes("list-your-venue");
    const apiUrl = `https://v2.api.noroff.dev/holidaze/profiles/${user.name}`;
    const headers = {
      "Content-Type": "application/json",
      "X-Noroff-API-Key": "15bd7de6-1a86-45ac-9f64-46d861d8837a",
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
      const response = await fetch(apiUrl, {
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
