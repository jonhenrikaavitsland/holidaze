/* eslint-disable react/prop-types */

/**
 * Renders a customizable heading element with responsive typography based on the specified level.
 *
 * This component dynamically selects the heading tag (h1, h2, h3, etc.) based on the `level` prop and applies
 * corresponding default styling classes for font size and line height. Additional CSS classes can be provided via the `className` prop.
 * The component ensures that the heading text is styled with a bold, capitalized serif font.
 *
 * @component
 * @param {object} props - The component props.
 * @param {number} props.level - The heading level (e.g., 1 for h1, 2 for h2, etc.).
 * @param {string} [props.className] - Optional additional CSS classes to customize the styling.
 * @param {React.ReactNode|string} props.children - The content to be displayed within the heading.
 *
 * @example
 * // Example usage:
 * <Heading level="2" className="text-custom-color">Section Title</Heading>
 *
 * @returns {JSX.Element} The rendered heading element.
 */
export default function Heading({ level, className, children }) {
  const Tag = `h${level}`;

  let classes;

  if (Tag === "h1") {
    classes =
      "text-2xl-leading-none md:text-3xl-leading-none lg:text-4xl-leading-none";
  }
  if (Tag === "h2") {
    classes =
      "text-xl-leading-none md:text-2xl-leading-none lg:text-3xl-leading-none";
  }
  if (Tag === "h3") {
    classes =
      "text-lg-leading-none md:text-xl-leading-none lg:text-2xl-leading-none";
  }

  return (
    <Tag className={`font-serif font-bold capitalize ${classes} ${className}`}>
      {children}
    </Tag>
  );
}
