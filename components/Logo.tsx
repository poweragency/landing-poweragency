// Marchio header/footer: monogramma ufficiale PAI (public/brand/mark.png, derivato
// dal logo master via scripts/brand/gen-assets.mjs) + wordmark "PowerAgency".
export default function Logo() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="grid h-[34px] w-[34px] place-items-center overflow-hidden rounded-[10px] border border-line-strong">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/mark.png"
          alt=""
          width={34}
          height={34}
          className="h-full w-full object-cover"
          aria-hidden
        />
      </span>
      <span className="font-head text-[1.18rem] font-bold tracking-tight">
        Power<span className="font-medium text-mut">Agency</span>
      </span>
    </span>
  );
}
