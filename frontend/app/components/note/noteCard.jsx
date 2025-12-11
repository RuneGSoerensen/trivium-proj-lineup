"use client";

import { useState } from "react";
import Image from "next/image";
import {
  MoreHorizontal,
  Heart,
  Forward,
  Upload,
  ArrowUp,
  MessagesSquare,
  Repeat2,
} from "lucide-react";
import { Tag } from "@/ui/Tag/Tag";
import { CommentItem } from "./CommentItem";
import { authenticatedFetch, getUserId } from "@/utils/auth";
import { formatTimeAgo } from "@/utils/timeAgo";
import { Button } from '@/ui/Button/Button';
import Input from "../ui/Input/Input";

import { authenticatedFetch } from "@/utils/auth.js";
export default function NoteCard({ note, showComments = false }) {
  const [commentText, setCommentText] = useState(""); // main input
  const [commentsOpen, setCommentsOpen] = useState(showComments);
  const [localLiked, setLocalLiked] = useState(note.is_liked ?? 0);
  const [localLikesCount, setLocalLikesCount] = useState(
    parseInt(note.likes_count ?? 0)
  );
  const [localComments, setLocalComments] = useState(note.comments ?? []);

  const apiBase =
    process.env.NEXT_PUBLIC_DATABASE_URL || "http://localhost:3300";

  const refreshNoteData = async () => {
    try {
      // fetch all notes for the note owner and find this note
      const res = await authenticatedFetch(
        `${apiBase}/notes/user/${note.user_id}`
      );
      if (!res.ok) return;
      const notes = await res.json();
      const updated = notes.find((n) => n.id === note.id);
      if (!updated) return;
      setLocalComments(updated.comments ?? []);
      setLocalLikesCount(parseInt(updated.likes_count ?? 0));
      setLocalLiked(updated.is_liked ?? 0);
    } catch (err) {
      console.error("refreshNoteData error", err);
    }
  };

  const handleLike = async () => {
    const userId = getUserId();
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
    const userId = getUserId();
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

  return (
    <div className="py-10 gap-15 flex flex-col border-b border-muted/20 px-10">
      {/* HEADER */}
      <header className="flex items-center gap-10">
        <div className="flex items-center gap-10">
          <div className="w-20 h-20 rounded-full border border-muted overflow-hidden flex-shrink-0">
            {note.user_image ? (
              <Image
                src={note.user_image}
                alt={note.user_name}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            ) : (
              <p className="w-full h-full font-regular flex items-center justify-center color-muted">
                {note.user_name?.charAt(0)?.toUpperCase()}
              </p>
            )}
          </div>

          <p className="text-muted text-sm">{note.user_name}</p>
          {note.tags?.map((tag) => (
            <Tag
              key={tag}
              className="px-8 py-2 flex items-center bg-default border-gray-500 border text-gray-500 text-xs"
            >
              #<span className="color-subtle">{tag}</span>
            </Tag>
          ))}

        </div>
        <Button type="icon" variant="ghost" icon={<MoreHorizontal/>} iconSize="md" className="flex items-center ml-auto" />
      </header>

      {/* TITLE */}
      <h3 className="text-h3 font-semibold mb-3 ml-4">
        {note.title ?? "Title not provided"}
      </h3>

      <section className="flex flex-col gap-15">
        {/* IMAGE */}
        {note.image_url && (

          <Image
            src={note.image_url}
            alt="Post image"
            width={500}
            height={300}
            className="w-full h-auto max-h-450 object-cover border-muted shadow-md rounded-[20px]"
          />
        )}

        <footer className="flex flex-col items-start w-full">
          {/* CONTENT */}
          <p className="color-muted/60 font-light text-sm">{note.content}</p>
          <div className="flex justify-between py-9 w-full">
            <div className="flex items-center gap-14 w-full">

            {/* ACTIONS */}
            <Button
              size="icon-sm"
              iconSize="md"
              icon={<Heart />}
              variant="ghost"
              className={`color-subtle ${localLiked ? "color-red" : ""} pl-0!`}
              onClick={handleLike}
            >
              <p className="color-subtle">
                {localLikesCount}
              </p>
            </Button>

            <Button
              size="icon-sm"
              iconSize="md"
              icon={<MessagesSquare />}
              variant="ghost"
              onClick={handleReplyClick}
              className="color-subtle">
              <p>{localComments.length ?? 0}</p>
            </Button>

            <Button
              size="icon-sm"
              iconSize="md"
              icon={<Forward />}
              variant="ghost"
              className="color-subtle"

            />
            </div>
            {commentsOpen && (
              <Button
                size="icon-sm"
                iconSize="md"
                icon={<Repeat2 />}
                variant="ghost"
                className="color-subtle"
            />
            )}
          </div>
        </footer>
      </section>

      {/* COMMENT LIST */}

      {commentsOpen && (
        <div>
          {/* MAIN COMMENT INPUT */}
          <div className="mt-3 pt-3 border-t border-muted/20">
            <div className="relative items-center h-fit flex gap-2 rounded-lg pt-12">
              <Input
                type="iconBtn"
                placeholder="Leave a comment"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCommentSubmit()}
                className="w-12/12!"
              />
              <Button
                size="icon-sm"
                type="icon"
                iconSize="sm"
                icon={<ArrowUp />}
                onClick={handleCommentSubmit}
                className="absolute top-22  right-18! rounded-lg! border-none! p-4! bg-brand-primary color-default"
              />
            </div>
          </div>

          {/* COMMENTS LIST (only shown when there are comments) */}
          {localComments.length > 0 && (
            <div className="pt-12 border-t border-muted/20 space-y-3">
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
