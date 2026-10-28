import { ArrowUpIcon } from "@phosphor-icons/react/dist/ssr/ArrowUp";

export default function Footer() {
  return (
    <footer className="footer shell">
      <a href="#home" className="footer-brand">
        luke<span className="accent">.</span>
      </a>
      <p className="footer-note">
        © {new Date().getFullYear()} LUKE (嘉乐) · MADE WITH CARE & TYPESCRIPT
      </p>
      <a href="#home" className="back-top">
        BACK TO TOP <ArrowUpIcon size={15} />
      </a>
    </footer>
  );
}
