/* eslint-disable react/prop-types */
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
