import Logo from "../Logo";

export default function Header() {
  return (
    <div className="flex justify-center p-5 bg-light-gray lg:justify-start lg:p-10">
      <Logo />
    </div>
  );
}
