import { useNavigate } from "react-router-dom";
import useUIStore from "../../js/store/useUIStore";

/* eslint-disable react/prop-types */

/**
 * Renders the Holidaze logo as a clickable figure that navigates to the homepage.
 *
 * The logo is displayed differently depending on whether it is used inside a modal or not.
 * When not in a modal and the menu is closed, clicking the logo navigates the user to the root ("/") route.
 *
 * @component
 * @param {object} props - The component props.
 * @param {boolean} [props.modal] - If true, indicates that the logo is rendered inside a modal, affecting its layout.
 * @param {string} [props.className] - Optional additional CSS classes to customize the text styling.
 *
 * @example
 * // Example usage:
 * // In a modal:
 * <Logo modal={true} className="text-deep-blue" />
 *
 * // In a regular header:
 * <Logo className="text-deep-blue" />
 *
 * @returns {JSX.Element} The rendered Logo component.
 */
export default function Logo(props) {
  const navigate = useNavigate();
  const { isMenuOpen } = useUIStore();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <figure
      className="flex justify-center cursor-pointer"
      onClick={!isMenuOpen ? handleClick : undefined}
    >
      <div
        className={`flex flex-col items-center ${props.modal ? "" : "md:flex-row md:h-[75px] md:items-start w-min"}`}
      >
        <div className="w-[3.125rem]">
          <img src="/logo_warm_200.png" alt="holidaze" />
        </div>
        <div className={props.modal ? "" : "md:h-full md:flex md:items-end"}>
          <span
            className={`font-mono text-xl-leading-none ${props.className} ${props.modal ? "" : "md:text-5xl-50"}`}
          >
            holidaze
          </span>
        </div>
      </div>
    </figure>
  );
}
