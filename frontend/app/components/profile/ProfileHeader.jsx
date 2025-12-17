"use client";

import Image from "next/image";
import { Button } from "@/ui/Button/Button";
import { CirclePlus, CircleCheck, MoreHorizontal } from "lucide-react";

export default function ProfileHeader({
  profile,
  notesLength,
  onFollow,
  router,
}) {
  return (
    <article
      className={`rounded-[35px] w-full color-inverse py-25 ${profile.theme || "bg-secondary-blue"}`}
    >
      <div className="flex w-full justify-end px-20">
        <Button
          type="icon"
          variant="ghost"
          size="sm"
          iconSize="lg"
          className="color-inverse"
          icon={<MoreHorizontal />}
        />
      </div>
      <div className="flex items-center justify-center gap-16">
     
          <div className="text-center w-full">
            <h1 className="color-inverse text-h1 font-normal! mb-0!">
              {profile.followers_count}
            </h1>
            <p className="text-sm">Connections</p>
          </div>

          <div className="flex flex-col items-center justify-center gap-16">
            <div className="min-w-150 h-150 rounded-full bg-default overflow-hidden border-4 border-white/20">
              {profile.image_url ? (
                <Image
                  src={profile.image_url || "/placeholder.svg"}
                  alt={profile.name}
                  width={200}
                  height={200}
                  className="aspect-auto w-full h-full object-cover object-center "
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <h1 className="text-xl">{profile.name.charAt(0).toUpperCase()}</h1>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center">
              <h1 className="color-inverse text-h1 font-normal! mb-0!">{profile.name}</h1>
              <p className="color-grey-medium text-xs mb-6"> {profile.bio ? profile.bio : "Role / Title"}</p>
            </div>
          </div>

          <div className="text-center w-full">
            <h1 className="color-inverse text-h1 font-normal! mb-0!">{notesLength || 0}</h1>
            <p className="text-sm">Notes</p>
          </div>
    
      </div>
<div>
  
</div>
        {profile.is_own_profile ? (
          <div className="flex gap-16 items-center justify-center w-full pt-12">
            <Button
              size="lg"
              variant="glass"
              className="w-full min-w-180 rounded-full"
              onClick={() => router.push("/profile/edit")}
            >
              Edit profile
            </Button>
            <Button
              size="lg"
              variant="glass"
              className="w-full min-w-180 rounded-full">
              Share profile
            </Button>
          </div>
        ) : (
          <div className="flex gap-16 justify-center w-full">
            <Button
              size="lg"
              variant="glass"
              icon={profile?.is_following ? <CircleCheck /> : <CirclePlus />}
              iconPosition="right"
              onClick={onFollow}
              className="w-full min-w-180 rounded-full"
            >
              {profile?.is_following ? (
                "Connected"
              ) : (
                "Connect"
              )}
            </Button>
            <Button
              size="lg"
              variant="glass"
              className="w-full min-w-180 py-3 rounded-full"
              onClick={() => router.push(`/chat/${profile.id}`)}>
              Message
            </Button>
          </div>
        )}
    </article>
  );
}
