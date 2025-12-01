"use client";

import NoteCard from "@/components/profile/noteCard";

export default function ProfileNotes({
  notes,
  onLike,
  onComment,
  onCommentLike,
}) {
  return (
    <div>
      {notes && notes.length > 0 ? (
        notes.map((n) => (
          <NoteCard
            key={n.id}
            note={n}
            onLike={onLike}
            onComment={onComment}
            onCommentLike={onCommentLike}
            showComments={false}
          />
        ))
      ) : (
        <div className="text-muted p-4">No notes yet.</div>
      )}
    </div>
  );
}
