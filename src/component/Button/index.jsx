import useAuthStore from "../../js/store/useAuthStore";
import useDataStore from "../../js/store/useDataStore";
import useManagerStore from "../../js/store/useManagerStore";

/* eslint-disable react/prop-types */
export default function Button(props) {
  const { logout } = useAuthStore();
  const { setIsManager } = useManagerStore();
  const { clear } = useDataStore();

  function handleColor() {
    if (props.color === "custom-coral") {
      return "bg-custom-coral hover:bg-custom-coral/80";
    }
    return "bg-deep-blue hover:bg-deep-blue/80";
  }

  return (
    <div>
      <button
        className={`rounded-xl text-white font-serif font-bold py-3.75 px-7.5 shadow-md shadow-natural-charcoal/40 ${handleColor()}`}
        type="button"
        onClick={() => {
          if (props.action) {
            setIsManager(false);
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
