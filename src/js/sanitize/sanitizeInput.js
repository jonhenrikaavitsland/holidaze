/**
 * Sanitizes an input string to prevent potential cross-site scripting (XSS) attacks.
 *
 * This function performs the following sanitization steps:
 * 1. Converts the input to a string.
 * 2. Removes any <script> tags and their content.
 * 3. Removes any remaining HTML tags.
 * 4. Encodes special characters using a temporary DOM element to leverage the browser's built-in escaping.
 *
 * @param {any} input - The input value to sanitize.
 * @returns {string} The sanitized string, safe for insertion into HTML.
 *
 * @example
 * // Example usage:
 * const unsafeInput = '<script>alert("XSS")</script><p>Hello</p>';
 * const safeOutput = sanitizeInput(unsafeInput);
 * // safeOutput: "Hello"
 */
export default function sanitizeInput(input) {
  // Ensure the input is a string.
  let str = String(input);

  // Remove <script> tags and their content.
  str = str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");

  // Remove any remaining HTML tags.
  str = str.replace(/<\/?[^>]+(>|$)/g, "");

  // Encode special characters to prevent potential XSS.
  // Create a temporary DOM element to leverage the browser's built-in escaping.
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
