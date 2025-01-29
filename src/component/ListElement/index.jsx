import Heading from "../Heading";
import NumberIcon from "../NumberIcon";

/* eslint-disable react/prop-types */
export default function ListElement(props) {
  return (
    <li className="flex flex-col gap-2.5 md:gap-3.75" key={props.index}>
      <section className="flex gap-2.5 md:gap-5 lg:gap-7.5">
        <NumberIcon number={props.number} height={props.height} />
        <Heading level={props.level} className={props.className}>
          {props.item.title}
        </Heading>
      </section>
      <p className="md:text-lg lg:text-xl">{props.item.text}</p>
    </li>
  );
}
