import { apiKey, apiUrl, loginPath } from "../data/constants";

export async function login(emailAddress, password) {
  try {
    const response = await fetch(`${apiUrl}${loginPath}?_holidaze=true`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": apiKey,
      },
      body: JSON.stringify({ email: emailAddress, password }),
    });

    if (!response.ok) {
      throw new Error("Login Failed");
    }

    const data = await response.json();
    const { name, email, avatar, accessToken, venueManager } = data.data;
    return { name, email, avatar, token: accessToken, venueManager };
  } catch (error) {
    console.error(error);
  }
}
