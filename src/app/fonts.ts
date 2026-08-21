import { Outfit, Instrument_Serif } from "next/font/google";

/**
 * Body face. Outfit ships in a single upright style — there is no italic on
 * Google Fonts — which is fine here: the only italic on the page lives in the
 * serif headline.
 *
 * To swap the body font site-wide, declare it here and point `activeFont` at
 * it. Only fonts declared in this file get built, so keep unused ones out.
 */
export const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  display: "swap",
  variable: "--font-outfit",
});

/** Editorial display face used for headlines and section titles. */
export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument-serif",
});

export const activeFont = outfit;

export const displayFont = instrumentSerif;

export const displayFontFamily = `${instrumentSerif.style.fontFamily}, "Instrument Serif", Georgia, serif`;
