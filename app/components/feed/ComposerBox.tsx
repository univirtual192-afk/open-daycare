import type { CSSProperties } from "react";
import { Avatar } from "./Avatar";

interface ComposerBoxProps {
  className?: string;
  style?: CSSProperties;
}

export function ComposerBox({ className = "", style }: ComposerBoxProps) {
  return (
    <a
      href="#"
      className={`flex items-center gap-[14px] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[18px] px-[18px] py-[14px] mb-6 transition-shadow hover:shadow-[0_4px_14px_-6px_rgba(120,90,60,.45)] ${className}`}
      style={{
        boxShadow: "0 4px 14px -10px rgba(120,90,60,.4)",
        ...style,
      }}
    >
      <Avatar
        initial="C"
        bg="var(--color-avatar-caro-bg)"
        color="var(--color-avatar-caro)"
        size={40}
        fontSize={16}
      />
      <span className="flex-1 text-[15px] text-[var(--color-text-ghost)]">
        Compartí un momento…
      </span>
      <span
        className="flex flex-none items-center justify-center rounded-[12px] bg-[var(--color-primary-soft)] text-[var(--color-accent-strong)]"
        style={{ width: 38, height: 38 }}
      >
        <svg
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      </span>
    </a>
  );
}

export default ComposerBox;