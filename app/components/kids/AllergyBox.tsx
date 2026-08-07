interface AllergyBoxProps {
  content: string;
}

export function AllergyBox({ content }: AllergyBoxProps) {
  return (
    <div className="flex gap-[14px] bg-[#FBDAD6] rounded-[16px] p-4">
      <div className="w-10 h-10 rounded-[11px] bg-[#F4A8A0] flex items-center justify-center flex-none">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
          <path d="M12 9v4M12 17h.01" />
        </svg>
      </div>
      <div>
        <div className="font-extrabold text-[#C5413A] text-[15px] mb-1">
          Alergias y notas
        </div>
        <div className="text-[#B25249] text-[14.5px] leading-[1.5]">{content}</div>
      </div>
    </div>
  );
}
