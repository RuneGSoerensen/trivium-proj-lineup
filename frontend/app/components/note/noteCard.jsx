"use client";

import { useState } from "react";
import Image from "next/image";
import {
  MoreHorizontal,
  Heart,
  MessageSquare,
  Upload,
  ArrowUp,
} from "lucide-react";
import { Tag } from "@/ui/Tag/Tag";
import { CommentItem } from "./CommentItem";

export default function NoteCard({ note, showComments = false }) {
  const [commentText, setCommentText] = useState(""); // main input
  const [commentsOpen, setCommentsOpen] = useState(showComments);
  const [localLiked, setLocalLiked] = useState(note.is_liked);
  const [localLikesCount, setLocalLikesCount] = useState(
    parseInt(note.likes_count ?? 0)
  );
  const [localComments, setLocalComments] = useState(note.comments ?? []);

  const apiBase =
    process.env.NEXT_PUBLIC_DATABASE_URL || "http://localhost:3300";

  const refreshNoteData = async () => {
    try {
      // fetch all notes for the note owner and find this note
      const res = await fetch(`${apiBase}/notes/user/${note.user_id}`);
      if (!res.ok) return;
      const notes = await res.json();
      const updated = notes.find((n) => n.id === note.id);
      if (!updated) return;
      setLocalComments(updated.comments ?? []);
      setLocalLikesCount(parseInt(updated.likes_count ?? 0));
      setLocalLiked(!!updated.is_liked);
    } catch (err) {
      console.error("refreshNoteData error", err);
    }
  };

  const handleLike = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("You must be logged in to like.");
      return;
    }

    try {
      await fetch(`${apiBase}/notes/${note.id}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId }),
      });

      // refresh counts
      await refreshNoteData();
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  // MAIN COMMENT SEND
  const handleCommentSubmit = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("You must be logged in to comment.");
      return;
    }

    if (!commentText.trim()) return;

    try {
      await fetch(`${apiBase}/notes/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          note_id: note.id,
          content: commentText.trim(),
        }),
      });

      setCommentText("");
      await refreshNoteData();
    } catch (err) {
      console.error("Error posting comment:", err);
      alert("Failed to post comment");
    }
  };

  // BUILD TREE
  const buildCommentTree = (comments = []) => {
    const nodes = comments.map((c) => ({ ...c, children: [] }));
    const map = {};
    nodes.forEach((n) => (map[n.id] = n));
    const roots = [];

    nodes.forEach((n) => {
      if (n.parent_comment_id) {
        const parent = map[n.parent_comment_id];
        if (parent) parent.children.push(n);
        else roots.push(n);
      } else {
        roots.push(n);
      }
    });

    return roots;
  };
  const handleReplyClick = () => {
    setCommentsOpen((s) => !s);
  };
  const commentTree = buildCommentTree(localComments);

  const formatTimeAgo = (date) => {
    const now = new Date();
    const created = new Date(date);
    const diff = Math.floor((now - created) / 1000);

    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
    return `${Math.floor(diff / 86400)}d`;
  };
  return (
    <div className="p-4">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-20 h-20 rounded-full bg-muted overflow-hidden flex-shrink-0">
          {note.user_image ? (
            <Image
              src={note.user_image}
              alt={note.user_name}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted font-semibold">
              {note.user_name?.charAt(0)?.toUpperCase()}
            </div>
          )}
        </div>

        <p className="text-muted text-[12px]">{note.user_name}</p>
        {note.tags?.map((tag) => (
          <Tag
            key={tag}
            className="px-8 py-2 flex items-center bg-white border-gray-500 border text-gray-500 text-xs"
          >
            #<span className="text-muted">{tag}</span>
          </Tag>
        ))}

        <button className="flex items-center ml-auto">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* TITLE */}
      <p className="text-h3 font-semibold mb-3 ml-4">
        {note.title ?? "overskrift skal være her"}
      </p>

      {/* IMAGE */}
      {note.image_url && (
        <div className="rounded-[20px] overflow-hidden mb-3">
          <Image
            src={note.image_url}
            alt="Post image"
            width={500}
            height={300}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {/* CONTENT */}
      <p className="text-muted font-light text-sm m-4">{note.content}</p>

      {/* ACTIONS */}
      <div className="flex items-center gap-16 text-muted text-[14px]">
        <button onClick={handleLike} className="flex items-center gap-1.5">
          <Heart
            size={24}
            strokeWidth={localLiked ? 0 : 4}
            fill={localLiked ? "red" : "none"}
            color={localLiked ? "red" : "currentColor"}
          />
          <span className={localLiked ? "text-red-500" : ""}>
            {localLikesCount}
          </span>
        </button>

        <button className="flex gap-4" onClick={handleReplyClick}>
          <MessageSquare size={24} strokeWidth={4} />
          <span>{localComments.length ?? 0}</span>
        </button>

        <button>
          <Upload size={24} strokeWidth={4} />
        </button>
      </div>

      {/* COMMENT LIST */}

      {commentsOpen && (
        <div>
          {/* MAIN COMMENT INPUT */}
          <div className="mt-3 pt-3 border-t border-muted/20">
            <div className="flex gap-2 rounded-lg border border-muted p-2">
              <input
                type="text"
                placeholder="Leave a comment"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCommentSubmit()}
                className="flex-1 px-3 py-2"
              />
              <button
                onClick={handleCommentSubmit}
                className="px-4 py-2 bg-brand-primary text-white rounded-lg"
              >
                <ArrowUp size={20} strokeWidth={4} />
              </button>
            </div>
          </div>

          {/* COMMENTS LIST (only shown when there are comments) */}
          {localComments.length > 0 && (
            <div className="mt-3 pt-3 border-t border-muted/20 space-y-3">
              {commentTree.map((c) => (
                <CommentItem
                  key={c.id}
                  comment={c}
                  depth={0}
                  noteId={note.id}
                  onRefresh={refreshNoteData}
                  formatTimeAgo={formatTimeAgo}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
