import * as React from "react";
import Dashboard from "./Dashboard";
import RemoteDevice from "./RemoteDevice";
import AgentPlatform from "./AgentPlatform";
import Reservation from "./Reservation";
import AccountManagement from "./AccountManagement";
import Box from "@mui/material/Box";

export default function PortfolioDetails({ index }: { index: number | undefined }) {
  if (index)
    return (
      <Box
        id="portfolio-details"
        sx={{
          position: "relative",
          borderRadius: 1,
          // border: (theme) =>
          //   `1px solid ${
          //     theme.palette.mode === "light"
          //       ? "rgba(9, 14, 16, 0.08)"
          //       : "rgba(255, 255, 255, 0.08)"
          //   }`,
          // backgroundColor: (theme) => theme.palette.background.paper,
          // boxShadow: (theme) =>
          //   theme.palette.mode === "light"
          //     ? "0 1px 2px rgba(9, 14, 16, 0.06), 0 12px 32px -16px rgba(9, 14, 16, 0.16)"
          //     : "0 1px 2px rgba(0, 0, 0, 0.4), 0 12px 32px -16px rgba(0, 0, 0, 0.6)",
          my: { xs: 4, sm: 6 },
          overflow: "hidden",
        }}
      >
        <Box
          component="div"
          id="portfolio-details-content"
          sx={{
            width: "100%",
            textAlign: "left",
            p: { xs: 3, sm: 4, md: 6 },
          }}
        >
          {index === 1 && <AgentPlatform />}
          {index === 2 && <Dashboard />}
          {index === 3 && <RemoteDevice />}
          {/* {index === 4 && <Reservation />}
          {index === 5 && <AccountManagement />} */}
        </Box>
      </Box>
    );
  else return;
}
