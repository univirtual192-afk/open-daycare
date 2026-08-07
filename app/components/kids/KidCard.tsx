import Link from "next/link";
import Avatar from "../feed/Avatar";

interface Kid {
  id: string;
  name: string;
  age: number;
  room: string;
  initial: string;
  avatarBg: string;
  avatarColor: string;
  linkedParents: number;
  allergyBadge?: string;
  needsVincular?: boolean;
}

interface KidCardProps {
  kid: Kid;
}

export function KidCard({ kid }: KidCardProps) {
  const parentText =
    kid.linkedParents === 0
      ? "sin padres vinculados"
      : kid.linkedParents === 1
        ? "1 padre vinculado"
        : `${kid.linkedParents} padres vinculados`;

  let rightElement: React.ReactNode;
  if (kid.allergyBadge) {
    rightElement = (
      <span className="text-[11px] font-extrabold px-[9px] py-[5px] rounded-full bg-[#FBD8CC] text-[#D9684A]">
        {kid.allergyBadge}
      </span>
    );
  } else if (kid.needsVincular) {
    rightElement = (
      <span className="text-[11px] font-extrabold px-[9px] py-[5px] rounded-full bg-[#F9D2DE] text-[#C56486]">
        VINCULAR
      </span>
    );
  } else {
    rightElement = (
      <svg
        className="flex-none"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#CBB89F"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    );
  }

  return (
    <Link
      href={`/kids/${kid.id}`}
      className="flex items-center gap-[14px] min-w-0 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[18px] p-4 shadow-[0_4px_14px_-12px_rgba(120,90,60,0.5)] transition-[.15s] hover:border-[#F2A78E] hover:-translate-y-[2px]"
    >
      <Avatar
        initial={kid.initial}
        bg={kid.avatarBg}
        color={kid.avatarColor}
        size={48}
        fontSize={19}
      />
      <div className="flex-1 min-w-0">
        <div className="font-[var(--font-fredoka)] font-semibold text-[16px] text-[var(--color-text)] truncate">
          {kid.name}
        </div>
        <div className="text-[13px] text-[#A89A8B]">
          {kid.age} años · {parentText}
        </div>
      </div>
      {rightElement}
    </Link>
  );
}
