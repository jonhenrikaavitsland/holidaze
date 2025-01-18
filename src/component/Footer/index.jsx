import { Link } from "react-router-dom";
import useAuthStore from "../../js/store/useAuthStore";

export default function Footer() {
  const { isLoggedIn } = useAuthStore();

  return (
    <footer className="flex flex-col items-center text-center  bg-light-gray pt-7.5 pb-5">
      <ul className="flex flex-col gap-5 pb-5 capitalize font-serif">
        <li>
          <Link className="p-2.5" to="/">
            home
          </Link>
        </li>
        <li>
          {isLoggedIn ? (
            <Link className="p-2.5" to="/account/">
              Account
            </Link>
          ) : (
            <button className="p-2.5 capitalize">log in</button>
          )}
        </li>
        <li>
          <Link className="p-2.5" to="/list-your-venue/">
            list your venue
          </Link>
        </li>
      </ul>
      <div className="border-t-2 border-natural-charcoal/20 w-dvw pt-5">
        <span>© Holidaze 2025</span>
      </div>
    </footer>
  );
}
