import { useRef, useState, useCallback } from "react";
import { MoveHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export function BeforeAfter({ before, after, className, alt = "Room" }: { before: string; after: string; className?: string; alt?: string }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  return (
    <div
      ref={ref}
      className={cn("relative aspect-[16/10] w-full select-none overflow-hidden rounded-3xl shadow-lift touch-none cursor-ew-resize", className)}
      onPointerDown={(e) => { dragging.current = true; (e.target as Element).setPointerCapture?.(e.pointerId); update(e.clientX); }}
      onPointerMove={(e) => dragging.current && update(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <img src={after} alt={`${alt} after cleaning`} className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={before} alt={`${alt} before cleaning`} className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      </div>
      <span className="absolute left-4 top-4 rounded-full bg-primary/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground backdrop-blur">Before</span>
      <span className="absolute right-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent-foreground">After</span>
      <div className="absolute inset-y-0 w-0.5 bg-card" style={{ left: `${pos}%` }}>
        <div className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-card text-primary shadow-lift">
          <MoveHorizontal className="h-5 w-5" />
        </div>
      </div>
      <input
        type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Compare before and after" className="sr-only"
      />
    </div>
  );
}
