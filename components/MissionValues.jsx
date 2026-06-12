import SectionTitle from "./SectionTitle";
import { TextAnimate } from "@/components/ui/text-animate";
import { ScrollTimeline } from "@/components/lightswind/scroll-timeline";

export default function MissionValues({ t }) {
  const events = [
    {
      year: t.missionValues.visionTitle,
      title: t.missionValues.visionTitle,
      subtitle: "DAM Group Holding",
      description: t.missionValues.vision
    },
    {
      year: t.missionValues.missionTitle,
      title: t.missionValues.missionTitle,
      subtitle: "DAM Group Holding",
      description: t.missionValues.mission
    },
    ...t.missionValues.values.map(([title, body], index) => ({
      year: `${index + 1}`.padStart(2, "0"),
      title,
      subtitle: t.missionValues.valuesTitle,
      description: body
    }))
  ];

  return (
    <section id="mission-values" className="scroll-mt-24 bg-dam-texture px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle title={t.missionValues.title} />
        <div className="mt-10 overflow-hidden rounded-[2rem] border border-dam-bronze/20 bg-[#F4EFE6]/28 px-2 py-8 shadow-[0_30px_80px_rgba(40,35,40,0.08)] backdrop-blur-sm md:px-4">
          <ScrollTimeline
            events={events}
            title={t.missionValues.title}
            subtitle={t.dir === "rtl" ? "مرر لاكتشاف الرؤية والرسالة والقيم." : "Scroll through the vision, mission, and values journey."}
            animationOrder="staggered"
            cardAlignment="alternating"
            lineColor="bg-[#9B6F4C]/18"
            activeColor="bg-[#9B6F4C]"
            progressIndicator
            cardVariant="outlined"
            cardEffect="shadow"
            parallaxIntensity={0.08}
            progressLineWidth={3}
            progressLineCap="round"
            dateFormat="badge"
            revealAnimation="slide"
            connectorStyle="line"
            perspective
            className="min-h-0"
          />
        </div>
      </div>
    </section>
  );
}
