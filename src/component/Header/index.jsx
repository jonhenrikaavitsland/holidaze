/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { useState } from "react";
import Logo from "../Logo";
import Button from "../Button";
import useUIStore from "../../js/store/useUIStore";

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
      <div className="flex flex-col justify-center p-5 bg-light-gray lg:flex-row lg:justify-start lg:p-10 lg:container lg:mx-auto">
        <Logo color={"deep-blue"} />
        <HamburgerIcon isThrottled={isThrottled} handleClick={handleClick} />
        <Navbar isThrottled={isThrottled} handleClick={handleClick} />
      </div>
    </header>
  );
}

function Navbar({ isThrottled, handleClick }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isManager, setIsManager] = useState(false);

  const { isMenuOpen, openStateWithOverlay, checkAndCloseAll } = useUIStore();

  console.log(setIsLoggedIn, setIsManager);

  return (
    <nav
      className={
        isMenuOpen
          ? `visible absolute z-50 w-full top-0 left-0 pt-5 pb-10 bg-light-gray shadow-md shadow-natural-charcoal/40`
          : "collapse lg:visible lg:flex lg:items-center lg:w-full lg:justify-end"
      }
    >
      <div className="lg:collapse">
        <Logo color={"deep-blue"} />
      </div>
      <CloseIcon isThrottled={isThrottled} handleClick={handleClick} />
      <ul
        className={
          isMenuOpen
            ? "visible flex flex-col items-center gap-8 pb-7.5 mt-10"
            : "collapse lg:visible flex flex-col lg:flex-row lg:gap-10"
        }
      >
        <LinkBtn to="/" text="Home" />
        {isLoggedIn ? (
          <LinkBtn to="/account" text="Account" />
        ) : (
          <button
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
        )}
        <LinkBtn
          to={isManager ? "/venue-hub/" : "/list-your-venue/"}
          text={isManager ? "Venue HUB" : "List Your Venue"}
        />
      </ul>
      {isLoggedIn ? (
        <div
          className={
            isMenuOpen
              ? "visible flex justify-center pt-5 border-t-2 border-natural-charcoal/20"
              : "collapse lg:visible lg:ms-10"
          }
        >
          <Button content="Logout" color="custom-coral" />
        </div>
      ) : (
        ""
      )}
    </nav>
  );
}

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

function LinkBtn(props) {
  return (
    <li className="py-2.5">
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "font-bold rounded-xl bg-golden-yellow py-2.5 px-5 shadow-md shadow-natural-charcoal/40 font-serif hover:bg-golden-yellow/75"
            : "font-normal py-2.5 px-5 rounded-xl font-serif hover:bg-golden-yellow/20"
        }
        to={props.to}
      >
        {props.text}
      </NavLink>
    </li>
  );
}

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
