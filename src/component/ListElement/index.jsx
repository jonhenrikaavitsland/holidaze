import Heading from "../Heading";
import NumberIcon from "../NumberIcon";

/* eslint-disable react/prop-types */

/**
 * Renders a list element that includes a numbered icon, a heading, and descriptive text.
 *
 * This component displays a numbered icon alongside a heading and a paragraph, representing a single item in a list.
 * It utilizes the NumberIcon and Heading components to render the icon and title respectively.
 *
 * @component
 * @param {object} props - The component props.
 * @param {number} props.index - The unique index of the list element, used as a key.
 * @param {number} props.number - The number to display within the NumberIcon.
 * @param {string} props.height - Additional CSS class(es) for styling the NumberIcon.
 * @param {number} props.level - The heading level (e.g., 1 for h1, 2 for h2, etc.) used by the Heading component.
 * @param {string} props.className - Additional CSS class(es) for customizing the Heading styling.
 * @param {object} props.item - An object containing the title and text for the list element.
 * @param {string} props.item.title - The title text to display in the heading.
 * @param {string} props.item.text - The descriptive text to display below the heading.
 *
 * @example
 * // Example usage:
 * const item = { title: "Step One", text: "This is the first step." };
 * <ListElement index={0} number={1} height="h-10" level={2} className="text-blue" item={item} />
 *
 * @returns {JSX.Element} The rendered list element.
 */

export default function ListElement(props) {
  return (
    <li className="flex flex-col gap-2.5 md:gap-3.75" key={props.index}>
      <section className="flex gap-2.5 md:gap-5 lg:gap-7.5">
        <NumberIcon number={props.number} className={props.height} />
        <Heading level={props.level} className={props.className}>
          {props.item.title}
        </Heading>
      </section>
      <p className="md:text-lg lg:text-xl">{props.item.text}</p>
    </li>
  );
}
