"use client";

import { useEffect, useRef, useState } from "react";
import { Background, Controls, Handle, Position, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const boardUnits = [
  "وحدة الاستثمار",
  "وحدة التحول الاستراتيجي",
  "وحدة المراجعة الداخلية",
];

const departments = [
  {
    title: "الإدارة المالية",
    units: [
      "وحدة المحاسبة والتقارير",
      "وحدة التمويل والخزينة",
      "وحدة التحليل والموازنات المالية",
    ],
  },
  {
    title: "إدارة تقنية المعلومات",
    units: ["وحدة تقنية المعلومات"],
  },
  {
    title: "إدارة الموارد البشرية",
    units: ["وحدة الموارد البشرية", "وحدة الخدمات الإدارية"],
  },
  {
    title: "إدارة التسويق",
    units: ["وحدة التسويق", "وحدة الاتصال المؤسسي"],
  },
  {
    title: "إدارة تجربة العميل",
    units: ["وحدة تجربة العميل"],
  },
  {
    title: "الإدارة القانونية",
    units: ["الوحدة القانونية"],
  },
];

const nodes = [
  {
    id: "board",
    type: "damOrgNode",
    position: { x: 565, y: 15 },
    sourcePosition: Position.Bottom,
    data: { label: "مجلس الإدارة", variant: "executive", width: 190 },
  },
  ...boardUnits.map((label, index) => ({
    id: `board-unit-${index + 1}`,
    type: "damOrgNode",
    position: { x: [250, 540, 845][index], y: 110 },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    data: { label, variant: "unit", width: index === 1 ? 240 : 210 },
  })),
  {
    id: "ceo",
    type: "damOrgNode",
    position: { x: 570, y: 205 },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    data: { label: "الرئيس التنفيذي", variant: "executive", width: 180 },
  },
  {
    id: "deputy-ceo",
    type: "damOrgNode",
    position: { x: 535, y: 295 },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    data: { label: "نائب الرئيس التنفيذي", variant: "executive", width: 250 },
  },
  ...departments.map((department, index) => ({
    id: `department-${index + 1}`,
    type: "damOrgNode",
    position: { x: 20 + index * 215, y: 390 },
    targetPosition: Position.Top,
    data: {
      label: department.title,
      units: department.units,
      variant: "department",
      width: 205,
    },
  })),
];

const edges = [
  ...boardUnits.map((_, index) => ({
    id: `board-to-unit-${index + 1}`,
    source: "board",
    target: `board-unit-${index + 1}`,
    type: "smoothstep",
  })),
  { id: "board-to-ceo", source: "board", target: "ceo", type: "smoothstep" },
  { id: "ceo-to-deputy", source: "ceo", target: "deputy-ceo", type: "smoothstep" },
  ...departments.map((_, index) => ({
    id: `deputy-to-department-${index + 1}`,
    source: "deputy-ceo",
    target: `department-${index + 1}`,
    type: "smoothstep",
  })),
].map((edge) => ({
  ...edge,
  animated: true,
  style: { stroke: "#9a7a4f", strokeWidth: 1.75 },
  pathOptions: { borderRadius: 8 },
}));

const nodeTypes = {
  damOrgNode: DamOrgNode,
};

function DamOrgNode({ data }) {
  const isDepartment = data.variant === "department";
  const isExecutive = data.variant === "executive";

  return (
    <div
      className={[
        "dam-org-node rounded-md border text-center text-[#211d1b] shadow-[0_10px_24px_rgba(60,43,25,0.07)]",
        isDepartment
          ? "dam-org-node-main border-[#9B6F4C]/55 bg-[#ead8ae]"
          : "dam-org-node-unit border-[#9B6F4C]/40 bg-[#f7efe3]",
      ].join(" ")}
      style={{ width: data.width }}
      dir="rtl"
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!h-0 !w-0 !border-0 !bg-transparent"
      />
      <div
        className={[
          "px-3 py-2.5 text-sm leading-5",
          isExecutive || isDepartment ? "font-bold" : "font-semibold",
        ].join(" ")}
      >
        {data.label}
      </div>
      {isDepartment ? (
        <div className="space-y-2 border-t border-[#9B6F4C]/35 bg-[#f8f2e8] px-3 py-2.5">
          {data.units.map((unit) => (
            <div
              key={unit}
              className="rounded-sm border border-[#9B6F4C]/20 bg-[#fffaf2] px-2 py-1.5 text-[12px] font-medium leading-4 text-[#3a3029]"
            >
              {unit}
            </div>
          ))}
        </div>
      ) : null}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-0 !w-0 !border-0 !bg-transparent"
      />
    </div>
  );
}

export default function CompanyStructureFlow({ t }) {
  const scrollRef = useRef(null);
  const [viewportWidth, setViewportWidth] = useState(1320);
  const isMobile = viewportWidth <= 768;
  const isCompact = viewportWidth <= 1024;
  const chartHeight = isMobile ? 520 : isCompact ? 600 : 660;

  useEffect(() => {
    const syncViewport = () => {
      setViewportWidth(window.innerWidth);
    };

    const rafId = window.requestAnimationFrame(syncViewport);
    window.addEventListener("resize", syncViewport);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", syncViewport);
    };
  }, []);

  return (
    <section
      id="company-structure"
      className="dam-org-section scroll-mt-24 overflow-hidden bg-[#E6DCC8] px-4 py-12 text-[#282328] sm:px-6 md:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-5 text-center md:mb-8" dir={t.dir}>
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-dam-bronze">
            {t.companyStructure.kicker}
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-5xl">{t.companyStructure.title}</h2>
        </div>

        <div
          ref={scrollRef}
          dir="ltr"
          className={`dam-org-scroll${isCompact ? " dam-org-scroll-compact" : ""}`}
        >
          <div
            className="dam-org-canvas"
            dir="rtl"
            style={{
              width: isCompact ? "100%" : "1320px",
              minWidth: isCompact ? "100%" : "1320px",
              height: `${chartHeight}px`,
            }}
          >
            <ReactFlow
              key={`company-structure-${isCompact ? viewportWidth : "desktop"}`}
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              fitView={isCompact}
              fitViewOptions={{ padding: 0.12 }}
              defaultViewport={{ x: 0, y: 0, zoom: 1 }}
              nodesDraggable={false}
              nodesConnectable={false}
              elementsSelectable={false}
              panOnDrag={false}
              zoomOnScroll={false}
              zoomOnPinch={false}
              zoomOnDoubleClick={false}
              preventScrolling={false}
              proOptions={{ hideAttribution: true }}
              className="dam-org-flow bg-transparent"
            >
              <Background color="rgba(154,122,79,0.12)" gap={96} size={0.5} />
              <Controls
                showZoom={false}
                showFitView={false}
                showInteractive={false}
                className="hidden"
              />
            </ReactFlow>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .dam-org-scroll {
          width: 100%;
          display: flex;
          justify-content: center;
          overflow-x: auto;
          overflow-y: hidden;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior-x: contain;
          padding-bottom: 18px;
          scrollbar-color: rgba(154, 122, 79, 0.55) rgba(154, 122, 79, 0.14);
          scrollbar-width: thin;
        }

        .dam-org-canvas {
          min-width: 1320px;
          height: 660px;
          position: relative;
          flex: 0 0 auto;
        }

        .dam-org-scroll-compact {
          overflow-x: hidden;
        }

        .dam-org-flow .react-flow__pane {
          cursor: default;
        }

        .dam-org-flow .react-flow__edge.animated .react-flow__edge-path {
          stroke-dasharray: 7 7;
          animation: dam-org-edge-flow 0.9s linear infinite;
        }

        .dam-org-flow .react-flow__handle {
          opacity: 0;
          pointer-events: none;
        }

        @keyframes dam-org-edge-flow {
          from {
            stroke-dashoffset: 14;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        @media (max-width: 1024px) {
          .dam-org-canvas {
            min-width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
