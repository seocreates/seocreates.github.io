import * as React from "react";
import {
  CaseStudyLayout,
  CaseStudySection,
  Figure,
  FigureRow,
  Note,
  P,
  Point,
  Section,
  SubSection,
} from "./CaseStudy";
import dashboardFinal from "images/portfolio/dashboard-final-data.png";
import dashboardFinalEditable from "images/portfolio/dashboard-editable-final.png";
import dashboardMasonary from "images/portfolio/dashboard-original-masonary.png";
import dashboardMasonary1728 from "images/portfolio/dashboard-original-masonary-1728.png";
import dashboardFirstPrototype from "images/portfolio/dashboard-first-proposed.png";
import dashboardFirstPrototype1728 from "images/portfolio/dashboard-first-proposed-responsive-1728.png";
import dashboardFirstPrototypeReorder from "images/portfolio/dashboard-layout-reorder.png";
import wireframeDashboard from "images/portfolio/wireframe-dashboard-numbered.png";
import wireframeDashboard1728 from "images/portfolio/wireframe-dashboard-numbered-1728.png";
import wireframeComponent from "images/portfolio/wireframe-dashboard-components.png";
import wireframeComponent1728 from "images/portfolio/wireframe-dashboard-components-1728.png";

const SECTIONS: CaseStudySection[] = [
  { id: "dashboard-overview", label: "Overview" },
  { id: "dashboard-problem", label: "Problem" },
  { id: "dashboard-iteration", label: "Iteration" },
  { id: "dashboard-solution", label: "Solution" },
  { id: "dashboard-outcome", label: "Outcome" },
];

export default function Dashboard() {
  return (
    <CaseStudyLayout sections={SECTIONS}>
      <Section
        id="dashboard-overview"
        index={1}
        eyebrow="Overview"
        title="One dashboard, many service products"
        rule={false}
      >
        <Note>
          Illustrations are recreated from the original design as visual aids, and
          sensitive materials have been redacted for Non-Disclosure Agreement purposes.
        </Note>

        <P>
          As the core product expands its suite of service products, the complexity of
          provisioning each product&apos;s capabilities becomes increasingly
          unsustainable.
        </P>
        <P>
          The core product laid the front-end foundation and continues to supply
          development tools shared throughout all service products. With shared code,
          the service-product teams are responsible for developing supplemental
          components that provide direct access to their capabilities. Without
          standardization, this implementation process inevitably creates disjointed
          components that primarily affect the long-term user experience in an
          operational environment.
        </P>
      </Section>

      <Section
        id="dashboard-problem"
        index={2}
        eyebrow="The Problem"
        title="A layout that moved the content out from under you"
      >
        <P>
          The original core-product dashboard was designed in a masonry layout (commonly
          referred to as the Pinterest style layout) to accommodate the full content
          that the core product and service products render asynchronously. The problem
          was easily identifiable: active items would shift to the shortest column, and
          aggregated content would reposition according to streaming data.
        </P>

        <FigureRow>
          <Figure
            src={dashboardMasonary}
            alt="original dashboard layout"
            caption="Dashboard in masonry layout"
          />
          <Figure
            src={dashboardMasonary1728}
            alt="original dashboard layout resize"
            caption="Reposition on resized viewport with side panel"
          />
        </FigureRow>
      </Section>

      <Section
        id="dashboard-iteration"
        index={3}
        eyebrow="First Iteration"
        title="Fixed height solved one problem and reopened another"
      >
        <P>
          The first proof of concept aimed to facilitate preliminary discussions around
          a proposed solution: a fixed height with custom reordering. A modular grid
          layout arranges items with consistent columns and rows to maintain a uniform
          aesthetic across all dashboards reflecting different services. The new design
          would let users easily scan items and remember the order and location of
          high-interest content, while custom reordering provided the option to
          prioritize items according to individual specifications.
        </P>
        <P>
          The main disadvantage is dynamic content length. With a fixed height, sparse
          content leaves wasted white space, while content that exceeds the fixed height
          gets truncated — obscuring vital data and potentially impeding operational
          performance. This first iteration reintroduced concerns that the original
          masonry layout had already solved.
        </P>

        <FigureRow>
          <Figure
            src={dashboardFirstPrototype}
            alt="first dashboard prototype"
            caption="Default dashboard in modular grid layout"
          />
          <Figure
            src={dashboardFirstPrototype1728}
            alt="first dashboard prototype resized"
            caption="Grid wrapping on resized viewport with side panel"
          />
          <Figure
            src={dashboardFirstPrototypeReorder}
            alt="first dashboard prototype reordered"
            caption="Custom content reorder"
          />
        </FigureRow>
      </Section>

      <Section
        id="dashboard-solution"
        index={4}
        eyebrow="The Solution"
        title="Flexibility inside controlled dimensions"
      >
        <P>
          To address dynamic content length in addition to the masonry layout problem,
          the design needed a certain flexibility with controlled dimensions.
        </P>
        <P>
          The final dashboard design uses a modular grid layout that consists of 2 by 2
          arrays. Each array holds up to four small components, two medium components,
          or one large component. The size variations accommodate all data content and
          provide dashboard customization to adjust high-interest content in accordance
          with operational needs.
        </P>

        <FigureRow>
          <Figure src={wireframeDashboard} alt="final wireframe" />
          <Figure src={wireframeDashboard1728} alt="final wireframe resized" />
        </FigureRow>

        <SubSection title="How the array behaves">
          <P>
            The 2 by 2 arrays are flexible containers in width and consistent in height.
            The grid layout and the items within each array flow from left to right and
            top to bottom. Designed around the common screen resolution of 1920 x 1080,
            the dashboard viewport maintains full visibility of two rows and a glimpse
            of the row underneath to indicate further content.
          </P>

          <FigureRow>
            <Figure
              src={wireframeComponent1728}
              alt="final wireframe components resized"
            />
            <Figure src={wireframeComponent} alt="final wireframe components" />
          </FigureRow>
        </SubSection>
      </Section>

      <Section
        id="dashboard-outcome"
        index={5}
        eyebrow="Outcome"
        title="A layout that holds still and scales across teams"
      >
        <Point label="Establish a visual hierarchy with a custom dashboard">
          The size variations establish a visual hierarchy and recallable content
          placement. The end user can customize and prioritize content to adapt to
          operational needs, and custom dashboards can be saved as templates and reused
          on instances of a service product.
        </Point>
        <Point label="Consistency in user experience">
          The 2 by 2 array grid layout promotes uniformity across different
          service-product dashboards to help users recollect the location of content in
          a linear order and navigate aggregated content.
        </Point>
        <Point label="Unified components for product developers">
          The structured layout helps not only end users but service-product developers,
          who build dashboard components using controlled size-variation templates
          provided by the core-product team.
        </Point>
        <Point label="Improve content readability and operational efficiency">
          The grid layout enhances readability, making it easier to scan aligned
          content.
        </Point>

        <Figure
          src={dashboardFinal}
          alt="core dashboard in 2 by 2 array grid layout"
          caption="Core dashboard in 2 by 2 array grid layout"
        />
        <Figure
          src={dashboardFinalEditable}
          alt="customizing the dashboard layout"
          caption="Customizing the dashboard"
        />
      </Section>
    </CaseStudyLayout>
  );
}
