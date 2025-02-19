import { useNavigate } from "react-router-dom";
import useAuthStore from "../../js/store/useAuthStore";
import useUIStore from "../../js/store/useUIStore";

/* eslint-disable react/prop-types */

/**
 * Renders a customizable button component that conditionally performs user logout and navigation actions.
 *
 * The component uses the `color` prop to determine its styling. When the `action` prop is truthy,
 * clicking the button triggers a logout via `useAuthStore`, navigates the user to the home page using `useNavigate`,
 * and executes UI cleanup through `useUIStore`'s `checkAndCloseAll` function.
 *
 * @component
 * @param {object} props - The component props.
 * @param {string} [props.color] - Optional color identifier; when set to "custom-coral", applies specific styling.
 * @param {boolean} [props.action] - If true, clicking the button performs a logout and navigation action.
 * @param {React.ReactNode|string} props.content - The content displayed within the button.
 * @example
 * // Example usage:
 * <Button color="custom-coral" action={true} content="Logout" />
 *
 * @returns {JSX.Element} The rendered button component.
 */
export default function Button(props) {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const { checkAndCloseAll } = useUIStore();

  function handleColor() {
    if (props.color === "custom-coral") {
      return "bg-custom-coral hover:bg-custom-coral/80 w-44 lg:w-auto text-center";
    }
    return "bg-deep-blue hover:bg-deep-blue/80";
  }

  return (
    <div>
      <button
        className={`rounded-xl leading-none text-white font-serif font-bold py-3.75 px-7.5 shadow-md shadow-natural-charcoal/40 ${props.action ? "lg:py-2.5 lg:px-5" : ""} ${handleColor()}`}
        type="button"
        onClick={() => {
          if (props.action) {
            logout();
            navigate("/");
            checkAndCloseAll();
          }
        }}
      >
        {props.content}
      </button>
    </div>
  );
}
