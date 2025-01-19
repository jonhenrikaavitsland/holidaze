/* eslint-disable react/prop-types */
export default function NumberIcon({ number, size }) {
  return (
    <figure>
      <img
        className={`bg-natural-charcoal rounded-full h-${size} w-${size}`}
        src={`/circle-${number}.svg`}
        alt={`number${number}`}
      />
    </figure>
  );
}
