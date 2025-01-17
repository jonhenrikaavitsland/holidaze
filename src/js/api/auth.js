export async function login(emailAddress, password) {
  try {
    const response = await fetch("https://v2.api.noroff.dev/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ emailAddress, password }),
    });

    if (!response.ok) {
      throw new Error("Login Failed");
    }

    const data = await response.json();
    const { name, email, avatar, accessToken } = data.data;
    return { name, email, avatar, token: accessToken };
  } catch (error) {
    console.error(error);
  }
}
