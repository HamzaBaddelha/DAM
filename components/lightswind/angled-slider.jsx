"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const cardVariants = {
  offHover: (angle) => ({
    rotateY: angle,
    z: 60,
    opacity: 0.9,
    scale: 1,
    zIndex: 30,
    transition: {
      type: "spring",
      mass: 3,
      stiffness: 400,
      damping: 50,
    },
  }),
  onHover: (hoverScale) => ({
    rotateY: 0,
    z: 120,
    opacity: 1,
    scale: hoverScale,
    zIndex: 50,
    transition: {
      type: "spring",
      mass: 3,
      stiffness: 400,
      damping: 50,
    },
  }),
};

function AngledCard({ item, angle, hoverScale, cardWidth, cardHeight, showTitle }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative flex-shrink-0 cursor-pointer overflow-visible"
      style={{
        width: cardWidth,
        height: cardHeight,
        transformStyle: "preserve-3d",
      }}
      custom={isHovered ? hoverScale : angle}
      variants={cardVariants}
      initial="offHover"
      animate={isHovered ? "onHover" : "offHover"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] border border-white/12 bg-[#1b2422] shadow-[0_28px_80px_rgba(11,14,14,0.34)]">
        <Image
          src={item.url}
          alt={item.alt || "Slider image"}
          fill
          sizes="(min-width: 1280px) 360px, (min-width: 768px) 320px, 72vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,11,10,0.05),rgba(8,11,10,0.14)_48%,rgba(8,11,10,0.54)_100%)]" />
        {showTitle && item.title ? (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent p-5 text-white">
            <h3 className="premium-font text-xl">{item.title}</h3>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}

export function AngledSlider({
  items,
  speed = 40,
  direction = "left",
  containerHeight = "470px",
  cardWidth = "320px",
  cardHeight = "100%",
  gap = "32px",
  angle = 20,
  hoverScale = 1.04,
  className,
  showTitle = false,
}) {
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const [width, setWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const reduceMotion = useReducedMotion();

  const duplicatedItems = useMemo(() => [...items, ...items, ...items], [items]);

  useEffect(() => {
    const calculateWidth = () => {
      const numWidth = parseInt(String(cardWidth).replace("px", ""), 10);
      const numGap = parseInt(String(gap).replace("px", ""), 10);

      if (!Number.isNaN(numWidth) && !Number.isNaN(numGap)) {
        setWidth((numWidth + numGap) * items.length);
        return;
      }

      if (containerRef.current) {
        setWidth(containerRef.current.scrollWidth / 3);
      }
    };

    calculateWidth();
    window.addEventListener("resize", calculateWidth);
    return () => window.removeEventListener("resize", calculateWidth);
  }, [items, cardWidth, gap]);

  useEffect(() => {
    if (reduceMotion || width <= 0 || isHovered) return undefined;

    const startX = direction === "left" ? 0 : -width;
    const endX = direction === "left" ? -width : 0;

    const runAnimation = () => {
      const currentX = x.get();
      const totalDist = width;
      const dist = Math.abs(endX - currentX);
      const duration = speed * (dist / totalDist);

      const controls = animate(x, endX, {
        duration,
        ease: "linear",
        onComplete: () => {
          x.set(startX);
          runAnimation();
        },
      });

      return controls;
    };

    x.set(startX);
    const controls = runAnimation();
    return () => controls?.stop();
  }, [direction, isHovered, reduceMotion, speed, width, x]);

  return (
    <div
      className={cn("relative w-full overflow-hidden py-8 [perspective:1000px]", className)}
      style={{ height: containerHeight }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-[linear-gradient(90deg,rgba(236,227,210,1),rgba(236,227,210,0))]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-[linear-gradient(270deg,rgba(236,227,210,1),rgba(236,227,210,0))]" />

      <motion.div
        ref={containerRef}
        className="flex h-full items-center"
        style={{ x, gap, transformStyle: "preserve-3d" }}
      >
        {duplicatedItems.map((item, index) => (
          <AngledCard
            key={`${item.id}-${index}`}
            item={item}
            angle={direction === "left" ? angle : -angle}
            hoverScale={hoverScale}
            cardWidth={cardWidth}
            cardHeight={cardHeight}
            showTitle={showTitle}
          />
        ))}
      </motion.div>
    </div>
  );
}
