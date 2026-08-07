import type { CSSProperties } from "react";

interface PhotoPlaceholderProps {
  label?: string;
  className?: string;
  style?: CSSProperties;
}

export function PhotoPlaceholder({ label, className = "", style }: PhotoPlaceholderProps) {
  return (
    <a
      href="#"
      className={`flex flex-col items-center justify-center gap-2 rounded-2xl bg-[var(--color-surface-alt)] text-[var(--color-placeholder)] transition-opacity hover:opacity-80 ${className}`}
      style={{
        marginTop: 14,
        border: "1.5px dashed var(--color-dashed)",
        height: 200,
        ...style,
      }}
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-3.6-3.6a2 2 0 0 0-2.8 0L6 21" />
      </svg>
      {label ? <span className="text-[13.5px]">{label}</span> : null}
    </a>
  );
}

export default PhotoPlaceholder;