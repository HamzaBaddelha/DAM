import Image from "next/image";
import { TextAnimate } from "@/components/ui/text-animate";

export default function Hero({ t }) {
  return (
    <section id="top" className="relative isolate min-h-screen overflow-hidden bg-dam-dark pt-24 text-dam-cream">
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/hero-baground.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="scale-105 object-cover blur-[2px]"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_20%,rgba(230,220,200,0.12),transparent_28%),linear-gradient(115deg,rgba(40,35,40,0.94),rgba(40,35,40,0.72)_48%,rgba(155,111,76,0.44)),linear-gradient(180deg,rgba(23,20,23,0.10),rgba(23,20,23,0.76))]" />

      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-7xl flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <TextAnimate
            animation="blurIn"
            as="span"
            by="word"
            className="mb-7 inline-flex border border-dam-bronze/50 bg-dam-bronze/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-dam-beige"
          >
            {t.hero.eyebrow}
          </TextAnimate>
          <div className="relative mb-6 h-24 w-full max-w-[520px] sm:h-32">
            <Image
              src="/images/logo.png"
              alt="DAM Group Holding"
              fill
              priority
              sizes="(min-width: 640px) 520px, 90vw"
              className="object-contain object-left rtl:object-right"
            />
          </div>
          <TextAnimate
            animation="blurInUp"
            as="h1"
            by="word"
            className="max-w-3xl text-5xl font-semibold leading-[1.02] text-white sm:text-6xl lg:text-7xl"
          >
            {t.hero.title}
          </TextAnimate>
          <TextAnimate
            animation="blurIn"
            as="p"
            by="word"
            className="mt-5 text-2xl font-medium text-dam-bronze sm:text-3xl"
          >
            {t.hero.subtitle}
          </TextAnimate>
          <p className="mt-6 max-w-3xl text-base leading-8 text-dam-cream/82 sm:text-lg">{t.hero.body}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#sectors"
              className="bg-dam-bronze px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[#875f40]"
            >
              {t.hero.primaryCta}
            </a>
            <a
              href="#about"
              className="border border-dam-beige/35 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-dam-cream transition hover:border-dam-bronze hover:text-dam-bronze"
            >
              {t.hero.secondaryCta}
            </a>
          </div>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {t.hero.stats.map(([label, value]) => (
            <div
              key={label}
              className="rounded-3xl border border-white/25 bg-white/12 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur-3xl transition hover:-translate-y-1 hover:border-dam-bronze/70 hover:bg-white/18"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-dam-beige/70">{label}</p>
              <p className="mt-2 text-xl font-semibold text-white">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
