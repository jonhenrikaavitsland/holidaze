/* eslint-disable react/prop-types */
export default function HeadingTwo(props) {
  return (
    <h2 className="font-serif font-bold text-center capitalize text-deep-blue text-xl-leading-none md:text-2xl-leading-none lg:text-3xl-leading-none mb-5 md:mb-7.5">
      {props.content}
    </h2>
  );
}
