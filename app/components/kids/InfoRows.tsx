interface InfoRow {
  label: string;
  value: string;
}

interface InfoRowsProps {
  rows: InfoRow[];
}

export function InfoRows({ rows }: InfoRowsProps) {
  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[16px] overflow-hidden">
      {rows.map((row, i) => (
        <div
          key={row.label}
          className={`flex justify-between px-[18px] py-[15px] ${
            i < rows.length - 1 ? "border-b border-[var(--color-border-soft)]" : ""
          }`}
        >
          <span className="text-[#94887B] text-[14.5px]">{row.label}</span>
          <span className="font-extrabold text-[var(--color-text)] text-[14.5px]">
            {row.value}
          </span>
        </div>
      ))}
    </div>
  );
}
