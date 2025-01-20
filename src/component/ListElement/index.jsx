import NumberIcon from "../NumberIcon";

/* eslint-disable react/prop-types */
export default function ListElement(props) {
  return (
    <li className="flex flex-col gap-2.5" key={props.index}>
      <section className="flex gap-2.5">
        <NumberIcon number={props.number} height={props.height} />
        <h3 className="font-serif font-bold text-lg-leading-none">
          {props.item.title}
        </h3>
      </section>
      <p>{props.item.text}</p>
    </li>
  );
}
