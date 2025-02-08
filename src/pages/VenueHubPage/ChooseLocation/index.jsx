/* eslint-disable react/prop-types */
import useCreateVenueStore from "../../../js/store/useCreateVenueStore";

export default function ChooseLocation({ register, error }) {
  const { chosenLocation, setChosenLocation } = useCreateVenueStore();

  console.log("ChosenLocation:", typeof chosenLocation);

  return (
    <li>
      <div className="flex flex-col gap-1">
        <label className="text-sm-leading-none capitalize" htmlFor="options">
          location
        </label>
        <select
          {...register("location")}
          className="bg-warm-beige border border-natural-charcoal/40 h-9 text-center font-medium leading-none cursor-pointer md:text-lg-leading-none lg:text-xl-leading-none"
          id="options"
          required
          value={chosenLocation}
          onChange={(e) => setChosenLocation(e.target.value)}
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
