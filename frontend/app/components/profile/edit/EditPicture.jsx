"use client";
import Image from "next/image";

export default function EditPicture({ formData, setFormData, showImageUrl, setShowImageUrl }) {
  return (
    <div className="">
      <div className="flex flex-col items-center gap-4">
        {showImageUrl ? (
          <div className="w-full flex flex-col items-center gap-3">
            <div className="w-120 h-120 rounded-full bg-muted overflow-hidden">
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
              className="w-full max-w-md px-4 py-3 rounded-xl bg-muted border-none text-[15px] bg-white text-default placeholder:color-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary"
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
            <div className="w-120 h-120 rounded-full bg-muted overflow-hidden">
              {formData.image_url ? (
                <Image
                  src={formData.image_url || "/placeholder.svg"}
                  alt="Profile"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center color-muted text-[24px] font-bold">
                  {formData.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <button onClick={() => setShowImageUrl(true)} className="font-semibold">
              Edit picture
            </button>
          </>
        )}
      </div>
    </div>
  );
}
