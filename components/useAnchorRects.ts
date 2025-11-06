import { useEffect, useMemo, useState } from "react";

export type Rect = { x: number; y: number; w: number; h: number };
export type RectMap = Record<string, Rect | null>;

function relRect(root: HTMLElement, el: HTMLElement): Rect {
  const r0 = root.getBoundingClientRect();
  const r = el.getBoundingClientRect();
  return { x: r.left - r0.left, y: r.top - r0.top, w: r.width, h: r.height };
}

export function useAnchorRects(
  rootEl: HTMLElement | null,
  anchors: Record<string, HTMLElement | null>
): RectMap {
  const [rects, setRects] = useState<RectMap>({});
  const keys = useMemo(() => Object.keys(anchors), [anchors]);

  useEffect(() => {
    if (!rootEl) return;
    const ro = new ResizeObserver(() => {
      const next: RectMap = {};
      for (const k of keys) {
        const el = anchors[k];
        next[k] = el ? relRect(rootEl, el) : null;
      }
      setRects(next);
    });

    ro.observe(rootEl);
    keys.forEach(k => anchors[k] && ro.observe(anchors[k]!));

    // 1st calc
    const initial: RectMap = {};
    for (const k of keys) {
      const el = anchors[k];
      initial[k] = el ? relRect(rootEl, el) : null;
    }
    setRects(initial);

    return () => ro.disconnect();
  }, [rootEl, anchors, keys]);

  return rects;
}

