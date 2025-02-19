/* eslint-disable react/prop-types */

/**
 * Renders a navigation button link for switching views.
 *
 * This component displays a button inside a list item with customizable styling and text content.
 * When the button is clicked, it first triggers an optional `action` callback (if provided) and then calls the
 * `handleViewChange` callback with the specified `kind` to change the view. The button text appears bold when
 * the `status` prop is truthy.
 *
 * @component
 * @param {object} props - The component props.
 * @param {string} props.className - Additional CSS classes for styling the button.
 * @param {string} props.content - The text content displayed on the button.
 * @param {Function} props.handleViewChange - Callback function to change the view; receives the `kind` as an argument.
 * @param {string} props.kind - The identifier for the view to be changed to when the button is clicked.
 * @param {boolean} [props.status] - If true, applies an active styling (e.g., bold text) to indicate the current status.
 * @param {Function} [props.action] - Optional callback function to perform an additional action when the button is clicked.
 *
 * @example
 * // Example usage:
 * <LinkBtn
 *   className="bg-blue-500 hover:bg-blue-700"
 *   content="View Bookings"
 *   handleViewChange={(view) => console.log("Changing view to", view)}
 *   kind="booking"
 *   status={true}
 *   action={() => console.log("Additional action executed")}
 * />
 *
 * @returns {JSX.Element} The rendered navigation button link.
 */
export default function LinkBtn({
  className,
  content,
  handleViewChange,
  kind,
  status,
  action,
}) {
  return (
    <li>
      <button
        className={`font-serif text-xl-leading-none py-2.5 capitalize ${className} ${status && "font-bold"}`}
        onClick={() => {
          if (action) {
            action();
          }
          handleViewChange(`${kind}`);
        }}
      >
        {content}
      </button>
    </li>
  );
}
