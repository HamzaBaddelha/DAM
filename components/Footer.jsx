import Image from "next/image";

export default function Footer({ t }) {
  return (
    <footer className="bg-dam-dark px-4 py-14 text-dam-cream sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
        <div>
          <div className="relative h-16 w-56">
            <Image
              src="/images/logo.png"
              alt="DAM Group Holding"
              fill
              sizes="224px"
              className="object-contain object-left rtl:object-right"
            />
          </div>
          <p className="mt-4 max-w-sm text-dam-cream/72">{t.footer.tagline}</p>
        </div>
        <div>
          <h3 className="font-semibold text-dam-bronze">{t.footer.quickLinks}</h3>
          <div className="mt-4 grid gap-2">
            {t.nav.slice(0, 4).map((item) => (
              <a key={item.href} href={item.href} className="text-sm text-dam-cream/70 hover:text-dam-bronze">
                {item.label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-dam-bronze">{t.footer.sectors}</h3>
          <div className="mt-4 grid gap-2">
            {t.sectors.items.slice(0, 4).map((item) => (
              <span key={item.sector} className="text-sm text-dam-cream/70">
                {item.sector}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-dam-bronze">{t.footer.contact}</h3>
          <div className="mt-4 grid gap-2 text-sm text-dam-cream/70">
            <span>{t.footer.address}</span>
            <a href={`mailto:${t.footer.email}`} className="hover:text-dam-bronze">
              {t.footer.email}
            </a>
            <span>{t.footer.phone}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
