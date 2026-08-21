import type { Metadata } from "next";
import StoreProvider from "./storeProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import Analytics from "./components/analytics";
import { activeFont, displayFont } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Victoria — UI/UX Designer & Developer",
  description:
    "I make complex products feel obvious. UI/UX design and front-end development for technical platforms, operational dashboards, remote device tooling, and AI agent systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en" className={`${activeFont.variable} ${displayFont.variable}`}>
        <head>
          <Analytics />
        </head>
        <body className={activeFont.className}>
          <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
