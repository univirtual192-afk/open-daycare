import type { CSSProperties } from "react";

export type PostType = "achievement" | "activity" | "announcement";

interface PostBadgeProps {
  type: PostType;
  className?: string;
  style?: CSSProperties;
}

const BADGE_CONFIG: Record<
  PostType,
  { label: string; bg: string; color: string }
> = {
  achievement: {
    label: "LOGRO",
    bg: "var(--color-achievement-bg)",
    color: "var(--color-achievement)",
  },
  activity: {
    label: "ACTIVIDAD",
    bg: "var(--color-activity-bg)",
    color: "var(--color-activity)",
  },
  announcement: {
    label: "ANUNCIO",
    bg: "var(--color-announcement-bg)",
    color: "var(--color-announcement)",
  },
};

export function PostBadge({ type, className = "", style }: PostBadgeProps) {
  const config = BADGE_CONFIG[type];

  return (
    <div
      className={`flex flex-none items-center gap-[7px] rounded-full px-3 py-1.5 ${className}`}
      style={{ background: config.bg, ...style }}
    >
      <span
        className="block h-2 w-2 rounded-full"
        style={{ background: config.color }}
      />
      <span
        className="text-[12px] font-extrabold"
        style={{
          letterSpacing: ".5px",
          color: config.color,
        }}
      >
        {config.label}
      </span>
    </div>
  );
}

export default PostBadge;