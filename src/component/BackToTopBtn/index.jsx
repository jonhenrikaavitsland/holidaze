/**
 * Renders a "Back to Top" button that scrolls the window to the top when clicked.
 *
 * When the button is pressed, it triggers a scroll-to-top behavior using the browser's native scroll function.
 *
 * @component
 * @example
 * // Example usage:
 * import BackToTopBtn from './BackToTopBtn';
 *
 * function App() {
 *   return (
 *     <div>
 *       <BackToTopBtn />
 *     </div>
 *   );
 * }
 *
 * @returns {JSX.Element} The rendered Back to Top button component.
 */
export default function BackToTopBtn() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <div className="flex justify-center leading-none font-serif mt-5">
      <button
        className="py-2.5 capitalize hover:font-bold"
        onClick={scrollToTop}
      >
        back to top
      </button>
    </div>
  );
}
