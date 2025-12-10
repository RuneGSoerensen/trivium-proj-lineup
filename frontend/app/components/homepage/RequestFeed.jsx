"use client";
import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import { formatTimeAgo } from "@/utils/timeAgo";
import Image from "next/image";
import { Button } from "@/comps/ui/Button/Button";
import { useRouter } from "next/navigation";
import { authenticatedFetch } from "@/utils/auth.js";
export default function RequestFeed() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const fetchRequests = async (currentOffset) => {
    try {
      const res = await authenticatedFetch(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/requests/feed`,
        {
          cache: "no-store",
        }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch requests");
      }
      const data = await res.json();

      return data || [];
    } catch (err) {
      throw err;
    }
  };
  useEffect(() => {
    const loadInitialRequests = async () => {
      try {
        const data = await fetchRequests(0);
        setRequests(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadInitialRequests();
  }, []);


  const router = useRouter();
  const handleClick = () => {
    router.push("/collabs");
  };
  const handleReadMore = (id) => {
    router.push(`/collabs/${id}`);
  };
  return (
    <div className="bg-alt full-bleed">
      {/* placeholder background*/}
      <div className=" flex overflow-x-auto w-full h-300 py-4">
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {!loading &&
          !error &&
          requests.map((request) => (
            <div
              key={request.id}
              className="mb-4 border border-muted/10 rounded-[24px] min-w-400 max-w-sm flex-shrink-0 mr-4 p-12 bg-white flex flex-col"
            >
              <div className="flex gap-4 items-center mb-2">
                <div className=" w-20 h-20 mb-2 rounded-full overflow-hidden">
                  <Image
                    src={request.image_url || "/placeholder-image.png"}
                    alt={request.title}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p>{request.user_name}</p>
                <p className="mr-auto">Looking for #{"someone"}</p>
                {/* request.looking_for[0] || */}
                <Bookmark size={20} />
              </div>
              <hr className="w-3/4 mx-auto text-muted my-8" />
              <h2 className="text-lg font-bold mb-8">{request.title}</h2>
              <p className="mb-2 truncate">{request.description}</p>
              <div className="flex items-center mt-auto">
                <button
                  className="mb-auto"
                  onClick={() => handleReadMore(request.id)}
                >
                  Read more
                </button>
                <p className="ml-auto text-sm text-muted">
                  {request.location} - {formatTimeAgo(request.created_at)}
                </p>
              </div>
            </div>
          ))}
      </div>
      <div className="max-w-140">
        <Button className={"!px-4 rounded-full"} onClick={handleClick}>
          see more collabs
        </Button>
      </div>
    </div>
  );
}
