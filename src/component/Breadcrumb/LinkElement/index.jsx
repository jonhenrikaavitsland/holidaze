/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

/**
 * Renders a navigation link element within a list item along with a separator.
 *
 * This component uses React Router's `Link` to create a clickable element that navigates to a specified route.
 * It displays the provided content inside the link and appends a ">" separator after the list item.
 *
 * @component
 * @param {object} props - The component props.
 * @param {string} props.to - The destination URL or route path for the link.
 * @param {React.ReactNode|string} props.content - The content to be displayed inside the link.
 * @example
 * // Example usage:
 * <LinkElement to="/about" content="About Us" />
 *
 * @returns {JSX.Element} The rendered list item containing the navigation link and separator.
 */
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
