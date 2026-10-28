"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/csr/ArrowRight";
import { DatabaseIcon } from "@phosphor-icons/react/dist/csr/Database";
import { HardDrivesIcon } from "@phosphor-icons/react/dist/csr/HardDrives";
import { PlayIcon } from "@phosphor-icons/react/dist/csr/Play";
import { SpinnerGapIcon } from "@phosphor-icons/react/dist/csr/SpinnerGap";

type ApiResponse = {
  name: string;
  role: string;
  focus: string[];
  loves: string;
};

export default function ApiTerminal() {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const controller = useRef<AbortController | null>(null);
  useEffect(() => () => controller.current?.abort(), []);

  async function sendRequest() {
    if (state === "loading") return;
    setState("loading");
    const request = new AbortController();
    controller.current = request;
    try {
      const result = await fetch("/api/hello", {
        signal: request.signal,
        cache: "no-store",
      });
      if (!result.ok) throw new Error("Request failed");
      setResponse(await result.json());
      setState("success");
    } catch {
      if (!request.signal.aborted) setState("error");
    }
  }

  return (
    <div className="hero-visual">
      <div className="visual-label">
        <span>UNDER THE HOOD</span>
        <span>luke.dev / hello</span>
      </div>
      <div className="terminal">
        <div className="terminal-header">
          <div className="window-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <span className="terminal-title">hello.http</span>
          <span className="terminal-tag">REST API</span>
        </div>
        <div className="terminal-body">
          <div className="terminal-request">
            <span className="method">GET</span>
            <span>/api/hello</span>
            <span className="code-comment">HTTP/1.1</span>
          </div>
          <div className="terminal-code" aria-label="Example JSON response">
            <div className="code-line">
              <span className="line-no">01</span>
              <span className="code-punctuation">{"{"}</span>
            </div>
            <div className="code-line">
              <span className="line-no">02</span>
              <span>
                &nbsp;&nbsp;<span className="code-key">&quot;name&quot;</span>:{" "}
                <span className="code-string">
                  &quot;{response?.name || "Luke (嘉乐)"}&quot;
                </span>
                ,
              </span>
            </div>
            <div className="code-line">
              <span className="line-no">03</span>
              <span>
                &nbsp;&nbsp;<span className="code-key">&quot;role&quot;</span>:{" "}
                <span className="code-string">
                  &quot;Backend Developer&quot;
                </span>
                ,
              </span>
            </div>
            <div className="code-line">
              <span className="line-no">04</span>
              <span>
                &nbsp;&nbsp;<span className="code-key">&quot;focus&quot;</span>:
                [
              </span>
            </div>
            <div className="code-line">
              <span className="line-no">05</span>
              <span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="code-string">&quot;thoughtful APIs&quot;</span>
                ,
              </span>
            </div>
            <div className="code-line">
              <span className="line-no">06</span>
              <span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="code-string">
                  &quot;efficient databases&quot;
                </span>
                ,
              </span>
            </div>
            <div className="code-line">
              <span className="line-no">07</span>
              <span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="code-string">
                  &quot;reliable systems&quot;
                </span>
              </span>
            </div>
            <div className="code-line">
              <span className="line-no">08</span>
              <span>&nbsp;&nbsp;],</span>
            </div>
            <div className="code-line">
              <span className="line-no">09</span>
              <span>
                &nbsp;&nbsp;<span className="code-key">&quot;loves&quot;</span>:{" "}
                <span className="code-string">
                  &quot;the details that matter&quot;
                </span>
              </span>
            </div>
            <div className="code-line">
              <span className="line-no">10</span>
              <span className="code-punctuation">{"}"}</span>
              <span className="terminal-caret" aria-hidden="true" />
            </div>
          </div>
        </div>
        <div className="terminal-footer">
          <span className={`request-status ${state}`} role="status">
            <span className="status-dot" />
            {state === "idle"
              ? "Ready when you are"
              : state === "loading"
                ? "Sending request…"
                : state === "success"
                  ? "200 OK · Response received"
                  : "Couldn’t connect. Try again."}
          </span>
          <button
            className="request-button"
            disabled={state === "loading"}
            onClick={sendRequest}
          >
            {state === "loading" ? (
              <SpinnerGapIcon className="spin" size={12} />
            ) : (
              <PlayIcon size={11} weight="fill" />
            )}
            {state === "success" ? "Run again" : "Send request"}
          </button>
        </div>
      </div>
      <div
        className="architecture"
        aria-label="Illustrative backend architecture"
      >
        <div className="architecture-node">
          <HardDrivesIcon size={19} />
          <span className="architecture-node-label">API layer</span>
          <span className="architecture-node-detail">Node.js / NestJS</span>
        </div>
        <ArrowRightIcon className="architecture-arrow" size={16} />
        <div className="architecture-node">
          <DatabaseIcon size={19} />
          <span className="architecture-node-label">Database</span>
          <span className="architecture-node-detail">PostgreSQL</span>
        </div>
        <ArrowRightIcon className="architecture-arrow" size={16} />
        <div className="architecture-node">
          <span className="redis-glyph" aria-hidden="true">
            ≋
          </span>
          <span className="architecture-node-label">Cache</span>
          <span className="architecture-node-detail">Redis</span>
        </div>
      </div>
      <div className="visual-caption">
        <span className="dot" />
        Good things happen behind the scenes.
      </div>
    </div>
  );
}
