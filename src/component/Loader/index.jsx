/**
 * Renders a loader animation component.
 *
 * This component displays a custom CSS-based loader animation inspired by designs from loading.io (CC0 License).
 * It consists of multiple animated div elements that create an ellipsis effect.
 *
 * @component
 * @example
 * // Example usage:
 * <Loader />
 *
 * @returns {JSX.Element} The rendered loader animation.
 */
export default function Loader() {
  /* Source https://loading.io/css/
  //  CC0 License which means we can use it freely */
  return (
    <div className="text-deep-blue box-border inline-block relative w-20 h-20">
      <div className="loader left-2 animate-ldsEllipsis1"></div>
      <div className="loader left-2 animate-ldsEllipsis2"></div>
      <div className="loader left-8 animate-ldsEllipsis2"></div>
      <div className="loader left-14 animate-ldsEllipsis3"></div>
    </div>
  );
}
// loader is a custom CSS class.
