"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { content } from "@/data/content";

const pageCopy = {
  en: {
    eyebrow: "Automotive Sector",
    title: "Luxury Vehicles",
    subtitle: "Premium automotive retail with a refined Saudi market presence.",
    overviewTitle: "Overview",
    overviewBody:
      "Luxury Vehicles represents DAM Group Holding's premium automotive direction in Saudi Arabia, offering a polished retail environment, trusted distribution capability, and a customer journey shaped around quality, precision, and elevated service.",
    highlightsTitle: "Core Strengths",
    highlights: [
      "Authorized distribution and premium brand presentation",
      "Customer-first retail experience across the ownership journey",
      "Integrated ecosystem including trade-in and customization support"
    ],
    secondaryTitle: "Market Presence",
    secondaryBody:
      "The platform supports a disciplined multi-brand automotive strategy with strong showroom identity, operational consistency, and a luxury service standard aligned with DAM Group Holding's broader investment philosophy.",
    backLabel: "Home Page",
    featureDescription:
      "We are more than a car showroom. At Luxury Cars, we offer unique driving experiences, driven by quality, innovation, and a commitment to Vision 2030. Every journey with us is exceptional",
    aboutBrandTitle: "About Jaecoo",
    aboutBrandBody:
      "Jaecoo is a modern brand under the Changan Group, designed specifically for durability and strength enthusiasts. Jaecoo vehicles withstand harsh conditions and challenging terrains, making them ideal for off-road driving and long adventures. Combining stability and powerful performance, Jaecoo offers a rugged design that ensures comfort and safety for drivers in all circumstances.",
    aboutBrandCta: "Click Here"
  },
  ar: {
    eyebrow: "قطاع السيارات",
    title: "العربات الفاخرة",
    subtitle: "تجربة سيارات راقية بحضور سوقي سعودي احترافي.",
    overviewTitle: "نبذة",
    overviewBody:
      "تمثل العربات الفاخرة توجه مجموعة دام القابضة في قطاع السيارات من خلال بيئة عرض راقية، وقدرات توزيع موثوقة، وتجربة عميل مصممة حول الجودة والدقة ومستوى خدمة مرتفع.",
    highlightsTitle: "نقاط القوة",
    highlights: [
      "توزيع معتمد وحضور احترافي لعلامات السيارات",
      "تجربة عميل متكاملة عبر كامل رحلة التملك",
      "منظومة داعمة تشمل الاستبدال والتخصيص والخدمات المساندة"
    ],
    secondaryTitle: "الحضور في السوق",
    secondaryBody:
      "يدعم هذا القطاع استراتيجية سيارات متعددة العلامات بانضباط تشغيلي وهوية عرض قوية ومعايير خدمة راقية تنسجم مع فلسفة مجموعة دام القابضة الاستثمارية.",
    backLabel: "الصفحة الرئيسية",
    featureDescription:
      "نحن أكثر من مجرد صالة عرض سيارات. في Luxury Cars نقدم تجارب قيادة استثنائية تقودها الجودة والابتكار والالتزام برؤية 2030. كل رحلة معنا تجربة مميزة.",
    aboutBrandTitle: "عن جايكو",
    aboutBrandBody:
      "جايكو علامة حديثة تحت مجموعة شانجان، صممت لعشاق المتانة والقوة. تتحمل مركبات جايكو الظروف القاسية والتضاريس الصعبة، ما يجعلها مناسبة للطرق الوعرة والرحلات الطويلة. وبفضل الجمع بين الثبات والأداء القوي، تقدم جايكو تصميما صلبا يضمن الراحة والأمان للسائقين في مختلف الظروف.",
    aboutBrandCta: "اضغط هنا"
  }
};

export default function LuxuryVehiclesPage() {
  const [lang, setLang] = useState("en");
  const t = content[lang];
  const copy = pageCopy[lang];
  const jaecooPanels = [
    { id: "panel-1", position: "18% center", overlay: "from-[#102742]/18 via-transparent to-transparent" },
    { id: "panel-2", position: "42% center", overlay: "from-[#0b1628]/68 via-[#08111f]/28 to-[#102742]/18" },
    { id: "panel-3", position: "62% center", overlay: "from-white/12 via-[#102742]/12 to-[#0b1628]/58" },
    { id: "panel-4", position: "84% center", overlay: "from-[#102742]/10 via-transparent to-[#0b1628]/45" }
  ];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
  }, [lang, t.dir]);

  return (
    <main lang={lang} dir={t.dir} className="min-h-screen overflow-x-hidden bg-[#123152]">
      <Navbar t={t} lang={lang} setLang={setLang} linkPrefix="/" homeHref="/" />

      <section className="relative isolate min-h-screen overflow-hidden bg-[#282328] pt-24">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/images/Media3.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/38" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.42),rgba(0,0,0,0.18)_42%,rgba(18,49,82,0.84)_100%)]" />
        <div className="relative min-h-[calc(100vh-6rem)] w-full" />
      </section>

      <section className="bg-[#123152] px-4 pb-8 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <a
            href="/#sectors"
            className="inline-flex w-fit border-b border-[#9B6F4C] pb-1 text-sm font-semibold text-[#9B6F4C] transition hover:text-[#F4EFE6]"
          >
            {copy.backLabel}
          </a>
        </div>
      </section>

      <section className="bg-[#123152] px-4 pb-24 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-[#9B6F4C]/20 shadow-[0_30px_90px_rgba(0,0,0,0.28)]">
            <div className="relative min-h-[420px] bg-[#0f2741] md:min-h-[560px]">
              <Image
                src="/images/luxuryvec-hero2.png"
                alt={copy.title}
                fill
                priority
                sizes="100vw"
                className="object-contain object-center"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,49,82,0.12),rgba(18,49,82,0.34)_55%,rgba(18,49,82,0.72)_100%)]" />
              <div className="absolute inset-x-4 bottom-4 md:inset-x-8 md:bottom-8">
                <div className="max-w-2xl rounded-[1.75rem] border border-white/18 bg-white/10 p-6 text-[#F4EFE6] shadow-[0_24px_60px_rgba(0,0,0,0.22)] backdrop-blur-2xl md:p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#9B6F4C]">{copy.title}</p>
                  <p className="mt-4 text-base leading-8 text-[#F4EFE6]/88 md:text-lg">
                    {copy.featureDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#123152] px-4 pb-50 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-6 overflow-visible md:gap-12">
          <div className="relative h-[150px] w-[460px] md:h-[220px] md:w-[680px]">
            <Image
              src="/images/company-full-logo.png"
              alt="Luxury Vehicles full logo"
              fill
              sizes="(min-width: 768px) 680px, 460px"
              className="scale-[1.65] object-contain object-center md:scale-[1.85]"
            />
          </div>
          <div className="relative h-[140px] w-[210px] md:h-[190px] md:w-[300px]">
            <Image
              src="/images/2030.png"
              alt="Vision 2030 logo"
              fill
              sizes="(min-width: 768px) 300px, 210px"
              className="object-contain object-center"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#123152] px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.38fr] lg:items-stretch">
          <div className="flex flex-col justify-center px-2 pt-3 text-[#F4EFE6] lg:px-6">
            <h2 className="text-4xl font-semibold leading-tight text-white md:text-5xl">{copy.aboutBrandTitle}</h2>
            <p className="mt-8 max-w-md text-sm leading-7 text-[#F4EFE6]/82 md:text-base">
              {copy.aboutBrandBody}
            </p>
            <a
              href="#"
              className="mt-10 inline-flex w-fit rounded-xl bg-white px-8 py-3 text-sm font-semibold text-[#123152] transition hover:bg-[#F4EFE6]"
            >
              {copy.aboutBrandCta}
            </a>
          </div>

          <div className="grid min-h-[520px] grid-cols-2 gap-3 md:grid-cols-4">
            {jaecooPanels.map((panel, index) => (
              <div
                key={panel.id}
                className="relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#0b1628] shadow-[0_18px_50px_rgba(0,0,0,0.28)]"
              >
                <Image
                  src="/images/luxuryvec-hero2.png"
                  alt={`${copy.aboutBrandTitle} panel ${index + 1}`}
                  fill
                  sizes="(min-width: 1024px) 18vw, (min-width: 768px) 24vw, 50vw"
                  className={index === 1 || index === 2 ? "object-cover blur-[2px]" : "object-cover"}
                  style={{ objectPosition: panel.position }}
                />
                <div className={`absolute inset-0 bg-gradient-to-b ${panel.overlay}`} />
                <div className="absolute inset-x-3 top-3 flex justify-start">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/20 text-sm text-white/90 backdrop-blur-md">
                    ↔
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer t={t} />
    </main>
  );
}
