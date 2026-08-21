"use client";

import React, { Suspense } from "react";
import Loading from "./components/Loading";
import ThemeContextProvider from "../util/hooks/themeContext";
import { useThemeMode } from "../util/hooks/themeContext";
import Box from "@mui/material/Box";
import { CssBaseline } from "@mui/material";
import { PaletteMode } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import getTheme from "./theme";
import TopBar from "./components/TopBar";
import Header from "./components/Header";
import Portfolio from "./components/Portfolio/Portfolio";
import Footer from "./components/Footer";

function MainContent() {
  const [themeMode] = useThemeMode();

  const CustomTheme = React.useMemo(() => {
    return getTheme(themeMode as PaletteMode);
  }, [themeMode]);

  return (
    <ThemeProvider theme={CustomTheme}>
      <CssBaseline />
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          backgroundColor: "background.default",
          color: "text.primary",
          overflowX: "clip",
        }}
      >
        <TopBar />
        <Box component="main">
          <Header />
          <Portfolio />
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<Loading />}>
      <ThemeContextProvider>
        <MainContent />
      </ThemeContextProvider>
    </Suspense>
  );
}
