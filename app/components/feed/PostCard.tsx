import type { CSSProperties } from "react";
import type { PostType } from "./PostBadge";
import { Avatar } from "./Avatar";
import { PostBadge } from "./PostBadge";
import { PostActions } from "./PostActions";
import { PhotoPlaceholder } from "./PhotoPlaceholder";

export interface FeedPost {
  id: string;
  author: string;
  initial?: string;
  avatarBg: string;
  avatarColor: string;
  time: string;
  publishedByLabel: string;
  type: PostType;
  audience: string;
  content: string;
  likes: number;
  comments: number;
  hasPhoto?: boolean;
  photoLabel?: string;
}

interface PostCardProps {
  post: FeedPost;
  className?: string;
  style?: CSSProperties;
}

function AnnouncementAvatarIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 11 18-5v12L3 14v-3zM11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </svg>
  );
}

export function PostCard({ post, className = "", style }: PostCardProps) {
  const isAnnouncement = post.type === "announcement";

  return (
    <article
      className={`bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[20px] px-[22px] py-5 ${className}`}
      style={{
        boxShadow: "0 4px 16px -12px rgba(120,90,60,.5)",
        ...style,
      }}
    >
      <header className="flex items-center gap-3 mb-[14px]">
        <Avatar
          initial={post.initial}
          bg={post.avatarBg}
          color={post.avatarColor}
          size={44}
          fontSize={17}
        >
          {isAnnouncement ? <AnnouncementAvatarIcon /> : undefined}
        </Avatar>

        <div className="flex-1 min-w-0">
          <div
            className="text-[16.5px] text-[var(--color-text)]"
            style={{ fontFamily: "var(--font-fredoka)", fontWeight: 600 }}
          >
            {post.author}
          </div>
          <div className="text-[12.5px] text-[var(--color-text-ghost)]">
            {post.time} · {post.publishedByLabel}
          </div>
        </div>

        <PostBadge type={post.type} />
      </header>

      <div className="text-[12.5px] text-[var(--color-text-ghost)] mb-2.5">
        Para: {post.audience}
      </div>

      <p className="text-[15.5px] leading-[1.55] text-[var(--color-text-soft)] m-0">
        {post.content}
      </p>

      {post.hasPhoto ? <PhotoPlaceholder label={post.photoLabel} /> : null}

      <div
        className="mt-4 pt-[14px] border-t border-[var(--color-border-soft)]"
      >
        <PostActions likes={post.likes} comments={post.comments} />
      </div>
    </article>
  );
}

export default PostCard;