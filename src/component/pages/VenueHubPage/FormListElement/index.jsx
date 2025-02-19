/* eslint-disable react/prop-types */

/**
 * Renders an individual form list element consisting of a label, an input field, and an optional error message.
 *
 * This component is designed to be used within a form that is managed by react-hook-form. It displays:
 * - A label associated with the input.
 * - A text input field registered via the `register` function.
 * - An error message below the input field if a validation error is present.
 *
 * Props:
 * @param {object} props - The component props.
 * @param {Function} props.register - The register function from react-hook-form used to register the input field.
 * @param {string} props.setter - The name of the field to register; used as the key for react-hook-form.
 * @param {string} props.element - The id attribute for the input element.
 * @param {string} props.placeholder - The placeholder text displayed in the input field.
 * @param {boolean} props.mustHave - If true, marks the input field as required.
 * @param {object} props.error - The error object for the input field, typically containing a validation message.
 * @param {string} props.label - The text label displayed above the input field.
 *
 * @example
 * // Example usage with react-hook-form:
 * <FormListElement
 *   register={register}
 *   setter="venue"
 *   element="venue"
 *   label="Venue Name"
 *   placeholder="Enter venue name"
 *   mustHave={true}
 *   error={errors.venue}
 * />
 *
 * @returns {JSX.Element} The rendered form list element.
 */
export default function FormListElement({
  register,
  setter,
  element,
  placeholder,
  mustHave,
  error,
  label,
}) {
  return (
    <li>
      <div className="flex flex-col gap-1">
        <label className="text-sm-leading-none capitalize" htmlFor={element}>
          {label}
        </label>
        <input
          {...register(setter)}
          className="bg-warm-beige border border-natural-charcoal/40 h-9 text-center font-medium leading-none md:text-lg-leading-none lg:text-xl-leading-none active:ring-transparent focus-within:outline-deep-blue focus-within:outline-2 focus-within:outline"
          type="text"
          id={element}
          placeholder={placeholder}
          required={mustHave}
        />
        {error && (
          <p
            className="text-custom-coral text-sm-leading-none font-bold text-center"
            id={`${element}-error`}
          >
            {error?.message}
          </p>
        )}
      </div>
    </li>
  );
}
