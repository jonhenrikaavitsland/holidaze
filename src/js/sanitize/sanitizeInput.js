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
