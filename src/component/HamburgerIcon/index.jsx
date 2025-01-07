export default function HamburgerIcon() {
  return (
    <div className="fixed p-3.5 top-0 right-0 lg:collapse">
      <button className="p-1.5">
        <img src="/bars-solid.svg" alt="menu" className="w-7.5 h-6.5" />
      </button>
    </div>
  );
}
