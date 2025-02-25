import useAuthStore from "../../js/store/useAuthStore";
import Heading from "../Heading";
import useUpdateAvatar from "../../js/api/useUpdateAvatar";
import { useForm } from "react-hook-form";
import { schema } from "../../js/validation/profileSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import sanitizeAndValidateUrl from "../../js/sanitize/sanitizeAndValidateUrl";

/**
 * Renders a modal that allows the user to edit their profile image.
 *
 * This component displays a form pre-populated with the user's current avatar URL.
 * It leverages react-hook-form with Yup validation to manage and validate the form input.
 * The modal provides a live preview of the avatar image and includes functionality to clear the input or submit a new URL.
 *
 * On submission, the provided image URL is sanitized and validated before calling the update API.
 * If the update is successful, the user's avatar in the global state is updated accordingly.
 *
 * @component
 * @example
 * // Example usage:
 * <EditProfileModal />
 *
 * @returns {JSX.Element} The rendered modal component for editing the profile image.
 */
export default function EditProfileModal() {
  const { user, token, updateAvatarObject } = useAuthStore();
  const { updateAvatar, updateSuccess } = useUpdateAvatar();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      image: user.avatar.url,
    },
  });

  const imageUrl = watch("image");

  const handleClear = () => {
    reset({ image: "" });
  };

  const onSubmit = async (data) => {
    const { image } = data;

    if (!data) return;

    const sanitizedImage = sanitizeAndValidateUrl(image);

    try {
      await updateAvatar(user, token, image);
      updateAvatarObject({ url: sanitizedImage, alt: user.name });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="absolute w-2/3 md:max-w-xl lg:max-w-3xl z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-light-sky-blue pt-2.5 px-2.5 pb-10 rounded-xl flex flex-col gap-2.5 shadow-md shadow-natural-charcoal/40">
      <Heading level="3" className="text-center">
        Edit profile image
      </Heading>
      <p className="md:text-lg lg:text-xl lg:text-center">
        Upload a new image by filling in the box below. Click save when you are
        done.
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col pt-2.5 gap-5 lg:flex-row"
      >
        <figure>
          <img
            src={imageUrl || user.avatar.url}
            alt={user.name}
            className={`h-36 aspect-square object-cover mx-auto ${updateSuccess && "border-8 border-accent-teal"}`}
            loading="lazy"
          />
        </figure>
        <div className="lg:grow">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleClear}
              className="uppercase text-sm font-serif font-bold me-2.5 py-2.5"
            >
              Clear
            </button>
          </div>
          <div className="my-auto grow shadow-md shadow-natural-charcoal/40 rounded-xl border border-natural-charcoal/40">
            <div className="flex flex-col md:flex-row bg-white p-1 rounded-xl focus-within:outline-deep-blue focus-within:outline-2 focus-within:outline">
              <label htmlFor="newImage" className="sr-only">
                New image url:
              </label>
              <input
                {...register("image")}
                type="text"
                id="newImage"
                className="w-full ps-2.5 active:ring-transparent focus:outline-none"
              />
              <button
                type="submit"
                className="uppercase bg-accent-teal text-white font-serif font-bold text-xl-leading-none py-2 px-3.5 rounded-b-xl md:rounded-xl"
              >
                save
              </button>
            </div>
          </div>
          {errors?.image && (
            <p className="font-bold text-custom-coral">
              {errors.image?.message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
