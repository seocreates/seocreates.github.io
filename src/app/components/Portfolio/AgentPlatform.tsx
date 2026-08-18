import * as React from "react";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ReadableStack } from "./Portfolio";
import Stack from "@mui/material/Stack";
import agentBuilder1 from "images/portfolio/ai-platform/agent-builder-1.png";
import agentBuilder2 from "images/portfolio/ai-platform/agent-builder-2.png";
import agentBuilder3 from "images/portfolio/ai-platform/agent-builder-3.png";
import agentBuilder4 from "images/portfolio/ai-platform/agent-builder-4.png";
import agentExecution1 from "images/portfolio/ai-platform/agent-execution-1.png";
import agentExecution2 from "images/portfolio/ai-platform/agent-execution-2.png";
import agentExecution3 from "images/portfolio/ai-platform/agent-execution-3.png";

export default function AgentPlatform() {
  return (
    <Grid container id="agent-platform" sx={{ mt: { xs: 1, sm: 2 }, mb: 4 }}>
      <Grid item xs={12}>
        <ReadableStack mb={5}>
          <Typography variant="h4" component="h2" className="title" color="text.primary">
            Agent Platform
          </Typography>

          <Stack spacing={2} direction={"column"}>
            <Typography variant="h6" component="h3" color="text.secondary">
              Background
            </Typography>
            <Typography variant="body1" color="text.primary">
              An AI orchestration platform: customers connect their own data, build agents
              on top of it, and run those agents in production with confidence.
            </Typography>
            <Typography variant="body1" color="text.primary">
              An agent&apos;s configuration is the smallest, highest-consequence surface
              in the product: one field decides what an agent knows, what it&apos;s
              allowed to do, and how it behaves for every conversation downstream. So we
              put the test chat and the configuration in one viewport, permanently, and
              made every edit provable before it ships.
            </Typography>
          </Stack>

          <Stack spacing={2} direction={"column"}>
            <Typography variant="h6" component="h3" color="text.secondary">
              Responsibilities
            </Typography>
            <Typography variant="body1" color="text.primary">
              Led end-to-end product design for the platform, owning the experience from
              discovery through production across agent configuration, knowledge base
              management, tool integration, and response presentation.
            </Typography>
            <Typography variant="body1" color="text.primary">
              Operated in a fast-paced startup environment, shipping improvements weekly.
              Analyzed user sessions in LogRocket to surface usability issues and
              navigation friction, then translated those findings into prioritized design
              work.
            </Typography>
            <Typography variant="body1" color="text.primary">
              Partnered closely with back-end engineers to turn product strategy into
              shipped experiences, working directly in React, TypeScript, Tailwind CSS,
              and Shadcn UI.
            </Typography>
            <Typography variant="body1" color="text.secondary" fontStyle="italic">
              More coming soon.
            </Typography>
          </Stack>
        </ReadableStack>
      </Grid>

      <Grid item xs={12}>
        <Stack id="agent-builder" spacing={4} mb={5}>
          <Box>
            <Image
              src={agentBuilder1}
              width={0}
              height={0}
              sizes="100vw"
              style={{
                objectFit: "contain",
                width: "100%",
                height: "auto",
                borderRadius: 20,
              }}
              alt="agent builder with test chat and configuration in one viewport"
              loading="lazy"
            />
            <Typography variant="caption" fontStyle={"italic"} color="text.secondary">
              Test Chat and Configuration in One Viewport
            </Typography>
          </Box>
          <Box>
            <Image
              src={agentBuilder2}
              width={0}
              height={0}
              sizes="100vw"
              style={{
                objectFit: "contain",
                width: "100%",
                height: "auto",
                borderRadius: 20,
              }}
              alt="testing agent responses against live configuration"
              loading="lazy"
            />
            <Typography variant="caption" fontStyle={"italic"} color="text.secondary">
              Testing Responses Against Live Configuration Changes
            </Typography>
          </Box>
          <Box>
            <Image
              src={agentBuilder3}
              width={0}
              height={0}
              sizes="100vw"
              style={{
                objectFit: "contain",
                width: "100%",
                height: "auto",
                borderRadius: 20,
              }}
              alt="automated evaluation and coherence scoring"
              loading="lazy"
            />
            <Typography variant="caption" fontStyle={"italic"} color="text.secondary">
              Automated Evaluation and Coherence Scoring
            </Typography>
          </Box>
          <Box>
            <Image
              src={agentBuilder4}
              width={0}
              height={0}
              sizes="100vw"
              style={{
                objectFit: "contain",
                width: "100%",
                height: "auto",
                borderRadius: 20,
              }}
              alt="publishing an agent version"
              loading="lazy"
            />
            <Typography variant="caption" fontStyle={"italic"} color="text.secondary">
              Publishing an Agent Version
            </Typography>
          </Box>
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <Stack id="agent-execution" spacing={4}>
          <Box>
            <Image
              src={agentExecution1}
              width={0}
              height={0}
              sizes="100vw"
              style={{
                objectFit: "contain",
                width: "100%",
                height: "auto",
                borderRadius: 20,
              }}
              alt="execution view for a published agent"
              loading="lazy"
            />
            <Typography variant="caption" fontStyle={"italic"} color="text.secondary">
              Execution View for a Published Agent
            </Typography>
          </Box>
          <Box>
            <Image
              src={agentExecution2}
              width={0}
              height={0}
              sizes="100vw"
              style={{
                objectFit: "contain",
                width: "100%",
                height: "auto",
                borderRadius: 20,
              }}
              alt="conversation overview with confidence score, sources, and artifacts"
              loading="lazy"
            />
            <Typography variant="caption" fontStyle={"italic"} color="text.secondary">
              Conversation Overview with Confidence Score, Sources, and Artifacts
            </Typography>
          </Box>
          <Box>
            <Image
              src={agentExecution3}
              width={0}
              height={0}
              sizes="100vw"
              style={{
                objectFit: "contain",
                width: "100%",
                height: "auto",
                borderRadius: 20,
              }}
              alt="cost and token usage breakdown"
              loading="lazy"
            />
            <Typography variant="caption" fontStyle={"italic"} color="text.secondary">
              Cost and Token Usage Breakdown
            </Typography>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
}
