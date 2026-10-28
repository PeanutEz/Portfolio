"use client";

import { useRef } from "react";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/csr/ArrowUpRight";
import { XIcon } from "@phosphor-icons/react/dist/csr/X";
import type { Project } from "@/data/portfolio";

export default function ProjectDetails({ project }: { project: Project }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  return (
    <>
      <button
        ref={trigger}
        className="project-open"
        aria-label={`Read concept: ${project.title}`}
        onClick={() => dialog.current?.showModal()}
      >
        <ArrowUpRightIcon size={21} />
      </button>
      <dialog
        ref={dialog}
        data-lenis-prevent
        className="project-dialog"
        aria-labelledby={`${project.id}-title`}
        onClose={() => trigger.current?.focus()}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className="dialog-content">
          <button
            className="dialog-close"
            aria-label="Close concept details"
            onClick={() => dialog.current?.close()}
          >
            <XIcon size={22} />
          </button>
          <p className="project-category">{project.category}</p>
          <h2 id={`${project.id}-title`}>{project.title}</h2>
          <p>{project.description}</p>
          <div className="dialog-stack">
            {project.stack.map((tech) => (
              <span className="skill-tag" key={tech}>
                {tech}
              </span>
            ))}
          </div>
          <h3>The question</h3>
          <p>{project.challenge}</p>
          <h3>The approach</h3>
          <p>{project.approach}</p>
          <h3>Things to explore</h3>
          <ul>
            {project.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
          <p className="dialog-note">
            An engineering concept, shared as a look at how I think. This is not
            a completed project or a performance claim.
          </p>
        </div>
      </dialog>
    </>
  );
}
