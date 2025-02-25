import { useEffect } from "react";
import useUIStore from "../../js/store/useUIStore";

/**
 * Renders an overlay component that covers the viewport and allows users to close open modals or alerts.
 *
 * The overlay dims the background using a semi-transparent dark layer and listens for click events to trigger the `closeAll` function
 * from the UI store, effectively closing any open UI elements. Additionally, if the alert modal is not open, a close button is displayed.
 *
 * When the overlay is rendered, it forces the user to scroll to the top and disables scrolling on the page until it is closed.
 *
 * @component
 * @example
 * // Example usage:
 * <Overlay />
 *
 * @returns {JSX.Element} The rendered overlay component.
 */
export default function Overlay() {
  const { closeAll, isAlertModalOpen } = useUIStore();

  // Scroll to the top when the component mounts.
  useEffect(() => {
    window.scrollTo(0, 0);
    // Disable scrolling on the body.
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Cleanup function to restore scrolling when the component unmounts.
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div
      className="absolute flex justify-end p-2.5 top-0 left-0 w-dvw h-dvh bg-natural-charcoal/80 z-40 cursor-pointer"
      onClick={closeAll}
    >
      <div className="lg:container lg:mx-auto flex w-full justify-center md:justify-end ">
        <div className={`${isAlertModalOpen ? "hidden" : ""}`}>
          <button className="p-2.5 hover:bg-white/20 rounded-xl">
            <img
              src="/xmark-solid-white.svg"
              alt="close"
              onClick={closeAll}
              className="w-6.5 h-6.5"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
