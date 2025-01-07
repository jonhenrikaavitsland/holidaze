/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isManager, setIsManager] = useState(false);

  console.log(setIsLoggedIn, setIsManager);

  return (
    <nav className="collapse lg:visible lg:flex lg:items-center lg:w-full lg:justify-end">
      <ul className="invisible lg:visible flex flex-col lg:flex-row lg:gap-10">
        <LinkBtn to="/" text="Home" />
        <LinkBtn
          to={isLoggedIn ? "/account/" : /* triggers login modal */ "/login/"}
          text={isLoggedIn ? "Account" : "Log in"}
        />
        <LinkBtn
          to={isManager ? "/venue-hub/" : "/list-your-venue/"}
          text={isManager ? "Venue HUB" : "List Your Venue"}
        />
      </ul>
      <HamburgerIcon />
    </nav>
  );
}

function HamburgerIcon() {
  return (
    <div className="fixed visible p-3.5 top-0 right-0 lg:collapse">
      <button className="p-1.5">
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
