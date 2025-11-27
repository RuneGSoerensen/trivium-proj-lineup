"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { NoteCard } from "@/app/components/profile/note-card";

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [notes, setNotes] = useState([]);
  const [activeTab, setActiveTab] = useState("about");
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    loadProfile();
  }, [params.id]);

  const loadProfile = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/users/${params.id}`
      );
      if (!res.ok) throw new Error("Failed to load user");

      const { user: userData } = await res.json();

      const currentUser = localStorage.getItem("userId");
      setCurrentUserId(currentUser);

      // Fetch connection stats
      const statsRes = await fetch(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/connections/${params.id}/stats`
      );
      const statsData = await statsRes.json();

      // Check if current user is following
      let isFollowing = false;
      if (currentUser) {
        const followingRes = await fetch(
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/connections/${currentUser}/following/${params.id}`
        );
        isFollowing = followingRes.ok;
      }

      setProfile({
        ...userData,
        followers_count: statsData.followers_count || 0,
        following_count: statsData.following_count || 0,
        is_following: isFollowing,
        is_own_profile: currentUser === params.id,
      });

      // Load notes
      const notesRes = await fetch(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/notes/user/${params.id}`
      );
      if (notesRes.ok) {
        const notesData = await notesRes.json();
        setNotes(notesData);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error loading profile:", error);
      setLoading(false);
    }
  };

  const handleFollow = async () => {
    if (!currentUserId) return;

    try {
      if (profile?.is_following) {
        await fetch(
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/connections/unfollow`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              follower_id: currentUserId,
              following_id: params.id,
            }),
          }
        );
      } else {
        await fetch(
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/connections/follow`,
          {
            method: "note",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              follower_id: currentUserId,
              following_id: params.id,
            }),
          }
        );
      }

      loadProfile();
    } catch (error) {
      console.error("Error toggling follow:", error);
    }
  };

  const handleLike = async (noteId) => {
    if (!currentUserId) return;

    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/notes/${noteId}/like`,
        {
          method: "note",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: currentUserId }),
        }
      );

      loadProfile();
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleComment = async (noteId, content) => {
    if (!currentUserId) return;

    try {
      await fetch(`${process.env.NEXT_PUBLIC_DATABASE_URL}/notes/comment`, {
        method: "note",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: currentUserId,
          note_id: noteId,
          content,
        }),
      });

      loadProfile();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-muted">Loading...</div>
      </div>
    );

  if (!profile)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-muted">Profile not found</div>
      </div>
    );
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Profile Header */}
      <div
        className="relative px-4 pt-8 pb-6"
        style={{ backgroundColor: profile.theme }}
      >
        <div className="flex flex-col items-center">
          {/* Stats */}
          <div className="flex items-center gap-8 mb-4 text-inverse">
            <div className="text-center">
              <p className="text-[24px] font-bold">{profile.followers_count}</p>
              <p className="text-[13px] opacity-80">Followers</p>
            </div>
            <div className="w-24 h-24 rounded-full bg-default overflow-hidden border-4 border-white/20">
              {profile.image_url ? (
                <Image
                  src={profile.image_url || "/placeholder.svg"}
                  alt={profile.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted text-[32px] font-bold">
                  {profile.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="text-center">
              <p className="text-[24px] font-bold">{profile.following_count}</p>
              <p className="text-[13px] opacity-80">Following</p>
            </div>
          </div>

          {/* Name */}
          <h1 className="text-inverse text-[20px] font-bold mb-6">
            {profile.name}
          </h1>

          {/* Action Buttons */}
          {profile.is_own_profile ? (
            <button
              onClick={() => router.push("/pages/profile/edit")}
              className="w-full max-w-[200px] px-6 py-3 rounded-[16px] bg-default/20 backdrop-blur-sm text-inverse font-semibold text-[15px] border border-white/30"
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={handleFollow}
                className={`px-8 py-3 rounded-[16px] font-semibold text-[15px] ${
                  profile.is_following
                    ? "bg-default/20 backdrop-blur-sm text-inverse border border-white/30"
                    : "bg-brand-primary text-default"
                }`}
              >
                {profile.is_following ? "Following" : "Follow"}
              </button>
              <button className="px-8 py-3 rounded-[16px] bg-default/20 backdrop-blur-sm text-inverse font-semibold text-[15px] border border-white/30">
                Message
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-default border-b border-muted/20">
        <button
          onClick={() => setActiveTab("about")}
          className={`flex-1 py-4 text-[15px] font-semibold ${
            activeTab === "about"
              ? "text-default border-b-2 border-brand-primary"
              : "text-muted"
          }`}
        >
          About
        </button>
        <button
          onClick={() => setActiveTab("notes")}
          className={`flex-1 py-4 text-[15px] font-semibold ${
            activeTab === "notes"
              ? "text-default border-b-2 border-brand-primary"
              : "text-muted"
          }`}
        >
          Notes
        </button>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {activeTab === "about" ? (
          <div className="space-y-6">
            {/* Bio */}
            {profile.bio && (
              <div className="bg-default rounded-[24px] p-5 border-muted">
                <p className="text-default text-[15px] leading-relaxed">
                  {profile.bio}
                </p>
              </div>
            )}

            {/* About */}
            {profile.about && (
              <div className="bg-default rounded-[24px] p-5 border-muted">
                <h3 className="text-default font-semibold text-[16px] mb-2">
                  About
                </h3>
                <p className="text-default text-[15px] leading-relaxed">
                  {profile.about}
                </p>
              </div>
            )}

            {/* Genres */}
            {profile.genres && profile.genres.length > 0 && (
              <div className="bg-default rounded-[24px] p-5 border-muted">
                <h3 className="text-default font-semibold text-[16px] mb-3">
                  Genres
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile.genres.map((genre, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 rounded-[12px] bg-muted text-default text-[14px] font-medium"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Looking For */}
            {profile.looking_for_tags &&
              profile.looking_for_tags.length > 0 && (
                <div className="bg-default rounded-[24px] p-5 border-muted">
                  <h3 className="text-default font-semibold text-[16px] mb-3">
                    Looking For
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.looking_for_tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 rounded-[12px] bg-muted text-default text-[14px] font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            {/* Social Links */}
            {profile.socials &&
              profile.socials.length > 0 &&
              profile.socials[0] && (
                <div className="bg-default rounded-[24px] p-5 border-muted">
                  <h3 className="text-default font-semibold text-[16px] mb-3">
                    Social Media
                  </h3>
                  <div className="flex gap-4">
                    {profile.socials[0].instagram && (
                      <a
                        href={profile.socials[0].instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          <span className="text-[20px]">📷</span>
                        </div>
                      </a>
                    )}
                    {profile.socials[0].x && (
                      <a
                        href={profile.socials[0].x}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          <span className="text-[20px]">𝕏</span>
                        </div>
                      </a>
                    )}
                    {profile.socials[0].tiktok && (
                      <a
                        href={profile.socials[0].tiktok}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          <span className="text-[20px]">🎵</span>
                        </div>
                      </a>
                    )}
                    {profile.socials[0].spotify && (
                      <a
                        href={profile.socials[0].spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          <span className="text-[20px]">🎧</span>
                        </div>
                      </a>
                    )}
                    {profile.socials[0].youtube && (
                      <a
                        href={profile.socials[0].youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          <span className="text-[20px]">▶️</span>
                        </div>
                      </a>
                    )}
                  </div>
                </div>
              )}

            {/* Questions */}
            {profile.questions && profile.questions.length > 0 && (
              <div className="bg-default rounded-[24px] p-5 border-muted">
                <h3 className="text-default font-semibold text-[16px] mb-4">
                  Questions
                </h3>
                <div className="space-y-4">
                  {profile.questions.map((q, idx) => (
                    <div key={idx}>
                      <p className="text-muted text-[14px] mb-1">
                        {q.question}
                      </p>
                      <p className="text-default text-[15px]">{q.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {notes.length > 0 ? (
              notes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onLike={handleLike}
                  onComment={handleComment}
                  showComments={true}
                />
              ))
            ) : (
              <div className="bg-default rounded-[24px] p-8 border-muted text-center">
                <p className="text-muted">No notes yet</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
