"use client";

import { useState } from "react";
import Image from "next/image";
import { Tag } from "@/ui/Tag/Tag.jsx";
import { Send } from "lucide-react";

export default function ProfileAbout({ profile, onQuestionSubmit }) {
  const [questionText, setQuestionText] = useState("");

  const handleSubmit = () => {
    if (questionText.trim()) {
      onQuestionSubmit(questionText);
      setQuestionText("");
    }
  };

  const socialPlatforms = [
    { key: "instagram", icon: "/icons/instagram.png", alt: "Instagram" },
    { key: "x", icon: "/icons/x.png", alt: "X" },
    { key: "youtube", icon: "/icons/youtube.png", alt: "YouTube" },
    { key: "tiktok", icon: "/icons/tiktok.png", alt: "TikTok" },
    { key: "facebook", icon: "/icons/facebook.png", alt: "Facebook" },
  ];

  return (
    <article className="flex flex-col gap-30 py-10">
      {/* ABOUT ME */}
      <section className="profile-section">
        <label>About me</label>
        <div className="w-full ml-10">
          <p className="color-default py-6">{profile.about ? profile.about : "No information provided."}</p>
        </div>
      </section>
      {/* LOOKING FOR */}
      <section className="profile-section">
        <label>
          What I am looking for
        </label>
        <div className="flex flex-wrap gap-6 mb-2 ml-10">
          {profile.looking_for_tags.map((tag) => (
            tag ? (
              <Tag
                key={tag}
                colorScheme="info"
                className="px-8 py-2 flex items-center "
              >
                {tag}
              </Tag>
            ) : (
              <p key={tag} className="color-default py-6">No tags specified.</p>
            )))}
        </div>
      </section>
      {/* GENRES */}
      <section className="profile-section">
        <label>Genres</label>
        <div className="flex flex-wrap gap-6 ml-10">
          {profile.genres && profile.genres.length > 0 && profile.genres.some((g) => g) ? (
            profile.genres.filter((g) => g).map((g) => (
              <Tag
                key={g}
                colorScheme="info"
                className="px-8 py-2 flex items-center"
              >
                {g}
              </Tag>
            ))
          ) : (
            <p className="color-default py-6">No genres specified.</p>
          )}
        </div>
      </section>
      {/* SOCIAL MEDIA */}
      <section className="profile-section">
        <div className="flex items-center justify-between">
          <label>
            Social Media
          </label>
        </div>

        <div className="flex items-center justify-between px-15">
          {socialPlatforms.map((p) => (
            <a
              key={p.key}
              href={(profile.socials && profile.socials[p.key]) || "#"}
              target="_blank"
              rel="noreferrer"
              className="opacity-90 hover:opacity-100 flex items-center w-50 h-50"
            >

              <Image src={p.icon} alt={p.alt} width={100} height={100} />

            </a>
          ))}
        </div>
      </section>
      {/* ARTISTS */}
      <section className="profile-section">
        <label>
          Artists I like
        </label>

        <div className="flex items-center px-15">
          {profile.artists_i_like.slice(0, 3).map((src, i) => (
            <div
              key={i}
              className="w-77 h-77 rounded-full p-4 bg-default"
              style={{ marginLeft: i === 0 ? 0 : -20, zIndex: i + 1 }}
            >
              <Image
                key={i}
                width={100}
                height={100}
                src={src}
                alt={`artist-${i}`}
                className="w-full h-full object-cover overflow-hidden rounded-full position"
              />
            </div>
          ))}

          {profile.artists_i_like.length > 3 && (
            <div
              className={`w-77 h-77 rounded-full border-4 border-base-100 flex items-center justify-center -ml-20 z-5 ${profile.theme || "bg-secondary-blue"} color-inverse`}
            >
              +{profile.artists_i_like.length - 3}
            </div>
          )}
          <div>
            <p className="color-subtle p-10">See all</p>
          </div>
        </div>
      </section>
      {/* SPOTIFY */}
      <section className="profile-section">
        <label>
          My music
        </label>
        <div className="w-full px-15">
          <iframe
            className="rounded-4xl"
            data-testid="embed-iframe"
            src="https://open.spotify.com/embed/playlist/37i9dQZF1E36YqHrNO44Xw?utm_source=generator"
            width="100%"
            height="352"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
      </section>
      {/* VIDEOS */}
      <section className="profile-section">
        <label>Videos</label>
        <div className="px-15 flex flex-col gap-15">

          {(profile.videos || []).map((v, i) => {
            if (typeof v === "string" && /^https?:\/\//.test(v)) {
              const ytMatch = v.match(
                /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-\-]{11})/i
              );
              const vimeoMatch = v.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
              let src = v;
              if (ytMatch && ytMatch[1]) {
                src = `https://www.youtube.com/embed/${ytMatch[1]}`;
              } else if (vimeoMatch && vimeoMatch[1]) {
                src = `https://player.vimeo.com/video/${vimeoMatch[1]}`;
              }

              return (
                <div key={i} className="w-full">
                  <div className="aspect-video w-full">
                    <iframe
                      src={src}
                      title={`video-${i}`}
                      width="100%"
                      height="100%"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      className=" w-full h-full rounded-4xl"
                    />
                  </div>
                </div>
              );
            }

            return (
              <Tag key={i} className="px-8 py-2" colorScheme="info">
                <span className="">{v}</span>
              </Tag>
            );
          })}
        </div>
      </section>
      {/* PAST COLLABS */}
      <section className="profile-section">
        <label>
          Past collaborations
        </label>

        <div className="flex items-center px-15">
          {profile.artists_i_like.slice(0, 3).map((src, i) => (
            <div
              key={i}
              className="w-77 h-77 rounded-full overflow-hidden p-4 bg-default"
              style={{ marginLeft: i === 0 ? 0 : -20, zIndex: i + 1 }}
            >
              <Image
                width={100}
                height={100}
                src={src}
                alt={`artist-${i}`}
                className="w-full h-full object-cover rounded-full position"
              />
            </div>
          ))}

          {profile.artists_i_like.length > 3 && (
            <div
              className={`${profile.theme || "bg-secondary-blue"} z-5 -ml-20 w-77 h-77 rounded-full flex items-center justify-center border-4 border-base-100 color-inverse`}
            >
              +{profile.artists_i_like.length - 3}
            </div>
          )}
          <div>
            <p className="color-subtle p-10">See all</p>
          </div>
        </div>
      </section>

      {/* QUESTIONS */}
      <section className="profile-section">
        <label>
          Questions
        </label>
        {profile.questions.map((q, idx) => (
          <div key={idx} className="px-15">
            <div className="flex justify-between items-start">
              <h3 className="text-default font-semibold ">
                {q.question ? q.question : null}
              </h3>
            </div>
            <p className="mt-3 mb-4 pl-15">{q.question ? q.answer ? q.answer : "No answer yet" : null}</p>
          </div>
        ))}
      </section>
      {/* ASK A QUESTION */}
      <section className="profile-section w-full px-0!">
        <label htmlFor="questionInput" className="text-h2 color-default">
          Ask me a question
        </label>
        <div className={`border rounded-full flex items-center`}>
          <input
            type="text"
            id="questionInput"
            className="w-full  p-20 focus:outline-none "
            placeholder="Type your question here..."
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
          <button
            style={{ backgroundColor: profile.theme }}
            className="rounded-full w-60 h-50 m-2 p-2  mr-10 flex items-center justify-center"
            onClick={handleSubmit}
          >
            <div className="h-25 w-25 ">
              <Send size={10} fill={"white"} stroke="0" />
            </div>
          </button>
        </div>
      </section>
    </article>
  );
}
