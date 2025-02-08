/* eslint-disable react/prop-types */
import useCreateVenueStore from "../../../js/store/useCreateVenueStore";

export default function FormListElement({
  register,
  setter,
  element,
  placeholder,
  mustHave,
  error,
  label,
}) {
  const {
    venue,
    address,
    zipCode,
    price,
    sleeps,
    setVenue,
    setAddress,
    setZipCode,
    setPrice,
    setSleeps,
  } = useCreateVenueStore();

  const valueMap = { venue, address, zipCode, price, sleeps };
  const value = valueMap[setter] ?? "";

  // A switch that returns the appropriate setter function
  const getOnChangeHandler = () => {
    switch (setter) {
      case "venue":
        return (e) => setVenue(e.target.value);
      case "address":
        return (e) => setAddress(e.target.value);
      case "zipCode":
        return (e) => setZipCode(e.target.value);
      case "price":
        return (e) => setPrice(e.target.value);
      case "sleeps":
        return (e) => setSleeps(e.target.value);
      default:
        return undefined;
    }
  };

  const getRegisterObj = () => {
    switch (setter) {
      case "venue":
        return { required: true, minLength: 5, maxLength: 40 };
      case "address":
        return { required: true, minLength: 8, maxLength: 100 };
      case "zipCode":
        return {
          required: true,
          minLength: 5,
          maxLength: 5,
          min: 35600,
          max: 35659,
          RegExp: /^[0-9]+$/,
        };
      case "price":
        return {
          required: true,
          minLength: 1,
          maxLength: 5,
          min: 1,
          max: 99999,
          RegExp: /^[0-9]+$/,
        };
      case "sleeps":
        return {
          required: true,
          minLength: 1,
          maxLength: 2,
          min: 1,
          max: 99,
          RegExp: /^[0-9]+$/,
        };
      default:
        return undefined;
    }
  };

  const registerObj = getRegisterObj();

  const onChangeHandler = getOnChangeHandler();

  return (
    <li>
      <div className="flex flex-col gap-1">
        <label className="text-sm-leading-none capitalize" htmlFor={element}>
          {label}
        </label>
        <input
          className="bg-warm-beige border border-natural-charcoal/40 h-9 text-center font-medium leading-none md:text-lg-leading-none lg:text-xl-leading-none"
          type="text"
          id={element}
          placeholder={placeholder}
          required={mustHave}
          aria-invalid={!!error}
          aria-describedby={error ? `${element}-error` : undefined}
          value={value}
          onChange={onChangeHandler}
          {...register(`${element}`, registerObj)}
        />
        {error && (
          <p
            className="text-custom-coral text-sm-leading-none font-bold text-center"
            id={`${element}-error`}
          >
            {error}
          </p>
        )}
      </div>
    </li>
  );
}
