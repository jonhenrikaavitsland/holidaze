/* eslint-disable react/prop-types */
export default function Button(props) {
  function handleColor() {
    if (props.color === "custom-coral") {
      return "bg-custom-coral hover:bg-custom-coral/80";
    }
    return "bg-deep-blue hover:bg-deep-blue/80";
  }

  return (
    <div>
      <button
        className={`rounded-xl text-white font-serif font-bold py-3.75 px-7.5 shadow-md shadow-natural-charcoal/25 ${handleColor()}`}
      >
        {props.content}
      </button>
    </div>
  );
}
