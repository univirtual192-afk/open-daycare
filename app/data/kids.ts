import type { ParentLinkCardProps } from "../components/kids/ParentLinkCard";

export interface KidProfile {
  id: string;
  name: string;
  age: number;
  room: string;
  initial: string;
  avatarBg: string;
  avatarColor: string;
  birthDate: string;
  admissionDate: string;
  allergies: string;
  parents: ParentLinkCardProps[];
}

export const PROFILES: KidProfile[] = [
  {
    id: "mateo-fernandez",
    name: "Mateo Fernández",
    age: 3,
    room: "Soles",
    initial: "M",
    avatarBg: "#A9D9E8",
    avatarColor: "#1F7A93",
    birthDate: "12 mar 2022",
    admissionDate: "feb 2025",
    allergies:
      "Alergia al maní. Evitar frutos secos. Lleva inhalador en la mochila.",
    parents: [
      {
        name: "Lucía Fernández",
        role: "Mamá · activa",
        initial: "L",
        avatarBg: "#C9B6E8",
        avatarColor: "#fff",
        status: "active",
      },
      {
        name: "Diego Fernández",
        role: "Papá · invitación enviada",
        initial: "D",
        avatarBg: "#A9C7E8",
        avatarColor: "#fff",
        status: "pending",
      },
    ],
  },
  {
    id: "sofia-mendez",
    name: "Sofía Méndez",
    age: 2,
    room: "Soles",
    initial: "S",
    avatarBg: "#F4B8CC",
    avatarColor: "#C44A7A",
    birthDate: "5 jun 2023",
    admissionDate: "mar 2025",
    allergies: "",
    parents: [
      {
        name: "Ana Méndez",
        role: "Mamá · activa",
        initial: "A",
        avatarBg: "#E8C9B6",
        avatarColor: "#fff",
        status: "active",
      },
    ],
  },
  {
    id: "benjamin-ruiz",
    name: "Benjamín Ruiz",
    age: 3,
    room: "Soles",
    initial: "B",
    avatarBg: "#B9DEC4",
    avatarColor: "#3E8B62",
    birthDate: "20 ene 2022",
    admissionDate: "feb 2025",
    allergies: "",
    parents: [
      {
        name: "Carolina Ruiz",
        role: "Mamá · activa",
        initial: "C",
        avatarBg: "#D4B6E8",
        avatarColor: "#fff",
        status: "active",
      },
      {
        name: "Martín Ruiz",
        role: "Papá · activo",
        initial: "M",
        avatarBg: "#B6D4E8",
        avatarColor: "#fff",
        status: "active",
      },
    ],
  },
  {
    id: "valentina-soto",
    name: "Valentina Soto",
    age: 2,
    room: "Soles",
    initial: "V",
    avatarBg: "#F4DC8E",
    avatarColor: "#9A7B1E",
    birthDate: "8 sep 2023",
    admissionDate: "abr 2025",
    allergies: "",
    parents: [],
  },
  {
    id: "tomas-diaz",
    name: "Tomás Díaz",
    age: 3,
    room: "Soles",
    initial: "T",
    avatarBg: "#C9B6E8",
    avatarColor: "#7B5FC0",
    birthDate: "15 jul 2022",
    admissionDate: "feb 2025",
    allergies:
      "Intolerancia a la lactosa. Leche sin lactosa en meriendas.",
    parents: [
      {
        name: "Laura Díaz",
        role: "Mamá · activa",
        initial: "L",
        avatarBg: "#E8B6C9",
        avatarColor: "#fff",
        status: "active",
      },
    ],
  },
  {
    id: "emma-castro",
    name: "Emma Castro",
    age: 2,
    room: "Soles",
    initial: "E",
    avatarBg: "#F4B8CC",
    avatarColor: "#C44A7A",
    birthDate: "3 nov 2023",
    admissionDate: "mar 2025",
    allergies: "",
    parents: [
      {
        name: "Pablo Castro",
        role: "Papá · activo",
        initial: "P",
        avatarBg: "#B6E8C9",
        avatarColor: "#fff",
        status: "active",
      },
    ],
  },
  {
    id: "lucas-romero",
    name: "Lucas Romero",
    age: 3,
    room: "Soles",
    initial: "L",
    avatarBg: "#A9D9E8",
    avatarColor: "#1F7A93",
    birthDate: "28 feb 2022",
    admissionDate: "feb 2025",
    allergies: "",
    parents: [
      {
        name: "Marta Romero",
        role: "Mamá · activa",
        initial: "M",
        avatarBg: "#E8D4B6",
        avatarColor: "#fff",
        status: "active",
      },
    ],
  },
  {
    id: "olivia-vega",
    name: "Olivia Vega",
    age: 2,
    room: "Soles",
    initial: "O",
    avatarBg: "#B9DEC4",
    avatarColor: "#3E8B62",
    birthDate: "17 dic 2023",
    admissionDate: "abr 2025",
    allergies: "",
    parents: [
      {
        name: "Javier Vega",
        role: "Papá · activo",
        initial: "J",
        avatarBg: "#C9B6E8",
        avatarColor: "#fff",
        status: "active",
      },
    ],
  },
];

export function getKidProfile(id: string): KidProfile | undefined {
  return PROFILES.find((p) => p.id === id);
}
