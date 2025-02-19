import useAuthStore from "../../js/store/useAuthStore";
import Logo from "../Logo";
import useUIStore from "../../js/store/useUIStore";
import { useLocation, useNavigate } from "react-router-dom";
import useLogin from "../../js/api/useLogin";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../js/validation/loginSchema";
import sanitizeEmail from "../../js/sanitize/sanitizeEmail";

/**
 * Renders a modal login form that allows users to log in with their registered account.
 *
 * The modal provides a form for inputting an email and password, which are validated using react-hook-form and Yup.
 * User input is sanitized before submission, and upon successful authentication via the login API,
 * the authentication store is updated and the modal is closed. Additionally, if the current route includes "list-your-venue",
 * the user is navigated to the venue hub.
 *
 * @component
 * @example
 * // Example usage:
 * <LoginModal />
 *
 * @returns {JSX.Element} The rendered login modal component.
 */
export default function LoginModal() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, loading } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { login: loginToStore } = useAuthStore();
  const { closeAll, checkAndCloseAll, openStateWithOverlay } = useUIStore();

  const onSubmit = async (data) => {
    const { email, password } = data;

    const sanitizedEmail = sanitizeEmail(email);
    const sanitizedPassword = password.trim();

    try {
      const {
        name,
        email: emailAddress,
        avatar,
        token,
        venueManager,
      } = await login(sanitizedEmail, sanitizedPassword);

      loginToStore(name, emailAddress, avatar, token, venueManager);
      closeAll();
      if (location.pathname.includes("list-your-venue")) {
        navigate("/venue-hub/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="flex flex-col md:flex-row gap-5 sm:min-w-72 min-w-96 md:w-192 md:bg-light-sky-blue md:rounded-xl md:shadow-md md:shadow-natural-charcoal/40">
        <div className="md:w-1/2 md:order-last md:flex md:items-center md:justify-center">
          <Logo modal={true} className="text-deep-blue" />
        </div>
        <div className="bg-light-sky-blue rounded-xl flex flex-col gap-5 pt-5 px-5 pb-10 shadow-md shadow-natural-charcoal/40 md:w-1/2 md:shadow-none ">
          <section className="text-center flex flex-col gap-2.5">
            <h2 className="font-serif text-xl-leading-none font-bold">
              Welcome Back
            </h2>
            <p>Login with your registered account</p>
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
                <button
                  type="button"
                  onClick={() => {
                    checkAndCloseAll();
                    openStateWithOverlay("isRegisterModalOpen");
                  }}
                >
                  Forgot your password?
                </button>
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
            <div className="mb-2.5 md:mt-2.5">
              <button
                type="submit"
                className="text-white bg-deep-blue rounded-xl px-7.5 py-3.75 font-serif font-bold text-xl-leading-none shadow-md shadow-natural-charcoal/40 w-full"
                disabled={loading}
              >
                Login
              </button>
            </div>
          </form>
          <div className="mx-auto">
            <button
              className="font-bold py-2.5 leading-none"
              onClick={() => {
                checkAndCloseAll();
                openStateWithOverlay("isRegisterModalOpen");
              }}
            >
              Not yet registered? Register here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
