import { useForm } from "react-hook-form";
import Heading from "../../../component/Heading";
import useCreateVenue from "../../../js/api/useCreateVenue";
import { apiKey, apiUrl } from "../../../js/data/constants";
import useCreateVenueStore from "../../../js/store/useCreateVenueStore";
import ChooseLocation from "../ChooseLocation";
import CustomSwitch from "../CustomSwitch";
import FormListElement from "../FormListElement";
import MediaElement from "../MediaElement";
import RatingElement from "../RatingElement";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../../js/validation/venueSchema";

export default function CreateNewVenue() {
  const {
    wifi,
    toggleWifi,
    breakfast,
    toggleBreakfast,
    parking,
    toggleParking,
    pets,
    togglePets,
    description,
    setDescription,
    rating,
  } = useCreateVenueStore();

  const { createVenue, isLoading, error } = useCreateVenue(apiUrl, apiKey);
  console.log("Error Creating venue:", error);

  const {
    register,
    handleSubmit,
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

    try {
      createVenue({
        wifi,
        breakfast,
        parking,
        pets,
        venue,
        address,
        location,
        zipCode,
        price,
        rating,
        sleeps,
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
      });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div>
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
              <MediaElement register={register} error={errors} />
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
                className="bg-warm-beige border border-natural-charcoal/40 w-full h-44 p-1 overflow-y-scroll overscroll-contain scrollbar md:text-lg lg:text-xl"
                name="description"
                id="description"
                placeholder="Describe your amazing venue"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
