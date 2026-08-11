"use client";

import { useState } from "react";
import { AddKidModal } from "./AddKidModal";

export function AddKidModalTrigger() {
  const [open, setOpen] = useState(false);

  const handleSave = (data: {
    name: string;
    birthDate: string;
    room: string;
    allergies: string;
    medicalNotes: string;
  }) => {
    console.log("Kid saved:", data);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
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
      <AddKidModal isOpen={open} onClose={() => setOpen(false)} onSave={handleSave} />
    </>
  );
}
