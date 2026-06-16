"use client";

import Image from "next/image";
import { ValidationError, useForm } from "@formspree/react";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

export default function Navbar({ t, lang, setLang, linkPrefix = "", homeHref = "#top" }) {
  const [open, setOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [state, handleSubmit] = useForm("mdavjzvn");

  const saudiCities = useMemo(
    () =>
      [
        { en: "Riyadh", ar: "الرياض" },
        { en: "Jeddah", ar: "جدة" },
        { en: "Makkah", ar: "مكة المكرمة" },
        { en: "Madinah", ar: "المدينة المنورة" },
        { en: "Dammam", ar: "الدمام" },
        { en: "Khobar", ar: "الخبر" },
        { en: "Dhahran", ar: "الظهران" },
        { en: "Taif", ar: "الطائف" },
        { en: "Tabuk", ar: "تبوك" },
        { en: "Abha", ar: "أبها" },
        { en: "Khamis Mushait", ar: "خميس مشيط" },
        { en: "Jazan", ar: "جازان" },
        { en: "Najran", ar: "نجران" },
        { en: "Hail", ar: "حائل" },
        { en: "Buraidah", ar: "بريدة" },
        { en: "Unaizah", ar: "عنيزة" },
        { en: "Al Hofuf", ar: "الهفوف" },
        { en: "Al Mubarraz", ar: "المبرز" },
        { en: "Jubail", ar: "الجبيل" },
        { en: "Yanbu", ar: "ينبع" },
        { en: "Arar", ar: "عرعر" },
        { en: "Sakaka", ar: "سكاكا" },
        { en: "Al Bahah", ar: "الباحة" },
        { en: "Qurayyat", ar: "القريات" },
        { en: "Rabigh", ar: "رابغ" },
        { en: "Al Kharj", ar: "الخرج" },
        { en: "Hafar Al-Batin", ar: "حفر الباطن" },
        { en: "Al Majma'ah", ar: "المجمعة" },
        { en: "Wadi Ad-Dawasir", ar: "وادي الدواسر" },
        { en: "Qatif", ar: "القطيف" },
        { en: "Al Zulfi", ar: "الزلفي" },
        { en: "Bisha", ar: "بيشة" },
        { en: "AlUla", ar: "العلا" },
        { en: "Ras Tanura", ar: "رأس تنورة" },
        { en: "Sabya", ar: "صبيا" },
      ].map((city) => ({
        value: city.en,
        label: lang === "ar" ? city.ar : city.en,
      })),
    [lang]
  );

  const contactCopy = useMemo(
    () =>
      lang === "ar"
        ? {
            button: "تواصل",
            title: "تواصل معنا",
            subtitle: "شاركنا تفاصيلك وسنتواصل معك في أقرب وقت ممكن.",
            firstName: "الاسم الأول",
            lastName: "اسم العائلة",
            companyName: "اسم الشركة",
            position: "المنصب",
            email: "البريد الإلكتروني",
            phone: "رقم الجوال",
            city: "المدينة",
            cityPlaceholder: "اختر مدينتك",
            message: "الرسالة",
            submit: "إرسال",
            submitting: "جارٍ الإرسال...",
            success: "شكرا لتواصلك معنا. تم إرسال رسالتك بنجاح.",
            close: "إغلاق",
          }
        : {
            button: "Contact",
            title: "Contact Us",
            subtitle: "Share your details and our team will get back to you shortly.",
            firstName: "First Name",
            lastName: "Last Name",
            companyName: "Company Name",
            position: "Position",
            email: "Email Address",
            phone: "Phone Number",
            city: "City",
            cityPlaceholder: "Select your city",
            message: "Message",
            submit: "Submit",
            submitting: "Submitting...",
            success: "Thanks for contacting us. Your message has been sent successfully.",
            close: "Close",
          },
    [lang]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (state.succeeded) {
      setOpen(false);
    }
  }, [state.succeeded]);

  useEffect(() => {
    if (!contactOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setContactOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [contactOpen]);

  const switchLanguage = () => {
    setLang((currentLang) => (currentLang === "en" ? "ar" : "en"));
    setOpen(false);
  };
  const resolveHref = (href) => `${linkPrefix}${href}`;
  const openContactModal = () => {
    setOpen(false);
    setContactOpen(true);
  };

  const contactModal =
    mounted && contactOpen
      ? createPortal(
          <div className="fixed inset-0 z-[60] overflow-y-auto bg-[#171417]/55 px-4 py-6 backdrop-blur-sm sm:py-10">
            <div
              className="absolute inset-0"
              onClick={() => setContactOpen(false)}
              aria-hidden="true"
            />

            <div className="relative z-10 mx-auto mt-20 w-full max-w-2xl rounded-[2rem] border border-dam-bronze/25 bg-[rgba(230,220,200,0.98)] p-5 shadow-[0_30px_90px_rgba(40,35,40,0.28)] sm:mt-24 sm:max-h-[calc(100vh-7rem)] sm:overflow-y-auto sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div className={t.dir === "rtl" ? "text-right" : "text-left"}>
                  <h2 className="text-2xl font-bold text-[#282328] sm:text-3xl">{contactCopy.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-[#282328]/75">{contactCopy.subtitle}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setContactOpen(false)}
                  className="rounded-full border border-dam-bronze/30 px-3 py-1 text-sm font-bold text-[#282328] transition hover:border-dam-bronze hover:text-dam-bronze"
                  aria-label={contactCopy.close}
                >
                  ×
                </button>
              </div>

              {state.succeeded ? (
                <div className="mt-8 rounded-[1.5rem] border border-dam-bronze/20 bg-white/40 p-6 text-center text-[#282328]">
                  <p className="text-lg font-semibold">{contactCopy.success}</p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="mt-8 grid gap-4"
                  dir={t.dir}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="grid gap-2 text-sm font-semibold text-[#282328]">
                      <span>{contactCopy.firstName}</span>
                      <input
                        type="text"
                        name="firstName"
                        required
                        className="rounded-2xl border border-dam-bronze/20 bg-white/55 px-4 py-3 text-[#282328] outline-none transition focus:border-dam-bronze"
                      />
                      <ValidationError prefix={contactCopy.firstName} field="firstName" errors={state.errors} />
                    </label>

                    <label className="grid gap-2 text-sm font-semibold text-[#282328]">
                      <span>{contactCopy.lastName}</span>
                      <input
                        type="text"
                        name="lastName"
                        required
                        className="rounded-2xl border border-dam-bronze/20 bg-white/55 px-4 py-3 text-[#282328] outline-none transition focus:border-dam-bronze"
                      />
                      <ValidationError prefix={contactCopy.lastName} field="lastName" errors={state.errors} />
                    </label>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="grid gap-2 text-sm font-semibold text-[#282328]">
                      <span>{contactCopy.companyName}</span>
                      <input
                        type="text"
                        name="companyName"
                        required
                        className="rounded-2xl border border-dam-bronze/20 bg-white/55 px-4 py-3 text-[#282328] outline-none transition focus:border-dam-bronze"
                      />
                      <ValidationError prefix={contactCopy.companyName} field="companyName" errors={state.errors} />
                    </label>

                    <label className="grid gap-2 text-sm font-semibold text-[#282328]">
                      <span>{contactCopy.position}</span>
                      <input
                        type="text"
                        name="position"
                        required
                        className="rounded-2xl border border-dam-bronze/20 bg-white/55 px-4 py-3 text-[#282328] outline-none transition focus:border-dam-bronze"
                      />
                      <ValidationError prefix={contactCopy.position} field="position" errors={state.errors} />
                    </label>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="grid gap-2 text-sm font-semibold text-[#282328]">
                      <span>{contactCopy.email}</span>
                      <input
                        type="email"
                        name="email"
                        required
                        className="rounded-2xl border border-dam-bronze/20 bg-white/55 px-4 py-3 text-[#282328] outline-none transition focus:border-dam-bronze"
                      />
                      <ValidationError prefix={contactCopy.email} field="email" errors={state.errors} />
                    </label>

                    <label className="grid gap-2 text-sm font-semibold text-[#282328]">
                      <span>{contactCopy.phone}</span>
                      <input
                        type="tel"
                        name="phone"
                        required
                        className="rounded-2xl border border-dam-bronze/20 bg-white/55 px-4 py-3 text-[#282328] outline-none transition focus:border-dam-bronze"
                      />
                      <ValidationError prefix={contactCopy.phone} field="phone" errors={state.errors} />
                    </label>
                  </div>

                  <label className="grid gap-2 text-sm font-semibold text-[#282328]">
                    <span>{contactCopy.city}</span>
                    <select
                      name="city"
                      required
                      defaultValue=""
                      className="rounded-2xl border border-dam-bronze/20 bg-white/55 px-4 py-3 text-[#282328] outline-none transition focus:border-dam-bronze"
                    >
                      <option value="" disabled>
                        {contactCopy.cityPlaceholder}
                      </option>
                      {saudiCities.map((city) => (
                        <option key={city.value} value={city.value}>
                          {city.label}
                        </option>
                      ))}
                    </select>
                    <ValidationError prefix={contactCopy.city} field="city" errors={state.errors} />
                  </label>

                  <label className="grid gap-2 text-sm font-semibold text-[#282328]">
                    <span>{contactCopy.message}</span>
                    <textarea
                      name="message"
                      rows={6}
                      required
                      className="rounded-[1.5rem] border border-dam-bronze/20 bg-white/55 px-4 py-3 text-[#282328] outline-none transition focus:border-dam-bronze"
                    />
                    <ValidationError prefix={contactCopy.message} field="message" errors={state.errors} />
                  </label>

                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="mt-2 inline-flex w-fit items-center justify-center rounded-full bg-[#282328] px-6 py-3 text-sm font-bold text-[#F4EFE6] transition hover:bg-dam-bronze disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {state.submitting ? contactCopy.submitting : contactCopy.submit}
                  </button>
                </form>
              )}
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
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
          <button
            type="button"
            onClick={openContactModal}
            className="ml-2 rounded-full border border-dam-bronze/60 bg-[#282328] px-5 py-2 text-sm font-bold text-[#F4EFE6] shadow-sm transition hover:bg-dam-bronze"
          >
            {contactCopy.button}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openContactModal}
            className="rounded-full border border-dam-bronze/60 bg-[#282328] px-4 py-2 text-sm font-bold text-[#F4EFE6] shadow-sm transition hover:bg-dam-bronze lg:hidden"
          >
            {contactCopy.button}
          </button>
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
            <button
              type="button"
              onClick={openContactModal}
              className="rounded-2xl border border-dam-bronze/20 bg-[#282328] px-4 py-3 text-sm font-bold text-[#F4EFE6] hover:border-dam-bronze hover:bg-dam-bronze"
            >
              {contactCopy.button}
            </button>
          </div>
        </div>
      )}
      </header>
      {contactModal}
    </>
  );
}
