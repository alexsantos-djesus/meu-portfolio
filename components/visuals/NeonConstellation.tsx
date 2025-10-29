"use client";
import { useEffect, useRef } from "react";

type Props = {
  paused?: boolean;
  /** 0.0015 ~ 0.0025 é um bom range */
  density?: number;
  /** linhas máximas por partícula (evita poluição) */
  maxLinks?: number;
};

export default function NeonConstellation({
  paused = false,
  density = 0.0019,
  maxLinks = 4,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number>();
  const mouse = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = 0,
      h = 0,
      dpr = Math.min(window.devicePixelRatio || 1, 2);

    const pts: { x: number; y: number; vx: number; vy: number }[] = [];
    const RND = (a: number, b: number) => Math.random() * (b - a) + a;

    function fit() {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width * dpr));
      h = Math.max(1, Math.floor(rect.height * dpr));
      canvas.width = w;
      canvas.height = h;
      makePoints();
    }

    function makePoints() {
      pts.length = 0;
      const target = Math.max(42, Math.floor(w * h * density));
      for (let i = 0; i < target; i++) {
        pts.push({
          x: RND(0, w),
          y: RND(0, h),
          vx: RND(-0.18, 0.18),
          vy: RND(-0.18, 0.18),
        });
      }
    }

    function step() {
      // fundo com gradiente suave
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, "rgba(34,211,238,0.07)");
      g.addColorStop(0.5, "rgba(236,72,153,0.06)");
      g.addColorStop(1, "rgba(16,185,129,0.06)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // mover partículas
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;

        // leve atração ao mouse (se presente)
        if (mouse.current) {
          const mx = mouse.current.x,
            my = mouse.current.y;
          const dx = mx - p.x,
            dy = my - p.y;
          p.vx += dx * 0.0000035;
          p.vy += dy * 0.0000035;
        }

        // wrap
        if (p.x < 0) p.x = w;
        else if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        else if (p.y > h) p.y = 0;
      }

      // conexões (range proporcional)
      const range = Math.min(w, h) * 0.12;
      const range2 = range * range;

      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        let links = 0;

        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > range2) continue;

          // limita conexões por ponto (mais clean)
          if (links++ >= maxLinks) break;

          const d = Math.sqrt(d2);
          const alpha = 1 - d / range;

          ctx.strokeStyle = `rgba(0,255,234,${alpha * 0.35})`;
          ctx.lineWidth = 1 * dpr;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // render pontos com glow
      ctx.shadowColor = "rgba(0,255,234,0.9)";
      ctx.shadowBlur = 8 * dpr;
      ctx.fillStyle = "rgba(0,255,234,0.9)";
      for (const p of pts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5 * dpr, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      raf.current = requestAnimationFrame(step);
    }

    fit();
    const onResize = () => fit();
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = {
        x: (e.clientX - rect.left) * dpr,
        y: (e.clientY - rect.top) * dpr,
      };
    };
    const onLeave = () => (mouse.current = null);

    window.addEventListener("resize", onResize);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    if (!paused) step();

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [paused, density, maxLinks]);

  return (
    <div className="relative">
      {/* vinheta sutil nas bordas */}
      <div className="pointer-events-none absolute -inset-3 rounded-[1.25rem] bg-black/0 shadow-[0_0_120px_40px_rgba(0,0,0,0.35)]" />
      <canvas ref={canvasRef} className="w-full h-[260px] rounded-2xl block" />
    </div>
  );
}
