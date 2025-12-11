"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { MessageCircleMore } from "lucide-react";
import { Tag } from "@/comps/ui/Tag/Tag";
import Image from "next/image";
import { Button } from "@/comps/ui/Button/Button";
import { formatTimeAgo } from "@/utils/timeAgo";
import { authenticatedFetch } from "@/utils/auth";
export default function Page() {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await authenticatedFetch(
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/requests/${id}`,
          {
            cache: "no-store",
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch requests");
        }
        const data = await res.json();
        setRequest(data || null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!request) return <div>No request found</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4 p-4 rounded-[24px] min-h-[620px] bg-white flex flex-col">
        <div className="flex gap-8 items-center mb-8">
          <div className="w-40 h-40 mb-2 rounded-full overflow-hidden">
            <Image
              src={request.created_by?.image_url || "/placeholder-image.png"}
              alt={request.title}
              width={160}
              height={160}
              className="w-full h-full object-cover"
            />
          </div>
          <p>{request.created_by?.name || "Unknown"}</p>
          <p className="mr-auto">Looking for #{"someone"}</p>

          <p className="ml-auto text-sm text-muted">
            {formatTimeAgo(request.created_at)}
          </p>
        </div>
        <div className="">
          <Tag>#tags here</Tag>
        </div>

        <h2 className="text-xl font-bold mb-8">{request.title}</h2>

        <Image
          src={request.image_url || "/placeholder-image.png"}
          alt={request.title}
          width={400}
          height={300}
          className="w-full object-cover my-8 rounded-2xl"
        />
        <p className="mb-2 text-lg">{request.description}</p>
        <div className="flex items-center w-full gap-4 mt-8">
          <Button
            className="rounded-full !px-8 !py-6 border border-muted"
            size="md"
          >
            <div className="flex items-center gap-2">
              <MessageCircleMore size={20} strokeWidth={2} /> Start a chat
            </div>
          </Button>
        </div>
        <div className="">
          <h3 className="text-lg font-semibold mt-12 mb-4 text-gray-700">
            Genre
          </h3>
          <div className="flex flex-wrap gap-2">
            {request.genres && request.genres.length > 0 ? (
              request.genres.map((genre) => (
                <Tag
                  className={"!px-8 !py-4 bg-black text-white"}
                  key={genre.id}
                >
                  {genre.name}
                </Tag>
              ))
            ) : (
              <p className="text-muted">No genres specified</p>
            )}
          </div>
        </div>
        <div className="">
          <h3 className="text-lg font-semibold mt-12 mb-4 text-gray-700">
            Must Have Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {request.musthaveskills && request.musthaveskills.length > 0 ? (
              request.musthaveskills.map((skill) => (
                <Tag
                  className={"!px-8 !py-4 bg-black text-white"}
                  key={skill.id}
                >
                  {skill.name}
                </Tag>
              ))
            ) : (
              <p className="text-muted">No skills specified</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
