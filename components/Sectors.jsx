import Image from "next/image";
import { motion } from "motion/react";
import { TextAnimate } from "@/components/ui/text-animate";

const imageVariants = {
  hiddenLeft: { opacity: 0, x: -100 },
  hiddenRight: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const textVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay: 0.15 }
  }
};

const sectorAssets = [
  { image: "/images/luxuryvec.png", href: "/luxury-vehicles", hasLuxuryWatermark: true },
  { image: "/images/shatbah.png", href: "#company-details" },
  { image: "/images/maaqed.png", href: "#company-details" },
  { image: "/images/mohami.png", href: "#company-details" },
  { image: "/images/realistic/3.jpeg", href: "/markh" },
  { image: "/images/Unwan-AIDiyafa.png", href: "/unwan-aidiyafa" },
];

export default function Sectors({ t }) {
  return (
    <section
      id="sectors"
      className="scroll-mt-24 bg-[linear-gradient(180deg,#ddd1bb_0%,#e6dcc8_16%,#e6dcc8_100%)] py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-16 text-center">
          <div className="mx-auto mb-8 flex max-w-3xl justify-center">
            <Image
              src="/images/logo.png"
              alt={t.sectors.logoAlt}
              width={260}
              height={104}
              className="h-auto w-full max-w-[260px] object-contain"
              priority={false}
            />
          </div>
          <TextAnimate as="p" by="word" animation="blurInUp" dir={t.dir} locale={t.langLabel} className="text-sm font-semibold uppercase tracking-[0.35em] text-[#9B6F4C]">
            {t.sectors.title}
          </TextAnimate>
          <TextAnimate as="h2" by="word" animation="blurInUp" dir={t.dir} locale={t.langLabel} className="mt-4 text-4xl font-bold text-[#282328] md:text-6xl">
            {t.sectors.heading}
          </TextAnimate>
        </div>

        <div className="space-y-10 md:space-y-14">
          {t.sectors.items.map((item, index) => {
            const isReversed = index % 2 === 1;
            const asset = sectorAssets[index] || { image: "/images/logo.png", href: "#company-details" };
            const imageSrc = asset.image;
            const learnMoreHref = asset.href;

            return (
              <article
                key={item.company}
                className="overflow-hidden rounded-[2rem] border border-[#9B6F4C]/20 bg-[#F4EFE6]/70 shadow-xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <motion.div
                    initial={isReversed ? "hiddenRight" : "hiddenLeft"}
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.35 }}
                    variants={imageVariants}
                    className={`relative min-h-[280px] md:min-h-[430px] ${
                      isReversed ? "md:order-2" : "md:order-1"
                    }`}
                  >
                    <Image
                      src={imageSrc}
                      alt={item.company}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#282328]/50 via-[#282328]/8 to-transparent" />
                    <div className="absolute inset-x-6 bottom-6">
                      <p className="w-fit border border-[#9B6F4C]/30 bg-[#282328]/55 px-4 py-2 text-xs font-bold uppercase tracking-[0.32em] text-[#F4EFE6] backdrop-blur-md">
                        {item.sector}
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.35 }}
                    variants={textVariants}
                    className={`relative flex min-h-[360px] flex-col justify-center overflow-hidden p-8 md:p-12 lg:min-h-[430px] lg:p-16 ${
                      isReversed ? "md:order-1" : "md:order-2"
                    }`}
                  >
                    {asset.hasLuxuryWatermark ? (
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 right-0 w-full bg-[url('/images/luxury-vec.png')] bg-[length:clamp(200px,34vw,420px)] bg-[position:right_center] bg-no-repeat opacity-[0.16]"
                      />
                    ) : null}
                    <div className="relative z-10">
                    <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#9B6F4C]">
                      {item.sector}
                    </p>

                    <TextAnimate as="h3" by="word" animation="blurInUp" dir={t.dir} locale={t.langLabel} className="mt-5 text-3xl font-bold text-[#282328] md:text-4xl">
                      {item.company}
                    </TextAnimate>

                    <TextAnimate as="p" by="word" animation="blurInUp" dir={t.dir} locale={t.langLabel} className={`mt-6 max-w-xl text-[#282328]/75 ${t.dir === "rtl" ? "text-2xl leading-[1.9] md:text-3xl md:leading-[1.9]" : "text-base leading-8"}`}>
                      {item.body}
                    </TextAnimate>

                    <a
                      href={learnMoreHref}
                      className="mt-8 inline-flex w-fit border-b border-[#9B6F4C] pb-1 text-sm font-semibold text-[#9B6F4C] transition hover:text-[#282328]"
                    >
                      {t.sectors.learnMore}
                    </a>
                    </div>
                  </motion.div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
