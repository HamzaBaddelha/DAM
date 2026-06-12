import { TextAnimate } from "@/components/ui/text-animate";

export default function SectionTitle({ eyebrow, title, body, align = "center", tone = "light" }) {
  const alignment = align === "start" ? "items-start text-start" : "items-center text-center";
  const titleColor = tone === "dark" ? "text-dam-cream" : "text-dam-dark";
  const bodyColor = tone === "dark" ? "text-dam-cream/72" : "text-dam-dark/72";

  return (
    <div className={`mx-auto mb-10 flex max-w-3xl flex-col ${alignment}`}>
      {eyebrow && (
        <TextAnimate
          animation="blurIn"
          as="span"
          by="word"
          className="mb-3 inline-flex border border-dam-bronze/35 bg-dam-bronze/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-dam-bronze"
        >
          {eyebrow}
        </TextAnimate>
      )}
      <TextAnimate
        animation="blurInUp"
        as="h2"
        by="word"
        className={`text-3xl font-semibold sm:text-4xl lg:text-5xl ${titleColor}`}
      >
        {title}
      </TextAnimate>
      {body && (
        <TextAnimate animation="blurInUp" as="p" by="word" className={`mt-5 text-base leading-8 sm:text-lg ${bodyColor}`}>
          {body}
        </TextAnimate>
      )}
    </div>
  );
}
