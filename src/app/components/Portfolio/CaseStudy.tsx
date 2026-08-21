"use client";

import * as React from "react";
import Image, { StaticImageData } from "next/image";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

/**
 * Case-study reading layout.
 *
 * A single measure-controlled text column sits centred in the page, with a
 * sticky section index parked in the left margin. Figures break out of the
 * measure symmetrically so they stay centred on the same axis as the prose.
 */

const NAV_WIDTH = 140;
const GUTTER = { xs: 0, md: 8 };
const MEASURE = 660;
/** How far figures break out past the text measure, per side, in MUI spacing
 *  units (15 * 8px = 120px). The sx spacing shorthand only accepts units, not
 *  raw px strings — passing "-120px" resolves to no margin at all. */
const BLEED = 15;

/**
 * Corner radius for every image container on the site — case-study figures
 * and project cards alike. A literal px string is used rather than an MUI
 * shape multiple so the value reads as itself; `sx` passes strings through
 * untouched for `borderRadius` (unlike the spacing props, where a raw px
 * string is silently dropped).
 */
export const FIGURE_RADIUS = "14px";

export type CaseStudySection = { id: string; label: string };

/* ------------------------------------------------------------------ nav -- */

function SectionNav({
  sections,
  activeId,
}: {
  sections: CaseStudySection[];
  activeId: string | null;
}) {
  return (
    <Box
      component="nav"
      aria-label="Case study sections"
      sx={{
        width: NAV_WIDTH,
        flexShrink: 0,
        display: { xs: "none", md: "block" },
        marginRight: "24px",
      }}
    >
      <Stack spacing={0.75} sx={{ position: "sticky", top: 120 }}>
        {sections.map(({ id, label }) => {
          const active = activeId === id;
          return (
            <Box
              key={id}
              component="a"
              href={`#${id}`}
              sx={{
                fontSize: 15,
                lineHeight: 1.9,
                color: active ? "text.primary" : "text.secondary",
                fontWeight: active ? 500 : 400,
                transition: "color 220ms ease",
                // Keeps the hit area at or above the 24x24 minimum even for
                // the shortest label.
                minHeight: 24,
                display: "flex",
                alignItems: "center",
                "&:hover": { color: "text.primary" },
                "&:focus-visible": {
                  outline: "2px solid",
                  outlineColor: "text.primary",
                  outlineOffset: 3,
                  borderRadius: "2px",
                },
              }}
            >
              {label}
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}

/* --------------------------------------------------------------- layout -- */

export function CaseStudyLayout({
  sections,
  children,
}: {
  sections: CaseStudySection[];
  children: React.ReactNode;
}) {
  const [activeId, setActiveId] = React.useState<string | null>(sections[0]?.id ?? null);

  React.useEffect(() => {
    const targets = sections
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!targets.length) return;

    // The current section is the last one whose top has passed reading
    // position. An IntersectionObserver band is wrong here: sections are far
    // taller than any band, so mid-section the band matches nothing and the
    // highlight would stall on whichever section last entered it.
    const READING_LINE = 160;
    let frame = 0;

    const update = () => {
      frame = 0;
      let current = targets[0];
      for (const el of targets) {
        if (el.getBoundingClientRect().top <= READING_LINE) current = el;
        else break;
      }
      setActiveId(current.id);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: GUTTER,
        // Deliberately not flex-start: the nav column has to stretch to the
        // full height of the study, or its sticky child has nothing to travel
        // inside and unpins as soon as the first section scrolls past.
        alignItems: "stretch",
      }}
    >
      <SectionNav sections={sections} activeId={activeId} />

      <Box sx={{ width: "100%", maxWidth: MEASURE, minWidth: 0 }}>{children}</Box>

      {/* Mirror of the nav column so the measure stays optically centred. */}
      <Box
        aria-hidden="true"
        sx={{ width: NAV_WIDTH, flexShrink: 0, display: { xs: "none", md: "block" } }}
      />
    </Box>
  );
}

/* -------------------------------------------------------------- section -- */

export function Section({
  id,
  index,
  eyebrow,
  title,
  rule = true,
  children,
}: {
  id: string;
  index: number;
  eyebrow: string;
  title: string;
  rule?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Box component="section" id={id} sx={{ scrollMarginTop: 110, pt: { xs: 7, md: 10 } }}>
      {rule && <Box sx={{ height: "1px", bgcolor: "divider", mb: { xs: 5, md: 7 } }} />}

      <Typography variant="h6" component="p" color="text.secondary" sx={{ mb: 2 }}>
        {String(index).padStart(2, "0")} — {eyebrow}
      </Typography>

      <Typography variant="h3" component="h3" color="text.primary" sx={{ mb: 4 }}>
        {title}
      </Typography>

      <Stack spacing={2.5} useFlexGap>
        {children}
      </Stack>
    </Box>
  );
}

/** A titled block inside a section — used for phases and outcome items. */
export function SubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ pt: { xs: 3, md: 4 } }}>
      <Typography variant="h4" component="h4" color="text.primary" sx={{ mb: 3 }}>
        {title}
      </Typography>
      <Stack spacing={2.5} useFlexGap>
        {children}
      </Stack>
    </Box>
  );
}

export function P({
  children,
  dim = false,
}: {
  children: React.ReactNode;
  dim?: boolean;
}) {
  return (
    <Typography variant="body1" color={dim ? "text.secondary" : "text.primary"}>
      {children}
    </Typography>
  );
}

/** Short label + explanation pair, as used for outcomes. */
export function Point({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Box>
      <Typography variant="subtitle2" color="text.primary" sx={{ mb: 0.75 }}>
        {label}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {children}
      </Typography>
    </Box>
  );
}

export function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <Stack component="ul" spacing={1.25} sx={{ pl: 2.5, m: 0 }}>
      {items.map((item, i) => (
        <Typography
          key={i}
          component="li"
          variant="body1"
          color="text.primary"
          sx={{ "&::marker": { color: "text.secondary" } }}
        >
          {item}
        </Typography>
      ))}
    </Stack>
  );
}

/** Callout for NDA notices and other standing caveats. */
export function Note({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        borderLeft: "2px solid",
        borderColor: "divider",
        pl: 2.5,
        py: 0.5,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {children}
      </Typography>
    </Box>
  );
}

/* --------------------------------------------------------------- figures -- */

/**
 * Breaks symmetrically out of the text measure so images read wider than the
 * prose while staying on the same centre line.
 */
export function Figure({
  src,
  alt,
  caption,
  priority = false,
}: {
  src: StaticImageData;
  alt: string;
  caption?: string;
  priority?: boolean;
}) {
  return (
    <Box
      component="figure"
      sx={{
        m: 0,
        mt: { xs: 2, md: 3 },
        mx: { xs: 0, md: -BLEED },
      }}
    >
      <Box
        sx={{
          overflow: "hidden",
          borderRadius: FIGURE_RADIUS,
          border: "1px solid",
          borderColor: "divider",
          lineHeight: 0,
          backgroundColor: "background.paper",
        }}
      >
        <Image
          src={src}
          width={0}
          height={0}
          sizes="(max-width: 900px) 100vw, 900px"
          style={{ objectFit: "contain", width: "100%", height: "auto" }}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          priority={priority}
        />
      </Box>
      {caption && (
        <Typography
          component="figcaption"
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mt: 1.5 }}
        >
          {caption}
        </Typography>
      )}
    </Box>
  );
}

/** Two or three figures on one row, sharing the same break-out band. */
export function FigureRow({ children }: { children: React.ReactNode }) {
  const count = React.Children.count(children);
  return (
    <Box
      sx={{
        mt: { xs: 2, md: 3 },
        mx: { xs: 0, md: -BLEED },
        display: "grid",
        gap: { xs: 3, md: 3 },
        gridTemplateColumns: {
          xs: "1fr",
          sm: count >= 3 ? "repeat(3, 1fr)" : "repeat(2, 1fr)",
        },
        "& > figure": { margin: 0, marginTop: 0, marginLeft: 0, marginRight: 0 },
      }}
    >
      {children}
    </Box>
  );
}
