import GlassCard from "./GlassCard";
import SectionTitle from "./SectionTitle";

export default function CompanyDetails({ t }) {
  return (
    <section id="company-details" className="scroll-mt-24 bg-dam-dark px-4 py-24 text-dam-cream sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionTitle title={t.details.title} tone="dark" dir={t.dir} locale={t.langLabel} />
        <GlassCard className="p-4 sm:p-6">
          <dl>
            {t.details.rows.map(([label, value]) => (
              <div key={label} className="grid gap-2 border-b border-white/10 py-5 last:border-b-0 sm:grid-cols-[240px_1fr]">
                <dt className="text-sm font-bold uppercase tracking-[0.18em] text-dam-bronze">{label}</dt>
                <dd className="text-lg font-semibold text-dam-cream">{value}</dd>
              </div>
            ))}
          </dl>
        </GlassCard>
      </div>
    </section>
  );
}
