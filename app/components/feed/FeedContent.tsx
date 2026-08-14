"use client";

import { FeedHeader } from "@/app/components/feed/FeedHeader";
import { ComposerBox } from "@/app/components/feed/ComposerBox";
import { PostCard, type FeedPost } from "@/app/components/feed/PostCard";
import { NewPostModal } from "@/app/components/feed/NewPostModal";

const POSTS: FeedPost[] = [
  {
    id: "post-logro-mateo",
    author: "Mateo",
    initial: "M",
    avatarBg: "var(--color-avatar-mateo-bg)",
    avatarColor: "var(--color-avatar-mateo)",
    time: "14:20",
    publishedByLabel: "publicado por vos",
    type: "achievement",
    audience: "familia de Mateo",
    content:
      "¡Usó el orinal solito por primera vez! Estaba feliz de contárselo a todos. Un gran paso.",
    likes: 3,
    comments: 1,
  },
  {
    id: "post-actividad-mateo",
    author: "Mateo",
    initial: "M",
    avatarBg: "var(--color-avatar-mateo-bg)",
    avatarColor: "var(--color-avatar-mateo)",
    time: "09:40",
    publishedByLabel: "publicado por vos",
    type: "activity",
    audience: "familia de Mateo",
    content:
      "Pintamos con témperas esta mañana. Mateo eligió el azul para todo y se concentró un montón mezclando colores.",
    likes: 5,
    comments: 2,
    hasPhoto: true,
    photoLabel: "Foto · pintando con témperas",
  },
  {
    id: "post-anuncio-general",
    author: "Anuncio general",
    avatarBg: "var(--color-avatar-anuncio-bg)",
    avatarColor: "var(--color-avatar-anuncio)",
    time: "07:50",
    publishedByLabel: "publicado por vos",
    type: "announcement",
    audience: "toda la sala",
    content:
      "El viernes salimos al parque por la mañana. Recuerden mandar gorra y una botellita de agua.",
    likes: 8,
    comments: 0,
  },
];

export function FeedContent({
  modalOpen,
  onCloseModal,
}: {
  modalOpen: boolean;
  onCloseModal: () => void;
}) {
  return (
    <>
      <main className="flex-1 min-w-0 h-screen overflow-y-auto">
        <div
          className="mx-auto w-full"
          style={{ maxWidth: 760, padding: "34px 40px 80px" }}
        >
          <FeedHeader />

          <ComposerBox />

          <div className="flex items-center gap-[14px] mb-[14px]">
            <span className="text-[12.5px] font-extrabold tracking-[.8px] text-[#8A7C6D]">
              PUBLICADO HOY
            </span>
            <span className="flex-1 h-px bg-[var(--color-divider)]" />
          </div>

          <div className="flex flex-col gap-4">
            {POSTS.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </main>

      <NewPostModal isOpen={modalOpen} onClose={onCloseModal} />
    </>
  );
}
