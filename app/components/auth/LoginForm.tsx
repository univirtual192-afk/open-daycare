"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { signInWithEmail } from "@/app/actions/auth";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await signInWithEmail(email, password);
      if (result?.error) {
        setError(result.error);
      }
    });
  }

  return (
    <div style={{ width: "100%", maxWidth: 392 }}>
      <h2
        style={{
          fontFamily: "var(--font-fredoka)",
          fontWeight: 600,
          fontSize: 30,
          margin: "0 0 6px",
          color: "#3F362E",
        }}
      >
        Iniciar sesión
      </h2>
      <p
        style={{
          margin: "0 0 28px",
          color: "#94887B",
          fontSize: 15,
        }}
      >
        Ingresá para ver el día de hoy.
      </p>

      {error && (
        <div
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            background: "#FDE8E4",
            color: "#C5503A",
            fontSize: 14,
            fontWeight: 600,
            marginBottom: 16,
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Email label */}
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: ".7px",
            color: "#94887B",
            marginBottom: 9,
          }}
        >
          EMAIL
        </div>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          style={{
            width: "100%",
            padding: "14px 16px",
            borderRadius: 14,
            border: "1.5px solid #EADFD0",
            background: "#fff",
            fontSize: 15,
            color: "#3F362E",
            marginBottom: 18,
          }}
        />

        {/* Password label */}
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: ".7px",
            color: "#94887B",
            marginBottom: 8,
          }}
        >
          CONTRASEÑA
        </div>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
          placeholder="••••••••"
          style={{
            width: "100%",
            padding: "14px 16px",
            borderRadius: 14,
            border: "1.5px solid #EADFD0",
            background: "#fff",
            fontSize: 15,
            color: "#3F362E",
            marginBottom: 10,
          }}
        />

        {/* Forgot password */}
        <div style={{ textAlign: "right", marginBottom: 20 }}>
          <span
            style={{
              color: "#C5503A",
              fontSize: 13.5,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            ¿Olvidaste tu contraseña?
          </span>
        </div>

        {/* Login button */}
        <button
          type="submit"
          disabled={isPending}
          style={{
            display: "block",
            textAlign: "center",
            width: "100%",
            padding: 15,
            borderRadius: 15,
            background: isPending
              ? "linear-gradient(180deg,#d4a08e,#c49078)"
              : "linear-gradient(180deg,#F4977E,#EE8164)",
            color: "#fff",
            fontWeight: 800,
            fontSize: 16,
            cursor: isPending ? "not-allowed" : "pointer",
            border: "none",
            boxShadow: "0 10px 22px -8px rgba(238,129,100,.7)",
            opacity: isPending ? 0.7 : 1,
          }}
        >
          {isPending ? "Ingresando..." : "Iniciar sesión"}
        </button>
      </form>

      {/* Footer link */}
      <p
        style={{
          textAlign: "center",
          margin: "24px 0 0",
          color: "#94887B",
          fontSize: 14.5,
        }}
      >
        ¿Te invitó la guardería?{" "}
        <Link href="/activate" style={{ color: "#C5503A", fontWeight: 800 }}>
          Activá tu cuenta
        </Link>
      </p>
    </div>
  );
}

export default LoginForm;
