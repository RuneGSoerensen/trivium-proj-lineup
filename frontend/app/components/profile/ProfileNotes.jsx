"use client";

import NoteCard from "@/components/note/noteCard";

export default function ProfileNotes({ notes }) {
  return (
    <div>
      {notes && notes.length > 0 ? (
        notes.map((n) => <NoteCard key={n.id} note={n} showComments={false} />)
      ) : (
        <div className="color-muted p-4">No notes yet.</div>
      )}
    </div>
  );
}
