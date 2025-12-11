"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, Reply, ArrowUp } from "lucide-react";
import { authenticatedFetch, getUserId } from "@/utils/auth";
import { Button } from "../ui/Button/Button";
import Input from "../ui/Input/Input";

export const CommentItem = ({
  comment,
  depth = 0,
  noteId,
  onRefresh,
  formatTimeAgo,
}) => {
  const [replyText, setReplyText] = useState("");
  const [showReplyInput, setShowReplyInput] = useState(false);

  const apiBase =
    process.env.NEXT_PUBLIC_DATABASE_URL || "http://localhost:3300";

  const handleReplySubmit = async () => {
    const userId = await getUserId();
    if (!userId) {
      alert("You must be logged in to reply.");
      return;
    }

    if (!replyText.trim()) return;

    try {
      await authenticatedFetch(`${apiBase}/notes/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          note_id: noteId,
          content: replyText.trim(),
          parent_comment_id: comment.id,
        }),
      });

      setReplyText("");
      setShowReplyInput(false);
      await onRefresh();
    } catch (err) {
      console.error("Error posting reply:", err);
      alert("Failed to post reply");
    }
  };

  const handleCommentLike = async () => {
    const userId = await getUserId();
    if (!userId) {
      alert("You must be logged in to like comments.");
      return;
    }

    try {
      await authenticatedFetch(`${apiBase}/notes/comment/${comment.id}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId }),
      });

      await onRefresh();
    } catch (err) {
      console.error("Error liking comment:", err);
    }
  };
  return (
    <div
      key={comment.id}
      className="flex gap-2 mt-4"
      style={{ marginLeft: depth * 12 }}
    >
      {/* Comment Content */}
      <div className="flex-1 flex flex-col p-4 rounded-lg">
        <div
          className={` ${depth > 0 ? " border-l border-l-muted/20" : ""
            } pl-10 my-4`}
        >
          <div className="flex gap-6 items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden border-muted flex-shrink-0">
              {comment.user.image_url ? (
                <Image
                  src={comment.user.image_url || "/placeholder.svg"}
                  alt={comment.user.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center color-muted text-sm">
                  <p> {comment.user.name.charAt(0).toUpperCase()}</p>
                </div>
              )}
            </div>
            <p className="color-subtle font-semibold text-body">
              {comment.user.name}
            </p>

            <p className="text-default text-sm">{comment.content}</p>

          </div>
          <div className="flex items-center justify-end gap-2 px-3">

            <Button
              size="icon-sm"
              iconSize="lg"
              icon={<Heart fill={comment.is_liked ? "var(--color-primary)" : "none"} stroke={comment.is_liked ? "var(--color-primary-darker)" : "var(--color-neutral-medium)"} strokeWidth={1.5} />}
              variant="ghost"
              className={`hover:bg-transparent `}
              onClick={handleCommentLike}
            >
              <p className="color-subtle">
                {comment.likes_count ?? 0}
              </p>
            </Button>

            <Button
              variant="ghost"
              size="icon-sm"
              iconSize="lg"
              icon={<Reply strokeWidth={1.5} />}
              onClick={() => {
                setShowReplyInput(!showReplyInput);
                setReplyText("");
              }}
              className="color-subtle flex items-center gap-8 hover:bg-transparent"
            >
              {depth <= 0 && <p>Reply</p>}
            </Button>
          </div>
        </div>

        {/* REPLY INPUT */}
        {showReplyInput && (
          <div className="mt-2 ml-10">
            <div className="relative items-center h-fit flex gap-2 rounded-lg pb-12">

              <Input
                type="icon"
                placeholder={`Reply to ${comment.user.name}`}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleReplySubmit()}
                className="w-12/12!"

              />
              <Button
                size="icon-sm"
                type="icon"
                iconSize="sm"
                icon={<ArrowUp />}
                onClick={handleReplySubmit}
                className="absolute top-12 right-18! rounded-lg! border-none! p-4! bg-brand-primary color-default"
              />
            </div>
          </div>
        )}

        {/* CHILDREN */}
        {comment.children?.length > 0 && (
          <div className="mt-2 space-y-2">
            {comment.children.map((child) => (
              <CommentItem
                key={child.id}
                comment={child}
                depth={depth + 1}
                noteId={noteId}
                onRefresh={onRefresh}
                formatTimeAgo={formatTimeAgo}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
