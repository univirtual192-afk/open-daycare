import type { CSSProperties } from "react";

interface FeedHeaderProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  style?: CSSProperties;
}

export function FeedHeader({
  eyebrow = "GUARDERÍA · SALA SOLES",
  title = "Buenas, Caro",
  subtitle = "12 niños · martes 17 jun",
  className = "",
  style,
}: FeedHeaderProps) {
  return (
    <div className={`mb-6 ${className}`} style={style}>
      <div
        className="mb-1"
        style={
          {
            fontSize: "12.5px",
            fontWeight: 800,
            letterSpacing: ".8px",
            color: "var(--color-primary)",
            marginBottom: "4px",
          } as CSSProperties
        }
      >
        {eyebrow}
      </div>
      <h1
        className="m-0 text-[var(--color-text)]"
        style={{ fontFamily: "var(--font-fredoka)", fontWeight: 600, fontSize: 30 }}
      >
        {title}
      </h1>
      <p className="mt-[5px] mb-0 text-[14.5px] text-[var(--color-text-faint)]">
        {subtitle}
      </p>
    </div>
  );
}

export default FeedHeader;