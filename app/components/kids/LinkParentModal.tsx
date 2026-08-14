"use client";

import { useEffect, useState } from "react";

type Kinship = "Mamá" | "Papá" | "Tutor/a";

interface LinkParentModalProps {
  isOpen: boolean;
  onClose: () => void;
  childName: string;
}

const KINSHIPS: Kinship[] = ["Mamá", "Papá", "Tutor/a"];

export function LinkParentModal({ isOpen, onClose, childName }: LinkParentModalProps) {
  const [kinship, setKinship] = useState<Kinship>("Mamá");

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex overflow-y-auto"
      style={{
        background: "rgba(63,54,46,0.45)",
        padding: "40px 24px",
      }}
      onClick={onClose}
    >
      <div
        className="w-full m-auto bg-[#FBF4EC] border border-[#ECE0D0] rounded-[24px] overflow-hidden shadow-[0_20px_50px_-24px_rgba(63,54,46,.35)]"
        style={{ maxWidth: 480 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-[26px] py-5 border-b border-[#ECE0D0]">
          <div>
            <div
              style={{ fontFamily: "var(--font-fredoka)" }}
              className="font-semibold text-[18px] text-[var(--color-text)]"
            >
              Vincular padre
            </div>
            <div className="text-[13px] text-[#A89A8B]">a {childName}</div>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="w-[34px] h-[34px] rounded-[10px] bg-[#F0E6D8] text-[#94887B] flex items-center justify-center cursor-pointer border-0"
          >
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
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-[26px] py-[22px]">
          <div className="flex gap-[11px] bg-[#E3ECFB] rounded-[14px] px-4 py-[13px] mb-5">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4E72C8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flex-none mt-[1px]"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
            <span className="text-[13.5px] text-[#3F5694] leading-[1.45]">
              Le enviaremos un correo con un código para que active su cuenta.
              Solo verá el feed de {childName}.
            </span>
          </div>

          <div className="text-[12px] font-extrabold tracking-[.7px] text-[#94887B] mb-2">
            NOMBRE DEL PADRE/MADRE
          </div>
          <input
            placeholder="Ej. Diego Fernández"
            className="w-full px-4 py-[13px] rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white text-[15px] text-[var(--color-text)] mb-[18px]"
          />

          <div className="text-[12px] font-extrabold tracking-[.7px] text-[#94887B] mb-2">
            EMAIL
          </div>
          <input
            type="email"
            placeholder="correo@ejemplo.com"
            className="w-full px-4 py-[13px] rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white text-[15px] text-[var(--color-text)] mb-[18px]"
          />

          <div className="text-[12px] font-extrabold tracking-[.7px] text-[#94887B] mb-[10px]">
            PARENTESCO
          </div>
          <div className="flex gap-[9px] mb-5">
            {KINSHIPS.map((option) => {
              const selected = kinship === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setKinship(option)}
                  className={`flex-1 px-0 py-[11px] rounded-full border-[1.5px] font-extrabold text-[14px] cursor-pointer ${
                    selected
                      ? "bg-[#CCD8F4] border-[#9FB8EC] text-[#4E72C8]"
                      : "bg-[#FFFDF9] border-[#ECE0D0] text-[#6E6359]"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          <div className="bg-[#FBF1D6] border-[1.5px] border-dashed border-[#E6D08A] rounded-[16px] py-[18px] text-center mb-5">
            <div className="text-[12px] font-extrabold tracking-[.7px] text-[#A88526] mb-2">
              CÓDIGO DE INVITACIÓN
            </div>
            <div
              style={{ fontFamily: "var(--font-fredoka)" }}
              className="font-semibold text-[34px] tracking-[7px] text-[#8A7234]"
            >
              7K4P9
            </div>
            <div className="text-[13px] text-[#A88526] mt-[6px]">Vence en 7 días</div>
          </div>

          <button
            type="button"
            className="flex items-center justify-center gap-[9px] w-full py-[14px] rounded-[14px] text-white font-extrabold text-[15.5px] cursor-pointer"
            style={{
              background: "linear-gradient(180deg,#F4977E,#EE8164)",
              boxShadow: "0 10px 22px -8px rgba(238,129,100,.7)",
            }}
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m22 2-7 20-4-9-9-4z" />
              <path d="M22 2 11 13" />
            </svg>
            Enviar invitación
          </button>
        </div>
      </div>
    </div>
  );
}
