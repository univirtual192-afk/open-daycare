import type { CSSProperties, ReactNode } from "react";

interface AvatarProps {
  initial?: string;
  bg: string;
  color: string;
  size?: number;
  fontSize?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export function Avatar({
  initial,
  bg,
  color,
  size = 44,
  fontSize = 17,
  className = "",
  style,
  children,
}: AvatarProps) {
  return (
    <div
      className={`flex flex-none items-center justify-center rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: bg,
        color,
        fontFamily: "var(--font-fredoka)",
        fontWeight: 600,
        fontSize,
        ...style,
      }}
    >
      {children ?? initial}
    </div>
  );
}

export default Avatar;