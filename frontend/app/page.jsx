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
    <section className="space-y-12 w-full">
      <Stories />

      <RequestFeed />

      <UserFeed />
    </section>
  );
}
