"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

export default function SplitText({
  text,
  animationKey,
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
  dir,
  ...props
}) {
  const ref = useRef(null);
  const animationCompletedRef = useRef(false);
  const lastRunKeyRef = useRef("");
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const containsArabic = /[\u0600-\u06FF]/.test(text || "");
  const isRtlText = dir === "rtl" || containsArabic;
  const resolvedSplitType = isRtlText && splitType.includes("chars") ? "words" : splitType;

  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  useEffect(() => {
    animationCompletedRef.current = false;
  }, [text, animationKey, dir, resolvedSplitType, once]);

  useEffect(() => {
    if (typeof document === "undefined" || !document.fonts) {
      setFontsLoaded(true);
      return;
    }

    if (document.fonts.status === "loaded") {
      setFontsLoaded(true);
      return;
    }

    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) setFontsLoaded(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return undefined;
      const runKey = [animationKey, text, dir, isRtlText ? "rtl-block" : resolvedSplitType].filter(Boolean).join("::");

      if (lastRunKeyRef.current !== runKey) {
        animationCompletedRef.current = false;
        lastRunKeyRef.current = runKey;
      }

      if (animationCompletedRef.current && once) return undefined;

      const el = ref.current;
      let tween;
      let targets;

      if (el._rbSplitInstance) {
        try {
          el._rbSplitInstance.revert();
        } catch {
          // Ignore stale split instances during re-renders.
        }
        el._rbSplitInstance = null;
      }

      el.replaceChildren(document.createTextNode(text));

      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch ? marginMatch[2] || "px" : "px";
      const sign =
        marginValue === 0 ? "" : marginValue < 0 ? `-=${Math.abs(marginValue)}${marginUnit}` : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPct}%${sign}`;

      if (isRtlText) {
        const animationVars = {
          ...to,
          duration,
          ease,
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
            fastScrollEnd: true,
            anticipatePin: 0.4,
          };

          if (once) {
            animationVars.scrollTrigger.once = true;
          }
        }

        tween = gsap.fromTo(el, { ...from }, animationVars);

        return () => {
          if (tween) {
            tween.kill();
          }

          ScrollTrigger.getAll().forEach((trigger) => {
            if (trigger.trigger === el) trigger.kill();
          });

          if (el.isConnected) {
            el.replaceChildren(document.createTextNode(text));
          }
        };
      }

      const splitInstance = new GSAPSplitText(el, {
        type: resolvedSplitType,
        smartWrap: true,
        autoSplit: resolvedSplitType.includes("lines"),
        linesClass: "split-line",
        wordsClass: "split-word",
        charsClass: "split-char",
        reduceWhiteSpace: false,
        onSplit: (self) => {
          if (resolvedSplitType.includes("chars") && self.chars.length) targets = self.chars;
          if (!targets && resolvedSplitType.includes("words") && self.words.length) targets = self.words;
          if (!targets && resolvedSplitType.includes("lines") && self.lines.length) targets = self.lines;
          if (!targets) targets = self.chars || self.words || self.lines;

          const animationVars = {
            ...to,
            duration,
            ease,
            stagger: delay / 1000,
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
              fastScrollEnd: true,
              anticipatePin: 0.4,
            };

            if (once) {
              animationVars.scrollTrigger.once = true;
            }
          }

          tween = gsap.fromTo(targets, { ...from }, animationVars);
          return tween;
        },
      });

      el._rbSplitInstance = splitInstance;

      return () => {
        if (tween) {
          tween.kill();
        }

        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.trigger === el) trigger.kill();
        });

        try {
          splitInstance.revert();
        } catch {
          // Ignore cleanup races during hot reload.
        }

        el._rbSplitInstance = null;

        if (el.isConnected) {
          el.replaceChildren(document.createTextNode(text));
        }
      };
    },
    {
      dependencies: [text, animationKey, dir, className, delay, duration, ease, isRtlText, resolvedSplitType, JSON.stringify(from), JSON.stringify(to), threshold, rootMargin, fontsLoaded, startOnView, once],
      scope: ref,
    }
  );

  const Tag = tag || "p";

  return (
    <Tag
      ref={ref}
      style={{ textAlign, wordWrap: "break-word", willChange: "transform, opacity", unicodeBidi: "plaintext", direction: isRtlText ? "rtl" : undefined }}
      className={`split-parent overflow-hidden whitespace-pre-wrap ${className}`}
      dir={dir || (isRtlText ? "rtl" : undefined)}
      lang={isRtlText ? "ar" : undefined}
      {...props}
    >
      {text}
    </Tag>
  );
}
