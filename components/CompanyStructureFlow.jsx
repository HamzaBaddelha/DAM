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

function createDesktopNodes() {
  return [
    {
      id: "board",
      type: "damOrgNode",
      position: { x: 565, y: 15 },
      sourcePosition: Position.Bottom,
      data: { label: "مجلس الإدارة", variant: "executive", width: 190, size: "desktop" },
    },
    ...boardUnits.map((label, index) => ({
      id: `board-unit-${index + 1}`,
      type: "damOrgNode",
      position: { x: [250, 540, 845][index], y: 110 },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
      data: {
        label,
        variant: "unit",
        width: index === 1 ? 240 : 210,
        size: "desktop",
      },
    })),
    {
      id: "ceo",
      type: "damOrgNode",
      position: { x: 570, y: 205 },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
      data: { label: "الرئيس التنفيذي", variant: "executive", width: 180, size: "desktop" },
    },
    {
      id: "deputy-ceo",
      type: "damOrgNode",
      position: { x: 535, y: 295 },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
      data: { label: "نائب الرئيس التنفيذي", variant: "executive", width: 250, size: "desktop" },
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
        size: "desktop",
      },
    })),
  ];
}

function createTabletNodes() {
  const departmentPositions = [
    { x: 20, y: 460 },
    { x: 280, y: 460 },
    { x: 540, y: 460 },
    { x: 20, y: 655 },
    { x: 280, y: 655 },
    { x: 540, y: 655 },
  ];

  return [
    {
      id: "board",
      type: "damOrgNode",
      position: { x: 285, y: 20 },
      sourcePosition: Position.Bottom,
      data: { label: "مجلس الإدارة", variant: "executive", width: 210, size: "tablet" },
    },
    ...boardUnits.map((label, index) => ({
      id: `board-unit-${index + 1}`,
      type: "damOrgNode",
      position: { x: [20, 280, 540][index], y: 125 },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
      data: {
        label,
        variant: "unit",
        width: index === 1 ? 220 : 200,
        size: "tablet",
      },
    })),
    {
      id: "ceo",
      type: "damOrgNode",
      position: { x: 300, y: 255 },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
      data: { label: "الرئيس التنفيذي", variant: "executive", width: 190, size: "tablet" },
    },
    {
      id: "deputy-ceo",
      type: "damOrgNode",
      position: { x: 265, y: 350 },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
      data: { label: "نائب الرئيس التنفيذي", variant: "executive", width: 260, size: "tablet" },
    },
    ...departments.map((department, index) => ({
      id: `department-${index + 1}`,
      type: "damOrgNode",
      position: departmentPositions[index],
      targetPosition: Position.Top,
      data: {
        label: department.title,
        units: department.units,
        variant: "department",
        width: 220,
        size: "tablet",
      },
    })),
  ];
}

function createMobileNodes() {
  const centerX = 32;
  const steps = [
    { id: "board", label: "مجلس الإدارة", variant: "executive", width: 260 },
    ...boardUnits.map((label, index) => ({
      id: `board-unit-${index + 1}`,
      label,
      variant: "unit",
      width: 260,
    })),
    { id: "ceo", label: "الرئيس التنفيذي", variant: "executive", width: 260 },
    {
      id: "deputy-ceo",
      label: "نائب الرئيس التنفيذي",
      variant: "executive",
      width: 260,
    },
    ...departments.map((department, index) => ({
      id: `department-${index + 1}`,
      label: department.title,
      units: department.units,
      variant: "department",
      width: 260,
    })),
  ];

  return steps.map((step, index) => ({
      id: step.id,
      type: "damOrgNode",
      position: { x: centerX, y: 18 + index * 140 },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
      data: {
        label: step.label,
        units: step.units,
        variant: step.variant,
        width: step.width,
        size: "mobile",
      },
    }));
}

function createMobileEdges() {
  const orderedIds = [
    "board",
    ...boardUnits.map((_, index) => `board-unit-${index + 1}`),
    "ceo",
    "deputy-ceo",
    ...departments.map((_, index) => `department-${index + 1}`),
  ];

  return orderedIds.slice(0, -1).map((source, index) => ({
    id: `mobile-edge-${source}-${orderedIds[index + 1]}`,
    source,
    target: orderedIds[index + 1],
    type: "smoothstep",
    animated: true,
    style: { stroke: "#9a7a4f", strokeWidth: 1.75 },
    pathOptions: { borderRadius: 8 },
  }));
}

const desktopTabletEdges = [
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
  const isMobile = data.size === "mobile";
  const isTablet = data.size === "tablet";

  return (
    <div
      className={[
        "dam-org-node rounded-md border text-center text-[#211d1b] shadow-[0_10px_24px_rgba(60,43,25,0.07)]",
        isMobile ? "rounded-lg" : "",
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
          isMobile
            ? "px-4 py-3 text-[13px] leading-5"
            : isTablet
              ? "px-3.5 py-3 text-[13px] leading-5"
              : "px-3 py-2.5 text-sm leading-5",
          isExecutive || isDepartment ? "font-bold" : "font-semibold",
        ].join(" ")}
      >
        {data.label}
      </div>
      {isDepartment ? (
        <div
          className={[
            "space-y-2 border-t border-[#9B6F4C]/35 bg-[#f8f2e8]",
            isMobile ? "px-3.5 py-3" : "px-3 py-2.5",
          ].join(" ")}
        >
          {data.units.map((unit) => (
            <div
              key={unit}
              className={[
                "border border-[#9B6F4C]/20 bg-[#fffaf2] font-medium text-[#3a3029]",
                isMobile
                  ? "rounded-md px-2.5 py-2 text-[12px] leading-[1.45]"
                  : "rounded-sm px-2 py-1.5 text-[12px] leading-4",
              ].join(" ")}
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
  const isMobile = viewportWidth <= 640;
  const isCompact = viewportWidth <= 1024;
  const layout = isMobile
    ? { nodes: createMobileNodes(), edges: createMobileEdges(), width: 324, height: 1760 }
    : isCompact
      ? { nodes: createTabletNodes(), edges: desktopTabletEdges, width: 780, height: 860 }
      : { nodes: createDesktopNodes(), edges: desktopTabletEdges, width: 1320, height: 660 };

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
              width: `${layout.width}px`,
              minWidth: `${layout.width}px`,
              height: `${layout.height}px`,
            }}
          >
            <ReactFlow
              key={`company-structure-${isCompact ? viewportWidth : "desktop"}`}
              nodes={layout.nodes}
              edges={layout.edges}
              nodeTypes={nodeTypes}
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
              className={`dam-org-flow bg-transparent${isCompact ? " dam-org-flow-compact" : ""}`}
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
          justify-content: flex-start;
          padding-inline: 6px;
        }

        .dam-org-flow .react-flow__pane {
          cursor: default;
        }

        .dam-org-flow-compact,
        .dam-org-flow-compact .react-flow__renderer,
        .dam-org-flow-compact .react-flow__viewport,
        .dam-org-flow-compact .react-flow__pane,
        .dam-org-flow-compact .react-flow__nodes,
        .dam-org-flow-compact .react-flow__edges {
          pointer-events: none;
        }

        .dam-org-scroll-compact {
          touch-action: pan-x pan-y;
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
            flex: 0 0 auto;
          }
        }
      `}</style>
    </section>
  );
}
