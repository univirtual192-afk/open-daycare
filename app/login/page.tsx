import { BrandPanel } from "@/app/components/auth/BrandPanel";
import { LoginForm } from "@/app/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1.05fr 1fr",
        background: "#FBF4EC",
      }}
    >
      <BrandPanel />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 40,
        }}
      >
        <LoginForm />
      </div>
    </div>
  );
}
