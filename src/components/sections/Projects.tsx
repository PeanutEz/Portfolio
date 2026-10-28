import Reveal from "@/components/Reveal";
import { projects } from "@/data/portfolio";
import ProjectArt from "@/components/ProjectArt";
import ProjectDetails from "@/components/ProjectDetails";

export default function Projects() {
  return (
    <section
      className="section shell"
      id="projects"
      aria-labelledby="projects-heading"
    >
      <Reveal>
        <div className="section-heading">
          <div>
            <p className="section-kicker">
              <span className="section-number">03 /</span> IDEAS WORTH EXPLORING
            </p>
            <h2 id="projects-heading">
              Under the surface<span className="accent">.</span>
            </h2>
          </div>
          <p className="section-intro">
            A few engineering concepts that reflect the problems I enjoy
            thinking through.
          </p>
        </div>
      </Reveal>
      <div className="project-grid">
        {projects.map((project, index) => (
          <Reveal
            key={project.id}
            className="project-card"
            delay={index * 0.08}
          >
            <ProjectArt index={index} />
            <div className="project-meta">
              <p className="project-category">{project.category}</p>
              <div className="project-title-row">
                <h3 className="project-title">{project.title}</h3>
                <ProjectDetails project={project} />
              </div>
              <p className="project-description">{project.description}</p>
              <div className="project-stack">
                {project.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="projects-note">
        <span className="dot" />
        Concept studies — a window into my thinking, not completed client
        projects.
      </p>
    </section>
  );
}
