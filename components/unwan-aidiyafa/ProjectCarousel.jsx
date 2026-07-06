"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ArchImage from "@/components/unwan-aidiyafa/ArchImage";
import { TextAnimate } from "@/components/ui/text-animate";

const swipeThreshold = 80;

export default function ProjectCarousel({ projects, copy, dir }) {
  const [index, setIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(1);
  const reduceMotion = useReducedMotion();

  const total = projects.length;
  const isRtl = dir === "rtl";

  const paginate = React.useCallback(
    (delta) => {
      setDirection(delta);
      setIndex((current) => (current + delta + total) % total);
    },
    [total]
  );

  const goTo = React.useCallback(
    (nextIndex) => {
      if (nextIndex === index) return;
      setDirection(nextIndex > index ? 1 : -1);
      setIndex(nextIndex);
    },
    [index]
  );

  const handleDragEnd = (_, info) => {
    const offset = info.offset.x;
    const goNext = isRtl ? offset > swipeThreshold : offset < -swipeThreshold;
    const goPrev = isRtl ? offset < -swipeThreshold : offset > swipeThreshold;

    if (goNext) paginate(1);
    if (goPrev) paginate(-1);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      paginate(isRtl ? -1 : 1);
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      paginate(isRtl ? 1 : -1);
    }
  };

  const activeProject = projects[index];

  const variants = {
    enter: (customDirection) => ({
      x: reduceMotion ? 0 : customDirection > 0 ? (isRtl ? -72 : 72) : isRtl ? 72 : -72,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (customDirection) => ({
      x: reduceMotion ? 0 : customDirection > 0 ? (isRtl ? 72 : -72) : isRtl ? -72 : 72,
      opacity: 0,
    }),
  };

  const PrevIcon = isRtl ? ArrowRight : ArrowLeft;
  const NextIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-[#23302d]/68">
          {index + 1} / {total}
        </p>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            aria-label={copy.previousProject}
            onClick={() => paginate(-1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#B99668]/28 bg-white/50 text-[#23302d] transition hover:border-[#B99668]/42 hover:bg-white/70"
          >
            <PrevIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label={copy.nextProject}
            onClick={() => paginate(1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#B99668]/28 bg-[#23302d] text-[#F4EFE6] transition hover:border-[#B99668]/42 hover:bg-[#2e3d39]"
          >
            <NextIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        className="relative overflow-hidden rounded-[2rem]"
        tabIndex={0}
        aria-roledescription="carousel"
        aria-label={copy.carouselLabel}
        onKeyDown={handleKeyDown}
      >
        <AnimatePresence custom={direction} mode="wait">
          <motion.article
            key={activeProject.name}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            drag={reduceMotion ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={handleDragEnd}
            whileTap={reduceMotion ? undefined : { scale: 0.995 }}
            className="grid gap-6 rounded-[2rem] border border-white/22 bg-[linear-gradient(180deg,rgba(255,255,255,0.22),rgba(244,239,230,0.12))] p-4 shadow-[0_32px_90px_rgba(35,48,45,0.16)] backdrop-blur-[32px] sm:p-6 lg:grid-cols-[0.92fr_1.08fr] lg:p-8"
          >
            <motion.div whileHover={reduceMotion ? undefined : { y: -4 }}>
              <ArchImage
                src={activeProject.image}
                alt={activeProject.imageAlt}
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="min-h-[320px] md:min-h-[420px]"
              >
                <div className="absolute left-4 top-4 rounded-full border border-white/16 bg-[rgba(24,33,31,0.46)] px-4 py-2 text-sm font-bold text-[#F7E2C0] shadow-[0_16px_40px_rgba(10,12,12,0.24)] backdrop-blur-[24px] sm:left-6 sm:top-6">
                  {activeProject.units}
                </div>
              </ArchImage>
            </motion.div>

            <div className={`flex flex-col justify-between ${isRtl ? "text-right" : "text-left"}`}>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8F6A41]">{copy.projectLabel}</p>
                <TextAnimate as="h3" by="word" animation="blurInUp" className="mt-4 premium-font text-3xl font-bold text-[#23302d] sm:text-4xl">
                  {activeProject.name}
                </TextAnimate>
                <TextAnimate as="p" by="word" animation="blurInUp" className="mt-4 text-base font-bold text-[#23302d]/82">
                  {activeProject.type}
                </TextAnimate>

                <div className="mt-6 flex flex-wrap gap-3">
                  {activeProject.highlights.map((item) => (
                    <motion.span
                      key={item}
                      whileHover={reduceMotion ? undefined : { y: -2 }}
                      className="rounded-full border border-white/18 bg-[rgba(255,255,255,0.26)] px-4 py-2 text-sm font-bold text-[#23302d] shadow-[0_12px_30px_rgba(35,48,45,0.08)] backdrop-blur-[18px]"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {projects.map((project, projectIndex) => (
                  <button
                    key={project.name}
                    type="button"
                    onClick={() => goTo(projectIndex)}
                    aria-label={`${copy.goToProject} ${projectIndex + 1}`}
                    aria-pressed={projectIndex === index}
                    className={`h-2 rounded-full transition ${
                      projectIndex === index ? "w-12 bg-[#B99668]" : "w-6 bg-[#B99668]/28 hover:bg-[#B99668]/46"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  );
}
