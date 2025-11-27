"use client";

import { useState } from "react";
import Image from "next/image";
import { MoreHorizontal, Heart, MessageSquare, Upload, ArrowUp } from "lucide-react";
import { Tag } from "@ui/Tag/Tag";
export default function NoteCard({ note, onLike, onComment, showComments = false }) {
 
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
    <div className=" p-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-20 h-20 rounded-full bg-muted overflow-hidden flex-shrink-0">
          {note.user_image ? (
            <Image
              src={note.user_image || "/placeholder.svg"}
              alt={note.user_name}
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
        
          <p className="text-muted text-[12px]">
            {note.user_name}
          </p>
   
        <Tag>tag added her</Tag>
        <button className="flex items-center ml-auto">
          <MoreHorizontal size={ 20} />
        </button>
      </div>


               <p className=" text-h3 font-semibold mb-3 ml-4">{note.title ?? "overskrift skal være her"}</p>


      {/* Image */}
      {note.image_url && (
        <div className="rounded-[20px] overflow-hidden mb-3">
          <Image
            src={note.image_url || "/placeholder.svg"}
            alt="Post image"
            width={500}
            height={300}
            className="w-full h-auto object-cover"
          />
        </div>
      )}
            {/* Content */}
          <p className="text-muted font-light m-4">
        {note.content}
      </p>

      {/* Actions */}
      <div className="flex items-center gap-16 text-muted text-[14px]">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 ${
            localLiked ? "text-red-500" : ""
          }`}
        >
          <Heart
            size={24}
            className={localLiked ? "text-red-500" : "text-current"}
            fill={localLiked ? "currentColor" : "none"}
            strokeWidth={4}
          />
        <span>{localLikesCount ?? "0"}</span>
        </button>
<div className="flex gap-4">
          <MessageSquare size={24} className="text-current" strokeWidth={4} />
<span>{note.comments_count ?? "0"}</span>
    </div>
        <button className="flex items-center gap-1.5">
          <Upload size={24} className="text-current" strokeWidth={4} />
        </button>
      </div>

      {/* Comment Input */}

        <div className="mt-3 pt-3 border-t border-muted/20">
          <div className="flex gap-2 rounded-lg border-1 border-muted">
            <input
              type="text"
              placeholder="Leave a comment"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 px-4 py-8   "
              onKeyDown={(e) => e.key === "Enter" && handleCommentSubmit()}
            />
            <button
              onClick={handleCommentSubmit}
              className=" rounded-[8px] bg-brand-primary m-10"
            >
              
              <ArrowUp size={24} strokeWidth={4} />
            </button>
          </div>
        </div>
 

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
