/* eslint-disable react/prop-types */
export default function Label(props) {
  return (
    <label className={`${props.classes}`} htmlFor={props.target}>
      {props.content}
    </label>
  );
}
