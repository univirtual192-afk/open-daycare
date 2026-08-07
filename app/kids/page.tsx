import { Sidebar } from "../components/feed/Sidebar";
import { KidsSearchBar } from "../components/kids/KidsSearchBar";
import { KidCard } from "../components/kids/KidCard";

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

const KIDS: Kid[] = [
  {
    id: "mateo-fernandez",
    name: "Mateo Fernández",
    age: 3,
    room: "Soles",
    initial: "M",
    avatarBg: "#A9D9E8",
    avatarColor: "#1F7A93",
    linkedParents: 2,
    allergyBadge: "MANÍ",
  },
  {
    id: "sofia-mendez",
    name: "Sofía Méndez",
    age: 2,
    room: "Soles",
    initial: "S",
    avatarBg: "#F4B8CC",
    avatarColor: "#C44A7A",
    linkedParents: 1,
  },
  {
    id: "benjamin-ruiz",
    name: "Benjamín Ruiz",
    age: 3,
    room: "Soles",
    initial: "B",
    avatarBg: "#B9DEC4",
    avatarColor: "#3E8B62",
    linkedParents: 2,
  },
  {
    id: "valentina-soto",
    name: "Valentina Soto",
    age: 2,
    room: "Soles",
    initial: "V",
    avatarBg: "#F4DC8E",
    avatarColor: "#9A7B1E",
    linkedParents: 0,
    needsVincular: true,
  },
  {
    id: "tomas-diaz",
    name: "Tomás Díaz",
    age: 3,
    room: "Soles",
    initial: "T",
    avatarBg: "#C9B6E8",
    avatarColor: "#7B5FC0",
    linkedParents: 1,
    allergyBadge: "LACTOSA",
  },
  {
    id: "emma-castro",
    name: "Emma Castro",
    age: 2,
    room: "Soles",
    initial: "E",
    avatarBg: "#F4B8CC",
    avatarColor: "#C44A7A",
    linkedParents: 1,
  },
  {
    id: "lucas-romero",
    name: "Lucas Romero",
    age: 3,
    room: "Soles",
    initial: "L",
    avatarBg: "#A9D9E8",
    avatarColor: "#1F7A93",
    linkedParents: 1,
  },
  {
    id: "olivia-vega",
    name: "Olivia Vega",
    age: 2,
    room: "Soles",
    initial: "O",
    avatarBg: "#B9DEC4",
    avatarColor: "#3E8B62",
    linkedParents: 1,
  },
];

export default function KidsPage() {
  return (
    <div className="flex min-h-screen bg-[var(--color-background)]">
      <Sidebar currentPath="/kids" />

      <main className="flex-1 min-w-0 h-screen overflow-y-auto">
        <div
          className="mx-auto w-full"
          style={{ maxWidth: 880, padding: "34px 40px 80px" }}
        >
          <div className="flex items-end justify-between gap-4 mb-[22px]">
            <div>
              <div className="text-[12.5px] font-extrabold tracking-[.8px] text-[#D9583C] mb-1">
                GESTIÓN
              </div>
              <h1
                className="m-0 text-[30px] font-[var(--font-fredoka)] font-semibold text-[var(--color-text)]"
              >
                Niños
              </h1>
            </div>
            <button
              className="flex items-center gap-2 px-[18px] py-[11px] rounded-[14px] bg-gradient-to-b from-[#F4977E] to-[#EE8164] text-white font-extrabold text-[14.5px] shadow-[0_8px_18px_-8px_rgba(238,129,100,0.7)] cursor-pointer"
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
              Agregar niño
            </button>
          </div>

          <KidsSearchBar />

          <div className="flex items-center gap-3 mb-[14px]">
            <span className="text-[12.5px] font-extrabold tracking-[.8px] text-[var(--color-text)]">
              SALA SOLES
            </span>
            <span className="text-[13px] text-[#A89A8B]">{KIDS.length} niños</span>
            <span className="flex-1 h-px bg-[#E7DAC8]" />
          </div>

          <div className="grid grid-cols-2 gap-[14px]">
            {KIDS.map((kid) => (
              <KidCard key={kid.id} kid={kid} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
