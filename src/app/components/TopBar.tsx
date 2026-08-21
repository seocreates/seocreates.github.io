"use client";

import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import { useThemeMode } from "util/hooks/themeContext";

/**
 * The page's only fixed chrome: a colour-mode toggle floating over the
 * content. There is no bar behind it — the gradient and the paper below it
 * run edge to edge and uninterrupted.
 */
export default function TopBar() {
  const [themeMode, handleThemeMode] = useThemeMode();
  const label = themeMode === "light" ? "Switch to dark mode" : "Switch to light mode";

  return (
    <Tooltip title={label}>
      <IconButton
        onClick={() => handleThemeMode()}
        aria-label={label}
        size="small"
        sx={{
          position: "fixed",
          top: { xs: 14, md: 20 },
          right: { xs: 14, md: 24 },
          zIndex: 1100,
          width: 38,
          height: 38,
          border: "1px solid",
          borderColor: "divider",
          color: "text.primary",
          // A faint scrim so the icon stays readable over both the hero
          // gradient and plain paper further down the page.
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? "rgba(255, 255, 255, 0.55)"
              : "rgba(20, 25, 28, 0.55)",
          backdropFilter: "blur(10px)",
          "&:hover": {
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? "rgba(255, 255, 255, 0.8)"
                : "rgba(20, 25, 28, 0.8)",
          },
          "&:focus-visible": {
            outline: "2px solid",
            outlineColor: "text.primary",
            outlineOffset: 2,
          },
        }}
      >
        {themeMode === "light" ? (
          <DarkModeOutlined sx={{ fontSize: 18 }} />
        ) : (
          <LightModeOutlined sx={{ fontSize: 18 }} />
        )}
      </IconButton>
    </Tooltip>
  );
}
