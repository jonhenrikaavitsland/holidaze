/* eslint-disable react/prop-types */
export default function Heading({ level, className, children }) {
  const Tag = `h${level}`;

  let classes;

  if (Tag === "h1") {
    classes =
      "text-2xl-leading-none md:text-3xl-leading-none lg:text-4xl-leading-none";
  }
  if (Tag === "h2") {
    classes =
      "text-xl-leading-none md:text-2xl-leading-none lg:text-3xl-leading-none";
  }
  if (Tag === "h3") {
    classes =
      "text-lg-leading-none md:text-xl-leading-none lg:text-2xl-leading-none";
  }

  return (
    <Tag className={`font-serif font-bold capitalize ${classes} ${className}`}>
      {children}
    </Tag>
  );
}
