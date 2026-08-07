import Avatar from "../feed/Avatar";

interface KidProfileHeaderProps {
  name: string;
  age: number;
  room: string;
  initial: string;
  avatarBg: string;
  avatarColor: string;
}

export function KidProfileHeader({
  name,
  age,
  room,
  initial,
  avatarBg,
  avatarColor,
}: KidProfileHeaderProps) {
  return (
    <div className="flex items-center gap-[18px]">
      <Avatar
        initial={initial}
        bg={avatarBg}
        color={avatarColor}
        size={84}
        fontSize={34}
      />
      <div className="flex-1">
        <h1 className="font-[var(--font-fredoka)] font-semibold text-[28px] m-0 text-[var(--color-text)]">
          {name}
        </h1>
        <p className="m-0 mt-1 text-[#94887B] text-[15px]">
          {age} años · Sala {room}
        </p>
      </div>
      <button className="border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] font-bold text-[14px] px-4 py-[9px] rounded-[12px] cursor-pointer">
        Editar
      </button>
    </div>
  );
}
