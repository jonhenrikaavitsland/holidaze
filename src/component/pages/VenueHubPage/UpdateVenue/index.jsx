/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import transformVenue from "../../../../js/data/transformVenue";
import sanitizeInput from "../../../../js/sanitize/sanitizeInput";
import sanitizeAndValidateUrl from "../../../../js/sanitize/sanitizeAndValidateUrl";
import Heading from "../../../Heading";
import Loader from "../../../Loader";
import useUpdateVenue from "../../../../js/api/useUpdateVenue";
import updateVenueStore from "../../../../js/data/updateVenueStore";
import FormListElement from "../FormListElement";
import ChooseLocation from "../ChooseLocation";
import RatingElement from "../RatingElement";
import CustomSwitch from "../CustomSwitch";
import MediaElement from "../MediaElement";
import DangerZone from "../DangerZone";
import useCreateVenueStore from "../../../../js/store/useCreateVenueStore";
import { schema } from "../../../../js/validation/venueSchema";

/**
 * Renders the "Update Venue" form for editing an existing venue's details.
 *
 * This component allows venue managers to update their venue information by pre-populating a form with
 * default values transformed from the provided `venueObj`. It integrates with react-hook-form and Yup
 * for form handling and validation. The form includes fields for venue name, address, zip code, price,
 * sleeps, location, description, media URLs, and amenities (WiFi, breakfast, parking, and pets), as well
 * as a rating element.
 *
 * The component uses the `useCreateVenueStore` hook to manage and synchronize state for amenities and rating,
 * and calls `updateVenueStore` to update these values when the component mounts. It also uses the `useUpdateVenue`
 * hook to perform the API call for updating the venue. All input values are sanitized using custom functions
 * (`sanitizeInput` and `sanitizeAndValidateUrl`) before being submitted.
 *
 * Upon successful submission, the view is changed back to the venues list by invoking the `handleViewChange` callback.
 * Additionally, a "Danger Zone" section is rendered to provide options for deleting the venue.
 *
 * @component
 * @param {object} props - The component props.
 * @param {object} props.venueObj - The current venue object containing the venue's existing details.
 * @param {Function} props.handleViewChange - Callback function to change the view (e.g., switching back to the venues list) after updating the venue.
 *
 * @example
 * // Example usage:
 * <UpdateVenue
 *   venueObj={venueData}
 *   handleViewChange={(view) => console.log("Switching to", view)}
 * />
 *
 * @returns {JSX.Element} The rendered update venue form.
 */
export default function UpdateVenue({ venueObj, handleViewChange }) {
  const [loading, setLoading] = useState(true);

  const defaultObj = transformVenue(venueObj);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), defaultValues: defaultObj });

  const {
    setRating,
    setWifi,
    setParking,
    setPets,
    setBreakfast,
    rating,
    toggleWifi,
    toggleBreakfast,
    toggleParking,
    togglePets,
    wifi,
    pets,
    breakfast,
    parking,
    clearAll,
  } = useCreateVenueStore();

  useEffect(() => {
    if (venueObj) {
      updateVenueStore(venueObj, {
        setRating,
        setWifi,
        setParking,
        setPets,
        setBreakfast,
        clearAll,
      });
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [
    venueObj,
    setRating,
    setWifi,
    setParking,
    setPets,
    setBreakfast,
    clearAll,
  ]);

  const { updateVenue, isLoading } = useUpdateVenue(venueObj.id);

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
      updateVenue({
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
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-10 md:gap-15 lg:gap-20 mb-10 md:mb-15 lg:mb-20">
          <section className="flex flex-col gap-5 md:gap-7.5 lg:gap-10 px-5 md:px-7.5 lg:px-10">
            <Heading level="2" className="text-center text-deep-blue">
              update venue
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
                    <ChooseLocation
                      register={register}
                      error={errors.location}
                    />
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
                  <MediaElement
                    register={register}
                    error={errors}
                    venue={venueObj}
                    watch={watch}
                  />
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
                  update venue
                </button>
              </div>
            </form>
          </section>
          <DangerZone id={venueObj.id} handleViewChange={handleViewChange} />
        </div>
      )}
    </>
  );
}
