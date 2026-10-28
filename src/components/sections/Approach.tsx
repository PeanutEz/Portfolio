import { ArrowDownRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowDownRight";
import Reveal from "@/components/Reveal";
import { approach } from "@/data/portfolio";

export default function Approach() {
  return (
    <section
      className="section shell"
      id="approach"
      aria-labelledby="approach-heading"
    >
      <Reveal>
        <div className="section-heading">
          <div>
            <p className="section-kicker">
              <span className="section-number">04 /</span> HOW I LIKE TO WORK
            </p>
            <h2 id="approach-heading">
              Good systems start
              <br />
              with good questions<span className="accent">.</span>
            </h2>
          </div>
          <ArrowDownRightIcon
            className="approach-heading-arrow"
            size={48}
            weight="thin"
          />
        </div>
      </Reveal>
      <div className="approach-list">
        {approach.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.08}>
            <div className="approach-row">
              <span className="approach-number">0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
