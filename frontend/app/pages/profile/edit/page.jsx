"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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

function MultiSelectInput({
  options,
  values,
  setValues,
  placeholder,
  allowNew,
}) {
  const [input, setInput] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);

  useEffect(() => {
    if (!Array.isArray(options)) return;
    setFilteredOptions(
      options.filter(
        (o) =>
          o.toLowerCase().includes(input.toLowerCase()) && !values.includes(o)
      )
    );
  }, [input, options, values]);

  const addValue = (val) => {
    if (!values.includes(val)) setValues([...values, val]);
    setInput("");
  };

  const removeValue = (val) => setValues(values.filter((v) => v !== val));

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // Only allow new values if allowed
      if (allowNew || options.includes(input)) {
        addValue(input);
      }
    }
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        className="w-full border rounded px-3 py-2"
      />
      {/* Dropdown of filtered existing options */}
      {input && filteredOptions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border rounded mt-1 max-h-40 overflow-y-auto">
          {filteredOptions.map((opt) => (
            <li
              key={opt}
              className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => addValue(opt)}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

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
      const currentUser = localStorage.getItem("userId");
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
      {/* Profile Picture */}
      <div className="">
        <div className="flex flex-col items-center gap-4">
          {showImageUrl ? (
            <div className="w-full flex flex-col items-center gap-3">
              <div className="w-[120px] h-[120px] rounded-full bg-muted overflow-hidden">
                <Image
                  src={formData.image_url || "/placeholder.svg"}
                  alt="Profile"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <input
                type="text"
                placeholder="Image URL"
                value={formData.image_url}
                onChange={(e) =>
                  setFormData({ ...formData, image_url: e.target.value })
                }
                className="w-full max-w-md px-4 py-3 rounded-[12px] bg-muted border-none text-[15px] bg-white text-default placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />

              <div className="flex gap-2">
                <button
                  onClick={() => setShowImageUrl(false)}
                  className="px-3 py-1 rounded bg-alt"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowImageUrl(false)}
                  className="px-3 py-1 rounded bg-brand-primary text-default"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="w-[120px] h-[120px] rounded-full bg-muted overflow-hidden">
                {formData.image_url ? (
                  <Image
                    src={formData.image_url || "/placeholder.svg"}
                    alt="Profile"
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted text-[24px] font-bold">
                    {formData.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <button
                onClick={() => setShowImageUrl(true)}
                className="font-semibold"
              >
                Edit picture
              </button>
            </>
          )}
        </div>
      </div>

      {/* Name */}
      <div className="bg-default rounded-[24px] p-10 border-1 border-gray-300 mt-20">
        <div className="flex m-4 ">
          <label className="text-default font-semibold  mb-8 ">Name</label>
          <div>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full  placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary rounded-full pl-32"
            />
          </div>
        </div>
        <hr className="border-gray-300 ml-30 mb-16 " />
        {/* Bio */}
        <div className="flex m-4 ">
          <label className="text-default font-semibold  mb-8 ">Bio</label>
          <div className="w-full ml-10">
            <textarea
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              rows={1}
              className=" w-full placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary rounded-full pl-20"
              placeholder="Tell us about yourself..."
            />
          </div>
        </div>
        <hr className="border-gray-300 ml-30 mb-16" />

        {/* About */}
        <div className="flex m-4 items-center">
          <label className="text-default font-semibold  mb-8 ">About</label>
          <div className="w-full ml-10">
            <textarea
              value={formData.about}
              onChange={(e) =>
                setFormData({ ...formData, about: e.target.value })
              }
              rows={4}
              className=" w-full placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary  "
              placeholder="More details about yourself..."
            />
          </div>
        </div>
        <hr className="border-gray-300 ml-30 mb-16" />

        {/* Looking For Tags */}
        <div className="flex m-4 items-center ">
          <label className="text-default font-semibold  mb-8 ">
            What i am looking
          </label>

          {/* Pills for already selected tags */}
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.looking_for_tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-blue-200 text-blue-800 flex items-center gap-1"
              >
                {tag}
                {showTagSelect && (
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        looking_for_tags: formData.looking_for_tags.filter(
                          (t) => t !== tag
                        ),
                      })
                    }
                  >
                    ×
                  </button>
                )}
              </span>
            ))}
            <button
              onClick={() => setShowTagSelect((s) => !s)}
              className="text-muted "
            >
              {showTagSelect ? "Done" : "Edit"}
            </button>
          </div>

          {/* Dropdown to select more tags */}
        </div>
        {showTagSelect && (
          <div className="mt-2 w-full">
            <select
              value=""
              onChange={(e) => {
                const tagName = e.target.value;
                if (!formData.looking_for_tags.includes(tagName)) {
                  setFormData({
                    ...formData,
                    looking_for_tags: [...formData.looking_for_tags, tagName],
                  });
                }
              }}
              className="w-full px-4 py-3 rounded-[12px] bg-muted border-none text-[15px] text-default focus:outline-none focus:ring-2 focus:ring-brand-primary"
            >
              <option value="" disabled>
                Select a tag...
              </option>
              {allTags.map((t) => (
                <option key={t.id} value={t.name}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <hr className="border-gray-300 ml-30 mb-16" />
        {/* Genres */}

        <div className="flex m-4 items-center">
          <label className="text-default font-semibold  mb-8 ">Genres</label>

          <div className="flex flex-wrap gap-2 ml-10">
            {formData.genres.map((g) => (
              <span
                key={g}
                className="px-3 py-1 rounded-full bg-blue-200 text-blue-800 flex items-center gap-1"
              >
                {g}
                {showGenresEdit && (
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        genres: formData.genres.filter((x) => x !== g),
                      })
                    }
                  >
                    ×
                  </button>
                )}
              </span>
            ))}

            <button
              onClick={() => setShowGenresEdit((s) => !s)}
              className="text-muted "
            >
              {showGenresEdit ? "Done" : "Edit"}
            </button>
          </div>
        </div>

        {showGenresEdit && (
          <div className="m-4 mt-6 ml-10">
            <MultiSelectInput
              options={allGenres}
              values={formData.genres}
              setValues={(vals) => setFormData({ ...formData, genres: vals })}
              placeholder="Add or search genres..."
              allowNew={true}
            />
          </div>
        )}

        <hr className="border-gray-300 ml-30 mb-16" />

        {/* Theme */}
        <div className="flex m-4 items-center">
          <label className="text-default font-semibold  mb-8 ">Theme</label>
          <div className="flex items-center gap-4 ml-10">
            <div
              className="w-40 h-40 rounded-full "
              style={{
                backgroundColor: formData.theme,
                borderColor:
                  formData.theme === formData.theme ? undefined : undefined,
              }}
            />
            <button
              onClick={() => setShowThemeEdit((s) => !s)}
              className="text-muted "
            >
              {showThemeEdit ? "Done" : "Edit"}
            </button>
          </div>
        </div>
        {showThemeEdit && (
          <div className="flex gap-3 mt-4">
            {themeColors.map((color) => (
              <button
                key={color.value}
                onClick={() => setFormData({ ...formData, theme: color.value })}
                className={`w-40 h-40 rounded-full border-2 ${
                  formData.theme === color.value
                    ? "border-brand-primary"
                    : "border-transparent"
                }`}
                style={{ backgroundColor: color.value }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Social Links */}
      <div className="bg-default rounded-[24px] p-10 border-1 border-gray-300 mt-20">
        <div className="flex items-center justify-between">
          <label className="text-default font-semibold  my-16 mx-4  ">
            Social Media
          </label>
          <button
            onClick={() => setShowSocialEdit((s) => !s)}
            className="text-muted text-[13px]"
          >
            {showSocialEdit ? "Done" : "Edit"}
          </button>
        </div>

        {!showSocialEdit ? (
          <div className="flex items-center justify-center gap-10 mt-3 ">
            <a
              href={formData.socials.instagram || "#"}
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
              href={formData.socials.x || "#"}
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
              href={formData.socials.youtube || "#"}
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
              href={formData.socials.tiktok || "#"}
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
              href={formData.socials.facebook || "#"}
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
        ) : (
          <div className="space-y-3 mt-3">
            <input
              type="text"
              placeholder="Instagram URL"
              value={formData.socials.instagram ?? ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socials: { ...formData.socials, instagram: e.target.value },
                })
              }
              className="w-full px-4 py-3 rounded-[12px] bg-muted border-none text-[15px] text-default placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
            <input
              type="text"
              placeholder="X (Twitter) URL"
              value={formData.socials.x ?? ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socials: { ...formData.socials, x: e.target.value },
                })
              }
              className="w-full px-4 py-3 rounded-[12px] bg-muted border-none text-[15px] text-default placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
            <input
              type="text"
              placeholder="YouTube URL"
              value={formData.socials.youtube ?? ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socials: { ...formData.socials, youtube: e.target.value },
                })
              }
              className="w-full px-4 py-3 rounded-[12px] bg-muted border-none text-[15px] text-default placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
            <input
              type="text"
              placeholder="TikTok URL"
              value={formData.socials.tiktok ?? ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socials: { ...formData.socials, tiktok: e.target.value },
                })
              }
              className="w-full px-4 py-3 rounded-[12px] bg-muted border-none text-[15px] text-default placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
            <input
              type="text"
              placeholder="Facebook URL"
              value={formData.socials.facebook ?? ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socials: { ...formData.socials, facebook: e.target.value },
                })
              }
              className="w-full px-4 py-3 rounded-[12px] bg-muted border-none text-[15px] text-default placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
          </div>
        )}
      </div>
      {/* Artists I like */}
      <div className="bg-default rounded-[24px] p-4 border border-muted mb-4">
        <div className="flex items-center justify-between mb-3">
          <label className="text-subtitle font-semibold">Artists I like</label>
          <button
            className="text-muted "
            onClick={() => alert("edit artists - later")}
          >
            Edit
          </button>
        </div>

        <div className="flex items-center justify-center">
          {formData.artists_i_like.slice(0, 4).map((src, i) => (
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

          {formData.artists_i_like.length > 4 && (
            <div
              className="w-50 h-50 rounded-full bg-muted flex items-center justify-center text-default"
              style={{
                marginLeft: -20,
                zIndex: 5,
              }}
            >
              +{formData.artists_i_like.length - 4}
            </div>
          )}
        </div>
      </div>

      {/* My music (spotify card) */}
      <div className="bg-default rounded-[24px] p-4 border border-muted mb-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-subtitle block font-semibold">
              My music
            </label>
            <p className="text-muted  mt-1">Spotify</p>
          </div>
          <div>
            <a
              href={formData.my_music}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 bg-brand-primary rounded-full text-default"
            >
              Open
            </a>
          </div>
        </div>
      </div>

      {/* Videos */}
      <div className="bg-default rounded-[24px] p-4 border border-muted mb-4">
        <div className="flex items-center justify-between mb-3">
          <label className="text-subtitle font-semibold">Videos</label>
          <button
            className="text-muted "
            onClick={() => alert("add video - later")}
          >
            Edit
          </button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {formData.videos.map((v, i) => (
            <div
              key={i}
              className="px-3 py-1 rounded-full bg-alt border border-muted flex items-center gap-2"
            >
              <span className="">{v}</span>
              <button
                onClick={() =>
                  setFormData((d) => ({
                    ...d,
                    videos: d.videos.filter((_, idx) => idx !== i),
                  }))
                }
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Past collaborations */}
      <div className="bg-default rounded-[24px] p-4 border border-muted mb-4">
        <div className="flex items-center justify-between mb-3">
          <label className="text-subtitle font-semibold">
            Past collaborations
          </label>
          <button
            className="text-muted "
            onClick={() => alert("edit past collabs - later")}
          >
            Edit
          </button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {formData.past_collaborations.map((p, i) => (
            <div
              key={i}
              className="px-3 py-1 rounded-full bg-alt border border-muted"
            >
              {p}
            </div>
          ))}
        </div>
      </div>
      {/* Questions */}
      <div className="bg-default rounded-[24px] p-5 border-muted">
        <div className="flex items-center justify-between mb-3">
          <label className="text-default font-semibold ">Questions</label>
          <button
            onClick={addQuestion}
            className="text-brand-primary font-semibold text-[14px]"
          >
            + Add Question
          </button>
        </div>
        <div className="space-y-4">
          {formData.questions.map((q, idx) => (
            <div key={idx} className="space-y-2 p-4 bg-muted/50 rounded-[16px]">
              <input
                type="text"
                placeholder="Question"
                value={q.question}
                onChange={(e) =>
                  updateQuestion(idx, "question", e.target.value)
                }
                className="w-full px-4 py-2 rounded-[12px] bg-default border-none text-[14px] text-default placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
              <input
                type="text"
                placeholder="Answer"
                value={q.answer}
                onChange={(e) => updateQuestion(idx, "answer", e.target.value)}
                className="w-full px-4 py-2 rounded-[12px] bg-default border-none text-[14px] text-default placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
              <button
                onClick={() => removeQuestion(idx)}
                className="text-red-500  font-semibold"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 rounded-[12px] bg-brand-primary text-default font-semibold text-[15px] disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
