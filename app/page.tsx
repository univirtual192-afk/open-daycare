"use client";

import { useState } from "react";
import { SidebarWithUserClient } from "./components/feed/SidebarWithUserClient";
import { FeedContent } from "./components/feed/FeedContent";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[var(--color-background)]">
      <SidebarWithUserClient currentPath="/" onNewPostClick={() => setModalOpen(true)} />

      <FeedContent
        modalOpen={modalOpen}
        onCloseModal={() => setModalOpen(false)}
      />
    </div>
  );
}
