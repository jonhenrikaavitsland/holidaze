/* eslint-disable react/prop-types */

/**
 * Renders a custom toggle switch component.
 *
 * This component displays a switch styled as a sliding toggle, allowing users to toggle an option on or off.
 * It accepts an `isOn` prop to indicate the current state and an `onToggle` callback that is triggered when the switch is activated.
 * The component supports keyboard accessibility (toggling with the Enter or Space keys) and displays a label above the switch.
 *
 * @component
 * @param {object} props - The component props.
 * @param {boolean} props.isOn - Indicates whether the switch is currently on.
 * @param {Function} props.onToggle - Callback function to be called when the switch is toggled.
 * @param {string} props.id - A unique identifier for the switch, used for accessibility.
 * @param {string} props.label - The text label displayed above the switch.
 *
 * @example
 * // Example usage:
 * <CustomSwitch
 *   isOn={true}
 *   onToggle={() => console.log("Toggled")}
 *   id="wifi-switch"
 *   label="WiFi"
 * />
 *
 * @returns {JSX.Element} The rendered custom switch component.
 */
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
          className={`h-11 w-24 bg-white rounded-xl shadow-md shadow-natural-charcoal/40 flex items-center px-0.5 ${isOn ? "justify-end" : ""} active:ring-transparent focus-within:outline-deep-blue focus-within:outline-2 focus-within:outline`}
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
