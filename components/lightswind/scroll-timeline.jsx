"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Calendar } from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

const DEFAULT_EVENTS = [
  {
    year: "2023",
    title: "Major Achievement",
    subtitle: "Organization Name",
    description: "Description of the achievement or milestone reached during this time period."
  },
  {
    year: "2022",
    title: "Important Milestone",
    subtitle: "Organization Name",
    description: "Details about this significant milestone and its impact."
  },
  {
    year: "2021",
    title: "Key Event",
    subtitle: "Organization Name",
    description: "Information about this key event in the timeline."
  }
];

function Card({ className, children }) {
  return <div className={cn("rounded-[1.75rem]", className)}>{children}</div>;
}

function CardContent({ className, children }) {
  return <div className={className}>{children}</div>;
}

export function ScrollTimeline({
  events = DEFAULT_EVENTS,
  title = "Timeline",
  subtitle = "Scroll to explore the journey",
  animationOrder = "sequential",
  cardAlignment = "alternating",
  lineColor = "bg-[#9B6F4C]/20",
  activeColor = "bg-[#9B6F4C]",
  progressIndicator = true,
  cardVariant = "outlined",
  cardEffect = "shadow",
  parallaxIntensity = 0.12,
  progressLineWidth = 2,
  progressLineCap = "round",
  dateFormat = "badge",
  className = "",
  revealAnimation = "slide",
  connectorStyle = "line",
  perspective = false,
  darkMode = false
}) {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const timelineRefs = useRef([]);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const progressHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      const newIndex = Math.floor(value * events.length);
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < events.length) {
        setActiveIndex(newIndex);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, events.length, activeIndex]);

  const connectorClasses = useMemo(() => {
    const baseClasses = cn("absolute left-1/2 -translate-x-1/2", lineColor);
    const widthStyle = progressLineWidth <= 2 ? "w-px" : progressLineWidth === 3 ? "w-[3px]" : "w-1";
    switch (connectorStyle) {
      case "dots":
        return cn(baseClasses, "w-1 rounded-full");
      case "dashed":
        return cn(
          baseClasses,
          widthStyle,
          "[mask-image:linear-gradient(to_bottom,black_33%,transparent_33%,transparent_66%,black_66%)] [mask-size:1px_12px]"
        );
      default:
        return cn(baseClasses, widthStyle);
    }
  }, [connectorStyle, lineColor, progressLineWidth]);

  const getCardVariants = (index) => {
    const baseDelay =
      animationOrder === "simultaneous"
        ? 0
        : animationOrder === "staggered"
          ? index * 0.2
          : index * 0.3;

    const initialStates = {
      fade: { opacity: 0, y: 20 },
      slide: {
        x:
          cardAlignment === "left"
            ? -100
            : cardAlignment === "right"
              ? 100
              : index % 2 === 0
                ? -100
                : 100,
        opacity: 0
      },
      scale: { scale: 0.8, opacity: 0 },
      flip: { rotateY: 90, opacity: 0 },
      none: { opacity: 1 }
    };

    return {
      initial: initialStates[revealAnimation],
      whileInView: {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        rotateY: 0,
        transition: {
          duration: 0.7,
          delay: baseDelay,
          ease: [0.25, 0.1, 0.25, 1.0]
        }
      }
    };
  };

  const getCardClasses = (index) => {
    const baseClasses = "relative z-30 rounded-[1.75rem] transition-all duration-300";
    const variantClasses = {
      default: "border border-[#9B6F4C]/20 bg-[#F4EFE6]/55 shadow-sm backdrop-blur",
      elevated: "border border-[#9B6F4C]/25 bg-[#F4EFE6]/75 shadow-2xl backdrop-blur",
      outlined: "border border-[#9B6F4C]/25 bg-[#F4EFE6]/50 backdrop-blur-xl",
      filled: "border border-[#9B6F4C]/25 bg-[#282328]/92 text-[#F4EFE6] shadow-2xl"
    };
    const effectClasses = {
      none: "",
      glow: "hover:shadow-[0_0_24px_rgba(155,111,76,0.28)]",
      shadow: "hover:-translate-y-1 hover:shadow-2xl",
      bounce: "hover:scale-[1.02] hover:shadow-xl active:scale-[0.985]"
    };
    const alignmentClassesDesktop =
      cardAlignment === "alternating"
        ? index % 2 === 0
          ? "lg:mr-[calc(50%+24px)]"
          : "lg:ml-[calc(50%+24px)]"
        : cardAlignment === "left"
          ? "lg:mr-auto lg:ml-0"
          : "lg:ml-auto lg:mr-0";
    const perspectiveClass = perspective ? "transform-gpu transition-transform hover:[transform:perspective(1200px)_rotateY(2deg)_rotateX(2deg)]" : "";

    return cn(
      baseClasses,
      variantClasses[cardVariant],
      effectClasses[cardEffect],
      alignmentClassesDesktop,
      perspectiveClass,
      "w-full lg:w-[calc(50%-44px)]"
    );
  };

  return (
    <div
      ref={scrollRef}
      className={cn(
        "relative w-full overflow-hidden",
        darkMode ? "bg-[#282328] text-[#F4EFE6]" : "",
        className
      )}
    >
      <div className="px-4 pb-6 text-center">
        <h3 className={cn("text-2xl font-semibold md:text-3xl", darkMode ? "text-[#F4EFE6]" : "text-[#282328]")}>
          {title}
        </h3>
        {subtitle ? (
          <p className={cn("mx-auto mt-4 max-w-2xl text-sm leading-7 md:text-base", darkMode ? "text-[#F4EFE6]/72" : "text-[#282328]/68")}>
            {subtitle}
          </p>
        ) : null}
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pb-8">
        <div className="relative mx-auto">
          <div className={cn(connectorClasses, "absolute top-0 z-10 h-full")}></div>

          {progressIndicator ? (
            <>
              <motion.div
                className={cn("absolute top-0 z-10", activeColor)}
                style={{
                  height: progressHeight,
                  width: progressLineWidth,
                  left: "50%",
                  transform: "translateX(-50%)",
                  borderRadius: progressLineCap === "round" ? "9999px" : "0px",
                  boxShadow: "0 0 14px rgba(155,111,76,0.35), 0 0 28px rgba(155,111,76,0.16)"
                }}
              />
              <motion.div
                className="absolute z-20"
                style={{
                  top: progressHeight,
                  left: "50%",
                  translateX: "-50%",
                  translateY: "-50%"
                }}
              >
                <motion.div
                  className="h-5 w-5 rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(155,111,76,0.9) 0%, rgba(155,111,76,0.55) 40%, rgba(155,111,76,0) 72%)",
                    boxShadow: "0 0 14px 4px rgba(155,111,76,0.35), 0 0 26px 10px rgba(155,111,76,0.16)"
                  }}
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </>
          ) : null}

          <div className="relative z-20">
            {events.map((event, index) => {
              const yOffset = useTransform(
                smoothProgress,
                [0, 1],
                [parallaxIntensity * 100, -parallaxIntensity * 100]
              );

              return (
                <div
                  key={event.id || index}
                  ref={(el) => {
                    timelineRefs.current[index] = el;
                  }}
                  className={cn(
                    "relative mb-20 flex items-center py-4",
                    "flex-col lg:flex-row",
                    cardAlignment === "alternating"
                      ? index % 2 === 0
                        ? "lg:justify-start"
                        : "lg:flex-row-reverse lg:justify-start"
                      : cardAlignment === "left"
                        ? "lg:justify-start"
                        : "lg:flex-row-reverse lg:justify-start"
                  )}
                >
                  <div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 transform">
                    <motion.div
                      className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-full border-4 bg-[#E6DCC8]",
                        index <= activeIndex ? "border-[#9B6F4C]" : "border-[#9B6F4C]/30"
                      )}
                      animate={
                        index <= activeIndex
                          ? {
                              scale: [1, 1.2, 1],
                              boxShadow: [
                                "0 0 0px rgba(155,111,76,0)",
                                "0 0 12px rgba(155,111,76,0.42)",
                                "0 0 0px rgba(155,111,76,0)"
                              ]
                            }
                          : {}
                      }
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        repeatDelay: 4,
                        ease: "easeInOut"
                      }}
                    />
                  </div>

                  <motion.div
                    className={cn(getCardClasses(index), "mt-12 lg:mt-0")}
                    variants={getCardVariants(index)}
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: false, margin: "-100px" }}
                    style={parallaxIntensity > 0 ? { y: yOffset } : undefined}
                  >
                    <Card className={cn(cardVariant === "filled" ? "bg-transparent" : "")}>
                      <CardContent className="p-6 md:p-7">
                        {dateFormat === "badge" ? (
                          <div className="mb-3 flex items-center">
                            {event.icon || <Calendar className="mr-2 h-4 w-4 text-[#9B6F4C]" />}
                            <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#9B6F4C]">{event.year}</span>
                          </div>
                        ) : (
                          <p className="mb-2 text-lg font-bold text-[#9B6F4C]">{event.year}</p>
                        )}

                        <h4 className={cn("mb-1 text-xl font-bold", cardVariant === "filled" ? "text-[#F4EFE6]" : "text-[#282328]")}>
                          {event.title}
                        </h4>

                        {event.subtitle ? (
                          <p className={cn("mb-3 font-medium", cardVariant === "filled" ? "text-[#F4EFE6]/76" : "text-[#282328]/66")}>
                            {event.subtitle}
                          </p>
                        ) : null}

                        <p className={cn("leading-7", cardVariant === "filled" ? "text-[#F4EFE6]/82" : "text-[#282328]/72")}>
                          {event.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
