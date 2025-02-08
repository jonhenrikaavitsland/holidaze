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

  const onChangeHandler = getOnChangeHandler();

  return (
    <li>
      <div className="flex flex-col gap-1">
        <label className="text-sm-leading-none capitalize" htmlFor={element}>
          {label}
        </label>
        <input
          {...register(element)}
          className="bg-warm-beige border border-natural-charcoal/40 h-9 text-center font-medium leading-none md:text-lg-leading-none lg:text-xl-leading-none"
          type="text"
          id={element}
          placeholder={placeholder}
          required={mustHave}
          value={value}
          onChange={onChangeHandler}
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
