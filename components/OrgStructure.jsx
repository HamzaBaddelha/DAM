import SectionTitle from "./SectionTitle";

function Node({ children, tone = "light" }) {
  const className =
    tone === "dark"
      ? "border-dam-bronze/45 bg-dam-dark text-dam-cream"
      : "border-dam-bronze/25 bg-white/55 text-dam-dark";
  return <div className={`border px-4 py-3 text-center text-sm font-semibold shadow-sm ${className}`}>{children}</div>;
}

export default function OrgStructure({ t }) {
  return (
    <section id="org-structure" className="scroll-mt-24 bg-dam-texture px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle title={t.org.title} />
        <div className="space-y-8">
          <div className="mx-auto max-w-md">
            <Node tone="dark">{t.org.board}</Node>
          </div>
          <div className="mx-auto h-8 w-px bg-dam-bronze" />
          <div className="grid gap-4 md:grid-cols-3">
            {t.org.boardUnits.map((unit) => (
              <Node key={unit}>{unit}</Node>
            ))}
          </div>
          <div className="mx-auto h-10 w-px bg-dam-bronze" />
          <div className="mx-auto max-w-md">
            <Node tone="dark">{t.org.ceo}</Node>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {t.org.ceoUnits.map((unit) => (
              <Node key={unit}>{unit}</Node>
            ))}
          </div>
          <div className="mx-auto h-10 w-px bg-dam-bronze" />
          <div className="grid gap-5 lg:grid-cols-5">
            {t.org.departments.map(([department, ...units]) => (
              <article key={department} className="border border-dam-bronze/25 bg-white/35 p-4">
                <Node tone="dark">{department}</Node>
                <div className="mx-auto h-5 w-px bg-dam-bronze" />
                <div className="space-y-3">
                  {units.map((unit) => (
                    <Node key={unit}>{unit}</Node>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
