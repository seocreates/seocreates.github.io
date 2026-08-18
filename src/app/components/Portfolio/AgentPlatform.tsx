import * as React from "react";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ReadableStack } from "./Portfolio";
import Stack from "@mui/material/Stack";
import agentBuilder1 from "images/portfolio/ai-platform/agent-builder-1.png";
import agentBuilderModel1 from "images/portfolio/ai-platform/agent-builder-model-1.png";
import agentBuilderPreviewChat1 from "images/portfolio/ai-platform/agent-builder-preview-chat-1.png";
import agentBuilderPreviewGeneratingArtifact from "images/portfolio/ai-platform/agent-builder-preview-generating-artifact.png";
import agentExecutionEmpty from "images/portfolio/ai-platform/agent-execution-empty.png";
import agentExecution1 from "images/portfolio/ai-platform/agent-execution-1.png";
import agentExecutionConfidenceOverview from "images/portfolio/ai-platform/agent-execution-confidence-overview.png";
import agentExecutionConfidenceReasoning from "images/portfolio/ai-platform/agent-execution-confidence-reasoning.png";

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
                borderRadius: 16,
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
              src={agentBuilderModel1}
              width={0}
              height={0}
              sizes="100vw"
              style={{
                objectFit: "contain",
                width: "100%",
                height: "auto",
                borderRadius: 16,
              }}
              alt="choosing a primary model with capabilities and pricing visible in the picker"
              loading="lazy"
            />
            <Typography variant="caption" fontStyle={"italic"} color="text.secondary">
              Choosing a Primary Model with Capabilities and Pricing Visible
            </Typography>
          </Box>
          <Box>
            <Image
              src={agentBuilderPreviewChat1}
              width={0}
              height={0}
              sizes="100vw"
              style={{
                objectFit: "contain",
                width: "100%",
                height: "auto",
                borderRadius: 16,
              }}
              alt="testing agent responses against unsaved configuration changes with a confidence score breakdown"
              loading="lazy"
            />
            <Typography variant="caption" fontStyle={"italic"} color="text.secondary">
              Testing Responses and Confidence Scores Before Saving
            </Typography>
          </Box>
          <Box>
            <Image
              src={agentBuilderPreviewGeneratingArtifact}
              width={0}
              height={0}
              sizes="100vw"
              style={{
                objectFit: "contain",
                width: "100%",
                height: "auto",
                borderRadius: 16,
              }}
              alt="agent generating a structured csv artifact in real time during testing"
              loading="lazy"
            />
            <Typography variant="caption" fontStyle={"italic"} color="text.secondary">
              Generating and Streaming a Structured Artifact in Real Time
            </Typography>
          </Box>
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <Stack id="agent-execution" spacing={4}>
          <Box>
            <Image
              src={agentExecutionEmpty}
              width={0}
              height={0}
              sizes="100vw"
              style={{
                objectFit: "contain",
                width: "100%",
                height: "auto",
                borderRadius: 16,
              }}
              alt="empty execution view for starting a new conversation with a published agent"
              loading="lazy"
            />
            <Typography variant="caption" fontStyle={"italic"} color="text.secondary">
              Starting a New Conversation with a Published Agent
            </Typography>
          </Box>
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
                borderRadius: 16,
              }}
              alt="execution view for a published agent with conversation overview, confidence score, sources, and artifacts"
              loading="lazy"
            />
            <Typography variant="caption" fontStyle={"italic"} color="text.secondary">
              Conversation Overview with Confidence Score, Sources, and Artifacts
            </Typography>
          </Box>
          <Box>
            <Image
              src={agentExecutionConfidenceOverview}
              width={0}
              height={0}
              sizes="100vw"
              style={{
                objectFit: "contain",
                width: "100%",
                height: "auto",
                borderRadius: 16,
              }}
              alt="confidence score overview broken down across judgment and statistical modules"
              loading="lazy"
            />
            <Typography variant="caption" fontStyle={"italic"} color="text.secondary">
              Confidence Score Breakdown Across Judgment and Statistical Modules
            </Typography>
          </Box>
          <Box>
            <Image
              src={agentExecutionConfidenceReasoning}
              width={0}
              height={0}
              sizes="100vw"
              style={{
                objectFit: "contain",
                width: "100%",
                height: "auto",
                borderRadius: 16,
              }}
              alt="per-turn reasoning and analysis behind an individual confidence score module"
              loading="lazy"
            />
            <Typography variant="caption" fontStyle={"italic"} color="text.secondary">
              Per-Turn Reasoning Behind Each Confidence Score
            </Typography>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
}
