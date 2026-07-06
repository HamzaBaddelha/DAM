import Image from "next/image";

export default function SectionBadge({ label, tone = "light", className = "", showIcon = true }) {
  const isDark = tone === "dark";

  return (
    <div
      className={`inline-flex w-fit items-center gap-3 rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.28em] ${
        isDark
          ? "border-[#B99668]/28 bg-[#1b2422]/72 text-[#E9D3B0]"
          : "border-[#B99668]/24 bg-white/55 text-[#8F6A41]"
      } ${className}`}
    >
      {showIcon ? (
        <span className="relative h-5 w-5 overflow-hidden rounded-full border border-current/20 bg-white/10">
          <Image
            src="/images/unwan-aidiyafa/logo.png"
            alt=""
            fill
            sizes="20px"
            className="object-contain p-0.5"
            aria-hidden="true"
          />
        </span>
      ) : null}
      <span>{label}</span>
    </div>
  );
}
