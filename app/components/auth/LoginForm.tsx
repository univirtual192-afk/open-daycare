import Link from "next/link";

export function LoginForm() {
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
        defaultValue="caro@opendaycare.com"
        type="email"
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
        type="password"
        defaultValue="contraseña"
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
      <div
        style={{
          display: "block",
          textAlign: "center",
          width: "100%",
          padding: 15,
          borderRadius: 15,
          background: "linear-gradient(180deg,#F4977E,#EE8164)",
          color: "#fff",
          fontWeight: 800,
          fontSize: 16,
          cursor: "pointer",
          boxShadow: "0 10px 22px -8px rgba(238,129,100,.7)",
        }}
      >
        Iniciar sesión
      </div>

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
