import { useEffect, useState } from "react";
import useAutStore from "../../js/store/useAuthStore";
import { login } from "../../js/api/auth";
import Logo from "../Logo";

export default function LoginModal() {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login: loginToStore, initializeAuth } = useAutStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, email, avatar, token } = await login(
        emailAddress,
        password,
      );
      loginToStore(name, email, avatar, token);
      // alert("Login successful");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="z-50 absolute">
      <div>
        <Logo />
      </div>
      <div>
        <section>
          <h2>Welcome Back</h2>
          <p>Login with your registered account</p>
        </section>
        {error && <p className="text-custom-coral">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              required
            />
          </div>
          <div>
            <div className="flex">
              <label htmlFor="password">Password</label>
              <button>Forgot your password?</button>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
