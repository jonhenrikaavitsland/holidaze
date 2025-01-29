/* eslint-disable react/prop-types */
export default function Heading({ level, children }) {
  const Tag = `h${level}`;

  return <Tag>{children}</Tag>;
}
