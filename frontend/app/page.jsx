"use client";

import NavLink from "@/comps/navigation/NavLink";
import { useNavbar } from "@/utils/navbarContext";
import { useEffect } from "react";
import UserFeed from "@/comps/homepage/UserFeed";
import RequestFeed from "@/comps/homepage/RequestFeed";
import Stories from "@/comps/homepage/stories";

export default function Home() {
  const { setConfig } = useNavbar();
  useEffect(() => {
    setConfig({
      type: "home",
      showBack: false,
      showLogo: true,
      actions: ["search", "notifications", "menu"],
      visible: true,
      backgroundColor: "bg-default",
    });
  }, [setConfig]);

  return (
    <section className="space-y-12 w-full h-full lg:max-w-full">
      {/* Stories - Full width on mobile, contained on desktop */}
      <div className="w-full">
        <Stories />
      </div>

      {/* Feed Layout - Single column on mobile, multi-column on desktop */}
      <div className="flex flex-col lg:flex-row gap-24 w-full">
        {/* Main Feed Column */}
        <div className="flex-1 space-y-16 max-w-full ">
          <RequestFeed />
          <UserFeed />
        </div>
      </div>
    </section>
  );
}
