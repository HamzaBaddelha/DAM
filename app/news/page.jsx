"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowUpRight, Building2, CalendarDays, Newspaper } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { TextAnimate } from "@/components/ui/text-animate";
import { content } from "@/data/content";

const pageCopy = {
  en: {
    eyebrow: "Corporate Newsroom",
    title: "News & Updates",
    subtitle:
      "A refined window into DAM Group Holding's latest announcements, strategic developments, and milestone-driven stories.",
    featuredLabel: "Featured Story",
    featuredTitle: "DAM Group Holding continues to expand with disciplined, sector-led momentum.",
    featuredBody:
      "Our growth story is built on governance, premium execution, and diversified investment platforms aligned with Saudi Vision 2030. This newsroom page highlights the group's evolving presence across priority sectors and strategic initiatives.",
    featuredMeta: ["Riyadh, Saudi Arabia", "Corporate Announcement", "2026"],
    stats: [
      ["Coverage", "Group-wide updates"],
      ["Focus", "Growth milestones"],
      ["Perspective", "Vision 2030 aligned"],
    ],
    latestTitle: "Latest Highlights",
    latestBody:
      "Track selected announcements, market-facing developments, and portfolio progress across DAM Group Holding's operating sectors.",
    articles: [
      {
        category: "Corporate",
        date: "June 2026",
        title: "DAM Group Holding strengthens its cross-sector investment narrative.",
        body:
          "The group continues to position its portfolio around resilient sectors, operational depth, and long-horizon value creation.",
      },
      {
        category: "Automotive",
        date: "May 2026",
        title: "Luxury Vehicles advances DAM's premium customer experience vision.",
        body:
          "The automotive platform reinforces DAM's focus on elevated retail environments, trusted distribution, and after-sales excellence.",
      },
      {
        category: "Strategy",
        date: "April 2026",
        title: "Vision 2030 remains central to DAM's expansion strategy.",
        body:
          "New opportunities are assessed through national alignment, disciplined execution, and the ability to deliver durable market impact.",
      },
    ],
    newsroomTitle: "Media Notes",
    newsroomBody:
      "For partnership opportunities, media inquiries, and corporate communication requests, DAM maintains a clear and professional communication standard across all public-facing touchpoints.",
    newsroomItems: [
      "Structured around long-term value, not short-term noise.",
      "Focused on premium presentation, clarity, and institutional trust.",
      "Connected to sectors that shape the Kingdom's future economy.",
    ],
    ctaLabel: "Explore DAM Group",
    ctaBody:
      "Return to the main experience to discover the group's sectors, organizational direction, and investment philosophy.",
    ctaLink: "Back To Homepage",
  },
  ar: {
    eyebrow: "المركز الإعلامي",
    title: "الأخبار والتحديثات",
    subtitle:
      "نافذة راقية على آخر إعلانات مجموعة دام القابضة وتطوراتها الاستراتيجية ومحطاتها المؤثرة.",
    featuredLabel: "خبر بارز",
    featuredTitle: "مجموعة دام القابضة تواصل التوسع بزخم منضبط تقوده القطاعات الاستراتيجية.",
    featuredBody:
      "تقوم قصة النمو لدينا على الحوكمة، والتنفيذ الراقي، ومنصات استثمارية متنوعة تتماشى مع رؤية المملكة 2030. تعرض هذه الصفحة أبرز التحديثات المتعلقة بحضور المجموعة وتطورها عبر القطاعات الرئيسية.",
    featuredMeta: ["الرياض، المملكة العربية السعودية", "إعلان مؤسسي", "2026"],
    stats: [
      ["التغطية", "تحديثات على مستوى المجموعة"],
      ["التركيز", "محطات النمو"],
      ["المنظور", "متوافق مع رؤية 2030"],
    ],
    latestTitle: "أحدث المستجدات",
    latestBody:
      "اطلع على مختارات من الإعلانات والتطورات السوقية وتقدم أعمال مجموعة دام القابضة عبر قطاعاتها التشغيلية.",
    articles: [
      {
        category: "مؤسسي",
        date: "يونيو 2026",
        title: "مجموعة دام القابضة تعزز حضورها الاستثماري عبر قطاعات متنوعة.",
        body:
          "تواصل المجموعة بناء محفظتها حول قطاعات مرنة وعمق تشغيلي ونهج استثماري طويل المدى يركز على القيمة المستدامة.",
      },
      {
        category: "السيارات",
        date: "مايو 2026",
        title: "العربات الفاخرة تدعم رؤية دام في تجربة العميل الراقية.",
        body:
          "يعزز قطاع السيارات توجه دام نحو بيئات عرض متقدمة وتوزيع موثوق وخدمات ما بعد البيع بمستوى احترافي مرتفع.",
      },
      {
        category: "استراتيجية",
        date: "أبريل 2026",
        title: "تبقى رؤية 2030 محورا رئيسيا في استراتيجية التوسع لدى دام.",
        body:
          "يتم تقييم الفرص الجديدة وفق المواءمة الوطنية والانضباط التنفيذي والقدرة على صناعة أثر سوقي ممتد.",
      },
    ],
    newsroomTitle: "ملاحظات إعلامية",
    newsroomBody:
      "في فرص الشراكات والاستفسارات الإعلامية وطلبات التواصل المؤسسي، تحافظ دام على معيار واضح واحترافي في جميع نقاط التواصل العامة.",
    newsroomItems: [
      "مرتكزة على قيمة طويلة المدى لا على الضجيج قصير الأجل.",
      "تركز على العرض الراقي والوضوح والثقة المؤسسية.",
      "مرتبطة بقطاعات تسهم في تشكيل اقتصاد المملكة المستقبلي.",
    ],
    ctaLabel: "استكشف مجموعة دام",
    ctaBody:
      "عد إلى التجربة الرئيسية لاكتشاف قطاعات المجموعة وتوجهها التنظيمي وفلسفتها الاستثمارية.",
    ctaLink: "العودة إلى الصفحة الرئيسية",
  },
};

export default function NewsPage() {
  const [lang, setLang] = useState("ar");
  const t = content[lang];
  const copy = pageCopy[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
  }, [lang, t.dir]);

  return (
    <main lang={lang} dir={t.dir} className="min-h-screen overflow-x-hidden bg-dam-beige">
      <Navbar t={t} lang={lang} setLang={setLang} linkPrefix="/" homeHref="/" />

      <section className="relative isolate overflow-hidden px-4 pb-16 pt-32 sm:px-6 lg:px-8 lg:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(155,111,76,0.18),transparent_34%),linear-gradient(180deg,rgba(244,239,230,0.92),rgba(230,220,200,0.96))]" />
        <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[url('/images/hero-baground.png')] bg-cover bg-center opacity-[0.16] lg:block" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className={t.dir === "rtl" ? "text-right" : "text-left"}>
            <TextAnimate
              as="p"
              by="word"
              animation="blurInUp"
              startOnView={false}
              className="text-xs font-bold uppercase tracking-[0.34em] text-dam-bronze"
            >
              {copy.eyebrow}
            </TextAnimate>
            <TextAnimate
              as="h1"
              by="word"
              animation="blurInUp"
              startOnView={false}
              className="mt-5 max-w-3xl premium-font text-4xl text-[#282328] sm:text-5xl lg:text-6xl"
            >
              {copy.title}
            </TextAnimate>
            <TextAnimate
              as="p"
              by="word"
              animation="blurInUp"
              startOnView={false}
              className="mt-6 max-w-2xl text-base leading-8 text-[#282328]/78 sm:text-lg"
            >
              {copy.subtitle}
            </TextAnimate>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {copy.stats.map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-[1.5rem] border border-dam-bronze/18 bg-white/45 p-5 shadow-[0_20px_60px_rgba(40,35,40,0.08)] backdrop-blur-xl"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-dam-bronze">{label}</p>
                  <p className="mt-3 text-base font-semibold text-[#282328]">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-dam-bronze/18 bg-[rgba(255,255,255,0.42)] p-5 shadow-[0_30px_90px_rgba(40,35,40,0.12)] backdrop-blur-2xl sm:p-7">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.22),rgba(230,220,200,0.1))]" />
            <div className="relative">
              <div className="flex items-center gap-3 text-dam-bronze">
                <Newspaper className="h-5 w-5" />
                <p className="text-xs font-bold uppercase tracking-[0.28em]">{copy.featuredLabel}</p>
              </div>

              <TextAnimate as="h2" by="word" animation="blurInUp" className="mt-5 premium-font text-3xl text-[#282328]">
                {copy.featuredTitle}
              </TextAnimate>
              <TextAnimate as="p" by="word" animation="blurInUp" className="mt-5 text-sm leading-8 text-[#282328]/78 sm:text-base">
                {copy.featuredBody}
              </TextAnimate>

              <div className="mt-6 flex flex-wrap gap-3">
                {copy.featuredMeta.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-dam-bronze/18 bg-white/55 px-4 py-2 text-xs font-semibold text-[#282328]"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-8 relative h-44 overflow-hidden rounded-[1.5rem] border border-dam-bronze/14">
                <Image
                  src="/images/company-full-logo.png"
                  alt="DAM Group Holding"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,20,23,0.08),rgba(23,20,23,0.35))]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-10 sm:px-6 lg:px-8 lg:pb-14">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-dam-bronze/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.42),rgba(244,239,230,0.7))] p-6 shadow-[0_24px_70px_rgba(40,35,40,0.08)] md:p-8">
          <div className={`flex flex-col gap-4 md:flex-row md:items-end md:justify-between ${t.dir === "rtl" ? "md:text-right" : "md:text-left"}`}>
            <div className="max-w-3xl">
              <TextAnimate as="p" by="word" animation="blurInUp" className="text-xs font-bold uppercase tracking-[0.34em] text-dam-bronze">
                {copy.latestTitle}
              </TextAnimate>
              <TextAnimate as="h2" by="word" animation="blurInUp" className="mt-4 premium-font text-3xl text-[#282328] md:text-4xl">
                {copy.latestTitle}
              </TextAnimate>
              <TextAnimate as="p" by="word" animation="blurInUp" className="mt-4 text-sm leading-8 text-[#282328]/75 md:text-base">
                {copy.latestBody}
              </TextAnimate>
            </div>
            <a
              href="/"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-dam-bronze/30 bg-[#282328] px-5 py-3 text-sm font-semibold text-[#F4EFE6] transition hover:bg-dam-bronze"
            >
              {copy.ctaLabel}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {copy.articles.map((article) => (
              <article
                key={article.title}
                className="rounded-[1.75rem] border border-dam-bronze/16 bg-white/55 p-6 shadow-[0_18px_50px_rgba(40,35,40,0.08)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full bg-dam-bronze/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-dam-bronze">
                    {article.category}
                  </span>
                  <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#282328]/65">
                    <CalendarDays className="h-4 w-4" />
                    {article.date}
                  </span>
                </div>

                <TextAnimate as="h3" by="word" animation="blurInUp" className="mt-5 premium-font text-2xl leading-tight text-[#282328]">
                  {article.title}
                </TextAnimate>
                <TextAnimate as="p" by="word" animation="blurInUp" className="mt-4 text-sm leading-8 text-[#282328]/75">
                  {article.body}
                </TextAnimate>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="overflow-hidden rounded-[2rem] border border-dam-bronze/18 bg-[#282328] p-6 text-[#F4EFE6] shadow-[0_28px_80px_rgba(40,35,40,0.16)] md:p-8">
            <div className="flex items-center gap-3 text-dam-bronze">
              <Building2 className="h-5 w-5" />
              <p className="text-xs font-bold uppercase tracking-[0.32em]">{copy.newsroomTitle}</p>
            </div>
            <TextAnimate as="h2" by="word" animation="blurInUp" className="mt-5 premium-font text-3xl text-[#F4EFE6]">
              {copy.newsroomTitle}
            </TextAnimate>
            <TextAnimate as="p" by="word" animation="blurInUp" className="mt-5 text-sm leading-8 text-[#F4EFE6]/78">
              {copy.newsroomBody}
            </TextAnimate>
            <div className="mt-6 space-y-3">
              {copy.newsroomItems.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.25rem] border border-white/10 bg-white/6 px-4 py-4 text-sm leading-7 text-[#F4EFE6]"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="relative overflow-hidden rounded-[2rem] border border-dam-bronze/18 bg-[rgba(255,255,255,0.48)] p-6 shadow-[0_28px_80px_rgba(40,35,40,0.1)] backdrop-blur-2xl md:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(155,111,76,0.14),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.18),rgba(244,239,230,0.62))]" />
            <div className={`relative flex h-full flex-col justify-between ${t.dir === "rtl" ? "text-right" : "text-left"}`}>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.32em] text-dam-bronze">{copy.ctaLabel}</p>
                <TextAnimate as="h2" by="word" animation="blurInUp" className="mt-4 premium-font text-3xl text-[#282328] md:text-4xl">
                  {copy.ctaLabel}
                </TextAnimate>
                <TextAnimate as="p" by="word" animation="blurInUp" className="mt-5 max-w-2xl text-sm leading-8 text-[#282328]/76 md:text-base">
                  {copy.ctaBody}
                </TextAnimate>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-5 rounded-[1.5rem] border border-dam-bronze/16 bg-white/55 p-5">
                <div className="relative h-14 w-40">
                  <Image
                    src="/images/logo.png"
                    alt="DAM Group Holding"
                    fill
                    sizes="160px"
                    className="object-contain object-left rtl:object-right"
                  />
                </div>
                <a
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full border border-dam-bronze/30 bg-[#282328] px-5 py-3 text-sm font-semibold text-[#F4EFE6] transition hover:bg-dam-bronze"
                >
                  {copy.ctaLink}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>

      <Footer t={t} linkPrefix="/" />
    </main>
  );
}
