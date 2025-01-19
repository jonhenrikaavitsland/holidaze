import { useState } from "react";
import useAutStore from "../../js/store/useAuthStore";
import { login } from "../../js/api/auth";
import Logo from "../Logo";
import useUIStore from "../../js/store/useUIStore";
import useManagerStore from "../../js/store/useManagerStore";

export default function LoginModal() {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login: loginToStore } = useAutStore();
  const { closeAll } = useUIStore();
  const { isManager } = useManagerStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, email, avatar, token, venueManager } = await login(
        emailAddress,
        password,
        isManager,
      );
      loginToStore(name, email, avatar, token, venueManager);
      // alert("Login successful");
      closeAll();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
      <div className="flex flex-col gap-5 sm:min-w-72 min-w-96 ">
        <div>
          <Logo color={"white"} modal={true} />
        </div>
        <div className="bg-light-sky-blue rounded-xl flex flex-col gap-5 pt-5 px-5 pb-10 shadow-md shadow-natural-charcoal/40  ">
          <section className="text-center flex flex-col gap-2.5">
            <h2 className="font-serif text-xl-leading-none font-bold">
              Welcome Back
            </h2>
            <p>Login with your registered account</p>
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
            <div className="mx-auto mb-2.5">
              <button
                type="submit"
                className="text-white bg-deep-blue rounded-xl px-7.5 py-3.75 font-serif font-bold text-xl-leading-none shadow-md shadow-natural-charcoal/40"
              >
                Login
              </button>
            </div>
            <div className="mx-auto">
              <button className="font-bold py-2.5 leading-none">
                Not yet registered? Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
