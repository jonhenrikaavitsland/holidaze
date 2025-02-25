/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import Heading from "../../../Heading";
import useCreateVenue from "../../../../js/api/useCreateVenue";
import { apiKey, apiUrl } from "../../../../js/data/constants";
import useCreateVenueStore from "../../../../js/store/useCreateVenueStore";
import ChooseLocation from "../ChooseLocation";
import CustomSwitch from "../CustomSwitch";
import FormListElement from "../FormListElement";
import MediaElement from "../MediaElement";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../../../js/validation/venueSchema";
import sanitizeInput from "../../../../js/sanitize/sanitizeInput";
import sanitizeAndValidateUrl from "../../../../js/sanitize/sanitizeAndValidateUrl";
import RatingElement from "../RatingElement";
import updateVenueStore from "../../../../js/data/updateVenueStore";

/**
 * Renders the "Create New Venue" form allowing users to submit details for a new venue.
 *
 * This component integrates with react-hook-form and Yup for form handling and validation. It collects information about the venue,
 * including its name, address, zip code, price, sleeps, location, description, media URLs, and available amenities (WiFi, breakfast,
 * parking, and pets). Input values are sanitized using custom sanitization functions before being passed to the API.
 *
 * The component uses state management from the `useCreateVenueStore` for toggling amenities and resetting form state,
 * and calls the `createVenue` API function (provided by `useCreateVenue`) to submit the new venue data. Upon successful submission,
 * it switches the view back to the venues list by calling the provided `handleViewChange` callback.
 *
 * The form is structured with multiple fieldsets:
 * - A fieldset for name and location details (venue name, address, location select, zip code).
 * - A fieldset for accommodation details (price, rating via RatingElement, sleeps).
 * - A fieldset for amenities (using CustomSwitch components for WiFi, breakfast, parking, and pets).
 * - A fieldset for media URLs (rendered via the MediaElement component).
 * - A fieldset for the venue description.
 *
 * Validation errors are displayed below the respective fields. The submit button is disabled while the creation API call is in progress.
 *
 * @component
 * @param {object} props - The component props.
 * @param {Function} props.handleViewChange - Callback function to switch views. It is called with "venues" after a successful submission.
 *
 * @example
 * // Example usage:
 * <CreateNewVenue handleViewChange={(view) => console.log("Switching view to:", view)} />
 *
 * @returns {JSX.Element} The rendered "Create New Venue" form component.
 */
export default function CreateNewVenue({ handleViewChange }) {
  const {
    wifi,
    toggleWifi,
    breakfast,
    toggleBreakfast,
    parking,
    toggleParking,
    pets,
    togglePets,
    rating,
    setRating,
    setWifi,
    setParking,
    setPets,
    setBreakfast,
    clearAll,
  } = useCreateVenueStore();

  const { createVenue, isLoading } = useCreateVenue(apiUrl, apiKey);

  () => {
    updateVenueStore("reset", {
      setRating,
      setWifi,
      setParking,
      setPets,
      setBreakfast,
      clearAll,
    });
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    const {
      venue,
      address,
      zipCode,
      sleeps,
      price,
      location,
      description,
      media0,
      media1,
      media2,
      media3,
      media4,
      media5,
      media6,
      media7,
      media8,
      media9,
    } = data;

    const sanitizedVenue = sanitizeInput(venue);
    const sanitizedAddress = sanitizeInput(address);
    const sanitizedZipCode = sanitizeInput(zipCode);
    const sanitizedSleeps = sanitizeInput(sleeps);
    const sanitizedPrice = sanitizeInput(price);
    const sanitizedDescription = sanitizeInput(description);
    const sanitizedMedia0 = sanitizeAndValidateUrl(media0);
    const sanitizedMedia1 = sanitizeAndValidateUrl(media1);
    const sanitizedMedia2 = sanitizeAndValidateUrl(media2);
    const sanitizedMedia3 = sanitizeAndValidateUrl(media3);
    const sanitizedMedia4 = sanitizeAndValidateUrl(media4);
    const sanitizedMedia5 = sanitizeAndValidateUrl(media5);
    const sanitizedMedia6 = sanitizeAndValidateUrl(media6);
    const sanitizedMedia7 = sanitizeAndValidateUrl(media7);
    const sanitizedMedia8 = sanitizeAndValidateUrl(media8);
    const sanitizedMedia9 = sanitizeAndValidateUrl(media9);

    try {
      createVenue({
        wifi,
        breakfast,
        parking,
        pets,
        venue: sanitizedVenue,
        address: sanitizedAddress,
        location,
        zipCode: sanitizedZipCode,
        price: sanitizedPrice,
        rating,
        sleeps: sanitizedSleeps,
        description: sanitizedDescription,
        media0: sanitizedMedia0,
        media1: sanitizedMedia1,
        media2: sanitizedMedia2,
        media3: sanitizedMedia3,
        media4: sanitizedMedia4,
        media5: sanitizedMedia5,
        media6: sanitizedMedia6,
        media7: sanitizedMedia7,
        media8: sanitizedMedia8,
        media9: sanitizedMedia9,
      });
    } catch (error) {
      console.error("Error:", error);
    }
    handleViewChange("venues");
  };

  return (
    <div className="mb-10 md:mb-15 lg:mb-20">
      <section className="flex flex-col gap-5 md:gap-7.5 lg:gap-10 px-5 md:px-7.5 lg:px-10">
        <Heading level="2" className="text-center text-deep-blue">
          Create new Venue
        </Heading>
        <form
          className="flex flex-col gap-5 md:gap-x-7.5 md:gap-y-15 lg:gap-x-10 lg:gap-y-20 md:grid grid-cols-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-5 md:gap-7.5 lg:gap-10">
            <fieldset>
              <legend className="sr-only">name and location data</legend>
              <ul className="flex flex-col gap-5 md:gap-7.5 lg:gap-10">
                <FormListElement
                  setter="venue"
                  element="venue"
                  label="venue"
                  error={errors.venue}
                  mustHave={true}
                  placeholder="Venue name"
                  register={register}
                />
                <FormListElement
                  setter="address"
                  element="address"
                  label="address"
                  error={errors.address}
                  mustHave={true}
                  placeholder="Street address"
                  register={register}
                />
                <ChooseLocation register={register} error={errors.location} />
                <FormListElement
                  setter="zipCode"
                  element="zip-code"
                  label="zip code"
                  error={errors.zipCode}
                  mustHave={true}
                  placeholder="35560"
                  register={register}
                />
              </ul>
            </fieldset>
            <fieldset>
              <legend className="sr-only">accommodation details</legend>
              <ul className="flex flex-col gap-5 md:gap-7.5 lg:gap-10">
                <FormListElement
                  setter="price"
                  element="price"
                  label="price €"
                  error={errors.price}
                  mustHave={true}
                  placeholder="€165"
                  register={register}
                />
                <RatingElement />
                <FormListElement
                  setter="sleeps"
                  element="sleeps"
                  label="sleeps"
                  error={errors.sleeps}
                  mustHave={true}
                  placeholder="4"
                  register={register}
                />
              </ul>
            </fieldset>
          </div>
          <div className="flex flex-col gap-5 md:gap-7.5 lg:gap-10">
            <fieldset className="flex flex-col gap-2.5 md:gap-3.75 lg:gap-5 mt-5 md:mt-0">
              <legend className="sr-only">amenities</legend>
              <Heading level="3" className="text-center text-deep-blue">
                Amenities
              </Heading>
              <div className="bg-warm-beige border border-natural-charcoal/40 rounded-xl w-56 mx-auto">
                <ul className="flex flex-col gap-5 md:gap-7.5 lg:gap-10 items-center mt-2.5 md:mt-3.75 lg:mt-5 mb-10">
                  <CustomSwitch
                    onToggle={toggleWifi}
                    isOn={wifi}
                    label="wiFi"
                    id="wifi"
                  />
                  <CustomSwitch
                    onToggle={toggleBreakfast}
                    isOn={breakfast}
                    label="breakfast"
                    id="breakfast"
                  />
                  <CustomSwitch
                    onToggle={toggleParking}
                    isOn={parking}
                    label="parking"
                    id="parking"
                  />
                  <CustomSwitch
                    onToggle={togglePets}
                    isOn={pets}
                    label="pets"
                    id="pets"
                  />
                </ul>
              </div>
            </fieldset>
            <fieldset className="mt-5">
              <legend className="sr-only">media</legend>
              <MediaElement register={register} error={errors} watch={watch} />
            </fieldset>
          </div>
          <fieldset className="my-5 col-span-full">
            <legend className="sr-only">description</legend>
            <div className="flex flex-col gap-1">
              <label
                className="text-sm-leading-none capitalize"
                htmlFor="description"
              >
                description
              </label>
              <textarea
                {...register("description")}
                className="bg-warm-beige border border-natural-charcoal/40 w-full h-44 p-1 overflow-y-scroll overscroll-contain scrollbar md:text-lg lg:text-xl active:ring-transparent focus-within:outline-deep-blue focus-within:outline-2 focus-within:outline"
                name="description"
                id="description"
                placeholder="Describe your amazing venue"
              ></textarea>
              {errors?.description && (
                <p
                  className="text-custom-coral text-sm-leading-none font-bold text-center"
                  id="description-error"
                >
                  {errors.description?.message}
                </p>
              )}
            </div>
          </fieldset>
          <div className="flex justify-center col-span-full">
            <button
              className="font-serif font-bold text-2xl-leading-none md:text-3xl-leading-none lg:text-4xl-leading-none bg-deep-blue text-white py-3.75 px-7.5 md:py-5 md:px-10 lg:py-7.5 lg:px-15 rounded-xl shadow-md shadow-natural-charcoal/40 hover:bg-deep-blue/90"
              disabled={isLoading}
              type="submit"
            >
              Create Venue
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
