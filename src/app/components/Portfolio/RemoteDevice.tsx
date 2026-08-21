import * as React from "react";
import {
  CaseStudyLayout,
  CaseStudySection,
  Figure,
  Note,
  P,
  Point,
  Section,
} from "./CaseStudy";
import remoteDeviceInteraction from "images/portfolio/remote-device-interaction.png";
import remoteDeviceInteractionShell from "images/portfolio/remote-device-interaction-shell.png";

const SECTIONS: CaseStudySection[] = [
  { id: "remote-overview", label: "Overview" },
  { id: "remote-role", label: "Role" },
  { id: "remote-outcome", label: "Outcome" },
  { id: "remote-platform", label: "Platform" },
];

export default function RemoteDevice() {
  return (
    <CaseStudyLayout sections={SECTIONS}>
      <Section
        id="remote-overview"
        index={1}
        eyebrow="Overview"
        title="Real devices, reachable from anywhere"
        rule={false}
      >
        <Note>
          Client: internal product developers. Sensitive materials have been redacted
          for Non-Disclosure Agreement purposes.
        </Note>

        <P>
          Our service-product developers require a holistic platform to test their
          products on different operating systems and device variants prior to
          deployment. As service products increase in complexity and market devices
          continue to release OS updates, it is crucial to maintain a viable set of
          production-targeted devices, monitor and optimize performance, and remediate
          code vulnerabilities.
        </P>
        <P>
          The remote device platform serves our internal product developers and quality
          assurance testers, letting them build, debug, and continuously test their
          products by remotely accessing real devices.
        </P>
      </Section>

      <Section
        id="remote-role"
        index={2}
        eyebrow="My Role"
        title="Designer and primary front-end developer"
      >
        <P>
          Collaborated with internal developers and managers to gather feature requests
          and technical requirements, ensuring the platform supports all product teams
          and operating systems.
        </P>
        <P>
          Communicated the product vision to all stakeholders to ensure the platform is
          sustainable for continuous deployment in an air-gapped environment.
        </P>
        <P>
          Synthesized user research to prioritize feature requests for our MVP and
          designed high-fidelity prototypes to communicate with the team.
        </P>
        <P>
          Primarily designed, developed, and maintained the front-end using Next.js,
          React TS, and gRPC-Web, and dockerized the platform to run on a cloud
          provider.
        </P>
      </Section>

      <Section
        id="remote-outcome"
        index={3}
        eyebrow="Outcome"
        title="Shorter cycles, fewer configuration steps"
      >
        <Point label="Support product development cycles">
          A holistic platform connecting real, interactable devices to developers so
          they can run automated tests, generate reports, and debug products.
        </Point>
        <Point label="Improve speed of product delivery">
          Reduce the steps to configure products for deployment by simulating services
          across real device variants.
        </Point>
        <Point label="Efficiency in user experience">
          Connect device variants according to an OS-focused developer profile.
        </Point>
      </Section>

      <Section
        id="remote-platform"
        index={4}
        eyebrow="The Platform"
        title="Device, logs, and shell in one workspace"
      >
        <Figure
          src={remoteDeviceInteraction}
          alt="remote device interaction page"
          caption="Remote device platform"
        />
        <Figure
          src={remoteDeviceInteractionShell}
          alt="remote device interaction shell and logs"
          caption="Resizable device log panel and exec shell"
        />
      </Section>
    </CaseStudyLayout>
  );
}
