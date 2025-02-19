/**
 * Sanitizes an email address by trimming whitespace and removing any disallowed characters.
 *
 * This function trims the input email string and then removes any characters that are not:
 * - Alphanumeric characters (a-z, A-Z, 0-9)
 * - Common email symbols: @, ., !, #, $, %, &, ', *, +, /, =, ?, ^, _, `, {, |, }, ~, and -
 *
 * @param {string} email - The email address to sanitize.
 * @returns {string} The sanitized email address.
 *
 * @example
 * // Example usage:
 * const email = "  user!@example.com  ";
 * const sanitizedEmail = sanitizeEmail(email);
 * // sanitizedEmail: "user!@example.com"
 */
export default function sanitizeEmail(email) {
  let sanitized = email.trim();

  // Allowed characters include:
  // - Alphanumeric characters (a-z, A-Z, 0-9)
  // - Common email symbols: @, ., !, #, $, %, &, ', *, +, /, =, ?, ^, _, `, {, |, }, ~, and -
  sanitized = sanitized.replace(/[^a-zA-Z0-9@.!#$%&'*+/=?^_`{|}~-]/g, "");

  return sanitized;
}
