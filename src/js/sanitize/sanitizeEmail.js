export default function sanitizeEmail(email) {
  let sanitized = email.trim();

  // Allowed characters include:
  // - Alphanumeric characters (a-z, A-Z, 0-9)
  // - Common email symbols: @, ., !, #, $, %, &, ', *, +, /, =, ?, ^, _, `, {, |, }, ~, and -
  sanitized = sanitized.replace(/[^a-zA-Z0-9@.!#$%&'*+/=?^_`{|}~-]/g, "");

  return sanitized;
}
