"use client";

import { useEffect } from "react";

interface NewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ChipType = "meal" | "nap" | "activity" | "achievement" | "mood" | "photo" | "announcement";

const TIPO_CHIPS: { label: string; bg: string; color: string; type: ChipType }[] = [
  { label: "Comida", bg: "#9A7B1E", color: "#fff", type: "meal" },
  { label: "Siesta", bg: "#E7DCF6", color: "#7B5FC0", type: "nap" },
  { label: "Actividad", bg: "#2E89A6", color: "#fff", type: "activity" },
  { label: "Logro", bg: "#CFEBD8", color: "#3E9B6C", type: "achievement" },
  { label: "Ánimo", bg: "#F9D2DE", color: "#C56486", type: "mood" },
  { label: "Foto", bg: "#FBD8CC", color: "#D9684A", type: "photo" },
  { label: "Anuncio", bg: "#CCD8F4", color: "#4E72C8", type: "announcement" },
];

export function NewPostModal({ isOpen, onClose }: NewPostModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-start justify-center overflow-y-auto"
      style={{ zIndex: 50, padding: "40px 24px", background: "rgba(63,54,46,.45)" }}
      onClick={onClose}
    >
      <div
        className="w-full"
        style={{ maxWidth: 580, background: "#FBF4EC", border: "1px solid #ECE0D0", borderRadius: 24, boxShadow: "0 20px 50px -24px rgba(63,54,46,.35)", overflow: "hidden" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-[26px] py-5" style={{ borderBottom: "1px solid #ECE0D0" }}>
          <button
            onClick={onClose}
            className="text-[15px] font-bold transition-opacity hover:opacity-70"
            style={{ color: "#94887B", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}
          >
            Cancelar
          </button>
          <span style={{ fontFamily: "var(--font-fredoka)", fontWeight: 600, fontSize: 18, color: "#3F362E" }}>
            Nueva publicación
          </span>
          <button
            className="text-[15px] font-extrabold transition-opacity hover:opacity-70"
            style={{ color: "#D9583C", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}
          >
            Publicar
          </button>
        </div>

        <div style={{ padding: "24px 26px" }}>
          {/* PARA */}
          <SectionLabel>PARA</SectionLabel>
          <div className="flex flex-wrap gap-[9px] mb-[22px]">
            <ParaChip initial="M" name="Mateo" selected avatarBg="#A9D9E8" avatarColor="#1F7A93" />
            <ParaChip initial="S" name="Sofía" avatarBg="#F4B8CC" avatarColor="#C44A7A" />
            <ParaChip initial="B" name="Benjamín" avatarBg="#B9DEC4" avatarColor="#3E8B62" />
            <button
              className="px-4 py-[6px] rounded-full font-bold text-[14px] transition-opacity hover:opacity-80"
              style={{ border: "1.5px solid #ECE0D0", background: "#FFFDF9", color: "#6E6359", cursor: "pointer", fontFamily: "inherit" }}
            >
              Toda la sala
            </button>
          </div>

          {/* TIPO */}
          <SectionLabel>TIPO</SectionLabel>
          <div className="flex flex-wrap gap-[9px] mb-[22px]">
            {TIPO_CHIPS.map((chip) => (
              <button
                key={chip.type}
                className="px-4 py-2 rounded-full font-extrabold text-[13.5px] transition-opacity hover:opacity-80"
                style={{ border: "none", background: chip.bg, color: chip.color, cursor: "pointer", fontFamily: "inherit" }}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* DESCRIPCIÓN */}
          <SectionLabel>DESCRIPCIÓN</SectionLabel>
          <textarea
            className="w-full mb-[22px]"
            placeholder="Contá cómo le fue hoy…"
            defaultValue="Pintamos con témperas esta mañana. Mateo eligió el azul para todo y se concentró un montón."
            style={{
              minHeight: 120,
              resize: "vertical",
              padding: "14px 16px",
              borderRadius: 14,
              border: "1.5px solid #EADFD0",
              background: "#fff",
              fontSize: 15,
              color: "#3F362E",
              lineHeight: 1.5,
              fontFamily: "inherit",
            }}
          />

          {/* FOTOS */}
          <SectionLabel>FOTOS</SectionLabel>
          <div className="flex gap-3">
            <div
              className="flex items-center justify-center"
              style={{ width: 96, height: 96, borderRadius: 14, background: "#F4ECE1", border: "1px solid #ECE0D0", color: "#CBB89F" }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.6-3.6a2 2 0 0 0-2.8 0L6 21" />
              </svg>
            </div>
            <button
              className="flex flex-col items-center justify-center gap-[6px] transition-opacity hover:opacity-80"
              style={{
                width: 96,
                height: 96,
                borderRadius: 14,
                border: "1.5px dashed #DBCDBA",
                background: "#F4ECE1",
                color: "#B0A290",
                cursor: "pointer",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C5503A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
              <span style={{ fontSize: 12 }}>Agregar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div
      className="mb-[10px]"
      style={{ fontSize: 12, fontWeight: 800, letterSpacing: ".7px", color: "#94887B" }}
    >
      {children}
    </div>
  );
}

interface ParaChipProps {
  initial: string;
  name: string;
  selected?: boolean;
  avatarBg: string;
  avatarColor: string;
}

function ParaChip({ initial, name, selected = false, avatarBg, avatarColor }: ParaChipProps) {
  return (
    <button
      className="flex items-center gap-2 rounded-full font-bold text-[14px] transition-opacity hover:opacity-80"
      style={{
        padding: selected ? "6px 14px 6px 6px" : "6px 14px 6px 6px",
        borderRadius: 999,
        border: selected ? "1.5px solid #3F362E" : "1.5px solid #ECE0D0",
        background: selected ? "#3F362E" : "#FFFDF9",
        color: selected ? "#fff" : "#6E6359",
        cursor: "pointer",
        fontFamily: "inherit",
      }}
    >
      <span
        className="flex items-center justify-center"
        style={{
          width: 26,
          height: 26,
          borderRadius: "50%",
          background: avatarBg,
          color: avatarColor,
          fontFamily: "var(--font-fredoka)",
          fontWeight: 600,
          fontSize: 13,
        }}
      >
        {initial}
      </span>
      {name}
    </button>
  );
}

export default NewPostModal;
