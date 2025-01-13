import Hero from "../../component/Hero";
import SearchBox from "../../component/SearchBox";

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-rows-hero grid-cols-hero md:grid-cols-heroMd md:grid-rows-heroMd lg:grid-cols-heroLg relative">
        <div className="row-start-1 row-end-3 col-span-full bg-natural-charcoal"></div>
        <Hero />
        <SearchBox />
      </div>
      <h2 className="font-serif font-bold text-center text-deep-blue text-xl-leading-none mb-5">
        Explore Fuerteventura
      </h2>
    </div>
  );
}
