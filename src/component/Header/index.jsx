/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { useState } from "react";
import Logo from "../Logo";
import Button from "../Button";

export default function Header({ isOpen, toggleMenu }) {
  return (
    <header className="bg-light-gray">
      <div
        className={
          isOpen
            ? "flex flex-col justify-center p-5 bg-light-gray lg:flex-row lg:justify-start lg:p-10 relative z-50"
            : "flex flex-col justify-center p-5 bg-light-gray lg:flex-row lg:justify-start lg:p-10 relative lg:container lg:mx-auto"
        }
      >
        <Logo />
        <HamburgerIcon toggleMenu={toggleMenu} />
        <Navbar isOpen={isOpen} toggleMenu={toggleMenu} />
      </div>
    </header>
  );
}

function Navbar({ isOpen, toggleMenu }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isManager, setIsManager] = useState(false);

  console.log(setIsLoggedIn, setIsManager);

  return (
    <nav
      className={
        isOpen
          ? `visible fixed w-full top-0 left-0 pt-5 pb-10 bg-light-gray rounded-b-xl`
          : "collapse lg:visible lg:flex lg:items-center lg:w-full lg:justify-end"
      }
    >
      <div className="lg:collapse">
        <Logo />
      </div>
      <CloseIcon toggleMenu={toggleMenu} isOpen={isOpen} />
      <ul
        className={
          isOpen
            ? "visible flex flex-col items-center gap-8 pb-7.5 mt-10"
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
      {isLoggedIn ? (
        <div
          className={
            isOpen
              ? "visible flex justify-center pt-5 border-t-2 border-natural-charcoal/20"
              : "collapse"
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

function HamburgerIcon({ toggleMenu }) {
  return (
    <div className="absolute visible p-3.5 top-0 right-0 lg:collapse">
      <button
        className="p-1.5 hover:bg-deep-blue/20 rounded-xl"
        onClick={() => toggleMenu()}
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
            ? "font-bold rounded-xl bg-golden-yellow py-2.5 px-5 shadow-md shadow-natural-charcoal/30 font-serif hover:bg-golden-yellow/75"
            : "font-normal py-2.5 px-5 rounded-xl font-serif hover:bg-golden-yellow/20"
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
    <div
      className={isOpen ? "absolute p-2.5 visible top-0 right-0" : " collapse"}
    >
      <button
        className="p-2.5 hover:bg-custom-coral/20 rounded-xl"
        onClick={() => toggleMenu()}
      >
        <img src="/xmark-solid.svg" alt="close menu" className="w-6.5 h-6.5" />
      </button>
    </div>
  );
}
