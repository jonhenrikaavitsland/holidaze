import { useState } from "react";
import listVenue from "../../data/listVenue/listVenue.json";
import ListElement from "../../component/ListElement";
import useUIStore from "../../js/store/useUIStore";
import useAuthStore from "../../js/store/useAuthStore";

export default function ListYourVenue() {
  const [data] = useState(listVenue);
  const { openStateWithOverlay, checkAndCloseAll } = useUIStore();
  const { isLoggedIn, isVenueManager } = useAuthStore();

  return (
    <div className="flex flex-col gap-10 md:gap-15">
      <div>
        <div
          className="bg-cover bg-center min-h-52 md:h-110 rounded-br-big shadow-md shadow-natural-charcoal/40"
          style={{
            backgroundImage: `url('/src/data/locations/images/costa-calma_1.jpg')`,
          }}
        ></div>
        <section className="px-5 pt-5 md:pt-7.5 md:px-7.5">
          <h1 className="font-serif italic font-bold text-2xl md:text-3xl-leading-150">
            {data.headingOne}
          </h1>
        </section>
      </div>
      <section className="flex flex-col px-5 md:px-7.5 gap-5 md:gap-7.5">
        <h2 className="capitalize font-serif font-bold text-xl-leading-none md:text-2xl-leading-none text-deep-blue text-center ">
          {data.headingTwo}
        </h2>
        <ul className="flex flex-col gap-5 md:gap-7.5">
          {data.list.map((item, index) => (
            <ListElement
              key={index}
              number={index + 1}
              height={"h-4.5 md:h-5"}
              item={item}
            />
          ))}
        </ul>
      </section>
      <div className="flex mx-5 md:mx-7.5 rounded-xl sm:flex-col min-h-44 md:h-52 shadow-md shadow-natural-charcoal/40">
        <div
          className="w-1/3 md:w-1/2 sm:w-full sm:h-40 sm:rounded-t-xl sm:rounded-b-none rounded-s-xl bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${data.review[0].media.url})` }}
        ></div>
        <article className="bg-warm-beige sm:w-full w-2/3 md:w-1/2 sm:rounded-b-xl sm:rounded-t-none rounded-e-xl pt-2.5 md:pt-5 px-2.5 md:px-5 pb-5 md:p-10">
          <p className="font-serif font-light italic md:text-lg">
            &#8220;{data.review[0].text}&#8221;{" "}
            <span className="not-italic font-medium">
              {data.review[0].cite}
            </span>
          </p>
        </article>
      </div>
      {isVenueManager ? (
        ""
      ) : (
        <div className="flex flex-col text-center gap-10 mx-5 md:mx-7.5 md:gap-12.5">
          <div className="flex flex-col gap-5 md:gap-7.5">
            <section className="flex flex-col gap-2.5 md:gap-3.75">
              <h2 className="font-serif font-bold text-lg-leading-none md:text-xl-leading-none text-deep-blue">
                {data.cta.title}
              </h2>
              <p className="leading-none md:text-lg-leading-none">
                {data.cta.text}
              </p>
            </section>
            <div>
              <button
                className="py-3.75 md:py-5 px-7.5 md:px-10 bg-deep-blue text-white font-serif font-bold text-xl-leading-none md:text-2xl-leading-none rounded-xl shadow-md shadow-natural-charcoal/40 hover:bg-deep-blue/90"
                onClick={() => {
                  checkAndCloseAll();
                  openStateWithOverlay("isRegisterModalOpen");
                }}
              >
                {data.cta["cta-text"]}
              </button>
            </div>
          </div>

          {isLoggedIn ? (
            ""
          ) : (
            <div>
              <button
                className="sm:py-0 py-2.5 text-lg-leading-none"
                onClick={() => {
                  checkAndCloseAll();
                  openStateWithOverlay("isLoginModalOpen");
                }}
              >
                <span>{data.cta.else}</span>
                <span className="font-bold">{data.cta.elsePlus}</span>
                <span>{data.cta.elseLast}</span>
              </button>
            </div>
          )}
        </div>
      )}
      <section className="mx-5 md:mx-7.5 font-serif italic font-bold text-2xl md:text-4xl-leading-150">
        <h3>{data.final}</h3>
      </section>
    </div>
  );
}
