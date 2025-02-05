/* eslint-disable react/prop-types */
export default function LinkBtn({
  className,
  content,
  handleViewChange,
  kind,
  status,
}) {
  return (
    <li>
      <button
        className={`font-serif text-xl-leading-none py-2.5 capitalize ${className} ${status && "font-bold"}`}
        onClick={() => handleViewChange(`${kind}`)}
      >
        {content}
      </button>
    </li>
  );
}
