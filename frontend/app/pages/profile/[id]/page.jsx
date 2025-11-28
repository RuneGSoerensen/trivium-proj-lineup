"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@ui/Button/Button";
import NoteCard from "@/components/profile/noteCard";
import {
  TabContent,
  TabContentList,
  TabItem,
  Tabs,
  TabsList,
} from "@ui/Tab/Tab";
import { Tag } from "@ui/Tag/Tag.jsx";
const HARD_ARTISTS = [
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
  "https://images.unsplash.com/photo-1545996124-0d0d3a3a80b4?w=200&q=80",
  "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=200&q=80",
  "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?w=200&q=80",
  "https://images.unsplash.com/photo-1544005310-8d8d2c1a6f3f?w=200&q=80",
];

const HARD_SPOTIFY_LINK = "https://open.spotify.com/artist/placeholder";

const HARD_VIDEOS = ["video 1", "video 2"];

const HARD_PAST_COLLABS = ["Band A", "Band B"];
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
      console.log("Fetched user data:", userData);
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
        // fallbacks for UI-only fields so the profile page can display artists, music, videos, past collaborations
        artists_i_like:
          userData.artists_i_like && userData.artists_i_like.length > 0
            ? userData.artists_i_like
            : HARD_ARTISTS,
        my_music: userData.my_music || HARD_SPOTIFY_LINK,
        videos:
          userData.videos && userData.videos.length > 0
            ? userData.videos
            : HARD_VIDEOS,
        past_collaborations:
          userData.past_collaborations &&
          userData.past_collaborations.length > 0
            ? userData.past_collaborations
            : HARD_PAST_COLLABS,
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
            method: "POST",
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
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: currentUserId }),
        }
      );

      loadProfile();
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleComment = async (noteId, content, parent_comment_id = null) => {
    if (!currentUserId) return;

    try {
      await fetch(`${process.env.NEXT_PUBLIC_DATABASE_URL}/notes/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: currentUserId,
          note_id: noteId,
          content,
          parent_comment_id,
        }),
      });

      loadProfile();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleCommentLike = async (commentId) => {
    if (!currentUserId) return;

    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/notes/comment/${commentId}/like`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: currentUserId }),
        }
      );

      loadProfile();
    } catch (error) {
      console.error("Error liking comment:", error);
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
    <div className="min-h-screen   pb-20  ">
      {/* Profile Header */}
      <div
        className="relative px-4 pt-8 pb-6 rounded-3xl"
        style={{ backgroundColor: profile.theme }}
      >
        <div className="flex flex-col items-center">
          {/* Stats */}
          <div className="flex items-center gap-8 mb-4 text-inverse ">
            <div className="text-center">
              <p className="text-[24px] font-bold">{profile.followers_count}</p>
              <p className="text-[13px] opacity-80">Followers</p>
            </div>
            <div className=" rounded-full bg-default overflow-hidden border-4 border-white/20">
              {profile.image_url ? (
                <Image
                  src={profile.image_url || "/placeholder.svg"}
                  alt={profile.name}
                  width={200}
                  height={200}
                  className=" fit-object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted text-[32px] ">
                  <p>{profile.name.charAt(0).toUpperCase()}</p>
                </div>
              )}
            </div>
            <div className="text-center">
              <p className="text-[24px] font-bold">{profile.followers_count}</p>
              <p className="text-[13px] opacity-80">Notes</p>
            </div>
          </div>

          {/* Name */}
          <h1 className="text-inverse text-[20px] font-bold ">
            {profile.name}
          </h1>
          <p className="text-gray-200 text-xs mb-6"> {profile.bio}</p>
          {/* Action Buttons */}
          {profile.is_own_profile ? (
            <div className="flex ">
              <Button onClick={() => router.push("/pages/profile/edit")}>
                Edit Profile
              </Button>
              <Button>Share</Button>
            </div>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={handleFollow}
                className={`px-8 py-3 rounded-[16px] text-muted text-[15px] ${
                  profile.is_following
                    ? "bg-default/20 backdrop-blur-sm text-inverse border border-white/30"
                    : "bg-brand-primary text-default"
                }`}
              >
                {profile.is_following ? "Following" : "Follow"}
              </button>
              <button className="px-8 py-3 rounded-[16px] bg-default/20 backdrop-blur-sm text-inverse text-muted text-[15px] border border-white/30">
                Message
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <Tabs>
        <TabsList className="bg-white">
          <TabItem>About</TabItem>

          <TabItem>Notes</TabItem>
        </TabsList>
        <TabContentList className="mt-4">
          <TabContent>
            <div className="min-h-screen bg-background pb-20 px-4 py-6 space-y-6">
              {/* About */}
              <div className=" m-4 ">
                <label className="text-default text-muted mb-8 ">About</label>
                <div className="w-full ml-10">
                  <p>{profile.about}</p>
                </div>
              </div>

              {/* Looking For Tags */}
              <div className="m-4 ">
                <label className="text-default text-muted  mb-8 ">
                  What i am looking
                </label>

                {/* Pills for already selected tags */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {profile.looking_for_tags.map((tag) => (
                    <Tag
                      key={tag}
                      colorScheme="info"
                      className="px-8 py-2 flex items-center gap-1"
                    >
                      {tag}
                    </Tag>
                  ))}
                </div>

                {/* Dropdown to select more tags */}
              </div>

              {/* Genres */}

              <div className=" m-4 ">
                <label className="text-default text-muted  mb-8 ">Genres</label>

                <div className="flex flex-wrap gap-2 ml-10">
                  {profile.genres.map((g) => (
                    <Tag
                      key={g}
                      colorScheme="info"
                      className="px-8 py-2 flex items-center gap-1"
                    >
                      {g}
                    </Tag>
                  ))}
                </div>
              </div>

              {/* Theme */}

              {/* Social Links */}
              <div className="bg-default rounded-[24px] p-10  border-gray-300 mt-20 pb-20">
                <div className="flex items-center justify-between">
                  <label className="text-default text-muted  my-16 mx-4  ">
                    Social Media
                  </label>
                </div>

                <div className="flex items-center justify-center gap-10 mt-3 ">
                  <a
                    href={profile.socials.instagram || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="opacity-90 hover:opacity-100"
                  >
                    <Image
                      src="/icons/instagram.png"
                      alt="Instagram"
                      width={24}
                      height={24}
                      className="w-32 h-32"
                    />
                  </a>
                  <a
                    href={profile.socials.x || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="opacity-90 hover:opacity-100"
                  >
                    <Image
                      src="/icons/x.png"
                      alt="X"
                      width={24}
                      height={24}
                      className="w-32 h-32"
                    />
                  </a>
                  <a
                    href={profile.socials.youtube || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="opacity-90 hover:opacity-100"
                  >
                    <Image
                      src="/icons/youtube.png"
                      alt="YouTube"
                      width={24}
                      height={24}
                      className="w-32 h-32"
                    />
                  </a>
                  <a
                    href={profile.socials.tiktok || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="opacity-90 hover:opacity-100"
                  >
                    <Image
                      src="/icons/tiktok.png"
                      alt="TikTok"
                      width={24}
                      height={24}
                      className="w-32 h-32"
                    />
                  </a>
                  <a
                    href={profile.socials.facebook || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="opacity-90 hover:opacity-100"
                  >
                    <Image
                      src="/icons/facebook.png"
                      alt="Facebook"
                      width={24}
                      height={24}
                      className="w-32 h-32"
                    />
                  </a>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-default text-muted  my-16 mx-4  ">
                    Artists i like
                  </label>
                </div>
                <div className="flex items-center justify-center">
                  {profile.artists_i_like.slice(0, 4).map((src, i) => (
                    <div
                      key={i}
                      className="w-50 h-50 rounded-full overflow-hidden border border-2 border-white "
                      style={{
                        marginLeft: i === 0 ? 0 : -20,
                        zIndex: i + 1,
                      }}
                    >
                      <img
                        src={src}
                        alt={`artist-${i}`}
                        className="w-full h-full object-cover position"
                      />
                    </div>
                  ))}

                  {profile.artists_i_like.length > 4 && (
                    <div
                      className="w-50 h-50 rounded-full bg-muted flex items-center justify-center text-default"
                      style={{
                        marginLeft: -20,
                        zIndex: 5,
                      }}
                    >
                      +{profile.artists_i_like.length - 4}
                    </div>
                  )}
                </div>
              </div>

              {/* My music (spotify card) */}

              <div className=" m-4">
                <label className="text-default text-muted  my-16 mx-4 ">
                  My music
                </label>
                <p className="m-4">Spotify linked</p>
              </div>

              {/* Videos */}

              <label className="text-default text-muted  my-16 mx-4 ">
                {" "}
                Videos
              </label>

              <div className="flex gap-2 flex-wrap">
                {profile.videos.map((v, i) => (
                  <Tag key={i} className="px-8 py-2" colorScheme="info">
                    <span className="">{v}</span>
                  </Tag>
                ))}
              </div>

              {/* Past collaborations */}

              <div className="flex items-center ">
                <label className="text-default text-muted  my-16 mx-4 ">
                  Past collaborations
                </label>
              </div>

              {/* Questions */}

              <div className="flex items-center justify-between">
                <label className="text-default text-muted  my-16 mx-4 ">
                  Questions
                </label>
              </div>
              <div className="space-y-6">
                {profile.questions.map((q, idx) => (
                  <div key={idx} className="p-6 bg-default ">
                    <div className="flex justify-between items-start">
                      <h3 className="text-default text-semi-bold ">
                        {q.question || "Question"}
                      </h3>
                    </div>
                    <p className=" mt-3 mb-4 font-light">{q.answer || ""}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <label htmlFor="questionInput" className="text-lg p-10">
                  Ask me a question
                </label>
                <div className="w-full border-1 rounded-full flex flex">
                  <input
                    type="text"
                    id="questionInput"
                    className="w-full  p-20"
                    placeholder="Type your question here..."
                  />
                  <Image
                    src={"/placeholder-image.png"}
                    width={40}
                    height={40}
                    alt="Placeholder"
                  />
                </div>
              </div>
            </div>
          </TabContent>
          <TabContent>
            <div className="space-y-4">
              {notes && notes.length > 0 ? (
                notes.map((n) => (
                  <NoteCard
                    key={n.id}
                    note={n}
                    onLike={handleLike}
                    onComment={handleComment}
                    onCommentLike={handleCommentLike}
                    showComments={true}
                  />
                ))
              ) : (
                <div className="text-muted p-4">No notes yet.</div>
              )}
            </div>
          </TabContent>
        </TabContentList>
      </Tabs>
    </div>
  );
}
