import Image from "next/image";
import { motion } from "motion/react";

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

const sectorImages = {
  "Luxury Vehicles": "/images/luxuryvec.png",
  "العربات الفاخرة": "/images/luxuryvec.png",
  "Shatbah Contracting": "/images/shatbah.png",
  "شركة شاطبية للمقاولات": "/images/shatbah.png",
  Maqaed: "/images/maaqed.png",
  "مقاعد": "/images/maaqed.png",
  "First Lawyer Group": "/images/First-Lawyer.png",
  "شركة المحامي الأول للاستشارات القانونية": "/images/First-Lawyer.png",
  "Markh Restaurant": "/images/marakh.png",
  "مطعم مرخ": "/images/marakh.png",
  "Unwan AIDiyafa عنوان الضيافه": "/images/Unwan-AIDiyafa.png",
  "عنوان الضيافه": "/images/Unwan-AIDiyafa.png"
};

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
              alt="DAM Group Holding logo"
              width={260}
              height={104}
              className="h-auto w-full max-w-[260px] object-contain"
              priority={false}
            />
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#9B6F4C]">
            {t.sectors.title}
          </p>
          <h2 className="mt-4 text-4xl font-bold text-[#282328] md:text-6xl">
            {t.dir === "rtl" ? "قطاعاتنا الاستثمارية" : "Our Investment Sectors"}
          </h2>
        </div>

        <div className="space-y-10 md:space-y-14">
          {t.sectors.items.map((item, index) => {
            const isReversed = index % 2 === 1;
            const imageSrc = sectorImages[item.company] || "/images/logo.png";
            const hasLuxuryWatermark =
              item.company === "Luxury Vehicles" || item.company === "العربات الفاخرة";
            const learnMoreHref = hasLuxuryWatermark ? "/luxury-vehicles" : "#company-details";

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
                    {hasLuxuryWatermark ? (
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 right-0 w-full bg-[url('/images/luxury-vec.png')] bg-[length:clamp(200px,34vw,420px)] bg-[position:right_center] bg-no-repeat opacity-[0.16]"
                      />
                    ) : null}
                    <div className="relative z-10">
                    <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#9B6F4C]">
                      {item.sector}
                    </p>

                    <h3 className="mt-5 text-3xl font-bold text-[#282328] md:text-4xl">
                      {item.company}
                    </h3>

                    <p className="mt-6 max-w-xl text-base leading-8 text-[#282328]/75">
                      {item.body}
                    </p>

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
