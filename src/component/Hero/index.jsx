/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import hero1 from "/src/data/hero/hero_1.jpg";
import hero2 from "/src/data/hero/hero_2.jpg";
import hero3 from "/src/data/hero/hero_3.jpg";
import hero4 from "/src/data/hero/hero_4.jpg";
// Image sources are specified in /src/data/hero/hero_1 through hero_4
// The images are from WikiCommons which is under Creative Commons License and if altered, these images has only had their DPI converted to 72.

const images = [hero1, hero2, hero3, hero4];

/**
 * Renders a Hero section with a rotating background image and an overlay heading.
 *
 * The Hero component cycles through a predefined array of images every 20 seconds.
 * It implements a fade-out effect before switching to the next image, then fades in the new image.
 * A heading overlay is rendered on top of the background, displaying a fixed title.
 * The background images are imported from local files and are provided under a Creative Commons License.
 *
 * @component
 * @example
 * // Example usage:
 * <Hero />
 *
 * @returns {JSX.Element} The rendered Hero section component.
 */
export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
        setFade(true);
      }, 1000);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className={`h-60 md:h-[480px] bg-cover bg-center pt-7.5 md:pt-23 col-span-full row-start-1 row-end-3 relative`}
    >
      <BackgroundWrapper currentImage={currentImage} fade={fade} />
      <Heading />
    </section>
  );
}

/**
 * Renders the heading overlay for the Hero section.
 *
 * Displays a centered heading with a semi-transparent dark background and stylized text.
 *
 * @component
 * @example
 * // Example usage:
 * <Heading />
 *
 * @returns {JSX.Element} The rendered heading overlay.
 */
function Heading() {
  return (
    <div className="bg-natural-charcoal/80 text-white font-serif font-black text-center text-2xl md:text-[2.5rem] p-4 md:p-7.5 z-20 relative">
      <h1>We know Fuerteventura!</h1>
    </div>
  );
}

/**
 * Renders the background image wrapper with a fade transition effect.
 *
 * This component applies the background image based on the current image index and
 * uses a CSS transition to fade the image in or out according to the fade state.
 *
 * @component
 * @param {object} props - The component props.
 * @param {number} props.currentImage - The index of the current image to display.
 * @param {boolean} props.fade - Indicates whether the fade-in effect should be active.
 *
 * @example
 * // Example usage:
 * <BackgroundWrapper currentImage={0} fade={true} />
 *
 * @returns {JSX.Element} The rendered background image wrapper with fade effect.
 */
function BackgroundWrapper({ currentImage, fade }) {
  return (
    <div
      className={`z-10 bg-cover bg-center transition-opacity duration-1000 absolute inset-0 ${fade ? "opacity-100" : "opacity-0"}`}
      style={{ backgroundImage: `url(${images[currentImage]})` }}
    ></div>
  );
}
