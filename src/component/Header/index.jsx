/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { useState } from "react";
import Logo from "../Logo";

export default function Header({ isOpen, toggleMenu }) {
  return (
    <header
      className={
        isOpen
          ? "flex flex-col justify-center p-5 bg-light-gray lg:flex-row lg:justify-start lg:p-10 relative z-50"
          : "flex flex-col justify-center p-5 bg-light-gray lg:flex-row lg:justify-start lg:p-10 relative"
      }
    >
      <Logo />
      <Navbar isOpen={isOpen} toggleMenu={toggleMenu} />
    </header>
  );
}

function Navbar({ isOpen, toggleMenu }) {
  const [isThrottled, setIsThrottled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isManager, setIsManager] = useState(false);

  console.log(setIsLoggedIn, setIsManager);

  function handleClick() {
    if (isThrottled) return;

    setIsThrottled(true);

    setTimeout(() => {
      setIsThrottled(false);
    }, 500);
  }

  return (
    <nav
      className={
        isOpen
          ? `visible pt-10 pb-10 md:pt-20`
          : "collapse lg:visible lg:flex lg:items-center lg:w-full lg:justify-end"
      }
    >
      {isOpen ? (
        <CloseIcon
          toggleMenu={toggleMenu}
          isOpen={isOpen}
          handleClick={handleClick}
          isThrottled={isThrottled}
        />
      ) : (
        <HamburgerIcon
          toggleMenu={toggleMenu}
          handleClick={handleClick}
          isThrottled={isThrottled}
        />
      )}
      <ul
        className={
          isOpen
            ? "visible flex flex-col items-center gap-8"
            : "collapse lg:visible flex flex-col lg:flex-row lg:gap-10"
        }
      >
        <LinkBtn to="/" text="Home" />
        <LinkBtn
          to={isLoggedIn ? "/account/" : /* triggers login-modal */ "/login/"}
          text={isLoggedIn ? "Account" : "Log in"}
        />
        <LinkBtn
          to={isManager ? "/venue-hub/" : "/list-your-venue/"}
          text={isManager ? "Venue HUB" : "List Your Venue"}
        />
      </ul>
    </nav>
  );
}

function HamburgerIcon({ toggleMenu, handleClick, isThrottled }) {
  return (
    <div className="absolute z-10 visible p-3.5 top-0 right-0 lg:collapse">
      <button
        className="p-1.5 hover:bg-deep-blue/20 rounded-xl"
        onClick={() => {
          toggleMenu();
          handleClick();
        }}
        disabled={isThrottled}
      >
        <img src="/bars-solid.svg" alt="menu" className="w-7.5 h-6.5" />
      </button>
    </div>
  );
}

function LinkBtn(props) {
  return (
    <li>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "font-bold rounded-xl bg-golden-yellow py-2.5 px-5 shadow-md shadow-natural-charcoal/25 font-serif hover:bg-golden-yellow/75"
            : "font-normal py-2.5 px-5 rounded-xl font-serif hover:bg-golden-yellow/20"
        }
        to={props.to}
      >
        {props.text}
      </NavLink>
    </li>
  );
}

function CloseIcon({ toggleMenu, isOpen, handleClick, isThrottled }) {
  return (
    <div
      className={
        isOpen ? "absolute z-10 p-2.5 visible top-0 right-0" : " collapse"
      }
    >
      <button
        className="p-2.5 hover:bg-custom-coral/20 rounded-xl"
        onClick={() => {
          toggleMenu();
          handleClick();
        }}
        disabled={isThrottled}
      >
        <img src="/xmark-solid.svg" alt="close menu" className="w-6.5 h-6.5" />
      </button>
    </div>
  );
}
