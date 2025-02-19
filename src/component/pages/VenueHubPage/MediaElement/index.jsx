/* eslint-disable react/prop-types */
import { useState } from "react";

/**
 * Renders a dynamic list of input fields for media URLs, supporting up to 10 entries.
 *
 * This component is designed to integrate with react-hook-form. It initializes its state by "watching" the current values of
 * the media fields (from `media0` to `media9`) using the provided `watch` function, and it calculates how many input fields
 * should initially be displayed based on which fields are populated. If the last visible input field is non-empty and there are
 * fewer than 10 inputs, an additional empty input is added to allow the user to enter a new media URL.
 *
 * As the user types in an input field, the corresponding value is updated in the component state, and any validation errors for that field,
 * provided via the `error` prop, are displayed below the input.
 *
 * @component
 * @param {object} props - The component props.
 * @param {Function} props.register - The register function from react-hook-form used to register each input field.
 * @param {Function} props.watch - The watch function from react-hook-form used to obtain the current values of the media fields.
 * @param {object} [props.error] - An object containing validation errors for the media fields (e.g., errors.media0, errors.media1, etc.).
 *
 * @example
 * // Example usage with react-hook-form:
 * <MediaElement register={register} watch={watch} error={errors} />
 *
 * @returns {JSX.Element} A JSX element containing the list of media input fields.
 */
export default function MediaElement(props) {
  const getInitialInputs = () => {
    const defaults = Array.from(
      { length: 10 },
      (_, i) => props.watch(`media${i}`) || "",
    );

    let lastIndexToShow = 0;
    for (let i = 0; i < defaults.length; i++) {
      if (i === 0 || defaults[i].trim() !== "") {
        lastIndexToShow = i;
      }
    }

    let numInputs = lastIndexToShow + 1;
    if (numInputs < 10 && defaults[lastIndexToShow].trim() !== "") {
      numInputs++;
    }

    return defaults.slice(0, numInputs);
  };

  const [inputs, setInputs] = useState(getInitialInputs);

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;

    if (
      value.trim() !== "" &&
      index === inputs.length - 1 &&
      inputs.length < 10
    ) {
      newInputs.push("");
    }

    const trimmedInputs = newInputs.slice(0, 10);
    setInputs(trimmedInputs);
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm-leading-none capitalize" htmlFor="media-0">
        media
      </label>
      <ul className="flex flex-col gap-2.5 md:gap-3.75 lg:gap-5">
        {inputs.map((input, index) => (
          <li key={index}>
            {index > 0 ? (
              <label className="sr-only" htmlFor={`media-${index}`}>
                media {index}
              </label>
            ) : (
              ""
            )}
            <input
              {...props.register(`media${index}`)}
              className="bg-warm-beige border border-natural-charcoal/40 h-9 text-center font-medium leading-none w-full md:text-lg-leading-none lg:text-xl-leading-none active:ring-transparent focus-within:outline-deep-blue focus-within:outline-2 focus-within:outline"
              type="text"
              value={input}
              placeholder="https://unsplash.com/photos/"
              onChange={(e) => handleInputChange(index, e.target.value)}
              onClick={(e) => handleInputChange(index, e.target.value)}
              // required={index === 0}
              id={`media-${index}`}
            />
            {props.error?.[`media${index}`] && (
              <p className="text-custom-coral text-sm-leading-none font-bold text-center">
                {props.error?.[`media${index}`]?.message}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
