"use client";

import { useEffect, useState } from "react";

interface AddKidModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    name: string;
    birthDate: string;
    room: string;
    allergies: string;
    medicalNotes: string;
  }) => void;
}

const ROOMS = ["Soles", "Lunas", "Estrellas"];

function isValidDate(day: number, month: number, year: number): boolean {
  if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900) return false;
  const date = new Date(year, month - 1, day);
  return (
    date.getDate() === day &&
    date.getMonth() === month - 1 &&
    date.getFullYear() === year &&
    date <= new Date()
  );
}

function parseDate(value: string): { day: number; month: number; year: number } | null {
  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return null;
  return {
    day: parseInt(match[1], 10),
    month: parseInt(match[2], 10),
    year: parseInt(match[3], 10),
  };
}

function formatInput(rawValue: string): string {
  const digits = rawValue.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

export function AddKidModal({ isOpen, onClose, onSave }: AddKidModalProps) {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthDateError, setBirthDateError] = useState("");
  const [room, setRoom] = useState("Soles");
  const [allergies, setAllergies] = useState("");
  const [medicalNotes, setMedicalNotes] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const resetForm = () => {
    setName("");
    setBirthDate("");
    setBirthDateError("");
    setRoom("Soles");
    setAllergies("");
    setMedicalNotes("");
    setFormErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        resetForm();
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleBirthDateChange = (raw: string) => {
    const formatted = formatInput(raw);
    setBirthDate(formatted);
    setBirthDateError("");
    setFormErrors((prev) => ({ ...prev, birthDate: "" }));

    const parsed = parseDate(formatted);
    if (parsed) {
      if (!isValidDate(parsed.day, parsed.month, parsed.year)) {
        setBirthDateError("Fecha inválida");
        setFormErrors((prev) => ({ ...prev, birthDate: "Fecha inválida" }));
      }
    }
  };

  const handleSave = () => {
    const errors: Record<string, string> = {};

    if (!name.trim()) errors.name = "Nombre requerido";
    if (!birthDate.trim()) errors.birthDate = "Fecha requerida";
    else if (birthDateError) errors.birthDate = birthDateError;

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    onSave({
      name: name.trim(),
      birthDate,
      room,
      allergies: allergies.trim(),
      medicalNotes: medicalNotes.trim(),
    });
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: "rgba(63,54,46,0.45)",
        padding: "40px 24px",
      }}
      onClick={handleClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 520,
          background: "#FBF4EC",
          border: "1px solid #ECE0D0",
          borderRadius: 24,
          boxShadow: "0 20px 50px -24px rgba(63,54,46,0.35)",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 26px",
            borderBottom: "1px solid #ECE0D0",
          }}
        >
          <button
            onClick={handleClose}
            style={{
              background: "none",
              border: "none",
              color: "#94887B",
              fontWeight: 700,
              fontSize: 15,
              cursor: "pointer",
              padding: 0,
              fontFamily: "inherit",
            }}
          >
            Cancelar
          </button>
          <span
            style={{
              fontFamily: "var(--font-fredoka)",
              fontWeight: 600,
              fontSize: 18,
              color: "#3F362E",
            }}
          >
            Agregar niño
          </span>
          <button
            onClick={handleSave}
            style={{
              background: "none",
              border: "none",
              color: "#D9583C",
              fontWeight: 800,
              fontSize: 15,
              cursor: "pointer",
              padding: 0,
              fontFamily: "inherit",
            }}
          >
            Guardar
          </button>
        </div>

        {/* Form */}
        <div style={{ padding: "24px 26px" }}>
          {/* Full name */}
          <div
            style={{
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: "0.7px",
              color: "#94887B",
              marginBottom: 8,
            }}
          >
            NOMBRE COMPLETO <span style={{ color: "#D9583C" }}>*</span>
          </div>
          <input
            placeholder="Ej. Martina López"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setFormErrors((prev) => ({ ...prev, name: "" }));
            }}
            style={{
              width: "100%",
              padding: "13px 16px",
              borderRadius: 14,
              border: formErrors.name
                ? "1.5px solid #D9583C"
                : "1.5px solid #EADFD0",
              background: "#fff",
              fontSize: 15,
              color: "#3F362E",
              marginBottom: formErrors.name ? 4 : 18,
              fontFamily: "inherit",
              outline: "none",
            }}
          />
          {formErrors.name && (
            <div
              style={{
                fontSize: 12,
                color: "#D9583C",
                marginBottom: 14,
                fontWeight: 600,
              }}
            >
              {formErrors.name}
            </div>
          )}

          {/* Birth date + Room */}
          <div style={{ display: "flex", gap: 14, marginBottom: 18 }}>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: "0.7px",
                  color: "#94887B",
                  marginBottom: 8,
                }}
              >
                FECHA DE NACIMIENTO <span style={{ color: "#D9583C" }}>*</span>
              </div>
              <input
                placeholder="dd/mm/aaaa"
                value={birthDate}
                onChange={(e) => handleBirthDateChange(e.target.value)}
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  borderRadius: 14,
                  border: formErrors.birthDate
                    ? "1.5px solid #D9583C"
                    : "1.5px solid #EADFD0",
                  background: "#fff",
                  fontSize: 15,
                  color: "#3F362E",
                  fontFamily: "inherit",
                  outline: "none",
                }}
              />
              {formErrors.birthDate && (
                <div
                  style={{
                    fontSize: 12,
                    color: "#D9583C",
                    marginTop: 4,
                    fontWeight: 600,
                  }}
                >
                  {formErrors.birthDate}
                </div>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: "0.7px",
                  color: "#94887B",
                  marginBottom: 8,
                }}
              >
                SALA <span style={{ color: "#D9583C" }}>*</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "13px 16px",
                  borderRadius: 14,
                  border: "1.5px solid #EADFD0",
                  background: "#fff",
                  fontSize: 15,
                  color: "#3F362E",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                <select
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  style={{
                    border: "none",
                    background: "transparent",
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#3F362E",
                    fontFamily: "inherit",
                    outline: "none",
                    flex: 1,
                    cursor: "pointer",
                    appearance: "none",
                    WebkitAppearance: "none",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {ROOMS.map((roomOption) => (
                    <option key={roomOption} value={roomOption}>
                      {roomOption}
                    </option>
                  ))}
                </select>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#B0A290"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ pointerEvents: "none" }}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>
          </div>

          {/* Allergies */}
          <div
            style={{
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: "0.7px",
              color: "#94887B",
              marginBottom: 8,
            }}
          >
            ALERGIAS (ETIQUETAS){" "}
            <span style={{ fontWeight: 500, color: "#B6A99B" }}>(opcional)</span>
          </div>
          <input
            placeholder="Ej. Maní, Lactosa"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            style={{
              width: "100%",
              padding: "13px 16px",
              borderRadius: 14,
              border: "1.5px solid #EADFD0",
              background: "#fff",
              fontSize: 15,
              color: "#3F362E",
              marginBottom: 18,
              fontFamily: "inherit",
              outline: "none",
            }}
          />

          {/* Medical notes */}
          <div
            style={{
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: "0.7px",
              color: "#94887B",
              marginBottom: 8,
            }}
          >
            NOTAS MÉDICAS{" "}
            <span style={{ fontWeight: 500, color: "#B6A99B" }}>(opcional)</span>
          </div>
          <textarea
            placeholder="Indicaciones, medicación, contactos…"
            value={medicalNotes}
            onChange={(e) => setMedicalNotes(e.target.value)}
            style={{
              width: "100%",
              minHeight: 90,
              resize: "vertical",
              padding: "13px 16px",
              borderRadius: 14,
              border: "1.5px solid #EADFD0",
              background: "#fff",
              fontSize: 15,
              color: "#3F362E",
              lineHeight: 1.5,
              fontFamily: "inherit",
              outline: "none",
            }}
          />
        </div>
      </div>
    </div>
  );
}
