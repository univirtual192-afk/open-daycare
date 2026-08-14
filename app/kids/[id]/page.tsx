import Link from "next/link";
import { notFound } from "next/navigation";
import { SidebarWithUser } from "../../components/feed/SidebarWithUser";
import { KidProfileHeader } from "../../components/kids/KidProfileHeader";
import { AllergyBox } from "../../components/kids/AllergyBox";
import { InfoRows } from "../../components/kids/InfoRows";
import { DaySummaryButton } from "../../components/kids/DaySummaryButton";
import { LinkedParentsSection } from "../../components/kids/LinkedParentsSection";
import { getKidProfile } from "../../data/kids";

export default async function KidProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const profile = getKidProfile(id);

  if (!profile) {
    notFound();
  }

  const infoRows = [
    { label: "Fecha de nacimiento", value: profile.birthDate },
    { label: "Sala", value: profile.room },
    { label: "Ingreso", value: profile.admissionDate },
  ];

  return (
    <div className="flex min-h-screen bg-[var(--color-background)]">
      <SidebarWithUser currentPath="/kids" />

      <main className="flex-1 min-w-0 h-screen overflow-y-auto">
        <div
          className="mx-auto w-full"
          style={{ maxWidth: 820, padding: "34px 40px 80px" }}
        >
          <Link
            href="/kids"
            className="flex items-center gap-[7px] text-[#94887B] font-bold text-[14px] mb-5"
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
              <path d="m15 18-6-6 6-6" />
            </svg>
            Volver a Niños
          </Link>

          <div className="flex gap-[26px] items-start flex-wrap">
            <div className="flex-1 min-w-[300px] flex flex-col gap-[18px]">
              <KidProfileHeader
                name={profile.name}
                age={profile.age}
                room={profile.room}
                initial={profile.initial}
                avatarBg={profile.avatarBg}
                avatarColor={profile.avatarColor}
              />

              {profile.allergies && <AllergyBox content={profile.allergies} />}

              <InfoRows rows={infoRows} />
            </div>

            <div className="w-[300px] flex-none flex flex-col gap-[14px]">
              <DaySummaryButton />
              <LinkedParentsSection childName={profile.name} parents={profile.parents} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
