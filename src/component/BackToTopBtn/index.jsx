export default function BackToTopBtn() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <div className="flex justify-center leading-none font-serif ">
      <button
        className="py-2.5 capitalize hover:font-bold"
        onClick={scrollToTop}
      >
        back to top
      </button>
    </div>
  );
}
