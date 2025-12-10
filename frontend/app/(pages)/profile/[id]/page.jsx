"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { authenticatedFetch } from "@/utils/auth.js";
import {
  TabContent,
  TabContentList,
  TabItem,
  Tabs,
  TabsList,
} from "@/ui/Tab/Tab";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileAbout from "@/components/profile/ProfileAbout";
import ProfileNotes from "@/components/profile/ProfileNotes";
import { getUserId } from "@/utils/auth";

const HARD_ARTISTS = [
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
  "https://images.unsplash.com/photo-1723425715501-d19c1c5b02e9?q=80&w=692&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=200&q=80",
  "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?w=200&q=80",
  "https://images.unsplash.com/photo-1544005310-8d8d2c1a6f3f?w=200&q=80",
];

const HARD_SPOTIFY_LINK = "https://open.spotify.com/artist/placeholder";
const HARD_VIDEOS = [
  "https://youtu.be/G19UqSnNuO8",
  "https://youtu.be/G19UqSnNuO8",
];
const HARD_PAST_COLLABS = ["Band A", "Band B"];

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    if (params?.id) loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.id]);

  const loadProfile = async () => {
    try {
      const res = await authenticatedFetch(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/users/${params.id}`
      );
      if (!res.ok) throw new Error("Failed to load user");

      const { user: userData } = await res.json();
      const currentUser = getUserId();
      setCurrentUserId(currentUser);

      const statsRes = await authenticatedFetch(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/connections/${params.id}/stats`
      );
      const statsData = (await statsRes.json()) || {};

      let isFollowing = false;
      if (currentUser) {
        const followingRes = await authenticatedFetch(
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/connections/${currentUser}/following/${params.id}`
        );
        isFollowing = followingRes.ok;
      }

      setProfile({
        ...userData,
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

      const notesRes = await authenticatedFetch(
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

  const handleClick = async (questionText) => {
    if (!currentUserId || !questionText.trim()) return;

    try {
      // Submit question to backend with blank answer
      const res = await authenticatedFetch(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/users/${params.id}/questions`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: questionText,
            answer: "",
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to submit question");

      // Reload profile to show the new question
      await loadProfile();
      alert("Question submitted successfully!");
    } catch (error) {
      console.error("Error submitting question:", error);
      alert("Failed to submit question. Please try again.");
    }
  };

  const handleFollow = async () => {
    if (!currentUserId) return;

    try {
      if (profile?.is_following) {
        await authenticatedFetch(
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
        await authenticatedFetch(
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-muted">Loading...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-muted">Profile not found</div>
      </div>
    );
  }

  return (
    <div className="w-full  ">
      <ProfileHeader
        profile={profile}
        notesLength={notes.length}
        onFollow={handleFollow}
        router={router}
      />

      <Tabs className="bg-white">
        <TabsList className="bg-white rounded-b-none w-full" hasSeparator>
          <TabItem>About</TabItem>

          <TabItem>Notes</TabItem>
        </TabsList>
        <TabContentList className="bg-white">
          <TabContent>
            <ProfileAbout profile={profile} onQuestionSubmit={handleClick} />
          </TabContent>
          <TabContent className={"!p-0"}>
            <ProfileNotes notes={notes} />
          </TabContent>
        </TabContentList>
      </Tabs>
    </div>
  );
}
