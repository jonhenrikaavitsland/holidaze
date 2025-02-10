/* eslint-disable react/prop-types */
export default function Paragraph({ spanContent, content }) {
  return (
    <p className="md:text-lg lg:text-xl">
      <span className="capitalize font-bold">{spanContent}</span>
      {content}
    </p>
  );
}
