/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function LinkElement(props) {
  return (
    <>
      <li>
        <Link to={props.to}>{props.content}</Link>
      </li>
      <span>{">"}</span>
    </>
  );
}
