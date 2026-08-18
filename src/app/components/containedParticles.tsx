"use client";

import React, { useRef, useEffect } from "react";
import { useThemeMode } from "util/hooks/themeContext";
import { styled } from "@mui/system";
import { useAppSelector } from "util/hooks";
import { primary, secondary } from "app/theme";

interface ParticlesProps {
  quantity?: number;
  staticity?: number;
  ease?: number;
  refresh?: boolean;
  id: string;
}

const Container = styled("div")(({ theme }) => {
  const isDark = theme.palette.mode === "dark";

  return {
    position: "absolute",
    inset: "0px",
    zIndex: -1,
    pointerEvents: "none",
    ".hide": {
      opacity: 0,
    },

    // Glow (blurred gradient) lives on ::before so the blur filter never
    // touches the crisp dust-particle canvas rendered inside the element.
    ".circle": {
      position: "absolute",
      borderRadius: "100%",
      opacity: 1,
      transformStyle: "preserve-3d",
      "&::before": {
        content: '""',
        position: "absolute",
        inset: 0,
        borderRadius: "inherit",
        zIndex: -1,
        pointerEvents: "none",
      },
    },

    "@keyframes fadeInScale": {
      "0%": { opacity: 0, transform: "scale(0.85)" },
      "100%": { opacity: 1, transform: "scale(1)" },
    },

    ".large-particles": {
      top: "10vh",
      left: "12vw",
      width: "480px",
      height: "480px",
      animation: "fadeInScale 1s ease-out backwards",
      "&::before": {
        filter: "blur(70px)",
        opacity: 0.9,
        background: isDark
          ? `radial-gradient(circle at 35% 30%, ${secondary[800]} 0%, ${secondary[900]} 45%, transparent 75%)`
          : `radial-gradient(circle at 35% 30%, ${secondary[100]} 0%, ${secondary[300]} 45%, transparent 75%)`,
        animation: "driftLarge 16s ease-in-out 1s infinite",
      },
    },
    ".small-particles": {
      top: "60vh",
      right: "12vw",
      width: "260px",
      height: "260px",
      animation: "fadeInScale 1.2s ease-out 0.15s backwards",
      "&::before": {
        filter: "blur(40px)",
        opacity: 0.5,
        background: isDark
          ? `radial-gradient(circle at 40% 35%, ${primary[400]} 0%, ${primary[700]} 55%, transparent 28%)`
          : `radial-gradient(circle at 40% 35%, ${primary[300]} 0%, ${primary[600]} 55%, transparent 28%)`,
        animation: "driftSmall 20s ease-in-out 1.35s infinite",
      },
    },
    ".tertiary-particles": {
      top: "15vh",
      right: "30vw",
      width: "160px",
      height: "160px",
      animation: "fadeInScale 1.4s ease-out 0.3s backwards",
      "&::before": {
        filter: "blur(28px)",
        opacity: 0.7,
        background: isDark
          ? "radial-gradient(circle at 45% 30%, #9c7ba8 0%, #5c4966 55%, transparent 48%)"
          : "radial-gradient(circle at 45% 30%, #f0d3ec 0%, #c07fb8 55%, transparent 48%)",
        animation: "driftTertiary 13s ease-in-out 1.7s infinite",
      },
    },
    "@keyframes driftLarge": {
      "0%, 100%": { transform: "translate(0, 0) scale(1)" },
      "50%": { transform: "translate(18px, -14px) scale(1.035)" },
    },
    "@keyframes driftSmall": {
      "0%, 100%": { transform: "translate(0, 0) scale(1)" },
      "50%": { transform: "translate(-14px, 12px) scale(1.05)" },
    },
    "@keyframes driftTertiary": {
      "0%, 100%": { transform: "translate(0, 0) scale(1)" },
      "50%": { transform: "translate(10px, 10px) scale(0.96)" },
    },

    "@media (prefers-reduced-motion: reduce)": {
      ".large-particles, .small-particles, .tertiary-particles": {
        animation: "none",
        opacity: 1,
        transform: "none",
      },
      ".large-particles::before, .small-particles::before, .tertiary-particles::before": {
        animation: "none",
      },
    },
  };
});

function ContainedParticles({ quantity = 30, refresh = false, id }: ParticlesProps) {
  const [themeMode] = useThemeMode();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<any[]>([]);
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const animationFrameId = useRef<number | null>(null);
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;
  const prefersReducedMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  const initCanvas = () => {
    resizeCanvas();
    drawParticles();
  };

  type Circle = {
    x: number;
    y: number;
    translateX: number;
    translateY: number;
    size: number;
    alpha: number;
    targetAlpha: number;
    dx: number;
    dy: number;
    magnetism: number;
  };

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      circles.current.length = 0;
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;
      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current.scale(dpr, dpr);
    }
  };

  const circleParams = (): Circle => {
    const x = Math.floor(Math.random() * canvasSize.current.w);
    const y = Math.floor(Math.random() * canvasSize.current.h);
    const translateX = 0;
    const translateY = 0;
    const size = Math.floor(Math.random() * 5) + 0.1;
    const alpha = 0;
    const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
    const dx = (Math.random() - 0.5) * 0.1;
    const dy = (Math.random() - 0.5) * 0.1;
    const magnetism = 0.1 + Math.random();
    return {
      x,
      y,
      translateX,
      translateY,
      size,
      alpha,
      targetAlpha,
      dx,
      dy,
      magnetism,
    };
  };

  const drawCircle = (circle: Circle, update = false) => {
    if (context.current) {
      const { x, y, translateX, translateY, size, alpha } = circle;
      context.current.translate(translateX, translateY);
      context.current.beginPath();
      context.current.arc(x, y, size, 0, 3 * Math.PI);
      context.current.strokeStyle =
        themeMode === "light"
          ? `rgba(115, 115, 115, ${alpha})`
          : `rgba(210, 210, 210, ${alpha})`;
      context.current.stroke();
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!update) {
        circles.current.push(circle);
      }
    }
  };

  const clearContext = () => {
    if (context.current) {
      context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
    }
  };

  const drawParticles = () => {
    clearContext();
    const particleCount = quantity;
    for (let i = 0; i < particleCount; i++) {
      const circle = circleParams();
      drawCircle(circle);
    }
  };

  const remapValue = (
    value: number,
    start1: number,
    end1: number,
    start2: number,
    end2: number,
  ): number => {
    const remapped = ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
    return remapped > 0 ? remapped : 0;
  };

  const animate = () => {
    clearContext();
    circles.current.forEach((circle: Circle, i: number) => {
      // Handle the alpha value
      const edge = [
        circle.x + circle.translateX - circle.size, // distance from left edge
        canvasSize.current.w - circle.x - circle.translateX - circle.size, // distance from right edge
        circle.y + circle.translateY - circle.size, // distance from top edge
        canvasSize.current.h - circle.y - circle.translateY - circle.size, // distance from bottom edge
      ];
      const closestEdge = edge.reduce((a, b) => Math.min(a, b));
      const remapClosestEdge = parseFloat(
        remapValue(closestEdge, 0, 20, 0, 1).toFixed(2),
      );
      if (remapClosestEdge > 1) {
        circle.alpha += 0.02;
        if (circle.alpha > circle.targetAlpha) {
          circle.alpha = circle.targetAlpha;
        }
      } else {
        circle.alpha = circle.targetAlpha * remapClosestEdge;
      }
      circle.x += circle.dx;
      circle.y += circle.dy;
      // circle gets out of the canvas
      if (
        circle.x < -circle.size ||
        circle.x > canvasSize.current.w + circle.size ||
        circle.y < -circle.size ||
        circle.y > canvasSize.current.h + circle.size
      ) {
        // remove the circle from the array
        circles.current.splice(i, 1);
        // create a new circle
        const newCircle = circleParams();
        drawCircle(newCircle);
        // update the circle position
      } else {
        drawCircle(
          {
            ...circle,
            x: circle.x,
            y: circle.y,
            translateX: circle.translateX,
            translateY: circle.translateY,
            alpha: circle.alpha,
          },
          true,
        );
      }
    });
    if (!prefersReducedMotion.current) {
      animationFrameId.current = window.requestAnimationFrame(animate);
    }
  };

  const startAnimation = () => {
    if (animationFrameId.current !== null) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
    animate();
  };

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }

    initCanvas();
    startAnimation();
    window.addEventListener("resize", initCanvas);

    return () => {
      window.removeEventListener("resize", initCanvas);
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
    };
  }, []);

  useEffect(() => {
    initCanvas();
  }, [refresh]);

  useEffect(() => {
    startAnimation();
  }, [themeMode]);

  return (
    <Container aria-hidden="true">
      <div className={id ?? "hide"} ref={canvasContainerRef}>
        <canvas ref={canvasRef} />
      </div>
    </Container>
  );
}

export default function ThreeSpots() {
  return (
    <React.Fragment>
      <ContainedParticles quantity={150} id="circle large-particles" />
      <ContainedParticles quantity={50} id="circle small-particles" />
      <ContainedParticles quantity={10} id="circle tertiary-particles" />
    </React.Fragment>
  );
}
