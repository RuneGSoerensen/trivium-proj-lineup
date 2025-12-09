import { useEffect, useState } from "react";
import Image from "next/image";
export default function Stories() {
  const [stories, setStories] = useState([]);
  const fetchStories = async () => {
    try {
      const res = await fetch(
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


  return (
    <section className="w-full flex gap-4 overflow-x-auto py-4 px-2">
      {stories.map((story) => (
        <div key={story.id} className=" flex  ">
          <div>
            <div className="rounded-full w-70 h-70">
              <Image
                src={
                  story.image_url && story.image_url !== ""
                    ? story.image_url
                    : "/placeholder-image.png"
                }
                alt={story.name}
                className=" w-70 h-70 rounded-full object-cover border-1 border-primary"
                width={48}
                height={48}
              />
            </div>
            <p className="text-sm text-center">{story.name}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
