/* eslint-disable react/prop-types */

/**
 * Renders a button component that visually indicates an open or closed state.
 *
 * The component displays a button with an icon that rotates based on the `openState` prop.
 * When `openState` is true, the icon rotates 180 degrees; otherwise, it remains in its default position.
 *
 * @component
 * @param {object} props - The component props.
 * @param {boolean} props.openState - Indicates whether the button is in the open state.
 * @example
 * // Example usage:
 * <BtnOpenClose openState={true} />
 *
 * @returns {JSX.Element} The rendered button element with a toggling icon.
 */
export default function BtnOpenClose({ openState }) {
  return (
    <div className="absolute bottom-0 right-0">
      <button className="bg-deep-blue py-1.5 px-5 rounded-tl-xl rounded-br-xl hover:bg-deep-blue/90 cursor-pointer">
        <img
          src={"/chevron-down-solid.svg"}
          alt=""
          className={`h-5 ${openState ? "rotate-180" : ""}`}
        />
        <span className="sr-only text-white">toggle</span>
      </button>
    </div>
  );
}
