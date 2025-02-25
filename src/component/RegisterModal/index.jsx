import Logo from "../Logo";
import useUIStore from "../../js/store/useUIStore";
import { useLocation } from "react-router-dom";
import useAuthStore from "../../js/store/useAuthStore";
import { useRegisterUser } from "../../js/api/useRegisterUser";
import { schema } from "../../js/validation/registerSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import sanitizeEmail from "../../js/sanitize/sanitizeEmail";
import sanitizeInput from "../../js/sanitize/sanitizeInput";

/**
 * Renders a modal registration form for new users to create an account.
 *
 * This component provides a form with fields for email, password, and name, which are validated using react-hook-form
 * in conjunction with Yup (via the yupResolver). User inputs are sanitized before submission using custom sanitization functions.
 * On form submission, it calls the `registerUser` API function to create a new account.
 *
 * If the current route indicates that the user is attempting to list a venue and they are not logged in, a flag is passed
 * to the API to handle this case. Upon successful registration, the modal is closed and the login modal is opened.
 *
 * The component utilizes various custom hooks:
 * - `useUIStore` for managing UI state and modal overlays.
 * - `useAuthStore` for checking authentication status.
 * - `useRegisterUser` for executing the registration API call.
 *
 * @component
 * @example
 * // Example usage:
 * <RegisterModal />
 *
 * @returns {JSX.Element} The rendered registration modal component.
 */
export default function RegisterModal() {
  const location = useLocation();
  const { checkAndCloseAll, openStateWithOverlay } = useUIStore();
  const { isLoggedIn } = useAuthStore();
  const { registerUser, loading } = useRegisterUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const { name, email, password } = data;
    const isListingVenue =
      location.pathname.includes("list-your-venue") && !isLoggedIn;

    const sanitizedEmail = sanitizeEmail(email);
    const sanitizedName = sanitizeInput(name);
    const sanitizedPassword = password.trim();

    try {
      await registerUser(
        sanitizedName,
        sanitizedEmail,
        sanitizedPassword,
        isListingVenue,
      );
      checkAndCloseAll();
      openStateWithOverlay("isLoginModalOpen");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="flex flex-col md:flex-row gap-5 sm:min-w-72 min-w-96 md:w-192 md:bg-light-sky-blue md:rounded-xl md:shadow-md md:shadow-natural-charcoal/40">
        <div className="md:w-1/2 md:order-last md:flex md:items-center md:justify-center">
          <Logo className="text-deep-blue" modal={true} />
        </div>
        <div className="bg-light-sky-blue rounded-xl flex flex-col gap-5 pt-5 px-5 pb-10 shadow-md shadow-natural-charcoal/40 md:w-1/2 md:shadow-none">
          <section className="text-center flex flex-col gap-2.5">
            <h2 className="font-serif text-xl-leading-none font-bold">
              Welcome Traveler
            </h2>
            <p>Register your account now</p>
          </section>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-sm-leading-none font-medium"
              >
                Email
              </label>
              <div className="bg-white rounded border border-deep-blue/40 focus-within:outline-deep-blue focus-within:outline-2 focus-within:outline">
                <input
                  {...register("email")}
                  className="w-full h-8 rounded ps-2.5 active:ring-transparent focus:outline-none"
                  type="text"
                  placeholder="mail@stud.noroff.no"
                  id="email"
                  required
                />
                {errors?.email && (
                  <p className="text-center text-sm-leading-none text-custom-coral font-bold rounded-b">
                    {errors.email?.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-sm-leading-none font-medium">
                <label htmlFor="password">Password</label>
              </div>
              <div className="bg-white rounded border border-deep-blue/40 focus-within:outline-deep-blue focus-within:outline-2 focus-within:outline">
                <input
                  {...register("password")}
                  className="w-full h-8 rounded ps-2.5 active:ring-transparent focus:outline-none"
                  type="password"
                  placeholder="*********"
                  id="password"
                  required
                />
                {errors?.password && (
                  <p className="text-center text-sm-leading-none text-custom-coral font-bold rounded-b">
                    {errors.password?.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-sm-leading-none font-medium">
                <label htmlFor="name">Name</label>
              </div>
              <div className="bg-white rounded border border-deep-blue/40 focus-within:outline-deep-blue focus-within:outline-2 focus-within:outline">
                <input
                  {...register("name")}
                  className="w-full h-8 rounded ps-2.5 active:ring-transparent focus:outline-none"
                  type="text"
                  placeholder="Your name"
                  id="name"
                  required
                />
                {errors?.name && (
                  <p className="text-center text-sm-leading-none text-custom-coral font-bold rounded-b">
                    {errors.name?.message}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-2.5 md:mt-2.5">
              <button
                type="submit"
                className="text-white bg-deep-blue rounded-xl px-7.5 py-3.75 font-serif font-bold text-xl-leading-none shadow-md shadow-natural-charcoal/40 capitalize w-full"
                disabled={loading}
              >
                Register now
              </button>
            </div>
          </form>
          <div className="mx-auto">
            <button
              className="font-bold py-2.5 leading-none"
              onClick={() => {
                checkAndCloseAll();
                openStateWithOverlay("isLoginModalOpen");
              }}
            >
              Already have an account? Login here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
