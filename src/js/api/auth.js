export async function login(email, password) {
  try {
    const response = await fetch("https://v2.api.noroff.dev/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": "15bd7de6-1a86-45ac-9f64-46d861d8837a",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Login Failed");
    }

    const data = await response.json();
    const { name, mail, avatar, accessToken } = data.data;
    return { name, mail, avatar, token: accessToken };
  } catch (error) {
    console.error(error);
  }
}
