import { useEffect, useState } from "react";
import hero1 from "/src/data/hero/hero_1.jpg";
import hero2 from "/src/data/hero/hero_2.jpg";
import hero3 from "/src/data/hero/hero_3.jpg";
import hero4 from "/src/data/hero/hero_4.jpg";

const images = [hero1, hero2, hero3, hero4];

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
      className={`h-60 md:h-[480px] bg-cover bg-center transition-all duration-1000 pt-7.5 md:pt-23 col-span-full row-start-1 row-end-3 z-10 relative ${fade ? "opacity-100" : "opacity-0"}`}
      style={{ backgroundImage: `url(${images[currentImage]})` }}
    >
      <Heading />
    </section>
  );
}

function Heading() {
  return (
    <div className="bg-natural-charcoal/80 text-white font-serif font-black text-center text-2xl md:text-[2.5rem] p-4 md:p-7.5">
      <h1>We know Fuerteventura!</h1>
    </div>
  );
}
