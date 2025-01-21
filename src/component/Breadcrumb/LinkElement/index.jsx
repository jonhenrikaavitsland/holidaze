/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function LinkElement(props) {
  return (
    <>
      <li className="py-2.5 leading-none">
        <Link
          to={props.to}
          className="py-2.5 font-serif hover:bg-golden-yellow/20"
        >
          {props.content}
        </Link>
      </li>
      <span>{">"}</span>
    </>
  );
}
