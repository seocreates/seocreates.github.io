import * as React from "react";
import {
  Bullets,
  CaseStudyLayout,
  CaseStudySection,
  Figure,
  P,
  Point,
  Section,
  SubSection,
} from "./CaseStudy";
import agentCanvasWorkflow from "images/portfolio/ai-platform/agent-canvas-workflow.png";
import agentCanvasInputVariables from "images/portfolio/ai-platform/agent-canvas-input-variables.png";
import agentFormConfiguration from "images/portfolio/ai-platform/agent-form-configuration.png";
import agentBuilder1 from "images/portfolio/ai-platform/agent-builder-1.png";
import agentBuilderPreviewChat1 from "images/portfolio/ai-platform/agent-builder-preview-chat-1.png";
import agentExecutionConfidenceOverview from "images/portfolio/ai-platform/agent-execution-confidence-overview.png";
import agentExecutionConfidenceReasoning from "images/portfolio/ai-platform/agent-execution-confidence-reasoning.png";

const SECTIONS: CaseStudySection[] = [
  { id: "agent-overview", label: "Overview" },
  { id: "agent-role", label: "Role" },
  { id: "agent-canvas", label: "Canvas" },
  { id: "agent-form", label: "Form" },
  { id: "agent-builder", label: "Builder" },
  { id: "agent-evaluation", label: "Evaluation" },
  { id: "agent-outcome", label: "Outcome" },
];

export default function AgentPlatform() {
  return (
    <CaseStudyLayout sections={SECTIONS}>
      <Section
        id="agent-overview"
        index={1}
        eyebrow="Overview"
        title="Turning an API endpoint into an agent builder"
        rule={false}
      >
        <P>
          An AI orchestration platform that enables B2B customers to connect their own
          data, then build and configure AI agents to automate business workflows.
        </P>
        <P>
          When I joined, there was no interface. The capability lived behind API endpoints
          and a Notion document, so configuring an agent meant knowing how the underlying
          system was built. Over the following year, the product moved from a workflow
          canvas, to a linear form, to a builder where configuration and a live test
          conversation share one viewport.
        </P>
        <P>
          The initial audience was product managers and operations owners with technical
          fluency who needed a GUI over the API. Their use cases included:
        </P>
        <Bullets
          items={[
            "Consolidating company documents into a single source for agents to reference.",
            "Analyzing agreement contracts and surfacing relevant clauses, terms, or risks.",
            "Connecting and extracting data from technical data sheets.",
          ]}
        />
      </Section>

      <Section
        id="agent-role"
        index={2}
        eyebrow="My Role"
        title="The only designer, and the person who shipped the front-end"
      >
        <P>
          With no separate front-end team to hand designs to, every decision had to
          survive its own implementation.
        </P>
        <P>
          I owned the loop end to end: reading API payloads and agent execution traces to
          understand what the system actually did, analyzing LogRocket sessions to surface
          usability friction, designing in Figma, and building production UI in React,
          TypeScript, Tailwind CSS, and Shadcn UI alongside a full-stack engineer. We
          shipped improvements weekly.
        </P>
        <P dim>
          Outside my scope: model hosting, the agent orchestration runtime, and back-end
          services.
        </P>
      </Section>

      <Section
        id="agent-canvas"
        index={3}
        eyebrow="First Iteration"
        title="A canvas that put every parameter on screen"
      >
        <P>
          The concept existed before I joined: an AI researcher had described a workflow
          canvas, where nodes are steps in an agent and connections define what
          information passes between them. I translated that written proposal into a
          tangible product the team could walk through, find gaps in the logic, and decide
          how it should actually behave.
        </P>

        <Figure
          src={agentCanvasWorkflow}
          alt="workflow canvas with a start node connected to an ai agent node and its configuration panel"
          caption="Workflow canvas with an agent node and its configuration panel"
        />

        <SubSection title="The cost of the canvas">
          <P>
            I kept augmenting the canvas with guidance: an input variable picker to
            prevent mistakes when free-typing prompts, and saveable templates because
            users kept rebuilding the same prompt and model pairings.
          </P>

          <Figure
            src={agentCanvasInputVariables}
            alt="canvas with an input variable picker and response schema node layered on top of the agent configuration"
            caption="Input variable picker and response schema layered onto the canvas"
          />

          <P>
            But each improvement introduced another concept. Even technical users spent
            their time learning the system rather than doing their work, and most of their
            workflows were simple, single-step agents. So I stopped asking how to improve
            the canvas and started asking whether the user needed to see it at all.
          </P>
        </SubSection>
      </Section>

      <Section
        id="agent-form"
        index={4}
        eyebrow="Second Iteration"
        title="Designing for intent, not technical fluency"
      >
        <P>
          The canvas answered how the agent was wired underneath. What users needed to
          know was whether their configuration produced the behavior they intended, since
          a small configuration change can have a very large impact on how an agent
          responds.
        </P>
        <P>
          I designed for someone who knows what they want the agent to do. The canvas
          became a linear form: one agent, one screen, with a summary on the left and
          configuration fields on the right.
        </P>

        <Figure
          src={agentFormConfiguration}
          alt="linear form with an agent summary on the left and configuration fields on the right"
          caption="One agent, one screen: a linear form without connections"
        />

        <P>
          Removing the canvas did not remove all of the complexity. Fields still carried
          system identifiers and type badges, and configuration was still an instruction
          with no observable result.
        </P>
      </Section>

      <Section
        id="agent-builder"
        index={5}
        eyebrow="What Shipped"
        title="Change the instruction, observe the behavior"
      >
        <P>
          The shipped builder splits the page: a live test conversation on the left and a
          form-based configuration, organized by feature, on the right. Every change can
          be tested against the unsaved draft before it reaches a customer conversation.
        </P>

        <Figure
          src={agentBuilder1}
          alt="agent builder with test chat and configuration in one viewport"
          caption="Test chat and configuration in one viewport"
        />

        <Point label="Removed the user prompt field">
          The user prompt is the end user&apos;s message. Making it a configuration field
          asked builders to author a placeholder for context someone else would supply
          later.
        </Point>
        <Point label="Testing is iterative">
          Test conversations keep a history, so users can change the configuration and
          compare against the previous session.
        </Point>
      </Section>

      <Section
        id="agent-evaluation"
        index={6}
        eyebrow="Evaluation"
        title="A score is a verdict. Reasoning is an argument."
      >
        <P>
          Every test conversation carries a confidence score from an AI judge, turning the
          builder into a continuous feedback loop. Low scores in modules like correctness
          or faithfulness tell users something the configuration alone could not.
        </P>

        <Figure
          src={agentBuilderPreviewChat1}
          alt="testing agent responses against unsaved configuration changes with a confidence score breakdown"
          caption="Confidence scores on test conversations, before publishing"
        />

        <P>
          The existing API returned only a number, and the initial plan was to display it
          as-is. I pushed back: a model is scoring a model, and a 6.7 out of 10 without an
          explanation creates false confidence. Shipping the number on its own was worse
          than shipping nothing at all.
        </P>
        <P>
          We landed on granular scores instead of aggregates, with the analysis behind
          each one. The reasoning is also AI-generated, but it lets someone with domain
          knowledge read the argument and reach their own conclusion.
        </P>

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
      </Section>

      <Section
        id="agent-outcome"
        index={7}
        eyebrow="Outcome"
        title="Show the result of a decision to the person making it"
      >
        <Point label="Complexity came off the screen">
          Users describe what the agent should do, and the platform decides how it runs.
          Building an agent no longer requires knowing how the system is wired.
        </Point>
        <Point label="Every change is observable before publishing">
          Configuration and a live conversation share one viewport, so the impact of an
          edit is visible the moment it is made.
        </Point>
        <Point label="Scores users can verify">
          Every confidence score opens to the reasoning behind it, so users evaluate the
          argument instead of trusting a number.
        </Point>

        <SubSection title="Looking back">
          <P>
            The canvas wasn&apos;t wrong. It was early. A canvas can express what a form
            can&apos;t, such as branches, handoffs, and multi-step workflows, but it
            shouldn&apos;t be the entry point for every user. For someone configuring a
            single agent, the first need is a direct path from configuration to knowing
            whether it works.
          </P>
          <P>
            That became a design principle for me: don&apos;t make users understand the
            complexity of the system before they can accomplish a task. Start with the
            outcome they care about, and introduce complexity when it becomes useful.
          </P>
        </SubSection>
      </Section>
    </CaseStudyLayout>
  );
}
