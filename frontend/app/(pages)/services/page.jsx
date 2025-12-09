import Link from "next/link";
import Image from "next/image";
import { Bookmark } from "lucide-react";
export default function Page() {
  const services = [
    {
      id: "1",
      provider: "LunaVisuals",
      tag: "#art",
      title: "Custom visuals for your next release",
      excerpt:
        "Album covers, tour posters, and stage visuals crafted to reflect your sound and style. Work directly with an artist experienced in branding for musicians.",
      location: "Aarhus",
      time: "4h ago",
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROw1upqPjzbLnyLZuMHMKLhnny7-8tQr08Ew&s",
    },
    {
      id: "2",
      provider: "EchoLab Studios",
      tag: "#recording",
      title: "Full-service recording and mixing",
      excerpt:
        "Studio sessions, mixing and mastering by engineers who have worked with indie and electronic acts. Fully equipped live room and vintage gear.",
      location: "Odense",
      time: "1d ago",
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROw1upqPjzbLnyLZuMHMKLhnny7-8tQr08Ew&s",
    },
    {
      id: "3",
      provider: "MusicRock APS",
      tag: "#Rehearsal space",
      title: "Rehearsal space for rent in højbjerg",
      excerpt: "3 studio rooms available for rent every day",
      location: "Odense",
      time: "1d ago",
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROw1upqPjzbLnyLZuMHMKLhnny7-8tQr08Ew&s",
    },
  ];

  return (
    <section className="p-16 w-full full-bleed bg-alt">
 {/* 
 Consider using the ServiceCard component (with few tweaks)
 Shorter and more manageable
  */}
        {services.map((s) => (
          <article
            key={s.id}
            className="p-24 rounded-[24px] w-full shadow-sm mb-16 bg-default"
          >
            <div className="flex flex-col gap-4">
              <div className="flex gap-8 items-center">
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center ">
                  {s.provider[0]}
                </div>
                <div className="text-gray-600">
                  {s.provider} offers{" "}
                  <span className="font-medium">{s.tag}</span>
                </div>
                <div className="ml-auto">
                  <Bookmark />
                </div>
              </div>
             
              <hr className="text-gray-200" />
              <Link href={`/services/${s.id}`} className="flex flex-col">
                <h3 className="text-lg font-semibold mb-3">{s.title}</h3>
                <div className="flex justify-center mb-3">
                  <Image
                    src={s.image_url}
                    alt={s.title}
                    width={200}
                    height={200}
                    className="rounded-[24px] overflow-hidden mb-3 self-center w-full h-full object-cover"
                  />
                </div>

                <p className="text-sm text-gray-700 line-clamp-3 truncate">
                  {s.excerpt}
                </p>

                <div className=" flex justify-between text-muted">
                  <div className="mb-2 text-black font-semibold">Read more</div>
                  <div>
                    {s.location} · {s.time}
                  </div>
                </div>
              </Link>
            </div>
          </article>
        ))}

    </section>
  );
}
