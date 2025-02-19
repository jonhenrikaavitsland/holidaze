/* eslint-disable react/prop-types */

/**
 * Renders a paragraph with a highlighted span.
 *
 * This component displays a paragraph where a specific part of the text is emphasized by rendering it in bold and capitalized.
 * It accepts two props: one for the span content to be highlighted and another for the remaining text content.
 *
 * @component
 * @param {object} props - The component props.
 * @param {string} props.spanContent - The text to display in a bold, capitalized span.
 * @param {string} props.content - The additional text content to display following the highlighted span.
 *
 * @example
 * // Example usage:
 * <Paragraph
 *   spanContent="Tip: "
 *   content="Always update your venue description to attract more guests."
 * />
 *
 * @returns {JSX.Element} The rendered paragraph element.
 */
export default function Paragraph({ spanContent, content }) {
  return (
    <p className="md:text-lg lg:text-xl">
      <span className="capitalize font-bold">{spanContent}</span>
      {content}
    </p>
  );
}
