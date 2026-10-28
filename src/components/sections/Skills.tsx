import Reveal from "@/components/Reveal";
import { skillGroups } from "@/data/portfolio";

export default function Skills() {
  return (
    <section
      className="section shell"
      id="stack"
      aria-labelledby="stack-heading"
    >
      <Reveal>
        <div className="section-heading">
          <div>
            <p className="section-kicker">
              <span className="section-number">02 /</span> THE TOOLS I REACH FOR
            </p>
            <h2 id="stack-heading">
              A practical stack<span className="accent">.</span>
            </h2>
          </div>
          <p className="section-intro">
            Different tools, the same goal: build something that works well and
            is easy to work with.
          </p>
        </div>
      </Reveal>
      <div className="skills-grid">
        {skillGroups.map((group, index) => (
          <Reveal key={group.name} delay={index * 0.1} className="skill-group">
            <span className="skill-group-index">0{index + 1}</span>
            <h3>{group.name}</h3>
            <p>{group.description}</p>
            <div className="skill-tags">
              {group.skills.map((skill) => (
                <span className="skill-tag" key={skill}>
                  <span className="skill-symbol" aria-hidden="true">
                    {skill === "TypeScript"
                      ? "ts"
                      : skill === "C#"
                        ? "C#"
                        : skill === "SQL"
                          ? "sq"
                          : skill.slice(0, 2).toLowerCase()}
                  </span>
                  {skill}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
