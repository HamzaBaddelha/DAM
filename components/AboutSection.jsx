import SectionTitle from "./SectionTitle";

export default function AboutSection({ t }) {
  return (
    <section id="about" className="scroll-mt-24 bg-dam-texture px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div className="border-s-4 border-dam-bronze ps-7">
          <SectionTitle eyebrow={t.about.eyebrow} title={t.about.title} align="start" />
          <p className="text-lg leading-9 text-dam-dark/76">{t.about.body}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {t.about.metrics.map((metric) => (
              <div key={metric} className="border border-dam-bronze/25 bg-white/35 p-4 text-sm font-semibold text-dam-dark">
                {metric}
              </div>
            ))}
          </div>
        </div>
        <div className="relative min-h-[420px] overflow-hidden bg-dam-dark p-8 text-dam-cream shadow-bronze">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(40,35,40,0.18),rgba(40,35,40,0.84)),radial-gradient(circle_at_30%_20%,rgba(155,111,76,0.24),transparent_32%),url('/images/2030vision.png')] bg-cover bg-center bg-no-repeat opacity-95" />
          <div className="relative flex h-full min-h-[356px] flex-col justify-end border border-dam-bronze/35 p-6">
            <p className="max-w-sm text-2xl font-semibold leading-tight">2018</p>
            <p className="mt-2 max-w-sm text-dam-cream/78">A Riyadh-born investment platform with a disciplined multi-sector mandate.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
