import { Link } from "react-router-dom";
import useAuthStore from "../../js/store/useAuthStore";
import useUIStore from "../../js/store/useUIStore";

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
      <div className="border-t-2 border-natural-charcoal/20 w-dvw pt-5">
        <span>© Holidaze 2025</span>
      </div>
    </footer>
  );
}
