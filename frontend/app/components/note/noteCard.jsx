"use client";

import { useState } from "react";
import Image from "next/image";
import {
  MoreHorizontal,
  Heart,
  Forward,
  ArrowUp,
  MessagesSquare,
  Repeat2,
  Bookmark,
  Share,
  Eye,
  MessageCircleWarning,
} from "lucide-react";
import { Tag } from "@/ui/Tag/Tag";
import { CommentItem } from "./CommentItem";
import { authenticatedFetch, getUserId } from "@/utils/auth";
import { formatTimeAgo } from "@/utils/timeAgo";
import { Button } from '@/ui/Button/Button';
import Input from "@/ui/Input/Input";

export default function NoteCard({ note, showComments = false }) {
  const [commentText, setCommentText] = useState(""); // main input
  const [commentsOpen, setCommentsOpen] = useState(showComments);
  const [localLiked, setLocalLiked] = useState(!!note.is_liked);
  const [localLikesCount, setLocalLikesCount] = useState(
    parseInt(note.likes_count ?? 0)
  );
  const [localComments, setLocalComments] = useState(note.comments ?? []);
  const setOpen = () => {}; // placeholder for dropdown open state

  const apiBase =
    process.env.NEXT_PUBLIC_DATABASE_URL || "http://localhost:3300";

  const refreshNoteData = async () => {
    try {
      // fetch all notes for the note owner and find this note
      const currentUser = getUserId();
      const res = await authenticatedFetch(`${apiBase}/notes/user/${note.user_id}?viewer_id=${currentUser}`, {
        cache: "no-store",
      });
      if (!res.ok) return;
      const notes = await res.json();
      const updated = notes.find((n) => n.id === note.id);
      if (!updated) return;
      setLocalComments(updated.comments ?? []);
      setLocalLikesCount(parseInt(updated.likes_count ?? 0));
      setLocalLiked(!!updated.is_liked);

      console.log("updated.is_liked from backend:", updated.is_liked);
    } catch (err) {
      console.error("refreshNoteData error", err);
    }
  };

  const handleLike = async () => {
    const userId = await getUserId();
    if (!userId) {
      alert("You must be logged in to like.");
      return;
    }

    try {
      await authenticatedFetch(`${apiBase}/notes/${note.id}/like`, {
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
    const userId = await getUserId();
    if (!userId) {
      alert("You must be logged in to comment.");
      return;
    }

    if (!commentText.trim()) return;

    try {
      await authenticatedFetch(`${apiBase}/notes/comment`, {
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
  const userInitials = note.user_name
    ? note.user_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "?";
  
    const fallbackImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(userInitials)}&background=random&size=128`;

  return (
    <div className="py-10 gap-15 flex flex-col border-b border-muted/20">
      {/* HEADER */}
      <header className="flex items-center justify-between gap-10">
        <div className="flex items-center gap-10 truncate w-full">
          <div className="w-25 h-25 rounded-full border-muted overflow-hidden flex-shrink-0">
      
              <Image
                src={note.user_image ? note.user_image : fallbackImage}
                alt={note.user_name}
                width={100}
                height={100}
              className="w-full h-full object-cover"

              />

          </div>

          <p className="color-muted text-sm">{note.user_name}</p>
          {note.tags?.map((tag) => (
            <Tag
              key={tag}
              className="px-8 py-2 flex items-center bg-default border-gray-500 border text-gray-500 text-xs"
            >
              <span className="color-subtle">{tag}</span>
            </Tag>
          ))}

        </div>
        <Button
          type="dropdown"
          variant="ghost"
          icon={<MoreHorizontal />}
          iconSize="md"
          className="flex items-center ml-auto w-24!"
          dropRight={true}
          dropdownClassName="w-fit! min-w-150! right-0! trvm-glass-dark py-12 rounded-xl!"
          dropdownitems={
            <div className="flex flex-col w-full gap-8 items-start justify-center">
              <Button
                icon={<Bookmark />}
                iconSize="lg"
                variant="ghost"
                size="icon-lg"
                className="w-full justify-start rounded-md color-inverse hover:bg-muted/20 "
                onClick={ () => alert("Save note feature coming soon!") }
              >
                Save note
              </Button>
              <Button
                icon={<Share />}
                iconSize="lg"
                variant="ghost"
                size="icon-lg"
                className="w-full justify-start rounded-md color-inverse hover:bg-muted/20 "
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${window.location.origin}/notes/${note.id}`
                  );
                  alert("Note link copied to clipboard!");
                  setOpen(false);
                }}
              >
                Share note
              </Button>
              <Button
                icon={<Eye />}
                iconSize="lg"
                variant="ghost"
                size="icon-lg"
                className="w-full justify-start rounded-md color-inverse hover:bg-muted/20 "
                onClick={() => alert("Hide notes feature coming soon!")}
              >
                Hide notes from this user
              </Button>
              <Button
                icon={<MessageCircleWarning />}
                iconSize="lg"
                size="icon-lg"
                variant="ghost"
                className="w-full justify-start rounded-md color-inverse hover:bg-muted/20 "
                onClick={() => alert("Report notes feature coming soon!")}
              >
                Report note
              </Button>

            </div>
          }
        />
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
            className="w-full h-full max-h-450 object-cover object-center border-muted shadow-md rounded-[20px]"
          />
        )}

        <footer className="flex flex-col items-start w-full">
          {/* CONTENT */}
          <p className="color-muted/60 font-light text-sm">{note.content}</p>
          <div className="flex justify-between py-9 w-full">
            <div className="flex items-center gap-8 w-full">

              {/* ACTIONS */}
              <Button
                type="icon"
                size="icon-sm"
                iconSize="lg"
                icon={<Heart fill={localLiked ? "var(--color-primary)" : "none"} stroke={localLiked ? "#d9b060" : "var(--color-neutral-medium)"} strokeWidth={1.5}/>}
                variant="ghost"
                className={`pl-0! hover:bg-transparent`}
                onClick={handleLike}
              >
                <p className="color-subtle">
                  {localLikesCount}
                </p>
              </Button>

              <Button
                type="icon"
                size="icon-sm"
                iconSize="lg"
                icon={<MessagesSquare stroke={commentsOpen ? "var(--color-primary-darker)" : "var(--color-neutral-medium)"} strokeWidth={1.5} />}
                variant="ghost"
                onClick={handleReplyClick}
                >
                <p className={commentsOpen ? "color-brand-darker" : ""}>{localComments.length ?? 0}</p>
              </Button>

              <Button
                type="icon"
                size="icon-sm"
                iconSize="lg"
                icon={<Forward strokeWidth={1.8} />}
                variant="ghost"
                className="color-subtle"

              />
            </div>
            {commentsOpen && (
              <Button
                type="icon"
                size="icon-sm"
                iconSize="lg"
                icon={<Repeat2 strokeWidth={1.5} />}
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
                type="text"
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
                className="absolute w-fit top-22 right-18! rounded-lg! border-none! p-4! bg-brand-primary color-default"
              />
            </div>
          </div>

          {/* COMMENTS LIST (only shown when there are comments) */}
          {localComments.length > 0 && (
            <div className="pt-12 space-y-3">
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
