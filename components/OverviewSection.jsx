import Image from "next/image";
import SectionTitle from "./SectionTitle";
import { TextAnimate } from "@/components/ui/text-animate";

const symbols = ["01", "02", "03", "04"];

export default function OverviewSection({ t }) {
  return (
    <section id="overview" className="scroll-mt-24 bg-dam-cream px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-8 flex max-w-3xl justify-center">
            <Image
              src="/images/2030.png"
            alt={t.overview.logoAlt}
            width={360}
            height={202}
            className="h-auto w-full max-w-[360px] object-contain"
            priority={false}
          />
        </div>
        <SectionTitle title={t.overview.title} body={t.overview.body} dir={t.dir} locale={t.langLabel} />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {t.overview.items.map(([title, body], index) => (
            <article key={title} className="group border border-dam-bronze/20 bg-white/50 p-6 transition hover:-translate-y-1 hover:border-dam-bronze hover:shadow-bronze">
              <span className="text-sm font-bold tracking-[0.28em] text-dam-bronze">{symbols[index]}</span>
              <TextAnimate animation="blurInUp" dir={t.dir} locale={t.langLabel} as="h3" by="word" className="mt-8 text-xl font-semibold text-dam-dark">
                {title}
              </TextAnimate>
              <TextAnimate animation="blurInUp" dir={t.dir} locale={t.langLabel} as="p" by="word" className={`mt-4 text-dam-dark/68 ${t.dir === "rtl" ? "text-2xl leading-[1.9] md:text-3xl md:leading-[1.9]" : "text-sm leading-7"}`}>
                {body}
              </TextAnimate>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
