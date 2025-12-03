"use client";
import Image from "next/image";

export default function EditSocials({ formData, setFormData, showSocialEdit, setShowSocialEdit }) {
  return (
    <div className="bg-default rounded-[24px] p-10 border-1 border-gray-300 mt-20 pb-20">
      <div className="flex items-center justify-between">
        <label className="text-default font-semibold  my-16 mx-4  ">Social Media</label>
        <button onClick={() => setShowSocialEdit((s) => !s)} className="text-muted ">
          {showSocialEdit ? "Done" : "Edit"}
        </button>
      </div>

      {!showSocialEdit ? (
        <div className="flex items-center justify-center gap-10 mt-3 ">
          <a href={formData.socials.instagram || "#"} target="_blank" rel="noreferrer" className="opacity-90 hover:opacity-100">
            <Image src="/icons/instagram.png" alt="Instagram" width={24} height={24} className="w-32 h-32" />
          </a>
          <a href={formData.socials.x || "#"} target="_blank" rel="noreferrer" className="opacity-90 hover:opacity-100">
            <Image src="/icons/x.png" alt="X" width={24} height={24} className="w-32 h-32" />
          </a>
          <a href={formData.socials.youtube || "#"} target="_blank" rel="noreferrer" className="opacity-90 hover:opacity-100">
            <Image src="/icons/youtube.png" alt="YouTube" width={24} height={24} className="w-32 h-32" />
          </a>
          <a href={formData.socials.tiktok || "#"} target="_blank" rel="noreferrer" className="opacity-90 hover:opacity-100">
            <Image src="/icons/tiktok.png" alt="TikTok" width={24} height={24} className="w-32 h-32" />
          </a>
          <a href={formData.socials.facebook || "#"} target="_blank" rel="noreferrer" className="opacity-90 hover:opacity-100">
            <Image src="/icons/facebook.png" alt="Facebook" width={24} height={24} className="w-32 h-32" />
          </a>
        </div>
      ) : (
        <div className="space-y-3 mt-3">
          <input
            type="text"
            placeholder="Instagram URL"
            value={formData.socials.instagram ?? ""}
            onChange={(e) =>
              setFormData({ ...formData, socials: { ...formData.socials, instagram: e.target.value } })
            }
            className="w-full px-4 py-3 rounded-[12px] bg-muted border-none text-[15px] text-default placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />
          <input
            type="text"
            placeholder="X (Twitter) URL"
            value={formData.socials.x ?? ""}
            onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials, x: e.target.value } })}
            className="w-full px-4 py-3 rounded-[12px] bg-muted border-none text-[15px] text-default placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />
          <input
            type="text"
            placeholder="YouTube URL"
            value={formData.socials.youtube ?? ""}
            onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials, youtube: e.target.value } })}
            className="w-full px-4 py-3 rounded-[12px] bg-muted border-none text-[15px] text-default placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />
          <input
            type="text"
            placeholder="TikTok URL"
            value={formData.socials.tiktok ?? ""}
            onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials, tiktok: e.target.value } })}
            className="w-full px-4 py-3 rounded-[12px] bg-muted border-none text-[15px] text-default placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />
          <input
            type="text"
            placeholder="Facebook URL"
            value={formData.socials.facebook ?? ""}
            onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials, facebook: e.target.value } })}
            className="w-full px-4 py-3 rounded-[12px] bg-muted border-none text-[15px] text-default placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />
        </div>
      )}
    </div>
  );
}
