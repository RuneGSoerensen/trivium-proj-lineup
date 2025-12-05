"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import EditPicture from "../../../components/profile/edit/EditPicture";
import EditMainFields from "../../../components/profile/edit/EditMainFields";
import EditTagsGenresTheme from "../../../components/profile/edit/EditTagsGenresTheme";
import EditSocials from "../../../components/profile/edit/EditSocials";
import EditCollections from "../../../components/profile/edit/EditCollections";
import EditQuestions from "../../../components/profile/edit/EditQuestions";
import SaveBar from "../../../components/profile/edit/SaveBar";
import { getUserId } from "@/utils/auth";

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

export default function EditProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    about: "",
    image_url: "",
    theme: "#3F4254",
    genres: [],
    looking_for_tags: [],
    artists_i_like: [],
    my_music: "",
    videos: [],
    past_collaborations: [],
    socials: {
      instagram: "",
      x: "",
      tiktok: "",
      facebook: "",
      youtube: "",
    },
    questions: [],
  });

  const [allGenres, setAllGenres] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [showImageUrl, setShowImageUrl] = useState(false);
  const [showTagSelect, setShowTagSelect] = useState(false);
  const [showGenresEdit, setShowGenresEdit] = useState(false);
  const [showThemeEdit, setShowThemeEdit] = useState(false);
  const [showSocialEdit, setShowSocialEdit] = useState(false);
  const [showQuestionsEdit, setShowQuestionsEdit] = useState(false);

  const themeColors = [
    { name: "Blue", value: "#3F4254" },
    { name: "Cyan", value: "#3f4d54" },
    { name: "Grey", value: "#575252" },
    { name: "Pink", value: "#543f40" },
    { name: "Orange", value: "#5d4c43" },
  ];

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const genresRes = await fetch(
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/genres`
        );

        const tagsRes = await fetch(
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/looking_for_tags`
        );

        if (genresRes.ok) {
          const data = await genresRes.json();
          // Map objects to names
          setAllGenres(data.genres.map((g) => g.name));
        }

        if (tagsRes.ok) {
          const data = await tagsRes.json();

          // Keep full objects, not just names
          setAllTags(data.lookingForTags);
        }
      } catch (error) {
        console.error("Failed to load genres/tags", error);
      }
    };

    loadOptions();
  }, []);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const currentUser = getUserId();
      if (!currentUser) {
        router.push("/login");
        return;
      }
      setUserId(currentUser);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/users/${currentUser}`
      );
      if (!res.ok) throw new Error("Failed to load profile");

      const data = await res.json();

      if (data) {
        setFormData({
          name: data.user.name || "",
          bio: data.user.bio || "",
          about: data.user.about || "",
          image_url: data.user.image_url || "",
          theme: data.user.theme || "#3F4254",
          genres: data.user.genres || [],
          looking_for_tags: data.user.looking_for_tags || [],
          artists_i_like:
            data.user.artists_i_like && data.user.artists_i_like.length > 0
              ? data.user.artists_i_like
              : HARD_ARTISTS,
          my_music: data.user.my_music || HARD_SPOTIFY_LINK,
          videos:
            data.user.videos && data.user.videos.length > 0
              ? data.user.videos
              : HARD_VIDEOS,
          past_collaborations:
            data.user.past_collaborations &&
              data.user.past_collaborations.length > 0
              ? data.user.past_collaborations
              : HARD_PAST_COLLABS,
          socials: {
            instagram: data.user.socials?.[0]?.instagram || "",
            x: data.user.socials?.[0]?.x || "",
            youtube: data.user.socials?.[0]?.youtube || "",
            tiktok: data.user.socials?.[0]?.tiktok || "",
            facebook: data.user.socials?.[0]?.facebook || "",
          },
          questions: data.user.questions || [],
        });
      }

      setLoading(false);
    } catch (error) {
      console.error("Error loading profile:", error);
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!userId) return;

    setSaving(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/users/${userId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to save profile");

      router.push(`/profile/${userId}`);
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [...formData.questions, { question: "", answer: "" }],
    });
  };

  const updateQuestion = (index, field, value) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index][field] = value;
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const removeQuestion = (index) => {
    setFormData({
      ...formData,
      questions: formData.questions.filter((_, i) => i !== index),
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-muted">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 px-4 py-6 space-y-6">
      <EditPicture
        formData={formData}
        setFormData={setFormData}
        showImageUrl={showImageUrl}
        setShowImageUrl={setShowImageUrl}
      />

      <EditMainFields formData={formData} setFormData={setFormData} />

      <EditTagsGenresTheme
        formData={formData}
        setFormData={setFormData}
        allGenres={allGenres}
        allTags={allTags}
        showTagSelect={showTagSelect}
        setShowTagSelect={setShowTagSelect}
        showGenresEdit={showGenresEdit}
        setShowGenresEdit={setShowGenresEdit}
        showThemeEdit={showThemeEdit}
        setShowThemeEdit={setShowThemeEdit}
        themeColors={themeColors}
      />

      <EditSocials
        formData={formData}
        setFormData={setFormData}
        showSocialEdit={showSocialEdit}
        setShowSocialEdit={setShowSocialEdit}
      />

      <EditCollections formData={formData} setFormData={setFormData} />

      <EditQuestions
        formData={formData}
        updateQuestion={updateQuestion}
        removeQuestion={removeQuestion}
        addQuestion={addQuestion}
        showQuestionsEdit={showQuestionsEdit}
        setShowQuestionsEdit={setShowQuestionsEdit}
      />

      <SaveBar handleSave={handleSave} saving={saving} />
    </div>
  );
}
