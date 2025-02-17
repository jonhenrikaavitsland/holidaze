/* eslint-disable react/prop-types */

/**
 * Renders a name plate displaying the name of a location.
 *
 * This component displays the location name inside a styled container, using a custom background color and typography.
 * It is typically used as an overlay on a card or image to identify the location.
 *
 * @component
 * @param {object} props - The component props.
 * @param {object} props.location - The location object.
 * @param {string} props.location.name - The name of the location to be displayed.
 *
 * @example
 * // Example usage:
 * <NamePlate location={{ name: "Corralejo" }} />
 *
 * @returns {JSX.Element} The rendered name plate component.
 */

export default function NamePlate({ location }) {
  return (
    <div className="flex flex-col items-end justify-end">
      <div className="bg-custom-coral text-white font-serif font-bold text-lg-leading-none md:text-2xl-leading-none py-4 px-5 md:px-7.5 md:py-5 text-center w-full">
        <h3>{location.name}</h3>
      </div>
    </div>
  );
}
