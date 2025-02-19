import { Link } from "react-router-dom";
import useAuthStore from "../../js/store/useAuthStore";
import useUIStore from "../../js/store/useUIStore";

/**
 * Renders the footer navigation component with conditional links based on the user's authentication and venue manager status.
 *
 * The component displays:
 * - A "home" link.
 * - An "Account" link if the user is logged in, or a "log in" button that opens the login modal if not.
 * - A link to either the "Venue HUB" (for venue managers) or "list your venue" (for regular users).
 * - A copyright notice at the bottom.
 *
 * @component
 * @example
 * // Example usage:
 * <Footer />
 *
 * @returns {JSX.Element} The rendered Footer component.
 */
export default function Footer() {
  const { isLoggedIn, isVenueManager } = useAuthStore();
  const { openStateWithOverlay } = useUIStore();

  const handleClick = () => {
    openStateWithOverlay("isLoginModalOpen");
  };

  return (
    <footer className="flex flex-col items-center text-center  bg-light-gray pt-7.5 pb-5">
      <ul className="flex flex-col gap-5 pb-5 capitalize font-serif">
        <li>
          <Link className="p-2.5 hover:bg-golden-yellow/20 rounded-xl" to="/">
            home
          </Link>
        </li>
        <li>
          {isLoggedIn ? (
            <Link
              className="p-2.5 hover:bg-golden-yellow/20 rounded-xl"
              to="/account/"
            >
              Account
            </Link>
          ) : (
            <button
              className="p-2.5 capitalize hover:bg-golden-yellow/20 rounded-xl"
              onClick={handleClick}
            >
              log in
            </button>
          )}
        </li>
        <li>
          <Link
            className="p-2.5 hover:bg-golden-yellow/20 rounded-xl"
            to={isVenueManager ? "/venue-hub/" : "/list-your-venue/"}
          >
            {isVenueManager ? "Venue HUB" : "list your venue"}
          </Link>
        </li>
      </ul>
      <div className="border-t-2 border-natural-charcoal/20 w-full pt-5">
        <span>© Holidaze 2025</span>
      </div>
    </footer>
  );
}
