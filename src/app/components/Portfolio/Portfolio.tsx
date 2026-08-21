"use client";

import * as React from "react";
import { styled } from "@mui/system";
import PortfolioDetails from "./PortfolioDetails";
import { FIGURE_RADIUS } from "./CaseStudy";
import Stack from "@mui/material/Stack";
import Image, { StaticImageData } from "next/image";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import dashboardFinal from "images/portfolio/dashboard-final-data.png";
import remoteDevice from "images/portfolio/remote-device-interaction-shell.png";
import agentBuilderCover from "images/portfolio/ai-platform/agent-builder-1.png";

const StackComponent = ({ ...props }) => (
  <Stack id="readable-stack" spacing={5} direction={"column"} {...props} />
);

/**
 * Retained for the archived Reservation and AccountManagement case studies,
 * which still use the pre-CaseStudy reading layout.
 */
export const ReadableStack = styled(StackComponent)(({ theme }) => ({
  "h4.title": {
    marginBottom: theme.spacing(-2),
    position: "relative",
    width: "fit-content",
  },
  ".MuiTypography-root": {
    width: "100%",
  },
  [theme.breakpoints.up("md")]: {
    ".MuiTypography-root": {
      width: "65%",
    },
  },
}));

type Project = {
  index: number;
  title: string;
  year: string;
  role: string;
  summary: string;
  image: StaticImageData;
  /** The lead project runs full width; the rest pair up beneath it. */
  featured?: boolean;
};

const PROJECTS: Project[] = [
  {
    index: 1,
    title: "Agent Platform",
    year: "2026",
    role: "Design & Development",
    summary:
      "Configuration and proof in one viewport, so every edit to an agent is testable before it reaches a customer.",
    image: agentBuilderCover,
    featured: true,
  },
  {
    index: 2,
    title: "Core Dashboard",
    year: "2023 — 2024",
    role: "Design",
    summary:
      "A modular grid that keeps streaming operational data from rearranging itself under the user.",
    image: dashboardFinal,
  },
  {
    index: 3,
    title: "Remote Device Platform",
    year: "2023",
    role: "Design & Development",
    summary:
      "Real devices, logs, and an exec shell in one workspace for internal developers and QA.",
    image: remoteDevice,
  },
];

const ProjectCard = styled("button")(({ theme }) => ({
  appearance: "none",
  border: "none",
  padding: 0,
  margin: 0,
  width: "100%",
  textAlign: "left",
  cursor: "pointer",
  background: "transparent",
  color: "inherit",
  font: "inherit",
  display: "block",

  ".frame": {
    position: "relative",
    width: "100%",
    overflow: "hidden",
    borderRadius: FIGURE_RADIUS,
    border: "1px solid",
    borderColor: theme.palette.divider,
    backgroundColor: theme.palette.background.paper,
    transition:
      "transform 420ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 420ms cubic-bezier(0.22, 1, 0.36, 1)",
  },

  ".shot": {
    position: "absolute",
    inset: 0,
    transition: "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
  },

  "&:hover .frame, &:focus-visible .frame": {
    transform: "translateY(-6px)",
    boxShadow:
      theme.palette.mode === "light"
        ? "0 30px 60px -30px rgba(20, 29, 34, 0.4)"
        : "0 30px 60px -30px rgba(0, 0, 0, 0.85)",
  },
  "&:hover .shot": { transform: "scale(1.04)" },
  "&:focus-visible": { outline: "none" },
  "&:focus-visible .frame": {
    outline: `2px solid ${theme.palette.text.primary}`,
    outlineOffset: 3,
  },

  "&.is-open .frame": {
    borderColor: theme.palette.text.primary,
  },

  "@media (prefers-reduced-motion: reduce)": {
    ".frame, .shot": { transition: "none" },
    "&:hover .frame": { transform: "none" },
    "&:hover .shot": { transform: "none" },
  },
}));

function ProjectTile({
  project,
  open,
  onSelect,
}: {
  project: Project;
  open: boolean;
  onSelect: () => void;
}) {
  const { index, title, year, role, summary, image, featured } = project;

  return (
    <ProjectCard
      type="button"
      className={open ? "is-open" : undefined}
      aria-expanded={open}
      aria-controls="portfolio-section"
      onClick={onSelect}
    >
      <Box className="frame">
        {/*
          The screenshots are near-white product UI. Any scrim strong enough to
          carry white type over them turns into a black slab across the shot,
          so the caption sits below the image on paper instead: the screenshot
          stays fully visible and the type needs no cover at all.
        */}
        <Box
          className="shot-wrap"
          sx={{
            position: "relative",
            width: "100%",
            height: {
              xs: 200,
              sm: featured ? 380 : 260,
              md: featured ? 440 : 280,
            },
            overflow: "hidden",
          }}
        >
          <Box className="shot" sx={{ position: "absolute", inset: 0 }}>
            <Image
              src={image}
              fill
              sizes={featured ? "100vw" : "(max-width: 900px) 100vw, 50vw"}
              style={{ objectFit: "cover", objectPosition: "left top" }}
              alt=""
              priority={featured}
            />
          </Box>
        </Box>

        <Box
          className="meta"
          sx={{
            px: { xs: 2.5, sm: 3 },
            py: { xs: 2.5, sm: 3 },
            borderTop: "1px solid",
            borderColor: "divider",
            backgroundColor: "background.paper",
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="baseline" sx={{ mb: 1 }}>
            <Typography variant="h6" component="span" color="text.secondary">
              {String(index).padStart(2, "0")}
            </Typography>
            <Typography variant="subtitle2" component="span" color="text.secondary">
              {role} · {year}
            </Typography>
          </Stack>

          <Typography
            variant={featured ? "h3" : "h4"}
            component="h2"
            color="text.primary"
          >
            {title}
          </Typography>
        </Box>
      </Box>
    </ProjectCard>
  );
}

export default function Portfolio() {
  // 0 means "nothing expanded"; project indices start at 1.
  const [projectIndex, setProjectIndex] = React.useState<number>(0);

  function handleSelect(index: number) {
    const next = projectIndex === index ? 0 : index;
    setProjectIndex(next);

    if (next) {
      // Let the details mount before scrolling to them.
      window.requestAnimationFrame(() => {
        document
          .getElementById("portfolio-section")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }

  return (
    <Box component="section" id="work" sx={{ scrollMarginTop: 80 }}>
      <Container sx={{ pt: { xs: 10, md: 16 }, pb: { xs: 6, md: 8 } }}>
        <Stack spacing={2.5} sx={{ mb: { xs: 6, md: 9 }, maxWidth: "44ch" }}>
          <Typography variant="h6" component="p" color="text.secondary">
            Work
          </Typography>
          {/* <Typography variant="h2" component="h2" color="text.primary">
            Three platforms, up close.
          </Typography> */}
          <Typography variant="subtitle1" color="text.secondary">
            Each one is a technical product with a real operational cost to getting the
            interface wrong. Open any card to read the full case study.
          </Typography>
        </Stack>

        <Grid container spacing={{ xs: 3, md: 4 }}>
          {PROJECTS.map((project) => (
            <Grid item key={project.title} xs={12} md={project.featured ? 12 : 6}>
              <ProjectTile
                project={project}
                open={projectIndex === project.index}
                onSelect={() => handleSelect(project.index)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      <PortfolioDetails index={projectIndex} />
    </Box>
  );
}
