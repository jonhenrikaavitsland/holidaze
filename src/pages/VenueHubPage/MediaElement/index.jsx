/* eslint-disable react/prop-types */
import { useState } from "react";
import useCreateVenueStore from "../../../js/store/useCreateVenueStore";

export default function MediaElement(props) {
  const { setMedia, ...mediaStates } = useCreateVenueStore();
  const [inputs, setInputs] = useState(() => {
    const initialInputs = [];
    for (let i = 0; i < 10; i++) {
      initialInputs.push(mediaStates[`media${i}`] || "");
    }
    return (
      initialInputs.filter((input, index) => index === 0 || input !== "") || [
        "",
      ]
    );
  });

  const handleInputChange = (index, value) => {
    setMedia(index, value);
    const newInputs = [...inputs];
    newInputs[index] = value;
    // setInputs(newInputs);

    // If the last input has a value, add a new empty input
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
            <input
              className="bg-warm-beige border border-natural-charcoal/40 h-9 text-center font-medium leading-none w-full md:text-lg-leading-none lg:text-xl-leading-none"
              type="text"
              value={input}
              placeholder="https://unsplash.com/photos/"
              onChange={(e) => handleInputChange(index, e.target.value)}
              required={index === 0}
              id={`media-${index}`}
            />
          </li>
        ))}
      </ul>
      {props.error && (
        <p className="text-custom-coral text-sm-leading-none font-bold text-center">
          {props.error}
        </p>
      )}
    </div>
  );
}
