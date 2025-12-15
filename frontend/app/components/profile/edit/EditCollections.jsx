"use client";
import { Tag } from "@/ui/Tag/Tag.jsx";

export default function EditCollections({ formData, setFormData }) {
  return (
    <>
      <div className="bg-default rounded-[24px] p-10 border-1 border-gray-300 mt-20 pb-20">
        <div className="flex items-center justify-between mb-3">
          <label className="text-default font-semibold  my-16 mx-4 ">Artists I like</label>
          <button className="color-muted " onClick={() => alert("edit artists - later")}>Edit</button>
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
              <img src={src} alt={`artist-${i}`} className="w-full h-full object-cover position" />
            </div>
          ))}

          {formData.artists_i_like.length > 4 && (
            <div className="w-50 h-50 rounded-full bg-muted flex items-center justify-center text-default" style={{ marginLeft: -20, zIndex: 5 }}>
              +{formData.artists_i_like.length - 4}
            </div>
          )}
        </div>
      </div>

      <div className="bg-default rounded-[24px] p-10 border-1 border-gray-300 mt-20 pb-20">
        <div className="flex flex-col ">
          <p className="flex justify-end color-muted">Edit</p>
          <div className="flex items-center gap-4">
            <label className="text-default font-semibold  my-16 mx-4 ">My music</label>
            <p>Spotify linked</p>
          </div>
        </div>
      </div>

      <div className="bg-default rounded-[24px] p-10 border-1 border-gray-300 mt-20 pb-20 flex flex-col">
        <button className="color-muted self-end" onClick={() => alert("add video - later")}>Edit</button>
        <div className="flex items-center gap-4">
          <label className="text-default font-semibold  my-16 mx-4 "> Videos</label>

          <div className="flex gap-2 flex-wrap">
            {formData.videos.map((v, i) => (
              <Tag key={i} className="px-8 py-2" colorScheme="info">
                <span className="">{v}</span>
                <button
                  onClick={() =>
                    setFormData((d) => ({ ...d, videos: d.videos.filter((_, idx) => idx !== i) }))
                  }
                >
                  ×
                </button>
              </Tag>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-default rounded-[24px] p-10 border-1 border-gray-300 mt-20 pb-20 flex flex-col ">
        <button className="color-muted self-end " onClick={() => alert("edit past collabs - later")}>Edit</button>
        <div className="flex items-center ">
          <label className="text-default font-semibold  my-16 mx-4 ">Past collaborations</label>
        </div>
      </div>
    </>
  );
}
