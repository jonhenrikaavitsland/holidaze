import { useEffect, useState } from "react";
import listVenue from "../../../data/listVenue/listVenue.json";
import ListElement from "../../ListElement";
import useUIStore from "../../../js/store/useUIStore";
import useAuthStore from "../../../js/store/useAuthStore";
import useUpdateProfile from "../../../js/api/useUpdateProfile";
import Heading from "../../Heading";
import costaCalmaImage from "/src/data/locations/images/costa-calma_1.jpg";
import reviewImage from "/src/data/listVenue/venue.jpg";

export default function ListYourVenue() {
  const [data] = useState(listVenue);
  const { openStateWithOverlay, checkAndCloseAll } = useUIStore();
  const { isLoggedIn, isVenueManager, updateVenueManager } = useAuthStore();
  const { updateProfile, loading, error } = useUpdateProfile();

  useEffect(() => {
    document.title = "Venue Manager || Holidaze";

    const metaDescription = document.querySelector('meta[name="description"]');
    const content =
      "Become a Venue Manager with Holidaze and start listing your amazing venues now, making them accessible to thousands of holiday goers looking for a venue just like yours.";
    if (metaDescription) {
      metaDescription.setAttribute("content", content);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = content;
      document.head.appendChild(meta);
    }
  }, []);

  const handleClick = async () => {
    if (isLoggedIn) {
      try {
        const { venueManager } = await updateProfile();
        console.log("API RESPONSE:", venueManager);
        updateVenueManager(venueManager);
        console.log(
          "STORE isVenueManager:",
          useAuthStore.getState().isVenueManager,
        );
      } catch (err) {
        console.error("Error updating profile", err);
      }
    } else {
      checkAndCloseAll();
      openStateWithOverlay("isRegisterModalOpen");
    }
  };

  return (
    <div className="flex flex-col gap-10 md:gap-15 mb-10 md:mb-15 lg:mb-20">
      <div>
        <div
          className="bg-cover bg-center min-h-52 md:h-110 rounded-br-big shadow-md shadow-natural-charcoal/40"
          style={{
            backgroundImage: `url(${costaCalmaImage})`,
          }}
        ></div>
        <section className="px-5 pt-5 md:pt-7.5 md:px-7.5">
          <span className="font-serif italic font-bold text-2xl md:text-3xl-leading-150">
            {data.headingOne}
          </span>
        </section>
      </div>
      <section className="flex flex-col px-5 md:px-7.5 gap-5 md:gap-7.5">
        <Heading level="1" className="text-center text-deep-blue">
          {data.headingTwo}
        </Heading>
        <ul className="flex flex-col gap-5 md:gap-7.5">
          {data.list.map((item, index) => (
            <ListElement
              key={index}
              number={index + 1}
              height={"h-5 md:h-6 lg:h-7.5"}
              item={item}
              level="2"
              className
            />
          ))}
        </ul>
      </section>
      <div className="flex mx-5 md:mx-7.5 rounded-xl sm:flex-col min-h-44 md:h-52 shadow-md shadow-natural-charcoal/40">
        <div
          className="w-1/3 md:w-1/2 sm:w-full sm:h-40 sm:rounded-t-xl sm:rounded-b-none rounded-s-xl bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${reviewImage})` }}
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
              <Heading level="2" className="text-center text-deep-blue">
                {data.cta.title}
              </Heading>
              <p className="leading-none md:text-lg-leading-none">
                {data.cta.text}
              </p>
            </section>
            <div>
              {error ? (
                <p className="text-custom-coral font-bold">{error}</p>
              ) : (
                <button
                  className="py-3.75 md:py-5 px-7.5 md:px-10 bg-deep-blue text-white font-serif font-bold text-xl-leading-none md:text-2xl-leading-none rounded-xl shadow-md shadow-natural-charcoal/40 hover:bg-deep-blue/90"
                  onClick={handleClick}
                  disabled={loading}
                >
                  {loading ? "Updating..." : data.cta["cta-text"]}
                </button>
              )}
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
        <span>{data.final}</span>
      </section>
    </div>
  );
}
