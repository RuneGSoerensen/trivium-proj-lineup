"use client";

import NavLink from "@/comps/navigation/NavLink";
import { useNavbar } from "@/utils/navbarContext";
import { useEffect } from "react";
import UserFeed from "@/comps/homepage/UserFeed";
import RequestFeed from "@/comps/homepage/RequestFeed";
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
    <section className="space-y-12 w-full ">
      <div>Stories</div>

      <RequestFeed />

      <UserFeed />

      <div className="h-screen">
        <h1 className="heading-2">Welcome to Trivium!</h1>
        <NavLink href="/ui-test" label="UI Test" isActive={false} />
        <NavLink href="/chat" label="Chat Page" isActive={false} />
      </div>
    </section>
  );
}
