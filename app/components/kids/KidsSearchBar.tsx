export function KidsSearchBar() {
  return (
    <div className="flex items-center gap-[11px] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[14px] px-4 py-3 mb-[22px]">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#B0A290"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        placeholder="Buscar niño…"
        className="flex-1 border-none bg-none text-[15px] text-[var(--color-text)] placeholder-[#B6A99B] font-[inherit]"
      />
    </div>
  );
}
