/* eslint-disable react/prop-types */

/**
 * Renders a number icon using an SVG image corresponding to the provided number.
 *
 * The component displays an image inside a figure element with predefined styling,
 * where the image source is dynamically generated based on the `number` prop.
 * Additional CSS classes can be applied to customize the appearance via the `className` prop.
 *
 * @component
 * @param {object} props - The component props.
 * @param {number} props.number - The number to display as an icon. The component loads the SVG from `/circle-{number}.svg`.
 * @param {string} [props.className] - Optional additional CSS classes for styling the image.
 *
 * @example
 * // Example usage:
 * <NumberIcon number={3} className="w-10 h-10" />
 *
 * @returns {JSX.Element} The rendered number icon.
 */

export default function NumberIcon(props) {
  return (
    <figure>
      <img
        className={`bg-natural-charcoal rounded-full ${props.className}`}
        src={`/circle-${props.number}.svg`}
        alt={`number${props.number}`}
      />
    </figure>
  );
}
