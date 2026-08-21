import * as React from "react";
import {
  CaseStudyLayout,
  CaseStudySection,
  Figure,
  P,
  Point,
  Section,
} from "./CaseStudy";
import agentBuilder1 from "images/portfolio/ai-platform/agent-builder-1.png";
import agentBuilderModel1 from "images/portfolio/ai-platform/agent-builder-model-1.png";
import agentBuilderPreviewChat1 from "images/portfolio/ai-platform/agent-builder-preview-chat-1.png";
import agentBuilderPreviewGeneratingArtifact from "images/portfolio/ai-platform/agent-builder-preview-generating-artifact.png";
import agentExecutionEmpty from "images/portfolio/ai-platform/agent-execution-empty.png";
import agentExecution1 from "images/portfolio/ai-platform/agent-execution-1.png";
import agentExecutionConfidenceOverview from "images/portfolio/ai-platform/agent-execution-confidence-overview.png";
import agentExecutionConfidenceReasoning from "images/portfolio/ai-platform/agent-execution-confidence-reasoning.png";

const SECTIONS: CaseStudySection[] = [
  { id: "agent-overview", label: "Overview" },
  { id: "agent-challenge", label: "Challenge" },
  { id: "agent-role", label: "Role" },
  { id: "agent-builder", label: "Builder" },
  { id: "agent-execution", label: "Execution" },
];

export default function AgentPlatform() {
  return (
    <CaseStudyLayout sections={SECTIONS}>
      <Section
        id="agent-overview"
        index={1}
        eyebrow="Overview"
        title="An orchestration platform for agents in production"
        rule={false}
      >
        <P>
          An AI orchestration platform: customers connect their own data, build agents
          on top of it, and run those agents in production with confidence.
        </P>
      </Section>

      <Section
        id="agent-challenge"
        index={2}
        eyebrow="The Challenge"
        title="The smallest surface with the largest blast radius"
      >
        <P>
          An agent&apos;s configuration is the smallest, highest-consequence surface in
          the product: one field decides what an agent knows, what it&apos;s allowed to
          do, and how it behaves for every conversation downstream.
        </P>
        <P>
          So we put the test chat and the configuration in one viewport, permanently,
          and made every edit provable before it ships.
        </P>
      </Section>

      <Section
        id="agent-role"
        index={3}
        eyebrow="My Role"
        title="Product designer, discovery through production"
      >
        <P>
          Led end-to-end product design for the platform, owning the experience from
          discovery through production across agent configuration, knowledge base
          management, tool integration, and response presentation.
        </P>
        <P>
          Operated in a fast-paced startup environment, shipping improvements weekly.
          Analyzed user sessions in LogRocket to surface usability issues and navigation
          friction, then translated those findings into prioritized design work.
        </P>
        <P>
          Partnered closely with back-end engineers to turn product strategy into
          shipped experiences, working directly in React, TypeScript, Tailwind CSS, and
          Shadcn UI.
        </P>
      </Section>

      <Section
        id="agent-builder"
        index={4}
        eyebrow="Agent Builder"
        title="Configure on the left, prove it on the right"
      >
        <P>
          Every configuration change can be tested against the unsaved state before it
          reaches a single customer conversation — the model choice, the knowledge it
          draws on, and the shape of what it returns.
        </P>

        <Figure
          src={agentBuilder1}
          alt="agent builder with test chat and configuration in one viewport"
          caption="Test chat and configuration in one viewport"
        />
        <Figure
          src={agentBuilderModel1}
          alt="choosing a primary model with capabilities and pricing visible in the picker"
          caption="Choosing a primary model with capabilities and pricing visible"
        />
        <Figure
          src={agentBuilderPreviewChat1}
          alt="testing agent responses against unsaved configuration changes with a confidence score breakdown"
          caption="Testing responses and confidence scores before saving"
        />
        <Figure
          src={agentBuilderPreviewGeneratingArtifact}
          alt="agent generating a structured csv artifact in real time during testing"
          caption="Generating and streaming a structured artifact in real time"
        />
      </Section>

      <Section
        id="agent-execution"
        index={5}
        eyebrow="Execution"
        title="Confidence you can open up and inspect"
      >
        <P>
          Once an agent is published, every conversation carries its own evidence: the
          sources it drew on, the artifacts it produced, and a confidence score that can
          be opened down to the reasoning behind each module.
        </P>

        <Figure
          src={agentExecutionEmpty}
          alt="empty execution view for starting a new conversation with a published agent"
          caption="Starting a new conversation with a published agent"
        />
        <Figure
          src={agentExecution1}
          alt="execution view for a published agent with conversation overview, confidence score, sources, and artifacts"
          caption="Conversation overview with confidence score, sources, and artifacts"
        />
        <Figure
          src={agentExecutionConfidenceOverview}
          alt="confidence score overview broken down across judgment and statistical modules"
          caption="Confidence score breakdown across judgment and statistical modules"
        />
        <Figure
          src={agentExecutionConfidenceReasoning}
          alt="per-turn reasoning and analysis behind an individual confidence score module"
          caption="Per-turn reasoning behind each confidence score"
        />

        <Point label="More coming soon">
          This case study is still being written up as the platform ships.
        </Point>
      </Section>
    </CaseStudyLayout>
  );
}
