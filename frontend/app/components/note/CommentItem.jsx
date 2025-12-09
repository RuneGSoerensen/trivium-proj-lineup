"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, Reply, ArrowUp } from "lucide-react";

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
    const userId = localStorage.getItem("userId");
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
    const userId = localStorage.getItem("userId");
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
      className="flex gap-2"
      style={{ marginLeft: depth * 16 }}
    >
      {/* Comment Content */}
      <div className="flex-1">
        <div
          className={` ${
            depth > 0 ? "border-l border-gray-300" : ""
          } px-3 py-2`}
        >
          <div className="flex gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden ">
              {comment.user.image_url ? (
                <Image
                  src={comment.user.image_url || "/placeholder.svg"}
                  alt={comment.user.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted text-[12px] font-semibold">
                  {comment.user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <p className="text-default font-semibold text-[13px]">
              {comment.user.name}
            </p>
          </div>
          <p className="text-default text-[14px]">{comment.content}</p>
          <div className="flex items-center justify-end gap-3 mt-1 px-3">
            <button
              onClick={handleCommentLike}
              className="flex items-center gap-1.5"
            >
              <Heart
                size={24}
                strokeWidth={comment.is_liked ? 0 : 4}
                fill={comment.is_liked ? "red" : "none"}
                color={comment.is_liked ? "red" : "currentColor"}
              />
              <span className="text-muted text-[12px]">
                {comment.likes_count ?? 0}
              </span>
            </button>

            <button
              onClick={() => {
                setShowReplyInput(!showReplyInput);
                setReplyText("");
              }}
              className="text-muted text-[12px] font-semibold flex items-center gap-1"
            >
              <Reply />
              {depth <= 0 && <p>reply</p>}
            </button>
          </div>
        </div>

        {/* REPLY INPUT */}
        {showReplyInput && (
          <div className="mt-2 ml-10">
            <div className="flex gap-2 rounded-lg border border-muted p-2">
              <input
                type="text"
                placeholder={`Reply to ${comment.user.name}`}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleReplySubmit()}
                className="flex-1 px-3 py-2"
              />
              <button
                onClick={handleReplySubmit}
                className="px-3 py-2 bg-brand-primary text-white rounded-lg"
              >
                <ArrowUp size={16} strokeWidth={3} />
              </button>
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
