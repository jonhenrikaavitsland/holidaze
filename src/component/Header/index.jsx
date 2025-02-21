/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { useState } from "react";
import Logo from "../Logo";
import Button from "../Button";
import useUIStore from "../../js/store/useUIStore";
import useAuthStore from "../../js/store/useAuthStore";

/**
 * Renders the Header component that includes the logo, hamburger icon, and navigation bar.
 *
 * This component manages a throttling state to prevent rapid menu toggling. It composes the following elements:
 * - A Logo component displayed prominently.
 * - A HamburgerIcon component for toggling the mobile menu.
 * - A Navbar component that provides responsive navigation links.
 *
 * The `isThrottled` state ensures that the menu toggle cannot be triggered more than once every 500 milliseconds.
 *
 * @component
 * @example
 * // Example usage:
 * <Header />
 *
 * @returns {JSX.Element} The rendered Header component.
 */
export default function Header() {
  const [isThrottled, setIsThrottled] = useState(false);

  function handleClick() {
    if (isThrottled) return;

    setIsThrottled(true);

    setTimeout(() => {
      setIsThrottled(false);
    }, 500);
  }

  return (
    <header className="bg-light-gray">
      <div className="flex flex-col justify-center p-5 bg-light-gray lg:flex-row lg:justify-start lg:p-10 lg:container lg:mx-auto h-min">
        <Logo className={"text-deep-blue"} />
        <HamburgerIcon isThrottled={isThrottled} handleClick={handleClick} />
        <Navbar isThrottled={isThrottled} handleClick={handleClick} />
      </div>
    </header>
  );
}

/**
 * Renders a responsive navigation bar with conditional menu items based on the user's authentication status and UI state.
 *
 * The Navbar component displays different navigation links and buttons depending on whether the user is logged in, is a venue manager,
 * and whether the mobile menu is open. It utilizes several helper components (Logo, CloseIcon, LinkBtn, and Button) to render its elements.
 * - When the menu is open (on small screens), it shows a full-screen overlay with navigation links.
 * - For authenticated users, it displays an "Account" link and a "Logout" button.
 * - For non-authenticated users, it shows a "Log In" button that opens the login modal.
 * - For venue managers, it displays a "Venue HUB" link; otherwise, it shows a "List Your Venue" link.
 *
 * @component
 * @param {object} props - The component props.
 * @param {boolean} props.isThrottled - Disables menu actions if true to prevent rapid, repeated clicks.
 * @param {Function} props.handleClick - Callback function executed to toggle or handle menu-related click events.
 *
 * @example
 * // Example usage:
 * <Navbar isThrottled={false} handleClick={() => console.log('Menu toggled')} />
 *
 * @returns {JSX.Element} The rendered navigation bar component.
 */
function Navbar({ isThrottled, handleClick }) {
  const { isMenuOpen, openStateWithOverlay, checkAndCloseAll } = useUIStore();
  const { isLoggedIn, isVenueManager } = useAuthStore();

  return (
    <nav
      className={
        isMenuOpen
          ? `visible absolute z-50 w-full top-0 left-0 pt-5 pb-10 bg-light-gray shadow-md shadow-natural-charcoal/40`
          : "collapse lg:visible lg:flex lg:items-center lg:w-full lg:justify-end h-0"
      }
    >
      <div className="lg:collapse">
        <Logo className={"text-deep-blue"} />
      </div>
      <CloseIcon isThrottled={isThrottled} handleClick={handleClick} />
      <ul
        className={
          isMenuOpen
            ? "flex flex-col items-center gap-8 pb-7.5 mt-10"
            : "collapse lg:visible flex flex-col lg:items-center lg:flex-row lg:gap-10"
        }
      >
        <LinkBtn to="/" text="Home" />
        {isLoggedIn ? (
          <LinkBtn to="/account" text="Account" />
        ) : (
          <li className="py-2.5">
            <button
              className="py-2.5 px-5 rounded-xl leading-none font-serif hover:bg-golden-yellow/20 w-44 lg:w-auto"
              type="button"
              onClick={() => {
                if (isMenuOpen) {
                  checkAndCloseAll();
                  openStateWithOverlay("isLoginModalOpen");
                } else {
                  openStateWithOverlay("isLoginModalOpen");
                }
              }}
            >
              Log In
            </button>
          </li>
        )}
        <LinkBtn
          to={isVenueManager ? "/venue-hub/" : "/list-your-venue/"}
          text={isVenueManager ? "Venue HUB" : "List Your Venue"}
        />
        {isLoggedIn ? (
          <li
            className={
              isMenuOpen
                ? "visible flex justify-center pt-5 border-t-2 border-natural-charcoal/20 w-dvw"
                : "collapse lg:visible"
            }
          >
            <Button content="Logout" color="custom-coral" action={true} />
          </li>
        ) : (
          ""
        )}
      </ul>
    </nav>
  );
}

/**
 * Renders a hamburger icon button that opens the navigation menu overlay.
 *
 * When clicked, the button triggers the provided `handleClick` callback and opens the menu by calling
 * `openStateWithOverlay` from the UI store. The button is disabled if `isThrottled` is true to prevent rapid clicks.
 * It is styled to be visible on small screens and hidden on larger screens.
 *
 * @component
 * @param {object} props - The component props.
 * @param {boolean} props.isThrottled - If true, disables the button to throttle click events.
 * @param {Function} props.handleClick - Callback function to execute on button click.
 *
 * @example
 * // Example usage:
 * <HamburgerIcon isThrottled={false} handleClick={() => console.log('Menu opened')} />
 *
 * @returns {JSX.Element} The rendered hamburger icon button component.
 */
function HamburgerIcon({ isThrottled, handleClick }) {
  const { openStateWithOverlay } = useUIStore();

  return (
    <div className="absolute visible p-3.5 top-0 right-0 lg:collapse">
      <button
        className="p-1.5 hover:bg-deep-blue/20 rounded-xl"
        onClick={() => {
          handleClick();
          openStateWithOverlay("isMenuOpen");
        }}
        disabled={isThrottled}
        type="button"
      >
        <img src="/bars-solid.svg" alt="menu" className="w-7.5 h-6.5" />
      </button>
    </div>
  );
}

/**
 * Renders a navigation button as a list item that uses React Router's NavLink for client-side routing.
 *
 * When clicked, the button triggers a function to close any open UI elements via `checkAndCloseAll` from the UI store.
 * The NavLink applies different styles based on whether it is active or not.
 *
 * @component
 * @param {object} props - The component props.
 * @param {string} props.to - The target route path for navigation.
 * @param {React.ReactNode|string} props.text - The display text for the navigation button.
 *
 * @example
 * // Example usage:
 * <LinkBtn to="/dashboard" text="Dashboard" />
 *
 * @returns {JSX.Element} The rendered navigation button within a list item.
 */
function LinkBtn(props) {
  const { checkAndCloseAll } = useUIStore();

  const handleClick = () => {
    checkAndCloseAll();
  };

  return (
    <li className="py-2.5">
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "font-bold rounded-xl bg-golden-yellow py-2.5 px-5 shadow-md shadow-natural-charcoal/40 font-serif hover:bg-golden-yellow/75 w-44 lg:whitespace-nowrap lg:w-auto inline-block text-center leading-none"
            : "font-normal py-2.5 px-5 rounded-xl font-serif hover:bg-golden-yellow/20 w-44 lg:whitespace-nowrap lg:w-auto inline-block text-center leading-none"
        }
        to={props.to}
        onClick={handleClick}
      >
        {props.text}
      </NavLink>
    </li>
  );
}

/**
 * Renders a close icon button that conditionally appears based on the menu's open state.
 *
 * The component retrieves the current menu state from the UI store and, when the menu is open,
 * displays a button with a close icon. Clicking the button triggers the provided `handleClick` callback
 * and a global close action via the `closeAll` function. The button is disabled if the `isThrottled` flag is true.
 *
 * @component
 * @param {object} props - The component props.
 * @param {boolean} props.isThrottled - Disables the button if true to prevent rapid, repeated clicks.
 * @param {Function} props.handleClick - Callback function executed when the close button is clicked.
 * @example
 * // Example usage:
 * <CloseIcon isThrottled={false} handleClick={() => console.log('Close clicked')} />
 *
 * @returns {JSX.Element} The rendered CloseIcon component.
 */
function CloseIcon({ isThrottled, handleClick }) {
  const { isMenuOpen, closeAll } = useUIStore();
  return (
    <div
      className={
        isMenuOpen ? "absolute p-2.5 visible top-0 right-0" : " collapse"
      }
    >
      <button
        className="p-2.5 hover:bg-custom-coral/20 rounded-xl cursor-pointer"
        onClick={() => {
          handleClick();
          closeAll();
        }}
        type="button"
        disabled={isThrottled}
      >
        <img src="/xmark-solid.svg" alt="close menu" className="w-6.5 h-6.5" />
      </button>
    </div>
  );
}
