/* eslint-disable react/prop-types */

/**
 * Renders a select input for choosing a location as part of a form.
 *
 * This component is designed to work with react-hook-form. It displays a labeled select field
 * with options for five different locations. If there is a validation error passed via the `error` prop,
 * it displays the error message below the select field.
 *
 * @component
 * @param {object} props - The component props.
 * @param {Function} props.register - The register function from react-hook-form for registering the select field.
 * @param {object} props.error - The error object for the location field, which may contain a validation message.
 *
 * @example
 * // Example usage with react-hook-form:
 * <ChooseLocation register={register} error={errors.location} />
 *
 * @returns {JSX.Element} The rendered location select input.
 */
export default function ChooseLocation({ register, error }) {
  return (
    <li>
      <div className="flex flex-col gap-1">
        <label className="text-sm-leading-none capitalize" htmlFor="options">
          location
        </label>
        <select
          {...register("location")}
          className="bg-warm-beige border border-natural-charcoal/40 h-9 text-center font-medium leading-none cursor-pointer md:text-lg-leading-none lg:text-xl-leading-none active:ring-transparent focus-within:outline-deep-blue focus-within:outline-2 focus-within:outline"
          id="options"
          required
        >
          <option value="">Select Location</option>
          <option value="1">Corralejo</option>
          <option value="2">Costa Calma</option>
          <option value="3">Caleta de Fuste</option>
          <option value="4">Morro Jable</option>
          <option value="5">El Cotillo</option>
        </select>
        {error && (
          <p
            className="text-custom-coral text-sm-leading-none font-bold text-center"
            id="location-error"
          >
            {error?.message}
          </p>
        )}
      </div>
    </li>
  );
}
