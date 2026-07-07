"use client";

import { memo } from "react";
import SplitText from "@/components/motions/SplitText";

const splitTypeMap = {
  text: "words",
  word: "words",
  character: "chars",
  line: "lines",
};

const animationMap = {
  fadeIn: {
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
  },
  blurIn: {
    from: { opacity: 0, filter: "blur(10px)" },
    to: { opacity: 1, filter: "blur(0px)" },
  },
  blurInUp: {
    from: { opacity: 0, filter: "blur(10px)", y: 20 },
    to: { opacity: 1, filter: "blur(0px)", y: 0 },
  },
  blurInDown: {
    from: { opacity: 0, filter: "blur(10px)", y: -20 },
    to: { opacity: 1, filter: "blur(0px)", y: 0 },
  },
  slideUp: {
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
  },
  slideDown: {
    from: { opacity: 0, y: -20 },
    to: { opacity: 1, y: 0 },
  },
  slideLeft: {
    from: { opacity: 0, x: 20 },
    to: { opacity: 1, x: 0 },
  },
  slideRight: {
    from: { opacity: 0, x: -20 },
    to: { opacity: 1, x: 0 },
  },
  scaleUp: {
    from: { opacity: 0, scale: 0.86, y: 18 },
    to: { opacity: 1, scale: 1, y: 0 },
  },
  scaleDown: {
    from: { opacity: 0, scale: 1.12, y: 18 },
    to: { opacity: 1, scale: 1, y: 0 },
  },
};

const TextAnimateBase = ({
  children,
  animationKey,
  locale,
  delay = 0,
  duration = 0.85,
  variants,
  className,
  as: Component = "p",
  startOnView = true,
  once = false,
  by = "word",
  animation = "fadeIn",
  onAnimationComplete,
  ...props
}) => {
  if (children === null || children === undefined) return null;

  const text = typeof children === "string" ? children : String(children);
  const splitType = splitTypeMap[by] || "words";
  const motionPreset = variants ? { from: variants.hidden || {}, to: variants.show || {} } : animationMap[animation] || animationMap.fadeIn;
  const dir = props.dir;
  const resetKey = [animationKey, locale, dir, splitType, animation, text].filter(Boolean).join("::");

  return (
    <SplitText
      key={resetKey}
      text={text}
      animationKey={resetKey}
      tag={Component}
      className={className}
      delay={delay * 1000}
      duration={duration}
      splitType={splitType}
      from={motionPreset.from}
      to={motionPreset.to}
      startOnView={startOnView}
      once={once}
      onLetterAnimationComplete={onAnimationComplete}
      {...props}
    />
  );
};

export const TextAnimate = memo(TextAnimateBase);
