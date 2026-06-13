"use client";

import { useEffect, useRef, useState } from "react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function ThreeDHoverGallery({
  images = [],
  itemWidth = 12,
  itemHeight = 18,
  gap = 1,
  perspective = 42,
  hoverScale = 10,
  transitionDuration = 1.1,
  backgroundColor,
  grayscaleStrength = 0.9,
  brightnessLevel = 0.55,
  activeWidth = 32,
  zDepth = 8,
  enableKeyboardNavigation = true,
  autoPlay = false,
  autoPlayDelay = 3200,
  className,
  style,
  onImageClick,
  onImageHover,
  onImageFocus
}) {
  const containerRef = useRef(null);
  const autoPlayRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [focusedIndex, setFocusedIndex] = useState(null);

  useEffect(() => {
    if (!autoPlay || images.length === 0) {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
      return undefined;
    }

    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        if (prev === null) {
          return 0;
        }

        return (prev + 1) % images.length;
      });
    }, autoPlayDelay);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    };
  }, [autoPlay, autoPlayDelay, images.length]);

  const handleImageClick = (index, image) => {
    setActiveIndex((prev) => (prev === index ? null : index));
    onImageClick?.(index, image);
  };

  const handleImageHover = (index, image) => {
    if (!autoPlay) {
      setActiveIndex(index);
    }

    onImageHover?.(index, image);
  };

  const handleImageLeave = () => {
    if (!autoPlay) {
      setActiveIndex(null);
    }
  };

  const handleImageFocus = (index, image) => {
    setFocusedIndex(index);
    setActiveIndex(index);
    onImageFocus?.(index, image);
  };

  const handleKeyDown = (event, index) => {
    if (!enableKeyboardNavigation) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleImageClick(index, images[index]);
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      const prevIndex = index > 0 ? index - 1 : images.length - 1;
      containerRef.current?.children[prevIndex]?.focus();
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      const nextIndex = index < images.length - 1 ? index + 1 : 0;
      containerRef.current?.children[nextIndex]?.focus();
    }
  };

  const getItemStyle = (index) => {
    const isActive = activeIndex === index;
    const isFocused = focusedIndex === index;

    return {
      width: isActive ? `min(${activeWidth}vw, 28rem)` : `min(${itemWidth}vw + 10px, 9rem)`,
      height: `clamp(18rem, calc(${itemHeight}vw + ${itemHeight}vh), 30rem)`,
      backgroundImage: `linear-gradient(180deg, rgba(18,49,82,0.08), rgba(8,14,24,0.34)), url(${images[index]})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundColor,
      filter:
        isActive || isFocused
          ? "grayscale(0) brightness(1)"
          : `grayscale(${grayscaleStrength}) brightness(${brightnessLevel})`,
      transform: isActive ? `translateZ(${zDepth}rem) scale(1.02)` : "translateZ(0) scale(1)",
      transition: `transform ${transitionDuration}s cubic-bezier(.1,.7,0,1), filter ${transitionDuration}s cubic-bezier(.1,.7,0,1), width ${transitionDuration}s cubic-bezier(.1,.7,0,1), box-shadow ${transitionDuration}s cubic-bezier(.1,.7,0,1)`,
      willChange: "transform, filter, width",
      zIndex: isActive ? 20 : 1,
      boxShadow: isActive ? "0 30px 80px rgba(0,0,0,0.34)" : "0 18px 45px rgba(0,0,0,0.22)",
      outline: isFocused ? "2px solid rgba(155,111,76,0.95)" : "none",
      outlineOffset: "4px",
      borderRadius: "1.25rem"
    };
  };

  return (
    <div
      className={cn("flex min-h-[560px] w-full items-center justify-center overflow-hidden", className)}
      style={backgroundColor ? { backgroundColor, ...style } : style}
    >
      <div
        ref={containerRef}
        className="flex w-full items-center justify-center"
        style={{
          perspective: `calc(${perspective}vw + ${perspective}vh)`,
          gap: `${gap}rem`
        }}
      >
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            className="relative shrink-0 overflow-hidden border border-white/10 bg-[#102948] shadow-lg"
            style={getItemStyle(index)}
            tabIndex={enableKeyboardNavigation ? 0 : -1}
            onClick={() => handleImageClick(index, image)}
            onMouseEnter={() => handleImageHover(index, image)}
            onMouseLeave={handleImageLeave}
            onFocus={() => handleImageFocus(index, image)}
            onBlur={() => setFocusedIndex(null)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            aria-label={`Gallery image ${index + 1} of ${images.length}`}
            aria-pressed={activeIndex === index}
          >
            <span className="absolute inset-0 rounded-[1.25rem] border border-white/12" />
            <span className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.5))]" />
          </button>
        ))}
      </div>
    </div>
  );
}
