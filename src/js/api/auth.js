export async function login(emailAddress, password, isManager) {
  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/auth/login?_holidaze=${isManager}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Noroff-API-Key": "15bd7de6-1a86-45ac-9f64-46d861d8837a",
        },
        body: JSON.stringify({ email: emailAddress, password }),
      },
    );

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
