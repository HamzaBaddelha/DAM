"use client";

import { useEffect, useState } from "react";
import AboutSection from "../components/AboutSection";
import CompanyDetails from "../components/CompanyDetails";
import CompanyStructureFlow from "../components/CompanyStructureFlow";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import MissionValues from "../components/MissionValues";
import Navbar from "../components/Navbar";
import OverviewSection from "../components/OverviewSection";
import QuoteSection from "../components/QuoteSection";
import Sectors from "../components/Sectors";
import Vision2030 from "../components/Vision2030";
import { content } from "../data/content";

export default function HomePage() {
  const [lang, setLang] = useState("ar");
  const t = content[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
  }, [lang, t.dir]);

  return (
    <main lang={lang} dir={t.dir} className="min-h-screen overflow-x-hidden bg-dam-beige">
      <Navbar t={t} lang={lang} setLang={setLang} />
      <Hero t={t} />
      <QuoteSection t={t} />
      <AboutSection t={t} />
      <OverviewSection t={t} />
      <Vision2030 t={t} />
      <MissionValues t={t} />
      <Sectors t={t} />
      <CompanyStructureFlow t={t} />
      <CompanyDetails t={t} />
      <Footer t={t} />
    </main>
  );
}
