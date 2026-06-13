"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Headset, Leaf, ShieldCheck, Star } from "lucide-react";
import ThreeDHoverGallery from "@/components/lightswind/3d-hover-gallery";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { TextAnimate } from "@/components/ui/text-animate";
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
    galleryEyebrow: "Glallery-Vehicles",
    galleryTitle: "Our Story",
    galleryBody:
      "We started this journey with a simple belief: driving isn’t just about getting from one place to another-it’s about the feeling of freedom, the joy of discovery, and the thrill of being behind the wheel. We recognized that drivers deserve more than just luxury-they deserve innovation, performance, and cutting-edge design. Inspired by Saudi Vision 2030, we wanted to be the ones to give drivers access to the future of automotive excellence.",
    missionTitle: "Our Mession",
    missionHeading: "Our Mission",
    missionBody: [
      "To provide exceptional automotive solutions that meet the needs of today while paving the way for a sustainable and innovative future.",
      "We are dedicated to offering luxury, reliability, and unmatched service to every customer, ensuring that each journey begins and ends with trust and satisfaction."
    ],
    featureDescription:
      "We are more than a car showroom. At Luxury Cars, we offer unique driving experiences, driven by quality, innovation, and a commitment to Vision 2030. Every journey with us is exceptional",
    valueCards: [
      {
        title: "Exclusive Dealer of Premium Brands",
        body:
          "As the authorized dealer for OMODA and JAECOO in the Kingdom, we guarantee access to the best models with exceptional performance."
      },
      {
        title: "Commitment to Quality and Maintenance",
        body:
          "Our after-sales support is built around dependable maintenance, certified service standards, and long-term vehicle care."
      },
      {
        title: "Sustainable Mobility Solutions",
        body:
          "We embrace forward-looking mobility with innovative models and solutions aligned with cleaner, smarter transportation."
      },
      {
        title: "Exceptional Customer Service",
        body:
          "From first inquiry to ownership support, we provide a refined customer journey shaped by responsiveness, trust, and care."
      }
    ]
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
    galleryEyebrow: "معرض العربات",
    galleryTitle: "قصتنا",
    galleryBody:
      "بدأنا هذه الرحلة بإيمانٍ بسيط: أن القيادة ليست مجرد انتقال من مكان إلى آخر، بل هي إحساس بالحرية، ومتعة بالاكتشاف، وشغف لا يُضاهى خلف عجلة القيادة. لقد أدركنا أن السائقين يستحقون أكثر من مجرد الفخامة؛ فهم يستحقون الابتكار، والأداء العالي، والتصميم المتطور الذي يواكب المستقبل. وانطلاقًا من إلهام رؤية المملكة 2030، أردنا أن نكون الجسر الذي يمنح السائقين فرصة الوصول إلى مستقبل التميز في عالم السيارات.",
    missionTitle: "رسالتنا",
    missionHeading: "رسالتنا",
    missionBody: [
      "نسعى إلى تقديم حلول سيارات استثنائية تلبي احتياجات الحاضر، وتمهّد الطريق نحو مستقبل أكثر استدامة وابتكارًا.",
      "نحن ملتزمون بتوفير الفخامة، والاعتمادية، والخدمة المتميزة لكل عميل، لنضمن أن تبدأ كل رحلة وتنتهي بثقة ورضا."
    ],
    featureDescription:
      "نحن أكثر من مجرد صالة عرض سيارات. في Luxury Cars نقدم تجارب قيادة استثنائية تقودها الجودة والابتكار والالتزام برؤية 2030. كل رحلة معنا تجربة مميزة.",
    valueCards: [
      {
        title: "وكيل حصري لعلامات مميزة",
        body:
          "بصفتنا الوكيل المعتمد لعلامتي OMODA وJAECOO في المملكة، نضمن الوصول إلى أفضل الطرازات بأداء استثنائي."
      },
      {
        title: "التزام بالجودة والصيانة",
        body:
          "نعتمد في خدمات ما بعد البيع على صيانة موثوقة، ومعايير خدمة معتمدة، ورعاية طويلة الأمد للمركبة."
      },
      {
        title: "حلول تنقل مستدامة",
        body:
          "نتبنى مفهوم التنقل الحديث عبر طرازات وحلول مبتكرة تتماشى مع نقل أكثر كفاءة وذكاء واستدامة."
      },
      {
        title: "خدمة عملاء استثنائية",
        body:
          "من أول تواصل وحتى خدمات ما بعد التملك، نقدم رحلة عميل راقية ترتكز على سرعة الاستجابة والثقة والاهتمام."
      }
    ]
  }
};

const galleryImages = [
  "/images/j8-mountain.png",
  "/images/j7.jpg",
  "/images/omoda-red.jpg",
  "/images/j8-interior.jpg",
  "/images/icaur.jpg",
];

const valueCardIcons = [Star, ShieldCheck, Leaf, Headset];

export default function LuxuryVehiclesPage() {
  const [lang, setLang] = useState("en");
  const t = content[lang];
  const copy = pageCopy[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
  }, [lang, t.dir]);

  return (
    <main lang={lang} dir={t.dir} className="min-h-screen overflow-x-hidden bg-[#0f171c]">
      <Navbar t={t} lang={lang} setLang={setLang} linkPrefix="/" homeHref="/" />

      <section className="relative isolate h-[68vh] min-h-[420px] overflow-hidden bg-[#282328] pt-24 md:h-[74vh] md:min-h-[520px]">
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
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.42),rgba(0,0,0,0.18)_42%,rgba(15,23,28,0.9)_100%)]" />
        <div className="relative h-full w-full" />
      </section>

      <section className="bg-[#0f171c] px-4 pb-8 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <a
            href="/#sectors"
            className="inline-flex w-fit border-b border-[#9B6F4C] pb-1 text-sm font-semibold text-[#9B6F4C] transition hover:text-[#F4EFE6]"
          >
            {copy.backLabel}
          </a>
        </div>
      </section>

      <section className="bg-[#0f171c] px-4 pb-20 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[2rem] border border-[#9B6F4C]/20 shadow-[0_30px_90px_rgba(0,0,0,0.28)]">
            <div className="relative min-h-[420px] bg-[#0f171c] md:min-h-[560px]">
              <Image
                src="/images/luxuryvec-hero2.png"
                alt={copy.title}
                fill
                priority
                sizes="100vw"
                className="object-contain object-center"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,28,0.12),rgba(15,23,28,0.38)_55%,rgba(15,23,28,0.82)_100%)]" />
            </div>

            <div className="bg-[#0f171c] p-4 md:p-8">
              <div className="max-w-3xl rounded-[1.75rem] border border-white/18 bg-white/10 p-6 text-[#F4EFE6] shadow-[0_24px_60px_rgba(0,0,0,0.22)] backdrop-blur-2xl md:p-8">
                <TextAnimate
                  as="p"
                  by="word"
                  animation="blurInUp"
                  once
                  className="text-xs font-bold uppercase tracking-[0.32em] text-[#9B6F4C]"
                >
                  {copy.title}
                </TextAnimate>
                <TextAnimate
                  as="p"
                  by="word"
                  animation="blurInUp"
                  once
                  className="mt-4 text-base leading-8 text-[#F4EFE6]/88 md:text-lg"
                >
                  {copy.featureDescription}
                </TextAnimate>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0f171c] px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-6 overflow-visible md:gap-12">
          <div className="relative h-[120px] w-[360px] md:h-[170px] md:w-[560px]">
            <Image
              src="/images/logo-white.png"
              alt="Luxury Vehicles white logo"
              fill
              sizes="(min-width: 768px) 560px, 360px"
              className="object-contain object-center"
            />
          </div>

          <div className="relative h-[110px] w-[170px] md:h-[155px] md:w-[250px]">
            <Image
              src="/images/2030.png"
              alt="Vision 2030 logo"
              fill
              sizes="(min-width: 768px) 250px, 170px"
              className="object-contain object-center"
            />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0f171c] px-4 py-16 sm:px-6 lg:px-8 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(196,125,74,0.08),transparent_36%),radial-gradient(circle_at_bottom,rgba(196,125,74,0.06),transparent_32%)]" />
        <div className="absolute left-0 top-0 h-40 w-40 bg-[url('/images/luxury-vec-transparent.png')] bg-contain bg-left-top bg-no-repeat opacity-[0.08] md:h-56 md:w-56" />
        <div className="absolute bottom-0 right-0 h-40 w-40 scale-x-[-1] bg-[url('/images/luxury-vec-transparent.png')] bg-contain bg-right-bottom bg-no-repeat opacity-[0.08] md:h-56 md:w-56" />

        <div className="relative mx-auto grid max-w-7xl gap-10 md:grid-cols-2 xl:grid-cols-4 xl:gap-8">
          {copy.valueCards.map((item, index) => {
            const Icon = valueCardIcons[index];

            return (
              <article
                key={item.title}
                className="mx-auto flex max-w-sm flex-col items-center text-center text-[#F4EFE6]"
              >
                <div className="mb-6 flex h-20 w-20 items-center justify-center text-[#C47D4A] md:h-24 md:w-24">
                  <Icon className="h-14 w-14 stroke-[1.5] md:h-16 md:w-16" />
                </div>

                <TextAnimate
                  as="h3"
                  by="word"
                  animation="blurInUp"
                  once
                  className="text-2xl font-semibold leading-tight text-[#C47D4A]"
                >
                  {item.title}
                </TextAnimate>

                <TextAnimate
                  as="p"
                  by="word"
                  animation="blurInUp"
                  once
                  className="mt-5 text-base leading-8 text-[#F4EFE6]"
                >
                  {item.body}
                </TextAnimate>
              </article>
            );
          })}
        </div>
      </section>

      <section id="glallery-vehicles" className="bg-[#0f171c] px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#9B6F4C]/18 bg-[linear-gradient(180deg,rgba(244,239,230,0.04),rgba(15,23,28,0.24))] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.24)] md:p-10">
          <div className="mx-auto max-w-3xl text-center">
            <TextAnimate
              as="p"
              by="word"
              animation="blurInUp"
              once
              className="text-xs font-bold uppercase tracking-[0.34em] text-[#9B6F4C]"
            >
              {copy.galleryEyebrow}
            </TextAnimate>
            <TextAnimate
              as="h2"
              by="word"
              animation="blurInUp"
              once
              className="mt-4 font-serif text-3xl text-[#F4EFE6] md:text-5xl"
            >
              {copy.galleryTitle}
            </TextAnimate>
            <TextAnimate
              as="p"
              by="word"
              animation="blurInUp"
              once
              className="mt-5 text-sm leading-7 text-[#F4EFE6] md:text-base md:leading-8"
            >
              {copy.galleryBody}
            </TextAnimate>
          </div>

          <div className="mt-10 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(155,111,76,0.16),transparent_35%),linear-gradient(180deg,#1b252c_0%,#11191f_55%,#0a0f12_100%)] p-3 md:p-5">
            <ThreeDHoverGallery
              images={galleryImages}
              itemWidth={10}
              itemHeight={13}
              gap={0.85}
              perspective={38}
              hoverScale={9}
              transitionDuration={1}
              backgroundColor="#0f171c"
              grayscaleStrength={0.95}
              brightnessLevel={0.45}
              activeWidth={28}
              zDepth={7}
              autoPlay={false}
              className="min-h-[440px] rounded-[1.5rem] bg-transparent md:min-h-[540px]"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#0f171c] px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-8 overflow-hidden rounded-[2rem] border border-[#9B6F4C]/20 bg-[linear-gradient(180deg,rgba(244,239,230,0.04),rgba(15,23,28,0.18))] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.24)] md:grid-cols-2 md:p-10 lg:gap-12">
          <div className={t.dir === "rtl" ? "text-right" : "text-left"}>
            <TextAnimate
              as="p"
              by="word"
              animation="blurInUp"
              once
              className="text-xs font-bold uppercase tracking-[0.34em] text-[#9B6F4C]"
            >
              {copy.missionTitle}
            </TextAnimate>
            <TextAnimate
              as="h2"
              by="word"
              animation="blurInUp"
              once
              className="mt-4 font-serif text-3xl text-[#F4EFE6] md:text-5xl"
            >
              {copy.missionHeading}
            </TextAnimate>
            <div className="mt-6 space-y-5 text-sm leading-8 text-[#F4EFE6] md:text-base">
              {copy.missionBody.map((paragraph) => (
                <TextAnimate
                  key={paragraph}
                  as="p"
                  by="word"
                  animation="blurInUp"
                  once
                >
                  {paragraph}
                </TextAnimate>
              ))}
            </div>
          </div>

          <div className="relative min-h-[320px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#11191f] md:min-h-[460px]">
            <Image
              src="/images/jaecoo/jaecoo-hero.jpg"
              alt={copy.missionHeading}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,28,0.08),rgba(15,23,28,0.22)_55%,rgba(15,23,28,0.42)_100%)]" />
          </div>
        </div>
      </section>

      <Footer t={t} />
    </main>
  );
}
