import type { CSSProperties } from "react";

interface SidebarProps {
  className?: string;
  style?: CSSProperties;
}

function LogoMark() {
  return (
    <div
      className="flex flex-none items-center justify-center rounded-[12px]"
      style={{
        width: 38,
        height: 38,
        background: "linear-gradient(155deg,#F8C3A8,#F2937A)",
      }}
    >
      <svg
        width="21"
        height="21"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    </div>
  );
}

interface NavItemProps {
  label: string;
  active?: boolean;
  href?: string;
  children: React.ReactNode;
}

function NavItem({ label, active = false, href = "#", children }: NavItemProps) {
  return (
    <a
      href={href}
      className={`flex items-center gap-3 rounded-[12px] px-3 py-[11px] text-[14.5px] transition-colors ${
        active
          ? "bg-[var(--color-primary-soft)] text-[var(--color-primary)] font-extrabold"
          : "text-[var(--color-text-muted)] font-semibold hover:bg-[var(--color-primary-soft)]/50 hover:text-[var(--color-primary)]"
      }`}
    >
      {children}
      {label}
    </a>
  );
}

const NAV_ICONS = {
  feed: (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
    </svg>
  ),
  ninos: (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="7" r="3" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 20a5 5 0 0 1 5.5-4.9" />
    </svg>
  ),
  avisos: (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" />
    </svg>
  ),
  cuenta: (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
};

export function Sidebar({ className = "", style }: SidebarProps) {
  return (
    <aside
      className={`flex flex-col px-4 py-6 sticky top-0 h-screen ${className}`}
      style={{
        width: 248,
        flex: "none",
        background: "var(--color-surface)",
        borderRight: "1px solid var(--color-border)",
        ...style,
      }}
    >
      <a
        href="#"
        className="flex items-center gap-[11px] px-2 pb-[22px] pt-1 transition-opacity hover:opacity-80"
      >
        <LogoMark />
        <div>
          <div
            className="leading-none text-[var(--color-text)]"
            style={{ fontFamily: "var(--font-fredoka)", fontWeight: 600, fontSize: 17 }}
          >
            OpenDayCare
          </div>
          <div className="mt-0.5 text-[11.5px] text-[var(--color-text-ghost)]">
            Sala Soles
          </div>
        </div>
      </a>

      <a
        href="#"
        className="flex items-center justify-center gap-2 w-full px-3 py-3 rounded-[14px] text-white font-extrabold text-[14.5px] mb-[18px] transition-opacity hover:opacity-90"
        style={{
          background: "linear-gradient(180deg,#F4977E,#EE8164)",
          boxShadow: "0 8px 18px -8px rgba(238,129,100,.75)",
        }}
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
        Nueva publicación
      </a>

      <nav className="flex flex-col gap-1 flex-1">
        <NavItem label="Feed" active>
          {NAV_ICONS.feed}
        </NavItem>
        <NavItem label="Niños">{NAV_ICONS.ninos}</NavItem>
        <NavItem label="Avisos">{NAV_ICONS.avisos}</NavItem>
        <NavItem label="Mi cuenta">{NAV_ICONS.cuenta}</NavItem>
      </nav>

      <div
        className="pt-[14px] mt-2.5"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        <div className="flex items-center gap-[11px] px-2 py-1.5">
          <div
            className="flex flex-none items-center justify-center rounded-full text-[var(--color-avatar-caro)]"
            style={{
              width: 38,
              height: 38,
              background: "var(--color-avatar-caro-bg)",
              fontFamily: "var(--font-fredoka)",
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            C
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-extrabold text-[14px] text-[var(--color-text)]">
              Caro Giménez
            </div>
            <div className="text-[12px] text-[var(--color-text-ghost)]">
              Maestra · Soles
            </div>
          </div>
          <a
            href="#"
            title="Cerrar sesión"
            className="flex flex-none items-center justify-center rounded-[10px] bg-[var(--color-background)] text-[var(--color-text-faint)] transition-colors hover:text-[var(--color-primary)]"
            style={{ width: 32, height: 32 }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
          </a>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;