import { useEffect, useState } from "react";
import Image from "next/image";
import { userAvatarInitials } from "@/utils/helpers";
import { authenticatedFetch } from "@/utils/auth";
export default function Stories() {
  const [stories, setStories] = useState([]);
  const fetchStories = async () => {
    try {
      const res = await authenticatedFetch(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/stories`,
        {
          cache: "no-store",
        }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch notes");
      }
      const data = await res.json();
      return data || [];
    } catch (err) {
      throw err;
    }
  };
  useEffect(() => {
    const loadStories = async () => {
      const storiesData = await fetchStories();
      setStories(storiesData);
    };
    loadStories();
  }, []);

  const defaultAvatarStyle = "background=ffcf70&color=1e1e1e&size=40";

  return (
    <section className="hide-scrollbar w-full h-fit min-h-120 flex gap-12 overflow-x-auto py-12 px-16 full-bleed">
      {stories.map((story) => (
        <div key={story.id} className="flex flex-col items-center gap-6 h-full w-full">
   
            <div className="rounded-full w-70 h-70">
              <Image
                src={
                  story.image_url && story.image_url !== ""
                    ? story.image_url
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(userAvatarInitials(story.name))}&${defaultAvatarStyle}&size=128`
                }
                alt={story.name}
                className=" w-74 h-74 rounded-full object-cover border-brand"
                width={48}
                height={48}
              />
            </div>
            <p className="text-sm text-center leading-16!">{story.name}</p>
    
        </div>
      ))}
    </section>
  );
}
