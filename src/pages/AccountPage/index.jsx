/* eslint-disable react/prop-types */
import Heading from "../../component/Heading";
import useAuthStore from "../../js/store/useAuthStore";

export default function AccountPage() {
  const { user } = useAuthStore();
  return (
    <section className="flex flex-col gap-5 md:gap-7.5 lg:gap-10 px-5 md:px-7.5 lg:px-10 pt-5 md:pt-7.5 lg:pt-10 pb-10 md:pb-15 lg:pb-20">
      <Heading level="1" className="text-center text-deep-blue">
        Account
      </Heading>
      <div className="flex flex-col gap-10">
        <BioCard user={user} />
        <section>
          <Heading level="2" className="text-center text-deep-blue">
            Upcoming bookings
          </Heading>
        </section>
      </div>
    </section>
  );
}

function BioCard({ user }) {
  return (
    <div className="relative flex flex-col gap-5 lg:gap-7.5 pt-2.5 md:pt-5 lg:pt-7.5 pb-10 lg:pb-15 border border-natural-charcoal/40 rounded-xl">
      <div
        className="w-1/2 max-h-50 max-w-50 aspect-square rounded-full shadow-md shadow-natural-charcoal/40 bg-cover bg-no-repeat bg-center mx-auto"
        style={{ backgroundImage: `url(${user.avatar.url})` }}
        aria-label={user.avatar.alt}
      />
      <div className="absolute z-20 top-0 right-0">
        <button className="p-2.5 rounded-xl">
          <img src="/pen-solid.svg" alt="update image" className="h-5" />
        </button>
      </div>
      <div className="flex flex-col gap-2.5 lg:gap-3.75 text-center font-medium">
        <span className="capitalize text-xl-leading-none lg:text-2xl-leading-none">
          {user.name}
        </span>
        <span className="leading-none lg:text-xl-leading-none break-words">
          {user.email}
        </span>
      </div>
    </div>
  );
}
