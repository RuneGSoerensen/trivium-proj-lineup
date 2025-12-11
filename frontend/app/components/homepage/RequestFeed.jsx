"use client";
import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import { formatTimeAgo } from "@/utils/timeAgo";
import Image from "next/image";
import { Button } from "@/comps/ui/Button/Button";
import { useRouter } from "next/navigation";
import { authenticatedFetch } from "@/utils/auth.js";
import { Card } from "../ui/Card/Card";

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
    <div className="bg-alt full-bleed py-15 gap-10">
      {/* placeholder background*/}
      <div>
        <p className="color-muted px-15">Collaboration requests</p>
        {loading && <p className="px-15">Loading...</p>}
        {error && <p className="px-15 color-danger">Error: {error}</p>}
        {!loading && !error && requests.length === 0 && (
          <p className="px-15 color-muted">No collaboration requests found.</p>
        )}
        <div className="flex py-10 px-15 gap-10 overflow-x-auto min-h-193 hide-scrollbar">
          {requests.map((request) => (
            <Card 
              type="Collab"
              variant="Small"
              title={request.title}
              authorName={request.user_name}
              key={request.id}
              avatarSrc={request.image_url && request.image_url !== "" ? request.image_url : `https://ui-avatars.com/api/?name=${encodeURIComponent(request.user_name)}&background=ffcf70&color=1e1e1e&size=40`}
              avatarAlt={request.user_name}
              tag={"something"}
              className="w-full!"
              location={request.location}
              timeAgo={formatTimeAgo(request.created_at)}
              description={request.description}
              onClick={() => handleReadMore(request.id)}
          />
          ))} 

            </div>
          
      </div>
      <div className="flex justify-start px-15">
        <Button size="lg" className={"px-10! rounded-full w-full"} onClick={handleClick}>
          See more collabs
        </Button>
      </div>
    </div>
  );
}
     