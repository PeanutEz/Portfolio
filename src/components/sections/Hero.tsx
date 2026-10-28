import { ArrowDownIcon } from "@phosphor-icons/react/dist/ssr/ArrowDown";
import { ArrowDownRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowDownRight";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import Reveal from "@/components/Reveal";
import ApiTerminal from "@/components/ApiTerminal";
import { profile } from "@/data/portfolio";

export default function Hero() {
  return (
    <section id="home" aria-labelledby="hero-heading">
      <div className="hero shell">
        <Reveal className="hero-copy">
          <p className="eyebrow">THE PERSON BEHIND THE ENDPOINT</p>
          <h1 id="hero-heading">
            {profile.name}
            <span className="accent">.</span>
            <span className="chinese-name" lang="zh">
              {profile.chineseName}
            </span>
          </h1>
          <h2>
            Behind the interface.
            <br />
            <span className="accent">Beyond the ordinary.</span>
          </h2>
          <p className="hero-description">
            I’m a backend developer who enjoys building APIs, working with
            databases, and making systems fast and reliable.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#projects">
              Explore my thinking <ArrowDownRightIcon size={18} />
            </a>
            <a className="button secondary" href="#about">
              A little about me <ArrowUpRightIcon size={17} />
            </a>
          </div>
          <p className="hero-note">
            <span className="dot" />
            BUILT WITH INTENTION. ONE DETAIL AT A TIME.
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <ApiTerminal />
        </Reveal>
      </div>
      <div className="hero-bottom shell">
        <a className="scroll-cue" href="#about">
          <span className="scroll-icon">
            <ArrowDownIcon size={15} />
          </span>
          SCROLL TO DISCOVER
        </a>
        <span className="hero-signature">
          Less noise. More purpose. <span>嘉乐</span>
        </span>
        <span className="hero-page-number">PORTFOLIO — 2026</span>
      </div>
    </section>
  );
}
