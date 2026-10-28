import { BracketsCurlyIcon } from "@phosphor-icons/react/dist/ssr/BracketsCurly";
import { DatabaseIcon } from "@phosphor-icons/react/dist/ssr/Database";
import { LightningIcon } from "@phosphor-icons/react/dist/ssr/Lightning";
import { StackIcon } from "@phosphor-icons/react/dist/ssr/Stack";

export default function ToolboxRibbon() {
  return (
    <div className="stack-ribbon shell" aria-label="Core technologies">
      <span className="ribbon-label">MY EVERYDAY TOOLKIT</span>
      <span className="stack-item">
        <span className="tech-monogram">TS</span>TypeScript
      </span>
      <span className="stack-item">
        <BracketsCurlyIcon size={22} />
        Node.js
      </span>
      <span className="stack-item">
        <DatabaseIcon size={22} />
        PostgreSQL
      </span>
      <span className="stack-item">
        <LightningIcon size={22} />
        Redis
      </span>
      <span className="stack-item">
        <StackIcon size={22} />
        Docker
      </span>
    </div>
  );
}
