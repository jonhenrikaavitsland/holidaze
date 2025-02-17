/* eslint-disable react/prop-types */

/**
 * Renders a sun icon that changes its appearance based on the hover state.
 *
 * When the `isHovered` prop is true, the component displays a yellow sun image; otherwise, it displays a white sun image.
 * This simple component is typically used as a decorative or interactive element in the UI.
 *
 * @component
 * @param {object} props - The component props.
 * @param {boolean} props.isHovered - Determines which sun image to display based on the hover state.
 *
 * @example
 * // Example usage:
 * <IconSun isHovered={true} />
 *
 * @returns {JSX.Element} The rendered sun icon.
 */
export default function IconSun({ isHovered }) {
  return (
    <figure className="p-2.5 md:p-7.5">
      <img
        src={isHovered ? "/logo_warm_200.png" : "/logo_white_200.png"}
        alt={isHovered ? "yellow sun" : "white sun"}
        className="h-13 w-13 md:h-25 md:w-25"
      />
    </figure>
  );
}
