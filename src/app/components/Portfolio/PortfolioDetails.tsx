import * as React from "react";
import Dashboard from "./Dashboard";
import RemoteDevice from "./RemoteDevice";
import AgentPlatform from "./AgentPlatform";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

/**
 * Wrapper for the expanded case study. The reading layout, section index, and
 * figure bleed all live in CaseStudy — this only supplies the page rhythm and
 * a rule separating the study from the project grid above it.
 *
 * The container is always in the DOM, even with nothing expanded: the project
 * cards point `aria-controls` at it, and that reference has to resolve or the
 * relationship it advertises does not exist (WCAG 4.1.2).
 */
export default function PortfolioDetails({ index }: { index: number | undefined }) {
  const open = Boolean(index);

  return (
    <Box
      id="portfolio-section"
      sx={{
        scrollMarginTop: 72,
        ...(open && {
          borderTop: "1px solid",
          borderColor: "divider",
          mt: { xs: 4, md: 6 },
          py: { xs: 6, md: 10 },
        }),
      }}
    >
      {open && (
        <Container id="portfolio-details">
          {index === 1 && <AgentPlatform />}
          {index === 2 && <Dashboard />}
          {index === 3 && <RemoteDevice />}
        </Container>
      )}
    </Box>
  );
}
