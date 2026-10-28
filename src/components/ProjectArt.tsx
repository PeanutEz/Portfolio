import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { BracketsCurlyIcon } from "@phosphor-icons/react/dist/ssr/BracketsCurly";
import { DatabaseIcon } from "@phosphor-icons/react/dist/ssr/Database";
import { LightningIcon } from "@phosphor-icons/react/dist/ssr/Lightning";

export default function ProjectArt({ index }: { index: number }) {
  if (index === 0)
    return (
      <div className="project-art art-api" aria-hidden="true">
        <div className="art-api-window">
          <div className="art-window-title">
            <span className="dot" />
            request.ts <span>01</span>
          </div>
          <pre>
            <span className="code-comment">
              {"// A clear contract. A useful response."}
            </span>
            {"\n\n"}
            <span className="code-key">@Controller</span>(
            <span className="code-string">&apos;api&apos;</span>){"\n"}
            <span className="code-key">export class</span> AppController {"{"}
            {"\n"}&nbsp;&nbsp;<span className="code-key">@Get</span>(
            <span className="code-string">&apos;hello&apos;</span>){"\n"}
            &nbsp;&nbsp;hello() {"{"} <span className="code-key">return</span>{" "}
            {"{"} <span className="code-string">hello: &apos;world&apos;</span>{" "}
            {"}"}; {"}"}
            {"\n"}
            {"}"}
          </pre>
          <div className="art-api-response">
            <span>200 OK</span>
            <span>application/json</span>
            <ArrowRightIcon size={14} />
          </div>
        </div>
        <span className="art-caption">01 / THE INTERFACE</span>
      </div>
    );
  if (index === 1)
    return (
      <div className="project-art art-query" aria-hidden="true">
        <div className="query-window">
          <div className="art-window-title">
            <DatabaseIcon size={16} />
            query.explain <span>02</span>
          </div>
          <pre>
            <span className="code-key">EXPLAIN ANALYZE</span>
            {"\n"}
            <span className="code-key">SELECT</span> *{" "}
            <span className="code-key">FROM</span> possibilities{"\n"}
            <span className="code-key">WHERE</span> details ={" "}
            <span className="code-string">&apos;matter&apos;</span>;
          </pre>
          <div className="query-plan">
            <div>
              <span>Query plan</span>
              <span>INDEX SCAN</span>
            </div>
            <i />
            <i />
            <i />
          </div>
        </div>
        <span className="art-caption">02 / THE FOUNDATION</span>
      </div>
    );
  return (
    <div className="project-art art-cache" aria-hidden="true">
      <div className="cache-flow">
        <div className="cache-block">
          <BracketsCurlyIcon size={27} />
          <span>Request</span>
        </div>
        <span className="flow-line" />
        <div className="cache-block cache-active">
          <LightningIcon size={29} />
          <span>Redis</span>
        </div>
        <span className="flow-line" />
        <div className="cache-block">
          <DatabaseIcon size={27} />
          <span>Database</span>
        </div>
      </div>
      <div className="cache-annotation">
        <span className="dot" />A shorter path to the same answer.
      </div>
      <span className="art-caption">03 / THE SHORTCUT</span>
    </div>
  );
}
