"use client";

import React, { useEffect, useRef } from "react";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import { glow } from "app/theme";

/**
 * The ambient colour behind the hero.
 *
 * Six saturated radial blobs are blurred past recognition and blended into
 * the paper — `multiply` in light mode so overlaps deepen the way ink does,
 * `screen` in dark mode so they read as light instead of stain. A faint
 * dust canvas sits on top to keep the large flat areas from banding.
 */

type Blob = {
  key: string;
  color: string;
  /** Size as a share of the larger viewport axis. */
  size: number;
  top: string;
  left?: string;
  right?: string;
  blur: number;
  opacity: number;
  /** Drift duration in seconds. */
  duration: number;
  delay: number;
  travel: [number, number];
};

const BLOBS: Blob[] = [
  {
    key: "coral",
    color: glow.coral,
    size: 42,
    top: "-6%",
    left: "-8%",
    blur: 90,
    opacity: 0.52,
    duration: 26,
    delay: 0,
    travel: [40, 26],
  },
  {
    key: "blush",
    color: glow.blush,
    size: 38,
    top: "14%",
    left: "10%",
    blur: 100,
    opacity: 0.6,
    duration: 32,
    delay: 1.5,
    travel: [-34, 30],
  },
  {
    key: "butter",
    color: glow.butter,
    size: 22,
    top: "-4%",
    left: "34%",
    blur: 80,
    opacity: 0.44,
    duration: 29,
    delay: 3,
    travel: [26, 34],
  },
  {
    key: "lilac",
    color: glow.lilac,
    size: 44,
    top: "22%",
    right: "16%",
    blur: 110,
    opacity: 0.58,
    duration: 34,
    delay: 0.8,
    travel: [-30, -24],
  },
  {
    key: "periwinkle",
    color: glow.periwinkle,
    size: 50,
    top: "-2%",
    right: "-12%",
    blur: 100,
    opacity: 0.64,
    duration: 30,
    delay: 2.2,
    travel: [34, 30],
  },
  {
    key: "mint",
    color: glow.mint,
    size: 34,
    top: "52%",
    right: "2%",
    blur: 90,
    opacity: 0.54,
    duration: 28,
    delay: 4,
    travel: [-24, -32],
  },
];

const Field = styled("div")(({ theme }) => {
  const isDark = theme.palette.mode === "dark";

  return {
    position: "absolute",
    inset: 0,
    zIndex: 0,
    overflow: "hidden",
    pointerEvents: "none",

    ".blob": {
      position: "absolute",
      borderRadius: "50%",
      // multiply lets overlapping blobs mix into new hues on warm paper the
      // way wet ink would; screen keeps them luminous on a dark ground.
      mixBlendMode: isDark ? "screen" : "multiply",
      willChange: "transform",
    },

    // Lifts the middle of the field back toward paper so the headline never
    // has to fight the saturated blobs for contrast.
    ".wash": {
      position: "absolute",
      inset: 0,
      background: `radial-gradient(ellipse 54% 46% at 50% 46%, ${theme.palette.background.default} 0%, ${theme.palette.background.default} 32%, transparent 84%)`,
      opacity: isDark ? 0.78 : 0.5,
    },

    ".dust": {
      position: "absolute",
      inset: 0,
      opacity: isDark ? 0.5 : 0.35,
    },

    // Editorial column rules — the quiet structural counterpoint to the blobs.
    ".guides": {
      position: "absolute",
      inset: 0,
      backgroundImage: `repeating-linear-gradient(to right, ${theme.palette.divider} 0 1px, transparent 1px 20%)`,
      opacity: isDark ? 0.5 : 0.7,
      maskImage: "linear-gradient(to bottom, #000 60%, transparent 100%)",
      WebkitMaskImage: "linear-gradient(to bottom, #000 60%, transparent 100%)",
    },

    "@keyframes blobDrift": {
      "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
      "50%": {
        transform:
          "translate3d(var(--drift-x), var(--drift-y), 0) scale(var(--drift-scale))",
      },
    },
    "@keyframes fieldIn": {
      from: { opacity: 0, transform: "scale(1.06)" },
      to: { opacity: 1, transform: "scale(1)" },
    },

    animation: "fieldIn 1.4s cubic-bezier(0.22, 1, 0.36, 1) backwards",

    "@media (prefers-reduced-motion: reduce)": {
      animation: "none",
      ".blob": { animation: "none !important" },
    },
  };
});

/** Fine monochrome grain that breaks up banding across the blurred blobs. */
function Dust({ quantity = 90 }: { quantity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const isDark = useTheme().palette.mode === "dark";

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const draw = () => {
      const w = wrap.offsetWidth;
      const h = wrap.offsetHeight;
      if (!w || !h) return;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < quantity; i += 1) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const r = Math.random() * 2.6 + 0.3;
        const alpha = Math.random() * 0.35 + 0.05;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.strokeStyle = isDark
          ? `rgba(220, 220, 220, ${alpha})`
          : `rgba(80, 80, 80, ${alpha * 0.8})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };

    // Redraw synchronously: rAF is throttled in background tabs, which would
    // leave the canvas stranded at its old size. Painting ~90 arcs is cheap
    // enough that debouncing costs more than it saves.
    draw();

    const observer = new ResizeObserver(() => draw());
    observer.observe(wrap);
    window.addEventListener("resize", draw);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", draw);
    };
  }, [quantity, isDark]);

  return (
    <div className="dust" ref={wrapRef}>
      <canvas ref={canvasRef} />
    </div>
  );
}

/** How much of each blob's opacity survives in dark mode. */
const DARK_BLOB_SCALE = 0.5;

export default function GradientField({ guides = true }: { guides?: boolean }) {
  const isDark = useTheme().palette.mode === "dark";

  return (
    <Field aria-hidden="true">
      {BLOBS.map((blob) => {
        const [tx, ty] = blob.travel;
        return (
          <div
            key={blob.key}
            className="blob"
            style={
              {
                top: blob.top,
                left: blob.left,
                right: blob.right,
                width: `max(280px, ${blob.size}vw)`,
                height: `max(280px, ${blob.size}vw)`,
                background: `radial-gradient(circle at 42% 38%, ${blob.color} 0%, ${blob.color} 26%, transparent 68%)`,
                filter: `blur(${blob.blur}px)`,
                opacity: isDark ? blob.opacity * DARK_BLOB_SCALE : blob.opacity,
                "--drift-x": `${tx}px`,
                "--drift-y": `${ty}px`,
                "--drift-scale": 1.06,
                animation: `blobDrift ${blob.duration}s ease-in-out ${blob.delay}s infinite`,
              } as React.CSSProperties
            }
          />
        );
      })}
      <div className="wash" />
      {guides && <div className="guides" />}
      <Dust />
    </Field>
  );
}
