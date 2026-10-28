import { BracketsCurlyIcon } from "@phosphor-icons/react/dist/ssr/BracketsCurly";
import { DatabaseIcon } from "@phosphor-icons/react/dist/ssr/Database";
import { GitBranchIcon } from "@phosphor-icons/react/dist/ssr/GitBranch";
import { LightningIcon } from "@phosphor-icons/react/dist/ssr/Lightning";
import { TerminalWindowIcon } from "@phosphor-icons/react/dist/ssr/TerminalWindow";
import Reveal from "@/components/Reveal";
import { capabilities } from "@/data/portfolio";

const capabilityIcons = {
  api: BracketsCurlyIcon,
  database: DatabaseIcon,
  cache: LightningIcon,
  tools: TerminalWindowIcon,
};

export default function About() {
  return (
    <section
      className="section shell"
      id="about"
      aria-labelledby="about-heading"
    >
      <Reveal>
        <div className="section-heading">
          <div>
            <p className="section-kicker">
              <span className="section-number">01 /</span> A LITTLE CONTEXT
            </p>
            <h2 id="about-heading">
              Hello, I’m Luke<span className="accent">.</span>
            </h2>
          </div>
          <span className="section-aside">
            BACKEND DEVELOPER
            <br />
            CURIOUS BY DEFAULT
          </span>
        </div>
      </Reveal>
      <div className="about-grid">
        <Reveal>
          <div className="about-aside">
            <span className="about-glyph" aria-hidden="true">
              {"{ }"}
            </span>
            <p>
              The part you don’t see.
              <br />
              <span className="accent">The difference you feel.</span>
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="about-copy">
          <p>
            I like the work that happens behind the screen. The API that makes
            sense. The query that stops being slow. The system that simply keeps
            working.
          </p>
          <p className="about-secondary">
            My focus is backend development with Node.js, TypeScript, and C#. I
            work with relational databases, use Redis where it helps, and care
            about the details between writing code and running it.
          </p>
          <div className="about-principles">
            <span>
              <GitBranchIcon size={17} />
              Clear structure
            </span>
            <span>
              <DatabaseIcon size={17} />
              Thoughtful data
            </span>
            <span>
              <LightningIcon size={17} />
              Practical performance
            </span>
          </div>
        </Reveal>
      </div>
      <div className="capabilities-grid">
        {capabilities.map((capability, index) => {
          const Icon = capabilityIcons[capability.icon];

          return (
            <Reveal key={capability.number} delay={index * 0.06}>
              <article className="capability">
                <Icon className="capability-icon" size={27} weight="regular" />
                <div>
                  <span className="capability-number">{capability.number}</span>
                  <h3>{capability.title}</h3>
                  <p>{capability.description}</p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
