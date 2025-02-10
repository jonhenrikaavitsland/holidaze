/* eslint-disable react/prop-types */
export default function ViewMoreBtn({ data, paginateData }) {
  return (
    <button
      onClick={() => paginateData(data, 10)}
      className="font-serif font-bold text-xl-leading-none md:text-2xl-leading-none lg:text-3xl-leading-none capitalize text-natural-charcoal bg-golden-yellow rounded-xl shadow-md shadow-natural-charcoal/40 hover:bg-golden-yellow/90 mt-5 md:mt-7.5 lg:mt-10 py-3.75 px-7.5 md:py-5 md:px-10"
    >
      load more
    </button>
  );
}
