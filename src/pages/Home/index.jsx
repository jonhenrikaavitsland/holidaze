import Hero from "../../component/Hero";
import SearchBox from "../../component/SearchBox";

export default function Home() {
  return (
    <>
      <div className="grid grid-rows-hero grid-cols-hero md:grid-cols-heroMd md:grid-rows-heroMd relative">
        <Hero />
        <SearchBox />
      </div>
    </>
  );
}
