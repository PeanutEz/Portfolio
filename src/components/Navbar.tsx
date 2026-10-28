"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/csr/ArrowUpRight";
import { CodeIcon } from "@phosphor-icons/react/dist/csr/Code";
import { ListIcon } from "@phosphor-icons/react/dist/csr/List";
import { XIcon } from "@phosphor-icons/react/dist/csr/X";

const links = [
  { href: "#about", label: "About", index: "01" },
  { href: "#stack", label: "Stack", index: "02" },
  { href: "#projects", label: "Explorations", index: "03" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
      },
      { rootMargin: "-15% 0px -55% 0px", threshold: 0 },
    );
    for (const link of links) {
      const section = document.querySelector(link.href);
      if (section) observer.observe(section);
    }
    const onEscape = (event: KeyboardEvent) => {
      if (
        event.key === "Escape" &&
        toggle.current?.getAttribute("aria-expanded") === "true"
      ) {
        setOpen(false);
        toggle.current.focus();
      }
    };
    window.addEventListener("keydown", onEscape);
    return () => {
      observer.disconnect();
      window.removeEventListener("keydown", onEscape);
    };
  }, []);

  return (
    <header className="header">
      <div className="nav-shell shell">
        <a
          href="#home"
          className="brand"
          aria-label="Luke, back to home"
          onClick={() => setOpen(false)}
        >
          <span className="brand-mark">
            <CodeIcon size={20} weight="bold" />
          </span>
          luke<span className="brand-period">.</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={active === link.href ? "active" : ""}
              aria-current={active === link.href ? "location" : undefined}
            >
              <span className="nav-index">{link.index}</span>
              {link.label}
            </a>
          ))}
        </nav>
        <a className="header-contact" href="#contact">
          Let’s talk <ArrowUpRightIcon size={15} />
        </a>
        <button
          ref={toggle}
          className="mobile-menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen(!open)}
        >
          {open ? <XIcon size={22} /> : <ListIcon size={22} />}
        </button>
      </div>
      <nav
        id="mobile-navigation"
        className={`mobile-nav ${open ? "active" : ""}`}
        aria-label="Mobile navigation"
        hidden={!open}
      >
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            <span className="nav-index">{link.index}</span>
            {link.label}
            <ArrowUpRightIcon size={16} />
          </a>
        ))}
        <a href="#contact" onClick={() => setOpen(false)}>
          Let’s talk <ArrowUpRightIcon size={16} />
        </a>
      </nav>
    </header>
  );
}
