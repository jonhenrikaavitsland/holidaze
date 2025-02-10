/* eslint-disable react/prop-types */
export default function CustomSwitch({ isOn, onToggle, id, label }) {
  return (
    <li>
      <div className="flex flex-col gap-2">
        <label
          className="text-sm-leading-none capitalize text-center"
          htmlFor={id}
        >
          {label}
        </label>
        <div
          className={`h-11 w-24 bg-white rounded-xl shadow-md shadow-natural-charcoal/40 flex items-center px-0.5 ${isOn ? "justify-end" : ""}`}
          onClick={onToggle}
          role="button"
          id={id}
          aria-pressed={isOn}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onToggle();
            }
          }}
        >
          <div
            className={` h-10 w-10 rounded-full transition-transform duration-300 ${isOn ? "bg-accent-teal" : "bg-natural-charcoal"}`}
          ></div>
        </div>
      </div>
    </li>
  );
}
