import Reveal from "@/components/Reveal";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { EnvelopeSimpleIcon } from "@phosphor-icons/react/dist/ssr/EnvelopeSimple";
import { GithubLogoIcon } from "@phosphor-icons/react/dist/ssr/GithubLogo";
import { LinkedinLogoIcon } from "@phosphor-icons/react/dist/ssr/LinkedinLogo";
import { getContact } from "@/lib/contact";

export default function Contact() {
  const { email, github, linkedin } = getContact();
  return (
    <section
      className="contact-section shell"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <Reveal>
        <p className="section-kicker">
          <span className="section-number">05 /</span> THE NEXT CONVERSATION
        </p>
        <h2 className="contact-heading" id="contact-heading">
          Have something
          <br />
          in mind<span className="accent">?</span>{" "}
          <ArrowUpRightIcon size={58} weight="light" />
        </h2>
        <div className="contact-bottom">
          <p>
            Good things often start with a simple hello.
            <br />
            Let’s talk APIs, ideas, and what comes next.
          </p>
          <div className="contact-links">
            {email ? (
              <a className="button primary" href={`mailto:${email}`}>
                <EnvelopeSimpleIcon size={18} />
                {email} <ArrowUpRightIcon size={17} />
              </a>
            ) : (
              <span className="contact-placeholder">
                <EnvelopeSimpleIcon size={19} />
                Contact details coming soon.
              </span>
            )}
            {github && (
              <a
                className="social-link"
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Luke on GitHub"
              >
                <GithubLogoIcon size={23} />
              </a>
            )}
            {linkedin && (
              <a
                className="social-link"
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Luke on LinkedIn"
              >
                <LinkedinLogoIcon size={23} />
              </a>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
