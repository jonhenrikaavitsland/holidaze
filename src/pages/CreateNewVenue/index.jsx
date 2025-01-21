import BreadCrumb from "../../component/Breadcrumb";

export default function CreateNewVenue() {
  return (
    <div>
      {<BreadCrumb />}
      <section className="pt-5 px-5 pb-10">
        <h1 className="font-bold font-serif text-deep-blue text-xl-leading-none text-center">
          Create new Venue
        </h1>
      </section>
    </div>
  );
}
