import { ActivateForm } from "@/app/components/auth/ActivateForm";

export default function ActivatePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#FBF4EC",
        padding: 40,
      }}
    >
      <ActivateForm />
    </div>
  );
}
