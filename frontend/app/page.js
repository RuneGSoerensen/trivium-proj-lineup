'use client';

import NavLink from "@/comps/navigation/NavLink";
import { useNavbar } from "@/utils/navbarContext";
import { useEffect } from "react";

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
      <div>Stories</div>
      <article className="h-1/3 w-full bg-alt full-bleed">
        collab requests,
        cards
      </article>
      <div className="h-screen">
        user feed
      <h1 className="heading-2">Welcome to Trivium!</h1>
      <NavLink href="/ui-test" label="UI Test" isActive={false} />
      <NavLink href="/chat" label="Chat Page" isActive={false} />
      </div>
    </section>
  );
}
