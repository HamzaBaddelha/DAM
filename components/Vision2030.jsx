import SectionTitle from "./SectionTitle";
import { PixelImage } from "@/components/ui/pixel-image";

export default function Vision2030({ t }) {
  return (
    <section id="vision-2030" className="scroll-mt-24 bg-dam-dark px-4 py-24 text-dam-cream sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="relative min-h-[460px] overflow-hidden border border-dam-bronze/30">
          <PixelImage
            src="/images/615ac244-b8b3-4872-9942-0ddaf3b900d7.png"
            alt="At the Heart of the Kingdom's Vision"
            grid="8x8"
            grayscaleAnimation
            className="absolute inset-0 h-full w-full"
            imageClassName="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(40,35,40,0.14),rgba(40,35,40,0.72)),radial-gradient(circle_at_50%_18%,rgba(230,220,200,0.16),transparent_28%)]" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-dam-dark via-dam-dark/70 to-transparent" />
          <div className="relative p-8">
            <span className="border border-dam-beige/30 px-4 py-2 text-sm font-bold text-dam-beige">Vision 2030</span>
          </div>
        </div>
        <div>
          <SectionTitle title={t.vision2030.title} align="start" tone="dark" />
          <p className="text-lg leading-9 text-dam-cream/78">{t.vision2030.body}</p>
          <div className="mt-9 space-y-4">
            {t.vision2030.points.map((point) => (
              <div key={point} className="flex items-center gap-4">
                <span className="h-px w-12 bg-dam-bronze" />
                <span className="font-semibold text-dam-beige">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
