export default function sanitizeAndValidateUrl(urlString) {
  try {
    const url = new URL(urlString);
    // Only allow http and https protocols.
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      throw new Error("Invalid protocol");
    }
    // Return a normalized URL string
    return url.toString();
  } catch (error) {
    // Handle error: the URL is either malformed or uses a disallowed protocol
    throw new Error("Invalid URL provided", error);
  }
}
