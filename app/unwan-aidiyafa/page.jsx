"use client";

import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  BellRing,
  Building2,
  CarFront,
  CookingPot,
  Dumbbell,
  KeyRound,
  Laptop,
  SlidersHorizontal,
  Sparkles,
  SunMedium,
  Waves,
  Wrench,
} from "lucide-react";
import Footer from "@/components/Footer";
import GlassCard from "@/components/GlassCard";
import { AngledSlider } from "@/components/lightswind/angled-slider";
import Strands from "@/components/motions/Strands";
import Navbar from "@/components/Navbar";
import { TextAnimate } from "@/components/ui/text-animate";
import ProjectCarousel from "@/components/unwan-aidiyafa/ProjectCarousel";
import SectionBadge from "@/components/unwan-aidiyafa/SectionBadge";
import { content } from "@/data/content";

const logoSrc = "/images/unwan-aidiyafa/logo.png";
const heroImageSrc = "/images/unwan-aidiyafa/DSC07730.jpg";
const aboutSliderImages = [
  {
    id: "dsc-02819",
    url: "/images/unwan-aidiyafa/DSC02819.jpg",
    alt: "Unwan AlDiyafa residential entrance view",
    title: "Arrival Identity",
  },
  {
    id: "dsc-07730",
    url: "/images/unwan-aidiyafa/DSC07730.jpg",
    alt: "Unwan AlDiyafa villa facade",
    title: "Architectural Calm",
  },
  {
    id: "dsc-09029",
    url: "/images/unwan-aidiyafa/DSC09029.jpg",
    alt: "Unwan AlDiyafa outdoor residential space",
    title: "Outdoor Lifestyle",
  },
  {
    id: "dsc-02862",
    url: "/images/unwan-aidiyafa/DSC02862.jpg",
    alt: "Unwan AlDiyafa residential composition",
    title: "Spatial Rhythm",
  },
  {
    id: "dsc-02857",
    url: "/images/unwan-aidiyafa/DSC02857.jpg",
    alt: "Unwan AlDiyafa façade detailing",
    title: "Material Detail",
  },
  {
    id: "dsc-02796",
    url: "/images/unwan-aidiyafa/DSC02796.jpg",
    alt: "Unwan AlDiyafa premium housing view",
    title: "Premium Living",
  },
  {
    id: "dsc-02806",
    url: "/images/unwan-aidiyafa/DSC02806.jpg",
    alt: "Unwan AlDiyafa residential landscape edge",
    title: "Quiet Landscape",
  },
];

const pageCopy = {
  en: {
    backLabel: "Back To Sectors",
    heroKicker: "Residential Hospitality",
    heroTitleLines: ["Unwan", "AlDiyafa"],
    heroTagline: "Hospitality with a Signature - Towards Smarter, Sustainable Living",
    heroIntro:
      "Unwan AlDiyafa develops premium residential communities where privacy, calm service, and modern living standards shape a more refined daily living experience.",
    logoAlt: "Unwan AlDiyafa logo",
    stats: [
      ["Experience", "Premium living"],
      ["Focus", "Comfort & privacy"],
      ["Operations", "24/7 standards"],
    ],
    aboutBadge: "About / Philosophy",
    aboutTitle: "Luxury Living Framed By Hospitality Standards",
    aboutBody:
      "We develop residential communities that deliver a refined living experience combining luxury, privacy, and modern lifestyle - within thoughtfully designed environments offering comfort, balance, and tranquility. Integrated 24/7 management standards, premium facilities, responsive service, and professional hospitality create a calm, secure environment that reflects modern luxury living.",
    aboutAlt: "Unwan AlDiyafa residential architecture",
    counters: [
      { value: 8, suffix: "", label: "Projects", note: "" },
      { value: 287, suffix: "", label: "Residential Units", note: "" },
      { value: 2, suffix: "", label: "Cities", note: "Riyadh & Al Khobar" },
      { value: 24, suffix: "/7", label: "Operations", note: "" },
    ],
    projectsBadge: "Portfolio",
    projectsTitle: "Our Projects Overview",
    projectsBody:
      "A curated residential portfolio spanning furnished communities and villa-led living products across Riyadh and Al Khobar.",
    projectLabel: "Project",
    projectCarouselLabel: "Unwan AlDiyafa projects carousel",
    previousProject: "Previous project",
    nextProject: "Next project",
    goToProject: "Go to project",
    amenitiesBadge: "Living Experience",
    amenitiesTitle: "Amenities Designed For Daily Ease",
    amenitiesBody:
      "The living experience is shaped by practical, resident-first amenities delivered with a hospitality mindset rather than a bare residential checklist.",
    leaseBadge: "Leasing Flexibility",
    leaseTitle: "Flexible Terms For Different Living Rhythms",
    leaseBody:
      "The portfolio supports multiple leasing horizons, from shorter furnished stays to long-term residential commitments.",
    leaseNote:
      "Unit formats range from studios starting at 40 m2 to villas reaching 250 m2, depending on the project.",
    closingBadge: "Unwan AlDiyafa",
    closingTitle: "Hospitality with a Signature - Towards Smarter, Sustainable Living",
    closingBody:
      "Explore a residential hospitality brand built around calm environments, responsive operations, and premium living standards.",
    contactButton: "Contact Us",
    visitButton: "Visit dyafa.sa",
    ctaImageAlt: "Unwan AlDiyafa premium residential setting",
  },
  ar: {
    backLabel: "العودة إلى القطاعات",
    heroKicker: "ضيافة سكنية",
    heroTitleLines: ["عنوان", "الضيافة"],
    heroTagline: "للضيافة عنوان .. نحو عائد مستدام",
    heroIntro:
      "تطور عنوان الضيافة مجتمعات سكنية راقية حيث تصنع الخصوصية والخدمة الهادئة ومعايير المعيشة العصرية تجربة يومية أكثر تميزا واتزانا.",
    logoAlt: "شعار عنوان الضيافة",
    stats: [
      ["التجربة", "سكن راق"],
      ["التركيز", "الراحة والخصوصية"],
      ["التشغيل", "معايير على مدار الساعة"],
    ],
    aboutBadge: "عن العلامة / الفلسفة",
    aboutTitle: "معيشة فاخرة تصوغها معايير الضيافة",
    aboutBody:
      "نطور مجتمعات سكنية لتجربة معيشية راقية تجمع بين الرفاهية والخصوصية وأسلوب الحياة العصري، ضمن بيئات سكنية مصممة بعناية تمنح السكان أعلى مستويات الراحة والهدوء. نعتمد معايير تشغيل وإدارة متكاملة تضمن الأمن والسلامة على مدار الساعة، مع مرافق متكاملة وخدمات ضيافة احترافية تعكس مفهوم السكن العصري الفاخر.",
    aboutAlt: "مشروع سكني تابع لعنوان الضيافة",
    counters: [
      { value: 8, suffix: "", label: "مشاريع", note: "" },
      { value: 287, suffix: "", label: "وحدة سكنية", note: "" },
      { value: 2, suffix: "", label: "مدينتان", note: "الرياض والخبر" },
      { value: 24, suffix: "/7", label: "تشغيل", note: "" },
    ],
    projectsBadge: "المشاريع",
    projectsTitle: "نبذة عن مشاريعنا",
    projectsBody:
      "محفظة سكنية مختارة تضم مجتمعات مفروشة ومنتجات فلل عبر الرياض والخبر ضمن تصور ضيافي متكامل.",
    projectLabel: "المشروع",
    projectCarouselLabel: "عارض مشاريع عنوان الضيافة",
    previousProject: "المشروع السابق",
    nextProject: "المشروع التالي",
    goToProject: "الانتقال إلى المشروع",
    amenitiesBadge: "تجربة المعيشة",
    amenitiesTitle: "مزايا يومية صممت لسهولة الحياة",
    amenitiesBody:
      "تقوم التجربة السكنية على مرافق عملية وموجهة للسكان بعقلية ضيافية تتجاوز مجرد قائمة خدمات تقليدية.",
    leaseBadge: "مرونة التأجير",
    leaseTitle: "مدد مرنة تناسب إيقاعات السكن المختلفة",
    leaseBody:
      "تدعم المحفظة صيغ تأجير متعددة من الإقامات المفروشة القصيرة نسبيا إلى الالتزامات السكنية الأطول.",
    leaseNote:
      "تتراوح أنواع الوحدات من استوديوهات تبدأ من 40 م2 وحتى فلل تصل إلى 250 م2 بحسب المشروع.",
    closingBadge: "عنوان الضيافة",
    closingTitle: "للضيافة عنوان .. نحو عائد مستدام",
    closingBody:
      "اكتشف علامة سكنية ضيافية مبنية على الهدوء والانضباط التشغيلي ومعايير معيشة راقية.",
    contactButton: "تواصل معنا",
    visitButton: "زيارة dyafa.sa",
    ctaImageAlt: "بيئة سكنية راقية من عنوان الضيافة",
  },
};

const projects = [
  {
    image: "/images/unwan-aidiyafa/an-nafal.jpg",
    units: 34,
    name: { en: "Matera Al Nafal", ar: "ماتيرا النفل" },
    type: { en: "Furnished Residential", ar: "سكن مفروش" },
    imageAlt: { en: "Matera Al Nafal residential project", ar: "مشروع ماتيرا النفل" },
    highlights: {
      en: ["Near KAFD", "Kingdom Hospital", "Metro & Tala Mall"],
      ar: ["قريب من KAFD", "مستشفى المملكة", "المترو وتالا مول"],
    },
  },
  {
    image: "/images/unwan-aidiyafa/qurtubah.jpg",
    units: 31,
    name: { en: "Matera Qurtubah", ar: "ماتيرا قرطبة" },
    type: { en: "Furnished Residential", ar: "سكن مفروش" },
    imageAlt: { en: "Matera Qurtubah residential project", ar: "مشروع ماتيرا قرطبة" },
    highlights: {
      en: ["Modern lifestyle community", "Furnished living", "Managed hospitality"],
      ar: ["مجتمع عصري", "سكن مفروش", "تشغيل ضيافي"],
    },
  },
  {
    image: "/images/unwan-aidiyafa/Al-Aqiq.jpg",
    units: 39,
    name: { en: "Matera Al Aqiq", ar: "ماتيرا العقيق" },
    type: { en: "Furnished Residential", ar: "سكن مفروش" },
    imageAlt: { en: "Matera Al Aqiq residential project", ar: "مشروع ماتيرا العقيق" },
    highlights: {
      en: ["Near KAFD", "Riyadh Park Mall", "Premium residential setting"],
      ar: ["قريب من KAFD", "رياض بارك مول", "بيئة سكنية راقية"],
    },
  },
  {
    image: "/images/image.webp",
    units: 34,
    name: { en: "Matera Al Malqa", ar: "ماتيرا الملقا" },
    type: { en: "Furnished Residential", ar: "سكن مفروش" },
    imageAlt: { en: "Matera Al Malqa residential project", ar: "مشروع ماتيرا الملقا" },
    highlights: {
      en: ["North Riyadh premium district", "Modern layout", "Managed operations"],
      ar: ["حي راق شمال الرياض", "تخطيط عصري", "تشغيل منظم"],
    },
  },
  {
    image: "/images/realistic/Untitled design (23).png",
    units: 36,
    name: { en: "Matera Al Sulaymaniyah", ar: "ماتيرا السليمانية" },
    type: { en: "Furnished Residential", ar: "سكن مفروش" },
    imageAlt: { en: "Matera Al Sulaymaniyah residential project", ar: "مشروع ماتيرا السليمانية" },
    highlights: {
      en: ["Al Wizarat District", "Park Avenue", "City-connected living"],
      ar: ["حي الوزارات", "بارك أفينيو", "سكن متصل بالمدينة"],
    },
  },
  {
    image: "/images/unwan-aidiyafa/al-maghrizat.jpg",
    units: 26,
    name: { en: "Matera Al Mughrizat", ar: "ماتيرا المغرزات" },
    type: { en: "Furnished Residential", ar: "سكن مفروش" },
    imageAlt: { en: "Matera Al Mughrizat residential project", ar: "مشروع ماتيرا المغرزات" },
    highlights: {
      en: ["Near Riyadh Intl. Convention Center", "Selected private pools", "Hospitality-led layout"],
      ar: ["قريب من مركز الرياض الدولي للمؤتمرات", "مسابح خاصة لبعض الوحدات", "تصميم بروح ضيافية"],
    },
  },
  {
    image: "/images/unwan-aidiyafa/vera-alared.jpg",
    units: 71,
    name: { en: "Vera Al Arid", ar: "فيرا العارض" },
    type: { en: "Furnished Residential", ar: "سكن مفروش" },
    imageAlt: { en: "Vera Al Arid residential project", ar: "مشروع فيرا العارض" },
    highlights: {
      en: ["Near airport", "Tamimi Markets & Al Habib Hospital", "Co-working spaces"],
      ar: ["قريب من المطار", "تميمي ومستشفى الحبيب", "مساحات عمل مشتركة"],
    },
  },
  {
    image: "/images/unwan-aidiyafa/alkhubar.jpg",
    units: 16,
    name: { en: "Deem Al Khobar", ar: "ديم الخبر" },
    type: { en: "Villas (129-250 m2)", ar: "فلل (129-250 م2)" },
    imageAlt: { en: "Deem Al Khobar villas", ar: "فلل ديم الخبر" },
    highlights: {
      en: ["Private pool per villa", "Kids' areas & on-site mosque", "Near Al Nawras Lake"],
      ar: ["مسبح خاص لكل فيلا", "مناطق أطفال ومسجد داخل المشروع", "قريب من بحيرة النورس"],
    },
  },
];

const amenities = [
  { icon: Dumbbell, label: { en: "Gym", ar: "نادي رياضي" } },
  { icon: CarFront, label: { en: "Parking", ar: "مواقف" } },
  { icon: Building2, label: { en: "Modern Elevators", ar: "مصاعد حديثة" } },
  { icon: KeyRound, label: { en: "Smart Access", ar: "دخول ذكي" } },
  { icon: SlidersHorizontal, label: { en: "Electronic Control", ar: "تحكم إلكتروني" } },
  { icon: CookingPot, label: { en: "Fully Equipped Kitchens", ar: "مطابخ مجهزة بالكامل" } },
  { icon: Sparkles, label: { en: "Premium Finishes", ar: "تشطيبات راقية" } },
  { icon: SunMedium, label: { en: "Natural Light & Wide Windows", ar: "إضاءة طبيعية ونوافذ واسعة" } },
  { icon: Wrench, label: { en: "Regular Maintenance", ar: "صيانة دورية" } },
  { icon: Laptop, label: { en: "Shared Lounges & Co-working", ar: "صالات مشتركة ومساحات عمل" } },
  { icon: Waves, label: { en: "Private Pools (selected units)", ar: "مسابح خاصة لبعض الوحدات" } },
  { icon: BellRing, label: { en: "Reception", ar: "استقبال" } },
];

const leasePlans = [
  {
    title: { en: "Annual", ar: "سنوي" },
    body: {
      en: "For residents seeking stable long-horizon living in a managed premium environment.",
      ar: "للسكان الباحثين عن استقرار معيشي طويل الأمد ضمن بيئة راقية ومدارة باحتراف.",
    },
  },
  {
    title: { en: "6-Months", ar: "6 أشهر" },
    body: {
      en: "For medium-term stays that need flexibility without giving up residential quality.",
      ar: "للإقامات المتوسطة التي تحتاج مرونة دون التخلي عن جودة السكن.",
    },
  },
  {
    title: { en: "Monthly", ar: "شهري" },
    body: {
      en: "For furnished living needs that benefit from convenience, service, and fast onboarding.",
      ar: "لاحتياجات السكن المفروش التي تستفيد من سهولة الخدمة وسرعة التهيئة.",
    },
  },
];

export default function UnwanAidiyafaPage() {
  const [lang, setLang] = useState("en");
  const t = content[lang];
  const copy = pageCopy[lang];
  const isArabic = lang === "ar";
  const pageRef = useRef(null);
  const heroSectionRef = useRef(null);
  const heroMediaRef = useRef(null);
  const numbersRef = useRef(null);
  const aboutRef = useRef(null);
  const bodyTextClass = isArabic
    ? "text-xl leading-[2.15] sm:text-2xl md:text-[1.95rem] md:leading-[2.2]"
    : "text-base leading-8 md:text-lg md:leading-9";
  const compactBodyTextClass = isArabic
    ? "text-lg leading-[2.05] sm:text-[1.45rem] md:text-[1.6rem] md:leading-[2.1]"
    : "text-sm leading-8 md:text-base";

  const localizedProjects = useMemo(
    () =>
      projects.map((project) => ({
        units: `${project.units} ${lang === "ar" ? "وحدة" : "Units"}`,
        name: project.name[lang],
        type: project.type[lang],
        image: project.image,
        imageAlt: project.imageAlt[lang],
        highlights: project.highlights[lang],
      })),
    [lang]
  );

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
  }, [lang, t.dir]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const revealElements = gsap.utils.toArray("[data-unwan-reveal]");
      const counterElements = gsap.utils.toArray("[data-counter]");

      if (reduceMotion) {
        gsap.set(revealElements, { autoAlpha: 1, y: 0 });
        counterElements.forEach((element) => {
          const target = element.getAttribute("data-target") || "0";
          const suffix = element.getAttribute("data-suffix") || "";
          element.textContent = `${target}${suffix}`;
        });
        return;
      }

      const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      heroTimeline
        .fromTo("[data-hero-overlay]", { opacity: 0.96 }, { opacity: 1, duration: 1 })
        .from("[data-hero-logo]", { autoAlpha: 0, y: 18, duration: 0.8 }, "-=0.65")
        .from("[data-hero-badge]", { autoAlpha: 0, y: 18, duration: 0.7 }, "-=0.55")
        .from("[data-hero-title-line]", { yPercent: 115, duration: 0.95, stagger: 0.14 }, "-=0.45")
        .from("[data-hero-tagline]", { autoAlpha: 0, y: 22, duration: 0.75 }, "-=0.48")
        .from("[data-hero-copy]", { autoAlpha: 0, y: 24, duration: 0.75 }, "-=0.45")
        .from("[data-hero-stat]", { autoAlpha: 0, y: 28, stagger: 0.08, duration: 0.7 }, "-=0.38");

      if (heroMediaRef.current && heroSectionRef.current) {
        gsap.fromTo(
          heroMediaRef.current,
          { scale: 1.04 },
          {
            scale: 1.12,
            ease: "none",
            scrollTrigger: {
              trigger: heroSectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1.15,
            },
          }
        );
      }

      if (aboutRef.current) {
        gsap.to("[data-about-media]", {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });

        gsap.fromTo(
          "[data-about-divider]",
          { scaleX: 0, transformOrigin: t.dir === "rtl" ? "right center" : "left center" },
          {
            scaleX: 1,
            duration: 1.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "[data-about-divider]",
              start: "top 85%",
            },
          }
        );
      }

      revealElements.forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 42 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 86%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      ScrollTrigger.batch("[data-unwan-amenity]", {
        start: "top 88%",
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { autoAlpha: 0, y: 34 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.75,
              stagger: 0.08,
              ease: "power3.out",
              overwrite: true,
            }
          ),
        onLeaveBack: (batch) => gsap.set(batch, { autoAlpha: 0, y: 34 }),
      });

      if (numbersRef.current) {
        ScrollTrigger.create({
          trigger: numbersRef.current,
          start: "top 82%",
          once: true,
          onEnter: () => {
            counterElements.forEach((element) => {
              const target = Number(element.getAttribute("data-target") || 0);
              const suffix = element.getAttribute("data-suffix") || "";
              const animated = { value: 0 };

              gsap.to(animated, {
                value: target,
                duration: 1.6,
                ease: "power2.out",
                snap: { value: 1 },
                onUpdate: () => {
                  element.textContent = `${Math.round(animated.value)}${suffix}`;
                },
              });
            });
          },
        });
      }
    }, pageRef);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => ctx.revert();
  }, [lang, t.dir]);

  return (
    <main ref={pageRef} lang={lang} dir={t.dir} className="min-h-screen overflow-x-hidden bg-[#ece3d2]">
      <Navbar t={t} lang={lang} setLang={setLang} linkPrefix="/" homeHref="/" />

      <section ref={heroSectionRef} className="relative isolate min-h-[100svh] overflow-hidden bg-[#18211f] pt-24 md:pt-28">
        <div ref={heroMediaRef} className="absolute inset-0 will-change-transform">
          <Image src={heroImageSrc} alt={copy.aboutAlt} fill priority sizes="100vw" className="object-cover object-center" />
        </div>
        <div data-hero-overlay className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,9,9,0.52)_0%,rgba(7,9,9,0.5)_18%,rgba(10,13,12,0.7)_52%,rgba(18,23,22,0.82)_76%,rgba(236,227,210,0.98)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(185,150,104,0.26),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(185,150,104,0.16),transparent_32%)]" />

        <div className="relative mx-auto flex min-h-[calc(100svh-6rem)] max-w-7xl flex-col justify-end px-4 pb-10 sm:px-6 md:pb-12 lg:px-8 lg:pb-16">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.62fr)] lg:items-end">
            <div className={t.dir === "rtl" ? "text-right" : "text-left"}>
              <div data-hero-logo className="relative h-20 w-48 sm:h-24 sm:w-56 md:h-28 md:w-72">
                <Image src={logoSrc} alt={copy.logoAlt} fill sizes="288px" className="object-contain object-left rtl:object-right" />
              </div>

              <div data-hero-badge className="mt-6">
                <SectionBadge label={copy.heroKicker} tone="dark" showIcon={false} />
              </div>

              <h1 className="mt-6 max-w-4xl premium-font text-5xl leading-[0.92] text-[#F4EFE6] sm:text-6xl md:text-7xl xl:text-[6.25rem]">
                {copy.heroTitleLines.map((line) => (
                  <span key={line} className="block overflow-hidden">
                    <span data-hero-title-line className="block">
                      <TextAnimate as="span" by="character" animation="blurInUp" startOnView={false} className="block">
                        {line}
                      </TextAnimate>
                    </span>
                  </span>
                ))}
              </h1>

              <TextAnimate
                as="p"
                by="word"
                animation="blurInUp"
                startOnView={false}
                data-hero-tagline
                className="mt-6 max-w-3xl text-lg leading-8 text-[#F7E2C0] sm:text-xl sm:leading-9"
              >
                {copy.heroTagline}
              </TextAnimate>

              <TextAnimate
                as="p"
                by="word"
                animation="blurInUp"
                startOnView={false}
                data-hero-copy
                className={`mt-6 max-w-2xl text-[#F4EFE6]/78 ${bodyTextClass}`}
              >
                {copy.heroIntro}
              </TextAnimate>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {copy.stats.map(([label, value]) => (
                <GlassCard
                  key={label}
                  className="rounded-[1.6rem] border-white/14 bg-white/10 p-5 text-[#F4EFE6] shadow-[0_24px_70px_rgba(18,12,10,0.22)] backdrop-blur-[26px]"
                >
                  <div data-hero-stat>
                    <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#E9D3B0]">{label}</p>
                    <p className="mt-3 premium-font text-2xl text-[#F4EFE6]">{value}</p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section ref={aboutRef} className="px-4 pb-16 pt-12 sm:px-6 lg:px-8 lg:pb-20 lg:pt-16">
        <div className="mx-auto max-w-7xl">
          <div data-unwan-reveal className={t.dir === "rtl" ? "text-right" : "text-left"}>
            <SectionBadge label={copy.aboutBadge} />
            <div data-about-divider className="mt-8 h-px w-full max-w-[180px] bg-[linear-gradient(90deg,rgba(185,150,104,0),rgba(185,150,104,0.9),rgba(185,150,104,0))]" />
            <TextAnimate as="h2" by="word" animation="blurInUp" data-unwan-reveal className="mt-8 max-w-4xl premium-font text-4xl leading-tight text-[#23302d] md:text-5xl xl:text-6xl">
              {copy.aboutTitle}
            </TextAnimate>
            <TextAnimate as="p" by="word" animation="blurInUp" data-unwan-reveal className={`mt-6 max-w-4xl text-[#23302d]/76 ${bodyTextClass}`}>
              {copy.aboutBody}
            </TextAnimate>
          </div>
        </div>

        <div
          data-unwan-reveal
          className="relative left-1/2 mt-10 w-screen -translate-x-1/2 overflow-hidden border-y border-[#B99668]/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.44),rgba(244,239,230,0.76))] py-4 shadow-[0_28px_80px_rgba(35,48,45,0.08)] backdrop-blur-xl md:py-6"
        >
          <AngledSlider
            items={aboutSliderImages}
            direction={t.dir === "rtl" ? "right" : "left"}
            speed={42}
            containerHeight="520px"
            cardWidth="320px"
            cardHeight="420px"
            gap="28px"
            angle={18}
            hoverScale={1.03}
            className="bg-transparent"
            showTitle={false}
          />
        </div>
      </section>

      <section ref={numbersRef} className="bg-[#18211f] px-4 py-14 text-[#F4EFE6] sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 xl:grid-cols-4">
          {copy.counters.map((item) => (
            <div key={`${item.label}-${item.value}`} className={t.dir === "rtl" ? "text-right" : "text-left"}>
              <p data-counter data-target={item.value} data-suffix={item.suffix} className="premium-font text-5xl text-[#E9D3B0] md:text-6xl">
                0
              </p>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.28em] text-[#E9D3B0]/84">{item.label}</p>
              {item.note ? <p className="mt-3 text-sm text-[#F4EFE6]/66">{item.note}</p> : null}
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div data-unwan-reveal className={t.dir === "rtl" ? "text-right" : "text-left"}>
            <SectionBadge label={copy.projectsBadge} />
            <TextAnimate as="h2" by="word" animation="blurInUp" className="mt-6 premium-font text-4xl text-[#23302d] md:text-5xl">
              {copy.projectsTitle}
            </TextAnimate>
            <TextAnimate as="p" by="word" animation="blurInUp" className={`mt-5 max-w-3xl text-[#23302d]/74 ${bodyTextClass}`}>
              {copy.projectsBody}
            </TextAnimate>
          </div>

          <div data-unwan-reveal className="relative left-1/2 mt-10 h-[220px] w-screen max-w-none -translate-x-1/2 overflow-hidden">
            <Strands
              colors={["#B99668", "#23302d", "#E9D3B0", "#4e322c"]}
              count={4}
              speed={0.42}
              amplitude={0.9}
              waviness={0.95}
              thickness={0.72}
              glow={2.25}
              taper={3.2}
              spread={1.08}
              intensity={0.56}
              saturation={1.4}
              opacity={0.92}
              scale={1.25}
              glass={false}
              refraction={1}
              dispersion={1}
              glassSize={1}
              className="absolute inset-0 opacity-90"
            />
          </div>

          <div data-unwan-reveal className="mt-10">
            <ProjectCarousel
              key={lang}
              projects={localizedProjects}
              copy={{
                projectLabel: copy.projectLabel,
                carouselLabel: copy.projectCarouselLabel,
                previousProject: copy.previousProject,
                nextProject: copy.nextProject,
                goToProject: copy.goToProject,
              }}
              dir={t.dir}
            />
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        <div className="mx-auto max-w-7xl">
          <div data-unwan-reveal className={t.dir === "rtl" ? "text-right" : "text-left"}>
            <SectionBadge label={copy.amenitiesBadge} />
            <TextAnimate as="h2" by="word" animation="blurInUp" className="mt-6 premium-font text-4xl text-[#23302d] md:text-5xl">
              {copy.amenitiesTitle}
            </TextAnimate>
            <TextAnimate as="p" by="word" animation="blurInUp" className={`mt-5 max-w-3xl text-[#23302d]/74 ${bodyTextClass}`}>
              {copy.amenitiesBody}
            </TextAnimate>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {amenities.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.label[lang]}
                  data-unwan-amenity
                  className="rounded-[1.7rem] border border-[#B99668]/16 bg-white/58 p-6 shadow-[0_18px_50px_rgba(35,48,45,0.08)] backdrop-blur-xl"
                >
                  <div className="flex items-center gap-3 text-[#8F6A41]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <TextAnimate as="h3" by="word" animation="blurInUp" className="mt-5 premium-font text-2xl text-[#23302d]">
                    {item.label[lang]}
                  </TextAnimate>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#B99668]/18 bg-[linear-gradient(180deg,rgba(24,33,31,0.98),rgba(30,40,38,0.96))] p-6 text-[#F4EFE6] shadow-[0_30px_90px_rgba(24,33,31,0.18)] md:p-8 lg:p-10">
          <div data-unwan-reveal className={t.dir === "rtl" ? "text-right" : "text-left"}>
            <SectionBadge label={copy.leaseBadge} tone="dark" />
            <TextAnimate as="h2" by="word" animation="blurInUp" className="mt-6 premium-font text-4xl text-[#F4EFE6] md:text-5xl">
              {copy.leaseTitle}
            </TextAnimate>
            <TextAnimate as="p" by="word" animation="blurInUp" className={`mt-5 max-w-3xl text-[#F4EFE6]/74 ${bodyTextClass}`}>
              {copy.leaseBody}
            </TextAnimate>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {leasePlans.map((plan) => (
              <GlassCard
                key={plan.title[lang]}
                className="rounded-[1.6rem] border-white/10 bg-white/8 p-6 text-[#F4EFE6] shadow-none backdrop-blur-xl"
              >
                <div data-unwan-reveal>
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#E9D3B0]">{copy.leaseBadge}</p>
                  <TextAnimate as="h3" by="word" animation="blurInUp" className="mt-4 premium-font text-3xl text-[#F4EFE6]">
                    {plan.title[lang]}
                  </TextAnimate>
                  <TextAnimate as="p" by="word" animation="blurInUp" className={`mt-4 text-[#F4EFE6]/72 ${compactBodyTextClass}`}>
                    {plan.body[lang]}
                  </TextAnimate>
                </div>
              </GlassCard>
            ))}
          </div>

          <TextAnimate as="p" by="word" animation="blurInUp" data-unwan-reveal className={`mt-8 text-[#E9D3B0]/86 ${compactBodyTextClass}`}>
            {copy.leaseNote}
          </TextAnimate>
        </div>
      </section>

      <section id="contact">
        <Footer t={t} linkPrefix="/" />
      </section>
    </main>
  );
}
