"use client";
import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import { Tag } from "@/comps/ui/Tag/Tag";
import Image from "next/image";
import { MessageCircleMore } from "lucide-react";
import { Button } from "@/comps/ui/Button/Button";
import { useRouter } from "next/navigation";
import { formatTimeAgo } from "@/utils/timeAgo";
import { authenticatedFetch } from "@/utils/auth";
export default function RequestFeed() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchRequests = async (currentOffset) => {
    try {
      const res = await authenticatedFetch(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/requests?offset=${currentOffset}`,
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
        setHasMore(data.length === 5);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadInitialRequests();
  }, []);

  const loadMore = async () => {
    setLoadingMore(true);
    try {
      const newOffset = offset + 5;
      const newRequests = await fetchRequests(newOffset);
      setRequests([...requests, ...newRequests]);
      setOffset(newOffset);
      setHasMore(newRequests.length === 5);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingMore(false);
    }
  };

  const router = useRouter();

  const handleReadMore = (id) => {
    router.push(`/collabs/${id}`);
  };

  return (
    <div className="bg-gray-100 w-full">
      {/* placeholder background*/}
      <h1 className="text-lg ">Collaboration requests</h1>
      <div className=" flex flex-col py-4 w-full gap-16">
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {!loading &&
          !error &&
          requests.map((request) => (
            <div
              key={request.id}
              className="mb-4 p-4 border border-muted/10 rounded-[24px] min-h-[620px]  p-12 bg-white flex flex-col "
            >
              <div className="flex gap-8 items-center mb-2">
                <div className=" w-40 h-40 mb-2 rounded-full overflow-hidden">
                  <Image
                    src={
                      request.created_by.image_url || "/placeholder-image.png"
                    }
                    alt={request.title}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p>{request.created_by.name}</p>
                <p className="mr-auto">Looking for #{"someone"}</p>
                {/* request.looking_for[0] || */}
                <Bookmark size={20} />
              </div>
              <hr className="w-[90%] mx-auto text-muted/30 my-8" />
              <h2 className="text-lg font-bold mb-8">{request.title}</h2>
              <div className="flex">
                <Tag>tags here</Tag>
                <p className="ml-auto text-sm text-muted">
                  {request.location} - {formatTimeAgo(request.created_at) || ""}
                </p>
              </div>
              <Image
                src={request.image_url || "/placeholder-image.png"}
                alt={request.title}
                width={400}
                height={300}
                className="  w-full object-cover my-8 rounded-2xl max-h-[600px]"
              />
              <p className="mb-2 truncate">{request.description}</p>
              <div className="flex items-center mt-auto w-full gap-4 justify-between">
                <button
                  className=" font-bold text-muted"
                  onClick={() => handleReadMore(request.id)}
                >
                  Read more
                </button>
                <Button
                  className="rounded-full !px-8 !py-6 border border-muted"
                  size="md"
                >
                  <div className="flex items-center gap-2">
                    <MessageCircleMore size={20} strokeWidth={2} /> Start a chat
                  </div>
                </Button>
              </div>
            </div>
          ))}
      </div>
      {hasMore && (
        <div className="max-w-140 mx-auto pb-12">
          <Button
            className={"!px-4 rounded-full !py-6 border border-muted"}
            onClick={loadMore}
            disabled={loadingMore}
          >
            {loadingMore ? "Loading..." : "see more collabs"}
          </Button>
        </div>
      )}
    </div>
  );
}
