/* eslint-disable react/prop-types */

/**
 * Renders a styled white box container for displaying a label and content.
 *
 * This component is used to present a labeled piece of information in a consistent white box style.
 * It accepts a `label` prop to display a title in uppercase and a `content` prop to render custom content.
 * An optional `isSelect` prop adjusts the bottom padding and gap styling when the content is a select element.
 *
 * @component
 * @param {object} props - The component props.
 * @param {string} props.label - The text label displayed in the box.
 * @param {React.ReactNode} props.content - The content to be rendered within the box.
 * @param {boolean} [props.isSelect] - If true, applies styles appropriate for a select element.
 *
 * @example
 * // Example usage:
 * <WhiteBox
 *   label="Arrival Date:"
 *   content={<span>01.01.2025</span>}
 * />
 *
 * @returns {JSX.Element} The rendered white box component.
 */
export default function WhiteBox(props) {
  return (
    <div
      className={`bg-white w-full border border-natural-charcoal/40 pt-1 px-1 ${!props.isSelect ? "pb-2.5 gap-1" : ""} flex flex-col active:ring-transparent focus-within:outline-deep-blue focus-within:outline-2 focus-within:outline`}
    >
      <p className="uppercase text-xs-leading-none font-bold">{props.label}</p>
      <div className="w-full flex justify-center">{props.content}</div>
    </div>
  );
}
