import Logo from "../Logo";
import useUIStore from "../../js/store/useUIStore";
import registerUser from "../../js/api/registerUser";
import useDataStore from "../../js/store/useDataStore";
import { useLocation } from "react-router-dom";
import useAuthStore from "../../js/store/useAuthStore";

export default function RegisterModal() {
  const location = useLocation();
  const { checkAndCloseAll, openStateWithOverlay } = useUIStore();
  const {
    name,
    setName,
    emailAddress,
    setEmailAddress,
    password,
    setPassword,
    error,
    setError,
  } = useDataStore();
  const { isLoggedIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isListingVenue =
      location.pathname.includes("list-your-venue") && !isLoggedIn;
    const updateToManager =
      location.pathname.includes("list-your-venue") && isLoggedIn;

    try {
      if (updateToManager) {
        // await updateUser()
      } else if (isListingVenue) {
        await registerUser(name, emailAddress, password, isListingVenue);
      } else {
        await registerUser(name, emailAddress, password, false);
      }
      checkAndCloseAll();
      openStateWithOverlay("isLoginModalOpen");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="flex flex-col gap-5 sm:min-w-72 min-w-96">
        <div>
          <Logo color={"white"} modal={true} />
        </div>
        <div className="bg-light-sky-blue rounded-xl flex flex-col gap-5 pt-5 px-5 pb-10 shadow-md shadow-natural-charcoal/40">
          <section className="text-center flex flex-col gap-2.5">
            <h2 className="font-serif text-xl-leading-none font-bold">
              Welcome Traveler
            </h2>
            <p>Register your account now</p>
          </section>
          {error && (
            <p className="text-custom-coral">
              {error || "An unknown error occurred"}
            </p>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-sm-leading-none font-medium"
              >
                Email
              </label>
              <div className="bg-white rounded border border-deep-blue/40">
                <input
                  className="w-full h-8 rounded ps-2.5"
                  type="text"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  placeholder="mail@stud.noroff.no"
                  id="email"
                  required
                />
                <p className="text-center text-sm-leading-none text-custom-coral font-bold rounded-b">
                  Example error
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-sm-leading-none font-medium">
                <label htmlFor="password">Password</label>
                <button type="button">Forgot your password?</button>
              </div>
              <div className="bg-white rounded border border-deep-blue/40">
                <input
                  className="w-full h-8 rounded ps-2.5"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  placeholder="*********"
                  required
                />
                <p className="text-center text-sm-leading-none text-custom-coral font-bold rounded-b">
                  Example error
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-sm-leading-none font-medium">
                <label htmlFor="name">Name</label>
              </div>
              <div className="bg-white rounded border border-deep-blue/40">
                <input
                  className="w-full h-8 rounded ps-2.5"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  required
                />
                <p className="text-center text-sm-leading-none text-custom-coral font-bold rounded-b">
                  Example error
                </p>
              </div>
            </div>
            <div className="mx-auto mb-2.5">
              <button
                type="submit"
                className="text-white bg-deep-blue rounded-xl px-7.5 py-3.75 font-serif font-bold text-xl-leading-none shadow-md shadow-natural-charcoal/40 capitalize"
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
