"use client";

import type {} from "@mui/material/themeCssVarsAugmentation";
import { ThemeOptions, alpha, createTheme } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";
import { activeFont, displayFontFamily } from "./fonts";

declare module "@mui/material/styles/createPalette" {
  interface ColorRange {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  }

  interface PaletteColor extends ColorRange {}
}

/**
 * Ink — the single text/UI ramp. A deep desaturated slate that sits warm
 * against the paper background without reading as pure black.
 */
export const primary = {
  50: "#F2F4F5",
  100: "#DFE5E8",
  200: "#C2CDD3",
  300: "#9AAAB3",
  400: "#72868F",
  500: "#52666F",
  600: "#3D4E56",
  700: "#2D3B42",
  800: "#1F2B31",
  900: "#141D22",
};

/**
 * Accent — the periwinkle drawn out of the hero gradient. Used sparingly for
 * interactive state so the gradient stays the only loud thing on the page.
 */
export const secondary = {
  50: "#F4F7FE",
  100: "#E4EBFB",
  200: "#C9D8F6",
  300: "#A8C1F0",
  400: "#83A5E6",
  500: "#6288D6",
  600: "#4A6DBC",
  700: "#3B5698",
  800: "#2E4275",
  900: "#233254",
};

/**
 * The hero gradient palette. These are the only saturated colours in the
 * system and they exist purely as light — never as type or chrome.
 */
export const glow = {
  coral: "#F2643C",
  blush: "#E9A6D4",
  lilac: "#C3A5EC",
  periwinkle: "#A6C2F2",
  mint: "#9BD8A6",
  butter: "#F6D98A",
};

export const red = {
  50: "#f9e3e6",
  100: "#f1b9c0",
  200: "#e78d97",
  300: "#da6371",
  400: "#d04956",
  500: "#c6383f",
  600: "#b7333e",
  700: "#a32d3b",
  800: "#8f2738",
  900: "#6c1e32",
};

export const gray = {
  50: "#FBFAF7",
  100: "#F3F2ED",
  200: "#E7E5DD",
  300: "#D3D0C6",
  400: "#A8A497",
  500: "#78746A",
  600: "#4C4A44",
  700: "#2A2C2C",
  800: "#171B1D",
  900: "#0E1214",
};

/** Warm paper in light mode, near-black in dark mode. */
export const paper = {
  light: "#F3F2ED",
  lightRaised: "#FBFAF7",
  dark: "#0E1214",
  darkRaised: "#181D20",
};

const customTheme = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      light: primary[300],
      main: primary[800],
      dark: primary[900],
      contrastText: gray[50],
      ...(mode === "dark" && {
        light: primary[300],
        main: primary[100],
        dark: primary[200],
        contrastText: primary[900],
      }),
    },

    secondary: {
      light: secondary[300],
      main: secondary[600],
      dark: secondary[800],
      ...(mode === "dark" && {
        light: secondary[200],
        main: secondary[300],
        dark: secondary[500],
      }),
    },
    background: {
      default: paper.light,
      paper: paper.lightRaised,
      ...(mode === "dark" && { default: paper.dark, paper: paper.darkRaised }),
    },
    divider:
      mode === "light" ? "rgba(20, 29, 34, 0.12)" : "rgba(243, 242, 237, 0.14)",
    text: {
      primary: primary[900],
      secondary: primary[500],
      disabled: primary[300],
      ...(mode === "dark" && {
        primary: gray[100],
        secondary: primary[300],
        disabled: primary[500],
      }),
    },
    action: {
      selected: `${alpha(primary[800], 0.08)}`,
      hover: `${alpha(primary[800], 0.05)}`,
      ...(mode === "dark" && {
        selected: alpha(gray[100], 0.1),
        hover: alpha(gray[100], 0.06),
      }),
    },
  },
  typography: {
    fontFamily: `${activeFont.style.fontFamily}, -apple-system, system-ui, sans-serif`,
    fontSize: 14,

    // Display sizes use the editorial serif and fluid clamps so the hero
    // stays proportional from 360px through ultrawide without breakpoints.
    h1: {
      fontFamily: displayFontFamily,
      fontSize: "clamp(3.25rem, 8.2vw, 8rem)",
      fontWeight: 400,
      lineHeight: 0.98,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontFamily: displayFontFamily,
      fontSize: "clamp(2.5rem, 5.4vw, 4.5rem)",
      fontWeight: 400,
      lineHeight: 1.04,
      letterSpacing: "-0.015em",
    },
    h3: {
      fontFamily: displayFontFamily,
      fontSize: "clamp(2rem, 3.8vw, 3.25rem)",
      fontWeight: 400,
      lineHeight: 1.08,
      letterSpacing: "-0.01em",
    },
    h4: {
      fontFamily: displayFontFamily,
      fontSize: "clamp(1.75rem, 2.9vw, 2.6rem)",
      fontWeight: 400,
      lineHeight: 1.12,
      letterSpacing: "-0.01em",
    },
    h5: {
      fontFamily: displayFontFamily,
      fontSize: "clamp(1.4rem, 2vw, 1.9rem)",
      fontWeight: 400,
      lineHeight: 1.2,
    },

    // h6 is the eyebrow/label voice: small, tracked, sans.
    h6: {
      fontSize: 12,
      textTransform: "uppercase" as const,
      letterSpacing: "0.1em",
      fontWeight: 500,
      lineHeight: 1.4,
    },
    subtitle1: {
      fontWeight: 400,
      fontSize: "clamp(1.0625rem, 1.4vw, 1.25rem)",
      lineHeight: 1.6,
      letterSpacing: "-0.005em",
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: 14,
      lineHeight: 1.5,
      letterSpacing: "0.01em",
    },
    body1: {
      fontWeight: 400,
      fontSize: 16.5,
      lineHeight: 1.65,
      letterSpacing: "-0.003em",
    },
    body2: {
      fontWeight: 400,
      fontSize: 15,
      lineHeight: 1.6,
    },
    caption: {
      fontWeight: 400,
      fontSize: 13,
      lineHeight: 1.5,
      letterSpacing: "0.01em",
    },
    button: {
      textTransform: "none" as const,
      fontWeight: 500,
      letterSpacing: 0,
    },
  },
  shape: { borderRadius: 4 },
});

export default function getTheme(mode: PaletteMode): ThemeOptions {
  const palette = customTheme(mode);

  const theme = createTheme({
    ...palette,
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          "::selection": {
            background:
              mode === "light" ? "rgba(166, 194, 242, 0.5)" : "rgba(166, 194, 242, 0.3)",
          },
          html: { scrollBehavior: "smooth", WebkitFontSmoothing: "antialiased" },
          "@media (prefers-reduced-motion: reduce)": {
            html: { scrollBehavior: "auto" },
          },
        },
      },
      MuiTypography: {
        defaultProps: {
          variantMapping: {
            h1: "h1",
            h2: "h2",
            h3: "h3",
            h4: "h4",
            h5: "h5",
            h6: "h6",
            subtitle1: "p",
            subtitle2: "span",
            body1: "p",
            body2: "p",
            inherit: "p",
          },
        },
      },
      MuiContainer: {
        defaultProps: { maxWidth: "lg" },
        styleOverrides: {
          root: { paddingLeft: 24, paddingRight: 24 },
        },
      },
    },
  });

  return theme;
}
