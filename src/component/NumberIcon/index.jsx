/* eslint-disable react/prop-types */
export default function NumberIcon(props) {
  return (
    <figure>
      <img
        className={`bg-natural-charcoal rounded-full ${props.height}`}
        src={`/circle-${props.number}.svg`}
        alt={`number${props.number}`}
      />
    </figure>
  );
}
