import * as React from "react";
import { styled } from "@mui/system";
import PortfolioDetails from "./PortfolioDetails";
import Stack from "@mui/material/Stack";
import Image from "next/image";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CheckIcon from "@mui/icons-material/Check";
import accountWeb from "images/portfolio/account-web-access-prototype.png";
import dashboardFinal from "images/portfolio/dashboard-final-data.png";
import remoteDevice from "images/portfolio/remote-device-interaction-shell.png";
import deviceReservation from "images/portfolio/reservation.png";
import agentBuilderCover from "images/portfolio/ai-platform/agent-builder-1.png";

const CardComponent = ({ ...props }) => <Card {...props} />;

const CardButton = styled(CardComponent)(({ theme }) => ({
  position: "relative",
  flexDirection: "column",
  height: "fit-content",
  width: "100%",
  background: theme.palette.background.paper,
  // borderRadius: 1,
  overflow: "hidden",
  lineHeight: "normal",
  boxShadow:
    theme.palette.mode === "light"
      ? "0 1px 2px rgba(9, 14, 16, 0.06), 0 1px 4px rgba(9, 14, 16, 0.08)"
      : "0 1px 2px rgba(0, 0, 0, 0.4), 0 1px 4px rgba(0, 0, 0, 0.5)",
  transition: "transform 320ms ease-out, box-shadow 320ms ease-out",

  "&:hover:not(.selected)": {
    transform: "translateY(-6px)",
    boxShadow:
      theme.palette.mode === "light"
        ? "0 24px 40px -16px rgba(9, 14, 16, 0.28)"
        : "0 24px 40px -16px rgba(0, 0, 0, 0.7)",
  },

  "&:hover .portfolio-card-image": {
    transform: "scale(1.06)",
  },

  // "&.selected": {
  //   boxShadow: `0 0 0 3px ${theme.palette.primary.main}`,
  // },

  "&.MuiPaper-root": { padding: 0, margin: 0 },
}));

const StackComponent = ({ ...props }) => (
  <Stack id="readable-stack" spacing={5} direction={"column"} {...props} />
);

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

const projects = [
  {
    title: "Main Page",
    show: false,
    image: "",
  },
  {
    title: "Agent Platform",
    subheader: "2026",
    description: "Design & Development",
    image: agentBuilderCover,
    show: true,
  },
  {
    title: "Core Dashboard",
    subheader: "2024 - 2023",
    description: "Design",
    image: dashboardFinal,
    show: true,
  },
  {
    title: "Remote Device Platform",
    subheader: "2023",
    description: "Design & Development",
    image: remoteDevice,
    show: true,
  },
];

export default function Portfolio() {
  const [projectIndex, setProjectIndex] = React.useState<number>(0);

  async function scrollToPortfolio() {
    const portfolioElement = document.getElementById("portfolio-section");
    const hasChild = await portfolioElement?.hasChildNodes;

    if (portfolioElement && hasChild) {
      const topTarget = portfolioElement.offsetTop;
      portfolioElement.scrollIntoView({ behavior: "smooth" });
      window.scrollTo({
        top: topTarget,
        behavior: "smooth",
      });
    }
  }

  function handleIndexChange(index: number) {
    setProjectIndex(index);
    if (index) scrollToPortfolio();
  }

  return (
    <Container id="portfolio" sx={{ pt: { xs: 8, sm: 8 } }}>
      {/* <Stack spacing={1} sx={{ mb: { xs: 4, sm: 6 } }}>
        <Typography variant="h4" component="h2" color="text.primary" fontWeight={600}>
          Selected Work
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 640 }}>
          A look at platforms I&apos;ve designed and built, from internal dashboards to
          device testing tools.
        </Typography>
      </Stack> */}
      <Grid
        container
        spacing={{ xs: 3, md: 4 }}
        sx={{
          display: {
            xs: "auto",
          },
        }}
      >
        {projects.map(({ title, subheader, description, image, show }, index) => {
          if (show)
            return (
              <Grid item key={title} xs={12} md={6}>
                <CardButton
                  className={projectIndex === index ? "selected" : "selectable"}
                  key={index}
                  component={Button}
                  onClick={() => handleIndexChange(index)}
                >
                  <Box sx={{ position: "relative", width: "100%", height: 320 }}>
                    <Box
                      className="portfolio-card-image"
                      sx={{
                        position: "absolute",
                        inset: 0,
                        transition: "transform 0.5s ease",
                      }}
                    >
                      <Image
                        src={image}
                        fill
                        sizes="(max-width: 564px) 100vw"
                        style={{
                          objectFit: "cover",
                          objectPosition: "left top",
                        }}
                        alt={title}
                        priority
                      />
                    </Box>
                    <Box
                      aria-hidden="true"
                      sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(180deg, rgba(9,14,16,0) 42%, rgba(9,14,16,0.82) 100%)",
                      }}
                    />
                    {projectIndex === index && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: 16,
                          left: 16,
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          px: 1.25,
                          py: 0.5,
                          // borderRadius: 1,
                          bgcolor: "primary.main",
                          color: "primary.contrastText",
                        }}
                      >
                        <CheckIcon sx={{ fontSize: 14 }} />
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: 500,
                            letterSpacing: 0.4,
                            textTransform: "capitalize",
                          }}
                        >
                          Viewing
                        </Typography>
                      </Box>
                    )}
                    {/* <Box
                      sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        background: "rgba(255, 255, 255, 0.16)",
                        backdropFilter: "blur(8px)",
                        transform:
                          projectIndex === index ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.3s ease",
                      }}
                    >
                      <ArrowDownwardIcon sx={{ fontSize: 18 }} />
                    </Box> */}
                    <Box
                      sx={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        textAlign: "left",
                        p: { xs: 2, sm: 2.5 },
                      }}
                    >
                      <Typography
                        component="span"
                        variant="caption"
                        sx={{
                          display: "inline-block",
                          mb: 1,
                          px: 1.25,
                          py: 0.25,
                          // borderRadius: 1,
                          fontWeight: 500,
                          letterSpacing: 0.4,
                          textTransform: "capitalize",
                          color: "#fff",
                          background: "rgba(255, 255, 255, 0.18)",
                          backdropFilter: "blur(6px)",
                        }}
                      >
                        {description} · {subheader}
                      </Typography>
                      <Typography
                        color="#fff"
                        variant="h5"
                        component="p"
                        sx={{
                          fontWeight: 300,
                          textTransform: "capitalize",
                          textShadow: "0 2px 12px rgba(0,0,0,0.35)",
                        }}
                      >
                        {title}
                      </Typography>
                    </Box>
                  </Box>
                </CardButton>
              </Grid>
            );
          else return;
        })}
      </Grid>
      <div id="portfolio-section">
        <PortfolioDetails index={projectIndex} />
      </div>
    </Container>
  );
}
