"use client";

import { useState } from "react";
import Image from "next/image";
import {
  MoreHorizontal,
  Heart,
  MessageSquare,
  Upload,
  ArrowUp,
  Reply,
} from "lucide-react";
import { Tag } from "@/ui/Tag/Tag";

// MOVE CommentItem OUTSIDE to prevent recreation on every render
const CommentItem = ({
  comment,
  depth = 0,
  replyTo,
  replyComment,
  setReplyTo,
  setReplyComment,
  handleReplySubmit,
  onCommentLike,
  formatTimeAgo,
}) => {
  return (
    <div
      key={comment.id}
      className="flex gap-2"
      style={{ marginLeft: depth * 16 }}
    >
      {/* Avatar */}

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
            {/*   <span className="text-muted text-[12px]">
              {formatTimeAgo(comment.created_at)}
            </span>*/}

            <button
              onClick={() => onCommentLike?.(comment.id)}
              className="flex items-center gap-1.5"
            >
              <Heart size={16} strokeWidth={3} />
              <span className="text-muted text-[12px]">
                {comment.likes_count ?? 0}
              </span>
            </button>

            <button
              onClick={() => {
                setReplyTo(comment);
                setReplyComment("");
              }}
              className="text-muted text-[12px] font-semibold flex items-center gap-1"
            >
              <Reply />
              {depth <= 0 && <p>reply</p>}
            </button>
          </div>
        </div>

        {/* REPLY INPUT */}
        {replyTo?.id === comment.id && (
          <div className="mt-2 ml-10">
            <div className="flex gap-2 rounded-lg border border-muted p-2">
              <input
                type="text"
                placeholder={`Reply to ${comment.user.name}`}
                value={replyComment}
                onChange={(e) => setReplyComment(e.target.value)}
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
                replyTo={replyTo}
                replyComment={replyComment}
                setReplyTo={setReplyTo}
                setReplyComment={setReplyComment}
                handleReplySubmit={handleReplySubmit}
                onCommentLike={onCommentLike}
                formatTimeAgo={formatTimeAgo}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default function NoteCard({
  note,
  onLike,
  onComment,
  onCommentLike,
  showComments = false,
}) {
  const [commentText, setCommentText] = useState(""); // main input
  const [replyComment, setReplyComment] = useState(""); // reply input
  const [replyTo, setReplyTo] = useState(null);
  const [commentsOpen, setCommentsOpen] = useState(showComments);
  const [localLiked, setLocalLiked] = useState(note.is_liked);
  const [localLikesCount, setLocalLikesCount] = useState(
    parseInt(note.likes_count ?? 0)
  );

  const handleLike = () => {
    setLocalLiked(!localLiked);
    setLocalLikesCount(localLiked ? localLikesCount - 1 : localLikesCount + 1);
    onLike?.(note.id);
  };

  // MAIN COMMENT SEND
  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      onComment?.(note.id, commentText, null);
      setCommentText("");
    }
  };

  // REPLY SEND
  const handleReplySubmit = () => {
    if (!replyComment.trim() || !replyTo) return;

    onComment?.(note.id, replyComment, replyTo.id);

    setReplyComment("");
    setReplyTo(null);
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
  const commentTree = note.comments ? buildCommentTree(note.comments) : [];

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
          {note.tags?.map((tag)=> (
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
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 ${
            localLiked ? "text-red-500" : ""
          }`}
        >
          <Heart
            size={24}
            strokeWidth={4}
            className={localLiked ? "text-red-500" : ""}
            fill={localLiked ? "currentColor" : "none"}
          />
          <span>{localLikesCount}</span>
        </button>

        <button className="flex gap-4" onClick={handleReplyClick}>
          <MessageSquare size={24} strokeWidth={4} />
          <span>{note.comments_count ?? "0"}</span>
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
          {note.comments?.length > 0 && (
            <div className="mt-3 pt-3 border-t border-muted/20 space-y-3">
              {commentTree.map((c) => (
                <CommentItem
                  key={c.id}
                  comment={c}
                  depth={0}
                  replyTo={replyTo}
                  replyComment={replyComment}
                  setReplyTo={setReplyTo}
                  setReplyComment={setReplyComment}
                  handleReplySubmit={handleReplySubmit}
                  onCommentLike={onCommentLike}
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
