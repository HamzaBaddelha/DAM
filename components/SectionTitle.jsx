import { TextAnimate } from "@/components/ui/text-animate";

export default function SectionTitle({ eyebrow, title, body, align = "center", tone = "light", dir, locale }) {
  const alignment = align === "start" ? "items-start text-start" : "items-center text-center";
  const titleColor = tone === "dark" ? "text-dam-cream" : "text-dam-dark";
  const bodyColor = tone === "dark" ? "text-dam-cream/72" : "text-dam-dark/72";
  const bodySize = dir === "rtl" ? "text-2xl leading-[1.9] md:text-3xl md:leading-[1.9]" : "text-base leading-8 sm:text-lg";

  return (
    <div className={`mx-auto mb-10 flex max-w-3xl flex-col ${alignment}`}>
      {eyebrow && (
        <TextAnimate
          animation="blurIn"
          dir={dir}
          locale={locale}
          as="span"
          by="word"
          className="mb-3 inline-flex border border-dam-bronze/35 bg-dam-bronze/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-dam-bronze"
        >
          {eyebrow}
        </TextAnimate>
      )}
      <TextAnimate
        animation="blurInUp"
        dir={dir}
        locale={locale}
        as="h2"
        by="word"
        className={`text-3xl font-semibold sm:text-4xl lg:text-5xl ${titleColor}`}
      >
        {title}
      </TextAnimate>
      {body && (
        <TextAnimate animation="blurInUp" dir={dir} locale={locale} as="p" by="word" className={`mt-5 ${bodySize} ${bodyColor}`}>
          {body}
        </TextAnimate>
      )}
    </div>
  );
}
