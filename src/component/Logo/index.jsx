export default function Logo() {
  return (
    <div className="inline-flex flex-col items-center md:flex-row md:h-[75px] md:items-start">
      <div className="w-[3.125rem]">
        <img src="/logo_warm_200.png" alt="holidaze" />
      </div>
      <div className="md:h-full md:flex md:items-end">
        <span className="font-mono text-xl-leading-none text-deep-blue md:text-5xl-50">
          holidaze
        </span>
      </div>
    </div>
  );
}
