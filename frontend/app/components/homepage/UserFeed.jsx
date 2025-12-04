"use client";
import NoteCard from "../note/noteCard";
import { useState, useEffect } from "react";

export default function UserFeed() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchNotes = async (currentOffset) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/notes/for-you?offset=${currentOffset}`,
        {
          cache: "no-store",
        }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch notes");
      }
      const data = await res.json();
      return data || [];
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    const loadInitialNotes = async () => {
      try {
        const data = await fetchNotes(0);
        setNotes(data);
        setHasMore(data.length === 5);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadInitialNotes();
  }, []);

  const loadMore = async () => {
    setLoadingMore(true);
    try {
      const newOffset = offset + 5;
      const newNotes = await fetchNotes(newOffset);
      setNotes([...notes, ...newNotes]);
      setOffset(newOffset);
      setHasMore(newNotes.length === 5);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingMore(false);
    }
  };

  console.log("UserFeed notes:", notes);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (notes.length === 0) return <div>No notes found</div>;

  return (
    <div className="flex flex-col gap-16">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} showComments={false} />
      ))}
      {hasMore && (
        <button
          onClick={loadMore}
          disabled={loadingMore}
          className="btn btn-primary w-full"
        >
          {loadingMore ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}
