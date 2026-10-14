import { useEffect, useRef } from "react";
import type { BgEffect } from "@/lib/profile";

function usePrefersReducedMotion() {
  const ref = useRef(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    ref.current = mq.matches;
    const on = () => {
      ref.current = mq.matches;
    };
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return ref;
}

export function ProfileEffects({
  effect,
  color,
}: {
  effect: BgEffect;
  color: string;
}) {
  if (effect === "none") return null;
  if (effect === "grid") {
    return <div className="nox-grid-bg pointer-events-none absolute inset-0" />;
  }
  if (effect === "orbs") return <Orbs color={color} />;
  return <ParticleCanvas effect={effect} color={color} />;
}

function Orbs({ color }: { color: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="nox-anim absolute -left-10 top-1/4 size-[42vmax] rounded-full blur-3xl"
        style={{
          background: color,
          opacity: 0.16,
          animation: "nox-float 16s ease-in-out infinite",
        }}
      />
      <div
        className="nox-anim absolute -right-8 bottom-0 size-[36vmax] rounded-full blur-3xl"
        style={{
          background: color,
          opacity: 0.12,
          animation: "nox-float-alt 22s ease-in-out infinite",
        }}
      />
    </div>
  );
}

function ParticleCanvas({ effect, color }: { effect: BgEffect; color: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let raf = 0;
    let running = true;

    const resize = () => {
      const parent = canvas.parentElement;
      width = parent?.clientWidth ?? window.innerWidth;
      height = parent?.clientHeight ?? window.innerHeight;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number };
    const isMobile = width < 640;
    const count =
      effect === "stars"
        ? isMobile
          ? 48
          : 90
        : effect === "rain"
          ? isMobile
            ? 40
            : 70
          : isMobile
            ? 32
            : 56;

    const spawn = (): P => {
      if (effect === "rain") {
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: -0.4,
          vy: 8 + Math.random() * 10,
          r: 1,
          a: 0.18 + Math.random() * 0.35,
        };
      }
      if (effect === "snow") {
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: -0.3 + Math.random() * 0.6,
          vy: 0.4 + Math.random() * 0.9,
          r: 1 + Math.random() * 2,
          a: 0.25 + Math.random() * 0.45,
        };
      }
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (effect === "stars" ? 0.15 : 0.35),
        vy: (Math.random() - 0.5) * (effect === "stars" ? 0.15 : 0.35),
        r: effect === "stars" ? 0.6 + Math.random() * 1.4 : 1 + Math.random() * 1.8,
        a: 0.2 + Math.random() * 0.6,
      };
    };

    let particles = Array.from({ length: count }, spawn);

    const tick = () => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      if (reduced.current) {
        ctx.fillStyle = color;
        for (const p of particles) {
          ctx.globalAlpha = p.a * 0.5;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        return;
      }
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (effect === "rain") {
          if (p.y > height + 10 || p.x < -10) {
            p.x = Math.random() * width + 20;
            p.y = -8;
          }
          ctx.globalAlpha = p.a;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.vx * 2, p.y + 10);
          ctx.lineWidth = 1;
          ctx.stroke();
        } else {
          if (p.x < -4) p.x = width + 4;
          if (p.x > width + 4) p.x = -4;
          if (p.y < -4) p.y = height + 4;
          if (p.y > height + 4) p.y = -4;
          if (effect === "stars") {
            p.a += (Math.random() - 0.5) * 0.04;
            p.a = Math.min(0.9, Math.max(0.12, p.a));
          }
          ctx.globalAlpha = p.a;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      particles = [];
    };
  }, [effect, color]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
