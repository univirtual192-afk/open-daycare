"use client";

interface NewPostButtonProps {
  onClick: () => void;
}

export function NewPostButton({ onClick }: NewPostButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-2 w-full px-3 py-3 rounded-[14px] text-white font-extrabold text-[14.5px] mb-[18px] transition-opacity hover:opacity-90 border-0 cursor-pointer"
      style={{
        background: "linear-gradient(180deg,#F4977E,#EE8164)",
        boxShadow: "0 8px 18px -8px rgba(238,129,100,.75)",
      }}
    >
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 5v14M5 12h14" />
      </svg>
      Nueva publicación
    </button>
  );
}
