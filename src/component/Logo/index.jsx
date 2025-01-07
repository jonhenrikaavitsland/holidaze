export default function Logo() {
  return (
    <div className="flex flex-col items-center">
      <div className="size-[3.125rem]">
        <img src="/public/logo_warm_200.png" alt="holidaze" />
      </div>
      <span className="font-mono text-xl-leading-none text-deep-blue">
        holidaze
      </span>
    </div>
  );
}
