import { useEffect, useState } from "react";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovering(!!t.closest("a, button, [data-cursor='hover']"));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <>
      <div
        className="pointer-events-none fixed z-[100] hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference md:block"
        style={{ left: pos.x, top: pos.y, transition: "transform 0.08s linear" }}
      />
      <div
        className="pointer-events-none fixed z-[99] hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 mix-blend-difference md:block"
        style={{
          left: pos.x,
          top: pos.y,
          width: hovering ? 60 : 36,
          height: hovering ? 60 : 36,
          transition: "width 0.25s ease, height 0.25s ease, transform 0.15s ease-out",
        }}
      />
    </>
  );
}
