/**
 * Sanitizes and validates a URL string.
 *
 * This function checks if the provided URL string is valid and uses either the "http:" or "https:" protocol.
 * If the URL is valid, it returns a normalized URL string. If the URL is invalid or uses an unsupported protocol,
 * an error is thrown.
 *
 * @param {string} urlString - The URL string to sanitize and validate.
 * @returns {string|undefined} The normalized URL string if valid; otherwise, undefined if no input is provided.
 * @throws {Error} Throws an error if the URL is invalid or uses a protocol other than http or https.
 *
 * @example
 * // Valid URL:
 * const validUrl = sanitizeAndValidateUrl("https://example.com");
 * // Returns: "https://example.com/"
 *
 * @example
 * // Invalid URL (unsupported protocol):
 * sanitizeAndValidateUrl("ftp://example.com"); // Throws Error: "Invalid URL provided: Invalid protocol"
 */
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
