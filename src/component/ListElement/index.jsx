import NumberIcon from "../NumberIcon";

/* eslint-disable react/prop-types */
export default function ListElement(props) {
  return (
    <li className="flex flex-col gap-2.5 md:gap-3.75" key={props.index}>
      <section className="flex gap-2.5 md:gap-5">
        <NumberIcon number={props.number} height={props.height} />
        <h3 className="font-serif font-bold text-lg-leading-none md:text-xl-leading-none">
          {props.item.title}
        </h3>
      </section>
      <p className="text-lg">{props.item.text}</p>
    </li>
  );
}
