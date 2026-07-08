"use client";

import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
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

const heroImageSrc = "/images/unwan-aidiyafa/DSC07730.jpg";

const aboutSliderMedia = [
  {
    id: "dsc-02819",
    url: "/images/unwan-aidiyafa/DSC02819.jpg",
  },
  {
    id: "dsc-07730",
    url: "/images/unwan-aidiyafa/DSC07730.jpg",
  },
  {
    id: "dsc-09029",
    url: "/images/unwan-aidiyafa/DSC09029.jpg",
  },
  {
    id: "dsc-02862",
    url: "/images/unwan-aidiyafa/DSC02862.jpg",
  },
  {
    id: "dsc-02857",
    url: "/images/unwan-aidiyafa/DSC02857.jpg",
  },
  {
    id: "dsc-02796",
    url: "/images/unwan-aidiyafa/DSC02796.jpg",
  },
  {
    id: "dsc-02806",
    url: "/images/unwan-aidiyafa/DSC02806.jpg",
  },
];

const projectMedia = [
  {
    image: "/images/unwan-aidiyafa/an-nafal.jpg",
    units: 34,
  },
  {
    image: "/images/unwan-aidiyafa/qurtubah.jpg",
    units: 31,
  },
  {
    image: "/images/unwan-aidiyafa/Al-Aqiq.jpg",
    units: 39,
  },
  {
    image: "/images/unwan-aidiyafa/DSC02857.jpg",
    units: 34,
  },
  {
    image: "/images/unwan-aidiyafa/DSC02806.jpg",
    units: 36,
  },
  {
    image: "/images/unwan-aidiyafa/al-maghrizat.jpg",
    units: 26,
  },
  {
    image: "/images/unwan-aidiyafa/vera-alared.jpg",
    units: 71,
  },
  {
    image: "/images/unwan-aidiyafa/alkhubar.jpg",
    units: 16,
  },
];

const amenityIcons = [
  Dumbbell,
  CarFront,
  Building2,
  KeyRound,
  SlidersHorizontal,
  CookingPot,
  Sparkles,
  SunMedium,
  Wrench,
  Laptop,
  Waves,
  BellRing,
];

export default function UnwanAidiyafaPage() {
  const [lang, setLang] = useState("ar");
  const t = content[lang];
  const copy = t.unwanAidiyafa;
  const isArabic = lang === "ar";

  const pageRef = useRef(null);
  const heroSectionRef = useRef(null);
  const heroMediaRef = useRef(null);
  const numbersRef = useRef(null);
  const aboutRef = useRef(null);

  const sectionAlignClass = isArabic ? "text-right" : "text-left";
  const iconAlignClass = isArabic ? "justify-end" : "justify-start";

  const bodyTextClass = isArabic
    ? "text-2xl leading-[1.9] md:text-3xl md:leading-[1.9]"
    : "text-base leading-8 md:text-lg md:leading-9";

  const compactBodyTextClass = isArabic
    ? "text-xl leading-[1.9] md:text-2xl md:leading-[1.9]"
    : "text-sm leading-8 md:text-base";

  const localizedProjects = useMemo(
    () =>
      projectMedia.map((project, index) => ({
        units: `${project.units} ${copy.projects.unitLabel}`,
        name: copy.projects.items[index].name,
        type: copy.projects.items[index].type,
        image: project.image,
        imageAlt: copy.projects.items[index].imageAlt,
        highlights: copy.projects.items[index].highlights,
      })),
    [copy.projects.items, copy.projects.unitLabel]
  );

  const localizedAmenities = useMemo(
    () =>
      amenityIcons.map((Icon, index) => ({
        icon: Icon,
        label: copy.amenities.items[index],
      })),
    [copy.amenities.items]
  );

  const localizedAboutSliderImages = useMemo(
    () =>
      aboutSliderMedia.map((image, index) => ({
        ...image,
        alt: copy.about.sliderImages[index].alt,
        title: copy.about.sliderImages[index].title,
      })),
    [copy.about.sliderImages]
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
        gsap.set("[data-unwan-amenity]", { autoAlpha: 1, y: 0 });

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
        gsap.fromTo(
          "[data-about-divider]",
          {
            scaleX: 0,
            transformOrigin: t.dir === "rtl" ? "right center" : "left center",
          },
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

    const refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(refreshFrame);
      ctx.revert();
    };
  }, [lang, t.dir]);

  return (
    <main
      ref={pageRef}
      lang={lang}
      dir={t.dir}
      className="min-h-screen overflow-x-hidden bg-[#ece3d2]"
    >
      <Navbar t={t} lang={lang} setLang={setLang} linkPrefix="/" homeHref="/" />

      <section
        ref={heroSectionRef}
        className="relative isolate min-h-[100svh] overflow-hidden bg-[#18211f] pt-24 md:pt-28"
      >
        <div ref={heroMediaRef} className="absolute inset-0 will-change-transform">
          <Image
            src={heroImageSrc}
            alt={copy.about.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <div
          data-hero-overlay
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,9,9,0.52)_0%,rgba(7,9,9,0.5)_18%,rgba(10,13,12,0.7)_52%,rgba(18,23,22,0.82)_76%,rgba(236,227,210,0.98)_100%)]"
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(185,150,104,0.26),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(185,150,104,0.16),transparent_32%)]" />

        <div className="relative mx-auto flex min-h-[calc(100svh-6rem)] max-w-7xl flex-col justify-end px-4 pb-10 sm:px-6 md:pb-12 lg:px-8 lg:pb-16">
          <a
            href="/#sectors"
            className="mb-6 inline-flex w-fit rounded-full border border-white/18 bg-white/10 px-4 py-2 text-sm font-semibold text-[#F4EFE6] backdrop-blur-xl transition hover:border-[#E9D3B0] hover:text-[#F7E2C0] md:mb-8"
          >
            {copy.backLabel}
          </a>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.62fr)] lg:items-end">
            <div className={sectionAlignClass}>
              <div data-hero-badge>
                <SectionBadge label={copy.hero.kicker} tone="dark" showIcon={false} />
              </div>

              <h1 className="mt-6 max-w-4xl premium-font text-5xl leading-[0.92] text-[#F4EFE6] sm:text-6xl md:text-7xl xl:text-[6.25rem]">
                {copy.hero.titleLines.map((line) => (
                  <span key={line} className="block overflow-hidden">
                    <span data-hero-title-line className="block">
                      <TextAnimate
                        as="span"
                        by={isArabic ? "word" : "character"}
                        animation="blurInUp"
                        startOnView={false}
                        dir={t.dir}
                        textAlign={isArabic ? "right" : "left"}
                        className="block"
                      >
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
                dir={t.dir}
                textAlign={isArabic ? "right" : "left"}
                className="mt-6 max-w-3xl text-lg leading-8 text-[#F7E2C0] sm:text-xl sm:leading-9"
              >
                {copy.hero.tagline}
              </TextAnimate>

              <TextAnimate
                as="p"
                by="word"
                animation="blurInUp"
                startOnView={false}
                data-hero-copy
                dir={t.dir}
                textAlign={isArabic ? "right" : "left"}
                className={`mt-6 max-w-2xl text-white ${bodyTextClass}`}
              >
                {copy.hero.intro}
              </TextAnimate>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {copy.hero.stats.map(([label, value]) => (
                <GlassCard
                  key={label}
                  className="rounded-[1.6rem] border-white/14 bg-white/10 p-5 text-[#F4EFE6] shadow-[0_24px_70px_rgba(18,12,10,0.22)] backdrop-blur-[26px]"
                >
                  <div data-hero-stat className={sectionAlignClass}>
                    <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#E9D3B0]">
                      {label}
                    </p>
                    <p className="mt-3 premium-font text-2xl text-[#F4EFE6]">{value}</p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        ref={aboutRef}
        className="px-4 pb-16 pt-12 sm:px-6 lg:px-8 lg:pb-20 lg:pt-16"
      >
        <div className="mx-auto max-w-7xl">
          <div data-unwan-reveal className={sectionAlignClass}>
            <SectionBadge label={copy.about.eyebrow} />

            <div
              data-about-divider
              className="mt-8 h-px w-full max-w-[180px] bg-[linear-gradient(90deg,rgba(185,150,104,0),rgba(185,150,104,0.9),rgba(185,150,104,0))]"
            />

            <TextAnimate
              as="h2"
              by="word"
              animation="blurInUp"
              dir={t.dir}
              textAlign={isArabic ? "right" : "left"}
              className="mt-8 max-w-4xl premium-font text-4xl leading-tight text-[#23302d] md:text-5xl xl:text-6xl"
            >
              {copy.about.title}
            </TextAnimate>

            <TextAnimate
              as="p"
              by="word"
              animation="blurInUp"
              dir={t.dir}
              textAlign={isArabic ? "right" : "left"}
              className={`mt-6 max-w-4xl text-[#23302d]/76 ${bodyTextClass}`}
            >
              {copy.about.description}
            </TextAnimate>
          </div>
        </div>

        <div
          data-unwan-reveal
          className={`relative mt-10 hidden w-screen overflow-hidden border-y border-[#B99668]/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.44),rgba(244,239,230,0.76))] py-4 shadow-[0_28px_80px_rgba(35,48,45,0.08)] backdrop-blur-xl md:block md:py-6 ${
            isArabic ? "right-1/2 translate-x-1/2" : "left-1/2 -translate-x-1/2"
          }`}
        >
          <AngledSlider
            items={localizedAboutSliderImages}
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

        <div data-unwan-reveal className="block px-4 pb-10 pt-6 md:hidden">
          <div
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {localizedAboutSliderImages.map((image, index) => (
              <div
                key={image.id ?? index}
                className="relative h-[320px] min-w-[78vw] max-w-[78vw] snap-center overflow-hidden rounded-[28px] border border-[#B99668]/20 bg-[#E6DCC8]"
              >
                <Image src={image.url} alt={image.alt} fill sizes="78vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={numbersRef}
        className="bg-[#18211f] px-4 py-14 text-[#F4EFE6] sm:px-6 lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 xl:grid-cols-4">
          {copy.counters.map((item) => (
            <div key={`${item.label}-${item.value}`} className={sectionAlignClass}>
              <p
                data-counter
                data-target={item.value}
                data-suffix={item.suffix}
                className="premium-font text-5xl text-[#E9D3B0] md:text-6xl"
              >
                0
              </p>

              <p className="mt-4 text-xs font-bold uppercase tracking-[0.28em] text-[#E9D3B0]/84">
                {item.label}
              </p>

              {item.note ? (
                <p className="mt-3 text-sm text-[#F4EFE6]/66">{item.note}</p>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div data-unwan-reveal className={sectionAlignClass}>
            <SectionBadge label={copy.projects.eyebrow} />

            <TextAnimate
              as="h2"
              by="word"
              animation="blurInUp"
              dir={t.dir}
              textAlign={isArabic ? "right" : "left"}
              className="mt-6 premium-font text-4xl text-[#23302d] md:text-5xl"
            >
              {copy.projects.title}
            </TextAnimate>

            <TextAnimate
              as="p"
              by="word"
              animation="blurInUp"
              dir={t.dir}
              textAlign={isArabic ? "right" : "left"}
              className={`mt-5 max-w-3xl text-[#23302d]/74 ${bodyTextClass}`}
            >
              {copy.projects.description}
            </TextAnimate>
          </div>

          <div
            data-unwan-reveal
            className={`relative mt-10 h-[220px] w-screen max-w-none overflow-hidden ${
              isArabic ? "right-1/2 translate-x-1/2" : "left-1/2 -translate-x-1/2"
            }`}
          >
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
                projectLabel: copy.projects.projectLabel,
                carouselLabel: copy.projects.carouselLabel,
                previousProject: copy.projects.previousProject,
                nextProject: copy.projects.nextProject,
                goToProject: copy.projects.goToProject,
              }}
              dir={t.dir}
            />
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        <div className="mx-auto max-w-7xl">
          <div data-unwan-reveal className={sectionAlignClass}>
            <SectionBadge label={copy.amenities.eyebrow} />

            <TextAnimate
              as="h2"
              by="word"
              animation="blurInUp"
              dir={t.dir}
              textAlign={isArabic ? "right" : "left"}
              className="mt-6 premium-font text-4xl text-[#23302d] md:text-5xl"
            >
              {copy.amenities.title}
            </TextAnimate>

            <TextAnimate
              as="p"
              by="word"
              animation="blurInUp"
              dir={t.dir}
              textAlign={isArabic ? "right" : "left"}
              className={`mt-5 max-w-3xl text-[#23302d]/74 ${bodyTextClass}`}
            >
              {copy.amenities.description}
            </TextAnimate>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {localizedAmenities.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.label}
                  data-unwan-amenity
                  dir={t.dir}
                  className={`flex min-h-[116px] flex-col justify-between rounded-[1.7rem] border border-[#B99668]/16 bg-white/58 p-6 shadow-[0_18px_50px_rgba(35,48,45,0.08)] backdrop-blur-xl ${sectionAlignClass}`}
                >
                  <div className={`flex ${iconAlignClass} text-[#8F6A41]`}>
                    <Icon className="h-5 w-5" />
                  </div>

                  <TextAnimate
                    as="h3"
                    by="word"
                    animation="blurInUp"
                    dir={t.dir}
                    textAlign={isArabic ? "right" : "left"}
                    className="premium-font text-2xl leading-snug text-[#23302d]"
                  >
                    {item.label}
                  </TextAnimate>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#B99668]/18 bg-[linear-gradient(180deg,rgba(24,33,31,0.98),rgba(30,40,38,0.96))] p-6 text-[#F4EFE6] shadow-[0_30px_90px_rgba(24,33,31,0.18)] md:p-8 lg:p-10">
          <div data-unwan-reveal className={sectionAlignClass}>
            <SectionBadge label={copy.leasing.eyebrow} tone="dark" />

            <TextAnimate
              as="h2"
              by="word"
              animation="blurInUp"
              dir={t.dir}
              textAlign={isArabic ? "right" : "left"}
              className="mt-6 premium-font text-4xl text-[#F4EFE6] md:text-5xl"
            >
              {copy.leasing.title}
            </TextAnimate>

            <TextAnimate
              as="p"
              by="word"
              animation="blurInUp"
              dir={t.dir}
              textAlign={isArabic ? "right" : "left"}
              className={`mt-5 max-w-3xl text-[#F4EFE6]/74 ${bodyTextClass}`}
            >
              {copy.leasing.description}
            </TextAnimate>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {copy.leasing.terms.map((plan) => (
              <GlassCard
                key={plan.title}
                className="rounded-[1.6rem] border-white/10 bg-white/8 p-6 text-[#F4EFE6] shadow-none backdrop-blur-xl"
              >
                <div data-unwan-reveal className={sectionAlignClass}>
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#E9D3B0]">
                    {copy.leasing.eyebrow}
                  </p>

                  <TextAnimate
                    as="h3"
                    by="word"
                    animation="blurInUp"
                    dir={t.dir}
                    textAlign={isArabic ? "right" : "left"}
                    className="mt-4 premium-font text-3xl text-[#F4EFE6]"
                  >
                    {plan.title}
                  </TextAnimate>

                  <TextAnimate
                    as="p"
                    by="word"
                    animation="blurInUp"
                    dir={t.dir}
                    textAlign={isArabic ? "right" : "left"}
                    className={`mt-4 text-[#F4EFE6]/72 ${compactBodyTextClass}`}
                  >
                    {plan.description}
                  </TextAnimate>
                </div>
              </GlassCard>
            ))}
          </div>

          <TextAnimate
            as="p"
            by="word"
            animation="blurInUp"
            data-unwan-reveal
            dir={t.dir}
            textAlign={isArabic ? "right" : "left"}
            className={`mt-8 text-[#E9D3B0]/86 ${compactBodyTextClass} ${sectionAlignClass}`}
          >
            {copy.leasing.note}
          </TextAnimate>
        </div>
      </section>

      <section id="contact">
        <Footer t={t} linkPrefix="/" />
      </section>
    </main>
  );
}
