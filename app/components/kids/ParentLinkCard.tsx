import Avatar from "../feed/Avatar";

export interface ParentLinkCardProps {
  name: string;
  role: string;
  initial: string;
  avatarBg: string;
  avatarColor: string;
  status: "active" | "pending";
}

export function ParentLinkCard({
  name,
  role,
  initial,
  avatarBg,
  avatarColor,
  status,
}: ParentLinkCardProps) {
  const statusLabel = status === "active" ? "ACTIVA" : "PENDIENTE";
  const statusClasses =
    status === "active"
      ? "bg-[#CFEBD8] text-[#3E9B6C]"
      : "bg-[#F7E7A6] text-[#9A7B1E]";

  return (
    <div className="flex items-center gap-3">
      <Avatar
        initial={initial}
        bg={avatarBg}
        color={avatarColor}
        size={40}
        fontSize={16}
      />
      <div className="flex-1 min-w-0">
        <div className="font-extrabold text-[14.5px] text-[var(--color-text)]">
          {name}
        </div>
        <div className="text-[12.5px] text-[#A89A8B]">{role}</div>
      </div>
      <span
        className={`text-[10.5px] font-extrabold px-[9px] py-1 rounded-full ${statusClasses}`}
      >
        {statusLabel}
      </span>
    </div>
  );
}
