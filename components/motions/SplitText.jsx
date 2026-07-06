"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

export default function SplitText({
  text,
  className = "",
  delay = 50,
  duration = 1.25,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "inherit",
  tag = "p",
  startOnView = true,
  once = true,
  onLetterAnimationComplete,
}) {
  const ref = useRef(null);
  const animationCompletedRef = useRef(false);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  useEffect(() => {
    if (typeof document === "undefined" || !document.fonts) {
      setFontsLoaded(true);
      return;
    }

    if (document.fonts.status === "loaded") {
      setFontsLoaded(true);
      return;
    }

    document.fonts.ready.then(() => setFontsLoaded(true));
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return undefined;
      if (animationCompletedRef.current && once) return undefined;

      const el = ref.current;
      let targets;

      if (el._rbSplitInstance) {
        try {
          el._rbSplitInstance.revert();
        } catch {
          // Ignore stale split instances during re-renders.
        }
        el._rbSplitInstance = null;
      }

      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch ? marginMatch[2] || "px" : "px";
      const sign =
        marginValue === 0 ? "" : marginValue < 0 ? `-=${Math.abs(marginValue)}${marginUnit}` : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPct}%${sign}`;

      const splitInstance = new GSAPSplitText(el, {
        type: splitType,
        smartWrap: true,
        autoSplit: splitType.includes("lines"),
        linesClass: "split-line",
        wordsClass: "split-word",
        charsClass: "split-char",
        reduceWhiteSpace: false,
        onSplit: (self) => {
          if (splitType.includes("chars") && self.chars.length) targets = self.chars;
          if (!targets && splitType.includes("words") && self.words.length) targets = self.words;
          if (!targets && splitType.includes("lines") && self.lines.length) targets = self.lines;
          if (!targets) targets = self.chars || self.words || self.lines;

          const animationVars = {
            ...to,
            duration,
            ease,
            stagger: delay / 1000,
            once,
            willChange: "transform, opacity",
            force3D: true,
            onComplete: () => {
              animationCompletedRef.current = true;
              onCompleteRef.current?.();
            },
          };

          if (startOnView) {
            animationVars.scrollTrigger = {
              trigger: el,
              start,
              once,
              fastScrollEnd: true,
              anticipatePin: 0.4,
            };
          }

          return gsap.fromTo(targets, { ...from }, animationVars);
        },
      });

      el._rbSplitInstance = splitInstance;

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.trigger === el) trigger.kill();
        });

        try {
          splitInstance.revert();
        } catch {
          // Ignore cleanup races during hot reload.
        }

        el._rbSplitInstance = null;
      };
    },
    {
      dependencies: [text, className, delay, duration, ease, splitType, JSON.stringify(from), JSON.stringify(to), threshold, rootMargin, fontsLoaded, startOnView, once],
      scope: ref,
    }
  );

  const Tag = tag || "p";

  return (
    <Tag
      ref={ref}
      style={{ textAlign, wordWrap: "break-word", willChange: "transform, opacity" }}
      className={`split-parent overflow-hidden whitespace-pre-wrap ${className}`}
    >
      {text}
    </Tag>
  );
}
