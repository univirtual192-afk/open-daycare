import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { Sidebar, type SidebarUser } from "@/app/components/feed/Sidebar";
import type { CSSProperties } from "react";

interface SidebarWithUserProps {
  className?: string;
  style?: CSSProperties;
  currentPath?: string;
}

async function getUser(): Promise<SidebarUser | null> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("users")
    .select("full_name, role, daycare_id")
    .eq("id", user.id)
    .single();

  if (!profile) return null;

  let daycareName = "Soles";
  if (profile.daycare_id) {
    const { data: daycare } = await supabase
      .from("daycares")
      .select("name")
      .eq("id", profile.daycare_id)
      .single();
    if (daycare) daycareName = daycare.name;
  }

  return {
    fullName: profile.full_name,
    role: profile.role,
    daycareName,
  };
}

export async function SidebarWithUser(props: SidebarWithUserProps) {
  const user = await getUser();

  return <Sidebar {...props} user={user ?? undefined} />;
}
