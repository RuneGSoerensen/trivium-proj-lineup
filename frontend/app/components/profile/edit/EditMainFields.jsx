"use client";

export default function EditMainFields({ formData, setFormData }) {
  return (
    <div className="bg-default rounded-[24px] p-10 border-1 border-gray-300 mt-20">
      <div className="flex m-4 ">
        <label className="text-default font-semibold  mb-8 ">Name</label>
        <div>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full  placeholder:color-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary rounded-full pl-32"
          />
        </div>
      </div>
      <hr className="border-gray-300 ml-30 mb-16 " />
      <div className="flex m-4 ">
        <label className="text-default font-semibold  mb-8 ">Bio</label>
        <div className="w-full ml-10">
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            rows={1}
            className=" w-full placeholder:color-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary rounded-full pl-20"
            placeholder="Tell us about yourself..."
          />
        </div>
      </div>
      <hr className="border-gray-300 ml-30 mb-16" />

      <div className="flex m-4 items-center">
        <label className="text-default font-semibold  mb-8 ">About</label>
        <div className="w-full ml-10">
          <textarea
            value={formData.about}
            onChange={(e) => setFormData({ ...formData, about: e.target.value })}
            rows={4}
            className=" w-full placeholder:color-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-primary  "
            placeholder="More details about yourself..."
          />
        </div>
      </div>
      <hr className="border-gray-300 ml-30 mb-16" />
    </div>
  );
}
