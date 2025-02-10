export default function sanitizeAndValidateUrl(urlString) {
  if (!urlString) {
    return;
  }

  try {
    const url = new URL(urlString);
    // Only allow http and https protocols.
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      throw new Error("Invalid protocol");
    }
    // Return a normalized URL string
    return url.toString();
  } catch (error) {
    throw new Error(`Invalid URL provided: ${error.message}`);
  }
}
