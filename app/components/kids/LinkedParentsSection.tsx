"use client";

import { useState } from "react";
import { ParentLinkCard, type ParentLinkCardProps } from "./ParentLinkCard";
import { LinkParentModal } from "./LinkParentModal";

interface LinkedParentsSectionProps {
  childName: string;
  parents: ParentLinkCardProps[];
}

export function LinkedParentsSection({ childName, parents }: LinkedParentsSectionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[16px] p-4">
      <div className="text-[12.5px] font-extrabold tracking-[.8px] text-[#8A7C6D] mb-[14px]">
        PADRES VINCULADOS
      </div>
      <div className="flex flex-col gap-[14px]">
        {parents.map((parent) => (
          <ParentLinkCard key={parent.name} {...parent} />
        ))}
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-3 pt-2 w-full text-left cursor-pointer bg-transparent border-0 p-0"
        >
          <span className="w-10 h-10 rounded-full border-[1.5px] border-dashed border-[#D8CBBA] flex items-center justify-center text-[#B0A290]">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
          <span className="font-extrabold text-[14.5px] text-[#C5503A]">
            Vincular otro padre
          </span>
        </button>
      </div>

      <LinkParentModal
        isOpen={open}
        onClose={() => setOpen(false)}
        childName={childName}
      />
    </div>
  );
}