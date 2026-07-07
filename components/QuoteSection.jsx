import { TextAnimate } from "@/components/ui/text-animate";

export default function QuoteSection({ t }) {
  return (
    <section id="legacy" className="relative overflow-hidden bg-[#E6DCC8] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="relative overflow-hidden rounded-[2rem] border border-[#9B6F4C]/25 bg-[#282328]/90 p-8 text-[#F4EFE6] shadow-2xl backdrop-blur-xl md:p-12 lg:p-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#9B6F4C]/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#E6DCC8]/10 blur-3xl"
          />

          <div className="relative z-10 grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#9B6F4C]">{t.quote.kicker}</p>
              <div className="mt-6 h-px w-32 bg-[#9B6F4C]" />
            </div>
            <div className="border-t border-[#9B6F4C]/70 pt-8 md:border-s-4 md:border-t-0 md:ps-7 md:pt-0">
              {t.quote.lines.map((line) => (
                <TextAnimate
                  key={line}
                  animation="blurInUp"
                  dir={t.dir}
                  locale={t.langLabel}
                  as="p"
                  by="word"
                  className="mb-5 text-3xl font-semibold leading-tight text-[#F4EFE6] last:mb-0 md:text-5xl"
                >
                  {line}
                </TextAnimate>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
