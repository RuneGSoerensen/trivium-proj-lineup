"use client";

import Image from "next/image";
import { Button } from "@/ui/Button/Button";
import { CirclePlus, CircleCheck } from "lucide-react";

export default function ProfileHeader({
  profile,
  notesLength,
  onFollow,
  router,
}) {
  return (
    <div
      className=" py-10 rounded-[40px] mb-6 w-full"
      style={{ backgroundColor: profile.theme }}
    >
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-16 mb-4 text-inverse w-full justify-center">
          <div className="text-center w-50">
            <p className="text-[20px] font-light">{profile.followers_count}</p>
            <p className="text-[13px] opacity-80">Followers</p>
          </div>
          <div className=" w-150 h-150 rounded-full bg-default overflow-hidden border-4 border-white/20">
            {profile.image_url ? (
              <Image
                src={profile.image_url || "/placeholder.svg"}
                alt={profile.name}
                width={200}
                height={200}
                className=" fit-cover w-150 h-150 object-center "
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted text-[32px] ">
                <p>{profile.name.charAt(0).toUpperCase()}</p>
              </div>
            )}
          </div>
          <div className="text-center w-50">
            <p className="text-[20px] font-light ">{notesLength || 0}</p>
            <p className="text-[13px] opacity-80">Notes</p>
          </div>
        </div>

        <h1 className="text-inverse text-[20px] font-bold ">{profile.name}</h1>
        <p className="text-gray-200 text-xs mb-6"> {profile.bio}</p>

        {profile.is_own_profile ? (
          <div className="flex gap-5 justify-center text-white w-full">
            <Button
              variant="glass"
              className=" w-full py-3 rounded-full  "
              onClick={() => router.push("/pages/profile/edit")}
            >
              Edit profile
            </Button>
            <Button variant="glass" className=" w-full py-3 rounded-full">
              Share profile
            </Button>
          </div>
        ) : (
          <div className="flex gap-3 text-white gap-5 justify-center w-full">
            <Button
              variant="glass"
              onClick={onFollow}
              className="w-full py-3 rounded-full"
            >
              {profile.is_following ? (
                <div className="flex gap-4">
                  <p>follow</p>
                  <CirclePlus size={20} strokeWidth={4} />
                </div>
              ) : (
                <div className="flex gap-4">
                  <p>following</p>
                  <CircleCheck size={20} strokeWidth={4} />
                </div>
              )}
            </Button>
            <Button variant="glass" className="w-full py-3 rounded-full">
              Message
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
