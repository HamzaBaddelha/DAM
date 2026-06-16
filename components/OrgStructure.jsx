"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Handle, Position, ReactFlow } from "@xyflow/react";
import { AnimatedSVGEdge } from "./ui/AnimatedSVGEdge";
import { TextAnimate } from "./ui/text-animate";

function MobileNode({ children, tone = "light" }) {
  const className =
    tone === "dark"
      ? "border-[#9B6F4C]/35 bg-[#efe2cf] text-[#111012] shadow-[0_16px_30px_rgba(0,0,0,0.08)]"
      : "border-[#d7ccb9] bg-[#f7efe2] text-[#111012] shadow-[0_10px_24px_rgba(40,35,40,0.06)]";

  return (
    <div
      className={`w-full rounded-none border px-4 py-4 text-center text-base font-semibold leading-7 ${className}`}
    >
      {children}
    </div>
  );
}

function OrgNode({ data }) {
  const isExecutive = data.variant === "executive";
  const isDepartment = data.variant === "department";
  const isCompact = data.size === "compact";

  return (
    <div
      className={[
        "group relative overflow-hidden rounded-xl border transition-transform duration-300 hover:-translate-y-1",
        isExecutive
          ? isCompact
            ? "w-[188px] border-[#9B6F4C]/55 bg-[#efe2cf] text-[#111012] shadow-[0_18px_32px_rgba(40,35,40,0.10)]"
            : "w-[340px] border-[#9B6F4C]/55 bg-[#efe2cf] text-[#111012] shadow-[0_22px_40px_rgba(40,35,40,0.12)]"
          : "",
        data.variant === "unit"
          ? isCompact
            ? "w-[172px] border-[#9B6F4C]/35 bg-[#f7efe2]/95 text-[#111012] shadow-[0_16px_28px_rgba(40,35,40,0.08)]"
            : "w-[330px] border-[#9B6F4C]/35 bg-[#f7efe2]/95 text-[#111012] shadow-[0_18px_32px_rgba(40,35,40,0.10)]"
          : "",
        isDepartment
          ? isCompact
            ? "w-[200px] border-[#9B6F4C]/35 bg-[#f7efe2]/95 text-[#111012] shadow-[0_18px_32px_rgba(40,35,40,0.08)]"
            : "w-[360px] border-[#9B6F4C]/35 bg-[#f7efe2]/95 text-[#111012] shadow-[0_20px_36px_rgba(40,35,40,0.10)]"
          : "",
      ].join(" ")}
    >
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#9B6F4C] to-transparent opacity-90" />

      {isDepartment ? (
        <div>
          <div
            className={
              isCompact ? "bg-[#eadcc6] px-4 py-3" : "bg-[#eadcc6] px-5 py-4"
            }
          >
            <p
              className={
                isCompact
                  ? "text-xs font-semibold leading-5 text-[#111012]"
                  : "text-4xl font-semibold leading-8 text-[#111012]"
              }
            >
              {data.title}
            </p>
          </div>

          <div className="h-px bg-[#9B6F4C]/50" />

          <div
            className={
              isCompact ? "space-y-2 px-4 py-3" : "space-y-3 px-5 py-5"
            }
          >
            {data.items.map((item) => (
              <div
                key={item}
                className={[
                  "rounded-lg border border-[#9B6F4C]/20 bg-[#f3e8d7] text-[#111012]",
                  isCompact
                    ? "px-2.5 py-2 text-[11px] leading-4"
                    : "px-4 py-3 text-xl leading-8",
                ].join(" ")}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          className={isCompact ? "px-4 py-3 text-center" : "px-5 py-4 text-center"}
        >
          <p
            className={
              isExecutive
                ? isCompact
                  ? "text-sm font-semibold leading-5"
                  : "text-[4rem] font-semibold leading-[2.6rem]"
                : isCompact
                  ? "text-xs font-medium leading-5"
                  : "text-3xl font-medium leading-9"
            }
          >
            {data.title}
          </p>
        </div>
      )}

      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </div>
  );
}

const nodeTypes = {
  orgNode: OrgNode,
};

const edgeTypes = {
  animatedSvg: AnimatedSVGEdge,
};

export default function OrgStructure({ t }) {
  const [isMobile, setIsMobile] = useState(false);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const [
    financeDepartment,
    itDepartment,
    hrDepartment,
    marketingDepartment,
    customerExperienceDepartment,
  ] = t.org.departments;

  const compactSize = isMobile ? "compact" : "regular";

  const nodes = useMemo(() => {
    if (isMobile) {
      return [
        {
          id: "board",
          type: "orgNode",
          position: { x: 260, y: 20 },
          data: { title: t.org.board, variant: "executive", size: compactSize },
        },
        {
          id: "investment-unit",
          type: "orgNode",
          position: { x: 20, y: 145 },
          data: { title: t.org.boardUnits[0], variant: "unit", size: compactSize },
        },
        {
          id: "strategic-transformation-unit",
          type: "orgNode",
          position: { x: 260, y: 145 },
          data: { title: t.org.boardUnits[1], variant: "unit", size: compactSize },
        },
        {
          id: "internal-audit-unit",
          type: "orgNode",
          position: { x: 500, y: 145 },
          data: { title: t.org.boardUnits[2], variant: "unit", size: compactSize },
        },
        {
          id: "ceo",
          type: "orgNode",
          position: { x: 260, y: 295 },
          data: { title: t.org.ceo, variant: "executive", size: compactSize },
        },
        {
          id: "deputy-ceo",
          type: "orgNode",
          position: { x: 0, y: 430 },
          data: { title: t.org.ceoUnits[0], variant: "unit", size: compactSize },
        },
        {
          id: "ceo-office-assistant",
          type: "orgNode",
          position: { x: 210, y: 430 },
          data: { title: t.org.ceoUnits[1], variant: "unit", size: compactSize },
        },
        {
          id: "business-development-unit",
          type: "orgNode",
          position: { x: 420, y: 430 },
          data: { title: t.org.ceoUnits[2], variant: "unit", size: compactSize },
        },
        {
          id: "operations-unit",
          type: "orgNode",
          position: { x: 630, y: 430 },
          data: { title: t.org.ceoUnits[3], variant: "unit", size: compactSize },
        },
        {
          id: "finance-department",
          type: "orgNode",
          position: { x: 0, y: 590 },
          data: {
            title: financeDepartment[0],
            items: financeDepartment.slice(1),
            variant: "department",
            size: compactSize,
          },
        },
        {
          id: "it-department",
          type: "orgNode",
          position: { x: 240, y: 590 },
          data: {
            title: itDepartment[0],
            items: itDepartment.slice(1),
            variant: "department",
            size: compactSize,
          },
        },
        {
          id: "hr-department",
          type: "orgNode",
          position: { x: 480, y: 590 },
          data: {
            title: hrDepartment[0],
            items: hrDepartment.slice(1),
            variant: "department",
            size: compactSize,
          },
        },
        {
          id: "marketing-department",
          type: "orgNode",
          position: { x: 720, y: 590 },
          data: {
            title: marketingDepartment[0],
            items: marketingDepartment.slice(1),
            variant: "department",
            size: compactSize,
          },
        },
        {
          id: "customer-experience-department",
          type: "orgNode",
          position: { x: 960, y: 590 },
          data: {
            title: customerExperienceDepartment[0],
            items: customerExperienceDepartment.slice(1),
            variant: "department",
            size: compactSize,
          },
        },
      ];
    }

    return [
      {
        id: "board",
        type: "orgNode",
        position: { x: 1100, y: 20 },
        data: { title: t.org.board, variant: "executive", size: compactSize },
      },
      {
        id: "investment-unit",
        type: "orgNode",
        position: { x: 150, y: 170 },
        data: { title: t.org.boardUnits[0], variant: "unit", size: compactSize },
      },
      {
        id: "strategic-transformation-unit",
        type: "orgNode",
        position: { x: 900, y: 170 },
        data: { title: t.org.boardUnits[1], variant: "unit", size: compactSize },
      },
      {
        id: "internal-audit-unit",
        type: "orgNode",
        position: { x: 1500, y: 170 },
        data: { title: t.org.boardUnits[2], variant: "unit", size: compactSize },
      },
      {
        id: "ceo",
        type: "orgNode",
        position: { x: 1100, y: 340 },
        data: { title: t.org.ceo, variant: "executive", size: compactSize },
      },
      {
        id: "deputy-ceo",
        type: "orgNode",
        position: { x: 0, y: 510 },
        data: { title: t.org.ceoUnits[0], variant: "unit", size: compactSize },
      },
      {
        id: "ceo-office-assistant",
        type: "orgNode",
        position: { x: 620, y: 510 },
        data: { title: t.org.ceoUnits[1], variant: "unit", size: compactSize },
      },
      {
        id: "business-development-unit",
        type: "orgNode",
        position: { x: 1240, y: 510 },
        data: { title: t.org.ceoUnits[2], variant: "unit", size: compactSize },
      },
      {
        id: "operations-unit",
        type: "orgNode",
        position: { x: 1860, y: 510 },
        data: { title: t.org.ceoUnits[3], variant: "unit", size: compactSize },
      },
      {
        id: "finance-department",
        type: "orgNode",
        position: { x: 0, y: 720 },
        data: {
          title: financeDepartment[0],
          items: financeDepartment.slice(1),
          variant: "department",
          size: compactSize,
        },
      },
      {
        id: "it-department",
        type: "orgNode",
        position: { x: 520, y: 720 },
        data: {
          title: itDepartment[0],
          items: itDepartment.slice(1),
          variant: "department",
          size: compactSize,
        },
      },
      {
        id: "hr-department",
        type: "orgNode",
        position: { x: 1040, y: 720 },
        data: {
          title: hrDepartment[0],
          items: hrDepartment.slice(1),
          variant: "department",
          size: compactSize,
        },
      },
      {
        id: "marketing-department",
        type: "orgNode",
        position: { x: 1560, y: 720 },
        data: {
          title: marketingDepartment[0],
          items: marketingDepartment.slice(1),
          variant: "department",
          size: compactSize,
        },
      },
      {
        id: "customer-experience-department",
        type: "orgNode",
        position: { x: 2080, y: 720 },
        data: {
          title: customerExperienceDepartment[0],
          items: customerExperienceDepartment.slice(1),
          variant: "department",
          size: compactSize,
        },
      },
    ];
  }, [
    compactSize,
    customerExperienceDepartment,
    financeDepartment,
    hrDepartment,
    isMobile,
    itDepartment,
    marketingDepartment,
    t.org.board,
    t.org.boardUnits,
    t.org.ceo,
    t.org.ceoUnits,
  ]);

  const edges = useMemo(
    () => [
      {
        id: "board-investment-unit",
        source: "board",
        target: "investment-unit",
        type: "animatedSvg",
      },
      {
        id: "board-strategic-transformation-unit",
        source: "board",
        target: "strategic-transformation-unit",
        type: "animatedSvg",
      },
      {
        id: "board-internal-audit-unit",
        source: "board",
        target: "internal-audit-unit",
        type: "animatedSvg",
      },
      {
        id: "board-ceo",
        source: "board",
        target: "ceo",
        type: "animatedSvg",
      },
      {
        id: "ceo-deputy-ceo",
        source: "ceo",
        target: "deputy-ceo",
        type: "animatedSvg",
      },
      {
        id: "ceo-ceo-office-assistant",
        source: "ceo",
        target: "ceo-office-assistant",
        type: "animatedSvg",
      },
      {
        id: "ceo-business-development-unit",
        source: "ceo",
        target: "business-development-unit",
        type: "animatedSvg",
      },
      {
        id: "ceo-operations-unit",
        source: "ceo",
        target: "operations-unit",
        type: "animatedSvg",
      },
      {
        id: "ceo-finance-department",
        source: "ceo",
        target: "finance-department",
        type: "animatedSvg",
      },
      {
        id: "ceo-it-department",
        source: "ceo",
        target: "it-department",
        type: "animatedSvg",
      },
      {
        id: "ceo-hr-department",
        source: "ceo",
        target: "hr-department",
        type: "animatedSvg",
      },
      {
        id: "ceo-marketing-department",
        source: "ceo",
        target: "marketing-department",
        type: "animatedSvg",
      },
      {
        id: "ceo-customer-experience-department",
        source: "ceo",
        target: "customer-experience-department",
        type: "animatedSvg",
      },
    ],
    []
  );

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkViewport();
    window.addEventListener("resize", checkViewport);

    return () => {
      window.removeEventListener("resize", checkViewport);
    };
  }, []);

  useEffect(() => {
    if (!reactFlowInstance) {
      return undefined;
    }

    const fitOptions = isMobile
      ? { padding: 0.14, minZoom: 0.2, maxZoom: 0.9 }
      : { padding: 0.1, minZoom: 0.25, maxZoom: 0.72 };

    const rafId = window.requestAnimationFrame(() => {
      reactFlowInstance.fitView(fitOptions);
    });

    const timeoutId = window.setTimeout(() => {
      reactFlowInstance.fitView(fitOptions);
    }, 180);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
    };
  }, [isMobile, nodes, reactFlowInstance]);

  const subtitle =
    t.dir === "rtl"
      ? "هيكل حوكمة راقٍ صُمم لدعم تنويع الاستثمارات، والتميز التشغيلي، وبناء قيمة طويلة الأمد."
      : "A premium structure designed to support investment diversification, operational excellence, and long-term value creation.";

  if (isMobile) {
    return (
      <section id="org-structure" className="scroll-mt-24 bg-[#E6DCC8] py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="relative mx-auto mb-6 h-28 w-44">
              <Image
                src="/images/logodam.png"
                alt="DAM Group Holding logo"
                fill
                sizes="176px"
                className="object-contain"
              />
            </div>

            <TextAnimate
              as="h2"
              by="word"
              animation="blurInUp"
              once
              className="text-4xl font-bold text-[#282328]"
            >
              {t.org.title}
            </TextAnimate>
          </div>

          <div className="mt-10 space-y-4">
            <MobileNode tone="dark">{t.org.board}</MobileNode>
            <div className="mx-auto h-8 w-px bg-[#9B6F4C]/70" />

            {t.org.boardUnits.map((unit) => (
              <MobileNode key={unit}>{unit}</MobileNode>
            ))}

            <div className="mx-auto h-8 w-px bg-[#9B6F4C]/70" />
            <MobileNode tone="dark">{t.org.ceo}</MobileNode>

            {t.org.ceoUnits.map((unit) => (
              <MobileNode key={unit}>{unit}</MobileNode>
            ))}

            <div className="pt-2">
              {t.org.departments.map(([department, ...units]) => (
                <div key={department} className="mb-5 space-y-3">
                  <MobileNode tone="dark">{department}</MobileNode>

                  {units.map((unit) => (
                    <MobileNode key={unit}>{unit}</MobileNode>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="org-structure"
      className="relative scroll-mt-24 overflow-hidden bg-[#E6DCC8] py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <div className="relative mx-auto mb-8 h-36 w-56 md:h-40 md:w-64">
            <Image
              src="/images/logodam.png"
              alt="DAM Group Holding logo"
              fill
              sizes="256px"
              className="object-contain"
            />
          </div>

          <TextAnimate
            as="p"
            by="word"
            animation="blurInUp"
            once
            className="text-sm font-semibold uppercase tracking-[0.35em] text-[#9B6F4C]"
          >
            {t.org.title}
          </TextAnimate>

          <TextAnimate
            as="h2"
            by="word"
            animation="blurInUp"
            once
            className="mt-4 text-4xl font-bold text-[#282328] md:text-6xl"
          >
            {t.dir === "rtl" ? "خريطة الحوكمة التنفيذية" : "Executive Governance Map"}
          </TextAnimate>

          <TextAnimate
            as="p"
            by="word"
            animation="blurInUp"
            once
            className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[#282328]/75"
          >
            {subtitle}
          </TextAnimate>
        </div>

        <div className="relative mt-8 h-[760px] w-full overflow-visible bg-transparent">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[8%] top-[10%] h-44 w-44 rounded-full bg-[#9B6F4C]/10 blur-3xl" />
            <div className="absolute right-[12%] top-[22%] h-56 w-56 rounded-full bg-[#9B6F4C]/8 blur-3xl" />
            <div className="absolute bottom-[12%] left-[38%] h-64 w-64 rounded-full bg-[#F4EFE6]/20 blur-3xl" />
          </div>

          <div className="h-full w-full">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              onInit={setReactFlowInstance}
              fitView
              fitViewOptions={{
                padding: 0.05,
                minZoom: 0.25,
                maxZoom: 0.72,
              }}
              nodesDraggable={false}
              nodesConnectable={false}
              elementsSelectable={false}
              panOnDrag={false}
              zoomOnScroll={false}
              zoomOnPinch={false}
              zoomOnDoubleClick={false}
              preventScrolling={false}
              proOptions={{ hideAttribution: true }}
              className="bg-transparent"
            />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent via-[#d8c8b0]/80 to-[#241d1c]" />
    </section>
  );
}
