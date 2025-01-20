import { useState } from "react";
import listVenue from "../../data/listVenue/listVenue.json";
import ListElement from "../../component/ListElement";

export default function ListYourVenue() {
  const [data] = useState(listVenue);

  return (
    <div className="flex flex-col gap-10">
      <div>
        <div
          className="bg-cover bg-center min-h-52 rounded-br-big shadow-md shadow-natural-charcoal/40"
          style={{
            backgroundImage: `url('/src/data/locations/images/costa-calma_1.jpg')`,
          }}
        ></div>
        <section className="px-5 pt-5">
          <h1 className="font-serif italic font-bold text-2xl ">
            {data.headingOne}
          </h1>
        </section>
      </div>
      <section className="flex flex-col px-5 gap-5">
        <h2 className="capitalize font-serif font-bold text-xl-leading-none text-deep-blue text-center ">
          {data.headingTwo}
        </h2>
        <ul className="flex flex-col gap-5">
          {data.list.map((item, index) => (
            <ListElement
              key={index}
              number={index + 1}
              height={"h-4.5"}
              item={item}
            />
          ))}
        </ul>
      </section>
      <div className="flex mx-5 rounded-xl sm:flex-col min-h-44">
        <div
          className="w-1/3 sm:w-full sm:h-40 sm:rounded-t-xl sm:rounded-b-none rounded-s-xl bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${data.review[0].media.url})` }}
        ></div>
        <article className="bg-warm-beige w-2/3 sm:w-full sm:rounded-b-xl sm:rounded-t-none rounded-e-xl pt-2.5 px-2.5 pb-5 shadow-md shadow-natural-charcoal/40">
          <p>&#8220;{data.review[0].text}&#8221;</p>
        </article>
      </div>
      <div className="flex flex-col text-center gap-10 mx-5">
        <div className="flex flex-col gap-5">
          <section className="flex flex-col gap-2.5">
            <h2 className="font-serif font-bold text-lg-leading-none text-deep-blue">
              {data.cta.title}
            </h2>
            <p>{data.cta.text}</p>
          </section>
          <div>
            <button className="py-3.75 px-7.5 bg-deep-blue text-white font-serif font-bold text-xl-leading-none rounded-xl shadow-md shadow-natural-charcoal/40 hover:bg-deep-blue/90">
              {data.cta["cta-text"]}
            </button>
          </div>
        </div>
        <div>
          <button className="sm:py-0 py-2.5">
            <span>{data.cta.else}</span>
            <span className="font-bold">{data.cta.elsePlus}</span>
            <span>{data.cta.elseLast}</span>
          </button>
        </div>
      </div>
      <section className="mx-5 font-serif italic font-bold text-2xl">
        <h3>{data.final}</h3>
      </section>
    </div>
  );
}
