/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { useState } from "react";
import Logo from "../Logo";

export default function Header() {
  return (
    <header className="flex flex-col justify-center p-5 bg-light-gray lg:flex-row lg:justify-start lg:p-10 relative">
      <Logo />
      <Navbar />
    </header>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isManager, setIsManager] = useState(false);

  console.log(setIsLoggedIn, setIsManager);

  function toggleMenu() {
    setIsOpen(!isOpen);
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
        <CloseIcon toggleMenu={toggleMenu} isOpen={isOpen} />
      ) : (
        <HamburgerIcon toggleMenu={toggleMenu} />
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

function HamburgerIcon({ toggleMenu }) {
  return (
    <div className="fixed visible p-3.5 top-0 right-0 lg:collapse">
      <button className="p-1.5" onClick={() => toggleMenu()}>
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
            : "font-normal py-2.5 px-5 rounded-xl font-serif hover:bg-golden-yellow/25"
        }
        to={props.to}
      >
        {props.text}
      </NavLink>
    </li>
  );
}

function CloseIcon({ toggleMenu, isOpen }) {
  return (
    <div className={isOpen ? "fixed p-2.5 visible top-0 right-0" : " collapse"}>
      <button className="p-2.5" onClick={() => toggleMenu()}>
        <img src="/xmark-solid.svg" alt="close menu" className="w-6.5 h-6.5" />
      </button>
    </div>
  );
}
