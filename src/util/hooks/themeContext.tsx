import { createContext, useContext, useSyncExternalStore } from "react";
import { PaletteMode } from "@mui/material";

type themeContext = [PaletteMode, () => void];

const ThemeContext = createContext<themeContext>(["light", () => {}]);

const THEME_STORAGE_KEY = "theme";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot(): PaletteMode {
  return localStorage.getItem(THEME_STORAGE_KEY) === "dark" ? "dark" : "light";
}

function getServerSnapshot(): PaletteMode {
  // use the system theme by default
  return "light";
}

export default function ThemeContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeMode = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  // toggle the theme function
  function handleThemeMode() {
    localStorage.setItem(THEME_STORAGE_KEY, themeMode === "dark" ? "light" : "dark");
    window.dispatchEvent(new StorageEvent("storage"));
  }

  return (
    <ThemeContext.Provider value={[themeMode, handleThemeMode]}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeMode() {
  return useContext(ThemeContext);
}
