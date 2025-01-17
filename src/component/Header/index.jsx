/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { useState } from "react";
import Logo from "../Logo";
import Button from "../Button";
import LoginModal from "../LoginModal";

export default function Header({ isOpen, toggleMenu }) {
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
      <div
        className={
          isOpen
            ? "flex flex-col justify-center p-5 bg-light-gray lg:flex-row lg:justify-start lg:p-10 relative z-40"
            : "flex flex-col justify-center p-5 bg-light-gray lg:flex-row lg:justify-start lg:p-10 relative lg:container lg:mx-auto"
        }
      >
        <Logo />
        <HamburgerIcon
          toggleMenu={toggleMenu}
          handleClick={handleClick}
          isThrottled={isThrottled}
        />
        <Navbar
          isOpen={isOpen}
          toggleMenu={toggleMenu}
          handleClick={handleClick}
          isThrottled={isThrottled}
        />
      </div>
    </header>
  );
}

function Navbar({ isOpen, toggleMenu, handleClick, isThrottled }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [showModal, setShowModal] = useState(false);

  console.log(setIsLoggedIn, setIsManager);
  console.log("Show login modal", showModal);

  return (
    <nav
      className={
        isOpen
          ? `visible fixed w-full top-0 left-0 pt-5 pb-10 bg-light-gray shadow-md shadow-natural-charcoal/40`
          : "collapse lg:visible lg:flex lg:items-center lg:w-full lg:justify-end"
      }
    >
      <div className="lg:collapse">
        <Logo />
      </div>
      <CloseIcon
        toggleMenu={toggleMenu}
        isOpen={isOpen}
        handleClick={handleClick}
        isThrottled={isThrottled}
      />
      <ul
        className={
          isOpen
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
              setShowModal(true);
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
            isOpen
              ? "visible flex justify-center pt-5 border-t-2 border-natural-charcoal/20"
              : "collapse lg:visible lg:ms-10"
          }
        >
          <Button content="Logout" color="custom-coral" />
        </div>
      ) : (
        ""
      )}
      {showModal ? <LoginModal setModal={setShowModal} /> : ""}
    </nav>
  );
}

function HamburgerIcon({ toggleMenu, handleClick, isThrottled }) {
  return (
    <div className="absolute visible p-3.5 top-0 right-0 lg:collapse">
      <button
        className="p-1.5 hover:bg-deep-blue/20 rounded-xl"
        onClick={() => {
          handleClick();
          toggleMenu();
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

function CloseIcon({ toggleMenu, isOpen, handleClick, isThrottled }) {
  return (
    <div
      className={isOpen ? "absolute p-2.5 visible top-0 right-0" : " collapse"}
    >
      <button
        className="p-2.5 hover:bg-custom-coral/20 rounded-xl"
        onClick={() => {
          handleClick();
          toggleMenu();
        }}
        disabled={isThrottled}
        type="button"
      >
        <img src="/xmark-solid.svg" alt="close menu" className="w-6.5 h-6.5" />
      </button>
    </div>
  );
}
