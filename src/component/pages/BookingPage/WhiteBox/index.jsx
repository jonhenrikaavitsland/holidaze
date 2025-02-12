/* eslint-disable react/prop-types */
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
