"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import GradientField from "./GradientField";
import { primary } from "app/theme";

/** Small pill that names the discipline before the headline lands. */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      variant="h6"
      component="span"
      sx={{
        alignSelf: "center",
        px: 2,
        py: 0.85,
        borderRadius: 999,
        border: "1px solid",
        borderColor: "divider",
        color: "text.secondary",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? "rgba(255, 255, 255, 0.5)"
            : "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(8px)",
      }}
    >
      {children}
    </Typography>
  );
}

function scrollToWork() {
  document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Header() {
  return (
    <Box
      component="section"
      id="hero"
      sx={{
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        minHeight: { xs: "auto", md: "100svh" },
        pt: { xs: 16, md: 12 },
        pb: { xs: 18, md: 20 },
      }}
    >
      <GradientField />

      <Container sx={{ position: "relative", zIndex: 1 }}>
        <Stack spacing={{ xs: 4, md: 5 }} alignItems="center">
          <Eyebrow>Product Design &amp; Front-end</Eyebrow>

          <Typography
            variant="h1"
            component="h1"
            textAlign="center"
            color="text.primary"
            sx={{ maxWidth: "18ch", mx: "auto" }}
          >
            I make complex products feel{" "}
            <Box component="em" sx={{ fontStyle: "italic" }}>
              obvious
            </Box>
            .
          </Typography>

          <Typography
            variant="subtitle1"
            textAlign="center"
            // text.secondary is tuned for flat paper and only reaches 3.7:1
            // over the hero gradient's brightest region. One step darker in
            // light mode (and lighter in dark) clears 4.5:1 with margin.
            color={(theme) =>
              theme.palette.mode === "light" ? primary[600] : primary[200]
            }
            sx={{ maxWidth: "56ch", mx: "auto" }}
          >
            I&apos;m Victoria, a UI/UX designer who writes the front-end too. I work on
            dense, technical platforms: operational dashboards, and AI agent systems.
          </Typography>
        </Stack>
      </Container>

      {/* The label is a caption for the control beneath it, not a target of its
          own — the chevron is the only thing that takes the click. */}
      <Stack
        spacing={1.5}
        alignItems="center"
        sx={{
          position: "absolute",
          bottom: { xs: 40, md: 48 },
          left: 0,
          right: 0,
          zIndex: 1,
        }}
      >
        <Typography
          variant="subtitle2"
          component="p"
          aria-hidden="true"
          color="text.primary"
          sx={{ pointerEvents: "none", userSelect: "none" }}
        >
          View My Work
        </Typography>

        <Box
          component="button"
          type="button"
          onClick={scrollToWork}
          aria-label="View my work"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 44,
            height: 44,
            p: 0,
            borderRadius: "50%",
            cursor: "pointer",
            color: "primary.contrastText",
            backgroundColor: "primary.main",
            border: "none",
            transition: "transform 220ms ease, opacity 220ms ease",
            "&:hover": { opacity: 0.86, transform: "translateY(2px)" },
            "&:focus-visible": {
              outline: "2px solid",
              outlineColor: "text.primary",
              outlineOffset: 3,
            },

            "@keyframes nudge": {
              "0%, 100%": { transform: "translateY(0)" },
              "50%": { transform: "translateY(4px)" },
            },
            "& svg": {
              animation: "nudge 2.4s ease-in-out infinite",
            },
            "@media (prefers-reduced-motion: reduce)": {
              transition: "none",
              "&:hover": { transform: "none" },
              "& svg": { animation: "none" },
            },
          }}
        >
          <ArrowDownwardIcon sx={{ fontSize: 20 }} />
        </Box>
      </Stack>
    </Box>
  );
}
