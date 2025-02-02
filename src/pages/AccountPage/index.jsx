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
      <div>
        <BioCard user={user} />
      </div>
    </section>
  );
}

function BioCard({ user }) {
  return (
    <div className="relative flex flex-col pt-2.5 md:pt-5 lg:pt-7.5 border border-natural-charcoal/40 rounded-xl">
      <div
        className="h-50 w-50 rounded-full shadow-md shadow-natural-charcoal/40 bg-cover bg-center mx-auto"
        style={{ backgroundImage: `url(${user.avatar.url})` }}
        aria-label={user.avatar.alt} // Optional: for accessibility
      />
      <div className="absolute z-20 top-0 right-0">
        <button className="p-2.5 rounded-xl">
          <img src="/pen-solid.svg" alt="update image" className="h-5" />
        </button>
      </div>
    </div>
  );
}
