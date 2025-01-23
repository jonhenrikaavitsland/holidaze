export const apiKey = import.meta.env.VITE_API_KEY;
export const apiUrl = import.meta.env.VITE_API_URL;

export const loginPath = "/auth/login";
export const registerPath = "/auth/register";
export const profilesPath = "/holidaze/profiles";
export const venuesPath = "/holidaze/venues";

export const locationsMap = {
  1: { city: "Corralejo", lat: 28.7296937, lng: -13.8671499 },
  2: { city: "Costa Calma", lat: 28.1585283, lng: -14.2294205 },
  3: { city: "Caleta de Fuste", lat: 28.500821, lng: -13.8628367 },
  4: { city: "Morro Jable", lat: 28.0511096, lng: -14.351552 },
  5: { city: "El Cotillo", lat: 28.6855572, lng: -14.0108625 },
};
