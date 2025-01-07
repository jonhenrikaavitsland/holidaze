import HamburgerIcon from "../HamburgerIcon";
import Logo from "../Logo";

export default function Header() {
  return (
    <header className="flex justify-center p-5 bg-light-gray lg:justify-start lg:p-10 relative">
      <Logo />
      <HamburgerIcon />
    </header>
  );
}
