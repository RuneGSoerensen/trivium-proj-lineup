"use client";

import { useState } from "react";
import Image from "next/image";

export function NoteCard({ note, onLike, onComment, showComments = false }) {
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [localLiked, setLocalLiked] = useState(note.is_liked);
  const [localLikesCount, setLocalLikesCount] = useState(note.likes_count);

  const handleLike = () => {
    setLocalLiked(!localLiked);
    setLocalLikesCount(localLiked ? localLikesCount - 1 : localLikesCount + 1);
    onLike?.(note.id);
  };

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      onComment?.(note.id, commentText);
      setCommentText("");
      setShowCommentInput(false);
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const noteDate = new Date(date);
    const diffInSeconds = Math.floor(
      (now.getTime() - noteDate.getTime()) / 1000
    );

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    return `${Math.floor(diffInSeconds / 86400)}d`;
  };

  return (
    <div className="bg-default rounded-[24px] p-4 border-muted">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-muted overflow-hidden flex-shrink-0">
          {note.user.image_url ? (
            <Image
              src={note.user.image_url || "/placeholder.svg"}
              alt={note.user.name}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted font-semibold">
              {note.user.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="flex-1">
          <p className="text-default font-semibold text-[15px]">
            {note.user.name}
          </p>
          <p className="text-muted text-[13px]">
            {formatTimeAgo(note.created_at)}
          </p>
        </div>
        <button className="text-muted">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="5" r="1" />
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="19" r="1" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <p className="text-default text-[15px] mb-3 leading-relaxed">
        {note.content}
      </p>

      {/* Image */}
      {note.image_url && (
        <div className="rounded-[16px] overflow-hidden mb-3">
          <Image
            src={note.image_url || "/placeholder.svg"}
            alt="Post image"
            width={500}
            height={300}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-5 text-muted text-[14px]">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 ${
            localLiked ? "text-red-500" : ""
          }`}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={localLiked ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          {localLikesCount > 0 && <span>{localLikesCount}</span>}
        </button>
        <button
          onClick={() => setShowCommentInput(!showCommentInput)}
          className="flex items-center gap-1.5"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          {note.comments_count > 0 && <span>{note.comments_count}</span>}
        </button>
        <button className="flex items-center gap-1.5">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
        </button>
      </div>

      {/* Comment Input */}
      {showCommentInput && (
        <div className="mt-3 pt-3 border-t border-muted/20">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Leave a comment"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 px-3 py-2 rounded-[12px] bg-muted border-none text-[14px] text-default placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary"
              onKeyDown={(e) => e.key === "Enter" && handleCommentSubmit()}
            />
            <button
              onClick={handleCommentSubmit}
              className="px-4 py-2 rounded-[12px] bg-brand-primary text-default font-semibold text-[14px] hover:bg-brand-primary-hover"
            >
              Post
            </button>
          </div>
        </div>
      )}

      {/* Comments List */}
      {showComments && note.comments && note.comments.length > 0 && (
        <div className="mt-3 pt-3 border-t border-muted/20 space-y-3">
          {note.comments.map((comment) => (
            <div key={comment.id} className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-muted overflow-hidden flex-shrink-0">
                {comment.user.image_url ? (
                  <Image
                    src={comment.user.image_url || "/placeholder.svg"}
                    alt={comment.user.name}
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted text-[12px] font-semibold">
                    {comment.user.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="bg-muted rounded-[12px] px-3 py-2">
                  <p className="text-default font-semibold text-[13px]">
                    {comment.user.name}
                  </p>
                  <p className="text-default text-[14px]">{comment.content}</p>
                </div>
                <div className="flex items-center gap-3 mt-1 px-3">
                  <span className="text-muted text-[12px]">
                    {formatTimeAgo(comment.created_at)}
                  </span>
                  <button className="text-muted text-[12px] font-semibold">
                    Reply
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
