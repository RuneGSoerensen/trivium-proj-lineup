"use client";

import Image from "next/image";
import { Tag } from "@/ui/Tag/Tag.jsx";
import { Send } from "lucide-react";

export default function ProfileAbout({ profile, onQuestionSubmit }) {
  const socialPlatforms = [
    { key: "instagram", icon: "/icons/instagram.png", alt: "Instagram" },
    { key: "x", icon: "/icons/x.png", alt: "X" },
    { key: "youtube", icon: "/icons/youtube.png", alt: "YouTube" },
    { key: "tiktok", icon: "/icons/tiktok.png", alt: "TikTok" },
    { key: "facebook", icon: "/icons/facebook.png", alt: "Facebook" },
  ];

  return (
    <div className=" bg-background pb-20 px-4">
      <div className="mx-4">
        <label className="text-default text-muted mb-8 ">About</label>
        <div className="w-full ml-10">
          <p className="py-6">{profile.about}</p>
        </div>
      </div>

      <div className="m-4 ">
        <label className="text-default text-muted  mb-8 ">
          What i am looking
        </label>
        <div className="flex flex-wrap gap-6 mb-2">
          {profile.looking_for_tags.map((tag) => (
            <Tag
              key={tag}
              colorScheme="info"
              className="px-8 py-2 flex items-center "
            >
              {tag}
            </Tag>
          ))}
        </div>
      </div>

      <div className=" m-4 ">
        <label className="text-default text-muted  mb-8 ">Genres</label>
        <div className="flex flex-wrap gap-6 ml-10">
          {profile.genres.map((g) => (
            <Tag
              key={g}
              colorScheme="info"
              className="px-8 py-2 flex items-center"
            >
              {g}
            </Tag>
          ))}
        </div>
      </div>

      <div className="bg-default rounded-[24px] p-10  border-gray-300 mt-20 pb-20">
        <div className="flex items-center justify-between">
          <label className="text-default text-muted  my-16 mx-4  ">
            Social Media
          </label>
        </div>

        <div className="flex items-center justify-center gap-16 mt-3 ">
          {socialPlatforms.map((p) => (
            <a
              key={p.key}
              href={(profile.socials && profile.socials[p.key]) || "#"}
              target="_blank"
              rel="noreferrer"
              className="opacity-90 hover:opacity-100"
            >
              <Image src={p.icon} alt={p.alt} width={50} height={50} />
            </a>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <label className="text-default text-muted  my-16 mx-4  ">
            Artists i like
          </label>
        </div>
        <div className="flex items-center ">
          {profile.artists_i_like.slice(0, 3).map((src, i) => (
            <div
              key={i}
              className="w-65 h-65 rounded-full overflow-hidden border border-4 border-white "
              style={{ marginLeft: i === 0 ? 0 : -20, zIndex: i + 1 }}
            >
              <Image
                width={100}
                height={100}
                src={src}
                alt={`artist-${i}`}
                className="w-full h-full object-cover position"
              />
            </div>
          ))}

          {profile.artists_i_like.length > 3 && (
            <div
              className="w-65 h-65 rounded-full  flex items-center justify-center border-4 text-white"
              style={{
                marginLeft: -20,
                zIndex: 5,
                backgroundColor: profile.theme,
              }}
            >
              +{profile.artists_i_like.length - 3}
            </div>
          )}
          <div>
            <p className="text-muted p-10">See all</p>
          </div>
        </div>
      </div>

      <div className=" m-4">
        <label className="text-default text-muted  my-16 mx-4  ">
          My music
        </label>
        <iframe
          className="rounded-[32px]"
          data-testid="embed-iframe"
          src="https://open.spotify.com/embed/playlist/37i9dQZF1E36YqHrNO44Xw?utm_source=generator"
          width="100%"
          height="352"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>

      <label className="text-default text-muted  my-16 mx-4 "> Videos</label>
      <div className="flex gap-8 flex-wrap">
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
              <div key={i} className="w-full p-2">
                <div className="aspect-video w-full">
                  <iframe
                    src={src}
                    title={`video-${i}`}
                    width="100%"
                    height="100%"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className=" w-full h-250 rounded-[24px]"
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

      <div className="flex items-center justify-between">
        <label className="text-default text-muted  my-16 mx-4  ">
          Past collaborations
        </label>
      </div>
      <div className="flex items-center ">
        {profile.artists_i_like.slice(0, 3).map((src, i) => (
          <div
            key={i}
            className="w-65 h-65 rounded-full overflow-hidden border border-4 border-white "
            style={{ marginLeft: i === 0 ? 0 : -20, zIndex: i + 1 }}
          >
            <Image
              width={100}
              height={100}
              src={src}
              alt={`artist-${i}`}
              className="w-full h-full object-cover position"
            />
          </div>
        ))}

        {profile.artists_i_like.length > 3 && (
          <div
            className="w-65 h-65 rounded-full  flex items-center justify-center border-4 text-white"
            style={{
              marginLeft: -20,
              zIndex: 5,
              backgroundColor: profile.theme,
            }}
          >
            +{profile.artists_i_like.length - 3}
          </div>
        )}
        <div>
          <p className="text-muted p-10">See all</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="text-default text-muted  my-16 mx-4 ">
          Questions
        </label>
      </div>

      <div className="space-y-6">
        {profile.questions.map((q, idx) => (
          <div key={idx} className="p-6 bg-default ">
            <div className="flex justify-between items-start">
              <h3 className="text-default font-semibold ">
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
        <div className={`border-1 rounded-full flex items-center`}>
          <input
            type="text"
            id="questionInput"
            className="w-full  p-20 focus:outline-none "
            placeholder="Type your question here..."
          />
          <button
            style={{ backgroundColor: profile.theme }}
            className="rounded-full  justify-center w-60 h-50 m-2 p-2  mr-10 flex items-center justify-center"
            onClick={onQuestionSubmit}
          >
            <div className="h-25 w-25 ">
              <Send size={10} fill={"white"} stroke="0" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
