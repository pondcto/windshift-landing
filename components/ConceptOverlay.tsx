"use client";
import React, { useMemo } from "react";
import { useAnchorRects, Rect } from "./useAnchorRects";

// Boxes are now positioned relative to panel edges (top-center, top-right, etc.)
// Use offsetX/offsetY in Node props for fine-tuning

function Node({ 
  rect, 
  title, 
  subtitle, 
  position = 'top-center',
  offsetX = 0,
  offsetY = 0
}: { 
  rect: Rect; 
  title: string; 
  subtitle?: string; 
  position?: 'top-center' | 'top-right' | 'center';
  offsetX?: number;
  offsetY?: number;
}) {
  // Calculate position based on panel edges
  let left: number, top: number;
  
  switch (position) {
    case 'top-center':
      left = rect.x + rect.w / 2 + offsetX;
      top = rect.y + 20 + offsetY; // 20px from top edge
      break;
    case 'top-right':
      left = rect.x + rect.w - 100 + offsetX; // 100px from right edge
      top = rect.y + 20 + offsetY;
      break;
    case 'center':
    default:
      left = rect.x + rect.w / 2 + offsetX;
      top = rect.y + rect.h / 2 + offsetY;
      break;
  }
  
  return (
    <div
      className="absolute -translate-x-1/2 rounded-lg border border-primary-400/40 bg-white dark:bg-gray-900 text-foreground px-3 py-2 text-[11px]"
      style={{ 
        left, 
        top, 
        width: 180,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
        zIndex: 10,
      }}
    >
      <div className="text-xs font-bold text-primary-600 dark:text-primary-400">{title}</div>
      {subtitle && <div className="text-[10px] text-secondary mt-0.5">{subtitle}</div>}
    </div>
  );
}

export default function ConceptOverlay({
  root,
  anchors,
  visible,
  debug = false,
  hoveredSection = null,
}: {
  root: HTMLElement | null;
  visible: boolean;
  debug?: boolean;
  hoveredSection?: string | null;
  anchors: {
    human: HTMLElement | null;
    orch: HTMLElement | null;
    agents: HTMLElement | null;
    tools: HTMLElement | null;
    kb: HTMLElement | null;
    docintel: HTMLElement | null;
  };
}) {
  const rects = useAnchorRects(root, anchors);

  // Determine which nodes to show based on hovered section
  // Boxes are visible UNLESS their parent panel is being hovered
  // hoveredSection values: 'projects', 'teams', 'exchange', 'workspace', 'knowledge', 'documents'
  // Box → Parent Panel mapping:
  //   Human → Teams & Access (teams)
  //   Orchestrator, Profiler, Deep Research, Contract Review → WindShift Workspace (workspace)
  //   Knowledge Base → Project Knowledge Base (knowledge)
  //   Document Intelligence → Document Intelligence (documents)
  const showHuman = hoveredSection !== "teams";
  const showOrch = hoveredSection !== "workspace";
  const showAgents = hoveredSection !== "workspace";
  const showTools = hoveredSection !== "workspace";
  const showKb = hoveredSection !== "knowledge";
  const showDocintel = hoveredSection !== "documents";

  if (!visible || !root) return null;

  return (
    <div className="pointer-events-none absolute inset-4 z-50">

      {showHuman && rects.human && <Node rect={rects.human} title="Human" subtitle="Analyst / Partner" position="top-right" />}
      {showOrch && rects.orch && <Node rect={rects.orch} title="Orchestrator" subtitle="Plan • route • QA" position="top-center" />}
      {showAgents && rects.agents && <Node rect={rects.agents} title="Profiler" subtitle="Company profiling" position="top-center" />}
      {showTools && rects.tools && (
        <>
          <Node rect={rects.tools} title="Agentic Deep Research" position="top-center" offsetX={-100} />
          <Node rect={rects.tools} title="Contract Review" position="top-center" offsetX={100} />
        </>
      )}
      {showDocintel && rects.docintel && <Node rect={rects.docintel} title="Document Intelligence" subtitle="Ingest • extract • retrieve" position="top-center" />}
      {showKb && rects.kb && <Node rect={rects.kb} title="Project Knowledge Base" subtitle="KG + vector memory" position="top-center" offsetX={-100} />}
      
      {debug && (
        <div className="absolute top-4 left-4 bg-white dark:bg-gray-900 border border-gray-300 rounded-lg p-4 text-xs font-mono pointer-events-auto max-w-xs">
          <div className="font-bold mb-2">Hovered: {hoveredSection || 'none'}</div>
          <div className="mb-2 text-[10px]">
            <div>Human: {showHuman ? '✓' : '✗'}</div>
            <div>Orch: {showOrch ? '✓' : '✗'}</div>
            <div>Agents: {showAgents ? '✓' : '✗'}</div>
            <div>Tools: {showTools ? '✓' : '✗'}</div>
            <div>KB: {showKb ? '✓' : '✗'}</div>
            <div>DocIntel: {showDocintel ? '✓' : '✗'}</div>
          </div>
          <div className="font-bold mb-2">Panel Rects:</div>
          {Object.entries(rects).map(([key, r]) => r && (
            <div key={key} className="text-[10px]">{key}: x={Math.round(r.x)} y={Math.round(r.y)} w={Math.round(r.w)} h={Math.round(r.h)}</div>
          ))}
        </div>
      )}
    </div>
  );
}

