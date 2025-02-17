import { Link } from "react-router-dom";
import Heading from "../../Heading";
import { useEffect } from "react";

export default function DefaultPage() {
  // This is a 404 page

  useEffect(() => {
    document.title = "404 || Holidaze";

    const metaDescription = document.querySelector('meta[name="description"]');
    const content =
      "Got lost? Do not worry as Holidaze has you covered, lets go back and try again.";
    if (metaDescription) {
      metaDescription.setAttribute("content", content);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = content;
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <section className="flex flex-col gap-5 md:gap-7.5 lg:gap-10 text-center mt-5 md:mt-7.5 lg:mt-10">
      <div className="flex justify-center">
        <img src="/question-solid.svg" alt="question mark" className="h-30" />
      </div>
      <Heading level="1" className="text-deep-blue">
        Oops... There is nothing here
      </Heading>
      <p className="md:text-lg lg:text-xl">Please go back and try again.</p>
      <div className="py-3.75 px-7.5 md:py-5 md:px-10 lg:py-7.5 lg:px-15">
        <Link
          to="/"
          className="font-serif text-2xl-leading-none md:text-3xl-leading-none lg:text-4xl-leading-none text-nowrap bg-deep-blue text-white font-bold rounded-xl py-3.75 px-7.5 md:py-5 md:px-10 lg:py-7.5 lg:px-15"
        >
          Go Home
        </Link>
      </div>
    </section>
  );
}
