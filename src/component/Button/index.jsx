import useAuthStore from "../../js/store/useAuthStore";
import useDataStore from "../../js/store/useDataStore";

/* eslint-disable react/prop-types */
export default function Button(props) {
  const { logout } = useAuthStore();
  const { clear } = useDataStore();

  function handleColor() {
    if (props.color === "custom-coral") {
      return "bg-custom-coral hover:bg-custom-coral/80 w-44 lg:w-auto text-center";
    }
    return "bg-deep-blue hover:bg-deep-blue/80";
  }

  return (
    <div>
      <button
        className={`rounded-xl leading-none text-white font-serif font-bold py-3.75 px-7.5 shadow-md shadow-natural-charcoal/40 ${props.action ? "lg:py-2.5 lg:px-5" : ""} ${handleColor()}`}
        type="button"
        onClick={() => {
          if (props.action) {
            logout();
            clear();
          }
        }}
      >
        {props.content}
      </button>
    </div>
  );
}
