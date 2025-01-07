import Logo from "../Logo";
import Navbar from "../Navbar";

export default function Header() {
  return (
    <header className="flex flex-col justify-center p-5 bg-light-gray lg:flex-row lg:justify-start lg:p-10 relative">
      <Logo />
      <Navbar />
    </header>
  );
}
