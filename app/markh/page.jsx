"use client";

import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Film, Flame, MapPin, UtensilsCrossed } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { TextAnimate } from "@/components/ui/text-animate";
import { content } from "@/data/content";

const pageCopy = {
  en: {
    eyebrow: "Nutrition & F&B",
    title: "Markh Restaurant",
    subtitle:
      "A heritage-led dining concept shaped around authentic Saudi flavors, warm hospitality, and a refined presentation of traditional cuisine.",
    backLabel: "Back To Sectors",
    heroBadge: "Heritage Dining Experience",
    heroCaption: "Authentic Saudi dining elevated through warm design, traditional recipes, and a premium guest experience.",
    heroPanelLabel: "Markh Journey",
    heroPanelTitle: "Explore The Experience",
    heroPanelLinks: [
      ["About Markh", "#about"],
      ["The Setting", "#dishes"],
      ["In Motion", "#motion"],
    ],
    stats: [
      ["Cuisine", "Traditional Saudi"],
      ["Experience", "Heritage dining"],
      ["Location", "Riyadh presence"],
    ],
    introLabel: "About Markh",
    introTitle: "Rooted In Arabian Heritage",
    introBody:
      "Markh Restaurant represents DAM Group Holding's direction in food and beverage through an experience centered on Saudi identity, carefully prepared traditional dishes, and a setting that balances cultural authenticity with a polished guest journey.",
    introAccent:
      "The latest visual material reinforces that identity through an illuminated facade, warm hospitality cues, majlis-inspired comfort, and a richer sense of place.",
    settingLabel: "The Setting",
    settingTitle: "A Guest Journey Framed By Heritage",
    settingBody:
      "The new visuals show Markh through its illuminated facade, warm reception, textured walls, branded details, and inviting seating moments that shape the guest experience from arrival onward.",
    settingImageLabel: "Spatial Character",
    settingImageBody:
      "Layered materials, intimate lighting, and Arabian references create a more memorable guest arrival and dining rhythm.",
    overviewLabel: "Hospitality Mood",
    overviewTitle: "Warmth, Materiality, And Presence",
    overviewBody:
      "Across the space, Markh uses lighting, texture, and measured details to turn a traditional dining visit into something warmer, more immersive, and more memorable.",
    highlightTitle: "What Defines Markh",
    highlights: [
      "Authentic heritage dishes prepared with a contemporary hospitality standard.",
      "A visual identity inspired by deep Arabian culture and warm materiality.",
      "A guest experience built around comfort, quality, and memorable presentation.",
    ],
    signatureLabel: "Signature Selection",
    signatureTitle: "Traditional Dishes, Carefully Presented",
    signatureBody:
      "From Haneeth and Madhbi to Jareesh and Qursan, the menu reflects familiar Saudi flavors delivered with consistency, craft, and attention to detail.",
    dishes: ["Haneeth", "Madhbi", "Jareesh", "Qursan"],
    settingCards: [
      {
        title: "Arrival Facade",
        accent: "First Impression",
        body: "A strong street-level welcome with illuminated signage and a clear Markh identity.",
      },
      {
        title: "Heritage Seating",
        accent: "Majlis Warmth",
        body: "Majlis-inspired comfort, warm tones, and a hospitality mood that feels grounded and refined.",
      },
      {
        title: "Warm Reception",
        accent: "Guest Arrival",
        body: "Polished service cues, menu presentation, and material warmth shape the first impression.",
      },
    ],
    motionLabel: "In Motion",
    motionTitle: "Markh In Real Atmosphere",
    motionBody:
      "Short video moments bring the restaurant to life, showing the scale, warmth, and movement of the guest experience across the space.",
    motionFeatureTitle: "A Living Hospitality Reel",
    motionFeatureBody:
      "Instead of treating the clips like static tiles, the motion section now reads as a sequence: one lead atmosphere film supported by smaller live moments across the restaurant.",
    motionCards: [
      ["Arrival Sequence", "The facade and illuminated street presence set the tone before entry."],
      ["Guest Flow", "Movement through the interior reveals warmth, order, and a refined service rhythm."],
      ["Dining Mood", "Short lived-in moments give the brand a more human and cinematic feel."],
      ["Spatial Detail", "Texture, lighting, and architectural framing keep the experience memorable."],
    ],
    visitLabel: "Discover DAM Group",
    visitBody:
      "Return to the main experience to explore DAM Group Holding's broader portfolio and sector strategy.",
    visitLink: "Back To Homepage",
  },
  ar: {
    eyebrow: "قطاع الأغذية",
    title: "مطعم مرخ",
    subtitle:
      "تجربة ضيافة مستوحاة من التراث السعودي تقدم النكهات الأصيلة بروح راقية وحضور بصري دافئ.",
    backLabel: "العودة إلى القطاعات",
    heroBadge: "تجربة ضيافة تراثية",
    heroCaption: "مطبخ سعودي أصيل بتصميم دافئ وتقديم راق وتجربة ضيف مصممة بعناية.",
    heroPanelLabel: "رحلة مرخ",
    heroPanelTitle: "استكشف التجربة",
    heroPanelLinks: [
      ["عن مرخ", "#about"],
      ["المكان", "#dishes"],
      ["في الحركة", "#motion"],
    ],
    stats: [
      ["المطبخ", "سعودي تراثي"],
      ["التجربة", "ضيافة أصيلة"],
      ["الموقع", "حضور في الرياض"],
    ],
    introLabel: "عن مرخ",
    introTitle: "متجذر في عمق التراث العربي",
    introBody:
      "يمثل مطعم مرخ توجه مجموعة دام القابضة في قطاع الأغذية والمشروبات من خلال تجربة ترتكز على الهوية السعودية، والأطباق الشعبية الأصيلة، وأسلوب تقديم يجمع بين صدق التراث واحترافية الضيافة.",
    introAccent:
      "وتؤكد المواد البصرية الجديدة هذه الهوية عبر الواجهة المضيئة، ودفء الاستقبال، والجلسات المستوحاة من المجلس، والإحساس الواضح بالمكان.",
    settingLabel: "المكان",
    settingTitle: "رحلة ضيف مؤطرة بالتراث",
    settingBody:
      "تعرض الصور الجديدة مرخ من خلال واجهته المضيئة، والاستقبال الدافئ، والحوائط الملمسية، والتفاصيل البصرية للعلامة، ولحظات الجلوس التي تصنع التجربة منذ لحظة الوصول.",
    settingImageLabel: "الطابع المكاني",
    settingImageBody:
      "الخامات المتدرجة والإضاءة الهادئة والإشارات العربية تمنح الوصول والجلوس إيقاعا بصريا أكثر ثراء ووضوحا.",
    overviewLabel: "مزاج الضيافة",
    overviewTitle: "دفء وحضور وهوية مادية واضحة",
    overviewBody:
      "يعتمد مرخ على الإضاءة والخامات وتفاصيل العرض ليحوّل الزيارة التراثية إلى تجربة أكثر دفئا وثراء وحضورا في الذاكرة.",
    highlightTitle: "ما الذي يميز مرخ",
    highlights: [
      "أطباق تراثية أصيلة تقدم بمعيار ضيافة معاصر.",
      "هوية بصرية مستلهمة من العمق العربي ودفء المواد التراثية.",
      "تجربة ضيف مبنية على الراحة والجودة وحسن التقديم.",
    ],
    signatureLabel: "مختارات مميزة",
    signatureTitle: "أطباق شعبية تقدم بعناية",
    signatureBody:
      "من الحنيذ والمظبي إلى الجريش والقرصان، تعكس القائمة نكهات سعودية أصيلة تقدم بثبات وجودة واهتمام واضح بالتفاصيل.",
    dishes: ["الحنيذ", "المظبي", "الجريش", "القرصان"],
    settingCards: [
      {
        title: "واجهة الوصول",
        accent: "الانطباع الأول",
        body: "استقبال بصري قوي على مستوى الشارع مع إضاءة واضحة وهوية مرخ الحاضرة بقوة.",
      },
      {
        title: "جلسات تراثية",
        accent: "دفء المجلس",
        body: "راحة مستوحاة من المجلس مع أجواء دافئة وتجربة ضيافة متزنة وراقية.",
      },
      {
        title: "استقبال دافئ",
        accent: "لحظة الوصول",
        body: "تفاصيل الخدمة والعرض البصري والقرب الإنساني تشكل الانطباع الأول للضيف.",
      },
    ],
    motionLabel: "في الحركة",
    motionTitle: "مرخ في أجوائه الحقيقية",
    motionBody:
      "تعرض المقاطع القصيرة دفء المكان وحركته وحضور التجربة الضيافية داخل المطعم بصورة أكثر واقعية.",
    motionFeatureTitle: "شريط حي للضيافة",
    motionFeatureBody:
      "بدلا من عرض المقاطع كشبكة ثابتة، أصبحت هذه المساحة تسرد التجربة كمشهد رئيسي تدعمه لحظات حية أصغر عبر المطعم.",
    motionCards: [
      ["مشهد الوصول", "الواجهة والحضور البصري في الشارع يمنحان الانطباع الأول قبل الدخول."],
      ["حركة الضيف", "الحركة داخل الفراغ تكشف الدفء والتنظيم وإيقاع الخدمة بشكل أوضح."],
      ["مزاج المكان", "اللقطات الحية تضيف إحساسا إنسانيا وسينمائيا أقوى للعلامة."],
      ["تفاصيل الفراغ", "الملامس والإضاءة وبناء المشهد تجعل التجربة أكثر رسوخا في الذاكرة."],
    ],
    visitLabel: "استكشف مجموعة دام",
    visitBody:
      "عد إلى التجربة الرئيسية لاكتشاف محفظة مجموعة دام القابضة وقطاعاتها الاستثمارية.",
    visitLink: "العودة إلى الصفحة الرئيسية",
  },
};

const heroPoster = { src: "/images/realistic/3.jpeg", altEn: "Markh restaurant storefront", altAr: "واجهة مطعم مرخ" };
const heroVideoSrc = "/images/realistic/%23Video%20(26).mp4";
const introImageSrc = "/images/realistic/1.jpeg";
const settingImageSrc = "/images/realistic/2.jpeg";
const motionVideos = [
  "/images/realistic/%23Video%20(25).mp4",
  "/images/realistic/%23Video%20(27).mp4",
  "/images/realistic/%23Video%20(28).mp4",
  "/images/realistic/%23Video%20(42).mp4",
];

export default function MarkhPage() {
  const [lang, setLang] = useState("en");
  const t = content[lang];
  const copy = pageCopy[lang];
  const pageRef = useRef(null);
  const heroMediaRef = useRef(null);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
  }, [lang, t.dir]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const heroMedia = heroMediaRef.current;

      if (heroMedia) {
        gsap.fromTo(
          heroMedia,
          { scale: 1.08, y: 0 },
          {
            scale: 1,
            y: 56,
            ease: "none",
            scrollTrigger: {
              trigger: heroMedia,
              start: "top top",
              end: "bottom top",
              scrub: 1.1,
            },
          }
        );
      }

      gsap.utils.toArray("[data-markh-reveal]").forEach((element, index) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 56 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            delay: index * 0.06,
            scrollTrigger: {
              trigger: element,
              start: "top 86%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} lang={lang} dir={t.dir} className="min-h-screen overflow-x-hidden bg-dam-beige">
      <Navbar t={t} lang={lang} setLang={setLang} linkPrefix="/" homeHref="/" />

      <section className="relative isolate min-h-[100svh] overflow-hidden bg-[#1f1714] pt-24 md:pt-28">
        <div
          ref={heroMediaRef}
          className="absolute inset-0 will-change-transform"
        >
          <video
            className="h-full w-full object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={heroPoster.src}
          >
            <source src={heroVideoSrc} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,12,10,0.26)_0%,rgba(18,12,10,0.34)_24%,rgba(18,12,10,0.68)_72%,rgba(230,220,200,0.96)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(196,125,74,0.34),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(196,125,74,0.18),transparent_28%)]" />
        </div>

        <div className="relative mx-auto flex min-h-[calc(100svh-6rem)] max-w-7xl flex-col justify-end px-4 pb-10 sm:px-6 md:pb-12 lg:px-8 lg:pb-16">
          <a
            href="/#sectors"
            className="mb-6 inline-flex w-fit rounded-full border border-white/18 bg-white/10 px-4 py-2 text-sm font-semibold text-[#F4EFE6] backdrop-blur-xl transition hover:border-dam-bronze hover:text-[#F7D2B2] md:mb-8"
          >
            {copy.backLabel}
          </a>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.96fr)_minmax(320px,0.7fr)] lg:items-end lg:gap-8">
            <div className={t.dir === "rtl" ? "text-right" : "text-left"} data-markh-reveal>
              <p className="inline-flex rounded-full border border-white/18 bg-white/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.3em] text-[#F7D2B2] backdrop-blur-xl">
                {copy.heroBadge}
              </p>
              <TextAnimate
                as="p"
                by="word"
                animation="blurInUp"
                startOnView={false}
                className="mt-6 text-xs font-bold uppercase tracking-[0.34em] text-[#F7D2B2]"
              >
                {copy.eyebrow}
              </TextAnimate>
              <TextAnimate
                as="h1"
                by="word"
                animation="blurInUp"
                startOnView={false}
                className="mt-5 max-w-4xl premium-font text-4xl text-[#F4EFE6] sm:text-5xl md:text-6xl xl:text-7xl"
              >
                {copy.title}
              </TextAnimate>
              <TextAnimate
                as="p"
                by="word"
                animation="blurInUp"
                startOnView={false}
                className="mt-6 max-w-2xl text-base leading-7 text-[#F4EFE6]/85 sm:text-lg sm:leading-8"
              >
                {copy.subtitle}
              </TextAnimate>
              <TextAnimate as="p" by="word" animation="blurInUp" className="mt-5 max-w-2xl text-sm leading-7 text-[#F4EFE6]/72 sm:text-base sm:leading-8">
                {copy.heroCaption}
              </TextAnimate>

              <div className="mt-8 grid gap-3 sm:grid-cols-3 sm:gap-4">
                {copy.stats.map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-[1.35rem] border border-white/16 bg-white/12 p-4 shadow-[0_20px_60px_rgba(18,12,10,0.18)] backdrop-blur-[26px] sm:p-5"
                  >
                    <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#F7D2B2]">{label}</p>
                    <p className="mt-3 text-base font-semibold text-[#F4EFE6]">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="rounded-[1.9rem] border border-white/14 bg-white/10 p-5 text-[#F4EFE6] shadow-[0_24px_70px_rgba(18,12,10,0.22)] backdrop-blur-[28px] sm:p-6"
              data-markh-reveal
            >
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#F7D2B2]">
                {copy.heroPanelLabel}
              </p>
              <TextAnimate as="h2" by="word" animation="blurInUp" className="mt-4 premium-font text-2xl text-[#F4EFE6] md:text-3xl">
                {copy.heroPanelTitle}
              </TextAnimate>
              <div className="mt-6 grid gap-3">
                {copy.heroPanelLinks.map(([label, href], index) => (
                  <a
                    key={label}
                    href={href}
                    className="group flex items-center justify-between rounded-[1.2rem] border border-white/10 bg-black/10 px-4 py-4 transition hover:border-[#F7D2B2]/35 hover:bg-black/18"
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid h-8 w-8 place-items-center rounded-full border border-[#F7D2B2]/30 text-xs font-bold text-[#F7D2B2]">
                        0{index + 1}
                      </span>
                      <span className="text-sm font-medium text-[#F4EFE6]">{label}</span>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-[#F7D2B2] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="px-4 pb-10 pt-10 sm:px-6 lg:px-8 lg:pb-14 lg:pt-14">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <article
            data-markh-reveal
            className="rounded-[2rem] border border-dam-bronze/18 bg-[rgba(255,255,255,0.5)] p-5 shadow-[0_24px_70px_rgba(40,35,40,0.08)] backdrop-blur-2xl sm:p-6 md:p-8"
          >
            <TextAnimate as="p" by="word" animation="blurInUp" className="text-xs font-bold uppercase tracking-[0.32em] text-dam-bronze">
              {copy.introLabel}
            </TextAnimate>
            <TextAnimate as="h2" by="word" animation="blurInUp" className="mt-4 premium-font text-3xl text-[#282328] md:text-5xl">
              {copy.introTitle}
            </TextAnimate>
            <TextAnimate as="p" by="word" animation="blurInUp" className="mt-5 text-sm leading-8 text-[#282328]/76 md:text-base">
              {copy.introBody}
            </TextAnimate>
            <TextAnimate as="p" by="word" animation="blurInUp" className="mt-5 max-w-2xl text-sm leading-8 text-[#282328]/68 md:text-base">
              {copy.introAccent}
            </TextAnimate>
          </article>

          <div
            data-markh-reveal
            className="relative min-h-[300px] overflow-hidden rounded-[2rem] border border-dam-bronze/18 shadow-[0_30px_90px_rgba(40,35,40,0.16)] md:min-h-[460px]"
          >
            <Image
              src={introImageSrc}
              alt={copy.introTitle}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,20,23,0.08),rgba(23,20,23,0.14)_45%,rgba(23,20,23,0.42)_100%)]" />
          </div>
        </div>
      </section>

      <section id="dishes" className="px-4 pb-10 sm:px-6 lg:px-8 lg:pb-14">
        <div className="mx-auto max-w-7xl">
          <div data-markh-reveal className={t.dir === "rtl" ? "text-right" : "text-left"}>
            <TextAnimate as="p" by="word" animation="blurInUp" className="text-xs font-bold uppercase tracking-[0.32em] text-dam-bronze">
              {copy.settingLabel}
            </TextAnimate>
            <TextAnimate as="h2" by="word" animation="blurInUp" className="mt-4 premium-font text-3xl text-[#282328] md:text-5xl">
              {copy.settingTitle}
            </TextAnimate>
            <TextAnimate as="p" by="word" animation="blurInUp" className="mt-5 max-w-3xl text-sm leading-8 text-[#282328]/76 md:text-base">
              {copy.settingBody}
            </TextAnimate>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
            <div
              data-markh-reveal
              className="relative min-h-[320px] overflow-hidden rounded-[1.9rem] border border-dam-bronze/16 shadow-[0_24px_70px_rgba(40,35,40,0.12)] md:min-h-[500px]"
            >
              <Image
                src={settingImageSrc}
                alt={copy.settingTitle}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,20,23,0.08),rgba(23,20,23,0.18)_56%,rgba(23,20,23,0.55)_100%)]" />
              <div className="absolute inset-x-5 bottom-5 rounded-[1.5rem] border border-white/12 bg-[#1f1714]/45 p-5 text-[#F4EFE6] backdrop-blur-xl sm:inset-x-6 sm:bottom-6 sm:p-6">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#F7D2B2]">{copy.settingImageLabel}</p>
                <TextAnimate as="p" by="word" animation="blurInUp" className="mt-4 text-sm leading-7 text-[#F4EFE6]/78 sm:text-base sm:leading-8">
                  {copy.settingImageBody}
                </TextAnimate>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {copy.settingCards.map((card, index) => (
                <article
                  key={card.title}
                  data-markh-reveal
                  className="relative overflow-hidden rounded-[1.75rem] border border-dam-bronze/24 bg-[linear-gradient(180deg,#2c221d_0%,#1f1714_100%)] p-6 text-[#F4EFE6] shadow-[0_24px_70px_rgba(40,35,40,0.18)] backdrop-blur-xl"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(247,210,178,0.16),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0))]" />

                  <div className="relative flex items-center gap-3 text-[#F7D2B2]">
                    <span
                      className="grid h-10 w-10 place-items-center rounded-full border border-[#F7D2B2]/26 bg-white/8 text-sm font-bold text-[#F7D2B2]"
                    >
                      0{index + 1}
                    </span>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#F7D2B2]/86">{card.accent}</p>
                      <TextAnimate as="h3" by="word" animation="blurInUp" className="premium-font text-2xl text-[#F4EFE6]">
                        {card.title}
                      </TextAnimate>
                    </div>
                  </div>
                  <TextAnimate as="p" by="word" animation="blurInUp" className="relative mt-5 text-base font-medium leading-8 text-[#F4EFE6]/92 md:text-[1.05rem] md:leading-9">
                    {card.body}
                  </TextAnimate>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-10 sm:px-6 lg:px-8 lg:pb-14">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article
            data-markh-reveal
            className="rounded-[2rem] border border-dam-bronze/18 bg-[rgba(255,255,255,0.5)] p-5 shadow-[0_24px_70px_rgba(40,35,40,0.08)] backdrop-blur-2xl sm:p-6 md:p-8"
          >
            <div className="flex items-center gap-3 text-dam-bronze">
              <UtensilsCrossed className="h-5 w-5" />
              <p className="text-xs font-bold uppercase tracking-[0.3em]">{copy.overviewLabel}</p>
            </div>
            <TextAnimate as="h2" by="word" animation="blurInUp" className="mt-5 premium-font text-3xl text-[#282328] md:text-4xl">
              {copy.overviewTitle}
            </TextAnimate>
            <TextAnimate as="p" by="word" animation="blurInUp" className="mt-5 text-sm leading-8 text-[#282328]/76 md:text-base">
              {copy.overviewBody}
            </TextAnimate>
          </article>

          <article
            data-markh-reveal
            className="rounded-[2rem] border border-dam-bronze/18 bg-[#282328] p-5 text-[#F4EFE6] shadow-[0_28px_80px_rgba(40,35,40,0.16)] sm:p-6 md:p-8"
          >
            <div className="flex items-center gap-3 text-dam-bronze">
              <Flame className="h-5 w-5" />
              <p className="text-xs font-bold uppercase tracking-[0.3em]">{copy.highlightTitle}</p>
            </div>
            <div className="mt-6 space-y-3">
              {copy.highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.25rem] border border-white/10 bg-white/6 px-4 py-4 text-sm leading-7 text-[#F4EFE6]"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section id="motion" className="px-4 pb-10 sm:px-6 lg:px-8 lg:pb-14">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-dam-bronze/18 bg-[linear-gradient(180deg,#201714_0%,#2a211d_35%,#4a3528_100%)] p-5 shadow-[0_24px_70px_rgba(40,35,40,0.12)] sm:p-6 md:p-8">
          <div data-markh-reveal className={t.dir === "rtl" ? "text-right" : "text-left"}>
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#F4EFE6]">{copy.motionLabel}</p>
            <TextAnimate as="h2" by="word" animation="blurInUp" className="mt-4 premium-font text-3xl text-[#F4EFE6] md:text-5xl">
              {copy.motionTitle}
            </TextAnimate>
            <TextAnimate as="p" by="word" animation="blurInUp" className="mt-5 max-w-3xl text-sm leading-8 text-[#F4EFE6]/76 md:text-base">
              {copy.motionBody}
            </TextAnimate>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[0.96fr_1.04fr]">
            <div
              data-markh-reveal
              className="relative min-h-[320px] overflow-hidden rounded-[1.9rem] border border-white/10 bg-[#120d0c] shadow-[0_30px_90px_rgba(0,0,0,0.26)] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[560px]"
            >
              <video
                className="absolute inset-0 h-full w-full scale-[1.46] object-cover object-[center_56%] sm:scale-[1.38] md:scale-[1.28] md:object-[center_54%] lg:scale-[1.2] lg:object-[center_52%]"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster={heroPoster.src}
              >
                <source src={heroVideoSrc} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,8,8,0.04),rgba(12,8,8,0.14)_45%,rgba(12,8,8,0.62)_100%)]" />
            </div>

            <div className="grid gap-4 md:gap-5">
              {motionVideos.map((src, index) => (
                <div
                  key={src}
                  data-markh-reveal
                  className={`overflow-hidden rounded-[1.6rem] border border-white/10 bg-[rgba(255,255,255,0.06)] shadow-[0_22px_55px_rgba(0,0,0,0.16)] backdrop-blur-xl ${
                    index % 2 === 0 ? "lg:mr-10" : "lg:ml-10"
                  }`}
                >
                  <div className="grid gap-0 md:grid-cols-[200px_1fr] lg:grid-cols-[220px_1fr]">
                    <div className="relative min-h-[200px] md:min-h-full">
                      <video
                        className="h-full w-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                      >
                        <source src={src} type="video/mp4" />
                      </video>
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,8,8,0.03),rgba(12,8,8,0.25))]" />
                    </div>

                    <div className="flex flex-col justify-center p-5 sm:p-6">
                      <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#F4EFE6]">
                        0{index + 1}
                      </p>
                      <TextAnimate as="h3" by="word" animation="blurInUp" className="mt-3 premium-font text-2xl text-[#F4EFE6]">
                        {copy.motionCards[index][0]}
                      </TextAnimate>
                      <TextAnimate as="p" by="word" animation="blurInUp" className="mt-4 text-sm leading-7 text-white/85">
                        {copy.motionCards[index][1]}
                      </TextAnimate>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article
            data-markh-reveal
            className="relative overflow-hidden rounded-[2rem] border border-dam-bronze/18 bg-[rgba(255,255,255,0.48)] p-5 shadow-[0_28px_80px_rgba(40,35,40,0.1)] backdrop-blur-2xl sm:p-6 md:p-8"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(155,111,76,0.14),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.18),rgba(244,239,230,0.62))]" />
            <div className={`relative ${t.dir === "rtl" ? "text-right" : "text-left"}`}>
              <div className="flex items-center gap-3 text-dam-bronze">
                <MapPin className="h-5 w-5" />
                <p className="text-xs font-bold uppercase tracking-[0.3em]">{copy.signatureLabel}</p>
              </div>
              <TextAnimate as="h2" by="word" animation="blurInUp" className="mt-5 premium-font text-3xl text-[#282328] md:text-4xl">
                {copy.signatureTitle}
              </TextAnimate>
              <TextAnimate as="p" by="word" animation="blurInUp" className="mt-5 text-sm leading-8 text-[#282328]/76 md:text-base">
                {copy.signatureBody}
              </TextAnimate>

              <div className="mt-6 flex flex-wrap gap-3">
                {copy.dishes.map((dish) => (
                  <span
                    key={dish}
                    className="rounded-full border border-dam-bronze/20 bg-white/60 px-4 py-2 text-sm font-semibold text-[#282328]"
                  >
                    {dish}
                  </span>
                ))}
              </div>
            </div>
          </article>

          <article
            data-markh-reveal
            className="rounded-[2rem] border border-dam-bronze/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.4),rgba(244,239,230,0.72))] p-5 shadow-[0_28px_80px_rgba(40,35,40,0.08)] sm:p-6 md:p-8"
          >
            <p className="text-xs font-bold uppercase tracking-[0.32em] text-dam-bronze">{copy.visitLabel}</p>
            <TextAnimate as="h2" by="word" animation="blurInUp" className="mt-4 premium-font text-3xl text-[#282328] md:text-4xl">
              {copy.visitLabel}
            </TextAnimate>
            <TextAnimate as="p" by="word" animation="blurInUp" className="mt-5 max-w-2xl text-sm leading-8 text-[#282328]/76 md:text-base">
              {copy.visitBody}
            </TextAnimate>

            <a
              href="/"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-dam-bronze/30 bg-[#282328] px-5 py-3 text-sm font-semibold text-[#F4EFE6] transition hover:bg-dam-bronze"
            >
              {copy.visitLink}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </article>
        </div>
      </section>

      <section id="contact">
        <Footer t={t} linkPrefix="/" />
      </section>
    </main>
  );
}
