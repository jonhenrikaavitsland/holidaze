import useAlertStore from "../../js/store/useAlertStore";
import Heading from "../Heading";

/**
 * Renders an Alert Modal component that displays a title, message, and action buttons based on the current alert state.
 *
 * The component retrieves its state from `useAlertStore`, which provides the following properties:
 * - `title` (string): The heading of the alert modal.
 * - `message` (string): The detailed message of the alert.
 * - `type` (string): The type of alert, determining which buttons are displayed.
 * - `onOk` (function): Callback function executed when the "Ok" button is clicked.
 * - `onCancel` (function): Callback function executed when the "Cancel" button is clicked.
 * - `className` (string): Additional CSS classes applied to the "Ok" button.
 * - `success` (boolean): Indicates if the alert represents a success state, affecting the modal's styling.
 *
 * @component
 * @example
 * // Example usage:
 * import AlertModal from './AlertModal';
 *
 * function App() {
 *   return (
 *     <div>
 *       <AlertModal />
 *     </div>
 *   );
 * }
 *
 * @returns {JSX.Element} The rendered Alert Modal component.
 */
export default function AlertModal() {
  const { title, message, type, onOk, onCancel, className, success } =
    useAlertStore();

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${success ? "border-8 border-accent-teal" : ""}`}
    >
      <section
        className={`flex flex-col gap-5 bg-white mx-5 p-5 w-3/4 max-w-96 rounded-xl shadow-md shadow-natural-charcoal/40 ${success ? "border-4 border-accent-teal" : ""} `}
      >
        {title && (
          <Heading level="2" className="text-center">
            {title}
          </Heading>
        )}
        {message && <p>{message}</p>}
        <div className="flex justify-between sm:flex-col gap-5 mt-5">
          {type && (
            <button
              className={`${className} py-2 w-1/2 rounded-xl font-serif uppercase font-medium shadow-md shadow-natural-charcoal/40`}
              onClick={onOk}
            >
              Ok
            </button>
          )}
          {type === "ok-cancel" && (
            <button
              className="bg-deep-blue/20 py-2 w-full rounded-xl font-serif uppercase font-medium shadow-md shadow-natural-charcoal/40 hover:bg-deep-blue/30"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
