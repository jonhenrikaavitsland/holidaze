import useAuthStore from "../../js/store/useAuthStore";
import Logo from "../Logo";
import useUIStore from "../../js/store/useUIStore";
import { useLocation, useNavigate } from "react-router-dom";
import useLogin from "../../js/api/useLogin";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../js/validation/loginSchema";
import sanitizeEmail from "../../js/sanitize/sanitizeEmail";
import useAlertStore from "../../js/store/useAlertStore";
import handleLogInError from "../../js/errorHandling/handleLogInError";

export default function LoginModal() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { login: loginToStore } = useAuthStore();
  const { closeAll, checkAndCloseAll, openStateWithOverlay } = useUIStore();

  const { setAlert, clearAlert } = useAlertStore();

  const handleOk = () => {
    clearAlert();
    closeAll();
  };

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
      const { title, message } = handleLogInError(error.status);
      setTimeout(() => {
        checkAndCloseAll();
        setAlert(
          title,
          message,
          "ok-only",
          handleOk,
          "",
          "bg-custom-coral text-white",
        );
        setTimeout(() => {
          openStateWithOverlay("isAlertModalOpen");
        }, 1000);
      }, 500);
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
                <button type="button">Forgot your password?</button>
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
