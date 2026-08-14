"use client";

import { useEffect, useState } from "react";
import { Sidebar, type SidebarUser } from "@/app/components/feed/Sidebar";
import { createClient } from "@/utils/supabase/client";
import type { CSSProperties } from "react";

interface SidebarWithUserClientProps {
  className?: string;
  style?: CSSProperties;
  currentPath?: string;
  onNewPostClick?: () => void;
}

export function SidebarWithUserClient({
  onNewPostClick,
  ...rest
}: SidebarWithUserClientProps) {
  const [user, setUser] = useState<SidebarUser | null>(null);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) return;

      supabase
        .from("users")
        .select("full_name, role, daycare_id")
        .eq("id", session.user.id)
        .single()
        .then(({ data: profile }) => {
          if (!profile) return;

          let daycareName = "Soles";
          if (profile.daycare_id) {
            supabase
              .from("daycares")
              .select("name")
              .eq("id", profile.daycare_id)
              .single()
              .then(({ data: daycare }) => {
                if (daycare) daycareName = daycare.name;
                setUser({
                  fullName: profile.full_name,
                  role: profile.role,
                  daycareName,
                });
              });
          } else {
            setUser({
              fullName: profile.full_name,
              role: profile.role,
              daycareName,
            });
          }
        });
    });
  }, []);

  return <Sidebar {...rest} user={user ?? undefined} onNewPostClick={onNewPostClick} />;
}
