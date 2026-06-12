"use client";

import Image from "next/image";
import { useState } from "react";

export default function Navbar({ t, lang, setLang, linkPrefix = "", homeHref = "#top" }) {
  const [open, setOpen] = useState(false);
  const switchLanguage = () => {
    setLang((currentLang) => (currentLang === "en" ? "ar" : "en"));
    setOpen(false);
  };
  const resolveHref = (href) => `${linkPrefix}${href}`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-dam-bronze/25 bg-[rgba(230,220,200,0.96)] shadow-[0_18px_55px_rgba(40,35,40,0.18)] backdrop-blur-[34px] backdrop-saturate-150">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href={homeHref} className="flex items-center gap-3" aria-label="DAM Group Holding home">
          <span className="relative block h-12 w-36 sm:w-44">
            <Image
              src="/images/logo.png"
              alt="DAM Group Holding"
              fill
              priority
              sizes="(min-width: 640px) 176px, 144px"
              className="object-contain"
            />
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {t.nav.map((item) => (
            <a
              key={item.href}
              href={resolveHref(item.href)}
              className="px-3 py-2 text-sm font-bold text-[#171417] transition hover:text-dam-bronze"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={switchLanguage}
            className="rounded-full border border-dam-bronze/60 bg-white/45 px-5 py-2 text-sm font-bold text-[#171417] shadow-sm backdrop-blur-xl transition hover:bg-dam-bronze hover:text-white"
            aria-label={`Switch language to ${t.switchLabel}`}
          >
            {t.switchLabel}
          </button>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-full border border-dam-bronze/45 bg-white/45 text-[#171417] backdrop-blur-xl lg:hidden"
            aria-expanded={open}
            aria-label="Toggle navigation menu"
          >
            <span className="space-y-1.5">
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-dam-bronze/20 bg-[rgba(230,220,200,0.98)] px-4 py-4 shadow-[0_24px_60px_rgba(40,35,40,0.16)] backdrop-blur-[34px] lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {t.nav.map((item) => (
              <a
                key={item.href}
                href={resolveHref(item.href)}
                onClick={() => setOpen(false)}
                className="rounded-2xl border border-dam-bronze/20 bg-white/45 px-4 py-3 text-sm font-bold text-[#171417] hover:border-dam-bronze hover:text-dam-bronze"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
