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
// loader is a custom class.
