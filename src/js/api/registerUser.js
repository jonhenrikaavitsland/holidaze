import { apiKey, apiUrl, registerPath } from "../data/constants";

export default async function registerUser(name, email, password, manager) {
  const url = apiUrl + registerPath;

  const requestBody = {
    name,
    email,
    password,
    avatar: {
      url: "https://unsplash.com/photos/palm-tree--wapbtQueAE",
      alt: "me as a palm",
    },
    venueManager: manager,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": apiKey,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Registration failed:", error);
      throw new Error(
        `Error ${response.status}: ${error.message || "Unknown error"}`,
      );
    }
  } catch (error) {
    console.error("An error occurred:", error.message);
    throw error;
  }
}
